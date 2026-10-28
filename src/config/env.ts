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
  PG_HOST: z.string().default("localhost"),
  PG_PORT: z.coerce.number().int().positive().default(5432),
  PG_USER: z.string().default("postgres"),
  PG_PASSWORD: z.string().default("postgres"),
  PG_DATABASE: z.string().default("percept"),
  JWT_SECRET: z.string().min(1).default("change-me-in-production"),
});

export const getEnv = () => envSchema.parse(process.env);
export const env = getEnv();
