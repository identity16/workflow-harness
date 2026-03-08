import { describe, expect, mock, test } from "bun:test";
import { LinearAdapter } from "./linear-adapter.ts";

// Mock the Linear SDK module
const mockIssueNodes = [
  {
    id: "issue-1",
    title: "First issue",
    description: "Description 1",
    url: "https://linear.app/issue-1",
    identifier: "ENG-1",
    labelIds: ["label-a"],
    state: Promise.resolve({ name: "Todo" }),
  },
  {
    id: "issue-2",
    title: "Second issue",
    description: undefined,
    url: "https://linear.app/issue-2",
    identifier: "ENG-2",
    labelIds: [],
    state: Promise.resolve({ name: "In Progress" }),
  },
];

const mockLinearClient = {
  issues: mock(() =>
    Promise.resolve({
      nodes: mockIssueNodes,
    }),
  ),
  issue: mock((id: string) => {
    const found = mockIssueNodes.find((i) => i.id === id);
    if (!found) return Promise.reject(new Error("Not found"));
    return Promise.resolve(found);
  }),
  createIssue: mock(() =>
    Promise.resolve({
      issue: Promise.resolve(mockIssueNodes[0]),
    }),
  ),
  updateIssue: mock(() => Promise.resolve({ success: true })),
};

// Patch the adapter to use mock client
function createMockAdapter(): LinearAdapter {
  const adapter = new LinearAdapter("fake-api-key");
  // Replace internal client with mock
  (adapter as unknown as { client: typeof mockLinearClient }).client = mockLinearClient;
  return adapter;
}

describe("LinearAdapter", () => {
  test("listIssues returns adapter issues wrapped in artifacts", async () => {
    const adapter = createMockAdapter();
    const issues = await adapter.listIssues();

    expect(issues).toHaveLength(2);
    expect(issues[0].data.id).toBe("issue-1");
    expect(issues[0].data.title).toBe("First issue");
    expect(issues[0].data.status).toBe("Todo");
    expect(issues[0].trustLevel).toBe("ai-generated");
    expect(issues[0].origin).toBe("human");
  });

  test("getIssue returns single issue artifact", async () => {
    const adapter = createMockAdapter();
    const issue = await adapter.getIssue("issue-1");

    expect(issue.data.id).toBe("issue-1");
    expect(issue.data.title).toBe("First issue");
    expect(issue.trustLevel).toBe("ai-generated");
  });

  test("createIssue calls Linear API and returns artifact", async () => {
    const adapter = createMockAdapter();
    const issue = await adapter.createIssue({
      title: "New issue",
      teamId: "team-1",
    });

    expect(mockLinearClient.createIssue).toHaveBeenCalled();
    expect(issue.data.id).toBe("issue-1");
    expect(issue.trustLevel).toBe("ai-generated");
  });

  test("createIssue throws when teamId is missing", async () => {
    const adapter = createMockAdapter();
    expect(adapter.createIssue({ title: "No team" })).rejects.toThrow("teamId is required");
  });

  test("updateIssue calls Linear API and refetches", async () => {
    const adapter = createMockAdapter();
    const issue = await adapter.updateIssue("issue-1", {
      title: "Updated title",
    });

    expect(mockLinearClient.updateIssue).toHaveBeenCalled();
    expect(issue.data.id).toBe("issue-1");
  });
});
