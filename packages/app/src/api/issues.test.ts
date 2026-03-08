import { describe, expect, test } from "bun:test";
import {
  type Adapter,
  type AdapterIssue,
  type Artifact,
  ContextEngine,
  createArtifact,
  createPolicy,
} from "@workflow-harness/core";
import { type AppContext, createApp } from "../server.ts";

const mockIssues: Artifact<AdapterIssue>[] = [
  createArtifact(
    {
      id: "1",
      title: "Test issue",
      description: "desc",
      status: "Todo",
      labels: ["bug"],
      url: "https://example.com/1",
    },
    "ai-generated",
    "human",
  ),
];

const mockAdapter: Adapter = {
  listIssues: () => Promise.resolve(mockIssues),
  getIssue: (id) => {
    const found = mockIssues.find((i) => i.data.id === id);
    if (!found) return Promise.reject(new Error("Not found"));
    return Promise.resolve(found);
  },
  createIssue: (input) =>
    Promise.resolve(
      createArtifact(
        {
          id: "new-1",
          title: input.title,
          description: input.description,
          status: "Todo",
          labels: input.labels ?? [],
          url: "https://example.com/new-1",
        },
        "ai-generated",
        "human",
      ),
    ),
  updateIssue: (id, input) =>
    Promise.resolve(
      createArtifact(
        {
          id,
          title: input.title ?? "Test issue",
          status: input.status ?? "Todo",
          labels: input.labels ?? ["bug"],
          url: "https://example.com/1",
        },
        "ai-generated",
        "human",
      ),
    ),
};

function createTestApp(): ReturnType<typeof createApp> {
  const ctx: AppContext = {
    adapter: mockAdapter,
    contextEngine: new ContextEngine(),
    policy: createPolicy(),
  };
  return createApp(ctx);
}

describe("Issues API", () => {
  test("GET /api/issues returns issue list", async () => {
    const app = createTestApp();
    const res = await app.request("/api/issues");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].data.title).toBe("Test issue");
  });

  test("GET /api/issues/:id returns single issue", async () => {
    const app = createTestApp();
    const res = await app.request("/api/issues/1");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.id).toBe("1");
  });

  test("POST /api/issues creates an issue", async () => {
    const app = createTestApp();
    const res = await app.request("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New issue", teamId: "team-1" }),
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.data.title).toBe("New issue");
  });

  test("POST /api/issues/:id/enrich returns enrichment result", async () => {
    const app = createTestApp();
    const res = await app.request("/api/issues/1/enrich", { method: "POST" });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("artifact");
    expect(body).toHaveProperty("needsQA");
    expect(body.needsQA).toBe(true); // default policy is human-required
  });

  test("GET /api/health returns ok", async () => {
    const app = createTestApp();
    const res = await app.request("/api/health");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});
