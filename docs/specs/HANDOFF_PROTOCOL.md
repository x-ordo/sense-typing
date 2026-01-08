# SPEC: Structured Handoff Protocol (v1.0)

## 1. Overview
에이전트 간의 협업 시 자유 텍스트 대신 본 규격에 따른 구조화된 데이터를 교환하여 환각을 방지하고 컨텍스트 정합성을 유지함.

## 2. Handoff Schema (JSON)
```json
{
  "handoff": {
    "version": "1.0",
    "trace_id": "string (uuid)",
    "source": "Agent_Role",
    "destination": "Agent_Role",
    "phase": "Discovery|Design|Implementation|QA|Ops",
    "payload": {
      "context": "작업 배경 및 목표",
      "artifacts": ["생성된 파일 경로 또는 문서 링크"],
      "decisions": ["주요 아키텍처/비즈니스 결정 사항"],
      "constraints": ["기술적 제약 또는 라이선스 제한"],
      "open_questions": ["후속 단계에서 해결이 필요한 사항"]
    },
    "quality_gate": {
      "confidence_score": 0.0,
      "validation_passed": true,
      "metrics": {
        "minimalism": 0,
        "authority": 0,
        "legibility": 0
      }
    }
  }
}
```

## 3. Phase Gates Definition
- **Gate 1 (Spec):** PM 승인 후 Design 단계 진입.
- **Gate 2 (Design):** 아키텍트의 기술 실현 가능성 검토 후 Dev 단계 진입.
- **Gate 3 (Code):** 단위 테스트 커버리지 80% 달성 및 Lint 통과 후 QA 진입.
- **Gate 4 (QA):** P0/P1 버그 제로 달성 후 Ops 진입.
