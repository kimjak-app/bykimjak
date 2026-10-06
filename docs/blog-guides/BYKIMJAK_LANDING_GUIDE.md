# byKimjak LANDING — Page Operating Guide v2.0

> **Updated:** 2026-10-06
> **Target:** `index.html` + 랜딩 직접 자산/스크립트
> **Parent:** `BYKIMJAK_BLOG_MASTER_GUIDE.md`

## 0. 역할

LANDING은 byKimjak 1인 스튜디오를 가장 압축적으로 보여주는 큐레이션 포트폴리오다.
이번 개편은 사용자가 명시적으로 승인한 **구조 개편**이다. 다만 기존 시각 언어는 유지한다.

## 1. 새 랜딩 흐름

권장 순서:

```text
NAV
→ HERO: GAPPAE Trailer 01
→ Selected Worlds / 대표 IP 쇼케이스(필요 시)
→ Gallery / Selected Works
→ WATCH · MAKE · THINK
→ From the Studio
→ ABOUT
→ FOOTER
```

`Selected Worlds`를 별도의 최상위 메뉴로 만들 필요는 없다.

## 2. Hero — 확정

기존 움직이는 byKimjak 로고 Hero를 교체한다.

새 Hero:
- GAPPAE Trailer 01 전체 영상
- 처음부터 끝까지 재생
- autoplay + muted + playsinline
- 사용자가 아래로 스크롤하면 자연스럽게 지나감
- Hero 클릭 시 `make/gappae-trailer.html`
- 영상 위에 필요 최소한의 브랜드/작품 메타만 사용
- 영상 자체가 주인공

### 대용량 MP4
약 250MB 파일은 GitHub Pages/저장소 제약을 먼저 확인한다.
경로를 확정하기 전 실제 파일을 임의 커밋하지 않는다.
필요 시 Git LFS 사용 여부와 Pages 제공 가능성을 검증한다.

## 3. 기존 Featured EASTWAR

현재 Hero 아래 Featured의 `EASTWAR Teaser 01`은 독립 Featured 자리에서 내리고 Gallery로 이동한다.

- Gallery의 대표 대형 타일로 배치
- 현재 GrandSlam Teaser 01 대형 타일 자리를 우선 후보로 사용
- GrandSlam은 옆/아래 적절한 타일로 이동

## 4. Gallery 리큐레이션

기존 다크 갤러리 미학은 유지한다.
다만 콘텐츠 우선순위를 재배치한다.

목표:
- 한 IP 도배 방지
- 대표작 중심
- 서로 다른 매체가 섞이되 IP가 읽히게
- 신규 GAPPAE / Magic Block Master가 들어올 여지 확보

초기 균형 후보:
- EASTWAR Teaser 01
- GAPPAE 대표 스틸 또는 제작 비주얼
- GrandSlam Teaser
- Magic Block Master 대표 이미지/영상(자산 준비 후)
- EASTWAR Character 또는 OST 중 대표 1개
- TakeZero 대표 1개
- 과거 실험작은 대표성에 따라 유지/축소

## 5. Categories

WATCH / MAKE / THINK 3카드는 유지한다.

카피 핵심:
- WATCH = 보고 듣는 결과물
- MAKE = 만드는 과정
- THINK = 생각과 글

## 6. From the Studio

`assets/js/posts-data.js` 기반 최신글 동적 렌더링 유지.
수동 하드코딩으로 바꾸지 않는다.
`View all entries ↗`는 실제 목적지가 없으면 임의 연결하지 않는다.

## 7. About / Footer

현재 포트폴리오 톤 유지.
이번 정합성 점검 대상:
- Footer 버전 문자열
- placeholder 링크
- Press kit
- Social
- For PDs & Investors

실제 목적지가 없는 링크는 추측 연결 금지.

## 8. Mobile

Hero는 모바일에서도 영상이 화면을 과도하게 깨지 않도록 object-fit / aspect / viewport 높이를 검수한다.
모바일 공식 내비게이션도 이번 개편 범위에 포함한다.

## 9. 검수

```text
[ ] Hero = GAPPAE Trailer 01
[ ] Hero click → MAKE/GAPPAE
[ ] video autoplay/muted/playsinline
[ ] EASTWAR Featured가 Gallery로 이동
[ ] GrandSlam 위치 재배치
[ ] Gallery IP 균형 개선
[ ] WATCH/MAKE/THINK 카드 유지
[ ] desktop/mobile
[ ] 기존 브랜드 스타일 유지
[ ] Project Hub 충돌 없음
```

**Document:** `BYKIMJAK_LANDING_GUIDE.md`  
**Version:** 2.0  