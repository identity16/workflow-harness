import type { TrustLevel } from "@workflow-harness/core";

interface TrustBadgeProps {
  level: TrustLevel;
}

const styles: Record<TrustLevel, { background: string; color: string }> = {
  "ai-generated": { background: "#fef3c7", color: "#92400e" },
  "human-verified": { background: "#d1fae5", color: "#065f46" },
};

export function TrustBadge({ level }: TrustBadgeProps) {
  const style = styles[level];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600,
        ...style,
      }}
    >
      {level}
    </span>
  );
}
