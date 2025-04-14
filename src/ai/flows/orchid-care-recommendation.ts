// noinspection JSUnusedLocalSymbols
'use server';
/**
 * @fileOverview Provides AI-driven recommendations for orchid care based on logged activities and notes.
 *
 * - getOrchidCareRecommendation - A function that generates care recommendations for a specific orchid.
 * - OrchidCareRecommendationInput - The input type for the getOrchidCareRecommendation function.
 * - OrchidCareRecommendationOutput - The return type for the getOrchidCareRecommendation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const OrchidCareRecommendationInputSchema = z.object({
  orchidName: z.string().describe('The name of the orchid.'),
  careLogs: z.string().describe('Care activities such as watering and fertilizing.'),
  notes: z.string().describe('User notes about the plant, potential problems, or observations.'),
});
export type OrchidCareRecommendationInput = z.infer<typeof OrchidCareRecommendationInputSchema>;

const OrchidCareRecommendationOutputSchema = z.object({
  wateringRecommendation: z.string().describe('AI recommendation for watering.'),
  fertilizingRecommendation: z.string().describe('AI recommendation for fertilizing.'),
  problemIdentification: z.string().describe('If notes or logs indicate a problem, identify it here.'),
});
export type OrchidCareRecommendationOutput = z.infer<typeof OrchidCareRecommendationOutputSchema>;

export async function getOrchidCareRecommendation(input: OrchidCareRecommendationInput): Promise<OrchidCareRecommendationOutput> {
  return orchidCareRecommendationFlow(input);
}

const orchidCareRecommendationPrompt = ai.definePrompt({
  name: 'orchidCareRecommendationPrompt',
  input: {
    schema: z.object({
      orchidName: z.string().describe('The name of the orchid.'),
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

  Orchid Name: {{orchidName}}
  Care Logs: {{careLogs}}
  Notes: {{notes}}

  Watering Recommendation: 
  Fertilizing Recommendation:
  Problem Identification: `,
});

const orchidCareRecommendationFlow = ai.defineFlow<
  typeof OrchidCareRecommendationInputSchema,
  typeof OrchidCareRecommendationOutputSchema
>({
  name: 'orchidCareRecommendationFlow',
  inputSchema: OrchidCareRecommendationInputSchema,
  outputSchema: OrchidCareRecommendationOutputSchema,
}, async input => {
  const {output} = await orchidCareRecommendationPrompt(input);
  return output!;
});