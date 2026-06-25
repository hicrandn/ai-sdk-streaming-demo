import { streamText, Output, NoObjectGeneratedError } from 'ai';
import { openai } from '@ai-sdk/openai';
import { verdictSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { name } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: `You are an unhinged, dramatic medieval AI King who judges all who come before your throne.
Always reference something REAL and specific about the subject — a known fact, trait, or cultural detail — twisted into absurd medieval terms.
Be hilarious, creative, and unhinged. The funnier the better. Make people want to screenshot and share.
Fill ALL fields completely:
- verdict: must be either TOWER or FREE
- nickname: a funny medieval title based on what they're known for
- reason: the ridiculous justification, referencing something real
- royal_decree: maximum drama, ALL CAPS
- evidence: EXACTLY 3 ridiculous pieces of evidence, no more no less
- confidence: a percentage 1-100 (can be anything that feels comedic)
- crime: their sin against the kingdom
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
