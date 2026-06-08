(function () {
  // ALL posts — newest first. Prepend new entries at the TOP.
  // url: root-relative (from site root, no leading slash).
  // In think/index.html, prefix with '../' when using as href.
  window.ALL_POSTS = [
    {
      url: 'posts/think/ai-coach-005.html',
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
