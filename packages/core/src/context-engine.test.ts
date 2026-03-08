import { describe, expect, test } from "bun:test";
import type { AdapterIssue } from "./adapter.ts";
import { ContextEngine } from "./context-engine.ts";
import { createPolicy } from "./trust-policy.ts";

const sampleIssue: AdapterIssue = {
  id: "issue-1",
  title: "Fix login bug",
  description: "Users cannot log in",
  status: "todo",
  labels: ["bug"],
  url: "https://linear.app/issue-1",
};

describe("ContextEngine", () => {
  test("returns needsQA=false when policy is ai-only", () => {
    const policy = createPolicy([{ match: { label: "bug" }, trust: "ai-only" }]);
    const engine = new ContextEngine();
    const result = engine.enrich(sampleIssue, policy);

    expect(result.needsQA).toBe(false);
    expect(result.artifact.trustLevel).toBe("ai-generated");
    expect(result.artifact.data).toEqual(sampleIssue);
  });

  test("returns needsQA=true when policy is human-required", () => {
    const policy = createPolicy([{ match: { label: "bug" }, trust: "human-required" }]);
    const engine = new ContextEngine();
    const result = engine.enrich(sampleIssue, policy);

    expect(result.needsQA).toBe(true);
    expect(result.artifact.trustLevel).toBe("ai-generated");
  });

  test("uses default trust when no rule matches", () => {
    const policy = createPolicy();
    const engine = new ContextEngine();
    const result = engine.enrich(sampleIssue, policy);

    expect(result.needsQA).toBe(true);
    expect(result.artifact.trustLevel).toBe("ai-generated");
  });

  test("builds context from issue labels", () => {
    const policy = createPolicy([{ match: { label: "chore" }, trust: "ai-only" }]);
    const engine = new ContextEngine();

    const choreIssue = { ...sampleIssue, labels: ["chore"] };
    const result = engine.enrich(choreIssue, policy);
    expect(result.needsQA).toBe(false);
  });
});
