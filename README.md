# Workflow Harness

[English](README.md) | [한국어](docs/ko/README.md)

> Harness the power of AI — without changing how you work.

## Why

AI is powerful. But adopting it at work still feels like starting over — new tools, new processes, new habits. And most AI tools require the whole team to buy in before anyone gets value.

What if just *you* could start, right now, without asking anyone's permission?

**Workflow Harness** is an AI-enhanced interface that sits on top of your existing tools. Connect your Linear (or Asana, Jira) account, and you get the same issues, the same boards, the same workflow — but with AI quietly enriching everything behind the scenes. Your teammates keep using Linear as usual. They don't even need to know. They just notice you're getting more done.

When they ask how, they'll want it too. That's how adoption spreads.

## What

Workflow Harness is an open-source **unified UI** that connects to your existing task management tools and augments them with AI — with two core principles:

### Every output has a Trust Level

All AI-produced artifacts are tagged as either `ai-generated` or `human-verified`. You always know what AI did on its own and what you've confirmed. This isn't a feature — it's a philosophy that runs through the entire system.

### You control the boundary

**Trust Policies** define where AI can act autonomously and where your confirmation is required. But you don't configure them — **they learn from you**. Start with everything requiring approval. As the system observes your patterns ("you always approve `chore` issues"), it suggests policy changes. You confirm with a single click. The policy evolves with you and your team — no config files, no label mappings to maintain.

```
Week 1:  AI asks you about everything
Week 3:  "You always approve chores. Auto-enrich?" → "Yes"
Week 6:  "Docs too?" → "Yes"
         You only review what actually needs your attention.
```

## How It Works

```
You open Workflow Harness (connected to your Linear)
        │
  You create or view an issue
  (synced bi-directionally with Linear)
        │
  Context Engine activates
  ├─ Gathers related code, docs, past issues
  └─ Checks your Trust Policy
        │
  ┌─────┴─────┐
  │            │
ai-only    human-required
  │            │
Auto-      Inline Q&A
enrich     (minimal questions,
  │         right in the UI)
  └─────┬──────┘
        │
  Enriched issue with
  trust-level metadata
        │
  Synced back to Linear
  (teammates see richer issues)
```

Your teammates in Linear see better-written issues with more context. They don't need to know how it happened.

## Philosophy

- **Zero Friction** — You don't switch tools. You use the same data, the same workflow. Just a better interface with AI built in.
- **Observable** — Every AI action is visible, traceable, and explainable.
- **Human-in-the-Loop** — You decide the boundary. AI operates within it.
- **Individual-first** — One person can start today. Team adoption happens naturally through results, not mandates.

Read the full overview: [English](docs/en/overview.md) | [한국어](docs/ko/overview.md)

## Roadmap

| Phase | Focus | Packages |
|-------|-------|----------|
| **1** | Core Engine + Linear | `core`, `adapter-linear`, `app` |
| **2** | Task Tool Expansion | `adapter-asana`, `adapter-jira` |
| **3** | Work Tool Integration | Figma, GitHub, Claude Code Skills |

## Tech Stack

- **Monorepo** with Bun workspaces
- **TypeScript** on Bun runtime
- **License**: Apache 2.0

## Contributing

This project is in its early stages. We welcome contributions, ideas, and feedback.

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

[Apache 2.0](LICENSE)
