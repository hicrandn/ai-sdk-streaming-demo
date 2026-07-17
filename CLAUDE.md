# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start dev server on http://localhost:3000 (Turbopack default, no flag needed)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Architecture

**"Tower or Free?"** — a streaming AI app where a medieval king judges anything you type.

**Stack:** Next.js 16 (App Router, Turbopack) · ai@7 + @ai-sdk/google + @ai-sdk/react · Zod 4 · Tailwind CSS v4 · html2canvas-pro · TypeScript · React 19 + React Compiler

**Environment:** `GEMINI_API_KEY` in `.env.local` (passed explicitly via `createGoogleGenerativeAI({ apiKey })` in `app/api/judge/route.ts` — the `@ai-sdk/google` default env var is `GOOGLE_GENERATIVE_AI_API_KEY`, not `GEMINI_API_KEY`). The route fast-fails with a 500 if the key is missing.

### Request flow

1. `app/page.tsx` — stage machine (`hero → chamber → loading → verdict/error`); `experimental_useObject` from `@ai-sdk/react` submits `{ name }` as JSON POST to `/api/judge`. Suspects are a queue of not-yet-judged names: whoever is sent to the throne is removed immediately so a judged name is never re-offered.
2. `app/api/judge/route.ts` — validates the body with Zod (400 on bad input), then `streamText` with `Output.object({ schema: verdictSchema })`, `abortSignal: req.signal` (cancels the upstream call when the client disconnects), `maxOutputTokens`, and `temperature: 1.2`; returns `toTextStreamResponse()` (raw JSON text, not data stream format — required by `experimental_useObject`)
3. Client accumulates streaming JSON and renders partial fields live; a minimum loading duration (`MIN_LOADING_MS`) gates the reveal so the verdict lands with a screen shake + stamp animation.

### Key files

- `lib/schemas.ts` — Zod schema `verdictSchema` (verdict/nickname/reason/royal_decree/evidence×3/confidence/crime/kings_opinion) shared between client and server
- `lib/parchment.ts` — shared visual tokens (ink colors, parchment background, wax seal gradients) for the decree cards
- `components/VerdictSection.tsx` — parchment "royal decree" card: tilted verdict stamp, wax seal, signature block; red (TOWER) / green (FREE) accents; id=`judgement-card` for html2canvas
- `components/LoadingSection.tsx` — same parchment language while the decree is "being written" (neutral wax seal, cycling messages)
- `components/RoyalButton.tsx` — shared button (`primary` gold gradient / `ghost` / `muted`); radius+sizing passed per-usage via className
- `components/ShareButton.tsx` — captures `#judgement-card` via html2canvas-pro at 2× scale and downloads as PNG; lives OUTSIDE the card so it isn't captured; freezes animations before capture
- `components/ChamberSection.tsx` — suspect queue input (max 6, deduped)
- `app/error.tsx` — themed route error boundary

### UI conventions

- Headings over the video background use `.heading-gold` (globals.css) + Cinzel Decorative
- Text sitting directly on the video needs either a dark pill background or a double text-shadow — single subtle shadows disappear on bright video frames
- `prefers-reduced-motion` collapses all animations to their final frame (globals.css)

### Critical SDK notes

- Use `experimental_useObject` from `@ai-sdk/react` (not `'ai/react'` — that path doesn't exist in v7)
- Server must return `result.toTextStreamResponse()`, NOT `toDataStreamResponse()` — `experimental_useObject` reads raw JSON text chunks
- `Output` is a namespace exported from `'ai'` as `output as Output`; use `Output.object({ schema, name?, description? })`
- `onError` in `streamText` takes `({ error }: { error: unknown }) => void`
- Zod 4 is installed (`zod@4.x`); import from `'zod'` directly; `.length(3)` on the evidence array is enforced in the provider JSON schema
- `reactCompiler: true` is a top-level stable option in `next.config.ts` (requires `babel-plugin-react-compiler` dev dependency)
- The Gemini preview model intermittently returns 429/503 under rapid consecutive requests — the error stage + "Try Again" is the designed recovery path
- The system prompt contains explicit verdict-balance instructions ("do NOT default to TOWER") and confidence-variety instructions ("avoid 99/100") — without them the model converges on TOWER at 99%
