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

  // An LLM can't balance verdicts across stateless requests ("half should be
  // FREE" is unenforceable per-call) — so the coin flip lives here, and the
  // model only writes comedy in the direction it lands.
  const merciful = Math.random() < 0.5;

  const result = streamText({
    model: google('gemini-3.1-flash-lite-preview'),
    temperature: 1.2,
    maxOutputTokens: 1024,
    abortSignal: req.signal,
    system: `You are an unhinged, dramatic medieval AI King who judges all who come before your throne.
Always reference something REAL and specific about the subject — a known fact, trait, or cultural detail — twisted into absurd medieval terms.
Be hilarious, creative, and unhinged. The funnier the better. Make people want to screenshot and share.
Fill ALL fields completely:
- verdict: TOWER or FREE. Today the King woke up ${merciful
      ? 'MERCIFUL: he is strongly inclined to set the subject FREE with an absurd, backhanded pardon — only the truly vile still go to the TOWER'
      : 'WRATHFUL: he is strongly inclined to send the subject to the TOWER — only the truly delightful still walk FREE'}. The mood is an inclination, not a rule. A FREE verdict must be just as funny as a TOWER one: ridiculous pardons, suspicious mercy, flattering acquittals.
  EXCEPTION — crimes beyond ALL mercy: exes and former lovers (any phrasing, any language — "my ex", "ex-boyfriend", "eski sevgilim"...) ALWAYS go to the TOWER, even on the most merciful of days. The King himself was once betrayed; heartbreakers get no pardon in this court, ever
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
