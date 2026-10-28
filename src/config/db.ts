import postgres from "postgres";
import { getEnv } from "./env";

const env = getEnv();

export const db = postgres({
  host: env.PG_HOST,
  port: env.PG_PORT,
  username: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
});

export const connectDb = async () => {
  if (!db.active) {
    await db.connect();
  }
};
