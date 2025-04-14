// This file analyzes orchid problems based on uploaded images.

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

/**
 * @fileOverview Analyzes orchid problems based on uploaded images and provides solutions.
 *
 * - orchidProblemAnalysis - Analyzes orchid problems and suggests solutions.
 * - OrchidProblemAnalysisInput - The input type for the orchidProblemAnalysis function.
 * - OrchidProblemAnalysisOutput - The return type for the orchidProblemAnalysis function.
 */

const OrchidProblemAnalysisInputSchema = z.object({
  photoUrl: z.string().describe('The URL of the orchid problem photo.'),
  additionalNotes: z.string().optional().describe('Any additional notes or observations about the orchid problem.'),
});
export type OrchidProblemAnalysisInput = z.infer<typeof OrchidProblemAnalysisInputSchema>;

const OrchidProblemAnalysisOutputSchema = z.object({
  problemIdentification: z.string().describe('Identification of the potential orchid problem.'),
  suggestedSolutions: z.string().describe('Suggested solutions to address the identified orchid problem.'),
});
export type OrchidProblemAnalysisOutput = z.infer<typeof OrchidProblemAnalysisOutputSchema>;

export async function orchidProblemAnalysis(
  input: OrchidProblemAnalysisInput
): Promise<OrchidProblemAnalysisOutput> {
  return orchidProblemAnalysisFlow(input);
}

const orchidProblemAnalysisPrompt = ai.definePrompt({
  name: 'orchidProblemAnalysisPrompt',
  input: {
    schema: z.object({
      photoUrl: z.string().describe('The URL of the orchid problem photo.'),
      additionalNotes: z.string().optional().describe('Any additional notes or observations about the orchid problem.'),
    }),
  },
  output: {
    schema: z.object({
      problemIdentification: z.string().describe('Identification of the potential orchid problem.'),
      suggestedSolutions: z.string().describe('Suggested solutions to address the identified orchid problem.'),
    }),
  },
  prompt: `Analyze the following orchid problem based on the provided image and any additional notes.

Image: {{media url=photoUrl}}

Additional Notes: {{{additionalNotes}}}

Identify the potential problem and suggest solutions to address it.
`,
});

const orchidProblemAnalysisFlow = ai.defineFlow<
  typeof OrchidProblemAnalysisInputSchema,
  typeof OrchidProblemAnalysisOutputSchema
>({
  name: 'orchidProblemAnalysisFlow',
  inputSchema: OrchidProblemAnalysisInputSchema,
  outputSchema: OrchidProblemAnalysisOutputSchema,
},async input => {
  const {output} = await orchidProblemAnalysisPrompt(input);
  return output!;
}
);
