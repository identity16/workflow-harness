# Workflow Harness

> Harness the power of AI — without changing how you work.

## Background

Companies of all sizes are exploring AI workflows, but most attempts stall at the same point: **integrating AI into existing systems and processes**. The gap between "AI is impressive in demos" and "AI is useful in our daily work" remains wide.

The core issue isn't a lack of AI capability — it's friction. Adopting AI typically means learning new tools, changing established processes, and convincing the entire team to switch. For individuals already embedded in Linear, Asana, Jira, Figma, and GitHub, this is a non-starter.

**Workflow Harness** takes the opposite approach: it's a unified interface that connects to your existing tools and augments them with AI. You see the same issues, the same boards, the same data — but with AI working behind the scenes to enrich your workflow. Your teammates keep using their tools as usual. They just notice that your issues are better-scoped, your context is richer, and you're getting more done.

Adoption starts with one person. It spreads through results.

## Philosophy

### 1. Zero Friction

Adoption cost must be near zero. A single individual should be able to start using Workflow Harness without any team buy-in, process changes, or tool migration. You connect your existing account, and you're working — with the same data, in a better interface. Your teammates don't need to know or change anything.

### 2. Observable

AI should never be a black box. Every action AI takes is visible, traceable, and explainable. Users can always see *what* AI did, *why* it did it, and *what sources* it used.

### 3. Human-in-the-Loop

AI does not act autonomously by default. Humans maintain control over what AI can do, when it can do it, and how much trust to place in its output. The system is designed around human judgment, not AI autonomy.

### 4. Individual-first

The unit of adoption is a single person, not a team or organization. One developer can start using Workflow Harness today. When teammates see the results — richer issues, better context, faster delivery — they'll want it too. Team-level features (shared Trust Policies, team dashboards) emerge naturally as adoption grows, but they're never a prerequisite.

## Core Concepts

### Trust Level

Every artifact produced by Workflow Harness carries a **trust level**:

| Trust Level | Meaning | Example |
|---|---|---|
| `ai-generated` | Produced by AI without human review | Auto-collected context, AI-created draft issues |
| `human-verified` | Reviewed and approved by a human | Context confirmed via Q&A, manually approved issues |

This distinction is a **project-wide philosophy**, not just a feature flag. Any output — context, issues, suggestions, code — is always tagged with its trust level, so consumers of that information can make informed decisions about how much to rely on it.

### Trust Policy

Trust Policies define **when AI can act autonomously and when human confirmation is required**.

#### Adaptive Learning

You don't need to configure Trust Policies manually. The system **learns from your behavior**:

1. **Start**: Everything defaults to `human-required`. AI always asks for confirmation.
2. **Observe**: The system tracks your Q&A responses — which types of issues you always approve, which you modify, which you reject.
3. **Suggest**: When a pattern emerges ("You've approved all `chore`-labeled issues 15 times in a row"), the system proposes a policy change.
4. **Confirm**: You approve the suggestion, and the policy updates. One quick decision instead of ongoing Q&A.

```
Week 1:
  AI: "This context relevant?" → You: "Yes"
  AI: "This context relevant?" → You: "Yes"
  AI: "This context relevant?" → You: "Yes"
  (repeat for every issue)

Week 3:
  AI: "You've always approved context for 'chore' issues.
       Auto-enrich these from now on?"
  You: "Yes"
  → Policy updated: chore → ai-only

Week 6:
  AI: "You've always approved context for 'docs' issues too."
  You: "Yes"
  → Policy updated: docs → ai-only
```

This means the system **adapts as your organization evolves**. When labels change, when team conventions shift, when new issue types appear — the learning loop picks up the new patterns automatically. No config files to maintain, no mappings to update.

#### Manual Override

You can always set explicit rules when you know what you want:

```yaml
# Explicit overrides (optional)
rules:
  - match: { label: "security" }
    trust: human-required    # always, no matter what
```

#### Individual → Team

Initially, Trust Policies are **personal** — learned from your behavior. As team adoption grows, policies can scale up to **team-level**, providing shared defaults while allowing individual overrides.

```
Individual adoption:
  Personal Trust Policy (learned from my behavior)
  └─ "I trust AI for chores, not for bugs"

Team adoption:
  Team Trust Policy (aggregated from team patterns)
  └─ Personal overrides (per member)
```

### Unified UI (Proxy Architecture)

Workflow Harness is not a new task management tool — it's a **better interface for the ones you already use**. It connects to Linear, Asana, or Jira via their APIs and provides:

- Full issue management (create, edit, organize) — synced bi-directionally
- AI-powered context enrichment — invisible to teammates using the original tool
- Inline Q&A — human verification happens naturally within the issue view, not in a separate dashboard
- Trust Level badges — clearly marking what AI did vs. what you confirmed

```
┌─────────────────────────────────────┐
│  Workflow Harness UI                │
│  (what you use)                     │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │ Kanban   │  │ Issue    │        │
│  │ Board    │  │ Detail   │        │
│  │          │  │ + Q&A    │        │
│  │          │  │ + Trust  │        │
│  │          │  │ + Context│        │
│  └──────────┘  └──────────┘        │
└──────────────┬──────────────────────┘
               │ API sync
┌──────────────┴──────────────────────┐
│  Linear / Asana / Jira              │
│  (where data lives)                 │
│  (what teammates keep using)        │
└─────────────────────────────────────┘
```

### Context Engine

The Context Engine is responsible for **semi-automatic context enrichment**. When an event occurs (e.g., an issue is created), the engine:

1. **Gathers** related information — relevant code, past issues, documentation
2. **Checks** the Trust Policy for this issue type
3. **Branches** based on trust level:
   - `ai-only` → Context is auto-attached, tagged as `ai-generated`
   - `human-required` → Context is presented via inline Q&A for verification, tagged as `human-verified`

The key design goal: **collect as much context as possible automatically, but control quality through human verification where it matters.**

Enriched context is synced back to the underlying tool — so your teammates in Linear benefit from richer issues without knowing how they got that way.

### Origin-Aware Flow

The system distinguishes between **who created** an artifact:

```
Human-created issue:
  → Context Engine enriches it
  → Trust Policy determines auto vs Q&A

AI-created issue:
  → Trust Policy check
  ├─ ai-only policy → Auto-activate (tagged: ai-generated)
  └─ human-required policy → Draft → Q&A → Activate (tagged: human-verified)
```

AI-generated issues are not silently injected into the workflow. Depending on the Trust Policy, they may require human approval before becoming active and syncing to the underlying tool.

### Q&A Protocol

Q&A is the mechanism for human verification. It is designed around **minimal cognitive load**:

- Questions are small, focused, and answerable quickly
- Q&A happens **inline within the issue view** — no context switching, no separate dashboard
- The goal is to make verification feel effortless, not burdensome

## Roadmap

### Phase 1: Core Engine + Linear Integration

Build the foundational system and prove it works with one person, one tool.

**@workflow-harness/core**
- Context Engine — gather and enrich context from multiple sources
- Trust Policy — rule-based trust level assignment (personal scope)
- Q&A Protocol — structured inline verification flow
- Artifact Tagging — trust level metadata on all outputs

**@workflow-harness/adapter-linear**
- Linear API integration (bi-directional sync)
- Issue ↔ Context mapping
- Transparent sync — teammates see enriched issues in Linear

**@workflow-harness/app**
- Unified web UI — Kanban board + issue detail + inline Q&A
- Trust Level badges and context viewer
- Personal Trust Policy configuration

### Phase 2: Task Tool Expansion

Replicate the Linear pattern to other task management tools.

- **@workflow-harness/adapter-asana**
- **@workflow-harness/adapter-jira**
- Shared adapter interface / protocol for community contributions
- Team-level Trust Policy support

### Phase 3: Work Tool Integration

Extend from "enriching context" to "assisting with actual work."

- **Figma integration** — design context flows into development issues
- **GitHub integration** — code context, PR workflows
- **Claude Code Skills** — AI-powered workflow automation triggered by enriched context

## Technical Foundation

- **Monorepo** managed with Bun workspaces
- **Language**: TypeScript (Bun runtime)
- **License**: Apache 2.0

## Contributing

This project is open source and welcomes contributions. See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.
