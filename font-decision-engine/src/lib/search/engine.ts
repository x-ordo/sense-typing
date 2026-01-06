// src/lib/search/engine.ts
// Rule-based Search Engine for MVP

import { createClient } from '@supabase/supabase-js';

// Define Intents and their Tag mappings
// Intent: "I want a font for [Intent]" -> Weights on Tags
const INTENT_MAP: Record<string, Record<string, number>> = {
  'logo': { 'display': 80, 'bold': 60, 'unique': 70, 'sans-serif': 40 },
  'body': { 'serif': 50, 'sans-serif': 50, 'legible': 90, 'light': 30, 'regular': 60 },
  'title': { 'display': 70, 'bold': 80, 'impact': 60 },
  'cute': { 'handwriting': 60, 'round': 80, 'playful': 90 },
  'serious': { 'serif': 70, 'rectilinear': 60, 'formal': 80 },
  'modern': { 'sans-serif': 80, 'geometric': 70, 'minimal': 60 },
};

// Normalize query to intents (Naive implementation)
function analyzeQuery(query: string): Record<string, number> {
  const weights: Record<string, number> = {};
  const lowerQuery = query.toLowerCase();

  // Keyword matching
  if (lowerQuery.includes('로고') || lowerQuery.includes('brand')) Object.assign(weights, INTENT_MAP['logo']);
  if (lowerQuery.includes('본문') || lowerQuery.includes('text')) Object.assign(weights, INTENT_MAP['body']);
  if (lowerQuery.includes('제목') || lowerQuery.includes('headline')) Object.assign(weights, INTENT_MAP['title']);
  if (lowerQuery.includes('귀여운') || lowerQuery.includes('cute')) Object.assign(weights, INTENT_MAP['cute']);
  if (lowerQuery.includes('진지한') || lowerQuery.includes('formal')) Object.assign(weights, INTENT_MAP['serious']);
  if (lowerQuery.includes('모던') || lowerQuery.includes('modern')) Object.assign(weights, INTENT_MAP['modern']);

  // If no intent detected, fallback to name search (handled by DB ILIKE)
  return weights;
}

export interface Font {
  id: string;
  name: string;
  foundry: string;
  license_type: string;
  font_tags: {
    weight: number;
    tags: {
      name: string;
      category: string;
    };
  }[];
}

export type SearchResult = {
  font: Font;
  score: number;
  matchReasons: string[];
};

export async function searchFonts(
  supabase: ReturnType<typeof createClient>,
  query: string
): Promise<SearchResult[]> {
  const intentWeights = analyzeQuery(query);
  const hasIntent = Object.keys(intentWeights).length > 0;

  // Base query
  let dbQuery = supabase
    .from('fonts')
    .select(`
      *,
      font_tags (
        weight,
        tags ( name, category )
      )
    `);

  // Simple name match filter if provided
  if (query && !hasIntent) {
    dbQuery = dbQuery.ilike('name', `%${query}%`);
  }

  const { data, error } = await dbQuery;

  if (error || !data) {
    console.error("Search error:", error);
    return [];
  }

  const fonts = data as unknown as Font[];

  // Scoring Logic
  const results: SearchResult[] = fonts.map((font) => {
    let score = 0;
    const reasons: string[] = [];

    if (hasIntent) {
      // Calculate score based on tag weights
      font.font_tags.forEach((ft) => {
        const tagName = ft.tags.name;
        const tagWeight = ft.weight || 50;
        const intentWeight = intentWeights[tagName] || 0;

        if (intentWeight > 0) {
          score += (tagWeight * intentWeight) / 100;
          reasons.push(tagName);
        }
      });
    } else {
      // Default score logic (e.g., popularity or newness - placeholder)
      score = 10; 
    }

    return { font, score, matchReasons: [...new Set(reasons)] };
  });

  // Sort by score
  return results.sort((a, b) => b.score - a.score);
}
