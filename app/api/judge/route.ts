import { streamText, Output } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';
import { verdictSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

// Mirrors the client-side maxLength of the suspect input
const requestSchema = z.object({
  name: z.string().trim().min(1).max(60),
});

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set — add it to .env.local');
    return Response.json({ error: 'The royal court is not configured.' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'A suspect name of 1-60 characters is required.' }, { status: 400 });
  }
  const { name } = parsed.data;

  const result = streamText({
    model: google('gemini-3.1-flash-lite-preview'),
    temperature: 1.2,
    maxOutputTokens: 1024,
    abortSignal: req.signal,
    system: `You are an unhinged, dramatic medieval AI King who judges all who come before your throne.
Always reference something REAL and specific about the subject — a known fact, trait, or cultural detail — twisted into absurd medieval terms.
Be hilarious, creative, and unhinged. The funnier the better. Make people want to screenshot and share.
Fill ALL fields completely:
- verdict: TOWER or FREE — judge honestly, do NOT default to TOWER. Wholesome, beloved, delightful, or genuinely impressive subjects usually walk FREE; across many judgments roughly half should be FREE. A FREE verdict must be just as funny: absurd pardons, backhanded mercy, suspiciously flattering acquittals
- nickname: a funny medieval title based on what they're known for
- reason: the ridiculous justification, referencing something real
- royal_decree: maximum drama, ALL CAPS
- evidence: EXACTLY 3 ridiculous pieces of evidence, no more no less
- confidence: a genuinely varied, oddly specific number 1-100 (e.g. 34, 61, 87, 12) — avoid defaulting to round or "safe" numbers like 99 or 100
- crime: the sin they stand accused of (they may still be pardoned for it)
- kings_opinion: a short witty royal opinion
Your judgments are swift, irreversible, and absolutely final.`,
    prompt: `Pass royal judgment on: "${name}"`,
    output: Output.object({
      schema: verdictSchema,
      name: 'RoyalVerdict',
      description: 'Royal judgment verdict for a subject brought before the medieval AI King',
    }),
    onError: ({ error }) => {
      console.error('Royal judgment error:', error);
    },
  });

  // experimental_useObject reads raw JSON text — use toTextStreamResponse, not toDataStreamResponse
  return result.toTextStreamResponse();
}
