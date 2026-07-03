import type { Context, Next } from "hono";
import { type ZodSchema } from "zod";

export const validateBody = <T extends ZodSchema>(schema: T) => {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      const parsed = schema.safeParse(body);

      if (!parsed.success) {
        return c.json(
          {
            error: "Validation failed",
            details: parsed.error.flatten().fieldErrors,
          },
          400,
        );
      }

      c.set("validatedBody", parsed.data);
      await next();
    } catch {
      return c.json(
        {
          error: "Validation failed",
          details: { body: ["Invalid JSON body"] },
        },
        400,
      );
    }
  };
};

export const validationMiddleware = {
  body: validateBody,
};

declare module "hono" {
  interface ContextVariableMap {
    validatedBody: unknown;
  }
}
