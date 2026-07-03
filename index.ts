import { app } from "./src/app";
import { env } from "./src/config/env";

const port = env.PORT;

console.log(`Server listening on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};

Bun.serve({
  port,
  fetch: app.fetch,
});
