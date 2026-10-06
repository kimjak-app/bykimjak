# byKimjak MAKE — Section Operating Guide v2.0

> **Updated:** 2026-10-06
> **Parent:** `BYKIMJAK_BLOG_MASTER_GUIDE.md`

## 0. MAKE의 한 줄 정의

> **MAKE는 byKimjak의 작품·게임·앱·영상이 실제 결과물이 되기까지의 제작 과정을 기록하는 곳이다.**

WATCH가 완성 결과를 체험시키면, MAKE는 그 결과가 어떻게 만들어졌는지 보여준다.

## 1. 프로젝트 구조

현재/확정 프로젝트:

```text
02 MAKE
├─ EASTWAR 개발일지
├─ GrandSlam 개발일지
├─ TakeZero 제작/캐릭터 노트
├─ GAPPAE Trailer 제작일지
└─ Magic Block Master 제작일지 (작업 축적 시)
```

기존 02-A/B/C/D 번호가 이미 사용 중이면 현재 main의 번호를 우선한다.
Magic Block Master 번호는 실제 추가 시 현재 main을 확인하고 확정한다.

## 2. 역할

MAKE 글의 기본 흐름:

```text
왜 시작했나
→ 무엇이 문제였나
→ 어떤 선택을 했나
→ 무엇을 만들었나
→ 실제 테스트에서 무엇이 달랐나
→ 어떻게 수정했나
→ 결과
→ 다음 단계
```

기술 changelog만 쓰지 않는다.
AI가 다 만들었다는 식으로 쓰지 않는다.
최종 판단·선택·검수의 주체는 김작이다.

## 3. GAPPAE

현재 `make/gappae-trailer.html`과 개발일지 계열을 유지한다.

WATCH와 분리:
- WATCH/GAPPAE = 트레일러, 캐릭터 시트, 스토리보드, OST 등 결과물
- MAKE/GAPPAE = 제작기, 캐릭터 수정, 장소 에셋, 콘티 설계, 영상 테스트 등 과정

LANDING Hero 클릭 목적지는 `make/gappae-trailer.html`로 한다.

## 4. EASTWAR

기존 EASTWAR 개발일지 체계 유지.
`EASTWAR_Blog_Development_Journal_Guide.md`를 함께 적용한다.

필수 연동 파일은 현재 main에서 확인:
- devlog HTML
- 영문판 필요 시 -en
- eastwar-log-index.js
- posts-data.js
- assets/eastwar/*

## 5. GrandSlam

실사용 문제 → 기능 개선 → 현장 가치 흐름을 유지한다.
버전 번호 추측 금지.

## 6. TakeZero

제품/도구 + 캐릭터 노트 성격 유지.
기존 웹앱/다운로드 CTA를 다른 작업 중 임의 수정하지 않는다.

## 7. Magic Block Master

애니메이션/뮤직비디오 제작 과정이 충분히 쌓이면 MAKE 프로젝트로 추가한다.

예상 기록 범위:
- 주인공 디자인 탐색
- 캐릭터 시트 확정
- 키비주얼
- 스토리보드
- 영상 제작 테스트
- 음악과 컷 타이밍
- 최종 편집/색감

실제 첫 devlog를 만들기 전 현재 main의 MAKE 번호 구조를 확인한다.

## 8. 신규 프로젝트 추가 원칙

단발성 실험만으로 공식 MAKE 카드를 만들지 않는다.
다음 중 다수가 충족될 때 추가:
- 지속 개발
- 독립 IP/제품 가치
- 별도 페이지/로그가 필요한 작업량
- 포트폴리오에서 독립된 역할

## 9. WATCH와 교차 링크

가능하면 프로젝트 메인에서:
- `WATCH THIS PROJECT` 또는 결과물 보기
- `MAKING / DEVLOG` 제작기

가 자연스럽게 오가도록 한다.
하지만 중복 설명은 피한다.

## 10. 검수

```text
[ ] 현재 main의 최신 동급 페이지 확인
[ ] 프로젝트별 문법 유지
[ ] WATCH 결과물 / MAKE 제작기 분리
[ ] 관련 목록/index/posts-data 반영
[ ] 파일 경로 실제 존재
[ ] desktop/mobile
[ ] 요청 외 리팩터링 없음
```

**Document:** `BYKIMJAK_MAKE_GUIDE.md`  
**Version:** 2.0