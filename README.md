# Tower or Free?

A streaming AI app where a medieval king judges anything you type. Type in a name, topic, or absurd claim; a dramatic AI king renders a live-streaming verdict — **TOWER** (thrown in the dungeon) or **FREE** (spared) — complete with royal decree, evidence, and a shareable verdict card.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + React Compiler
- [ai@7](https://sdk.vercel.ai) + `@ai-sdk/google` + `@ai-sdk/react` for structured object streaming
- Google Gemini
- Zod 4 for the verdict schema
- Tailwind CSS v4 for styling
- html2canvas-pro for exporting the verdict card as a shareable PNG

## Getting started

Requires a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

```bash
echo "GEMINI_API_KEY=your-key-here" > .env.local
pnpm install
pnpm dev
```

Open [https://ai-sdk-streaming-demo.vercel.app/](https://ai-sdk-streaming-demo.vercel.app/).

### Environment variables

```
GEMINI_API_KEY=your-key-here
```

This is read explicitly in `app/api/judge/route.ts` via `createGoogleGenerativeAI({ apiKey })` — note that `@ai-sdk/google`'s default env var is `GOOGLE_GENERATIVE_AI_API_KEY`, not `GEMINI_API_KEY`.

## Scripts

```bash
pnpm dev      # Start dev server (Turbopack)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## How it works

1. `app/page.tsx` walks the user through hero → chamber (enter suspects) → loading → verdict/error stages, using `experimental_useObject` from `@ai-sdk/react` to POST `{ name }` to `/api/judge`.
2. `app/api/judge/route.ts` calls `streamText` with `Output.object({ schema: verdictSchema })` to stream a structured verdict from Gemini, returned via `toTextStreamResponse()`.
3. The client accumulates the streaming JSON and renders partial fields live as they arrive.
4. `components/VerdictSection.tsx` displays the final verdict (red/green theme for TOWER/FREE); `components/ShareButton.tsx` captures it as a PNG via html2canvas.

See `CLAUDE.md` for architecture details and SDK gotchas.

## Deploy

Deploy on [Vercel](https://vercel.com/new) or any Node.js host that supports Next.js 16. Make sure `GEMINI_API_KEY` is set in the deployment environment.
