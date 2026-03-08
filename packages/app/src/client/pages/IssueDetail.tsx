import type { AdapterIssue, Artifact, EnrichResult } from "@workflow-harness/core";
import { useEffect, useState } from "react";
import { TrustBadge } from "../components/TrustBadge.tsx";

interface IssueDetailProps {
  issueId: string;
  onBack: () => void;
}

export function IssueDetail({ issueId, onBack }: IssueDetailProps) {
  const [issue, setIssue] = useState<Artifact<AdapterIssue> | null>(null);
  const [enrichResult, setEnrichResult] = useState<EnrichResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/issues/${issueId}`)
      .then((res) => res.json())
      .then(setIssue)
      .finally(() => setLoading(false));
  }, [issueId]);

  const handleEnrich = async () => {
    const res = await fetch(`/api/issues/${issueId}/enrich`, {
      method: "POST",
    });
    const result = await res.json();
    setEnrichResult(result);
  };

  const handleQAApprove = async () => {
    if (!enrichResult) return;
    const res = await fetch("/api/qa/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: { questionId: "q1", approved: true },
        artifact: enrichResult.artifact,
      }),
    });
    const updated = await res.json();
    setIssue(updated);
    setEnrichResult(null);
  };

  if (loading) return <p>Loading...</p>;
  if (!issue) return <p>Issue not found.</p>;

  return (
    <div>
      <button type="button" onClick={onBack} style={{ marginBottom: 16, cursor: "pointer" }}>
        &larr; Back
      </button>

      <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>{issue.data.title}</h2>
          <TrustBadge level={issue.trustLevel} />
        </div>

        <p style={{ color: "#6b7280" }}>
          Status: {issue.data.status}
          {issue.data.labels.length > 0 && ` · Labels: ${issue.data.labels.join(", ")}`}
        </p>

        {issue.data.description && (
          <div style={{ background: "#f9fafb", padding: 12, borderRadius: 6, marginTop: 12 }}>
            {issue.data.description}
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            onClick={handleEnrich}
            style={{ cursor: "pointer", padding: "8px 16px" }}
          >
            Enrich with AI
          </button>
        </div>

        {enrichResult && (
          <div
            style={{
              marginTop: 16,
              border: "1px solid #fbbf24",
              borderRadius: 8,
              padding: 16,
              background: "#fffbeb",
            }}
          >
            <h3 style={{ margin: "0 0 8px" }}>Q&A Verification</h3>
            <p>
              {enrichResult.needsQA
                ? "This enrichment requires your verification."
                : "AI-only policy — auto-enriched."}
            </p>
            <p>
              Trust Level: <TrustBadge level={enrichResult.artifact.trustLevel} />
            </p>
            {enrichResult.needsQA && (
              <button
                type="button"
                onClick={handleQAApprove}
                style={{
                  cursor: "pointer",
                  padding: "8px 16px",
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                }}
              >
                Approve & Verify
              </button>
            )}
          </div>
        )}
      </div>

      <p style={{ fontSize: 12, marginTop: 16 }}>
        <a href={issue.data.url} target="_blank" rel="noopener noreferrer">
          View in Linear
        </a>
      </p>
    </div>
  );
}
