import { describe, expect, test } from "bun:test";
import { createPolicy, evaluate } from "./trust-policy.ts";

describe("createPolicy", () => {
  test("creates policy with default trust as human-required", () => {
    const policy = createPolicy();
    expect(policy.defaultTrust).toBe("human-required");
    expect(policy.rules).toEqual([]);
  });

  test("creates policy with custom rules", () => {
    const policy = createPolicy([{ match: { label: "chore" }, trust: "ai-only" }]);
    expect(policy.rules).toHaveLength(1);
    expect(policy.rules[0].trust).toBe("ai-only");
  });
});

describe("evaluate", () => {
  test("returns default trust when no rules match", () => {
    const policy = createPolicy();
    const result = evaluate(policy, { label: "bug" });
    expect(result).toBe("human-required");
  });

  test("returns matching rule trust", () => {
    const policy = createPolicy([{ match: { label: "chore" }, trust: "ai-only" }]);
    const result = evaluate(policy, { label: "chore" });
    expect(result).toBe("ai-only");
  });

  test("returns first matching rule when multiple match", () => {
    const policy = createPolicy([
      { match: { label: "chore" }, trust: "ai-only" },
      { match: { label: "chore" }, trust: "human-required" },
    ]);
    const result = evaluate(policy, { label: "chore" });
    expect(result).toBe("ai-only");
  });

  test("matches all fields in rule", () => {
    const policy = createPolicy([{ match: { label: "chore", priority: "low" }, trust: "ai-only" }]);
    // Only label matches, but priority doesn't — should not match
    expect(evaluate(policy, { label: "chore", priority: "high" })).toBe("human-required");
    // Both match
    expect(evaluate(policy, { label: "chore", priority: "low" })).toBe("ai-only");
  });

  test("context with extra fields still matches", () => {
    const policy = createPolicy([{ match: { label: "docs" }, trust: "ai-only" }]);
    const result = evaluate(policy, {
      label: "docs",
      priority: "medium",
      assignee: "alice",
    });
    expect(result).toBe("ai-only");
  });
});
