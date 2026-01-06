export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { getDesignSystemPrompt, DESIGN_SYSTEM_SCHEMA } from '@/lib/ai/prompts';

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: getDesignSystemPrompt(input),
      config: {
        responseMimeType: "application/json",
        responseSchema: DESIGN_SYSTEM_SCHEMA
      }
    });

    if (!response.text) {
        throw new Error("No response from AI");
    }

    return NextResponse.json(JSON.parse(response.text));

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'AI Analysis failed';
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
