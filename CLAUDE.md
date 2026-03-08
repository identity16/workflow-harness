# CLAUDE.md

## What is this project

Workflow Harness — 기존 태스크 관리 도구(Linear, Asana, Jira 등)에 연결하여 AI로 워크플로우를 강화하는 오픈소스 통합 UI. 팀 전체가 아닌 개인 단위로 도입할 수 있다.

## 변하지 않는 규칙

### 언어 및 런타임

- **TypeScript만 사용한다.** 순수 JavaScript 금지.
- **런타임은 Bun**, 패키지 관리도 Bun workspaces (monorepo).
- Node.js 20+ 호환성을 유지한다.

### 커밋 메시지

conventional commit 형식을 따른다:

```
feat: add trust policy rule matching
fix: correct webhook event parsing for Linear
docs: update roadmap with Phase 2 details
```

### PR 규칙

- PR 하나에 관심사 하나. 여러 변경을 섞지 않는다.
- 새 기능에는 테스트를 추가한다.
- 기존 코드 스타일과 컨벤션을 따른다.

### 문서 이중 관리

문서는 영어(루트 및 `docs/en/`)와 한국어(`docs/ko/`) 두 벌을 유지한다. 한쪽을 수정하면 반드시 다른 쪽도 동기화한다.

### 라이선스

Apache 2.0.

## 설계 원칙 (변하지 않는 것)

1. **Zero Friction** — 팀 동의나 프로세스 변경 없이 개인이 바로 쓸 수 있어야 한다.
2. **Observable** — AI의 모든 행동은 보이고, 추적 가능하고, 설명 가능해야 한다.
3. **Human-in-the-Loop** — AI는 기본적으로 자율 행동하지 않는다. 사람이 통제권을 갖는다.
4. **Individual-First** — 도입 단위는 개인. 팀 기능은 자연스럽게 따라온다.

## 핵심 도메인 개념 (변하지 않는 것)

- **Trust Level** — 모든 산출물에 `ai-generated` 또는 `human-verified` 태그를 붙인다.
- **Trust Policy** — 사용자 행동 패턴으로부터 학습되는 적응형 규칙. AI가 자율 행동할 수 있는 범위를 정의한다.
- **Adapter Pattern** — 외부 도구별 어댑터를 통해 연동한다. 도구가 바뀌어도 코어는 변하지 않는다.

## 개발 시작

```bash
bun install
```
