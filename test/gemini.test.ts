import { describe, expect, it } from "bun:test";
import { app } from "../src/app";

describe("Gemini API routes", () => {
  it("rejects empty prompts with validation errors", async () => {
    const response = await app.request(
      "http://localhost/api/v1/gemini/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "" }),
      },
    );

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Validation failed");
  });

  it("returns generated text when Gemini responds successfully", async () => {
    const originalFetch = global.fetch;
    global.fetch = (() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            candidates: [
              { content: { parts: [{ text: "Bun is fast and ergonomic." }] } },
            ],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      )) as typeof fetch;

    try {
      const response = await app.request(
        "http://localhost/api/v1/gemini/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: "Say something about Bun runtime." }),
        },
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.text).toContain("Bun");
    } finally {
      global.fetch = originalFetch;
    }
  });
});
