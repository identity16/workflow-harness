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

### TDD (Test-Driven Development)

모든 새 기능과 버그 수정은 **반드시 TDD 방식으로 개발한다.**

1. **Red** — 실패하는 테스트를 먼저 작성한다. 구현 코드보다 테스트가 항상 먼저다.
2. **Green** — 테스트를 통과하는 최소한의 코드를 작성한다. 과도한 구현을 하지 않는다.
3. **Refactor** — 테스트가 통과하는 상태를 유지하면서 코드를 정리한다.

#### 세부 규칙

- 테스트 러너는 `bun test`를 사용한다.
- 테스트 파일은 `*.test.ts` 또는 `*.spec.ts` 확장자를 사용한다.
- 테스트 파일은 대상 파일과 같은 디렉터리에 둔다 (co-location).
- 커밋 전에 반드시 `bun test`로 전체 테스트를 실행하고 통과를 확인한다.
- 테스트 없이 기능 코드를 커밋하지 않는다.
- 버그 수정 시 해당 버그를 재현하는 테스트를 먼저 작성한 뒤 수정한다.

### PR 규칙

- PR 하나에 관심사 하나. 여러 변경을 섞지 않는다.
- 새 기능에는 테스트를 추가한다 (TDD 방식으로).
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

## MCP 플러그인

### Context7

- **Context7 MCP 플러그인이 활성화되어 있다.** (`.mcp.json` 참고)
- 라이브러리·프레임워크의 기술 문서를 참조할 때는 **Context7을 우선적으로 활용한다.**
- 공식 문서의 최신 버전을 직접 조회할 수 있으므로, 오래된 지식에 의존하지 않고 정확한 API·사용법을 확인한다.
- 특히 다음 상황에서 반드시 Context7을 사용한다:
  - 외부 라이브러리의 API 시그니처나 옵션을 확인할 때
  - 프레임워크 설정·구성 방법을 참고할 때
  - 버전별 breaking change나 마이그레이션 가이드를 조회할 때

## 개발 시작

```bash
bun install
```
