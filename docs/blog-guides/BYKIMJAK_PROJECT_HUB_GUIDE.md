# byKimjak PROJECT HUB — Global Widget Operating Guide v2.0

> **Updated:** 2026-10-06
> **Actual script path:** `/eastwar-hub.js`
> **Current implementation:** `byKimjak PROJECT HUB — GAPPAE + EASTWAR, 20261001-combined-02`
> **Parent:** `BYKIMJAK_BLOG_MASTER_GUIDE.md`

## 0. 이름과 파일명

과거 문서명은 `EASTWAR HUB`였지만 실제 코드는 이미 **GAPPAE + EASTWAR 통합 PROJECT HUB**로 발전했다.

이번 문서부터 이름은 `PROJECT HUB`로 통일한다.

단 실제 스크립트 파일명 `/eastwar-hub.js`는 전역 연결이 많으므로 **이번 구조 개편 중 임의 rename 금지**.

## 1. 현재 역할

현재 허브는 모든 프로젝트 메뉴가 아니다.

> **현재 집중 프로젝트를 빠르게 보여주는 전역 Spotlight / Shortcut Hub**

현재:
- GAPPAE Trailer 작업 바로가기
- EASTWAR Devlog / Still / OST / Film

새 프로젝트가 생길 때마다 허브에 계속 추가하지 않는다.
Magic Block Master가 생겼다고 자동으로 3단, 4단으로 늘리지 않는다.

## 2. 현재 실제 코드 핵심

`eastwar-hub.js` 현재 구현 기준:
- Shadow DOM 사용
- root id: `project-hub-root`
- 중복 초기화 방지: `window.__byKimjakProjectHubV1`
- 배경 자산: `/assets/ui/gappae-eastwar-popup-bg-01.webp`
- 기본 폭 최대 320px
- HOME에서는 펼친 상태로 시작
- 다른 페이지는 접힌 상태
- 모바일은 화면 하단 우측 기본 배치
- desktop은 우측 상단 계열
- drag 이동 가능
- 위치 localStorage 저장
- visualViewport 대응
- Escape 닫기
- 기존 구형 hub root 제거

## 3. 현재 링크

GAPPAE:

```text
/bykimjak/make/gappae-trailer.html
```

EASTWAR:

```text
DEVLOG → /bykimjak/make/eastwar.html
STILL  → /bykimjak/watch/still.html
OST    → /bykimjak/watch/ost.html
FILM   → /bykimjak/watch/ai-film.html
```

WATCH가 프로젝트별 구조로 개편되면 EASTWAR의 STILL / OST / FILM 링크도 새 `watch/eastwar/` 구조에 맞춰 갱신해야 한다.

## 4. WATCH 개편과 허브

새 WATCH 구조가 준비되면 허브 링크의 목표는 개별 레거시 미디어 페이지보다 **EASTWAR 프로젝트 허브 또는 해당 세부 페이지**로 옮기는 것을 검토한다.

예:

```text
EASTWAR WATCH → /watch/eastwar/
Characters    → /watch/eastwar/characters.html
OST           → /watch/eastwar/ost.html
Film          → /watch/eastwar/film.html
```

최종 경로는 실제 생성된 파일을 기준으로 결정한다.

## 5. 보존해야 할 안정성 원칙

- Shadow DOM 격리 유지
- drag와 click 분리 유지
- localStorage 위치 저장 유지
- viewport clamp 유지
- visualViewport 처리 유지
- Escape close 유지
- 중복 root 방지 유지
- 모바일에서 화면 밖으로 나가지 않게
- 링크 클릭과 drag 충돌 금지

## 6. 이번 개편에서 허브의 원칙

허브는 전체 사이트의 정보구조를 대신하지 않는다.

```text
사이트 본체 = 모든 IP를 탐색하는 공식 구조
PROJECT HUB = 현재 집중 프로젝트의 빠른 진입점
```

따라서 신규 IP가 늘어날수록 본체 WATCH 구조를 확장하고, 허브는 필요할 때만 큐레이션을 바꾼다.

## 7. 수정 후 검수

```text
[ ] GAPPAE 바로가기 정상
[ ] EASTWAR 새 WATCH 링크 정상
[ ] 접기/열기 정상
[ ] drag 정상
[ ] 위치 저장 정상
[ ] desktop 정상
[ ] mobile 정상
[ ] visualViewport에서 화면 밖으로 안 나감
[ ] 기존 페이지 UI와 z-index 충돌 없음
```

**Document:** `BYKIMJAK_PROJECT_HUB_GUIDE.md`  
**Version:** 2.0