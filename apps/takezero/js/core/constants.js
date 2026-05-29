const APP_VERSION = '4.520';
const VER = APP_VERSION;

        /* ══════════════════════════════════════════
           DATA: CHARACTER (100% Retained from v1.9)
        ══════════════════════════════════════════ */
        const MATERIAL_PROMPTS = {
            '면(코튼)': 'soft natural cotton', '리넨': 'breathable natural linen', '울(양모)': 'warm woolen knit',
            '폴리에스터': 'lightweight synthetic polyester', '메쉬': 'open-weave breathable mesh',
            '스웨이드': 'soft suede leather', '가죽': 'high-quality grained leather',
            '브러쉬드알루': 'brushed aluminum metallic finish', '탄소섬유': 'hexagonal carbon fiber weave',
            '나일론(테크)': 'heavyweight tactical nylon', '실크': 'glossy reflective premium silk',
            '데님': 'rugged indigo denim', '라텍스': 'shiny high-gloss latex',
            '고어텍스': 'matte waterproof gore-tex', '벨벳': 'soft light-absorbing velvet',
            '홀로그램': 'iridescent holographic smart fabric', 'PVC': 'rigid glossy PVC', '퍼(모피)': 'luxurious faux fur'
        };
        const ALL_MAT = Object.keys(MATERIAL_PROMPTS);

        const ATTIRE_DATA = {
            '아우터': {
                label: '코트 / 아우터 (20종)',
                items: [
                    { n: '트렌치코트', d: '클래식 더블버튼 트렌치코트', dm: '면(코튼)' }, { n: '울 오버코트', d: '롱 울 오버핏 코트', dm: '울(양모)' },
                    { n: '피코트', d: '네이비 더블버튼 피코트', dm: '울(양모)' }, { n: '더플코트', d: '토글 버튼 후드 더플', dm: '울(양모)' },
                    { n: '체스터필드', d: '테일러드 체스터필드 코트', dm: '울(양모)' }, { n: '바람막이', d: '경량 방풍 윈드브레이커', dm: '나일론(테크)' },
                    { n: 'MA-1 봄버', d: '밀리터리 항공 점퍼', dm: '나일론(테크)' }, { n: 'M-65 필드자켓', d: '군용 필드 자켓', dm: '면(코튼)' },
                    { n: 'BDU 전투복 상의', d: '위장무늬 전투복 자켓', dm: '면(코튼)' }, { n: '플라이트 수트', d: '원피스 조종사 수트', dm: '나일론(테크)' },
                    { n: '테일러드 수트 자켓', d: '격식체 싱글 자켓', dm: '울(양모)' }, { n: '더블 수트 자켓', d: '클래식 더블브레스트', dm: '울(양모)' },
                    { n: '블레이저', d: '캐주얼 테일러드 블레이저', dm: '울(양모)' }, { n: '가죽 라이더', d: '모터사이클 레더 재킷', dm: '가죽' },
                    { n: '데님 자켓', d: '클래식 데님 트러커', dm: '데님' }, { n: '후드 집업', d: '캐주얼 지퍼업 후디', dm: '면(코튼)' },
                    { n: '아노락', d: '스포츠 오버핏 아노락', dm: '나일론(테크)' }, { n: '사이버쉘 코트', d: '미래형 아머 코트', dm: '브러쉬드알루' },
                    { n: '엑소리그 하네스', d: '전술 외골격 하네스', dm: '탄소섬유' }, { n: '아크라이트 파카', d: '하이테크 발광 파카', dm: '폴리에스터' }
                ], materials: ALL_MAT, condition: null
            },
            '상의': {
                label: '이너 / 상의 (20종)',
                items: [
                    { n: '화이트 드레스셔츠', d: '포멀 클래식 드레스셔츠', dm: '면(코튼)' }, { n: '스트라이프 셔츠', d: '핀스트라이프 비즈니스셔츠', dm: '면(코튼)' },
                    { n: '옥스퍼드 셔츠', d: '캐주얼 옥스퍼드 버튼다운', dm: '면(코튼)' }, { n: '군복 셔츠', d: '밀리터리 유틸리티 셔츠', dm: '면(코튼)' },
                    { n: '크루넥 티셔츠', d: '기본 라운드넥 티셔츠', dm: '면(코튼)' }, { n: '그래픽 티', d: '프린트 그래픽 티셔츠', dm: '면(코튼)' },
                    { n: '머슬핏 탱크탑', d: '피트니스 스트링거', dm: '폴리에스터' }, { n: '터틀넥', d: '슬림핏 하이넥 니트', dm: '울(양모)' },
                    { n: '케이블 니트', d: '두꺼운 케이블 패턴 스웨터', dm: '울(양모)' }, { n: '크롭 후디', d: '쇼트 크롭 후드티', dm: '면(코튼)' },
                    { n: '폴로 셔츠', d: '스포티 카라 폴로', dm: '면(코튼)' }, { n: '헨리 셔츠', d: '버튼 플라켓 헨리넥', dm: '면(코튼)' },
                    { n: '베스트/조끼', d: '수트용 드레스 베스트', dm: '울(양모)' }, { n: '택티컬 베스트', d: '전술 모듈형 조끼', dm: '나일론(테크)' },
                    { n: '하와이안 셔츠', d: '리조트 플로럴 패턴', dm: '리넨' }, { n: '데이터스플라이스 티', d: '하이테크 홀로그램 프린트', dm: '홀로그램' },
                    { n: '펄스칼라 셔츠', d: '에너지 반응형 컬러 셔츠', dm: '실크' }, { n: '고스트위브 블레이저', d: '반투명 위브 소재 블레이저', dm: '메쉬' },
                    { n: '나노섬유 후드', d: '자가회복 나노 섬유 후디', dm: '나일론(테크)' }, { n: '서멀 이너', d: '기능성 보온 이너웨어', dm: '폴리에스터' }
                ], materials: ALL_MAT, condition: null
            },
            '하의': {
                label: '하의 (20종)',
                items: [
                    { n: '수트 트라우저', d: '포멀 테일러드 슬랙스', dm: '울(양모)' }, { n: '치노 팬츠', d: '클래식 면 치노', dm: '면(코튼)' },
                    { n: '스키니 진', d: '타이트 스키니 데님', dm: '데님' }, { n: '스트레이트 진', d: '클래식 스트레이트 데님', dm: '데님' },
                    { n: '와이드 진', d: '루즈핏 와이드레그 데님', dm: '데님' }, { n: 'BDU 카고', d: '군용 카고 전투 바지', dm: '나일론(테크)' },
                    { n: '카고 조거', d: '멀티포켓 조거 팬츠', dm: '면(코튼)' }, { n: '서멀 조거', d: '기능성 보온 조거', dm: '폴리에스터' },
                    { n: '스웨트팬츠', d: '캐주얼 루즈핏 트레이닝', dm: '면(코튼)' }, { n: '바이커 쇼츠', d: '피트니스 사이클 쇼츠', dm: '폴리에스터' },
                    { n: '보드쇼츠', d: '서핑 보드 반바지', dm: '나일론(테크)' }, { n: '치노 쇼츠', d: '깔끔한 면 반바지', dm: '면(코튼)' },
                    { n: '레깅스', d: '스포츠 컴프레션 레깅스', dm: '폴리에스터' }, { n: '스키 팬츠', d: '방수 인슐레이티드 스노우팬츠', dm: '고어텍스' },
                    { n: '트라우저 쇼츠', d: '정장형 반바지', dm: '울(양모)' }, { n: '스텔스 슬랙스', d: '하이테크 쉐도우 슬랙스', dm: '탄소섬유' },
                    { n: '펄스트림 트라우저', d: '에너지 반응 소재 바지', dm: '실크' }, { n: '엑소팬츠', d: '외골격 지지 전술 바지', dm: '탄소섬유' },
                    { n: '메쉬 유틸리티 숏', d: '투습 메쉬 유틸리티 반바지', dm: '메쉬' }, { n: '홀로그램 레깅스', d: '홀로그래픽 스마트 레깅스', dm: '홀로그램' }
                ], materials: ALL_MAT, condition: null
            },
            '스커트': {
                label: '스커트 (여성)',
                items: [
                    { n: '미디 치마', d: '무릎 아래 A라인 미디스커트', dm: '면(코튼)' }, { n: '미니스커트', d: '허벅지 위 짧은 미니', dm: '데님' },
                    { n: '플리츠 스커트', d: '주름잡힌 클래식 플리츠', dm: '폴리에스터' }, { n: '래핑 스커트', d: '랩어라운드 사이드슬릿', dm: '실크' },
                    { n: '홀로 튤 스커트', d: '반투명 홀로그래픽 튤', dm: '홀로그램' }, { n: '페플럼 스커트', d: '허리 주름 플레어 페플럼', dm: '울(양모)' }
                ], materials: ALL_MAT, condition: 'female'
            },
            '수영복(남)': {
                label: '남성 수영복',
                items: [
                    { n: '삼각 스윔슈트', d: '클래식 트라이앵글 수영복', dm: '폴리에스터' }, { n: '사각 보드숏', d: '루즈핏 서핑 보드숏', dm: '나일론(테크)' }
                ], materials: ['라텍스', '나일론(테크)', '메쉬', '폴리에스터'], condition: 'male'
            },
            '수영복(여)': {
                label: '여성 수영복',
                items: [
                    { n: '비키니', d: '투피스 비키니 탑+보텀', dm: '폴리에스터' }, { n: '원피스 수영복', d: '클래식 원피스 수영복', dm: '라텍스' },
                    { n: '스포츠 수영복', d: '레이서백 경기용 수영복', dm: '폴리에스터' }
                ], materials: ['라텍스', '나일론(테크)', '홀로그램', '메쉬', '폴리에스터'], condition: 'female'
            },
            '신발': {
                label: '신발',
                items: [
                    { n: '옥스퍼드', d: '클래식 포멀 레이스업 구두', dm: '가죽' }, { n: '더비', d: '오픈 레이스 비즈니스 구두', dm: '가죽' },
                    { n: '로퍼', d: '슬립온 클래식 로퍼', dm: '스웨이드' }, { n: '스니커즈', d: '캐주얼 로우탑 스니커', dm: '면(코튼)' },
                    { n: '하이탑 스니커', d: '앵클 서포트 하이탑', dm: '가죽' }, { n: '컴뱃 부츠', d: '밀리터리 스틸토 전투화', dm: '가죽' },
                    { n: '첼시 부츠', d: '사이드고어 앵클 부츠', dm: '가죽' }, { n: '샌들', d: '스트랩 오픈토 샌들', dm: '가죽' },
                    { n: '맥레브 러너', d: '반중력 소재 러닝화', dm: '탄소섬유' }, { n: '엑소부츠 MK2', d: '외골격 지지 전술 부츠', dm: '브러쉬드알루' }
                ], materials: ALL_MAT, condition: null
            },
            '액세서리': {
                label: '액세서리',
                items: [
                    { n: '베레모', d: '클래식 울 베레', dm: '울(양모)' }, { n: '캡(볼캡)', d: '스포티 볼캡', dm: '면(코튼)' }, { n: '페도라', d: '테 넓은 페도라', dm: '울(양모)' },
                    { n: '버킷햇', d: '캐주얼 버킷햇', dm: '면(코튼)' }, { n: '체인 목걸이', d: '심플 메탈 체인', dm: '브러쉬드알루' }, { n: '초커', d: '넥 밀착 초커', dm: '가죽' },
                    { n: '드레스 워치', d: '포멀 씬 드레스 시계', dm: '가죽' }, { n: '스마트워치', d: '디지털 스마트 워치', dm: '폴리에스터' },
                    { n: '가죽 팔찌', d: '미니멀 가죽 밴드', dm: '가죽' }, { n: '앵클릿', d: '가는 체인 발찌', dm: '브러쉬드알루' },
                    { n: '서류가방', d: '포멀 하드케이스 브리프케이스', dm: '가죽' }, { n: '백팩', d: '캐주얼 데이팩 백팩', dm: '나일론(테크)' }
                ], materials: ALL_MAT, condition: null
            }
        };

        const ATTIRE_STATUS = ['새것 (Clean)', '착용감 (Worn)', '전투 손상 (Battle-damaged)', '우천 젖음 (Rain-soaked)', '먼지/흙 (Dusty)'];
        const ATTIRE_STATUS_PROMPTS = { '새것 (Clean)': 'pristine clean condition', '착용감 (Worn)': 'naturally worn look', '전투 손상 (Battle-damaged)': 'battle-damaged with tears', '우천 젖음 (Rain-soaked)': 'rain-soaked wet fabric', '먼지/흙 (Dusty)': 'dusty mud-stained condition' };
        const SKIN_TEXTURES = ['매끄러움(도자기)', '사실적 모공', '잡티/주근깨', '유분기(물광)', '매트함(뽀송)', '땀방울', '거친/노화', '흉터', '홍조', '반투명(창백)', '초사실적 피부'];
        const SKIN_TEX_PROMPTS = { '매끄러움(도자기)': 'flawless porcelain smooth skin', '사실적 모공': 'visible realistic skin pores', '잡티/주근깨': 'natural freckles and minor imperfections', '유분기(물광)': 'glossy dewy skin', '매트함(뽀송)': 'matte velvety skin texture', '땀방울': 'beads of sweat on skin, moist texture', '거친/노화': 'rough weathered skin with fine lines', '흉터': 'subtle facial scars', '홍조': 'flushed reddish cheeks', '반투명(창백)': 'translucent pale skin with visible veins', '초사실적 피부': '' };
        const FACE_SHAPES = ['계란형', '둥근형', '각진형', '하트형', '다이아몬드형', '긴형'];
        const FACE_PROMPTS = { '계란형': 'oval symmetrical face shape', '둥근형': 'round soft-featured face', '각진형': 'strong square-jawed face', '하트형': 'heart-shaped face', '다이아몬드형': 'sharp diamond face with high cheekbones', '긴형': 'elongated oblong face shape' };
        const FOREHEAD_SHAPES = ['보통 이마', 'M자 이마', '짱구 이마', '넓은 이마', '좁은 이마', '완만한 이마', 'Widow Peak'];
        const FOREHEAD_PROMPTS = { '보통 이마': 'natural standard forehead', 'M자 이마': 'M-shaped widow peak hairline', '짱구 이마': 'prominent protruding brow ridge', '넓은 이마': 'broad high forehead', '좁은 이마': 'narrow low forehead', '완만한 이마': 'smooth receding gentle forehead', 'Widow Peak': 'classic widow peak hairline' };

        // 인종 3단계 구조
        const RACE_TIER1 = [
            { ko: '동양인', key: 'eastern' },
            { ko: '백인/라틴', key: 'caucasian' },
            { ko: '흑인', key: 'black' }
        ];

        const RACE_TIER2 = {
            eastern:   [{ ko: '한국', en: 'Korean' }, { ko: '일본', en: 'Japanese' }, { ko: '중국', en: 'Chinese' }, { ko: '동남아', en: 'Southeast Asian' }, { ko: '남아시아', en: 'South Asian' }],
            caucasian: [{ ko: '미국(백인)', en: 'White American' }, { ko: '북유럽', en: 'Northern European' }, { ko: '남유럽', en: 'Southern European' }, { ko: '라틴/히스패닉', en: 'Hispanic' }],
            black:     [{ ko: '아프리칸 아메리칸', en: 'African American' }, { ko: '서아프리카', en: 'West African' }, { ko: '동아프리카', en: 'East African' }]
        };

        const RACE_TIER3 = {
            // 동양인
            '한국': [
                { ko: '한국인', en: 'Korean facial features, high cheekbones, defined v-line jaw, warm yellow-toned skin, natural monolid or subtle double eyelid, low-to-mid nose bridge with rounded tip' },
                { ko: '남자 아이돌', en: 'Korean male idol visual, sharp v-line jaw, high nose bridge, fair flawless glass skin, soft yet masculine features, monolid or subtle double eyelid, idol-like handsome visual' },
                { ko: '여자 아이돌', en: 'Korean female idol visual, small oval face, large double eyelid eyes, high slim nose bridge, gradient full lips, porcelain fair skin, youthful feminine features, K-pop idol beauty' },
                { ko: '한국 고전미인', en: 'classic Korean beauty, soft oval face, delicate refined features, pale luminous skin, gentle almond eyes, elegant traditional Korean aesthetic, hanbok-worthy beauty' }
            ],
            '일본': [
                { ko: '일본인', en: 'Japanese facial features, soft rounded face, subtle delicate features, fair porcelain skin, gentle almond eye shape, refined natural look' },
                { ko: '일본 애니풍', en: 'Japanese anime-inspired features, large expressive eyes, delicate refined face, fair luminous skin, youthful soft look' },
                { ko: '일본 갸루풍', en: 'Japanese gyaru style, heavily styled bleached hair, dramatic eye makeup with false lashes, bold fashion-forward features, energetic youthful look, gyaru aesthetic' },
                { ko: 'J-pop 아이돌', en: 'Japanese idol visual, cute youthful face, fair smooth skin, bright expressive eyes, fresh innocent charm, J-pop idol aesthetic' },
                { ko: '일본 고전미인', en: 'classic Japanese beauty, soft oval face, pale porcelain skin, gentle downturned eyes, refined elegant features, traditional Japanese aesthetic, kimono-worthy beauty' }
            ],
            '중국': [
                { ko: '중국인', en: 'Chinese facial features, broad face structure, prominent cheekbones, strong defined jaw, medium warm skin tone, classic East Asian look' },
                { ko: '중국 고전미인', en: 'classic Chinese beauty, delicate oval face, soft almond eyes, porcelain fair skin, refined elegant features, traditional East Asian beauty, dynasty-era aesthetic' },
                { ko: 'C-pop 아이돌', en: 'Chinese idol visual, sharp defined features, fair flawless skin, intense dark eyes, charismatic masculine or feminine beauty, C-pop star aesthetic' },
                { ko: '차이나타운풍', en: 'modern Chinese urban style, confident mixed contemporary features, warm skin tone, stylish city-dweller look, cosmopolitan Chinese aesthetic' }
            ],
            '동남아': [
                { ko: '동남아시아인', en: 'Southeast Asian facial features, warm tan skin tone, soft rounded face, natural dark eyes, tropical natural look' },
                { ko: '태국 미인', en: 'Thai beauty features, soft mixed facial features, warm golden skin tone, gentle almond eyes, delicate refined face, Southeast Asian elegance' },
                { ko: '발리니즈', en: 'Balinese exotic features, warm deep tan skin, strong expressive eyes, natural exotic beauty, tropical island aesthetic, Indonesian natural look' },
                { ko: '레이디보이', en: 'Southeast Asian transgender feminine features, soft delicate face, smooth fair skin, feminine jawline, graceful elegant features, ladyboy beauty aesthetic' }
            ],
            '남아시아': [
                { ko: '남아시아인', en: 'South Asian facial features, warm brown skin tone, defined brow ridge, dark expressive eyes, strong nose bridge' },
                { ko: '볼리우드 남자배우', en: 'Indian Bollywood male actor, large expressive dark eyes, strong chiseled jaw, warm brown skin, thick defined brows, masculine charismatic features, Bollywood hero aesthetic' },
                { ko: '볼리우드 여자배우', en: 'Indian Bollywood female actress, large luminous dark eyes, full sculpted lips, warm golden brown skin, strong defined brows, graceful feminine features, Bollywood heroine beauty' },
                { ko: '파키스탄/아프간 미인', en: 'Pakistani Afghan features, striking light eyes, sharp defined features, olive to fair skin, strong brow ridge, exotic Middle Eastern-South Asian blend' }
            ],
            // 백인/라틴
            '미국(백인)': [
                { ko: '미국인', en: 'White American facial features, defined angular face, natural fair skin, varied eye colors, strong jaw' },
                { ko: '할리우드 남자배우', en: 'Hollywood male actor, sharp chiseled jaw, strong defined features, fair to tan skin, intense eyes, masculine charismatic American look' },
                { ko: '할리우드 미인형', en: 'Hollywood classic beauty, striking symmetrical features, fair luminous skin, defined cheekbones, full lips, timeless glamorous American beauty' },
                { ko: '할리우드 개성형', en: 'Hollywood unconventional beauty, strong distinctive features, sharp angular face, intense piercing eyes, edgy unique presence, character actress aesthetic' }
            ],
            '북유럽': [
                { ko: '북유럽인', en: 'Northern European features, pale fair skin, sharp angular bone structure, light eyes, tall defined nose bridge' },
                { ko: '바이킹풍', en: 'Nordic Viking features, strong broad jaw, pale fair skin, light eyes, rugged masculine features, fierce Scandinavian look' },
                { ko: '북유럽 모델', en: 'Scandinavian model beauty, ice blonde or ash hair, pale porcelain skin, sharp angular features, cold elegant look' }
            ],
            '남유럽': [
                { ko: '남유럽인', en: 'Southern European features, olive warm skin, dark hair, strong expressive eyes, defined Mediterranean look' }
            ],
            '라틴/히스패닉': [
                { ko: '라틴계', en: 'Latin Hispanic features, warm olive to brown skin, dark expressive eyes, strong defined face, natural Latin look' },
                { ko: '라틴 남자', en: 'Latin male features, warm olive skin, dark expressive eyes, strong jaw, charismatic masculine Latin look' },
                { ko: '라틴 여자', en: 'Latin female beauty, warm golden skin, full voluptuous features, dark passionate eyes, sensual feminine Latin aesthetic' }
            ],
            // 흑인
            '아프리칸 아메리칸': [
                { ko: '아프리카계 미국인', en: 'African American features, warm deep skin tone, strong defined facial structure, expressive dark eyes, natural textured look' },
                { ko: '미국 흑인 남자', en: 'African American male, mixed heritage refined features, warm deep brown skin, strong defined jaw, expressive dark eyes, charismatic masculine presence' },
                { ko: '미국 흑인 여자', en: 'African American female beauty, luminous deep skin, striking dark eyes, full lips, powerful feminine elegance, glamorous Black beauty' },
                { ko: 'NBA/힙합풍', en: 'African American urban style, strong athletic facial features, deep rich skin, intense dark eyes, bold masculine presence, street culture aesthetic' }
            ],
            '서아프리카': [
                { ko: '서아프리카인', en: 'West African features, deep rich skin tone, broad strong nose, full lips, powerful defined facial structure' },
                { ko: '서아프리카 전통미', en: 'West African traditional beauty, deep ebony skin, strong broad features, full lips, powerful natural African aesthetic, tribal elegance' }
            ],
            '동아프리카': [
                { ko: '동아프리카인', en: 'East African features, warm dark skin tone, refined angular face, high cheekbones, sharp defined features' },
                { ko: '동아프리카 모델', en: 'East African model beauty, elongated refined face, high sharp cheekbones, deep dark skin, statuesque elegant features, runway aesthetic' }
            ]
        };

        // 혼혈 레이블 (슬라이더용)
        const RACE_DATA = { asia: [{ ko: '한국', en: 'Korean' }, { ko: '일본', en: 'Japanese' }, { ko: '중국', en: 'Chinese' }, { ko: '동남아', en: 'Southeast Asian' }, { ko: '남아시아', en: 'South Asian' }], caucasian: [{ ko: '미국(백인)', en: 'White American' }, { ko: '북유럽', en: 'Northern European' }, { ko: '남유럽', en: 'Southern European' }, { ko: '라틴/히스패닉', en: 'Hispanic' }], black: [{ ko: '아프리칸 아메리칸', en: 'African American' }, { ko: '서아프리카', en: 'West African' }, { ko: '동아프리카', en: 'East African' }] };
        // 눈매
        const EYE_SHAPES = ['없음', '속쌍', '뚜렷한 쌍꺼풀', '처진 눈', '일자 눈', '올라간 눈'];
        const EYE_SHAPE_PROMPTS = { '없음': '', '속쌍': 'subtle inner double eyelid', '뚜렷한 쌍꺼풀': 'prominent double eyelid crease', '처진 눈': 'droopy downturned eyes', '일자 눈': 'straight horizontal eye shape', '올라간 눈': 'upturned almond eyes' };

        // 눈썹
        const EYEBROW_SHAPES = ['일자 눈썹', '아치형 눈썹', '짧고 진한 눈썹', '가늘고 긴 눈썹', '굵고 자연스러운 눈썹'];
        const EYEBROW_PROMPTS = { '일자 눈썹': 'straight flat eyebrows', '아치형 눈썹': 'arched curved eyebrows', '짧고 진한 눈썹': 'short thick bold eyebrows', '가늘고 긴 눈썹': 'thin long delicate eyebrows', '굵고 자연스러운 눈썹': 'thick natural full eyebrows' };

        // 코
        const NOSE_SHAPES = ['오뚝한 코', '낮고 넓은 코', '매부리코', '작고 오목한 코', '둥근 코'];
        const NOSE_PROMPTS = { '오뚝한 코': 'high sharp nose bridge with refined tip', '낮고 넓은 코': 'low wide nose bridge with broad tip', '매부리코': 'prominent aquiline hook nose', '작고 오목한 코': 'small button nose with concave bridge', '둥근 코': 'round bulbous nose tip, soft bridge' };

        // 입
        const LIP_SHAPES = ['얇은 입술', '도톰한 입술', '작은 입', '넓은 입', 'M자 입술'];
        const LIP_PROMPTS = { '얇은 입술': 'thin subtle lips', '도톰한 입술': 'full plump lips', '작은 입': 'small petite mouth', '넓은 입': 'wide broad mouth', 'M자 입술': 'defined M-shaped cupid bow lips' };
        const HAIR_STYLES = ['단발', '장발', '빡빡이(버즈컷)', '곱슬머리', '포니테일', '업스타일', '웨이브', '피쉬테일 브레이드', '콘로우', '픽시컷'];
        const HAIR_PROMPTS = { '단발': 'short bob haircut', '장발': 'long flowing hair past shoulders', '빡빡이(버즈컷)': 'shaved buzz cut', '곱슬머리': 'natural curly hair', '포니테일': 'sleek high ponytail', '업스타일': 'elegant updo', '웨이브': 'loose wavy beachy waves', '피쉬테일 브레이드': 'fishtail braid', '콘로우': 'tight cornrow braids', '픽시컷': 'sharp pixie cut' };
        const HAIR_COLORS = [
            { ko: '검정', en: 'jet black hair', c: '#1a1a1a' },
            { ko: '짙은 갈색', en: 'deep dark brown hair', c: '#3b1f0e' },
            { ko: '갈색', en: 'rich chestnut brown hair', c: '#7b4a2d' },
            { ko: '밝은 갈색', en: 'light caramel brown hair', c: '#b07840' },
            { ko: '금발', en: 'golden blonde hair', c: '#e8c96a' },
            { ko: '백금발', en: 'platinum blonde hair', c: '#f0ead6' },
            { ko: '빨강', en: 'vivid red hair', c: '#c0392b' },
            { ko: '와인/버건디', en: 'deep burgundy wine hair', c: '#6d1a2a' },
            { ko: '오렌지/구리', en: 'warm copper auburn hair', c: '#c0622a' },
            { ko: '회색/실버', en: 'silver grey hair', c: '#9e9e9e' },
            { ko: '흰색', en: 'pure white hair', c: '#f5f5f5' },
            { ko: '파스텔 핑크', en: 'soft pastel pink hair', c: '#f4a0b0' },
            { ko: '파스텔 블루', en: 'soft pastel blue hair', c: '#a0c4f4' },
            { ko: '그라데이션', en: 'ombre gradient hair color', c: '#b07840' }
        ];
        const EYE_COLORS = [{ ko: '검은 눈동자', en: 'deep black iris', c: '#1a1a1a' }, { ko: '갈색', en: 'warm brown iris', c: '#6b3a2a' }, { ko: '파란색', en: 'vivid blue iris', c: '#3a7bd5' }, { ko: '녹색', en: 'natural green iris', c: '#3a8c4a' }, { ko: '회색', en: 'cool grey iris', c: '#7a8a8c' }];
        const BUST_SIZES = [{ ko: 'A컵', en: 'small A-cup bust' }, { ko: 'B컵', en: 'moderate B-cup bust' }, { ko: 'C컵', en: 'full C-cup bust' }, { ko: 'D컵', en: 'large D-cup bust' }];
        const AGE_MAP = [[0, 2, '유아', 'infant'], [3, 9, '어린이', 'young child'], [10, 14, '청소년', 'early teenager'], [15, 19, '십대', 'teenager'], [20, 29, '청년', 'young adult'], [30, 39, '성인', 'adult'], [40, 54, '중년', 'middle-aged adult'], [55, 64, '장년', 'mature adult'], [65, 79, '노년', 'elderly person'], [80, 100, '고령', 'very elderly person']];

        /* ══════════════════════════════════════════
           DATA: 의상 프리셋 (v4.3)
        ══════════════════════════════════════════ */

        // 의상 대분류 (Tier1)
        const OUTFIT_TIER1 = [
            { ko: '나라별', key: 'country' },
            { ko: '직업별', key: 'job' },
            { ko: '스포츠별', key: 'sports' },
            { ko: '서브컬처별', key: 'subculture' },
            { ko: '상황/TPO별', key: 'tpo' },
            { ko: '계절별', key: 'season' },
            { ko: '판타지/장르별', key: 'fantasy' },
            { ko: '브랜드 스타일별', key: 'brandstyle' }
        ];

        // 나라별 Tier2
        const OUTFIT_TIER2 = {
            country: [{ ko: '한국' }, { ko: '일본' }, { ko: '중국' }, { ko: '동남아' }, { ko: '인도' }, { ko: '영국' }, { ko: '프랑스' }, { ko: '미국' }, { ko: '아랍' }],
            job: null, sports: null, subculture: null, tpo: null, season: null, fantasy: null, brandstyle: null
        };

        // 나라별 Tier3 (시대/스타일)
        const OUTFIT_COUNTRY_TIER3 = {
            '한국': [{ ko: '현대 캐주얼' }, { ko: '현대 비즈니스' }, { ko: '현대 한복' }, { ko: '조선 양반 한복' }, { ko: '조선 무관 갑옷' }, { ko: '조선 기생 한복' }, { ko: '조선 왕 곤룡포' }, { ko: '조선 왕비 적의' }, { ko: '삼국 무사 갑옷' }, { ko: '삼국 귀족 포' }],
            '일본': [{ ko: '현대 캐주얼' }, { ko: '현대 비즈니스' }, { ko: '현대 유카타' }, { ko: '에도 기모노' }, { ko: '에도 사무라이' }, { ko: '에도 게이샤' }, { ko: '에도 쇼군 의복' }, { ko: '전국 사무라이 갑옷' }, { ko: '전국 닌자' }, { ko: '전국 다이묘 의복' }, { ko: '메이지 화양절충' }],
            '중국': [{ ko: '현대 캐주얼' }, { ko: '현대 비즈니스' }, { ko: '현대 치파오' }, { ko: '청나라 관복' }, { ko: '청나라 치파오(전통)' }, { ko: '청나라 황제 용포' }, { ko: '청나라 황후 봉관하피' }, { ko: '당나라 귀족복' }, { ko: '당나라 황제 용포' }, { ko: '삼국지 장수 갑옷' }, { ko: '삼국지 도포' }, { ko: '삼국지 황제 곤복' }],
            '동남아': [{ ko: '현대 캐주얼' }, { ko: '태국 전통복' }, { ko: '태국 왕실복' }, { ko: '베트남 아오자이' }, { ko: '인도네시아 바틱' }],
            '인도': [{ ko: '현대 캐주얼' }, { ko: '현대 비즈니스' }, { ko: '사리' }, { ko: '살와르 카미즈' }, { ko: '무굴 궁정복' }],
            '영국': [{ ko: '현대 캐주얼' }, { ko: '현대 비즈니스' }, { ko: '빅토리아 왕실 드레스' }, { ko: '빅토리아 코르셋 드레스' }, { ko: '빅토리아 프록코트' }, { ko: '중세 기사 갑옷' }, { ko: '중세 왕 왕관복' }, { ko: '중세 왕비 궁정드레스' }],
            '프랑스': [{ ko: '현대 파리지앵' }, { ko: '현대 비즈니스' }, { ko: '르네상스 왕 궁정복' }, { ko: '르네상스 왕비 로브아라프랑세즈' }, { ko: '혁명시대 시민복' }],
            '미국': [{ ko: '현대 캐주얼' }, { ko: '현대 비즈니스' }, { ko: '1920년대 플래퍼' }, { ko: '1920년대 갱스터' }, { ko: '1950년대 핀업' }, { ko: '1950년대 그리스' }, { ko: '1980년대 레트로' }],
            '아랍': [{ ko: '현대 비즈니스' }, { ko: '전통 토브' }, { ko: '전통 아바야' }, { ko: '전통 칸두라' }, { ko: '술탄 왕복' }]
        };

        // 직업별 프리셋
        const OUTFIT_JOB = [
            { ko: '의사', en: 'doctor white coat, stethoscope, medical scrubs, professional clinical attire' },
            { ko: '간호사', en: 'nurse uniform, scrubs, medical cap, comfortable clinical shoes' },
            { ko: '경찰', en: 'police uniform, badge, utility belt, official law enforcement attire' },
            { ko: '소방관', en: 'firefighter turnout gear, helmet, reflective stripes, heavy protective suit' },
            { ko: '군인', en: 'military combat uniform, tactical vest, boots, dog tags' },
            { ko: '셰프', en: 'chef white double-breasted jacket, checkered pants, toque hat, apron' },
            { ko: '승무원', en: 'airline flight attendant uniform, scarf, professional elegant attire' },
            { ko: '파일럿', en: 'pilot uniform, captain hat, epaulettes, aviator sunglasses' },
            { ko: '경호원', en: 'bodyguard black suit, earpiece, tactical professional attire' },
            { ko: '교복(학생)', en: 'school uniform, blazer with school emblem, neat student attire' },
            { ko: '판사', en: 'judge black robe, formal judicial attire, gavel' },
            { ko: '성직자', en: 'clergy robe, cross pendant, formal religious attire' },
            { ko: '건설노동자', en: 'construction worker outfit, hard hat, reflective vest, work boots' },
            { ko: '우주비행사', en: 'astronaut spacesuit, NASA-style helmet, life support pack, zero-gravity suit' }
        ];

        // 스포츠별 프리셋
        const OUTFIT_SPORTS = [
            { ko: '축구', en: 'football jersey, shorts, shin guards, cleats, athletic soccer kit' },
            { ko: '농구', en: 'basketball jersey, shorts, high-top sneakers, athletic NBA-style kit' },
            { ko: '야구', en: 'baseball uniform, cap, mitt, cleats, classic athletic baseball kit' },
            { ko: '테니스', en: 'tennis polo shirt, shorts or skirt, tennis shoes, wristband' },
            { ko: '수영', en: 'competitive swimsuit, swim cap, goggles, athletic swimwear' },
            { ko: '격투기(MMA)', en: 'MMA shorts, rash guard, athletic tape on hands, fighting stance attire' },
            { ko: '승마', en: 'equestrian riding jacket, breeches, tall riding boots, helmet' },
            { ko: '스키', en: 'ski jacket, ski pants, goggles, gloves, ski boots, winter athletic gear' },
            { ko: '골프', en: 'golf polo shirt, chinos, golf shoes, visor cap, athletic golf attire' },
            { ko: '사이클링', en: 'cycling jersey, padded bib shorts, aerodynamic helmet, cycling shoes' },
            { ko: '체조', en: 'gymnastics leotard, athletic flexible attire, competition gymnastics wear' },
            { ko: '권투', en: 'boxing shorts, hand wraps, boxing gloves, athletic boxing attire' }
        ];

        // 서브컬처별 프리셋
        const OUTFIT_SUBCULTURE = [
            { ko: '고스', en: 'goth style, all black outfit, dark lace, silver accessories, combat boots, gothic aesthetic' },
            { ko: '로리타', en: 'lolita fashion, frilly dress, petticoat, lace trim, bow accessories, doll-like aesthetic' },
            { ko: '사이버펑크', en: 'cyberpunk outfit, neon accents, tech accessories, futuristic urban streetwear' },
            { ko: '스팀펑크', en: 'steampunk outfit, Victorian-era clothing with mechanical accessories, goggles, brass details' },
            { ko: '보헤미안', en: 'bohemian style, flowy fabrics, earth tones, layered jewelry, free-spirited hippie aesthetic' },
            { ko: '힙합', en: 'hip-hop streetwear, oversized hoodie, baggy pants, fresh sneakers, baseball cap' },
            { ko: '스트리트', en: 'street fashion, graphic tee, cargo pants, chunky sneakers, urban casual' },
            { ko: '펑크', en: 'punk style, leather jacket with studs, ripped jeans, band tee, heavy boots' },
            { ko: '비주얼케이', en: 'visual kei style, dramatic theatrical outfit, elaborate makeup, Japanese rock aesthetic' },
            { ko: '드래그', en: 'drag performance outfit, extravagant costume, dramatic makeup, theatrical glamour' }
        ];

        // 상황/TPO별 프리셋
        const OUTFIT_TPO = [
            { ko: '결혼식(신랑)', en: 'groom wedding suit, white dress shirt, bow tie, boutonniere, formal wedding attire' },
            { ko: '결혼식(신부)', en: 'bride wedding dress, veil, floral bouquet, elegant bridal gown' },
            { ko: '장례식', en: 'funeral attire, all black formal outfit, somber respectful clothing' },
            { ko: '파티', en: 'party outfit, cocktail dress or smart casual, festive attire' },
            { ko: '캠핑', en: 'camping outdoor outfit, flannel shirt, cargo pants, hiking boots, practical outdoor gear' },
            { ko: '해변', en: 'beach outfit, swimwear, cover-up, sandals, sunglasses, casual summer look' },
            { ko: '비즈니스 미팅', en: 'business meeting attire, tailored suit, dress shirt, professional formal look' },
            { ko: '데이트', en: 'date night outfit, smart casual, well-groomed stylish look' },
            { ko: '졸업식', en: 'graduation ceremony, academic gown, mortarboard cap, formal celebratory attire' },
            { ko: '운동', en: 'workout outfit, athletic wear, gym clothes, performance sportswear' }
        ];

        // 계절별 프리셋 (현대 일상복)
        const OUTFIT_SEASON = [
            { ko: '봄 나들이룩', en: 'spring casual outfit, light trench coat, pastel colors, comfortable spring fashion' },
            { ko: '여름 린넨룩', en: 'summer linen outfit, breathable light fabrics, relaxed summer casual' },
            { ko: '여름 휴가룩', en: 'summer vacation outfit, bright colors, resort wear, holiday casual fashion' },
            { ko: '가을 레이어드룩', en: 'autumn layered outfit, warm earth tones, cardigan over shirt, fall fashion' },
            { ko: '가을 니트룩', en: 'autumn knit outfit, cozy sweater, warm tones, relaxed fall casual' },
            { ko: '겨울 패딩룩', en: 'winter puffer jacket outfit, warm layering, cozy winter casual' },
            { ko: '겨울 코트룩', en: 'winter wool coat outfit, elegant layering, sophisticated cold weather fashion' }
        ];

        // 판타지/장르별 프리셋
        const OUTFIT_FANTASY = [
            { ko: '마법사', en: 'wizard robes, pointed hat, magical staff, arcane symbols, fantasy mage attire' },
            { ko: '엘프', en: 'elven outfit, flowing nature-inspired garments, leaf motifs, graceful fantasy elf attire' },
            { ko: '드래곤슬레이어', en: 'dragon slayer armor, battle-worn plate armor, large sword, heroic fantasy warrior' },
            { ko: '뱀파이어', en: 'vampire outfit, Victorian dark elegance, cape, crimson details, gothic aristocrat attire' },
            { ko: '좀비', en: 'zombie torn clothing, decayed outfit, blood stains, post-apocalyptic horror look' },
            { ko: '천사', en: 'angel white flowing robes, feathered wings, golden halo, ethereal divine attire' },
            { ko: '악마', en: 'demon dark outfit, horns, dark leather, infernal symbols, sinister fantasy attire' },
            { ko: '해적', en: 'pirate captain outfit, tricorn hat, long coat, cutlass, swashbuckler attire' },
            { ko: '바이킹', en: 'viking warrior outfit, fur-lined armor, horned helmet, axe, Norse warrior attire' },
            { ko: '사이보그', en: 'cyborg outfit, mechanical body parts, cybernetic implants, sci-fi android aesthetic' },
            { ko: '포스트아포칼립스', en: 'post-apocalyptic survivor outfit, scavenged armor, wasteland gear, Mad Max aesthetic' }
        ];

        // 브랜드 스타일별 프리셋
        const OUTFIT_BRANDSTYLE = [
            { ko: '미니멀 럭셔리', en: 'minimal luxury fashion, clean lines, high-quality neutral tones, understated elegance' },
            { ko: '스트리트 하이패션', en: 'high fashion streetwear, designer logomania, avant-garde urban style' },
            { ko: '아웃도어 테크웨어', en: 'outdoor techwear, functional technical fabrics, utility pockets, modern outdoor aesthetic' },
            { ko: '올드머니', en: 'old money aesthetic, classic preppy style, tailored polo, heritage brands look' },
            { ko: '놈코어', en: 'normcore style, deliberately plain ordinary clothing, simple basic casual aesthetic' },
            { ko: '아방가르드', en: 'avant-garde fashion, experimental silhouettes, unconventional shapes, artistic statement clothing' },
            { ko: '밀리터리룩', en: 'military-inspired fashion, cargo details, olive and khaki tones, utilitarian aesthetic' },
            { ko: '워크웨어', en: 'workwear fashion, denim, canvas, rugged utilitarian American work clothes aesthetic' }
        ];

        // 나라별 의상 프롬프트
        const OUTFIT_COUNTRY_PROMPTS = {
            '현대 캐주얼': 'modern casual everyday outfit, contemporary fashion',
            '현대 비즈니스': 'modern business professional attire, contemporary office fashion',
            '현대 한복': 'modern hanbok, contemporary Korean traditional dress fusion',
            '조선 양반 한복': 'Joseon dynasty nobleman hanbok, traditional Korean aristocrat clothing, gat hat',
            '조선 무관 갑옷': 'Joseon dynasty military officer armor, Korean traditional warrior armor',
            '조선 기생 한복': 'Joseon dynasty gisaeng hanbok, elaborate traditional Korean courtesan dress',
            '조선 왕 곤룡포': 'Joseon dynasty king royal robe, goryongpo red dragon robe, royal crown',
            '조선 왕비 적의': 'Joseon dynasty queen ceremonial robe, jeokui red phoenix robe, royal headdress',
            '삼국 무사 갑옷': 'Three Kingdoms era Korean warrior armor, ancient Korean military attire',
            '삼국 귀족 포': 'Three Kingdoms era Korean noble robe, ancient aristocratic Korean clothing',
            '현대 유카타': 'modern yukata, casual Japanese summer kimono',
            '에도 기모노': 'Edo period kimono, traditional Japanese formal dress, obi sash',
            '에도 사무라이': 'Edo period samurai outfit, hakama, kimono, daisho swords',
            '에도 게이샤': 'Edo period geisha elaborate kimono, white face makeup, ornate hair accessories',
            '에도 쇼군 의복': 'Edo period shogun formal attire, highest ranking samurai ceremonial dress',
            '전국 사무라이 갑옷': 'Sengoku period samurai battle armor, lamellar armor, kabuto helmet',
            '전국 닌자': 'Sengoku period ninja outfit, dark shinobi shozoku, masked stealth attire',
            '전국 다이묘 의복': 'Sengoku period daimyo lord formal attire, regional feudal lord ceremonial dress',
            '메이지 화양절충': 'Meiji era wakon-yosai fusion, blend of Western and traditional Japanese clothing',
            '현대 치파오': 'modern qipao, contemporary Chinese cheongsam dress',
            '청나라 관복': 'Qing dynasty mandarin official robe, rank badge buzi, formal court attire',
            '청나라 치파오(전통)': 'traditional Qing dynasty qipao, classic Chinese cheongsam',
            '청나라 황제 용포': 'Qing dynasty emperor dragon robe, imperial yellow longpao, royal dragon embroidery',
            '청나라 황후 봉관하피': 'Qing dynasty empress phoenix crown robe, imperial ceremonial attire',
            '당나라 귀족복': 'Tang dynasty noble clothing, elaborate silk robes, flowing sleeves',
            '당나라 황제 용포': 'Tang dynasty emperor imperial robe, golden dragon embroidery, royal court attire',
            '삼국지 장수 갑옷': 'Three Kingdoms Chinese general armor, elaborate battle armor, war commander attire',
            '삼국지 도포': 'Three Kingdoms era Chinese scholar robe, flowing hanfu, strategist attire',
            '삼국지 황제 곤복': 'Three Kingdoms Chinese emperor ceremonial robe, imperial crown and robes',
            '태국 전통복': 'traditional Thai clothing, silk sabai, chong kraben wrap, golden accessories',
            '태국 왕실복': 'Thai royal ceremonial attire, elaborate golden royal Thai dress',
            '베트남 아오자이': 'Vietnamese ao dai, traditional long dress with trousers, elegant flowing attire',
            '인도네시아 바틱': 'Indonesian batik clothing, traditional wax-resist fabric patterns',
            '사리': 'Indian sari, draped silk fabric, ornate border, bindi, traditional Indian attire',
            '살와르 카미즈': 'Indian salwar kameez, tunic with loose trousers, dupatta scarf',
            '무굴 궁정복': 'Mughal court attire, ornate jama robe, turban with jewel, royal Indian imperial dress',
            '빅토리아 왕실 드레스': 'Victorian royal court dress, elaborate gown, royal sash, crown',
            '빅토리아 코르셋 드레스': 'Victorian corset dress, bustle skirt, high collar, period-accurate fashion',
            '빅토리아 프록코트': 'Victorian frock coat, top hat, waistcoat, gentleman period attire',
            '중세 기사 갑옷': 'medieval knight plate armor, surcoat, great helm, sword and shield',
            '중세 왕 왕관복': 'medieval king royal robes, ermine-trimmed mantle, crown, scepter',
            '중세 왕비 궁정드레스': 'medieval queen court gown, jeweled crown, royal mantle, regal attire',
            '현대 파리지앵': 'modern Parisian style, chic French casual fashion, effortless elegance',
            '르네상스 왕 궁정복': 'French Renaissance king court attire, doublet, puffed sleeves, royal crown',
            '르네상스 왕비 로브아라프랑세즈': 'French Renaissance queen robe à la française, panniers, elaborate silk gown',
            '혁명시대 시민복': 'French Revolution era citizen clothing, tricolor cockade, plain republican attire',
            '1920년대 플래퍼': '1920s flapper dress, drop waist, feather headband, pearl necklace, Art Deco fashion',
            '1920년대 갱스터': '1920s gangster pinstripe suit, fedora hat, suspenders, vintage American mobster look',
            '1950년대 핀업': '1950s pin-up style, polka dot dress, red lips, victory rolls hair, retro American fashion',
            '1950년대 그리스': '1950s greaser style, leather jacket, white t-shirt, jeans, slicked hair',
            '1980년대 레트로': '1980s retro fashion, neon colors, shoulder pads, leg warmers, bold patterns',
            '전통 토브': 'traditional Arab thobe, white full-length robe, guthra headdress',
            '전통 아바야': 'traditional Arab abaya, full black robe, hijab, modest Islamic attire',
            '전통 칸두라': 'traditional Emirati kandura, white ankle-length robe, agal headdress',
            '술탄 왕복': 'Arab sultan royal attire, ornate golden robe, jeweled turban, royal Arabian regalia'
        };

        // 신발 칩
        const OUTFIT_SHOES = [
            '운동화', '구두(남)', '힐', '플랫', '부츠', '첼시부츠', '군화', '샌들', '슬리퍼', '전통신발', '맨발'
        ];
        const OUTFIT_SHOE_PROMPTS = {
            '운동화': 'casual sneakers', '구두(남)': 'oxford leather shoes', '힐': 'high heels', '플랫': 'flat shoes',
            '부츠': 'knee-high boots', '첼시부츠': 'chelsea boots', '군화': 'military combat boots',
            '샌들': 'open sandals', '슬리퍼': 'slip-on slides', '전통신발': 'traditional footwear', '맨발': 'barefoot'
        };

        // 악세서리 카테고리별 칩
        const OUTFIT_ACC_CATS = [
            { cat: '모자', items: ['야구모자', '베레모', '중절모', '비니', '왕관', '투구'] },
            { cat: '안경', items: ['뿔테안경', '동그란안경', '선글라스'] },
            { cat: '목걸이', items: ['체인 목걸이', '펜던트 목걸이', '진주 목걸이'] },
            { cat: '귀걸이', items: ['스터드 귀걸이', '후프 귀걸이', '드롭 귀걸이'] },
            { cat: '시계', items: ['디지털 시계', '아날로그 시계', '스마트워치'] },
            { cat: '가방', items: ['백팩', '토트백', '클러치', '크로스백'] },
            { cat: '기타', items: ['마스크', '스카프', '장갑', '벨트', '지팡이'] }
        ];
        const OUTFIT_ACC_PROMPTS = {
            '야구모자': 'baseball cap', '베레모': 'beret hat', '중절모': 'fedora hat', '비니': 'beanie hat',
            '왕관': 'royal crown', '투구': 'battle helmet', '뿔테안경': 'thick-framed glasses',
            '동그란안경': 'round glasses', '선글라스': 'sunglasses', '체인 목걸이': 'chain necklace',
            '펜던트 목걸이': 'pendant necklace', '진주 목걸이': 'pearl necklace', '스터드 귀걸이': 'stud earrings',
            '후프 귀걸이': 'hoop earrings', '드롭 귀걸이': 'drop earrings', '디지털 시계': 'digital watch',
            '아날로그 시계': 'analog watch', '스마트워치': 'smartwatch', '백팩': 'backpack',
            '토트백': 'tote bag', '클러치': 'clutch bag', '크로스백': 'crossbody bag',
            '마스크': 'face mask', '스카프': 'scarf', '장갑': 'gloves', '벨트': 'leather belt', '지팡이': 'cane'
        };

        /* ══════════════════════════════════════════
           DATA: IMAGE LOCATION (v4.5)
        ══════════════════════════════════════════ */

        const LOCATION_TIER1 = [
            { ko: '시대별', key: 'era' },
            { ko: '도시별', key: 'city' },
            { ko: '장소별', key: 'place' },
            { ko: '우주·판타지', key: 'fantasy' }
        ];

        const LOCATION_TIER2 = {
            era: [{ ko: '고대' }, { ko: '중세' }, { ko: '근대' }, { ko: '현대' }, { ko: '근미래' }, { ko: '먼미래' }],
            city: [{ ko: '서울' }, { ko: '부산' }, { ko: '도쿄' }, { ko: '뉴욕' }, { ko: '런던' }, { ko: '파리' }, { ko: '방콕' }, { ko: '두바이' }, { ko: '상하이' }, { ko: '로마' }, { ko: '바르셀로나' }],
            place: [{ ko: '실내' }, { ko: '실외' }, { ko: '자연' }, { ko: '도심' }, { ko: '해변' }, { ko: '산악' }, { ko: '심해' }],
            fantasy: [{ ko: '우주' }, { ko: '판타지' }]
        };

        const LOCATION_TIER3 = {
            '고대': [
                { ko: '고대 이집트', en: 'ancient Egypt, pyramid backdrop, desert sands, golden sunlight' },
                { ko: '고대 로마', en: 'ancient Rome, colosseum, marble columns, classical architecture' },
                { ko: '고대 그리스', en: 'ancient Greece, Acropolis hilltop, white marble temples, Aegean sea view' },
                { ko: '고대 중국', en: 'ancient China, imperial palace courtyard, red lacquered pillars, silk banners' },
                { ko: '고대 메소포타미아', en: 'ancient Mesopotamia, ziggurat ruins, fertile crescent, clay brick walls' }
            ],
            '중세': [
                { ko: '중세 유럽 성', en: 'medieval European castle, stone fortress walls, drawbridge, torchlit corridors' },
                { ko: '중세 마을', en: 'medieval village, cobblestone streets, thatched roof cottages, market square' },
                { ko: '중세 전쟁터', en: 'medieval battlefield, muddy terrain, siege warfare, fog of war atmosphere' },
                { ko: '중세 항구', en: 'medieval harbor, wooden sailing ships, dock workers, salt air and rope smell' },
                { ko: '중세 수도원', en: 'medieval monastery, gothic stone arches, candlelit chapel, quiet cloister garden' }
            ],
            '근대': [
                { ko: '19세기 런던', en: 'Victorian London, foggy gas-lit streets, brick buildings, horse carriages' },
                { ko: '1920년대 뉴욕', en: '1920s New York, Art Deco architecture, jazz age glamour, speakeasy atmosphere' },
                { ko: '1950년대 미국', en: '1950s America, diner on Route 66, neon signs, classic muscle cars' },
                { ko: '식민지 시대', en: 'colonial era setting, tropical plantation, period architecture, historical atmosphere' }
            ],
            '현대': [
                { ko: '현대 도심', en: 'modern urban cityscape, glass skyscrapers, busy streets, contemporary city life' },
                { ko: '현대 주택가', en: 'modern residential neighborhood, quiet suburban street, everyday life setting' },
                { ko: '현대 오피스', en: 'modern office space, open plan workspace, floor-to-ceiling windows, city view' },
                { ko: '현대 쇼핑몰', en: 'modern shopping mall, luxury retail interior, polished floors, designer stores' }
            ],
            '근미래': [
                { ko: '사이버펑크 도시', en: 'cyberpunk megacity, neon-drenched rain-soaked streets, holographic ads, dystopian urban sprawl' },
                { ko: '근미래 연구소', en: 'near-future research facility, clean white corridors, advanced technology, scientific equipment' },
                { ko: '근미래 교통허브', en: 'near-future transit hub, magnetic levitation trains, hyperloop station, sleek architecture' },
                { ko: '근미래 주거지', en: 'near-future residential complex, smart home technology, vertical gardens, sustainable design' }
            ],
            '먼미래': [
                { ko: '포스트아포칼립스', en: 'post-apocalyptic wasteland, crumbling ruins, overgrown vegetation reclaiming cities, harsh survival environment' },
                { ko: '고도문명 도시', en: 'far future advanced civilization city, floating structures, energy fields, utopian mega-architecture' },
                { ko: '버려진 미래도시', en: 'abandoned future city, derelict space-age buildings, eerie silence, nature reclaiming technology' }
            ],
            '서울': [
                { ko: '강남', en: 'Gangnam Seoul, luxury district, COEX area, modern glass towers, affluent urban energy' },
                { ko: '홍대', en: 'Hongdae Seoul, indie culture district, street art murals, young creative energy, night life' },
                { ko: '종로/한옥마을', en: 'Jongno Bukchon hanok village, traditional Korean architecture, narrow alleys, historical Seoul' },
                { ko: '한강변', en: 'Han River Seoul, riverside park, bridge lights reflection, peaceful urban waterfront' },
                { ko: '을지로', en: 'Euljiro Seoul, old-meets-new industrial district, vintage workshops, hipster café culture' }
            ],
            '부산': [
                { ko: '해운대', en: 'Haeundae Busan, famous beach resort, luxury hotels skyline, summer crowd energy' },
                { ko: '광안리', en: 'Gwangalli Busan, beach with Diamond Bridge backdrop, vibrant night atmosphere' },
                { ko: '감천문화마을', en: 'Gamcheon Culture Village Busan, colorful terraced houses, labyrinthine alleys, artistic community' },
                { ko: '자갈치시장', en: 'Jagalchi fish market Busan, bustling seafood market, harbor side, raw energy' }
            ],
            '도쿄': [
                { ko: '시부야', en: 'Shibuya Tokyo, iconic scramble crossing, neon signs, electric urban energy' },
                { ko: '신주쿠', en: 'Shinjuku Tokyo, entertainment district, yakitori alley, towering buildings, red light district atmosphere' },
                { ko: '아키하바라', en: 'Akihabara Tokyo, electric town, anime and tech culture, bright signage, otaku energy' },
                { ko: '아사쿠사', en: 'Asakusa Tokyo, Senso-ji temple, traditional lanterns, rickshaws, old Tokyo atmosphere' },
                { ko: '롯폰기', en: 'Roppongi Tokyo, upscale nightlife district, art galleries, international luxury atmosphere' }
            ],
            '뉴욕': [
                { ko: '맨해튼', en: 'Manhattan New York, iconic skyline, yellow taxis, steam vents, urban jungle energy' },
                { ko: '브루클린', en: 'Brooklyn New York, brownstone buildings, bridge view, hipster culture, borough pride' },
                { ko: '타임스퀘어', en: 'Times Square New York, blinding neon billboard lights, tourist energy, Broadway theater district' },
                { ko: '센트럴파크', en: 'Central Park New York, green urban oasis, seasonal trees, joggers and families, skyline backdrop' }
            ],
            '런던': [
                { ko: '웨스트민스터', en: 'Westminster London, Big Ben, Parliament buildings, Thames riverbank, political heart of Britain' },
                { ko: '소호', en: 'Soho London, eclectic nightlife, creative arts district, narrow streets, bohemian energy' },
                { ko: '이스트엔드', en: 'East End London, street art and markets, multicultural energy, gentrifying urban landscape' }
            ],
            '파리': [
                { ko: '몽마르트', en: 'Montmartre Paris, artist quarter, Sacré-Cœur hilltop view, cobblestone streets, romantic Bohemian atmosphere' },
                { ko: '마레', en: 'Le Marais Paris, historic Jewish quarter, trendy boutiques, medieval architecture meets contemporary art' },
                { ko: '샹젤리제', en: 'Champs-Élysées Paris, grand boulevard, luxury stores, Arc de Triomphe backdrop, Parisian grandeur' },
                { ko: '센강변', en: 'Seine riverbank Paris, bookstalls, Notre-Dame view, evening promenade, quintessential Paris' }
            ],
            '방콕': [
                { ko: '카오산로드', en: 'Khao San Road Bangkok, backpacker hub, street food chaos, neon lights, vibrant night energy' },
                { ko: '차이나타운', en: 'Chinatown Bangkok Yaowarat, gold shops, street food vendors, lantern-lit narrow alleys' },
                { ko: '수상시장', en: 'floating market Bangkok, wooden boats, canal vendors, tropical fruits, traditional Thai waterway life' },
                { ko: '왕궁지구', en: 'Grand Palace Bangkok, ornate Thai architecture, gilded temples, Chao Phraya riverside' }
            ],
            '두바이': [
                { ko: '다운타운', en: 'Downtown Dubai, Burj Khalifa backdrop, Dubai Fountain, ultra-modern luxury architecture' },
                { ko: '사막', en: 'Dubai desert, golden sand dunes, vast empty horizon, dramatic desert light' },
                { ko: '주메이라 해변', en: 'Jumeirah Beach Dubai, white sand, Burj Al Arab view, resort luxury atmosphere' }
            ],
            '상하이': [
                { ko: '와이탄', en: 'Bund Shanghai, colonial era waterfront, Pudong skyline across river, historical meets futuristic' },
                { ko: '푸동', en: 'Pudong Shanghai, Oriental Pearl Tower, modern financial district, futuristic skyscrapers' },
                { ko: '예원', en: 'Yu Garden Shanghai, classical Chinese garden, Ming dynasty architecture, traditional tea house' }
            ],
            '로마': [
                { ko: '콜로세움', en: 'Rome Colosseum, ancient amphitheater, gladiatorial arena, eternal city grandeur' },
                { ko: '트레비 분수', en: 'Trevi Fountain Rome, baroque masterpiece, coin-throwing tourists, romantic night lighting' },
                { ko: '바티칸', en: 'Vatican City Rome, St. Peter\'s Basilica, Sistine Chapel, sacred religious atmosphere' }
            ],
            '바르셀로나': [
                { ko: '고딕 지구', en: 'Gothic Quarter Barcelona, medieval labyrinthine streets, Roman ruins, shadowy narrow lanes' },
                { ko: '사그라다 파밀리아', en: 'Sagrada Familia Barcelona, Gaudí masterpiece, intricate stone facade, spiritual architectural wonder' },
                { ko: '람블라스 거리', en: 'La Rambla Barcelona, famous promenade, street performers, open-air cafés, vibrant city life' }
            ],
            '실내': [
                { ko: '고급 레스토랑', en: 'upscale fine dining restaurant interior, candlelit tables, elegant décor, intimate atmosphere' },
                { ko: '바&클럽', en: 'bar and nightclub interior, moody lighting, DJ booth, cocktail culture, late night energy' },
                { ko: '병원', en: 'hospital interior, sterile white corridors, fluorescent lighting, clinical atmosphere' },
                { ko: '학교 교실', en: 'school classroom, rows of desks, chalkboard, afternoon sunlight through windows' },
                { ko: '도서관', en: 'library interior, towering bookshelves, reading tables, quiet scholarly atmosphere' },
                { ko: '교회/성당', en: 'church cathedral interior, stained glass windows, pew rows, divine light rays' },
                { ko: '지하철역', en: 'subway station, tiled walls, platform crowds, fluorescent overhead lighting, urban transit' },
                { ko: '공항', en: 'international airport terminal, departure gates, moving walkways, anonymous transit space' },
                { ko: '호텔 로비', en: 'luxury hotel lobby, marble floors, grand chandelier, reception desk, refined hospitality' },
                { ko: '창고/공장', en: 'industrial warehouse or factory, exposed brick, metal beams, raw urban interior' },
                { ko: '감옥', en: 'prison cell block, iron bars, harsh lighting, institutional concrete walls, oppressive atmosphere' }
            ],
            '실외': [
                { ko: '공원', en: 'urban park, tree-lined paths, benches, open green space, city backdrop' },
                { ko: '골목길', en: 'narrow alley, damp cobblestones, graffiti walls, moody urban shadows' },
                { ko: '공사장', en: 'construction site, scaffolding, raw building materials, hard-hat workers environment' },
                { ko: '다리 위', en: 'bridge over river or canyon, dramatic height, wind swept, structural steel or stone' },
                { ko: '옥상', en: 'rooftop terrace, city skyline panorama, elevated urban vantage point, sunset or night view' }
            ],
            '자연': [
                { ko: '울창한 숲', en: 'dense ancient forest, towering trees, dappled light through canopy, misty woodland atmosphere' },
                { ko: '사막', en: 'vast desert landscape, golden sand dunes, scorching heat haze, endless horizon' },
                { ko: '설원', en: 'snow-covered wilderness, pristine white expanse, frozen silence, winter desolation' },
                { ko: '초원', en: 'open grassland meadow, rolling hills, wildflowers, expansive sky, peaceful pastoral scene' },
                { ko: '협곡', en: 'dramatic canyon, layered rock formations, river below, ancient geological wonder' },
                { ko: '화산', en: 'active or dormant volcano, lava fields, volcanic rock, apocalyptic dramatic landscape' },
                { ko: '폭포', en: 'dramatic waterfall, mist rising, lush surrounding vegetation, powerful rushing water' },
                { ko: '동굴', en: 'cave interior, stalactites and stalagmites, underground lake, dramatic natural formations' }
            ],
            '도심': [
                { ko: '번화가', en: 'busy commercial district, neon signs, shop fronts, pedestrian crowds, urban vitality' },
                { ko: '슬럼가', en: 'rundown urban slum, poverty-stricken alley, weathered buildings, raw social realism' },
                { ko: '시장', en: 'outdoor street market, vendor stalls, colorful goods, lively commercial chaos' },
                { ko: '항구', en: 'working harbor, shipping containers, cargo cranes, sea smell, industrial waterfront' },
                { ko: '기차역', en: 'historic train station, grand iron and glass roof, steam or modern trains, transient atmosphere' }
            ],
            '해변': [
                { ko: '열대 해변', en: 'tropical white sand beach, turquoise clear water, palm trees, paradise vacation atmosphere' },
                { ko: '절벽 해안', en: 'dramatic sea cliff coastline, crashing waves below, windswept grass, rugged beauty' },
                { ko: '겨울 해변', en: 'winter beach, grey choppy sea, deserted shoreline, cold wind, melancholic atmosphere' },
                { ko: '암초 해안', en: 'rocky tidal reef coastline, tide pools, sea spray, raw natural coastal energy' }
            ],
            '산악': [
                { ko: '히말라야', en: 'Himalayan mountain range, snow-capped peaks, thin air, base camp atmosphere, epic scale' },
                { ko: '알프스', en: 'European Alps, green summer meadows or snow slopes, cable cars, dramatic mountain scenery' },
                { ko: '화산산', en: 'volcanic mountain peak, sulfur vents, barren lava slopes, otherworldly terrain' },
                { ko: '고원지대', en: 'high altitude plateau, vast open moorland, sparse vegetation, dramatic sky' }
            ],
            '심해': [
                { ko: '얕은 산호초', en: 'shallow coral reef, vibrant tropical fish, crystal clear warm water, colorful marine ecosystem' },
                { ko: '심해 무인지대', en: 'deep ocean abyss, crushing darkness, bioluminescent creatures, extreme pressure environment' },
                { ko: '난파선', en: 'sunken shipwreck, barnacle-covered hull, schools of fish, ghostly underwater exploration' },
                { ko: '발광생물 군락', en: 'deep sea bioluminescent creatures, glowing organisms, ethereal blue light, alien underwater world' },
                { ko: '해저동굴', en: 'underwater cave system, stalactite formations, crystal clear water passages, dramatic light rays' },
                { ko: '심해 열수공', en: 'hydrothermal vent, superheated mineral-rich water, chemosynthetic life, volcanic ocean floor' },
                { ko: '수중도시(SF)', en: 'underwater science fiction city, pressurized domes, submarine architecture, futuristic deep sea civilization' }
            ],
            '우주': [
                { ko: '우주정거장', en: 'space station interior, zero gravity environment, porthole Earth view, NASA-style equipment' },
                { ko: '외계행성(황량)', en: 'barren alien planet, rust-red or purple sky, strange rock formations, desolate extraterrestrial landscape' },
                { ko: '외계행성(생명체)', en: 'lush alien planet, bioluminescent jungle, exotic flora and fauna, vibrant otherworldly ecosystem' },
                { ko: '성운 속', en: 'inside a nebula, swirling cosmic gas clouds, star birth regions, breathtaking space panorama' },
                { ko: '블랙홀 근처', en: 'near a black hole, gravitational lensing light effects, accretion disk glow, space-time distortion' },
                { ko: '달 표면', en: 'lunar surface, grey barren moonscape, Earth rising on horizon, astronaut footprints, low gravity' },
                { ko: '화성', en: 'Mars surface, red iron oxide terrain, dust storms, Olympus Mons backdrop, human colony elements' }
            ],
            '판타지': [
                { ko: '마법 숲', en: 'enchanted magical forest, glowing mystical flora, fairy lights, ancient spell-bound trees' },
                { ko: '용의 둥지', en: 'dragon lair, cave full of treasure, scorched rock, bones of previous adventurers' },
                { ko: '천공 도시', en: 'floating sky city, islands in the clouds, magical architecture, aerial bridges, epic fantasy' },
                { ko: '지하 던전', en: 'underground dungeon, damp stone corridors, flickering torches, hidden traps, RPG atmosphere' },
                { ko: '요정 왕국', en: 'fairy kingdom, miniature magical world, mushroom houses, gentle golden light, whimsical nature' },
                { ko: '어둠의 성', en: 'dark gothic castle, vampire or dark lord fortress, gargoyles, lightning storm backdrop' },
                { ko: '신전', en: 'ancient mystical temple, crumbling ruins, glowing runes, sacred altar, divine or cursed atmosphere' }
            ]
        };

        const LOCATION_PROMPTS = Object.fromEntries(
            Object.values(LOCATION_TIER3).flat().map(item => [item.ko, item.en])
        );

        /* ══════════════════════════════════════════
           DATA: IMAGE ATMOSPHERE (v4.5)
        ══════════════════════════════════════════ */

        const ATMOSPHERE_ITEMS = [
            { ko: '맑음', en: 'clear blue sky, crisp clean air, bright natural daylight' },
            { ko: '구름 낀 하늘', en: 'overcast cloudy sky, soft diffused light, muted tones' },
            { ko: '흐린 날', en: 'grey overcast day, flat even lighting, subdued atmosphere' },
            { ko: '이슬비', en: 'light drizzle, fine rain mist, wet surfaces reflecting light' },
            { ko: '비', en: 'steady rainfall, rain-slicked streets, umbrella weather, wet urban atmosphere' },
            { ko: '폭우', en: 'heavy torrential downpour, driving rain, flooded streets, dramatic storm atmosphere' },
            { ko: '천둥번개', en: 'thunderstorm, lightning flashes illuminating scene, thunder rumbling, electric storm energy' },
            { ko: '눈', en: 'snowfall, gentle snowflakes drifting, fresh white snow accumulating, winter serenity' },
            { ko: '눈보라', en: 'blizzard conditions, whiteout snowstorm, howling wind, near-zero visibility' },
            { ko: '안개', en: 'light fog, soft hazy atmosphere, reduced visibility, ethereal misty quality' },
            { ko: '짙은 안개', en: 'dense thick fog, near-zero visibility, ghostly silhouettes, mysterious heavy mist' },
            { ko: '황사/미세먼지', en: 'yellow dust haze, fine particulate pollution, reduced visibility, brownish-yellow tinted air' },
            { ko: '스모그', en: 'industrial smog, toxic grey-brown haze, urban pollution atmosphere, dystopian air quality' },
            { ko: '열기 아지랑이', en: 'heat haze shimmer, scorching air distortion, desert or summer intense heat waves' },
            { ko: '빛 갈라짐', en: 'god rays, light shafts breaking through clouds or trees, dramatic volumetric lighting' },
            { ko: '무지개', en: 'rainbow arcing through sky, post-rain color spectrum, hopeful atmospheric phenomenon' },
            { ko: '석양빛', en: 'golden sunset light, warm orange-pink sky, long dramatic shadows, day\'s end atmosphere' },
            { ko: '황금빛 시간대', en: 'golden hour light, warm soft directional sunlight, magic hour photography, glowing ambience' },
            { ko: '블루아워', en: 'blue hour twilight, soft cool blue light after sunset, city lights beginning to glow' },
            { ko: '야간', en: 'nighttime darkness, artificial lighting, stars or city glow, nocturnal atmosphere' },
            { ko: '별이 빛나는 밤', en: 'clear starry night sky, Milky Way visible, deep space atmosphere, rural darkness' },
            { ko: '오로라', en: 'northern lights aurora borealis, shimmering green and purple light curtains, polar night sky' },
            { ko: '시네마틱 스모크', en: 'atmospheric cinematic smoke, volumetric haze, moody film-noir quality fog machine effect' },
            { ko: '드림 글로우', en: 'dreamy soft glow, ethereal light bloom, fantasy-like luminous atmosphere, surreal quality' },
            { ko: '수증기', en: 'steam and water vapor, rising mist from hot springs or urban vents, humid atmosphere' },
            { ko: '모래폭풍', en: 'sandstorm, swirling desert sand walls, reduced visibility, apocalyptic dust storm' }
        ];

        // 상반 날씨 충돌 맵
        const ATMOSPHERE_CONFLICTS = {
            '맑음': ['비', '폭우', '천둥번개', '눈', '눈보라', '안개', '짙은 안개', '황사/미세먼지', '스모그', '모래폭풍'],
            '폭우': ['맑음', '황금빛 시간대', '블루아워', '별이 빛나는 밤', '드림 글로우', '열기 아지랑이', '눈', '눈보라', '모래폭풍'],
            '눈보라': ['맑음', '열기 아지랑이', '황금빛 시간대', '비', '폭우', '모래폭풍'],
            '눈': ['비', '폭우', '열기 아지랑이', '모래폭풍'],
            '모래폭풍': ['맑음', '비', '폭우', '눈', '눈보라', '별이 빛나는 밤', '오로라'],
            '오로라': ['맑음', '폭우', '모래폭풍', '황사/미세먼지', '스모그'],
            '드림 글로우': ['스모그', '황사/미세먼지', '모래폭풍'],
            '별이 빛나는 밤': ['폭우', '모래폭풍', '황사/미세먼지', '스모그'],
            '열기 아지랑이': ['눈', '눈보라', '폭우']
        };

        /* ══════════════════════════════════════════
           DATA: COLOR TONE (v4.51)
        ══════════════════════════════════════════ */
        const COLOR_TONES = [
            { ko: '웜톤', en: 'warm color grading, golden amber tones, cozy warm palette' },
            { ko: '쿨톤', en: 'cool color grading, blue-teal tones, cold crisp palette' },
            { ko: '모노크롬', en: 'monochrome black and white, desaturated grayscale, timeless B&W photography' },
            { ko: '세피아', en: 'sepia tone, warm brown vintage color grading, aged film look' },
            { ko: '비비드', en: 'vivid saturated colors, high contrast punchy color palette, bold vibrant tones' },
            { ko: '파스텔', en: 'soft pastel color palette, muted gentle hues, dreamy light tones' },
            { ko: '네온', en: 'neon color palette, electric vivid hues, cyberpunk neon color grading' },
            { ko: '틸-오렌지', en: 'cinematic teal and orange color grading, Hollywood blockbuster color palette' },
            { ko: '필름톤', en: 'vintage film grain color grading, faded analog look, cinematic film emulation' },
            { ko: '청록', en: 'cyan-teal dominant color grading, cool aqua tones, underwater-inspired palette' },
            { ko: '탈색(페이드)', en: 'faded washed-out look, low contrast desaturated, bleached color grading' }
        ];


const SHOT_TYPES = [
            { code: 'ECU', label: 'ECU', tip: '익스트림 클로즈업 — 눈, 입술, 손가락 등 아주 작은 디테일 포착. 감정 극대화.' },
            { code: 'CU', label: 'CU', tip: '클로즈업 — 얼굴 전체나 손 전체. 표정과 감정을 직접 전달.' },
            { code: 'MCU', label: 'MCU', tip: '미디엄 클로즈업 — 가슴 위~머리. 대화나 반응 장면에 많이 씀.' },
            { code: 'MS', label: 'MS', tip: '미디엄샷 — 허리 위. 인물과 환경을 동시에 보여줄 때.' },
            { code: 'MLS', label: 'MLS', tip: '미디엄 롱샷 — 무릎 위. 인물의 움직임과 공간감을 함께.' },
            { code: 'FS', label: 'FS', tip: '풀샷 — 머리부터 발끝. 인물 전체 동작을 보여줄 때.' },
            { code: 'WS', label: 'WS', tip: '와이드샷 — 인물보다 배경이 크게. 장소와 규모를 설정.' },
            { code: 'EWS', label: 'EWS', tip: '익스트림 와이드샷 — 드넓은 풍경 속 작은 인물. 고독감, 웅장함.' },
            { code: 'Insert', label: 'Insert', tip: '인서트 — 소품, 손, 디테일 클로즈업. 중요한 물체를 강조.' },
            { code: "Bird's-eye", label: "Top", tip: '버즈아이 — 정수리 바로 위에서 내려다봄. 압도감, 고립감.' },
            { code: 'OTS', label: 'OTS', tip: '오버더숄더 — 한 인물 어깨 너머로 상대방 촬영. 대화 장면 필수.' },
            { code: 'POV', label: 'POV', tip: 'POV — 인물의 시점에서 찍은 것처럼. 강한 몰입감.' },
        ];

        const LENS_OPTIONS = [
            { mm: '14mm', tip: '초광각 — 넓은 공간, 왜곡된 원근감. 건축, 액션, 환경 설정.' },
            { mm: '24mm', tip: '광각 — 약간의 왜곡으로 공간감. 다큐, 거리, 실내 전경.' },
            { mm: '35mm', tip: '표준광각 — 인간의 눈과 가장 비슷한 시각. 일상적이고 자연스러운 느낌.' },
            { mm: '50mm', tip: '표준 — 가장 무난하고 자연스러운 렌즈. 모든 장면에 두루 쓰임.' },
            { mm: '85mm', tip: '인물 렌즈 — 배경이 부드럽게 흐려지며 인물이 돋보임. 포트레이트, 감정씬.' },
            { mm: '135mm', tip: '망원 — 피사체를 압축해서 보여줌. 긴장감, 미행, 스포츠.' },
        ];

        const MOVEMENT_OPTIONS = [
            { val: 'static', label: 'Static', tip: '완전히 고정된 카메라. 안정감, 긴장감 유지.' },
            { val: 'push-in', label: 'Push-in', tip: '카메라가 피사체 쪽으로 천천히 다가감. 집중, 긴장 고조.' },
            { val: 'pull-out', label: 'Pull-out', tip: '카메라가 뒤로 물러남. 고독감, 결말, 여운.' },
            { val: 'dolly left', label: 'Dolly L', tip: '카메라가 좌측으로 수평 이동. 공간 탐색, 트래킹.' },
            { val: 'dolly right', label: 'Dolly R', tip: '카메라가 우측으로 수평 이동. 공간 탐색, 트래킹.' },
            { val: 'pan left', label: 'Pan L', tip: '카메라 위치는 고정, 화면만 왼쪽으로. 가로 공간 스캔.' },
            { val: 'pan right', label: 'Pan R', tip: '카메라 위치는 고정, 화면만 오른쪽으로. 가로 공간 스캔.' },
            { val: 'tilt up', label: 'Tilt Up', tip: '카메라 위치 고정, 화면이 위를 향함. 웅장함, 희망.' },
            { val: 'tilt down', label: 'Tilt Down', tip: '카메라 위치 고정, 화면이 아래를 향함. 낙담, 발견.' },
            { val: 'handheld jolt', label: 'Handheld', tip: '손으로 든 듯한 흔들림. 다큐, 긴박감, 현실감.' },
            { val: 'orbit', label: 'Orbit', tip: '인물 주위를 360도 회전. 극적인 순간 강조, 긴장감.' },
            { val: 'crane up', label: 'Crane Up', tip: '카메라가 위로 상승. 상황 전체를 보여주며 해방감.' },
            { val: 'crane down', label: 'Crane Down', tip: '카메라가 위에서 아래로 내려옴. 발견, 압박감.' },
            { val: 'FPV drone', label: 'FPV', tip: '드론처럼 빠르게 날아다니는 시점. 역동적, 스릴감.' },
            { val: 'rack focus', label: 'Rack Focus', tip: '앞→뒤 또는 뒤→앞으로 초점이 이동. 관심 전환 표현.' },
            { val: 'snap zoom', label: 'Snap Zoom', tip: '빠르게 줌인. 충격적 발견, 코믹한 강조에 사용.' },
            { val: 'dolly zoom', label: 'Dolly Zoom', tip: '배경은 커지고 인물은 유지 (버티고 효과). 심리적 불안감.' },
            { val: 'whip pan', label: 'Whip Pan', tip: '카메라를 빠르게 옆으로 흽. 다음 씬으로 역동적 전환.' },
            { val: 'overhead slide', label: 'Overhead', tip: '위에서 내려다보며 수평 이동. 요리, 작업대 등 상단 뷰.' },
        ];

        const TRANSITION_OPTIONS = [
            { val: 'hard cut to', label: 'Hard Cut', tip: '가장 명확하게 다음 샷으로 넘어가는 기본 컷입니다.' },
            { val: 'seamless morph into', label: 'Seamless Morph', tip: '형태나 움직임이 이어지며 부드럽게 다음 샷으로 변합니다.' },
        ];

        // SFX: { en: 영문 프롬프트값, ko: 한글 표시명 }
        const SFX_PRESETS = [
            { en: 'alarm beep', ko: '알람 소리' },
            { en: 'sheet rustle', ko: '이불 스치는 소리' },
            { en: 'mattress bounce', ko: '매트리스 튀는 소리' },
            { en: 'blanket whip', ko: '이불 휙 걷는 소리' },
            { en: 'faucet rush', ko: '수도꼭지 물 소리' },
            { en: 'water slap', ko: '세수하는 물소리' },
            { en: 'bristle scrape', ko: '칫솔 닦는 소리' },
            { en: 'fridge hum', ko: '냉장고 웅웅 소리' },
            { en: 'bottle clink', ko: '병 딸깍 소리' },
            { en: 'butter sizzle', ko: '버터 지글지글' },
            { en: 'ceramic clink', ko: '그릇 부딪히는 소리' },
            { en: 'chair scrape', ko: '의자 끄는 소리' },
            { en: 'fabric whip', ko: '옷감 휙 소리' },
            { en: 'key jingle', ko: '열쇠 찰랑 소리' },
            { en: 'zipper pull', ko: '지퍼 올리는 소리' },
            { en: 'sole thump', ko: '신발 쾅 소리' },
            { en: 'latch click', ko: '문고리 딸깍' },
            { en: 'rapid footsteps', ko: '빠른 발소리' },
            { en: 'rail clatter', ko: '지하철 레일 소리' },
            { en: 'door click', ko: '문 닫히는 소리' },
            { en: 'keyboard burst', ko: '키보드 타이핑' },
            { en: 'notification tick', ko: '알림음' },
            { en: 'mouse click', ko: '마우스 클릭' },
            { en: 'badge beep', ko: '카드 삑 소리' },
            { en: 'sharp breath', ko: '날카로운 숨소리' },
            { en: 'tight breath', ko: '긴장한 숨소리' },
            { en: 'room tone', ko: '방 안 정적' },
            { en: 'crowd murmur', ko: '군중 웅성거림' },
            { en: 'rain drops', ko: '빗소리' },
            { en: 'thunder rumble', ko: '천둥소리' },
            { en: 'wind gust', ko: '바람 소리' },
            { en: 'city ambience', ko: '도시 소음' },
        ];

        // 장르 프리셋 데이터
        const GENRE_PRESETS = {
            cinematic: { mood: 'epic emotional storytelling, dramatic tension, cinematic catharsis', color: 'Cinematic Teal & Orange', style: 'Cinematic Film', bgm: 'Cinematic orchestral swell', ambient: 'quiet apartment room tone' },
            noir: { mood: 'cold darkness, tension and suspicion, lonely isolation', color: 'Noir High Contrast', style: 'Cinematic Film', bgm: 'Tense thriller strings', ambient: 'rain on windows, distant thunder' },
            cyberpunk: { mood: 'futuristic cold energy, neon-lit isolation, urban tension', color: 'Neon Cyberpunk Glow', style: 'Hyper-Cinematic 4K', bgm: 'Dark ambient electronic', ambient: 'busy city street ambience' },
            golden: { mood: 'warm comforting emotion, nostalgia, gentle ease', color: 'Golden Hour Warm', style: 'Cinematic Film', bgm: 'Acoustic folk guitar', ambient: 'nature forest birds wind' },
            horror: { mood: 'fear and dread, growing anxiety, looming threat', color: 'Noir High Contrast', style: 'Documentary Handheld', bgm: 'Tense thriller strings', ambient: 'quiet apartment room tone' },
            romance: { mood: 'soft romantic emotion, warm fluttering affection, tender happiness', color: 'Pastel Dreamy', style: 'Cinematic Film', bgm: 'Romantic jazz', ambient: 'café background chatter' },
            action: { mood: 'fast aggressive energy, explosive tension, relentless speed', color: 'Hyperreal Pop Look', style: 'Hyper-Cinematic 4K', bgm: 'Fast percussive electro-pop', ambient: 'crowd cheering stadium' },
            documentary: { mood: 'honest observation, grounded realism, documentary weight', color: 'Desaturated Film', style: 'Documentary Handheld', bgm: '', ambient: 'busy city street ambience' },
            commercial: { mood: 'bright upbeat energy, trendy polish, commercial clarity', color: 'Hyperreal Pop Look', style: 'Ultra-Realistic', bgm: 'Fast percussive electro-pop', ambient: '' },
            anime: { mood: 'vivid emotional expression, heightened drama, pure passion', color: 'Pastel Dreamy', style: 'Anime Stylized', bgm: 'Slow emotional piano ballad', ambient: 'nature forest birds wind' },
        };
