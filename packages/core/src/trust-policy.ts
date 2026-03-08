import type { TrustDecision, TrustPolicy, TrustPolicyRule } from "./types.ts";

export function createPolicy(rules: TrustPolicyRule[] = []): TrustPolicy {
  return { rules, defaultTrust: "human-required" };
}

export function evaluate(policy: TrustPolicy, context: Record<string, string>): TrustDecision {
  for (const rule of policy.rules) {
    const matches = Object.entries(rule.match).every(([key, value]) => context[key] === value);
    if (matches) {
      return rule.trust;
    }
  }
  return policy.defaultTrust;
}
