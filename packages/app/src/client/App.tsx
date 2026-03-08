import { useState } from "react";
import { IssueDetail } from "./pages/IssueDetail.tsx";
import { IssueList } from "./pages/IssueList.tsx";

export function App() {
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", maxWidth: 960, margin: "0 auto", padding: 20 }}
    >
      <h1>Workflow Harness</h1>
      {selectedIssueId ? (
        <IssueDetail issueId={selectedIssueId} onBack={() => setSelectedIssueId(null)} />
      ) : (
        <IssueList onSelect={setSelectedIssueId} />
      )}
    </div>
  );
}
