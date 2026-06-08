# byKimjak 블로그 HTML 구조 분석

> 작성일: 2026-06-08  
> 분석 파일: 8개

---

## 공통 사항

모든 페이지가 공유하는 구조:

- **CSS 변수**: `--bg`, `--ink`, `--ink-2`, `--ink-3`, `--rule`, `--dark`, `--accent`, `--accent-soft`, `--f-display`, `--f-body`, `--f-mono`, `--f-kr`
- **폰트**: Space Grotesk (디스플레이) / Inter (바디) / JetBrains Mono (모노) / Pretendard Variable (한국어)
- **Nav 구조**: `.nav > .nav__logo + .nav__menu(드롭다운) + .nav__cta`
- **스크롤 애니메이션**: `.rev` (opacity:0 + translateY) → `.rev.in` (IntersectionObserver)
- **Footer**: 다크 배경, 12열 그리드 (c1~c4)
- **URL 깊이별 nav 경로**:
  - `watch/`, `think/`, `make/` → `../index.html`
  - `posts/think/` → `../../index.html`

---

## 1. `make/grandslam-devlog-001.html`

**언어**: 한영 병기 (`lang-switch` UI 있음 → `grandslam-devlog-001-en.html`)

**주요 CSS 클래스**:
```
listing-head → breadcrumb + lang-switch + h1 + .sub-ko + .listing-desc
log-index → .log-index__hd + .log-index__item (하드코딩)
  log-index__item → .log-index__num + .log-index__t(.ko) + .log-index__date
  log-index__item--current → 현재 페이지 강조
devlog → .devlog__body
  devlog__body → .log-num + h1 + h2 + .log-date + h3 + p + hr + ul + img.body-img + a.body-btn
```

**본문 HTML 패턴**:
```html
<span class="log-num">Dev Log · #001</span>
<h1>그랜드슬램 개발일지 #001</h1>
<h2>바이브 코딩과의 첫 만남 — ...</h2>
<span class="log-date">2026년 1월 중순</span>

<hr />
<h3>섹션 제목</h3>       <!-- border-top + padding-top -->
<p>본문 단락</p>
<ul><li>목록</li></ul>
<em>이탤릭 강조</em> / <strong>볼드 강조</strong>

<img class="body-img" src="..." alt="..." loading="lazy" />
<a href="..." class="body-btn">앱 직접 써보기 →</a>
```

**JS 렌더 방식**: IntersectionObserver (`.rev`) only. log-index 하드코딩 HTML (EASTWAR와 달리 `eastwar-log-index.js` 미사용)

**특이사항**:
- `body-img` (전폭 이미지), `body-btn` (버튼형 외부 링크) 클래스가 이 페이지에만 정의됨
- log-index가 하드코딩 → 새 devlog 추가 시 수동 업데이트 필요 (EASTWAR는 JS로 자동화)

---

## 2. `watch/ai-film.html`

**언어**: 한국어 전용 (lang-switch 없음)

**주요 CSS 클래스**:
```
listing-head → breadcrumb + h1 + .listing-desc
video-section → .video-count + .video-card(반복)
  video-card → .video-card__embed(iframe) + .video-card__meta
    video-card__embed → 16/9 aspect-ratio iframe
    video-card__embed.shorts → 9/16 aspect-ratio (세로형)
    video-card__meta → .video-card__num + h2.video-card__title
                      + .video-card__desc(한국어)
                      + .video-card__desc-en(영문, 선택)
                      + .video-card__info(연도·태그·YouTube링크)
```

**본문 HTML 패턴**:
```html
<div class="video-section">
  <p class="video-count rev">4 영상 · 4 Videos</p>
  <div class="video-card rev">
    <div class="video-card__embed">          <!-- 일반: 16/9 -->
      <iframe src="https://www.youtube.com/embed/..." ...></iframe>
    </div>
    <div class="video-card__embed shorts">  <!-- 세로형: 9/16 -->
      <iframe ...></iframe>
    </div>
    <div class="video-card__meta">
      <span class="video-card__num">N° 001 · 01–A · AI FILM</span>
      <h2 class="video-card__title">영상 제목</h2>
      <p class="video-card__desc">한국어 설명</p>
      <p class="video-card__desc-en">English description</p>  <!-- 선택 -->
      <div class="video-card__info">
        <span>2026</span><span class="sep">·</span>
        <span>TEASER</span><span class="sep">·</span>
        <a href="..." target="_blank">YouTube에서 보기 ↗</a>
      </div>
    </div>
  </div>
</div>
```

**JS 렌더 방식**: IntersectionObserver only

**특이사항**:
- sub-ko 없음 (listing-head h1이 `var(--f-kr)` — MAKE 계열과 다름)
- 3번 카드의 닫는 `</div>` 위치 버그 — 4번 카드가 3번 카드 `.video-card` div 안에 중첩됨 (시각적으로는 정상이나 마크업 오류)

---

## 3. `watch/ost.html`

**언어**: 한국어 전용 (lang-switch 없음)

**주요 CSS 클래스**:
```
listing-head → breadcrumb + h1 + .listing-desc
audio-section → .audio-count + .audio-card(반복)
  audio-card → .audio-card__player + .audio-card__meta
    audio-card__player → .audio-card__icon(SVG) + <audio controls>
    audio-card__meta → .audio-card__num + h2.audio-card__title + .audio-card__info
```

**본문 HTML 패턴**:
```html
<div class="audio-section">
  <p class="audio-count rev">7 트랙 · 7 Tracks</p>
  <div class="audio-card rev">
    <div class="audio-card__player">          <!-- 다크 배경, 줄무늬 CSS -->
      <div class="audio-card__icon">
        <svg>...</svg>                        <!-- 음표 아이콘 -->
      </div>
      <audio controls preload="none" src="../assets/ost/파일명.mp3"></audio>
    </div>
    <div class="audio-card__meta">
      <span class="audio-card__num">N° 001 · 01–B · OST</span>
      <h2 class="audio-card__title">트랙 제목 (영문)</h2>
      <div class="audio-card__info">
        <span>2026</span><span class="sep">·</span><span>OST</span>
        <span class="sep">·</span><span>EASTWAR IP</span>
      </div>
    </div>
  </div>
</div>
```

**JS 렌더 방식**: IntersectionObserver only

**특이사항**:
- 트랙 설명 텍스트(`.audio-card__desc`) 없음 — 제목과 메타 태그만 표시
- 플레이어 배경에 `repeating-linear-gradient` CSS로 줄무늬 패턴 구현
- `preload="none"` — 페이지 진입 시 오디오 미리 로드하지 않음
- 트랙 제목이 모두 영문 (AI 생성 제목)

---

## 4. `watch/still.html`

**언어**: 한영 병기 (lang-switch 없음 — 콘텐츠 내에서 한/영 혼용)

**주요 CSS 클래스**:
```
listing-head → breadcrumb + h1 + .listing-desc
gallery-section → .gallery-count + .gallery(3열 그리드) + .hero-showcase
  gallery → .g-item(반복)
    g-item → img + .g-over(.g-title + .g-date)   <!-- hover 오버레이 -->
    g-item[data-*] → lightbox에 전달할 메타데이터
  hero-showcase → .hero-card(반복)
    hero-card → img(3/4 비율) + div
      div → h3.hero-card__name + .hero-card__name-en
           + .hero-card__role
           + p.hero-card__desc-kr + p.hero-card__desc-en
#lb (lightbox) → #lb-inner → #lb-img-wrap + #lb-meta
  lb-meta → .lb-date + h2.lb-title(.lb-title-en) + .lb-desc(.lb-desc-kr + .lb-desc-en)
```

**본문 HTML 패턴**:
```html
<!-- 갤러리 이미지 -->
<div class="g-item rev"
  data-src="이미지경로" data-title="제목"
  data-title-kr="한국어 제목" data-title-en="English title"
  data-desc-kr="한국어 설명" data-desc-en="English description"
  data-date="날짜">
  <img src="..." alt="..." loading="lazy" />
  <div class="g-over">
    <p class="g-title">제목</p>
    <span class="g-date">날짜</span>
  </div>
</div>

<!-- 영웅 카드 -->
<div class="hero-card rev">
  <img src="..." alt="영웅명" loading="lazy" />
  <div>
    <h3 class="hero-card__name">이순신</h3>
    <span class="hero-card__name-en">Yi Sun-sin</span>
    <span class="hero-card__role">조선 수군 통사령관 · JOSEON NAVY</span>
    <p class="hero-card__desc-kr">한국어 설명...</p>
    <p class="hero-card__desc-en">English description...</p>
  </div>
</div>
```

**JS 렌더 방식**: IntersectionObserver + Lightbox (`.g-item` 클릭 → `data-*` 읽어 `#lb` 팝업 표시 / ESC·외부클릭 닫기)

**특이사항**:
- 가장 복잡한 페이지 — 갤러리 + 라이트박스 + 영웅 캐릭터 쇼케이스 세 섹션
- 이미지 메타 데이터를 `data-*` 속성에 저장하여 JS로 라이트박스에 주입
- 영웅 카드는 한영 병기 (desc-kr + desc-en 모두 있음)

---

## 5. `think/personal-essay.html`

**언어**: 한국어 전용 (lang-switch 없음)

**주요 CSS 클래스**:
```
listing-head → breadcrumb + h1(var(--f-kr)) + .listing-desc
post-list → .list-head + a.post-row(반복) + .pager(JS 생성)
  list-head → .label("전체 · All") + .count("N 편")
  post-row → .p-num + .p-title(.ko) + .p-date
    그리드: 48px 1fr 140px
pager → .pager__btn(JS 생성)
```

**본문 HTML 패턴**:
```html
<div class="post-list">
  <div class="list-head rev">
    <span class="label">전체 · All</span>
    <span class="count">2 편</span>
  </div>
  <a href="../posts/think/파일명.html" class="post-row rev d1">
    <div class="p-num">N° 001</div>
    <div class="p-title">
      제목 텍스트
      <span class="ko">부제 텍스트</span>
    </div>
    <div class="p-date">2026 · 05 · 25</div>
  </a>
</div>
```

**JS 렌더 방식**: `paginate.js` 로드 → `PAGINATE('.post-list', 'a.post-row', 5)`

**특이사항**:
- `list-head`에 총 편수 표시 (`N 편`) — morning-word.html, ai-coach.html에는 없음
- p-num 컬럼 48px (가장 좁음) — 단순 번호만 표시 (`N° 001`)
- h1 폰트: `clamp(44px, 9vw, 120px)` (가장 큰 사이즈)

---

## 6. `think/morning-word.html`

**언어**: 한국어 전용 (lang-switch 없음)

**주요 CSS 클래스**: personal-essay.html과 동일 구조

```
listing-head → breadcrumb + h1 + .listing-desc
post-list → a.post-row(반복) + .pager(JS 생성)
  post-row → .p-num + .p-title(.ko) + .p-date
    그리드: 120px 1fr 140px  ← personal-essay와 다름
```

**본문 HTML 패턴**:
```html
<a href="../posts/think/morning-word-001.html" class="post-row rev d1">
  <div class="p-num">01 · 2026.06.04</div>   <!-- 번호 + 날짜 포함 -->
  <div class="p-title">
    어제는 쉬는 날. 오늘은 다시 쌓는 날.
    <span class="ko">악마. EASTWAR. 블로그. TakeZero.</span>
  </div>
  <div class="p-date">2026 · 06 · 04</div>
</a>
```

**JS 렌더 방식**: `paginate.js` 로드 → `PAGINATE('.post-list', 'a.post-row', 5)`

**특이사항**:
- `.p-num`에 날짜 포함 (`"01 · 2026.06.04"`) — personal-essay는 번호만
- `list-head` 섹션 없음 (편수 표시 없음)
- h1 폰트: `clamp(40px, 7vw, 100px)` — personal-essay보다 작음
- **MAKE 드롭다운 버그**: TakeZero(`02–C`) 항목 누락 (수정 필요)

---

## 7. `think/ai-coach.html`

**언어**: 한국어 전용 (lang-switch 없음)

**주요 CSS 클래스**: morning-word.html과 동일

```
listing-head → breadcrumb + h1 + .listing-desc
post-list → a.post-row(반복) + .pager(JS 생성)
  post-row → .p-num + .p-title(.ko) + .p-date
    그리드: 120px 1fr 140px
```

**본문 HTML 패턴**:
```html
<a href="../posts/think/ai-coach-001.html" class="post-row rev d1">
  <div class="p-num">01 · 프롤로그</div>   <!-- 번호 + 카테고리 라벨 -->
  <div class="p-title">
    AI 코치들과의 수다 — 프롤로그
    <span class="ko">잼코치, 채코치, 클코치의 캐릭터가 탄생한 날</span>
  </div>
  <div class="p-date">2026 · 06 · 04</div>
</a>
```

**JS 렌더 방식**: `paginate.js` 로드 → `PAGINATE('.post-list', 'a.post-row', 5)`

**특이사항**:
- `.p-num`에 카테고리 라벨 포함 (`"01 · 프롤로그"`, `"02 · 대화록"`)
- 현재 6개 글 → 5개씩 페이지네이션 실제로 작동 (2페이지)
- morning-word.html과 구조 동일, p-num 포맷만 다름

---

## 8. `posts/think/think-001.html`

**언어**: 한국어 전용 (lang-switch 없음)

**주요 CSS 클래스**:
```
post → max-width 740px, 중앙 정렬 (listing 구조 없음)
  post__back → 목록으로 돌아가기 링크 (SVG 화살표)
  post__meta → 날짜 + .cat(카테고리 태그)
  post__title → h1 제목
  post__subtitle → 부제
  post__byline → 저자명 + 날짜
  post__body → 본문 컨테이너
    p, strong
    .dialogue → 대화록 (border-left + .speaker)
    .callout → 콜아웃 박스 (다크 배경 + border-left)
    .post__photo → 본문 이미지 (400px 제한)
    .post__sig → 서명/맺음말 (.role)
```

**본문 HTML 패턴**:
```html
<main class="post">
  <a href="../../think/personal-essay.html" class="post__back rev">
    <svg>...</svg> Think / 목록으로
  </a>
  <div class="rev">
    <div class="post__meta">
      <span>2026.05.25</span><span class="sep">·</span>
      <span class="cat">THINK · 개인에세이</span>
    </div>
    <h1 class="post__title kr">제목</h1>
    <p class="post__subtitle">부제</p>
    <div class="post__byline">
      <span class="name">김성현 (byKimjak)</span>
      <span class="date">2026 · 05 · 25</span>
    </div>
  </div>

  <div class="post__body rev">
    <p>본문 단락</p>
    <strong>볼드 강조</strong>

    <!-- 대화록 -->
    <div class="dialogue">
      <p><span class="speaker">채코치</span>발화 내용</p>
      <p><span class="speaker">김작</span>발화 내용</p>
    </div>

    <!-- 콜아웃 박스 -->
    <div class="callout">
      <p>강조할 내용</p>
    </div>

    <!-- 본문 이미지 -->
    <div class="post__photo">
      <img src="../../images/think/파일명.png" alt="..." />
    </div>

    <!-- 서명 -->
    <div class="post__sig">
      IP 아키텍트 김작
      <span class="role">byKimjak · 2026.05.25</span>
    </div>
  </div>
</main>
```

**JS 렌더 방식**: IntersectionObserver only (paginate 없음)

**특이사항**:
- 가장 오래된 포맷 (첫 번째 에세이) — 다른 포스트들과 CSS 구조가 다름
- CSS가 인라인에서 줄바꿈 포함으로 가독성 있게 작성됨 (다른 파일들은 압축)
- `dialogue` / `callout` 클래스가 이 파일에만 정의 (다른 포스트 파일에서 재사용 여부 확인 필요)
- nav URL이 `../../` 기반 (`posts/think/` 하위)
- `.post__photo img`에 `width: 400px` 하드코딩 — 모바일에서 `max-width: 100%`로 제한

---

## 타입별 구조 요약

| 파일 | 타입 | 글 목록 방식 | 한/영 | 페이지네이션 |
|------|------|-------------|-------|------------|
| grandslam-devlog-001.html | devlog 본문 | log-index (하드코딩) | 병기 | 없음 |
| watch/ai-film.html | 미디어 갤러리 | video-card 반복 | 한국어 | 없음 |
| watch/ost.html | 미디어 갤러리 | audio-card 반복 | 한국어 | 없음 |
| watch/still.html | 이미지 갤러리 | g-item 그리드 + hero-card | 병기(내용) | 없음 |
| think/personal-essay.html | 글 목록 | post-row + list-head | 한국어 | paginate.js |
| think/morning-word.html | 글 목록 | post-row | 한국어 | paginate.js |
| think/ai-coach.html | 글 목록 | post-row | 한국어 | paginate.js |
| posts/think/think-001.html | 글 본문 | 없음 | 한국어 | 없음 |

---

## 주요 발견 사항 (버그/불일치)

1. **`think/morning-word.html` MAKE 드롭다운 TakeZero 누락** — `02–C TakeZero` 항목 없음
2. **`watch/ai-film.html` HTML 구조 오류** — 3번 카드 닫기 `</div>` 위치가 잘못되어 4번 카드가 3번 카드 안에 중첩
3. **`posts/think/think-001.html` 구 포맷** — `dialogue`/`callout` 클래스가 이 파일에만 정의됨. 이후 포스트들은 `devlog__body` 패턴 사용
4. **`grandslam-devlog-001.html` log-index 수동 관리** — EASTWAR(`eastwar-log-index.js`)와 달리 하드코딩. 새 devlog 추가 시 이 파일도 수동 업데이트 필요
5. **listing-head h1 폰트 크기 불일치**:
   - `think/personal-essay.html`: `clamp(44px, 9vw, 120px)` + `--f-kr`
   - `think/morning-word.html`, `ai-coach.html`: `clamp(40px, 7vw, 100px)` + `--f-kr`
   - `grandslam-devlog-001.html`: `clamp(44px, 9vw, 120px)` + `--f-display`
