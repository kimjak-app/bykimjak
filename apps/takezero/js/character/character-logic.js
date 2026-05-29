function getAge(v) { return AGE_MAP.find(([a, b]) => v >= a && v <= b) || AGE_MAP[4]; }
        function genderLabel(v) { if (v <= 15) return { ko: '남성 (MASCULINE)', en: 'highly masculine male' }; if (v <= 35) return { ko: '남성향 (MALE-LEANING)', en: 'masculine-leaning androgynous' }; if (v <= 55) return { ko: '중성 (ANDROGYNOUS)', en: 'fully androgynous unisex person' }; if (v <= 75) return { ko: '여성향 (FEMALE-LEANING)', en: 'feminine-leaning androgynous' }; return { ko: '여성 (FEMININE)', en: 'highly feminine female' }; }

        const PERSONALITY_GROUPS = [{ group: '태도 / 자존감', chips: [{ ko: '오만한', en: 'arrogant' }, { ko: '겸손한', en: 'humble' }, { ko: '자신감있는', en: 'confident' }, { ko: '불안한', en: 'anxious' }, { ko: '도도한', en: 'aloof' }, { ko: '친근한', en: 'approachable' }, { ko: '쿨한', en: 'cool' }, { ko: '감정적인', en: 'emotional' }, { ko: '냉소적인', en: 'cynical' }, { ko: '낙천적인', en: 'optimistic' }] }, { group: '행동 스타일', chips: [{ ko: '즉흥적인', en: 'impulsive' }, { ko: '체계적', en: 'systematic' }, { ko: '역동적', en: 'dynamic' }, { ko: '차분한', en: 'calm' }, { ko: '에너지있는', en: 'energetic' }, { ko: '무기력한', en: 'lethargic' }, { ko: '덜렁대는', en: 'careless' }, { ko: '신중한', en: 'cautious' }, { ko: '예측불허', en: 'unpredictable' }, { ko: '안정적', en: 'stable' }] }, { group: '스타일 / 이미지', chips: [{ ko: '귀족적', en: 'aristocratic' }, { ko: '서민적', en: 'down-to-earth' }, { ko: '세련된', en: 'refined' }, { ko: '촌스런', en: 'unsophisticated' }, { ko: '우아한', en: 'elegant' }, { ko: '거친', en: 'rough' }, { ko: '섹시한', en: 'sexy' }, { ko: '자연스러운', en: 'natural' }, { ko: '어색한', en: 'awkward' }] }];
        const VOICE_GROUPS = [{ group: '질감 (Texture)', chips: [{ ko: '부드러운', en: 'smooth silky voice' }, { ko: '거친', en: 'rough gritty voice' }, { ko: '맑은', en: 'clear crisp voice' }, { ko: '허스키', en: 'husky raspy voice' }, { ko: '포근한', en: 'warm cozy voice' }, { ko: '차가운', en: 'cold detached voice' }, { ko: '꿀같은', en: 'honey-like voice' }, { ko: '건조한', en: 'dry clipped voice' }] }, { group: '발성 방식 (Delivery)', chips: [{ ko: '또렷한', en: 'articulate clear delivery' }, { ko: '흐릿한', en: 'mumbling delivery' }, { ko: '단호한', en: 'assertive decisive' }, { ko: '망설이는', en: 'hesitant' }, { ko: '속삭이는', en: 'whispering intimate' }, { ko: '강하게', en: 'loud forceful' }, { ko: '절제된', en: 'restrained minimal' }, { ko: '과장된', en: 'exaggerated expressive' }] }];
        const PERSONALITY_CONFLICTS = { '오만한': ['겸손한'], '겸손한': ['오만한'], '자신감있는': ['불안한'], '불안한': ['자신감있는'], '외향적': ['내성적'], '내성적': ['외향적'] };
        const VOICE_CONFLICTS = { '부드러운': ['거친'], '거친': ['부드러운'], '또렷한': ['흐릿한'], '흐릿한': ['또렷한'] };

        /* ══════════════════════════════════════════
           DATA: STAGE (New for v2.0)
        ══════════════════════════════════════════ */
        const STAGE_LOCATIONS = [
            { ko: '도심 번화가', en: 'busy downtown city street' }, { ko: '비오는 골목길', en: 'rainy narrow alleyway' },
            { ko: '고요한 숲속', en: 'tranquil deep forest' }, { ko: '해질녘 해변', en: 'sunset beach' },
            { ko: '근미래 사이버펑크 도시', en: 'neon-lit cyberpunk city street' }, { ko: '버려진 공장', en: 'abandoned industrial factory' }
        ];
        const STAGE_ATMOSPHERES = [
            { ko: '맑음', en: 'clear sunny weather' }, { ko: '폭우', en: 'heavy pouring rain' },
            { ko: '짙은 안개', en: 'dense rolling fog' }, { ko: '눈보라', en: 'blizzard and snow' },
            { ko: '미세먼지/스모그', en: 'thick dusty smog' }, { ko: '빛 갈라짐', en: 'volumetric light rays' }
        ];
        const STAGE_SET_DESIGNS = [
            { ko: '미니멀한 거실', en: 'minimalist modern living room' }, { ko: '낡은 지하실', en: 'grungy rundown basement' },
            { ko: '화려한 펜트하우스', en: 'luxurious high-end penthouse' }, { ko: '하이테크 연구소', en: 'high-tech sterile laboratory' },
            { ko: '엔틱한 서재', en: 'antique library with wooden shelves' }
        ];
        const STAGE_SET_MATS = [
            { ko: '노출 콘크리트', en: 'exposed raw concrete walls' }, { ko: '빈티지 붉은 벽돌', en: 'vintage red brick walls' },
            { ko: '대리석', en: 'polished marble surfaces' }, { ko: '낡은 나무 마루', en: 'worn wooden floorboards' },
            { ko: '금속 패널', en: 'metallic industrial panels' }
        ];
        const STAGE_PROPS = ['고장난 TV', '홀로그램 모니터', '식은 커피잔', '소파', '널브러진 서류', '형광등'];

        const OUTPUT_FRAME_DATA = {
            '16:9': {
                title: '16:9',
                guide: '영화, 유튜브, 일반 영상의 기본 화면. 좌우 공간을 활용하는 시네마 구도에 강합니다.',
                imagePrompt: '16:9 widescreen composition, cinematic horizontal balance, strong left-right spatial staging',
                sequencePrompt: '16:9 widescreen format, designed for horizontal cinematic motion and multi-subject staging'
            },
            '9:16': {
                title: '9:16',
                guide: '쇼츠, 릴스, 틱톡용 세로 화면. 인물을 꽉 채우는 세로 집중 구도에 강합니다.',
                imagePrompt: '9:16 vertical composition, portrait-first framing, strong top-bottom visual flow, mobile-first',
                sequencePrompt: '9:16 vertical format, portrait viewing logic, prioritize vertical subject motion and close framing'
            },
            '1:1': {
                title: '1:1',
                guide: '피드형 이미지나 제품 컷에 잘 맞는 정사각 구도. 중앙 집중형 안정감이 큽니다.',
                imagePrompt: '1:1 square composition, centered subject balance, stable symmetrical framing',
                sequencePrompt: '1:1 square format, centered framing logic, compact composition for feed-friendly visuals'
            },
            '4:5': {
                title: '4:5',
                guide: '인물 사진, 화보, 패션 피드에 최적. 인물 중심인데 배경 여유도 조금 살릴 수 있습니다.',
                imagePrompt: '4:5 portrait composition, editorial portrait balance, subject-dominant framing with elegant negative space',
                sequencePrompt: '4:5 portrait format, editorial visual rhythm, optimized for social portrait storytelling'
            },
            '3:4': {
                title: '3:4',
                guide: '클래식 사진, 포스터, 정적인 인물 연출에 잘 맞는 안정적인 세로 비율입니다.',
                imagePrompt: '3:4 portrait composition, classic poster-like balance, calm vertical framing',
                sequencePrompt: '3:4 portrait format, classic frame logic, controlled and stable visual staging'
            },
            '7:5': {
                title: '7:5',
                guide: '인스타 세로 화면에 특히 잘 맞는 비율. 인물 중심이면서 답답하지 않게 배경 여유를 살리기 좋습니다.',
                imagePrompt: '7:5 portrait composition, instagram-optimized portrait balance, elegant subject emphasis with comfortable vertical space',
                sequencePrompt: '7:5 portrait format, instagram-optimized vertical storytelling, subject-first framing with balanced breathing room'
            },
            '2.39:1': {
                title: '2.39:1',
                guide: '영화관 와이드 화면. 고독, 긴장, 장엄함 같은 극적인 시네마 연출에 강합니다.',
                imagePrompt: '2.39:1 anamorphic widescreen composition, extreme cinematic width, dramatic negative space',
                sequencePrompt: '2.39:1 anamorphic format, wide cinematic motion design, expansive horizontal tension'
            }
        };

        const IMAGE_PRESET_DATA = {
            cinematic_portrait:{composition:'cinematic_portrait',mood:'quiet_tension',style:'cinematic_film',lighting:'soft_studio',atmosphere:'clean_air',guide:'시네마틱 인물 — 인물 중심, 은은한 긴장감, 영화 스틸 같은 한 컷으로 자동 세팅됩니다.'},
            editorial_fashion:{composition:'editorial_fullbody',mood:'fashion_editorial',style:'luxury_editorial',lighting:'soft_studio',atmosphere:'clean_air',guide:'패션 화보 — 전신 라인과 의상 질감이 잘 살아나는 화보용 조합입니다.'},
            product_hero:{composition:'centered_product',mood:'heroic_impact',style:'ultra_photoreal',lighting:'soft_studio',atmosphere:'clean_air',guide:'제품 히어로컷 — 오브젝트를 또렷하게 중앙에 세우는 제품 광고형 세팅입니다.'},
            noir_scene:{composition:'wide_establishing',mood:'lonely_isolation',style:'cinematic_film',lighting:'hard_noir',atmosphere:'smoky_cinema',guide:'누아르 씬 — 강한 명암과 연기 낀 공기로 고독한 긴장감을 만듭니다.'},
            golden_memory:{composition:'cinematic_portrait',mood:'nostalgic_warmth',style:'cinematic_film',lighting:'golden_hour',atmosphere:'dream_glow',guide:'골든아워 감성 — 따뜻한 햇빛과 추억 같은 빛 번짐을 강조합니다.'},
            neon_cyber:{composition:'wide_establishing',mood:'heroic_impact',style:'concept_art',lighting:'neon_night',atmosphere:'rain_mist',guide:'네온 사이버 — 네온 반사광과 비안개로 차가운 미래 도시감을 만듭니다.'},
            poster_hero:{composition:'poster_hero',mood:'heroic_impact',style:'luxury_editorial',lighting:'hard_noir',atmosphere:'clean_air',guide:'포스터 히어로 — 한 장으로 캐릭터 임팩트를 꽂는 포스터형 세팅입니다.'},
            dreamy_art:{composition:'cinematic_portrait',mood:'nostalgic_warmth',style:'anime_realblend',lighting:'volumetric_window',atmosphere:'dream_glow',guide:'몽환 아트 — 부드러운 볼류메트릭 라이트와 꿈결 같은 공기감을 만듭니다.'}
        };

        const IMAGE_COMPOSITION_DATA = {
            cinematic_portrait: 'cinematic portrait composition, subject-led framing, controlled negative space',
            centered_product: 'centered product composition, clean symmetrical layout, object-focused framing',
            editorial_fullbody: 'editorial full body fashion composition, full silhouette clarity, magazine-like balance',
            wide_establishing: 'wide establishing composition, environment-driven framing, cinematic scale',
            poster_hero: 'hero poster composition, iconic centered silhouette, dramatic focal hierarchy'
        };

        const IMAGE_COMPOSITION_GUIDE = {
            cinematic_portrait: '인물을 중심으로 잡되, 화면비에 맞게 네거티브 스페이스와 시선 흐름을 설계합니다.',
            centered_product: '제품이나 오브젝트를 또렷하게 중앙에 두고, 좌우 균형을 정교하게 맞춥니다.',
            editorial_fullbody: '전신 실루엣과 의상 라인이 잘 살아나도록 세로 흐름을 길게 가져갑니다.',
            wide_establishing: '배경과 공간감이 먼저 읽히게 하고, 피사체는 그 안에서 포인트가 되게 설계합니다.',
            poster_hero: '포스터처럼 한 장만으로 캐릭터 임팩트가 오도록 중심 축과 시선 집중을 강하게 잡습니다.'
        };

        const IMAGE_MOOD_DATA = {
            quiet_tension: 'quiet tension, restrained suspense, subtle emotional pressure',
            nostalgic_warmth: 'nostalgic warmth, soft emotional glow, lingering tenderness',
            lonely_isolation: 'lonely isolation, silence, emotional distance',
            heroic_impact: 'heroic impact, bold intensity, high dramatic force',
            fashion_editorial: 'fashion editorial confidence, polished coolness, premium allure'
        };

        const IMAGE_STYLE_DATA = {
            ultra_photoreal: 'ultra-photorealistic, hyper-detailed, premium realism',
            cinematic_film: 'cinematic film still, refined grain, premium dramatic realism',
            luxury_editorial: 'luxury editorial photography, premium magazine finish',
            anime_realblend: 'anime-realism hybrid, stylized but grounded details',
            concept_art: 'high-end concept art illustration, cinematic matte-painting quality'
        };

        const IMAGE_LIGHTING_DATA = {
            soft_studio: 'soft studio lighting, gentle wraparound highlights, clean skin rendering',
            golden_hour: 'golden hour sunlight, warm low-angle highlights, soft radiant contrast',
            hard_noir: 'hard noir lighting, deep shadow contrast, sharp dramatic falloff',
            neon_night: 'neon night lighting, colored practical lights, reflective urban glow',
            volumetric_window: 'volumetric window light, atmospheric shafts, dust-visible beams'
        };

        const IMAGE_ATMOSPHERE_DATA = {
            clean_air: 'clean atmosphere, crisp air, controlled visual clarity',
            rain_mist: 'rain mist in the air, wet ambience, suspended moisture',
            dust_haze: 'dust haze, textured air, dry suspended particles',
            smoky_cinema: 'cinematic smoke haze, diffusion-rich atmosphere, layered air depth',
            dream_glow: 'dreamlike glow, soft bloom, ethereal atmosphere'
        };


        /* ══════════════════════════════════════════
           STATE
        ══════════════════════════════════════════ */
        const state = {
            format: {
                aspectRatio: '16:9',
                duration: 15,
                bpm: 120,
                rhythm: 'rhythmic'
            },
            mood: {
                preset: 'tension',
                detail: ''
            },
            color: {
                preset: 'Hyperreal Pop Look',
                custom: ''
            },
            bgm: '',
            ambient: '',
            view: 'character',
            name: '', gender: 50, bustSize: 'B컵', age: 25,
            race: { tier1: '', tier2: '', tier3: '', mixCA: 0, mixBA: 0, mixCB: 0 },
            activeMix: null,
            eyeColor: '', height: 185, bodyFat: 12, muscle: 82,
            heightTouched: false, bodyFatTouched: false, muscleTouched: false,
            headSize: 85, torsoLeg: 50, shoulder: 100, roundness: 50,
            headSizeTouched: false, torsoLegTouched: false, shoulderTouched: false, roundnessTouched: false,
            faceShape: '', foreheadShape: '', hairStyle: '',
            hairColor: '',
            asianPreset: '',
            eyeShape: '', eyebrowShape: '',
            noseShape: '', lipShape: '',
            skinTexture: [], bodyExtra: '',
            personality: [], voice: [],
            attire: {
                tier1: '', tier2: '', tier3: '',
                shoes: '', accessories: [],
                extra: ''
            },
            attireExtra: '',

            // STAGE parameters
            stageMode: 'location', // 'location' or 'set'
            location: '도심 번화가',
            atmosphere: '맑음',
            setDesign: '미니멀한 거실',
            stageMat: '노출 콘크리트',
            props: [],
            propExtra: '',
            charSheetFrame: '16:9',
            outputFrame: '16:9',
            imageSubject: '',
            imageComposition: '',
            imageMood: '',
            imageStyle: '',
            imageLighting: '',
            imageAtmosphere: [],
            imageLocationTier1: '',
            imageLocationTier2: '',
            imageLocationTier3: '',
            imageColorTone: '',
            imageUseCharacter: true,
            imagePreset: '',
            imageLens: '',
            imageAperture: '',
            imageCameraSide: '',
            imageCameraHeight: '',
            imageCameraTilt: '',
            imageLensDistortion: 'none'
        };

        /* ══════════════════════════════════════════
           PROMPT ENGINE
        ══════════════════════════════════════════ */

        const SEEDANCE_CONSTRAINTS = 'avoid jitter, avoid identity drift, avoid bent limbs, no distortion, no flicker, no unnatural motion, maintain face consistency, consistent lighting across frames, sharp clarity, natural colors, stable picture';
        const SUBJECT_STABILITY_RULE = 'single subject focus, consistent appearance across frames';
        const BANNED_PROMPT_KEYWORDS = /\b(glow|glimmer|glints)\b/gi;

        function cleanPromptText(text) {
            return String(text || '')
                .replace(BANNED_PROMPT_KEYWORDS, '')
                .replace(/\s+,/g, ',')
                .replace(/,\s*,+/g, ',')
                .replace(/\(\s*,\s*/g, '(')
                .replace(/\s+\./g, '.')
                .replace(/\s{2,}/g, ' ')
                .trim();
        }

        function cleanPromptBlock(text) {
            return String(text || '')
                .split('\n')
                .map(line => cleanPromptText(line))
                .join('\n')
                .replace(/\n{3,}/g, '\n\n')
                .trim();
        }

        function appendConstraints(prompt) {
            const base = cleanPromptText(prompt);
            return cleanPromptText(base + ' ' + SEEDANCE_CONSTRAINTS);
        }

        // ensure change tracking
        function getChanged(prev, next) {
            prev = prev || {};
            next = next || {};
            return {
                aspectRatio: prev.aspectRatio !== next.aspectRatio,
                duration: prev.duration !== next.duration,
                bpm: prev.bpm !== next.bpm,
                rhythm: prev.rhythm !== next.rhythm,
                renderStyle: prev.renderStyle !== next.renderStyle,
                color: prev.color !== next.color,
                bgm: prev.bgm !== next.bgm,
                ambient: prev.ambient !== next.ambient
            };
        }
