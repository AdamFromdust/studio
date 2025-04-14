// This file uses a tool that the LLM may use to determine if a product is suitable for the user's orchid.
'use server';
/**
 * @fileOverview Analyzes plant care product suitability for orchids.
 *
 * - analyzeProductSuitability - A function that analyzes the suitability of a plant care product for orchids.
 * - AnalyzeProductSuitabilityInput - The input type for the analyzeProductSuitability function.
 * - AnalyzeProductSuitabilityOutput - The return type for the analyzeProductSuitability function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeProductSuitabilityInputSchema = z.object({
  productPhotoUrl: z.string().describe('The URL of the product photo.'),
  productDescription: z.string().optional().describe('Optional description of the product.'),
});
export type AnalyzeProductSuitabilityInput = z.infer<typeof AnalyzeProductSuitabilityInputSchema>;

const AnalyzeProductSuitabilityOutputSchema = z.object({
  suitability: z.boolean().describe('Whether the product is suitable for orchids.'),
  reason: z.string().describe('The reasoning behind the suitability determination.'),
});
export type AnalyzeProductSuitabilityOutput = z.infer<typeof AnalyzeProductSuitabilityOutputSchema>;

export async function analyzeProductSuitability(input: AnalyzeProductSuitabilityInput): Promise<AnalyzeProductSuitabilityOutput> {
  return analyzeProductSuitabilityFlow(input);
}

const analyzeProductSuitabilityPrompt = ai.definePrompt({
  name: 'analyzeProductSuitabilityPrompt',
  input: {
    schema: z.object({
      productPhotoUrl: z.string().describe('The URL of the product photo.'),
      productDescription: z.string().optional().describe('Optional description of the product.'),
    }),
  },
  output: {
    schema: z.object({
      suitability: z.boolean().describe('Whether the product is suitable for orchids.'),
      reason: z.string().describe('The reasoning behind the suitability determination.'),
    }),
  },
  prompt: `You are an expert in orchid care. A user has uploaded a picture of a plant care product. Please analyze the product and determine if it is suitable for orchids.

Consider the ingredients, intended use, and any warnings or precautions. Provide a detailed explanation for your assessment.

Product Photo: {{media url=productPhotoUrl}}
{{#if productDescription}}
Product Description: {{{productDescription}}}
{{/if}}
`,
});

const analyzeProductSuitabilityFlow = ai.defineFlow<
  typeof AnalyzeProductSuitabilityInputSchema,
  typeof AnalyzeProductSuitabilityOutputSchema
>({
  name: 'analyzeProductSuitabilityFlow',
  inputSchema: AnalyzeProductSuitabilityInputSchema,
  outputSchema: AnalyzeProductSuitabilityOutputSchema,
}, async input => {
  const {output} = await analyzeProductSuitabilityPrompt(input);
  return output!;
});
