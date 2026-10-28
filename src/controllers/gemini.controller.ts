import type { Context } from "hono";
import { getEnv } from "../config/env";
import type {
  GeminiGenerateRequest,
  GeminiGenerateResponse,
} from "../models/gemini";

export const generateGeminiText = async (c: Context) => {
  const body = c.get("validatedBody") as GeminiGenerateRequest;
  const env = getEnv();

  if (env.NODE_ENV === "production" && !env.GEMINI_API_KEY) {
    return c.json({ error: "Gemini API key is not configured" }, 500);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (env.GEMINI_API_KEY) {
    headers["x-goog-api-key"] = env.GEMINI_API_KEY;
  }

  const response = await fetch(env.GEMINI_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      contents: [{ parts: [{ text: body.prompt }] }],
      generationConfig: {
        temperature: body.temperature ?? 0.7,
        maxOutputTokens: body.maxOutputTokens ?? 512,
      },
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Gemini request failed" }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response generated";

  const result: GeminiGenerateResponse = { text };
  return c.json(result, 200);
};
