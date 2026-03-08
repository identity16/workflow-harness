import { verifyArtifact } from "./artifact.ts";
import type { Artifact, QAAnswer, QAQuestion } from "./types.ts";

export function createQuestion(text: string, artifactId: string): QAQuestion {
  return {
    id: crypto.randomUUID(),
    text,
    artifactId,
  };
}

export function processAnswer<T>(answer: QAAnswer, artifact: Artifact<T>): Artifact<T> {
  if (answer.approved) {
    return verifyArtifact(artifact);
  }
  return { ...artifact };
}
