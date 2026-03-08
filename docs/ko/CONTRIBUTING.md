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
- 새 기능에는 테스트를 추가할 것
- PR은 하나의 관심사에 집중할 것

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
