export type TrustLevel = "ai-generated" | "human-verified";

export interface Artifact<T> {
  data: T;
  trustLevel: TrustLevel;
  origin: "human" | "ai";
  createdAt: Date;
}

export type TrustDecision = "ai-only" | "human-required";

export interface TrustPolicyRule {
  match: Record<string, string>;
  trust: TrustDecision;
}

export interface TrustPolicy {
  rules: TrustPolicyRule[];
  defaultTrust: TrustDecision;
}

export interface QAQuestion {
  id: string;
  text: string;
  artifactId: string;
  options?: string[];
}

export interface QAAnswer {
  questionId: string;
  approved: boolean;
  comment?: string;
}
