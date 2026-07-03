# percept-app-bff

A Bun + TypeScript backend scaffold for generating content through the Google Gemini API.

## Structure

- src/app.ts: Hono app setup and route mounting
- src/controllers: request handlers
- src/routes: versioned route definitions
- src/middleware: validation middleware
- src/models: shared request/response types
- src/config/env.ts: environment validation

## Setup

```bash
bun install
cp .env.example .env
```

Set your Gemini API key in .env before running the server.

## Run

```bash
bun run dev
```

## Example request

```bash
curl -X POST http://localhost:3000/api/v1/gemini/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Write a short greeting in a friendly tone."}'
```
