// noinspection JSUnusedLocalSymbols
'use server';
/**
 * @fileOverview Provides AI-driven recommendations for orchid care based on logged activities and notes.
 *
 * - getPlantCareRecommendation - A function that generates care recommendations for a specific plant.
 * - PlantCareRecommendationInput - The input type for the getPlantCareRecommendation function.
 * - PlantCareRecommendationOutput - The return type for the getPlantCareRecommendation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PlantCareRecommendationInputSchema = z.object({
  plantName: z.string().describe('The name of the orchid.'),
  careLogs: z.string().describe('Care activities such as watering and fertilizing.'),
  notes: z.string().describe('User notes about the plant, potential problems, or observations.'),
});
export type PlantCareRecommendationInput = z.infer<typeof PlantCareRecommendationInputSchema>;

const PlantCareRecommendationOutputSchema = z.object({
  wateringRecommendation: z.string().describe('AI recommendation for watering.'),
  fertilizingRecommendation: z.string().describe('AI recommendation for fertilizing.'),
  problemIdentification: z.string().describe('If notes or logs indicate a problem, identify it here.'),
});
export type PlantCareRecommendationOutput = z.infer<typeof PlantCareRecommendationOutputSchema>;

export async function getPlantCareRecommendation(input: PlantCareRecommendationInput): Promise<PlantCareRecommendationOutput> {
  return plantCareRecommendationFlow(input);
}

const plantCareRecommendationPrompt = ai.definePrompt({
  name: 'plantCareRecommendationPrompt',
  input: {
    schema: z.object({
      plantName: z.string().describe('The name of the orchid.'),
      careLogs: z.string().describe('Care activities such as watering and fertilizing.'),
      notes: z.string().describe('User notes about the plant, potential problems, or observations.'),
    }),
  },
  output: {
    schema: z.object({
      wateringRecommendation: z.string().describe('AI recommendation for watering.'),
      fertilizingRecommendation: z.string().describe('AI recommendation for fertilizing.'),
      problemIdentification: z.string().describe('If notes or logs indicate a problem, identify it here.'),
    }),
  },
  prompt: `You are an expert orchid care advisor. Based on the care logs and notes provided, give specific recommendations for watering and fertilizing the plant.

  Pay close attention to the notes, and if the user mentions any problems, be sure to address them in your response.

  Plant Name: {{plantName}}
  Care Logs: {{careLogs}}
  Notes: {{notes}}

  Watering Recommendation: 
  Fertilizing Recommendation:
  Problem Identification: `,
});

const plantCareRecommendationFlow = ai.defineFlow<
  typeof PlantCareRecommendationInputSchema,
  typeof PlantCareRecommendationOutputSchema
>({
  name: 'plantCareRecommendationFlow',
  inputSchema: PlantCareRecommendationInputSchema,
  outputSchema: PlantCareRecommendationOutputSchema,
}, async input => {
  const {output} = await plantCareRecommendationPrompt(input);
  return output!;
});