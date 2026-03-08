import type { AdapterIssue, CreateIssueInput } from "@workflow-harness/core";

/**
 * Minimal representation of a Linear Issue for mapping purposes.
 * Using a subset interface to avoid coupling to the full Linear SDK types.
 */
export interface LinearIssueData {
  id: string;
  title: string;
  description?: string;
  url: string;
  identifier: string;
  labelIds: string[];
  state: { name: string } | null;
}

export function toAdapterIssue(linear: LinearIssueData): AdapterIssue {
  return {
    id: linear.id,
    title: linear.title,
    description: linear.description ?? undefined,
    status: linear.state?.name ?? "Unknown",
    labels: linear.labelIds,
    url: linear.url,
  };
}

export function toLinearCreateInput(input: CreateIssueInput): {
  title: string;
  description?: string;
  labelIds?: string[];
  teamId?: string;
} {
  return {
    title: input.title,
    ...(input.description && { description: input.description }),
    ...(input.labels && { labelIds: input.labels }),
    ...(input.teamId && { teamId: input.teamId }),
  };
}
