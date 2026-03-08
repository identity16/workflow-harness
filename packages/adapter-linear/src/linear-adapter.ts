import { LinearClient } from "@linear/sdk";
import {
  type Adapter,
  type AdapterIssue,
  type Artifact,
  type CreateIssueInput,
  createArtifact,
  type UpdateIssueInput,
} from "@workflow-harness/core";
import { toAdapterIssue, toLinearCreateInput } from "./mapper.ts";

export class LinearAdapter implements Adapter {
  private client: LinearClient;

  constructor(apiKey: string) {
    this.client = new LinearClient({ apiKey });
  }

  async listIssues(): Promise<Artifact<AdapterIssue>[]> {
    const response = await this.client.issues();
    const issues: Artifact<AdapterIssue>[] = [];

    for (const issue of response.nodes) {
      const state = await issue.state;
      const adapterIssue = toAdapterIssue({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        url: issue.url,
        identifier: issue.identifier,
        labelIds: issue.labelIds,
        state: state ? { name: state.name } : null,
      });
      issues.push(createArtifact(adapterIssue, "ai-generated", "human"));
    }

    return issues;
  }

  async getIssue(id: string): Promise<Artifact<AdapterIssue>> {
    const issue = await this.client.issue(id);
    const state = await issue.state;
    const adapterIssue = toAdapterIssue({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      url: issue.url,
      identifier: issue.identifier,
      labelIds: issue.labelIds,
      state: state ? { name: state.name } : null,
    });
    return createArtifact(adapterIssue, "ai-generated", "human");
  }

  async createIssue(input: CreateIssueInput): Promise<Artifact<AdapterIssue>> {
    const linearInput = toLinearCreateInput(input);
    if (!linearInput.teamId) {
      throw new Error("teamId is required for creating Linear issues");
    }
    const payload = await this.client.createIssue({
      ...linearInput,
      teamId: linearInput.teamId,
    });
    const issue = await payload.issue;
    if (!issue) {
      throw new Error("Failed to create issue");
    }
    const state = await issue.state;
    const adapterIssue = toAdapterIssue({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      url: issue.url,
      identifier: issue.identifier,
      labelIds: issue.labelIds,
      state: state ? { name: state.name } : null,
    });
    return createArtifact(adapterIssue, "ai-generated", "human");
  }

  async updateIssue(id: string, input: UpdateIssueInput): Promise<Artifact<AdapterIssue>> {
    await this.client.updateIssue(id, {
      ...(input.title && { title: input.title }),
      ...(input.description && { description: input.description }),
      ...(input.labels && { labelIds: input.labels }),
    });
    return this.getIssue(id);
  }
}
