import { Hono } from "hono";
import { z } from "zod";
import { loginUser, signupUser } from "../controllers/user.controller";
import { validationMiddleware } from "../middleware/validate";

export const userRouter = new Hono();

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

userRouter.post("/signup", validationMiddleware.body(signupSchema), signupUser);
userRouter.post("/login", validationMiddleware.body(loginSchema), loginUser);
