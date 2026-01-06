export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { getProjectAnalysisPrompt, PROJECT_ANALYSIS_SCHEMA } from '@/lib/ai/prompts';
import { createSupabaseServer } from '@/lib/supabase/server';
import { classifyRisk } from '@/lib/ai/intent';

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    // Fetch available fonts from Supabase to provide context to AI
    const supabase = createSupabaseServer();
    const { data: fonts } = await supabase
      .from('fonts')
      .select('id, name, license_type, foundry');

    const fontOptions = fonts 
      ? fonts.map(f => `${f.id}: ${f.name} (${f.foundry}, License: ${f.license_type})`).join('\n')
      : "No fonts available.";

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: getProjectAnalysisPrompt(description, fontOptions),
      config: {
        responseMimeType: "application/json",
        responseSchema: PROJECT_ANALYSIS_SCHEMA
      }
    });

    if (!response.text) {
        throw new Error("No response from AI");
    }

    const aiResult = JSON.parse(response.text());

    // Post-process: Classify Risk/Intent based on the User's Input + AI's analysis
    // We combine the input description and the AI's generated summary for better context detection
    const contextText = `${description} ${aiResult.summary || ''} ${aiResult.tone || ''}`;
    const intentSignal = classifyRisk(contextText);

    // Return combined result
    return NextResponse.json({
      ...aiResult,
      aiIntent: intentSignal
    });

  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: error.message || 'AI Analysis failed' }, { status: 500 });
  }
}