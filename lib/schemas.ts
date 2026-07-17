import { z } from 'zod';

export const verdictSchema = z.object({
  verdict: z.enum(['TOWER', 'FREE']),
  nickname: z.string().describe('absurd medieval nickname for the subject, max 6 words, e.g. "Lord of Electric Chariots"'),
  reason: z.string().describe('funny royal explanation for the verdict, max 25 words'),
  royal_decree: z.string().describe('dramatic proclamation in ALL CAPS, max 10 words'),
  evidence: z.array(z.string()).length(3).describe('exactly 3 ridiculous pieces of evidence'),
  confidence: z.number().int().min(1).max(100).describe('royal confidence percentage 1-100'),
  crime: z.string().describe('the main crime or sin being judged, max 8 words'),
  kings_opinion: z.string().describe("king's short witty one-liner about the subject, max 10 words"),
});

export type Verdict = z.infer<typeof verdictSchema>;
