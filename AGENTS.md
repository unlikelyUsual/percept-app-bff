# AGENTS — AI coding agent instructions

## Purpose

Provide concise, actionable guidance so an AI coding agent can be immediately productive in this repository.

## Quick start

- Development: `bun run dev` (runs `bun run --hot index.ts`)
- Start: `bun run start` (runs `bun run index.ts`)
- Tests: `bun test` (uses `bun test`)

## Entry points & important files

- Repo entry: [index.ts](index.ts)
- Main app: [src/app.ts](src/app.ts)
- Config: [src/config/env.ts](src/config/env.ts) and [src/config/db.ts](src/config/db.ts)
- Controllers: [src/controllers](src/controllers)
- Models: [src/models](src/models)
- Tests: [test](test)

## Conventions & notes

- Runtime: Bun + TypeScript (`type": "module"` in package.json). Prefer `bun run ...` scripts.
- Keep changes minimal and focused; link to existing docs rather than copying them.
- See [README.md](README.md) for high-level architecture and setup details.

## If unsure

Ask for the intended script or environment; prefer using the `scripts` in [package.json](package.json).
