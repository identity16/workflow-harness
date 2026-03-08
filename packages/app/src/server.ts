import { LinearAdapter } from "@workflow-harness/adapter-linear";
import {
  type Adapter,
  ContextEngine,
  createPolicy,
  type TrustPolicy,
} from "@workflow-harness/core";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { issuesApi } from "./api/issues.ts";
import { qaApi } from "./api/qa.ts";

export interface AppContext {
  adapter: Adapter;
  contextEngine: ContextEngine;
  policy: TrustPolicy;
}

export function createApp(ctx: AppContext) {
  const app = new Hono();

  app.use("/api/*", cors());

  app.route("/api/issues", issuesApi(ctx));
  app.route("/api/qa", qaApi(ctx));

  app.get("/api/health", (c) => c.json({ ok: true }));

  app.use("/*", serveStatic({ root: "./dist" }));

  return app;
}

function startServer() {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    console.error("LINEAR_API_KEY environment variable is required");
    process.exit(1);
  }

  const ctx: AppContext = {
    adapter: new LinearAdapter(apiKey),
    contextEngine: new ContextEngine(),
    policy: createPolicy(),
  };

  const app = createApp(ctx);
  const port = Number(process.env.PORT) || 3000;

  console.log(`Server running at http://localhost:${port}`);
  return { port, fetch: app.fetch };
}

export default import.meta.main ? startServer() : undefined;
