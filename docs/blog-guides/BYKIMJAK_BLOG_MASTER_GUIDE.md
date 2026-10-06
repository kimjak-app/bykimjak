# byKimjak Blog — Master Operating Guide v2.0

> **Current baseline:** 2026-10-06 / `kimjak-app/bykimjak` / `main`
> **Public site:** https://kimjak-app.github.io/bykimjak/
> **Role:** 블로그 전체 정보구조·디자인·운영의 최상위 기준서

## 0. Source of truth

항상 아래 순서로 판단한다.

1. 현재 GitHub `main`의 실제 파일과 실제 공개 사이트 동작
2. 이 Master Guide
3. 해당 섹션 Guide
4. Project Hub Guide / 프로젝트별 하위 Guide
5. 과거 문서와 레거시 메모

현재 코드와 문서가 충돌하면 **현재 `main`과 공개 사이트가 우선**이다.

---

## 1. byKimjak의 현재 사이트 정체성

byKimjak은 단순 블로그가 아니라 **IP 스튜디오 아카이브 + 포트폴리오**다.

핵심 정체성:

- Writer / 시나리오·드라마 창작
- IP Architect / 세계관·콘텐츠 설계
- Director / 영상·이미지·음악 방향 설계
- Solo Developer / AI·바이브 코딩으로 게임·앱 구현
- AI Collaboration / 제작 과정과 사고 기록

사이트가 보여줘야 하는 한 문장:

> **한 사람이 하나의 아이디어를 글·영상·이미지·음악·게임·앱으로 확장해 가는 스튜디오.**

---

## 2. 2026-10-06 확정 정보구조

사이트의 3대 축은 유지한다.

```text
HOME / LANDING
├─ 01 WATCH  = 보고 듣는 곳
├─ 02 MAKE   = 만드는 과정을 읽는 곳
├─ 03 THINK  = 생각과 글을 읽는 곳
└─ 04 ABOUT
```

### WATCH
**시각·청각 결과물 체험.**
앞으로 매체별(AI Film / OST / Still)보다 **IP/프로젝트별 진입**이 우선이다.

초기 대표 프로젝트:

```text
WATCH
├─ GAPPAE / 갑패
├─ EASTWAR
└─ MAGIC BLOCK MASTER
```

각 IP 내부는 프로젝트 성격에 맞춰 필요한 항목만 둔다.

예:
- Film / Trailer / Animation / Gameplay
- Character Sheets / Characters
- Still / Concept Art
- Storyboard / Visual Development
- OST / Music
- World / Map / UI (게임 프로젝트일 경우)

**모든 프로젝트에 같은 하위 메뉴를 억지로 강제하지 않는다.**

### MAKE
**제작 과정, 시행착오, 개발·연출·수정 기록.**

- EASTWAR 개발일지
- GrandSlam 개발일지
- TakeZero 제작/캐릭터 노트
- GAPPAE Trailer 제작일지
- Magic Block Master 제작일지(콘텐츠가 쌓이는 시점부터)

WATCH와 같은 프로젝트가 겹쳐도 역할이 다르다.

> WATCH = 결과물 전시
> MAKE = 결과물이 만들어진 과정

### THINK
기존 철학 유지.

- AI 코치들과의 수다
- 아침 말씀 with 채코치
- 개인 에세이
- 창작/AI 협업에 대한 생각

---

## 3. LANDING 개편 확정사항

### 3.1 Hero
기존 `bykimjak-intro.mp4 → logo` Hero는 랜딩 첫 화면 역할에서 내린다.

새 Hero:

- **GAPPAE Trailer 01 전체 영상**
- 짧은 루프가 아니라 트레일러 전체 재생
- `autoplay muted playsinline` 기반
- 사용자는 원하지 않으면 아래로 스크롤
- Hero 클릭 시 `MAKE → 갑패 트레일러 제작일지` 메인으로 이동
- 실제 MP4 파일은 대용량이므로 저장/배포 방식과 경로를 먼저 검증한 뒤 연결

### 3.2 기존 EASTWAR Featured
현재 랜딩의 EASTWAR Teaser 01 Featured 대형 블록은 Hero 자리에서 내리고 **Gallery 대표 타일로 이동**한다.

### 3.3 Gallery
Gallery는 유지하되 전체 큐레이션을 다시 한다.

원칙:
- EASTWAR 중복 노출을 줄인다.
- GAPPAE / EASTWAR / GrandSlam / TakeZero / Magic Block Master가 균형 있게 보이게 한다.
- 현재 GrandSlam Teaser 01 대형 타일 자리에 EASTWAR Teaser 01을 우선 배치한다.
- GrandSlam Teaser는 인접/하단 타일로 이동한다.
- 같은 IP의 비슷한 타일을 여러 개 반복하지 않는다.
- 디자인 언어(다크 갤러리, 타일 리듬)는 유지한다.

### 3.4 HOME에서 PROJECTS 대메뉴는 만들지 않는다
별도의 4번째 대축 `PROJECTS`는 만들지 않는다.
HOME 안에서 `Selected Worlds` 같은 프로젝트 쇼케이스를 둘 수는 있지만, 공식 정보구조는 WATCH / MAKE / THINK를 유지한다.

---

## 4. WATCH 마이그레이션 원칙

기존 레거시 페이지:

```text
watch/ai-film.html
watch/ost.html
watch/still.html
```

이 페이지들은 기존 링크가 있으므로 **새 구조가 완전히 연결되기 전 삭제/rename 금지**.

권장 신규 구조:

```text
watch/
├─ index.html
├─ gappae/
│  ├─ index.html
│  ├─ trailer.html
│  ├─ characters.html
│  ├─ storyboard.html
│  ├─ still.html
│  └─ ost.html
├─ eastwar/
│  ├─ index.html
│  ├─ film.html
│  ├─ characters.html
│  ├─ world.html
│  ├─ still.html
│  └─ ost.html
└─ magic-block-master/
   ├─ index.html
   ├─ animation.html
   ├─ characters.html
   ├─ storyboard.html
   ├─ still.html
   └─ ost.html
```

실제 콘텐츠가 없는 페이지는 빈 껍데기를 무조건 만들지 말고, 1차 구조 작업 목적에 필요한 최소 페이지부터 생성한다.

---

## 5. 모바일 NAV

현재 780px 이하에서 중앙 `.nav__menu`가 사라지는 구조는 이번 개편에서 개선 대상이다.

목표:
- 모바일에서도 WATCH / MAKE / THINK / ABOUT에 정상 접근
- 햄버거/오버레이 등 구현 방식은 현재 디자인 언어에 맞게 선택
- 기존 desktop nav 동작은 유지

---

## 6. 현행 정합성 부채 — 이번 개편에서 점검

- WATCH index의 `Coming soon` 상태
- THINK index의 `준비 중 / 1 글 / 1편` 같은 오래된 count
- HOME `View all entries ↗`의 `#`
- About `Press kit · PDF` placeholder
- Footer social/Press/PD 링크 placeholder
- Footer `v.04 / 2026.05`

실제 목적지가 없는 링크는 임의로 발명하지 않는다. 목적지가 없는 경우 숨김/비활성/유지 중 어떤 방식이 맞는지 사용자 의도와 현재 구조를 보고 결정한다.

---

## 7. 전역 디자인 문법 — 유지

- 흰 배경 + 검정 계열 타이포
- Space Grotesk / Inter / Pretendard / JetBrains Mono
- 얇은 rule line
- 강한 여백
- 대형 타이포
- dark gallery / dark footer
- reveal animation
- fixed navigation

이번 개편은 **브랜드 미학 교체가 아니라 정보구조와 큐레이션 개편**이다.

---

## 8. 콘텐츠 역할 분리

같은 프로젝트 자료라도 위치에 따라 목적이 다르다.

예: GAPPAE 캐릭터 시트

```text
WATCH / GAPPAE / Characters
→ 완성 캐릭터 시트를 크게 보고 탐색

MAKE / GAPPAE
→ 얼굴을 왜 바꿨는지, 어떤 테스트를 거쳤는지 제작기
```

예: Storyboard

```text
WATCH
→ 스토리보드 자체 전시

MAKE
→ 컷 설계와 수정 과정 기록
```

중복 게시가 아니라 **앞면/뒷면 역할 분리**로 본다.

---

## 9. Project Hub

현재 실제 스크립트 파일은 여전히:

```text
/eastwar-hub.js
```

이지만 코드 내부는 2026-10-01 기준 **GAPPAE + EASTWAR 통합 PROJECT HUB**로 발전했다.

이번 개편에서 파일명을 성급히 rename하지 않는다.
세부 규칙은 `BYKIMJAK_PROJECT_HUB_GUIDE.md`를 따른다.

---

## 10. Work / Codex 작업 원칙

1. 최신 `main` 확인
2. `docs/blog-guides/`의 가이드 확인
3. 같은 유형의 최신 정상 페이지 확인
4. 최소 범위 수정
5. legacy 링크 보존
6. desktop/mobile 검수
7. diff 확인
8. commit → push → Pages 배포 확인
9. 공개 사이트 직접 확인

사용자가 아직 올리지 않은 자산은 임의 생성하지 않는다.
필요한 파일명과 정확한 업로드 경로를 먼저 제시한다.

---

## 11. 최종 검증

```text
[ ] Target file path 정확
[ ] 요청한 patch/content 실제 삽입
[ ] WATCH/MAKE/THINK 역할 분리 유지
[ ] legacy URL 깨지지 않음
[ ] desktop 정상
[ ] mobile 정상
[ ] media path 실제 존재
[ ] Project Hub 정상
[ ] git diff 요청 범위와 일치
[ ] main push 완료
[ ] Pages build/deploy success
[ ] 공개 사이트 확인
```

---

**Document:** `BYKIMJAK_BLOG_MASTER_GUIDE.md`  
**Version:** 2.0  
**Updated:** 2026-10-06  