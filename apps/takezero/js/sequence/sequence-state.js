const seqState = {
            mode: 'basic',
            platform: 'seedance',
            logicRule: true,
            moodCluster: '',
            autoProApplied: false,
            motionSpeed: 'slow',
            lighting: 'none',
            particle: 'none',
            references: {
                image1: { role: '' },
                image2: { role: '' },
                video1: { role: '' },
                audio1: { role: '' }
            },
            shots: []
        };

        const MOTION_SPEED_PROMPTS = {
            imperceptible: 'imperceptible, barely perceptible motion',
            slow: 'slow, gentle, smooth controlled motion',
            dynamic: 'dynamic but stable motion'
        };

        const GRAVITY_PROMPTS = {
            standard: 'realistic gravity, grounded physical motion',
            low: 'low gravity, floaty movement, softened falloff',
            zero: 'zero gravity, floating objects, weightless drift',
            bullet: 'bullet time, time-sliced motion, stretched temporal perception'
        };

        const FX_PROMPTS = {
            none: '',
            fpv_dynamic: 'FPV dynamic energy, aggressive camera drift, velocity emphasis',
            glitch: 'digital glitch distortion, signal breakup, scanline artifacts',
            double_exposure: 'double exposure layering, ghosted silhouettes',
            anamorphic: 'anamorphic lens flares, stretched highlights, cinematic streaking'
        };

        const FX_DESCRIPTIONS = {
            none: '효과 없이 깔끔한 기본 화면.',
            fpv_dynamic: '드론이 몸으로 돌진하듯 빠르고 공격적인 시점입니다.',
            glitch: '화면이 깨지거나 튀는 디지털 오류 느낌을 줍니다.',
            double_exposure: '두 이미지가 겹쳐 보이는 몽환적 중첩 효과입니다.',
            anamorphic: '빛이 옆으로 길게 번지는 영화 같은 렌즈 플레어 효과입니다.'
        };

        const GRAVITY_DESCRIPTIONS = {
            standard: '현실 세계처럼 자연스럽고 무게감 있는 움직임입니다.',
            low: '몸과 사물이 더 가볍게 뜨며 점프와 낙하가 길게 느껴집니다.',
            zero: '완전히 떠다니는 무중력 상태처럼 방향 감각이 흐트러집니다.',
            bullet: '시간이 느려진 듯 움직임이 길게 늘어지는 불릿타임 연출입니다.'
        };

        const CAMERA_PRESETS = [
            { val: '', label: 'none' },
            { val: 'static', label: 'static' },
            { val: 'dolly-in', label: 'dolly-in' },
            { val: 'dolly-out', label: 'dolly-out' },
            { val: 'pan left', label: 'pan left' },
            { val: 'pan right', label: 'pan right' },
            { val: 'tilt up', label: 'tilt up' },
            { val: 'tilt down', label: 'tilt down' },
            { val: 'orbit', label: 'orbit' },
            { val: 'handheld', label: 'handheld' },
            { val: 'crane up', label: 'crane up' },
            { val: 'crane down', label: 'crane down' }
        ];

        const CAMERA_END_PRESETS = [
            ...CAMERA_PRESETS,
            { val: 'hold frame', label: 'hold frame' },
            { val: 'handheld settle', label: 'handheld settle' }
        ];

        const CAMERA_PRESET_DESCRIPTIONS = {
            '': '프리셋을 쓰지 않고 직접 입력값이나 기본 무빙을 사용합니다.',
            static: '고정된 카메라로 안정감 있게 유지합니다.',
            'dolly-in': '피사체 쪽으로 천천히 다가가며 집중감을 높입니다.',
            'dolly-out': '뒤로 물러나며 거리감이나 여운을 만듭니다.',
            'pan left': '화면을 왼쪽으로 훑으며 공간을 보여줍니다.',
            'pan right': '화면을 오른쪽으로 훑으며 공간을 보여줍니다.',
            'tilt up': '시선을 위로 올리며 상승감이나 웅장함을 줍니다.',
            'tilt down': '시선을 아래로 내리며 발견감이나 압박감을 줍니다.',
            orbit: '피사체 주위를 돌며 극적인 순간을 강조합니다.',
            handheld: '손으로 든 듯한 미세 흔들림으로 긴박감과 현실감을 줍니다.',
            'crane up': '위로 떠오르며 장면을 넓게 열어줍니다.',
            'crane down': '위에서 내려오며 집중감과 압박을 만듭니다.',
            'hold frame': '샷 끝에서 구도를 잠깐 고정해 여운을 남깁니다.',
            'handheld settle': '흔들리던 카메라가 끝에서 차분히 안정됩니다.'
        };

        const CAMERA_SPEED_DESCRIPTIONS = {
            slow: '느리고 안정적인 이동으로 감정선과 디테일을 더 잘 보여줍니다.',
            normal: '가장 자연스럽고 기본적인 이동 속도입니다.',
            fast: '빠르고 강한 이동감으로 긴장감과 에너지를 높입니다.'
        };

        const CAMERA_EASING_DESCRIPTIONS = {
            gentle: '부드럽게 시작하고 부드럽게 끝나는 가장 안전한 기본 리듬입니다.',
            none: '시작부터 끝까지 거의 일정한 속도로 움직입니다.',
            accelerate: '점점 빨라지며 에너지가 커집니다.',
            decelerate: '점점 느려지며 도착감과 여운을 만듭니다.',
            hold: '끝부분에서 잠깐 멈추거나 머물러 장면을 강조합니다.'
        };

        const REFERENCE_ROLES = [
            'first_frame',
            'last_frame',
            'character_reference',
            'camera_motion',
            'lighting_reference',
            'bgm',
            'voice_over'
        ];

        const REFERENCE_ROLE_LABELS = {
            first_frame: 'first frame',
            last_frame: 'last frame',
            character_reference: 'character reference',
            camera_motion: 'camera motion reference',
            lighting_reference: 'lighting reference',
            bgm: 'background music',
            voice_over: 'voice over'
        };


        const LIGHTING_PROMPTS = {
            none: '',
            tungsten: 'warm tungsten practical lighting, amber highlights',
            volumetric: 'volumetric light rays, light shafts, atmospheric depth',
            memory_warmth: 'soft nostalgic memory warmth, cinematic golden ambience',
            moonlit: 'cool moonlit blue ambience, nocturnal contrast',
            golden_hour: 'golden hour lighting, warm low-angle sunlight, natural soft contrast',
            rim_light: 'rim light outlining the subject, clean edge separation',
            soft_key_45: 'soft key light from 45 degrees, flattering natural face light',
            backlit_sunset: 'backlit sunset, warm rear light, natural silhouette separation',
            volumetric_fog: 'volumetric fog, visible light depth, atmospheric haze',
            chiaroscuro: 'chiaroscuro lighting, controlled contrast, sculpted shadows'
        };

        const PARTICLE_PROMPTS = {
            none: '',
            rain: 'rain particles interacting with light, wet atmosphere',
            dust: 'floating dust particles in light beams',
            embers: 'embers and sparks drifting through frame',
            smoke: 'cinematic smoke diffusion, suspended haze'
        };

        const TIMEFLOW_PROMPTS = {
            normal: '',
            slow: 'slow motion, high frame interpolation feel',
            freeze: 'freeze-frame sensation, near-stopped time',
            ramp: 'speed ramp, time acceleration and deceleration'
        };

        const DISTORTION_PROMPTS = {
            none: '',
            slight: 'subtle lens distortion',
            fisheye: 'fisheye lens distortion',
            wide_edge: 'wide-edge distortion, stretched frame edges'
        };

        const PRO_OVERRIDE_DEFAULTS = {
            shotType: false,
            lens: false,
            cameraHeight: false,
            cameraTilt: false,
            lensDistortion: false,
            timeflow: false,
            cameraSpeed: false,
            cameraEasing: false
        };

        const MOOD_CLUSTER_KEYWORDS = {
            TENSION: ['긴장', '불안', '공포', '압박', '위기', '의심'],
            WARM: ['따뜻함', '설렘', '향수', '사랑', '안도', '평온'],
            EPIC: ['웅장함', '희망', '승리감', '장엄함', '개방감'],
            MELANCHOLY: ['고독', '슬픔', '허무', '공허', '침잠'],
            CHAOS: ['혼란', '분노', '폭발', '광기', '추격', '긴박'],
            DOCUMENTARY: ['현실감', '자연스러움', '인터뷰', '관찰', '일상'],
            SURREAL: ['몽환', '꿈', '환각', '신비', '초현실']
        };

        const MOOD_AUTO_PRO_DEFAULTS = {
            TENSION: {
                shotType: 'MCU',
                lens: '50mm',
                cameraHeight: 'eye-level camera',
                cameraTilt: 'slight dutch tilt',
                lensDistortion: 'none',
                timeflow: 'normal',
                cameraSpeed: 'slow',
                cameraEasing: 'decelerate'
            },
            WARM: {
                shotType: 'MS',
                lens: '50mm',
                cameraHeight: 'eye-level camera',
                cameraTilt: 'level horizon',
                lensDistortion: 'none',
                timeflow: 'normal',
                cameraSpeed: 'slow',
                cameraEasing: 'hold'
            },
            EPIC: {
                shotType: 'WS',
                lens: '24mm',
                cameraHeight: 'slightly below eye level',
                cameraTilt: 'level horizon',
                lensDistortion: 'none',
                timeflow: 'normal',
                cameraSpeed: 'normal',
                cameraEasing: 'accelerate'
            },
            MELANCHOLY: {
                shotType: 'MS',
                lens: '85mm',
                cameraHeight: 'eye-level camera',
                cameraTilt: 'level horizon',
                lensDistortion: 'none',
                timeflow: 'slow',
                cameraSpeed: 'slow',
                cameraEasing: 'none'
            },
            CHAOS: {
                shotType: 'MS',
                lens: '35mm',
                cameraHeight: 'eye-level camera',
                cameraTilt: 'strong dutch tilt',
                lensDistortion: 'slight',
                timeflow: 'ramp',
                cameraSpeed: 'fast',
                cameraEasing: 'none'
            },
            DOCUMENTARY: {
                shotType: 'MS',
                lens: '35mm',
                cameraHeight: 'eye-level camera',
                cameraTilt: 'level horizon',
                lensDistortion: 'none',
                timeflow: 'normal',
                cameraSpeed: 'normal',
                cameraEasing: 'none'
            },
            SURREAL: {
                shotType: 'MS',
                lens: '50mm',
                cameraHeight: 'slightly above eye level',
                cameraTilt: 'slight dutch tilt',
                lensDistortion: 'slight',
                timeflow: 'slow',
                cameraSpeed: 'slow',
                cameraEasing: 'none'
            }
        };

        function getMotionIntensityPrompt(val) {
            const n = parseInt(val || 1, 10);
            if (n >= 5) return 'extreme velocity, supersonic motion, extreme motion blur, violent kinetic energy';
            if (n >= 4) return 'high-speed action, supersonic acceleration, cinematic motion blur';
            if (n >= 3) return 'dynamic motion, fast movement, visible motion blur';
            if (n >= 2) return 'controlled movement, subtle velocity';
            return 'subtle motion, restrained physicality';
        }

        function getPlatformBoost(platform) {
            if (platform === 'kling') return 'natural physics, cinematic realism, smooth realistic motion';
            if (platform === 'seedance') return 'smooth animation interpolation, stylized motion clarity, clean temporal blending';
            if (platform === 'higgsfield') return 'camera-driven motion language, premium cinema movement';
            if (platform === 'veo') return 'high-fidelity cinematic realism, premium motion coherence';
            return '';
        }

        function getMotionSpeedPrompt(speed) {
            return MOTION_SPEED_PROMPTS[speed] || MOTION_SPEED_PROMPTS.slow;
        }

        function normalizeCameraChoice(value) {
            const raw = cleanPromptText(value || '').trim();
            return raw && raw !== 'none' ? raw : '';
        }

        function getShotCameraStart(shot) {
            return normalizeCameraChoice(shot.cameraStart) || normalizeCameraChoice(shot.cameraStartPreset) || normalizeCameraChoice(shot.startMovement);
        }

        function getShotCameraEnd(shot) {
            return normalizeCameraChoice(shot.cameraEnd) || normalizeCameraChoice(shot.cameraEndPreset) || normalizeCameraChoice(shot.endMovement);
        }

        function canonicalCameraToken(value) {
            const raw = normalizeCameraChoice(value).toLowerCase();
            const map = {
                'push-in': 'dolly-in',
                'slow push-in': 'dolly-in',
                'pull-out': 'dolly-out',
                'pull out': 'dolly-out',
                'dolly in': 'dolly-in',
                'dolly out': 'dolly-out',
                handheld: 'handheld',
                'handheld drift': 'handheld',
                'handheld jolt': 'handheld'
            };
            return map[raw] || raw;
        }

        function cameraPartsPushUnique(parts, value) {
            const clean = cleanPromptText(value);
            if (!clean) return;
            const key = canonicalCameraToken(clean);
            if (!parts.some(item => item.key === key || item.text === clean)) parts.push({ key, text: clean });
        }

        function cameraMovementToNatural(movement, speed) {
            const speedPrompt = getMotionSpeedPrompt(speed);
            const naturalMap = {
                static: 'smooth, controlled, subtle locked-off stable camera',
                'push-in': 'slow dolly-in, smooth controlled motion',
                'dolly-in': 'slow dolly-in, smooth controlled motion',
                'pull-out': 'slow dolly-out, smooth controlled motion',
                'dolly-out': 'slow dolly-out, smooth controlled motion',
                'dolly left': 'slow, gentle dolly left, smooth lateral motion',
                'dolly right': 'slow, gentle dolly right, smooth lateral motion',
                'pan left': 'slow, gentle pan left, stable rotation',
                'pan right': 'slow, gentle pan right, stable rotation',
                'tilt up': 'slow, gentle tilt up, controlled vertical reveal',
                'tilt down': 'slow, gentle tilt down, controlled vertical reveal',
                handheld: 'smooth, controlled, subtle handheld movement',
                'handheld drift': 'smooth, controlled, subtle handheld movement',
                'handheld jolt': 'smooth, controlled, subtle handheld movement',
                orbit: 'smooth, controlled orbit around the subject',
                'crane up': 'slow, gentle crane up, smooth vertical rise',
                'crane down': 'slow, gentle crane down, smooth vertical descent',
                'hold frame': 'hold the final frame briefly',
                'handheld settle': 'handheld movement settling into a stable final frame',
                'FPV drone': 'smooth, controlled, subtle FPV drift',
                'rack focus': 'slow, gentle rack focus, smooth focus transition',
                'snap zoom': 'smooth, controlled, subtle zoom-in',
                'dolly zoom': 'smooth, controlled, subtle dolly zoom',
                'whip pan': 'smooth, controlled, subtle whip pan',
                'overhead slide': 'smooth, controlled, subtle overhead slide'
            };
            const raw = String(movement || 'static').trim();
            if (/then\s*:|,\s*then\s*:|->/i.test(raw)) {
                const parts = raw
                    .replace(/->/g, ', then: ')
                    .split(/,\s*then\s*:|then\s*:/i)
                    .map(p => p.replace(/^start\s*:\s*/i, '').trim())
                    .filter(Boolean)
                    .map(p => naturalMap[p] || p);
                return parts.length > 1 ? 'start: ' + parts[0] + ', then: ' + parts.slice(1).join(', then: ') : (parts[0] || naturalMap.static);
            }
            return naturalMap[raw] || speedPrompt + ', ' + raw;
        }

        function cameraShotToNatural(shot, index) {
            const movement = resolveCamera(shot);
            const transition = index > 0 && shot.transition ? 'transition: ' + shot.transition : '';
            return [
                'shot type: ' + (shot.type || 'MS'),
                'lens: ' + (shot.lens || '50mm'),
                movement,
                transition,
                shot.aperture || 'f/2 shallow depth of field',
                shot.cameraSide || 'front view',
                shot.cameraHeight || 'eye-level camera',
                TIMEFLOW_PROMPTS[shot.timeFlow] || '',
                DISTORTION_PROMPTS[shot.lensDistortion] || '',
                shot.seamless ? 'seamless transition, continuous visual link, no visible cut' : ''
            ].filter(Boolean).join(', ');
        }

        function normalizeCameraStep(step, applyGlobalMotionSpeed = true) {
            const value = cleanPromptText(step);
            if (!value) return '';
            if (!applyGlobalMotionSpeed) return value;
            if (/\b(slow|gentle|gradual|smooth|controlled|subtle|start:|then:)\b/i.test(value)) return value;
            return cameraMovementToNatural(value, applyGlobalMotionSpeed ? seqState.motionSpeed : 'normal');
        }

        function applyCameraEasing(phrase, easing, hasEnd) {
            if (!phrase) return '';
            if (easing === 'gentle') return phrase + ', gentle ease in and ease out';
            if (easing === 'accelerate') return phrase + ', gradually accelerating';
            if (easing === 'decelerate') return phrase + (hasEnd ? ', slowing down toward the end' : ', gently easing out');
            if (easing === 'hold') return phrase + ', then holding briefly';
            return phrase;
        }

        function buildCameraFlow(start, end, speed = 'normal', easing = 'none') {
            const speedMap = { slow: 'slow', normal: '', fast: 'fast' };
            const speedWord = speedMap[speed] ? speedMap[speed] + ' ' : '';
            const startStep = normalizeCameraStep(start, false);
            const endStep = normalizeCameraStep(end, false);
            if (startStep && endStep) {
                if (canonicalCameraToken(startStep) === canonicalCameraToken(endStep)) {
                    return applyCameraEasing(speedWord + startStep, easing, false);
                }
                return applyCameraEasing('start: ' + speedWord + startStep + ', gradually shifting into ' + endStep, easing, true);
            }
            const single = startStep || endStep || '';
            if (single) return applyCameraEasing(speedWord + single, easing, false);
            return '';
        }

        function getShotTransition(shot) {
            return normalizeCameraChoice(shot && shot.transition) || 'hard cut to';
        }

        function joinTimedShotParts(parts, shots) {
            return parts.reduce(function (acc, part, index) {
                if (!part) return acc;
                if (!acc) return part;
                const transition = getShotTransition(shots[index]);
                return acc + ', ' + transition + ' ' + part;
            }, '');
        }

        function buildReferencePhrase() {
            ensureReferenceDefaults();
            const refs = seqState.references || {};
            return [
                { key: 'image1', tag: '@Image1' },
                { key: 'image2', tag: '@Image2' },
                { key: 'video1', tag: '@Video1' },
                { key: 'audio1', tag: '@Audio1' }
            ].map(slot => {
                const role = refs[slot.key] && refs[slot.key].role;
                return role ? slot.tag + ' (' + (REFERENCE_ROLE_LABELS[role] || role.replace(/_/g, ' ')) + ')' : '';
            }).filter(Boolean).join(', ');
        }

        function ensureReferenceDefaults() {
            if (!seqState.references) seqState.references = {};
            ['image1', 'image2', 'video1', 'audio1'].forEach(key => {
                if (!seqState.references[key]) seqState.references[key] = { role: '' };
                seqState.references[key].role = seqState.references[key].role || '';
            });
        }

        function resolveCamera(shot) {
            const start = getShotCameraStart(shot);
            const end = getShotCameraEnd(shot);
            const speed = shot.cameraSpeed || 'slow';
            const easing = shot.cameraEasing || 'gentle';
            if (start || end) return buildCameraFlow(start, end, speed, easing);
            const fallback = shot.camera || shot.movement || '';
            return buildCameraFlow(fallback, '', speed, easing);
        }

        function buildShotLine(shot) {
            const time = formatPromptTimecode(shot);
            const cam = resolveCamera(shot);
            return cleanPromptText(time + ' ' + cam);
        }

        function hasPhysicalVerb(text) {
            return /\b(turns?|walks?|runs?|steps?|moves?|leans?|raises?|lowers?|reaches?|looks?|tilts?|nods?|jolts?|pulls?|pushes?|opens?|closes?|holds?|grabs?|sits?|stands?|kneels?|crouches?|jumps?|falls?|spins?|rotates?|slides?|drifts?|breathes?|shifts?|glances?|approaches?|retreats?)\b/i.test(text || '');
        }

        function buildSubjectPhrase(data) {
            return cleanPromptText([data.subject, SUBJECT_STABILITY_RULE, data.wardrobe, data.environment].filter(Boolean).join(', '));
        }

        function buildActionPhrase(data) {
            if (!data.shots || !data.shots.length) return 'subtle movement as the subject performs one clear physical motion in present tense';
            const parts = data.shots.map(function (shot, i) {
                const action = cleanPromptText(shot.action || 'turns slightly toward the camera');
                const physicalAction = hasPhysicalVerb(action) ? action : 'subtle movement as ' + action;
                const duration = (shot.duration === 0 || shot.duration === '0') ? 'still moment' : shot.duration + ' second motion';
                const timecode = formatPromptTimecode(shot);
                const physics = [
                    getMotionIntensityPrompt(shot.motionIntensity),
                    GRAVITY_PROMPTS[shot.gravity] || '',
                    FX_PROMPTS[shot.fxPreset] || '',
                    shot.sfx && shot.sfx.length ? 'with ' + shot.sfx.join(', ') : ''
                ].filter(Boolean).join(', ');
                return cleanPromptText(timecode + ' ' + (data.shots.length > 1 ? 'shot ' + (i + 1) + ' ' : '') + physicalAction + ' in a ' + duration + (physics ? ', ' + physics : ''));
            });
            return cleanPromptText(joinTimedShotParts(parts, data.shots));
        }

        function buildCameraPhrase(data) {
            if (!data.shots || !data.shots.length) return 'smooth, controlled, subtle locked-off stable camera';
            const parts = data.shots.map(function (shot, i) {
                const cameraParts = [];
                const start = getShotCameraStart(shot);
                const end = getShotCameraEnd(shot);
                const movement = normalizeCameraChoice(shot.movement);
                if (start || end) {
                    cameraPartsPushUnique(cameraParts, buildCameraFlow(start, end, shot.cameraSpeed || 'slow', shot.cameraEasing || 'gentle'));
                    if (movement && canonicalCameraToken(movement) !== canonicalCameraToken(start) && canonicalCameraToken(movement) !== canonicalCameraToken(end)) {
                        cameraPartsPushUnique(cameraParts, cameraMovementToNatural(movement, seqState.motionSpeed));
                    }
                } else {
                    cameraPartsPushUnique(cameraParts, resolveCamera(shot));
                }
                const lens = shot.lens ? 'cinematic ' + shot.lens + ' lens' : '';
                const extras = [
                    'shot type: ' + (shot.type || 'MS'),
                    lens,
                    shot.aperture || '',
                    shot.cameraSide || '',
                    shot.cameraHeight || '',
                    shot.cameraTilt || '',
                    TIMEFLOW_PROMPTS[shot.timeFlow] || '',
                    DISTORTION_PROMPTS[shot.lensDistortion] || '',
                    shot.seamless ? 'continuous visual connection' : ''
                ].filter(Boolean).join(', ');
                const cameraText = cameraParts.map(item => item.text).join(', ');
                return cleanPromptText(formatPromptTimecode(shot) + ' ' + cameraText + (extras ? ', ' + extras : ''));
            });
            return cleanPromptText(joinTimedShotParts(parts, data.shots));
        }

        function buildStylePhrase(data) {
            const elements = [
                data.lighting,
                data.particle,
                data.color,
                data.style,
                data.platformBoost,
                data.firstLens ? 'cinematic ' + data.firstLens + ' tone' : 'cinematic 35mm tone'
            ].filter(Boolean).map(cleanPromptText);
            const unique = [];
            elements.forEach(function (item) {
                if (item && !unique.includes(item)) unique.push(item);
            });
            while (unique.length < 2) unique.push(unique.length ? 'cinematic 35mm tone' : 'natural cinematic lighting');
            return cleanPromptText(unique.join(', '));
        }

        function buildConstraintPhrase() {
            return cleanPromptText(SEEDANCE_CONSTRAINTS);
        }

        function formatTimeSeconds(value) {
            const n = Math.round((parseFloat(value) || 0) * 10) / 10;
            return n.toFixed(1).replace(/\.0$/, '.0');
        }

        function formatShotTimecode(shot) {
            return formatTimeSeconds(shot.startTime) + 's → ' + formatTimeSeconds(shot.endTime) + 's';
        }

        function formatPromptTimecode(shot) {
            const fmt = value => {
                const n = Math.round((parseFloat(value) || 0) * 10) / 10;
                return Number.isInteger(n) ? String(n) : String(n);
            };
            return '(' + fmt(shot.startTime) + '-' + fmt(shot.endTime) + 's)';
        }

        function recalculateShotTimecodes() {
            let cursor = 0;
            seqState.shots.forEach(function (shot) {
                const duration = parseFloat(shot.duration) || 0;
                shot.startTime = Math.round(cursor * 10) / 10;
                cursor += duration;
                shot.endTime = Math.round(cursor * 10) / 10;
            });
        }

        function updateShotTimecodeLabels() {
            recalculateShotTimecodes();
            seqState.shots.forEach(function (shot, index) {
                const header = document.querySelector('#shot-card-' + shot.id + ' .shot-num');
                if (!header) return;
                const label = (shot.duration === 0 ? 'Still' : shot.duration + '초') + ' · ' + formatShotTimecode(shot);
                header.innerHTML = 'SHOT ' + String(index + 1).padStart(2, '0') + ' <span style="color:var(--acc);font-size:9px;font-weight:700;margin-left:6px;">' + label + '</span>';
            });
        }

        let shotIdCounter = 0;

        function createShotData() {
            shotIdCounter++;
            return {
                id: shotIdCounter,
                type: 'MS', lens: '50mm', movement: 'static', transition: 'hard cut to', action: '',
                sfx: [], locked: false, open: true, duration: 1.0,
                startTime: 0, endTime: 1.0,
                cameraStartPreset: '', cameraEndPreset: '',
                cameraStart: '', cameraEnd: '',
                cameraSpeed: 'slow', cameraEasing: 'gentle',
                startMovement: '', endMovement: '',
                startFrame: '', endFrame: '',
                motionIntensity: 1, gravity: 'standard', fxPreset: 'none',
                aperture: 'f/2 shallow depth of field', cameraSide: 'front view', cameraHeight: 'eye-level camera', cameraTilt: 'level horizon',
                timeFlow: 'normal', lensDistortion: 'none', seamless: false
            };
        }

        function getBpmBeats(bpm) {
            if (!bpm || bpm <= 0) return [];
            const beat = parseFloat((60 / bpm).toFixed(2));
            return [
                { label: '½비트', val: parseFloat((beat * 0.5).toFixed(1)) },
                { label: '1비트', val: parseFloat(beat.toFixed(1)) },
                { label: '2비트', val: parseFloat((beat * 2).toFixed(1)) },
                { label: '4비트', val: parseFloat((beat * 4).toFixed(1)) },
                { label: '8비트', val: parseFloat((beat * 8).toFixed(1)) },
            ];
        }

        function getTotalDuration() {
            recalculateShotTimecodes();
            return seqState.shots.reduce((sum, s) => sum + (parseFloat(s.duration) || 0), 0);
        }

        function updateTotalCounter() {
            const el = document.getElementById('total-duration-display');
            if (!el) return;
            const total = parseFloat(getTotalDuration().toFixed(1));
            const slider = document.getElementById('seq-duration-slider');
            const valEl = document.getElementById('val-duration');
            let target = parseFloat(slider?.value || 15);

            // 샷 합산이 목표 초과 → 목표 슬라이더 자동으로 따라감
            if (total > target && slider) {
                const newTarget = Math.min(30, total);
                slider.value = newTarget;
                state.format.duration = newTarget;
                target = newTarget;
                if (valEl) valEl.textContent = newTarget === 0 ? 'Still (스틸 이미지)' : newTarget + '초';
                buildSeqPrompt();
            }

            const diff = parseFloat(Math.abs(total - target).toFixed(1));
            const isMatch = diff === 0;
            const isOver = total > target;
            const isStill = target === 0 && total === 0;

            if (isStill) {
                el.innerHTML = '<span style="color:var(--acc);">✓ 스틸 이미지 모드</span>';
                return;
            }

            let statusHtml = '';
            if (isMatch) {
                statusHtml = '<span style="color:#4caf50;font-weight:700;">✓ 시간 딱 맞음!</span>';
            } else if (isOver) {
                statusHtml = '<span style="color:var(--red);font-weight:700;">⚠ 목표 시간 초과! ' + diff + '초 넘었습니다 → 목표 시간이 자동으로 맞춰졌습니다.</span>';
            } else {
                statusHtml = '<span style="color:var(--yellow);">⚠ 목표 시간보다 ' + diff + '초 짧습니다. 샷을 추가하거나 길이를 늘려주세요.</span>';
            }

            const longShots = seqState.shots.filter(s => (parseFloat(s.duration) || 0) > 5);
            const goldenWarn = longShots.length ? '<br><span style="font-size:10px;color:var(--yellow);">⚠ 5초 골든타임 경고: ' + longShots.length + '개 샷이 5초를 초과했습니다.</span>' : '';

            el.innerHTML =
                '총합: <span style="color:var(--acc);font-weight:700;">' + total + '초</span>' +
                ' / 목표: <span style="font-weight:700;">' + target + '초</span>' +
                '<br><span style="font-size:10px;">' + statusHtml + '</span>' + goldenWarn;
        }

        function ensureShotDefaults(shot) {
            if (!shot) return shot;
            if (shot.cameraStartPreset == null) shot.cameraStartPreset = '';
            if (shot.cameraEndPreset == null) shot.cameraEndPreset = '';
            if (shot.cameraStart == null) shot.cameraStart = shot.startMovement || '';
            if (shot.cameraEnd == null) shot.cameraEnd = shot.endMovement || '';
            if (!shot.cameraSpeed) shot.cameraSpeed = 'slow';
            if (!shot.cameraEasing) shot.cameraEasing = 'gentle';
            if (!shot.cameraTilt) shot.cameraTilt = 'level horizon';
            if (!shot.moodCluster) shot.moodCluster = '';
            if (shot.autoProApplied == null) shot.autoProApplied = false;
            if (!shot.proOverrides) shot.proOverrides = {};
            shot.proOverrides = { ...PRO_OVERRIDE_DEFAULTS, ...shot.proOverrides };
            if (!Array.isArray(shot.sfx)) shot.sfx = [];
            return shot;
        }
