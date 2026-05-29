const rhythmMap = {
            free: 'free cut',
            rhythmic: 'rhythmic cuts',
            beat: 'beat-synced cuts',
            slow: 'slow cinematic cuts'
        };

        const moodCameraMap = {
            tension: 'slow push-in, tight framing',
            anxiety: 'handheld, unstable camera',
            lonely: 'wide static shot',
            romantic: 'soft dolly, warm tone',
            epic: 'wide cinematic sweep',
            poetic: 'gentle drifting camera, lyrical framing',
            hopeful: 'slow rising camera, open framing',
            threat: 'low-angle pressure, creeping push-in',
            cold: 'static symmetrical framing, distant camera',
            dreamy: 'floating dolly, soft focus movement',
            fun: 'playful handheld bounce, lively framing',
            madness: 'erratic handheld, distorted dutch angles'
        };

        function bpmToText(bpm) {
            if (bpm < 80) return 'slow emotional pacing';
            if (bpm < 110) return 'moderate pacing';
            if (bpm < 140) return 'rhythmic pacing';
            return 'fast-cut high energy pacing';
        }

        function buildFormatBlock(state) {
            return `[FORMAT]\n${state.format.aspectRatio}, ${state.format.duration}s total duration, ${state.format.bpm} BPM ${bpmToText(state.format.bpm)}, ${rhythmMap[state.format.rhythm] || rhythmMap.rhythmic}`;
        }

        function validateDuration(shots, total) {
            const sum = shots.reduce((a, s) => a + (parseFloat(s.duration) || 0), 0);
            if (sum > total) {
                console.warn('Shot duration exceeds total duration');
            }
        }

        function buildSoundBlock(state) {
            return `[SOUND]\n${state.bgm || ''}, ${state.ambient || ''}`;
        }

        let _buildSeqPromptTimer = null;

        function buildSeqPrompt() {
            if (_buildSeqPromptTimer !== null) return;
            _buildSeqPromptTimer = setTimeout(() => {
                _buildSeqPromptTimer = null;
                _buildSeqPromptImpl();
            }, 0);
        }

        function _buildSeqPromptImpl() {
            seqState.shots.forEach(ensureShotDefaults);
            recalculateShotTimecodes();
            const get = id => document.getElementById(id);
            const durationSec = String(state.format.duration ?? get('seq-duration-slider')?.value ?? '15');
            const isStill = durationSec === '0';
            const duration = isStill ? 'Still Image' : durationSec + 's';
            const bpm = String(state.format.bpm ?? get('seq-bpm-slider')?.value ?? '120');
            const shotCount = seqState.shots.length || 1;
            const beatSync = rhythmMap[state.format.rhythm] || 'rhythmic cuts';
            const subjectMode = get('seq-subject-mode')?.value || 'image_ref';
            const wardrobe = get('seq-wardrobe')?.value?.trim() || '';
            const environment = get('seq-environment')?.value?.trim() || '';
            const mood = [state.mood.preset, state.mood.detail || get('seq-mood')?.value?.trim() || ''].filter(Boolean).join(', ');
            const colorVal = get('seq-color')?.value || state.color.preset || '';
            const legacyColorCustom = get('seq-color-custom')?.value?.trim() || '';
            const colorCustom = state.color.custom || get('colorCustom')?.value?.trim() || legacyColorCustom;
            state.color.preset = colorVal === 'Custom' ? legacyColorCustom : colorVal;
            state.color.custom = colorCustom;
            let colorLine = '';
            if (state.color.custom) {
                colorLine = state.color.custom;
            } else {
                colorLine = state.color.preset;
            }
            const style = get('seq-style')?.value || 'Ultra-Realistic';
            const bgmVal = get('seq-bgm')?.value || '';
            const bgmCustom = get('seq-bgm-custom')?.value?.trim() || '';
            const bgm = bgmVal === 'Custom' ? bgmCustom : bgmVal;
            const ambientVal = get('seq-ambient')?.value || '';
            const ambientCustom = get('seq-ambient-custom')?.value?.trim() || '';
            const ambient = ambientVal === 'Custom' ? ambientCustom : ambientVal;
            state.bgm = bgm;
            state.ambient = ambient;

            let subjectLine = '';
            if (subjectMode === 'image_ref') {
                subjectLine = '@[image1] < ATTACH YOUR IMAGE.';
            } else if (subjectMode === 'char_tab') {
                const gd = genderLabel(state.gender);
                const ageEntry = getAge(state.age);
                subjectLine = state.age + '-year-old ' + ageEntry[3] + ', ' + gd.en + (state.name ? ', ' + state.name.toUpperCase() : '');
            } else {
                subjectLine = get('seq-subject-text')?.value?.trim() || '@[image1]';
            }

            const stageAtmospherics = [
                LIGHTING_PROMPTS[seqState.lighting] || '',
                PARTICLE_PROMPTS[seqState.particle] || '',
                getPlatformBoost(seqState.platform)
            ].filter(Boolean);

            const platform = seqState.platform;
            const references = buildReferencePhrase();
            const promptData = {
                subject: cleanPromptText([references, subjectLine].filter(Boolean).join(', ')),
                wardrobe,
                environment,
                mood,
                color: colorLine,
                style,
                lighting: LIGHTING_PROMPTS[seqState.lighting] || '',
                particle: PARTICLE_PROMPTS[seqState.particle] || '',
                platformBoost: getPlatformBoost(platform),
                motionSpeed: seqState.motionSpeed,
                firstLens: seqState.shots[0]?.lens || '35mm',
                shots: seqState.shots
            };
            const soundBlock = buildSoundBlock(state).replace('[SOUND]\n', '');
            validateDuration(seqState.shots, parseFloat(durationSec) || 0);

            const formatBlock = buildFormatBlock(state).replace('[FORMAT]\n', '');
            let cameraLine = '';
            if (!state.mood.preset) {
                cameraLine = 'natural, neutral camera behavior';
            } else {
                cameraLine = `${moodCameraMap[state.mood.preset] || 'natural, neutral camera behavior'}`;
            }

            if (state.mood.detail) {
                cameraLine += `, ${state.mood.detail}`;
            }
            const promptBlocks = [
                { key: 'FORMAT', label: 'FORMAT', value: formatBlock },
                { key: 'SUBJECT', label: 'SUBJECT', value: buildSubjectPhrase(promptData) },
                { key: 'ACTION', label: 'ACTION', value: cleanPromptText([buildActionPhrase(promptData), seqState.motionSpeed === 'slow' ? 'slow, gentle motion throughout' : ''].filter(Boolean).join(', ')) },
                { key: 'CAMERA', label: 'CAMERA', value: cleanPromptText([cameraLine, buildCameraPhrase(promptData)].filter(Boolean).join(', ')) },
                { key: 'STYLE', label: 'STYLE', value: buildStylePhrase(promptData) },
                { key: 'SOUND', label: 'SOUND', value: soundBlock },
                { key: 'CONSTRAINTS', label: 'CONSTRAINTS', value: cleanPromptText([seqState.logicRule ? 'logical consistency in wardrobe, props, locations, and action continuity' : '', buildConstraintPhrase()].filter(Boolean).join(', ')) }
            ].filter(block => block.value);
            const compilerOut = document.getElementById('compiler-output');
            const termShots = document.getElementById('term-shots');
            const termEngine = document.getElementById('term-engine');
            // 필수 고정 항목: 캐릭터 일관성 + 렌더 품질
            const fixedSuffix = `${SUBJECT_STABILITY_RULE}. ${SEEDANCE_CONSTRAINTS}`;
            const rawOut = promptBlocks.map(block => '[' + block.label + '] ' + block.value).join('\n') + '\n' + fixedSuffix;
            latestSequencePromptRaw = rawOut;
            if (compilerOut) {
                renderHighlightedBlocks('compiler-output', promptBlocks, prevSeqBlocks);
                highlightChangedBlocks(getSequenceChanged(getSequenceHighlightState()), soundBlock);
                prevSeqBlocks = promptBlocks.reduce((acc, block) => {
                    acc[block.key] = block.value;
                    return acc;
                }, {});
            }
            if (termShots) termShots.textContent = seqState.shots.length;
            if (termEngine) termEngine.textContent = platform === 'seedance' ? '씨댄스 2.0' : platform === 'kling' ? '클링 3.0' : platform === 'higgsfield' ? '힉스필드' : '베오 3.1';
        }

        function copySeqPrompt() {
            const raw = latestSequencePromptRaw || '';
            if (!raw) return;
            navigator.clipboard.writeText(raw).then(() => {
                const btn = document.getElementById('btn-copy-seq');
                if (btn) {
                    const orig = btn.innerHTML;
                    btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;color:#00363d;">check</span>복사됨!';
                    setTimeout(() => { btn.innerHTML = orig; }, 2000);
                }
            });
        }
