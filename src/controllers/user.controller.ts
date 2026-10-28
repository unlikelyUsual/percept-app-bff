import { compare, hash } from "bcryptjs";
import type { Context } from "hono";
import { sign } from "jsonwebtoken";
import { connectDb, db } from "../config/db";
import { getEnv } from "../config/env";
import type { AuthResponse, LoginRequest, SignupRequest } from "../models/user";

const env = getEnv();

const createToken = (userId: number, email: string) => {
  return sign({ sub: userId, email }, env.JWT_SECRET, { expiresIn: "1h" });
};

export const signupUser = async (c: Context) => {
  const body = (c.get("validatedBody") ?? {}) as SignupRequest;

  await connectDb();

  const existing = await db.query(
    "SELECT id FROM users WHERE email = $1 LIMIT 1",
    [body.email],
  );

  if (existing.rowCount > 0) {
    return c.json({ error: "Email already registered" }, 409);
  }

  const passwordHash = await hash(body.password, 10);
  const result = await db.query(
    "INSERT INTO users (email, password_hash, created_at) VALUES ($1, $2, now()) RETURNING id, email",
    [body.email, passwordHash],
  );

  const user = result.rows[0] as { id: number; email: string };
  const token = createToken(user.id, user.email);

  const response: AuthResponse = {
    token,
    user,
  };

  return c.json(response, 201);
};

export const loginUser = async (c: Context) => {
  const body = (c.get("validatedBody") ?? {}) as LoginRequest;

  await connectDb();

  const result = await db.query(
    "SELECT id, email, password_hash FROM users WHERE email = $1 LIMIT 1",
    [body.email],
  );

  if (result.rowCount === 0) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const user = result.rows[0] as {
    id: number;
    email: string;
    password_hash: string;
  };

  const passwordMatches = await compare(body.password, user.password_hash);
  if (!passwordMatches) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const token = createToken(user.id, user.email);

  const response: AuthResponse = {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };

  return c.json(response, 200);
};
