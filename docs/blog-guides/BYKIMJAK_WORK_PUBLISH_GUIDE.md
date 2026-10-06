# byKimjak Blog — Work Publishing Guide v2.0

> **Updated:** 2026-10-06
> **Repository:** `kimjak-app/bykimjak`
> **Branch:** `main`
> **Public site:** https://kimjak-app.github.io/bykimjak/

## 0. 가이드 위치

이 문서 세트는 저장소에 아래처럼 두는 것을 표준으로 한다.

```text
docs/blog-guides/
├─ BYKIMJAK_BLOG_MASTER_GUIDE.md
├─ BYKIMJAK_LANDING_GUIDE.md
├─ BYKIMJAK_WATCH_GUIDE.md
├─ BYKIMJAK_MAKE_GUIDE.md
├─ BYKIMJAK_THINK_GUIDE.md
├─ BYKIMJAK_PROJECT_HUB_GUIDE.md
├─ EASTWAR_Blog_Development_Journal_Guide.md
└─ BYKIMJAK_WORK_PUBLISH_GUIDE.md
```

새 Work/Codex 채팅에서는 먼저 이 폴더를 읽는다.

## 1. Source of truth

```text
현재 GitHub main
→ Master Guide
→ 해당 섹션 Guide
→ Project Hub / 프로젝트 하위 Guide
→ Work Publishing Guide
```

## 2. Work의 역할

```text
김작
→ Work/Codex
→ GitHub main
→ GitHub Pages
→ 공개 사이트 검수
```

김작에게 중간 코드 수정/커밋 작업을 넘기지 않는다.
사용자가 직접 업로드해야 하는 대용량 영상/원본 자산이 있다면 **정확한 파일명과 업로드 경로만 안내**한다.
업로드 후 Work가 연결/검증/배포를 마무리한다.

## 3. 이번 리뉴얼의 2단계 작업 방식

### 1차 — 구조 개편

Work가 수행:
- 최신 main 확인
- 랜딩 Hero/Gallery 구조 수정
- WATCH 프로젝트별 정보구조 생성
- 모바일 NAV 개선
- 레거시 URL 보존 설계
- 오래된 상태 표시 정합성 정리
- 필요한 신규 폴더/파일명 목록 확정

아직 없는 자산은 생성하지 않는다.
placeholder 또는 안전한 빈 상태로 둔다.

### 김작 — 자산 업로드

Work가 지정한 정확한 경로에:
- GAPPAE Trailer 01
- GAPPAE Character Sheets
- GAPPAE Storyboards
- 필요한 EASTWAR 자료
- Magic Block Master 자료

등을 올린다.

### 2차 — 실제 연결/배포

Work가:
- 실제 파일 존재 확인
- HTML/JS 연결
- desktop/mobile 검수
- Project Hub 갱신
- commit/push
- Pages build/deploy
- 공개 사이트 확인

까지 완료한다.

## 4. 대용량 영상

250MB급 Hero MP4는 먼저 다음을 확인한다.
- GitHub 단일 파일 제한
- Git LFS 사용 여부
- GitHub Pages가 LFS 포인터가 아닌 실제 미디어를 제공하는지
- 저장소/대역폭 부담

검증 전 파일 경로를 확정하거나 커밋하지 않는다.
필요하면 별도 호스팅/YouTube/Vimeo 등도 비교하되 사용자 의도(전체 Hero 재생)를 우선한다.

## 5. 수정 순서

```text
ANALYZE
1. 최신 main
2. 관련 Guide
3. 현재 정상 페이지
4. 영향 파일 목록

FIX
5. 최소 범위 수정
6. 레거시 연결 보존
7. 신규 구조/자산 연결

VERIFY
8. Target file path
9. 필수 patch/content 삽입
10. 링크/미디어/JS
11. desktop/mobile
12. diff

DELIVER
13. commit
14. push
15. Pages build/deploy
16. 공개 사이트 검수
17. 결과 보고
```

## 6. 필수 검증 체크리스트

```text
[ ] Target file path 확인
[ ] 요청 patch string/content 실제 삽입
[ ] 다운로드/배포본이 최종 수정본과 동일
[ ] legacy URL 보호
[ ] WATCH/MAKE/THINK 역할 유지
[ ] mobile nav 정상
[ ] media 실제 로드
[ ] Project Hub 정상
[ ] 요청 외 파일 변경 없음
[ ] main push
[ ] Pages build success
[ ] Pages deploy success
[ ] 공개 사이트 직접 확인
```

## 7. 완료 보고

간결하게:
- 작업 완료 여부
- 변경 파일
- commit SHA/링크
- Pages build/deploy 결과
- 공개 사이트 검수 결과
- 김작이 확인할 URL

**Document:** `BYKIMJAK_WORK_PUBLISH_GUIDE.md`  
**Version:** 2.0