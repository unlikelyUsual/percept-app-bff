import { Hono } from "hono";
import { z } from "zod";
import { generateGeminiText } from "../controllers/gemini.controller";
import { validationMiddleware } from "../middleware/validate";

export const geminiRouter = new Hono();

const generateSchema = z.object({
  prompt: z.string().trim().min(1, "Prompt is required"),
  temperature: z.number().min(0).max(2).optional(),
  maxOutputTokens: z.number().int().positive().optional(),
});

geminiRouter.post(
  "/generate",
  validationMiddleware.body(generateSchema),
  generateGeminiText,
);
