# byKimjak WATCH — Section Operating Guide v2.0

> **Updated:** 2026-10-06
> **Parent:** `BYKIMJAK_BLOG_MASTER_GUIDE.md`

## 0. WATCH의 한 줄 정의

> **WATCH는 byKimjak의 IP를 영상·음악·이미지·캐릭터·스토리보드로 직접 보고 듣는 프로젝트별 쇼케이스다.**

WATCH = 결과물 체험.
긴 제작기는 MAKE로 보낸다.

## 1. 2026-10-06 구조 전환

기존:

```text
01-A AI 영상 · 티저
01-B OST · 음악
01-C 스틸 이미지
```

신규 방향:

```text
01 WATCH
├─ GAPPAE / 갑패
├─ EASTWAR
└─ MAGIC BLOCK MASTER
```

즉 **매체별 → 프로젝트/IP별** 진입 구조로 전환한다.

## 2. 프로젝트 내부 문법

모든 프로젝트에 같은 메뉴를 강제하지 않는다.

### GAPPAE
권장:

```text
GAPPAE
├─ Trailer / Film
├─ Character Sheets
├─ Still / Concept Art
├─ Storyboard / Visual Development
└─ OST / Music
```

갑패 캐릭터 시트와 그림 스토리보드는 WATCH에서 전시한다.

### EASTWAR
게임 프로젝트 특성에 맞춘다.

```text
EASTWAR
├─ Trailer / Gameplay
├─ Characters
├─ World / Map / Concept
├─ Still
└─ OST / Music
```

현재 Still 페이지 안의 역사 영웅 Character Art는 새 구조에서는 `EASTWAR / Characters`로 이전/재배치하는 방향이 기본이다.

### MAGIC BLOCK MASTER

```text
MAGIC BLOCK MASTER
├─ Animation / MV
├─ Character Sheets
├─ Still / Concept Art
├─ Storyboard / Visual Development
└─ Theme Song / OST
```

실제 콘텐츠가 준비된 항목부터 노출한다.

## 3. 권장 경로

```text
watch/
├─ index.html
├─ gappae/
├─ eastwar/
└─ magic-block-master/
```

각 폴더 내부에는 필요한 페이지만 만든다.

## 4. 레거시 페이지 보존

현재 존재하는:

```text
watch/ai-film.html
watch/ost.html
watch/still.html
```

은 기존 링크가 있으므로 즉시 삭제하거나 rename하지 않는다.

마이그레이션 시:
1. 새 프로젝트별 페이지 작성
2. 전역 NAV/랜딩/허브 링크 갱신
3. 기존 링크 유입 확인
4. 필요 시 레거시 안내/리다이렉트 설계
5. 사용자 확인 후 최종 정리

## 5. 콘텐츠 문법

### Film / Trailer / Gameplay
- 영상이 주인공
- 16:9 / 9:16 실제 비율 확인
- YouTube는 embed URL
- 로컬 MP4는 실제 파일/배포 경로 확인
- 설명은 짧게

### Character Sheets
- 캐릭터 카드/시트 원본을 크게 볼 수 있게
- 이름, 역할, 짧은 설명
- 필요 시 lightbox
- 동일 인물 버전이 여러 개면 master/variant 구분

### Storyboard
- 제작 과정 설명보다 스토리보드 자체를 보기 좋게
- 비트/SHOT 순서 유지
- 확대 보기 지원 권장
- 상세 제작 판단은 MAKE로 링크

### Still / Concept Art
- 이미지 자체 중심
- 짧은 KR/EN caption 가능
- 작품·장면·캐릭터 구분 명확

### OST
- `<audio controls preload="none">`
- IP/곡명/역할 메타
- 불필요한 장문 해설 금지

## 6. WATCH ↔ MAKE 연결

같은 자료가 양쪽에 있어도 역할은 다르다.

```text
WATCH = 결과물/아카이브
MAKE  = 제작 과정/판단/실패/수정
```

예: 갑패 캐릭터
- WATCH: 완성 캐릭터 시트
- MAKE: 얼굴 교체 과정과 이유

## 7. WATCH index

새 index는 프로젝트 카드 중심.
카드에서 한눈에 보여야 할 것:
- 프로젝트명
- 유형(영화/게임/애니 등)
- 짧은 한 줄 설명
- 대표 이미지/영상
- 사용 가능한 콘텐츠 유형

`Coming soon`은 실제 상태와 맞지 않으면 제거/갱신한다.

## 8. 검수

```text
[ ] 프로젝트별 진입 구조
[ ] GAPPAE Character Sheets 존재
[ ] GAPPAE Storyboard 존재
[ ] EASTWAR Characters 분리 방향 반영
[ ] 영상/오디오/이미지 실제 경로
[ ] 레거시 URL 보존
[ ] desktop/mobile
[ ] WATCH 설명이 MAKE 제작기처럼 길어지지 않음
```

**Document:** `BYKIMJAK_WATCH_GUIDE.md`  
**Version:** 2.0