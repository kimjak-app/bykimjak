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
**Updated:** 2026-10-17

## 12. 통합 미디어 운영 — 공개 Releases / 2026-10-17

### 역할과 원본 보존

- Private 프로젝트 저장소는 제작 원본과 기록을 보관한다. 공개 승인 없이 전체 저장소를 동기화하지 않는다.
- 최종 마스터와 기존 Release는 삭제하거나 덮어쓰지 않는다.
- 현재 공개용 미디어는 `kimjak-app/bykimjak`의 작품별 Release로 분리한다. `media-gappae-20261017`, `media-eastwar-20261017`, `media-baegopa-20261017`을 사용하며 이미 게시된 갑패 최종 영상 Release도 재사용한다.
- Pages는 페이지·코드·소형 UI를 담당한다. 이번 이전 범위는 갑패·EASTWAR·배고파 및 공용 EASTWAR OST, 별도 폴더의 EASTWAR 포스터·월드맵 이미지다. 다른 프로젝트와 THINK의 기존 미디어는 유지하므로 전체 사이트가 코드만 남는 것은 아니다.
- Git에 보관된 원본은 그대로 유지하고 배포 산출물에서만 제외한다. Pages 경량화는 Git 이력·clone 용량 감소와 다르다.

### 중앙 설정과 빌드

- `config/public-media.json`을 공개 URL의 단일 기준으로 삼는다. `path`, `ip`, `url`, `bytes`, `sha256`, `mime`, `thumbnail`, `aliases`, `verified`를 관리한다.
- 원본 파일명과 페이지의 상대 경로는 유지한다. Release 업로드명에는 충돌 방지를 위한 해시를 붙일 수 있으며 한글 파일명의 서버 정규화 결과는 API가 반환한 실제 URL을 기록한다.
- `tools/public_media.py`가 빌드 시 상대 경로·과거 Release 별칭을 중앙 URL로 변환한다. 소스 HTML만 직접 열면 이전 로컬 자산이 보일 수 있으므로 검수는 반드시 빌드 산출물을 대상으로 한다.
- `tools/build_pages.py`는 Git 추적 파일만 배포한다. 중앙 설정에 있는 미디어를 제외하고 HTML의 이미지 src를 별도 WebP 썸네일로 연결한다. `data-original-src`는 원본 Release URL을 유지한다.
- 썸네일은 원본 비율을 유지하는 최대 1280px WebP다. 원본은 리사이즈·크롭·재인코딩하지 않는다. 그림의 확대는 반드시 원본 URL을 사용한다.
- 새 Pages 용량 상한은 70MiB다. 최초 약 65.5MiB 목표에서 추가 EASTWAR 자산까지 분리한 검수 빌드는 약 56.49MiB다. 실제 빌드 바이트를 매번 기록한다. 70MiB 초과 시 새 콘텐츠와 자산 포함 범위를 검토한다.
- 일반 빌드: `python tools/build_pages.py`. 예산 확인: `python tools/build_pages.py --dry-run`. 출력 폴더가 이미 있으면 새 출력 경로를 지정한다.

### 검증 및 배포 순서

1. 공개 승인 범위와 파일 목록·SHA-256 확인.
2. 작품별 Release 업로드. 기존 파일을 덮어쓰지 않고 API가 반환한 바이트와 SHA-256을 대조.
3. `python tools/verify_public_media.py --report <검수 JSON 경로>`로 인증 없는 공개 URL 및 byte-range 응답 확인. 실패 시 중앙 설정을 활성화하지 않는다.
4. `python tools/test_public_media.py`와 빌드 실행. 배포 대상에 원본이 남지 않고 로컬 경로가 미디어 URL로 치환됐는지 확인.
5. 실제 브라우저에서 영상 시작·시간 탐색, OST 재생, 썸네일·원본 확대·닫기·ESC·이전/다음, PC/모바일, WATCH/MAKE 메뉴, 전역 팝업 확인.
6. 검수 브랜치 커밋·푸시 후 사용자 승인 범위에 따라 main 반영. 사전 승인이 있으면 반복 확인하지 않는다. Pages 성공과 실제 공개 사이트를 확인한다.

### Release 호환성과 정책

- URL은 `github.com/.../releases/download/<tag>/<filename>`만 저장한다. 리다이렉트된 서명 포함 임시 다운로드 주소는 만료되므로 설정에 저장하지 않는다.
- 미디어 요소는 Release 리다이렉트를 따라갈 수 있지만 `fetch(..., {method:'HEAD'})`는 CORS에 막힐 수 있다. 갑패 플레이어는 `loadedmetadata`/`error`로 가용성을 판정한다.
- 직접 이미지 링크는 다운로드될 수 있으므로 사이트 안의 기존 확대 뷰어에서 원본을 연다. 원본/썸네일 URL을 혼동하지 않는다.
- GitHub 공식 문서 기준 Release당 최대 1,000개 자산, 파일당 2GiB 미만. 총 용량·대역폭에 정해진 Release 한도는 없지만 과도한 사용 시 제한될 수 있다. 전용 영상 CDN의 서비스 보장이나 장기 무제한 호스팅으로 간주하지 않는다.
- 근거: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases 및 https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies#9-excessive-bandwidth-use
- 현재 검증된 브라우저 범위를 보고서에 기록한다. 검증하지 않은 Safari/실기기까지 지원 확인했다고 표현하지 않는다.

### 복구와 향후 R2 전환

- `--legacy-media`로 이전 배포 구조를 재현할 수 있다. 당시 950MiB 예산에 매우 가까우므로 복구 빌드의 실제 크기를 다시 확인한다.
- 원본 및 기존 Release를 유지하므로 변경 커밋과 빌드 규칙을 되돌릴 수 있다. 기존 Pages 미디어 직접 주소는 제외 후 404가 될 수 있으나 사이트 내부 링크는 중앙 매핑으로 전환한다. 옛 외부 직접 링크를 자동 리다이렉트한다고 가정하지 않는다.
- 향후 R2로 이전할 때 동일 파일 해시를 확인하고 중앙 설정의 `url`/`thumbnail.url`/`provider`를 갱신한다. NAV·FOOTER·플레이어·페이지 디자인을 다시 만들지 않는다. CORS, Range, 캐시, 실제 브라우저 검수를 반복한다.
