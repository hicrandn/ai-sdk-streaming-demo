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

**Stack:** Next.js 16 (App Router, Turbopack) · ai@7 + @ai-sdk/openai + @ai-sdk/react · Zod 4 · Tailwind CSS v4 · html2canvas · TypeScript · React 19 + React Compiler

**Environment:** `OPENAI_API_KEY` in `.env.local`.

### Request flow

1. `app/page.tsx` — `experimental_useObject` from `@ai-sdk/react` submits `{ name }` as JSON POST to `/api/judge`
2. `app/api/judge/route.ts` — `streamText` with `Output.object({ schema: verdictSchema })` generates a structured verdict; returns `toTextStreamResponse()` (raw JSON text, not data stream format — required by `experimental_useObject`)
3. Client accumulates streaming JSON and renders partial fields live in `JudgementCard` as they arrive

### Key files

- `lib/schemas.ts` — Zod schema `verdictSchema` (verdict/reason/royal_decree/evidence) shared between client and server
- `components/JudgementCard.tsx` — renders partial streaming verdict; red/green theme based on TOWER vs FREE; id=`judgement-card` for html2canvas
- `components/ShareButton.tsx` — captures `#judgement-card` via html2canvas at 2× scale and downloads as PNG

### Critical SDK notes

- Use `experimental_useObject` from `@ai-sdk/react` (not `'ai/react'` — that path doesn't exist in v7)
- Server must return `result.toTextStreamResponse()`, NOT `toDataStreamResponse()` — `experimental_useObject` reads raw JSON text chunks
- `Output` is a namespace exported from `'ai'` as `output as Output`; use `Output.object({ schema, name?, description? })`
- `onError` in `streamText` takes `({ error }: { error: unknown }) => void`
- Zod 4 is installed (`zod@4.x`); import from `'zod'` directly
- `reactCompiler: true` is a top-level stable option in `next.config.ts` (requires `babel-plugin-react-compiler` dev dependency)
