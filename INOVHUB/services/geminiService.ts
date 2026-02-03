
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Correct initialization using named parameter and process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeProjectCuration(title: string, description: string) {
  // Fix: Always use ai.models.generateContent to query GenAI with both the model name and prompt.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an innovation consultant, analyze this project idea:
    Title: ${title}
    Description: ${description}`,
    config: {
      responseMimeType: "application/json",
      // Fix: Use responseSchema to ensure the model returns structured data as expected by the UI.
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          Feasibility: {
            type: Type.NUMBER,
            description: 'A feasibility score from 1 to 10.',
          },
          Suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'A list of suggested improvements for the innovation.',
          },
          'Missing critical skills': {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'A list of skills required but missing from the current plan.',
          }
        },
        required: ['Feasibility', 'Suggestions', 'Missing critical skills'],
        propertyOrdering: ['Feasibility', 'Suggestions', 'Missing critical skills']
      }
    }
  });
  
  // Fix: Access the .text property directly (do not call it as a method).
  return JSON.parse(response.text || "{}");
}

export async function getVolunteerMatchReason(projectTitle: string, userSkills: string[]) {
  // Fix: Use generateContent with the appropriate model name.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain why a person with these skills: ${userSkills.join(', ')} would be a great fit for the project: "${projectTitle}". Keep it under 50 words.`,
  });
  
  // Fix: Access the .text property directly.
  return response.text;
}
