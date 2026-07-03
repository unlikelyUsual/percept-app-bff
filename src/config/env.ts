import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  GEMINI_API_KEY: z.string().min(1).optional(),
  GEMINI_API_URL: z
    .string()
    .url()
    .default(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    ),
});

export const getEnv = () => envSchema.parse(process.env);
export const env = getEnv();
