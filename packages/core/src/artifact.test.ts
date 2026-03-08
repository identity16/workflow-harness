import { describe, expect, test } from "bun:test";
import { createArtifact, verifyArtifact } from "./artifact.ts";

describe("createArtifact", () => {
  test("creates artifact with given data and trust level", () => {
    const artifact = createArtifact("hello", "ai-generated", "ai");
    expect(artifact.data).toBe("hello");
    expect(artifact.trustLevel).toBe("ai-generated");
    expect(artifact.origin).toBe("ai");
    expect(artifact.createdAt).toBeInstanceOf(Date);
  });

  test("creates human-origin artifact", () => {
    const artifact = createArtifact({ id: "1" }, "human-verified", "human");
    expect(artifact.origin).toBe("human");
    expect(artifact.trustLevel).toBe("human-verified");
  });
});

describe("verifyArtifact", () => {
  test("changes trust level to human-verified", () => {
    const artifact = createArtifact("data", "ai-generated", "ai");
    const verified = verifyArtifact(artifact);
    expect(verified.trustLevel).toBe("human-verified");
    expect(verified.data).toBe("data");
  });

  test("returns new artifact, does not mutate original", () => {
    const artifact = createArtifact("data", "ai-generated", "ai");
    const verified = verifyArtifact(artifact);
    expect(artifact.trustLevel).toBe("ai-generated");
    expect(verified).not.toBe(artifact);
  });
});
