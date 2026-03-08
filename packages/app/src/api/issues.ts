import { Hono } from "hono";
import type { AppContext } from "../server.ts";

export function issuesApi(ctx: AppContext) {
  const app = new Hono();

  app.get("/", async (c) => {
    const issues = await ctx.adapter.listIssues();
    return c.json(issues);
  });

  app.get("/:id", async (c) => {
    const id = c.req.param("id");
    const issue = await ctx.adapter.getIssue(id);
    return c.json(issue);
  });

  app.post("/", async (c) => {
    const body = await c.req.json();
    const issue = await ctx.adapter.createIssue(body);
    return c.json(issue, 201);
  });

  app.patch("/:id", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const issue = await ctx.adapter.updateIssue(id, body);
    return c.json(issue);
  });

  app.post("/:id/enrich", async (c) => {
    const id = c.req.param("id");
    const issueArtifact = await ctx.adapter.getIssue(id);
    const result = ctx.contextEngine.enrich(issueArtifact.data, ctx.policy);
    return c.json(result);
  });

  return app;
}
