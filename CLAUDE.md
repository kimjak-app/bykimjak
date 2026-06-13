# byKimjak Site — Claude Instructions

## 새 포스트 추가 시 필수 체크리스트

새 글을 추가할 때마다 **반드시 아래 3곳을 모두 업데이트**해야 한다. 하나라도 빠지면 랜딩페이지나 목록에 반영되지 않는다.

### 1. `assets/js/posts-data.js` — 랜딩페이지 & THINK 인덱스
- `ALL_POSTS` 배열 **맨 앞**에 새 항목 추가 (newest first)
- `url`, `catKey`, `cat`, `title`, `sub`, `date`, `dl` 모두 채울 것
- 이 파일이 랜딩페이지 "From the Studio" 섹션을 자동 생성함
- **이걸 빠뜨리면 랜딩페이지에 이전 글이 계속 표시된다**

### 2. 카테고리별 목록 HTML (hardcoded)
- `think/ai-coach.html` → AI 코치 글 추가 시
- `think/morning-word.html` → 아침 말씀 글 추가 시
- `think/personal-essay.html` → 개인 에세이 글 추가 시
- 새 `<a class="post-row">` 항목을 번호 순서에 맞게 삽입
- **`think/morning-word.html`은 오름차순(01이 맨 위, 최신이 맨 아래)**. `think/ai-coach.html`도 동일하게 오름차순.

### 3. EASTWAR 개발일지 추가 시 추가로:
- `make/eastwar-log-index.js` → `LOGS` 배열에 새 항목 추가
- 이 파일이 개발일지 페이지 내 전체 목록을 렌더링함

---

## 배포
- 사이트: `kimjak-app.github.io/bykimjak/`
- 로컬 수정 후 반드시 `git commit` → `git pull origin main --rebase` → `git push`
- GitHub Pages CDN 캐시로 인해 반영까지 수 분 소요될 수 있음
