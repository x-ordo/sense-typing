import { Type } from "@google/genai";

export const PROJECT_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    tone: { type: Type.STRING },
    summary: { type: Type.STRING },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          fontId: { type: Type.STRING },
          reason: { type: Type.STRING }
        }
      }
    },
    filterCriteria: {
      type: Type.OBJECT,
      properties: {
        category: { type: Type.STRING, description: "Serif, Sans Serif, Display, Handwriting, Korean, or All" },
        emotion: { type: Type.STRING, description: "Minimal, Emotional, Bold, Cute, Traditional, Modern, Luxury, Playful, Calm, or All" },
        industry: { type: Type.STRING, description: "A simple keyword like Fintech, Cafe, Tech, Fashion" }
      }
    }
  }
};

export const DESIGN_SYSTEM_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    techStack: { type: Type.STRING },
    serviceNature: { type: Type.STRING },
    designGoal: { type: Type.STRING },
    top3: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          rank: { type: Type.NUMBER },
          name: { type: Type.STRING },
          reason: { type: Type.STRING },
          pros: { type: Type.ARRAY, items: { type: Type.STRING } },
          refPoints: { type: Type.STRING }
        }
      }
    }
  }
};

export function getProjectAnalysisPrompt(description: string, fontOptions: string) {
  return `You are a Font & Brand Expert. Analyze the project description and:
    1. Recommend the best fonts from the provided list.
    2. Determine the best filter criteria (Category, Emotion, Industry) to apply to the marketplace.
    
    Project Description: "${description}"
    
    Available Fonts:
    ${fontOptions}
    
    Provide your analysis in JSON format.`;
}

export function getDesignSystemPrompt(input: string) {
  return `Recommend the best 3 design systems for this project. Focus on developers who prioritize 'Vibe' over deep design knowledge. Input: "${input}"`;
}
