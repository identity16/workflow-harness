import type { Artifact, TrustLevel } from "./types.ts";

export function createArtifact<T>(
  data: T,
  trustLevel: TrustLevel,
  origin: "human" | "ai",
): Artifact<T> {
  return { data, trustLevel, origin, createdAt: new Date() };
}

export function verifyArtifact<T>(artifact: Artifact<T>): Artifact<T> {
  return { ...artifact, trustLevel: "human-verified" };
}
