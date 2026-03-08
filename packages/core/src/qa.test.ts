import { describe, expect, test } from "bun:test";
import { createArtifact } from "./artifact.ts";
import { createQuestion, processAnswer } from "./qa.ts";

describe("createQuestion", () => {
  test("creates a Q&A question with unique id", () => {
    const q = createQuestion("Is this context correct?", "artifact-1");
    expect(q.id).toBeTruthy();
    expect(q.text).toBe("Is this context correct?");
    expect(q.artifactId).toBe("artifact-1");
  });

  test("creates questions with unique ids", () => {
    const q1 = createQuestion("Q1", "a1");
    const q2 = createQuestion("Q2", "a2");
    expect(q1.id).not.toBe(q2.id);
  });
});

describe("processAnswer", () => {
  test("verifies artifact when answer is approved", () => {
    const artifact = createArtifact("data", "ai-generated", "ai");
    const result = processAnswer({ questionId: "q1", approved: true }, artifact);
    expect(result.trustLevel).toBe("human-verified");
  });

  test("keeps artifact trust level when answer is not approved", () => {
    const artifact = createArtifact("data", "ai-generated", "ai");
    const result = processAnswer({ questionId: "q1", approved: false }, artifact);
    expect(result.trustLevel).toBe("ai-generated");
  });
});
