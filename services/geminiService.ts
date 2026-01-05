
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Font, DesignSystemAnalysis, DesignAdvice } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeProject = async (description: string, availableFonts: Font[]): Promise<AnalysisResult> => {
  const fontOptions = availableFonts.map(f => `${f.id}: ${f.name} (${f.category}, Emotions: ${f.emotions.join(', ')})`).join('\n');
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a Font & Brand Expert. Analyze the project description and:
    1. Recommend the best fonts from the provided list.
    2. Determine the best filter criteria (Category, Emotion, Industry) to apply to the marketplace.
    
    Project Description: "${description}"
    
    Available Fonts:
    ${fontOptions}
    
    Provide your analysis in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
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
      }
    }
  });

  return JSON.parse(response.text);
};

export const analyzeDesignSystem = async (input: string): Promise<DesignSystemAnalysis> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Recommend the best 3 design systems for this project. Focus on developers who prioritize 'Vibe' over deep design knowledge. Input: "${input}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
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
      }
    }
  });

  return JSON.parse(response.text);
};

export const analyzeDesignSense = async (vibeInput: string): Promise<DesignAdvice> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a Senior Design Architect for "Vibe Coding" developers. 
    They have high technical skill but "zero design sense". 
    Turn their ambiguous "vibe" into a professional Design Blueprint.
    
    Input: "${vibeInput}"
    
    Output JSON:
    - layoutAdvice: Concrete instructions (e.g. "Use 40px gutters")
    - colorPalette: Array of HEX strings
    - suggestedComponents: List of specific UI elements
    - vibeLevel: A descriptive name for this architectural style`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          layoutAdvice: { type: Type.STRING },
          colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedComponents: { type: Type.ARRAY, items: { type: Type.STRING } },
          vibeLevel: { type: Type.STRING }
        }
      }
    }
  });

  return JSON.parse(response.text);
};
