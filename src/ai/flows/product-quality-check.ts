// This file uses a tool that the LLM may use to determine if a product is suitable for the user's orchid.
'use server';
/**
 * @fileOverview Analyzes plant care product quality for orchids.
 *
 * - analyzeProductQuality - A function that analyzes the quality of a plant care product for orchids.
 * - AnalyzeProductQualityInput - The input type for the analyzeProductQuality function.
 * - AnalyzeProductQualityOutput - The return type for the analyzeProductQuality function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeProductQualityInputSchema = z.object({
  productPhotoUrl: z.string().describe('The URL of the product photo.'),
  productDescription: z.string().optional().describe('Optional description of the product.'),
});
export type AnalyzeProductQualityInput = z.infer<typeof AnalyzeProductQualityInputSchema>;

const AnalyzeProductQualityOutputSchema = z.object({
  quality: z.string().describe('The quality of the product for orchids.'),
  reason: z.string().describe('The reasoning behind the quality determination.'),
});
export type AnalyzeProductQualityOutput = z.infer<typeof AnalyzeProductQualityOutputSchema>;

export async function analyzeProductQuality(input: AnalyzeProductQualityInput): Promise<AnalyzeProductQualityOutput> {
  return analyzeProductQualityFlow(input);
}

const analyzeProductQualityPrompt = ai.definePrompt({
  name: 'analyzeProductQualityPrompt',
  input: {
    schema: z.object({
      productPhotoUrl: z.string().describe('The URL of the product photo.'),
      productDescription: z.string().optional().describe('Optional description of the product.'),
    }),
  },
  output: {
    schema: z.object({
      quality: z.string().describe('The quality of the product for orchids.'),
      reason: z.string().describe('The reasoning behind the quality determination.'),
    }),
  },
  prompt: `You are an expert in orchid care. A user has uploaded a picture of a plant care product. Please analyze the product and determine its quality for orchids.\n
Consider the ingredients, intended use, and any warnings or precautions. Provide a detailed explanation for your assessment.\n
Product Photo: {{media url=productPhotoUrl}}
{{#if productDescription}}
Product Description: {{{productDescription}}}\n{{/if}}
`,
});

const analyzeProductQualityFlow = ai.defineFlow<
  typeof AnalyzeProductQualityInputSchema,
  typeof AnalyzeProductQualityOutputSchema
>({
  name: 'analyzeProductQualityFlow',
  inputSchema: AnalyzeProductQualityInputSchema,
  outputSchema: AnalyzeProductQualityOutputSchema,
}, async input => {
  const {output} = await analyzeProductQualityPrompt(input);
  return output!;
});
