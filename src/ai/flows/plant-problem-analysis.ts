// This file analyzes plant problems based on uploaded images.

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

/**
 * @fileOverview Analyzes plant problems based on uploaded images and provides solutions.
 *
 * - plantProblemAnalysis - Analyzes plant problems and suggests solutions.
 * - PlantProblemAnalysisInput - The input type for the plantProblemAnalysis function.
 * - PlantProblemAnalysisOutput - The return type for the plantProblemAnalysis function.
 */

const PlantProblemAnalysisInputSchema = z.object({
  photoUrl: z.string().describe('The URL of the plant problem photo.'),
  additionalNotes: z.string().optional().describe('Any additional notes or observations about the plant problem.'),
});
export type PlantProblemAnalysisInput = z.infer<typeof PlantProblemAnalysisInputSchema>;

const PlantProblemAnalysisOutputSchema = z.object({
  problemIdentification: z.string().describe('Identification of the potential plant problem.'),
  suggestedSolutions: z.string().describe('Suggested solutions to address the identified plant problem.'),
});
export type PlantProblemAnalysisOutput = z.infer<typeof PlantProblemAnalysisOutputSchema>;

export async function plantProblemAnalysis(
  input: PlantProblemAnalysisInput
): Promise<PlantProblemAnalysisOutput> {
  return plantProblemAnalysisFlow(input);
}

const plantProblemAnalysisPrompt = ai.definePrompt({
  name: 'plantProblemAnalysisPrompt',
  input: {
    schema: z.object({
      photoUrl: z.string().describe('The URL of the plant problem photo.'),
      additionalNotes: z.string().optional().describe('Any additional notes or observations about the plant problem.'),
    }),
  },
  output: {
    schema: z.object({
      problemIdentification: z.string().describe('Identification of the potential plant problem.'),
      suggestedSolutions: z.string().describe('Suggested solutions to address the identified plant problem.'),
    }),
  },
  prompt: `Analyze the following plant problem based on the provided image and any additional notes.

Image: {{media url=photoUrl}}

Additional Notes: {{{additionalNotes}}}

Identify the potential problem and suggest solutions to address it.
`,
});

const plantProblemAnalysisFlow = ai.defineFlow<
  typeof PlantProblemAnalysisInputSchema,
  typeof PlantProblemAnalysisOutputSchema
>({
  name: 'plantProblemAnalysisFlow',
  inputSchema: PlantProblemAnalysisInputSchema,
  outputSchema: PlantProblemAnalysisOutputSchema,
},
async input => {
  const {output} = await plantProblemAnalysisPrompt(input);
  return output!;
}
);
