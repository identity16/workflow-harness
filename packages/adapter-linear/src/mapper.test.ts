import { describe, expect, test } from "bun:test";
import type { LinearIssueData } from "./mapper.ts";
import { toAdapterIssue, toLinearCreateInput } from "./mapper.ts";

describe("toAdapterIssue", () => {
  const linearIssue: LinearIssueData = {
    id: "issue-uuid",
    title: "Fix login bug",
    description: "Users cannot log in",
    url: "https://linear.app/team/ENG-123",
    identifier: "ENG-123",
    labelIds: ["label-1", "label-2"],
    state: { name: "In Progress" },
  };

  test("maps Linear issue to AdapterIssue", () => {
    const result = toAdapterIssue(linearIssue);
    expect(result.id).toBe("issue-uuid");
    expect(result.title).toBe("Fix login bug");
    expect(result.description).toBe("Users cannot log in");
    expect(result.status).toBe("In Progress");
    expect(result.labels).toEqual(["label-1", "label-2"]);
    expect(result.url).toBe("https://linear.app/team/ENG-123");
  });

  test("handles missing description", () => {
    const issue = { ...linearIssue, description: undefined };
    const result = toAdapterIssue(issue);
    expect(result.description).toBeUndefined();
  });

  test("handles null state", () => {
    const issue = { ...linearIssue, state: null };
    const result = toAdapterIssue(issue);
    expect(result.status).toBe("Unknown");
  });
});

describe("toLinearCreateInput", () => {
  test("maps CreateIssueInput to Linear create input", () => {
    const result = toLinearCreateInput({
      title: "New issue",
      description: "Description here",
      labels: ["label-1"],
      teamId: "team-1",
    });
    expect(result.title).toBe("New issue");
    expect(result.description).toBe("Description here");
    expect(result.labelIds).toEqual(["label-1"]);
    expect(result.teamId).toBe("team-1");
  });

  test("omits optional fields when not provided", () => {
    const result = toLinearCreateInput({ title: "Minimal" });
    expect(result.title).toBe("Minimal");
    expect(result).not.toHaveProperty("description");
    expect(result).not.toHaveProperty("labelIds");
    expect(result).not.toHaveProperty("teamId");
  });
});
