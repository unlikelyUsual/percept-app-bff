import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getEnv } from "./config/env";
import { geminiRouter } from "./routes/gemini";
import { userRouter } from "./routes/users";

export const app = new Hono();
const env = getEnv();

app.use("*", logger());
app.use("*", cors());

app.get("/health", (c) => {
  return c.json({ status: "ok", environment: env.NODE_ENV });
});

app.route("/api/v1/gemini", geminiRouter);
app.route("/api/v1/users", userRouter);
