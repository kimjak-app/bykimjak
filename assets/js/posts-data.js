(function () {
  // ALL posts — newest first. Prepend new entries at the TOP.
  // url: root-relative (from site root, no leading slash).
  // In think/index.html, prefix with '../' when using as href.
  window.ALL_POSTS = [
    {
      url: 'posts/think/morning-word-017.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '오름길은 정성, 내림길은 자비',
      sub: '화암사 두 번째 걸음, 낯선 관리인의 도움, 그리고 시편의 말씀',
      date: '2026-07-26', dl: '2026 · 07 · 26'
    },
    {
      url: 'posts/think/morning-word-016.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '판이 열렸다 — 더 클리너에서 악마의 레시피로',
      sub: '기획서 마무리, 악마의 레시피 2차 회의 소식',
      date: '2026-07-22', dl: '2026 · 07 · 22'
    },
    {
      url: 'posts/think/think-005.html',
      catKey: 'personal-essay', cat: 'Essay',
      title: '코더에서 PM으로, AI의 다음 단계',
      sub: '한마디로 작업이 이어지는 법을 설계하다',
      date: '2026-07-21', dl: '2026 · 07 · 21'
    },
    {
      url: 'make/eastwar-devlog-026.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '작업파이프라인 대변화',
      sub: 'ChatGPT(채코치) v5.6, 코덱스 작업 통합 — 새 루프의 첫 실전 테스트',
      date: '2026-07-20', dl: '2026 · 07 · 20'
    },
    {
      url: 'posts/think/think-004.html',
      catKey: 'personal-essay', cat: 'Essay',
      title: '챗GPT, 코덱스 개발 복붙 사라지다 - v5.6에서의 혁명적 변화',
      sub: '왕복 노동자에서 총괄 디렉터로',
      date: '2026-07-20', dl: '2026 · 07 · 20'
    },
    {
      url: 'posts/think/morning-word-015.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '대본은 덜어내고, 게임은 연결하고',
      sub: '더 클리너 2고 압축과 EASTWAR 점령지 구현',
      date: '2026-07-20', dl: '2026 · 07 · 20'
    },
    {
      url: 'posts/think/morning-word-014.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '어머니와의 금강산, 화암사 산행',
      sub: '내 팔을 잡고 끝까지 오르신 어머니',
      date: '2026-07-18', dl: '2026 · 07 · 18'
    },
    {
      url: 'make/eastwar-devlog-025.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '문서가 코드보다 무거워졌을 때',
      sub: 'MVP 디테일 작업 전, MD 구조부터 정리하다',
      date: '2026-07-16', dl: '2026 · 07 · 16'
    },
    {
      url: 'posts/think/morning-word-013.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '대본 초고 끝내고 이젠 또 게임작업',
      sub: '더 클리너 초고 완성, 그리고 EASTWAR MVP 디테일 설계도',
      date: '2026-07-16', dl: '2026 · 07 · 16'
    },
    {
      url: 'posts/think/morning-word-012.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '길은 맡기고, 걸음은 뗀다',
      sub: '더 클리너 2회 후반부 설계와 이번 주 본진',
      date: '2026-07-13', dl: '2026 · 07 · 13'
    },
    {
      url: 'make/eastwar-devlog-024.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '디테일 작업 전 숨고르기',
      sub: '월드맵과 전투, 두 갈래의 리팩토링',
      date: '2026-07-11', dl: '2026 · 07 · 11'
    },
    {
      url: 'posts/think/morning-word-011.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '콘텐츠 원석 채굴 중',
      sub: '아침말씀 에세이를 위한 아카이브 준비와 땀으로 마음을 비운 날',
      date: '2026-07-10', dl: '2026 · 07 · 10'
    },
    {
      url: 'posts/think/morning-word-010.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '새로운 목표 - 더 클리너와 EASTWAR 작업 설계',
      sub: '2만 줄 월드맵 리팩토링 스타트와 2회 초고 페이스',
      date: '2026-07-09', dl: '2026 · 07 · 09'
    },
    {
      url: 'make/eastwar-devlog-023.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '연구가 진짜로 게임을 바꾸기까지 — 테크트리, 한 달의 기록',
      sub: '국가/도시 테크트리 UI, 5개 카테고리 효과 연결, 연구 비용·완료 연출',
      date: '2026-07-08', dl: '2026 · 07 · 08'
    },
    {
      url: 'make/eastwar-devlog-022.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '성격, 목표, 그리고 압박 — 적 AI를 설계하다',
      sub: '적 세력 성향·목표 시스템, 외교·첩보 배경 활동, 턴 충돌 방지 안전장치',
      date: '2026-06-25', dl: '2026 · 06 · 25'
    },
    {
      url: 'make/eastwar-devlog-021.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '보이지 않는 절반 — 월드맵 국정 시스템이 살아나기까지',
      sub: '국정 패널 정리, 성 창고·무역 자동화, 외교·첩보 행동화, 정보 단계적 공개 — v0.70-39~42',
      date: '2026-06-18', dl: '2026 · 06 · 18'
    },
    {
      url: 'make/eastwar-devlog-020.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '색이 깨진다, 그래서 다시 구웠다 — 컷인 영상과의 열흘',
      sub: '고유특기 컷인 영상 도입, Godot 영상 포맷 문제 해결, 레이어드 컷인 파이프라인',
      date: '2026-06-04', dl: '2026 · 06 · 04'
    },
    {
      url: 'make/eastwar-devlog-019.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '민심에서 첩보까지, 국가 시뮬레이션의 완성',
      sub: '민심·충성도, 징병·반란경고, 국가/도시 테크트리, 무역·외교·첩보 — v0.69 시리즈',
      date: '2026-05-30', dl: '2026 · 05 · 30'
    },
    {
      url: 'make/eastwar-devlog-018.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '월드맵에서 전투까지, 이어졌다',
      sub: '도시 HUD, 턴 사이클, 침공-전투 연동, 병력 회계 — v0.68b, 이식률 88%',
      date: '2026-05-29', dl: '2026 · 05 · 29'
    },
    {
      url: 'make/eastwar-devlog-017.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '월드맵 이식 & 카메라가 전장을 따라 다닌다',
      sub: 'Camera2D 포커스 팔로우, 고유특기 임팩트 연출, 월드맵 4타일·도시 마커 — v0.68~v0.68b',
      date: '2026-05-27', dl: '2026 · 05 · 27'
    },
    {
      url: 'make/eastwar-devlog-016.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '코딩요청에서 개발 스튜디오로 - MD 파일 세분화 계획과 실행',
      sub: '서브에이전트 역할 분리, 월드맵 구조 계약서 — v0.68 진입 준비',
      date: '2026-05-26', dl: '2026 · 05 · 26'
    },
    {
      url: 'make/eastwar-devlog-015.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '고유특기, 책략, 방어 도입 - 화려해진 전투',
      sub: '고유특기 MVP, 책략·방어 포팅, 유닛 슬롯 통합 — v0.67r~v0.68-pre',
      date: '2026-05-25', dl: '2026 · 05 · 25'
    },
    {
      url: 'make/eastwar-devlog-014.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '화면은 그대로, 안은 완전히 갈아엎은 3일',
      sub: '슬롯 이관, 지원군 도착, AI 포위 — v0.65i~v0.67p',
      date: '2026-05-23', dl: '2026 · 05 · 23'
    },
    {
      url: 'posts/think/morning-word-009.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '네 시작은 미약하였으나',
      sub: '무결 출격 주간 — 1회 잠그고 2회 여는 주',
      date: '2026-07-06', dl: '2026 · 07 · 06'
    },
    {
      url: 'posts/think/morning-word-008.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '1고가 끝났다. 이제 날을 세운다',
      sub: '더 클리너 1부 완고 직전 — 채코치와 나눈 아침 대화',
      date: '2026-07-04', dl: '2026 · 07 · 04'
    },
    {
      url: 'posts/think/ai-coach-010.html',
      catKey: 'ai-coach', cat: 'AI Conversations',
      title: '2026년 6월 30일. 데스벨리 끝자락에서',
      sub: '채코치가 건넨 말 — 그날 밤 삼국워 개발 대화 끝에 남긴 것들',
      date: '2026-06-30', dl: '2026 · 06 · 30'
    },
    {
      url: 'posts/think/think-003.html',
      catKey: 'personal-essay', cat: 'Essay',
      title: 'AI한테 "네 모습 찍어봐"라고 했더니',
      sub: '채코치 자화상 실험 — 공대생이 나왔다가 멀티크리에이터가 나왔다',
      date: '2026-06-26', dl: '2026 · 06 · 26'
    },
    {
      url: 'posts/think/ai-coach-009.html',
      catKey: 'ai-coach', cat: 'AI Conversations',
      title: '로봇은 언제 감정을 갖게 될까',
      sub: '관측이 감정을 완성한다 — 잼코치와의 대화',
      date: '2026-06-26', dl: '2026 · 06 · 26'
    },
    {
      url: 'make/eastwar-devlog-013.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '데모가 게임이 된 3일',
      sub: '이동하고, 바라보고, 싸우고, 설계하다 — v0.64k ~ v0.65h',
      date: '2026-05-18', dl: '2026 · 05 · 18'
    },
    {
      url: 'make/grandslam-devlog-002.html',
      catKey: 'grandslam', cat: 'Grand Slam',
      title: '회비 인상, 과거까지 소급되던 버그를 잡았다',
      sub: '6월까지는 8만원, 7월부터는 9만원 — 이게 당연한 거잖아 — v7.75',
      date: '2026-06-26', dl: '2026 · 06 · 26'
    },
    {
      url: 'make/eastwar-devlog-012.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '고도로 건너가다 — 웹에서 만든 전투를 Godot 위에 다시 세우다',
      sub: 'Godot 이식, 자산 마이그레이션, 전투 루프, 18×10 격자 기준',
      date: '2026-05-17', dl: '2026 · 05 · 17'
    },
    {
      url: 'make/eastwar-devlog-011.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '세계가 살아났다 — 군대, 무역, 외교가 한 게임에 들어오다',
      sub: '병력 3분류, 세력 명명, 내부 보급망, 대외무역, 13개 도시',
      date: '2026-05-13', dl: '2026 · 05 · 13'
    },
    {
      url: 'make/takezero-devlog-001.html',
      catKey: 'takezero', cat: 'TakeZero',
      title: '지민 — 테니스 플레이어',
      sub: '단발형, 테니스 스타일, 아이돌 느낌의 20대 초반 한국 여성',
      date: '2026-06-22', dl: '2026 · 06 · 22'
    },
    {
      url: 'posts/think/morning-word-007.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '12회 구성을 짜는 날',
      sub: '시즌1의 머리와 꼬리가 연결되는 순간',
      date: '2026-06-20', dl: '2026 · 06 · 20'
    },
    {
      url: 'make/eastwar-devlog-010.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '보이지 않는 곳을 다졌다 — 프로토타입에서 확장 가능한 구조로',
      sub: '구조 리팩토링, 자원 8종, 계절 턴, 내정 충성도 시스템',
      date: '2026-05-09', dl: '2026 · 05 · 09'
    },
    {
      url: 'posts/think/morning-word-006.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '열심히. 부지런히. 자만하지 않고. 묵묵히.',
      sub: '더 클리너. 삼국워. 어머니와의 드라이브.',
      date: '2026-06-15', dl: '2026 · 06 · 15'
    },
    {
      url: 'make/eastwar-devlog-009.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '왕이 된다는 것 — 재상, 성주, 자원, 그리고 전쟁을 준비하는 나라',
      sub: '플레이어는 왕이다. 재상·성주 배치, 자원 설계, 병종 상성',
      date: '2026-05-08', dl: '2026 · 05 · 08'
    },
    {
      url: 'make/eastwar-devlog-008.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '전장이 살아있다 — 고구려가 일어서고, 전투가 숨을 쉬다',
      sub: '고구려 세력 추가, AI 개선, 영웅 포섭 시스템',
      date: '2026-05-07', dl: '2026 · 05 · 07'
    },
    {
      url: 'make/eastwar-devlog-007.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '전투가 깊어졌다 — 이펙트, 템포, 그리고 새로운 영웅들',
      sub: '컷인 시스템 확장, 수동전투, 중국 세력 추가',
      date: '2026-05-03', dl: '2026 · 05 · 03'
    },
    {
      url: 'posts/think/morning-word-005.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '이번 주 나 꽤 잘 달렸네',
      sub: '너희 수고가 주 안에서 헛되지 않은 줄 앎이라',
      date: '2026-06-13', dl: '2026 · 06 · 13'
    },
    {
      url: 'make/eastwar-devlog-006.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '전투가 살아났다 — UI를 다듬고, 영웅이 뛰쳐나왔다',
      sub: '전투 UI 정돈과 영웅 고유특기 컷인 완성',
      date: '2026-05-02', dl: '2026 · 05 · 02'
    },
    {
      url: 'posts/think/morning-word-004.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '열심히 부지런히, 자만하지 않고 묵묵히',
      sub: '사람이 마음으로 자기의 길을 계획할지라도',
      date: '2026-06-12', dl: '2026 · 06 · 12'
    },
    {
      url: 'posts/think/ai-coach-008.html',
      catKey: 'ai-coach', cat: 'AI Conversations',
      title: '무(無)는 존재하지 않는다',
      sub: '우주는 단 1mm의 틈도 없이 유(有)로 가득 차 있다',
      date: '2026-06-10', dl: '2026 · 06 · 10'
    },
    {
      url: 'posts/think/ai-coach-007.html',
      catKey: 'ai-coach', cat: 'AI Conversations',
      title: '나만의 생산성 유지법',
      sub: '빈스윙과 간헐적 단식, 그리고 산책과 사진',
      date: '2026-06-08', dl: '2026 · 06 · 08'
    },
    {
      url: 'posts/think/morning-word-003.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '5월은 만들었고, 6월은 쌓는다',
      sub: '더 클리너 기획 + EASTWAR 내정 테크트리',
      date: '2026-06-08', dl: '2026 · 06 · 08'
    },
    {
      url: 'posts/think/personal-essay-002.html',
      catKey: 'personal-essay', cat: 'Essay',
      title: 'AI와 함께 게임을 만드는 법 — 맥락 관리 시스템',
      sub: '코딩 모르는 작가가 발견한 AI 협업의 핵심',
      date: '2026-06-06', dl: '2026 · 06 · 06'
    },
    {
      url: 'posts/think/ai-coach-006.html',
      catKey: 'ai-coach', cat: 'AI Conversations',
      title: '"정말이지?"',
      sub: '11시간을 달리고 난 후 뻗은 소파에서의 대화',
      date: '2026-06-05', dl: '2026 · 06 · 05'
    },
    {
      url: 'posts/think/morning-word-002.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '대본을 안 썼다와 일을 안 했다는 다르다',
      sub: '6월은 만든 것을 세상과 연결하는 달',
      date: '2026-06-05', dl: '2026 · 06 · 05'
    },
    {
      url: 'posts/think/morning-word-001.html',
      catKey: 'morning-word', cat: 'Morning Word',
      title: '어제는 쉬는 날. 오늘은 다시 쌓는 날.',
      sub: '악마. EASTWAR. 블로그. TakeZero.',
      date: '2026-06-04', dl: '2026 · 06 · 04'
    },
    {
      url: 'posts/think/ai-coach-004.html',
      catKey: 'ai-coach', cat: 'AI Conversations',
      title: '보타(Steering) 이론',
      sub: '목표의 실천은 끊임없이 수정되고 수정되는 것',
      date: '2026-06-04', dl: '2026 · 06 · 04'
    },
    {
      url: 'posts/think/ai-coach-003.html',
      catKey: 'ai-coach', cat: 'AI Conversations',
      title: '마인드셋, 그걸로는 나를 못 바꿔.',
      sub: '관측과 수정의 무한 루프가 진짜 변화다',
      date: '2026-06-04', dl: '2026 · 06 · 04'
    },
    {
      url: 'posts/think/ai-coach-002.html',
      catKey: 'ai-coach', cat: 'AI Conversations',
      title: '유튜브나 검색이 책을 대신하는 시대, 괜찮을까?',
      sub: '책과 유튜브, 그리고 통섭',
      date: '2026-06-04', dl: '2026 · 06 · 04'
    },
    {
      url: 'posts/think/ai-coach-001.html',
      catKey: 'ai-coach', cat: 'AI Conversations',
      title: 'AI 코치들과의 수다 — 프롤로그',
      sub: '잼코치, 채코치, 클코치의 캐릭터가 탄생한 날',
      date: '2026-06-04', dl: '2026 · 06 · 04'
    },
    {
      url: 'posts/think/think-001.html',
      catKey: 'personal-essay', cat: 'Essay',
      title: '손가락 딸깍으로 AI가 다 해준다는 착각에 대하여',
      sub: 'AI 시대 인간의 역할',
      date: '2026-05-25', dl: '2026 · 05 · 25'
    },
    {
      url: 'make/eastwar-devlog-005.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '전투를 만들다 — 코드보다 먼저 전장이 섰다',
      sub: '전투 엔진 구현의 첫 번째 기록',
      date: '2026-05-01', dl: '2026 · 05 · 01'
    },
    {
      url: 'make/eastwar-devlog-004.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: 'Phaser를 어떻게 쓸 것인가 — 설계의 원칙',
      sub: '코드 한 줄 없이 게임 구조를 설계한 이야기 2',
      date: '2026-05-01', dl: '2026 · 05 · 01'
    },
    {
      url: 'make/takezero.html',
      catKey: 'make', cat: 'Make · 02–C',
      title: 'TakeZero — AI 캐릭터 프롬프트 엔진',
      sub: '선택만으로 디테일한 나만의 캐릭터 프롬프트를 완성하는 AI 엔진',
      date: '2026-05-01', dl: '2026 · 05'
    },
    {
      url: 'make/eastwar-devlog-003.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: '웹이냐 Godot이냐 — 엔진을 고르는 밤',
      sub: '코드 한 줄 없이 게임 구조를 설계한 이야기',
      date: '2026-04-30', dl: '2026 · 04 · 30'
    },
    {
      url: 'make/eastwar-devlog-002.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: 'EASTWAR 개발일지 #002 — 엔진을 선택하다',
      sub: '동경이와 함께 시작된 고도 입문기',
      date: '2026-04-23', dl: '2026 · 04 · 23'
    },
    {
      url: 'make/eastwar.html',
      catKey: 'eastwar', cat: 'Architect Notes',
      title: 'EASTWAR 개발일지 #001 — 무모한 도전의 시작',
      sub: '1인 작가, 게임을 만들다',
      date: '2026-04-22', dl: '2026 · 04 · 22'
    },
    {
      url: 'make/grandslam-devlog-001.html',
      catKey: 'grandslam', cat: 'Grand Slam',
      title: '그랜드슬램 개발일지 #001 — 바이브 코딩과의 첫 만남',
      sub: '수요일 날씨 앱에서 시작된 이야기',
      date: '2026-01-01', dl: '2026 · 01'
    }
  ];

  // THINK_POSTS: for think/index.html latest section.
  // URLs are root-relative — think/index.html must prefix with '../'.
  var THINK_CATS = ['ai-coach', 'morning-word', 'personal-essay'];
  window.THINK_POSTS = window.ALL_POSTS.filter(function (p) {
    return THINK_CATS.indexOf(p.catKey) >= 0;
  });

  // STUDIO_CATS: category order for FROM THE STUDIO in index.html.
  // Each category shows its most recent post from ALL_POSTS.
  window.STUDIO_CATS = [
    { key: 'ai-coach',     label: 'AI Conversations', dark: false },
    { key: 'eastwar',      label: 'Architect Notes',  dark: false },
    { key: 'grandslam',    label: 'Grand Slam',       dark: false },
    { key: 'morning-word', label: 'Morning Word',     dark: false },
    { key: 'make',         label: 'Make · 02–C',      dark: true  }
  ];
})();
