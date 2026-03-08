import type { Artifact } from "./types.ts";

export interface AdapterIssue {
  id: string;
  title: string;
  description?: string;
  status: string;
  labels: string[];
  url: string;
}

export interface CreateIssueInput {
  title: string;
  description?: string;
  labels?: string[];
  teamId?: string;
}

export interface UpdateIssueInput {
  title?: string;
  description?: string;
  status?: string;
  labels?: string[];
}

export interface Adapter {
  listIssues(): Promise<Artifact<AdapterIssue>[]>;
  getIssue(id: string): Promise<Artifact<AdapterIssue>>;
  createIssue(input: CreateIssueInput): Promise<Artifact<AdapterIssue>>;
  updateIssue(id: string, input: UpdateIssueInput): Promise<Artifact<AdapterIssue>>;
}
