// scripts/ai/generate-emotion-tags.ts
// Generate emotion tags for fonts using Gemini AI

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import { EMOTION_TAGS } from '../crawlers/types';

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;

interface FontForTagging {
  id: string;
  name: string;
  foundry: string;
  description: string;
  category: string;
  tags: string[];
}

interface TaggingResult {
  font_id: string;
  emotion_tags: string[];
  confidence: number;
}

/**
 * Create Supabase client
 */
function createSupabaseAdmin(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Missing Supabase credentials');
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
}

/**
 * Create Gemini AI client
 */
function createGeminiClient(): GoogleGenAI {
  if (!GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY environment variable');
  }
  return new GoogleGenAI({ apiKey: GEMINI_API_KEY });
}

/**
 * Get emotion tag vocabulary as string
 */
function getEmotionTagList(): string {
  return Object.keys(EMOTION_TAGS).join(', ');
}

/**
 * Generate emotion tags for a single font
 */
async function generateTagsForFont(
  genAI: GoogleGenAI,
  font: FontForTagging
): Promise<TaggingResult> {
  const prompt = `당신은 타이포그래피 전문가입니다. 주어진 한국어 폰트의 이름, 제작사, 설명을 바탕으로 감정/스타일 태그를 3~5개 선정해주세요.

사용 가능한 태그 목록:
${getEmotionTagList()}

폰트 정보:
- 이름: ${font.name}
- 제작사: ${font.foundry}
- 분류: ${font.category}
- 설명: ${font.description || '설명 없음'}
- 기존 태그: ${font.tags?.join(', ') || '없음'}

반드시 아래 JSON 형식으로만 응답하세요:
{"emotion_tags": ["태그1", "태그2", "태그3"], "confidence": 0.8}

태그는 위 목록에서만 선택하세요. confidence는 0.0~1.0 사이의 확신도입니다.`;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    const text = response.text || '';

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate tags are from our vocabulary
    const validTags = parsed.emotion_tags.filter(
      (tag: string) => tag in EMOTION_TAGS
    );

    return {
      font_id: font.id,
      emotion_tags: validTags.slice(0, 5), // Max 5 tags
      confidence: parsed.confidence || 0.5,
    };
  } catch (error) {
    console.error(`Error generating tags for ${font.name}:`, (error as Error).message);
    return {
      font_id: font.id,
      emotion_tags: [],
      confidence: 0,
    };
  }
}

/**
 * Get fonts that need emotion tags
 */
async function getFontsNeedingTags(
  supabase: SupabaseClient,
  limit: number = 20
): Promise<FontForTagging[]> {
  const { data, error } = await supabase
    .from('fonts')
    .select('id, name, foundry, description, category, tags')
    .or('emotion_tags.is.null,emotion_tags.eq.{}')
    .eq('is_active', true)
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch fonts: ${error.message}`);
  }

  return data || [];
}

/**
 * Update font with generated emotion tags
 */
async function updateFontTags(
  supabase: SupabaseClient,
  result: TaggingResult
): Promise<void> {
  if (result.emotion_tags.length === 0) {
    return;
  }

  const { error } = await supabase
    .from('fonts')
    .update({
      emotion_tags: result.emotion_tags,
      updated_at: new Date().toISOString(),
    })
    .eq('id', result.font_id);

  if (error) {
    throw new Error(`Failed to update font ${result.font_id}: ${error.message}`);
  }
}

/**
 * Main function to generate tags for all fonts without them
 */
async function generateAllTags(options: {
  limit?: number;
  dryRun?: boolean;
  batchSize?: number;
}): Promise<void> {
  const { limit = 100, dryRun = false, batchSize = 10 } = options;

  console.log('Starting emotion tag generation...');
  console.log(`Limit: ${limit}, Batch size: ${batchSize}, Dry run: ${dryRun}`);

  const supabase = createSupabaseAdmin();
  const genAI = createGeminiClient();

  // Get fonts needing tags
  const fonts = await getFontsNeedingTags(supabase, limit);
  console.log(`Found ${fonts.length} fonts needing emotion tags`);

  if (fonts.length === 0) {
    console.log('No fonts need tagging');
    return;
  }

  let processed = 0;
  let successful = 0;
  let failed = 0;

  // Process in batches to respect rate limits
  for (let i = 0; i < fonts.length; i += batchSize) {
    const batch = fonts.slice(i, i + batchSize);
    console.log(`\nProcessing batch ${Math.floor(i / batchSize) + 1}...`);

    for (const font of batch) {
      console.log(`  Generating tags for: ${font.name}`);

      const result = await generateTagsForFont(genAI, font);

      if (result.emotion_tags.length > 0) {
        console.log(`    Tags: ${result.emotion_tags.join(', ')} (${(result.confidence * 100).toFixed(0)}%)`);

        if (!dryRun) {
          await updateFontTags(supabase, result);
        }
        successful++;
      } else {
        console.log(`    No tags generated`);
        failed++;
      }

      processed++;

      // Rate limit: 15 RPM for free tier, 60 RPM for paid
      await new Promise((resolve) => setTimeout(resolve, 4000)); // 4s between requests
    }

    // Extra delay between batches
    if (i + batchSize < fonts.length) {
      console.log('Waiting between batches...');
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.log('\n=== Generation Complete ===');
  console.log(`Processed: ${processed}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
}

// CLI entry point
async function main() {
  const args = process.argv.slice(2);

  const limit = parseInt(
    args.find((a) => a.startsWith('--limit='))?.split('=')[1] || '20',
    10
  );
  const batchSize = parseInt(
    args.find((a) => a.startsWith('--batch='))?.split('=')[1] || '10',
    10
  );
  const dryRun = args.includes('--dry-run');

  await generateAllTags({ limit, batchSize, dryRun });
}

main().catch(console.error);

export { generateAllTags, generateTagsForFont };
