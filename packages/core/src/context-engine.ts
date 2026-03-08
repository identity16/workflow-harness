import type { AdapterIssue } from "./adapter.ts";
import { createArtifact } from "./artifact.ts";
import { evaluate } from "./trust-policy.ts";
import type { Artifact, TrustPolicy } from "./types.ts";

export interface EnrichResult {
  artifact: Artifact<AdapterIssue>;
  needsQA: boolean;
}

export class ContextEngine {
  enrich(issue: AdapterIssue, policy: TrustPolicy): EnrichResult {
    const context = this.buildContext(issue);
    const decision = evaluate(policy, context);
    const artifact = createArtifact(issue, "ai-generated", "ai");

    return {
      artifact,
      needsQA: decision === "human-required",
    };
  }

  private buildContext(issue: AdapterIssue): Record<string, string> {
    const context: Record<string, string> = {};
    if (issue.labels.length > 0) {
      context.label = issue.labels[0];
    }
    if (issue.status) {
      context.status = issue.status;
    }
    return context;
  }
}
