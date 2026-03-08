# Workflow Harness 기여 가이드

[English](../../CONTRIBUTING.md) | [한국어](CONTRIBUTING.md)

Workflow Harness에 관심을 가져주셔서 감사합니다! 이 프로젝트는 초기 단계이며, 모든 형태의 기여를 환영합니다.

## 기여 방법

- **아이디어 & 피드백** — 프로젝트 방향에 대한 생각을 이슈로 공유해주세요
- **버그 리포트** — 문제를 발견하셨나요? 상세한 이슈로 알려주세요
- **코드** — 열린 이슈를 해결하거나 PR로 새 기능을 제안해주세요
- **문서** — 문서 개선이나 번역을 도와주세요

## 시작하기

### 사전 요구사항

- [Bun](https://bun.sh) (최신 버전)
- Node.js 20+ (호환성)

### 설정

```bash
git clone https://github.com/anthropics/workflow-harness.git
cd workflow-harness
bun install
```

## 개발 가이드라인

- TypeScript로 작성
- 기존 코드 스타일과 컨벤션을 따를 것
- 새 기능에는 테스트를 추가할 것 (TDD 방식으로)
- PR은 하나의 관심사에 집중할 것

### TDD (Test-Driven Development)

모든 새 기능과 버그 수정은 **반드시 TDD 방식으로 개발합니다.**

1. **Red** — 실패하는 테스트를 먼저 작성합니다. 구현 코드보다 테스트가 항상 먼저입니다.
2. **Green** — 테스트를 통과하는 최소한의 코드를 작성합니다. 과도한 구현을 하지 않습니다.
3. **Refactor** — 테스트가 통과하는 상태를 유지하면서 코드를 정리합니다.

#### 세부 규칙

- 테스트 러너는 `bun test`를 사용합니다.
- 테스트 파일은 `*.test.ts` 또는 `*.spec.ts` 확장자를 사용합니다.
- 테스트 파일은 대상 파일과 같은 디렉터리에 둡니다 (co-location).
- 커밋 전에 반드시 `bun test`로 전체 테스트를 실행하고 통과를 확인합니다.
- 테스트 없이 기능 코드를 커밋하지 않습니다.
- 버그 수정 시 해당 버그를 재현하는 테스트를 먼저 작성한 뒤 수정합니다.

## 커밋 메시지

명확하고 서술적인 커밋 메시지를 사용합니다:

```
feat: add trust policy rule matching
fix: correct webhook event parsing for Linear
docs: update roadmap with Phase 2 details
```

## 행동 강령

서로를 존중하고, 건설적이며, 포용적으로 행동해주세요. 우리는 함께 만들어가고 있습니다.

## 라이선스

기여함으로써, 귀하의 기여가 [Apache 2.0 라이선스](../../LICENSE)에 따라 라이선스될 것에 동의하게 됩니다.
