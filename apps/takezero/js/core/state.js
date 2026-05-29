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
            race: { asia: null, caucasian: null, black: null },
            activeMix: null, mixCA: 0, mixBA: 0, mixCB: 0,
            eyeColor: '검은 눈동자', height: 185, bodyFat: 12, muscle: 82,
            headSize: 85, torsoLeg: 50, shoulder: 100, roundness: 50,
            faceShape: '계란형', foreheadShape: '보통 이마', hairStyle: '단발',
            skinTexture: '사실적 모공', bodyExtra: '',
            personality: [], voice: [],
            attire: { category: '아우터', item: '트렌치코트', materialMode: 'auto', material: '면(코튼)', status: '새것 (Clean)' },
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
            imageComposition: 'cinematic_portrait',
            imageMood: 'quiet_tension',
            imageStyle: 'ultra_photoreal',
            imageLighting: 'soft_studio',
            imageAtmosphere: 'clean_air',
            imagePreset: 'cinematic_portrait',
            imageLens: '50mm standard lens',
            imageAperture: 'f/2 shallow depth of field',
            imageCameraSide: 'front view',
            imageCameraHeight: 'eye-level camera',
            imageCameraTilt: 'level horizon',
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
