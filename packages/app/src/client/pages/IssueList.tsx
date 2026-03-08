import type { AdapterIssue, Artifact } from "@workflow-harness/core";
import { useEffect, useState } from "react";
import { TrustBadge } from "../components/TrustBadge.tsx";

interface IssueListProps {
  onSelect: (id: string) => void;
}

export function IssueList({ onSelect }: IssueListProps) {
  const [issues, setIssues] = useState<Artifact<AdapterIssue>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/issues")
      .then((res) => res.json())
      .then(setIssues)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading issues...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (issues.length === 0) return <p>No issues found.</p>;

  return (
    <div>
      <h2>Issues</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {issues.map((issue) => (
          <li
            key={issue.data.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
              cursor: "pointer",
            }}
            onClick={() => onSelect(issue.data.id)}
            onKeyDown={(e) => e.key === "Enter" && onSelect(issue.data.id)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>{issue.data.title}</strong>
              <TrustBadge level={issue.trustLevel} />
            </div>
            <div style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
              {issue.data.status}
              {issue.data.labels.length > 0 && ` · ${issue.data.labels.join(", ")}`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
