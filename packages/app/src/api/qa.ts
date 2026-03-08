import { createQuestion, processAnswer } from "@workflow-harness/core";
import { Hono } from "hono";
import type { AppContext } from "../server.ts";

export function qaApi(_ctx: AppContext) {
  const app = new Hono();

  app.post("/question", async (c) => {
    const { text, artifactId } = await c.req.json();
    const question = createQuestion(text, artifactId);
    return c.json(question, 201);
  });

  app.post("/answer", async (c) => {
    const { answer, artifact } = await c.req.json();
    const result = processAnswer(answer, artifact);
    return c.json(result);
  });

  return app;
}
