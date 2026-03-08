# CLAUDE.md - AI Assistant Guide for Workflow Harness

## Project Overview

Workflow Harness is an open-source, AI-enhanced unified UI that connects to existing task management tools (Linear, Asana, Jira) and augments them with AI capabilities. It enables individual adoption without requiring team-wide changes or tool switching.

**Current state:** Early-stage, documentation-only repository. No source code has been implemented yet.

## Repository Structure

```
workflow-harness/
├── CLAUDE.md              # This file
├── CONTRIBUTING.md        # Contribution guidelines (English)
├── LICENSE                # Apache 2.0
├── README.md              # Project overview (English)
└── docs/
    ├── en/
    │   └── overview.md    # Detailed design document (English)
    └── ko/
        ├── CONTRIBUTING.md
        ├── README.md
        └── overview.md   # Detailed design document (Korean)
```

## Tech Stack (Planned)

- **Runtime:** Bun
- **Language:** TypeScript (strict — no plain JavaScript)
- **Package management:** Bun workspaces (monorepo)
- **Node.js compatibility:** 20+
- **License:** Apache 2.0

## Planned Monorepo Packages

- `@workflow-harness/core` — Context Engine, Trust Policy, Q&A Protocol, Artifact Tagging
- `@workflow-harness/adapter-linear` — Linear API integration, bi-directional sync
- `@workflow-harness/app` — Web UI (Kanban board, Issue Detail, inline Q&A)
- Future: `adapter-asana`, `adapter-jira`, Figma/GitHub/Claude Code integrations

## Development Setup

```bash
git clone <repo-url>
cd workflow-harness
bun install
```

## Commit Message Convention

Use conventional commit prefixes:

```
feat: add trust policy rule matching
fix: correct webhook event parsing for Linear
docs: update roadmap with Phase 2 details
```

## Development Guidelines

- Write TypeScript — never plain JavaScript
- Follow existing code style and conventions
- Add tests for new functionality
- Keep PRs focused on a single concern
- Documentation exists in both English (`docs/en/`, root) and Korean (`docs/ko/`) — update both when modifying docs

## Architecture Principles

1. **Zero Friction** — Individual adoption without team buy-in or process changes
2. **Observable** — All AI actions are visible, traceable, and explainable
3. **Human-in-the-Loop** — Humans maintain control; AI operates within defined boundaries
4. **Individual-First** — Start with one person; team adoption happens through results

## Core Concepts

- **Trust Level:** Artifacts are tagged as `ai-generated` or `human-verified`
- **Trust Policy:** Adaptive rules learned from user behavior patterns
- **Unified UI:** Proxy architecture connecting to existing task tools
- **Context Engine:** Semi-automatic context enrichment from code, docs, past issues
- **Adapter Pattern:** Tool-specific integrations (Linear first, then Asana/Jira)

## Multi-Language Documentation

All documentation is maintained in English and Korean. When creating or updating docs, ensure both language versions stay in sync.
