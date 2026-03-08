# Contributing to Workflow Harness

[English](CONTRIBUTING.md) | [한국어](docs/ko/CONTRIBUTING.md)

Thank you for your interest in contributing to Workflow Harness! This project is in its early stages, and we welcome all forms of contribution.

## Ways to Contribute

- **Ideas & Feedback** — Open an issue to share your thoughts on the project direction
- **Bug Reports** — Found something broken? Let us know with a detailed issue
- **Code** — Pick up an open issue or propose a new feature via PR
- **Documentation** — Help improve or translate our docs

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (latest)
- Node.js 20+ (for compatibility)

### Setup

```bash
git clone https://github.com/anthropics/workflow-harness.git
cd workflow-harness
bun install
```

## Development Guidelines

- Write TypeScript
- Follow existing code style and conventions
- Add tests for new functionality (using TDD)
- Keep PRs focused — one concern per PR

### TDD (Test-Driven Development)

All new features and bug fixes **must be developed using TDD.**

1. **Red** — Write a failing test first. Tests always come before implementation code.
2. **Green** — Write the minimal code to make the test pass. Do not over-implement.
3. **Refactor** — Clean up code while keeping all tests green.

#### Rules

- Use `bun test` as the test runner.
- Test files use `*.test.ts` or `*.spec.ts` extensions.
- Co-locate test files with the source files they test.
- Run `bun test` and ensure all tests pass before committing.
- Never commit feature code without accompanying tests.
- When fixing a bug, write a test that reproduces it before applying the fix.

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add trust policy rule matching
fix: correct webhook event parsing for Linear
docs: update roadmap with Phase 2 details
```

## Code of Conduct

Be respectful, constructive, and inclusive. We're building something together.

## License

By contributing, you agree that your contributions will be licensed under the [Apache 2.0 License](LICENSE).
