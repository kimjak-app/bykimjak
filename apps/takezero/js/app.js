function generatePrompt() {
            if (state.view === 'image') return generateImagePrompt();
            return generateCharacterStagePrompt();
        }

        const rhythmDescMap = {
            free: '자연스럽고 자유로운 컷 연결',
            rhythmic: '리듬감 있는 규칙적인 컷 전환',
            beat: '음악 비트에 맞춘 컷 편집',
            slow: '천천히 호흡하는 시네마틱 전환'
        };

        function compilePrompt(appState) {
            if (appState.view === 'sequence') {
                buildSeqPrompt();
                return latestSequencePromptRaw;
            }
            return generatePrompt();
        }

        function renderPrompt(prompt) {
            if (state.view === 'sequence') return;
            updatePrompt();
        }

        function compileAndRender() {
            const prompt = compilePrompt(state);
            renderPrompt(prompt);
        }

        function updatePrompt() {
            const s = state;
            const prompt = generatePrompt();
            const gd = genderLabel(s.gender);
            const ageEntry = getAge(s.age);
            const isFemale = s.gender > 60;
            const raceText = [s.race.tier1, s.race.tier2, s.race.tier3].filter(Boolean).join(' > ') || '미선택';
            const mixText = s.activeMix ? `혼혈(${s.activeMix.toUpperCase()}) ${s.race['mix' + s.activeMix.toUpperCase()]}%` : '없음';

            let rows = [];

            if (state.view === 'character') {
                const persRows = s.personality.map((ko, i) => `성격.${i + 1} = <span class="acc">"${ko}"</span>`);
                const voiceRows = s.voice.map((ko, i) => `음성.${i + 1} = <span class="acc">"${ko}"</span>`);
                rows = [
                    `화면사이즈 = <span class="acc">"${s.outputFrame}"</span>`,
                    s.name ? `이름 = <span class="acc">"${s.name.toUpperCase()}"</span>` : null,
                    `성별 = <span class="acc">"${gd.ko}"</span>`,
                    `나이 = <span class="acc">${s.age}세 (${ageEntry[2]})</span>`,
                    s.race.tier1 ? `인종 = <span class="acc">"${raceText}"</span>` : null,
                    s.activeMix ? `혼혈 = <span class="acc">"${mixText}"</span>` : null,
                    s.eyeColor ? `눈색상 = <span class="acc">"${s.eyeColor}"</span>` : null,
                    isFemale && s.bustSize ? `가슴 = <span class="acc">"${s.bustSize}"</span>` : null,
                    s.heightTouched ? `신장 = <span class="acc">${s.height}cm</span>` : null,
                    s.hairColor ? `머리색상 = <span class="acc">"${s.hairColor}"</span>` : null,
                    s.hairStyle ? `헤어스타일 = <span class="acc">"${s.hairStyle}"</span>` : null,
                    (Array.isArray(s.skinTexture) && s.skinTexture.length) ? `피부질감 = <span class="acc">"${s.skinTexture.join(', ')}"</span>` : null,
                    ...persRows, ...voiceRows,
                    `시트비율 = <span class="acc">"${s.charSheetFrame}"</span>`,
                    s.attire.tier3 ? `의상 = <span class="acc">"${s.attire.tier3}"</span>` : null,
                    s.attire.shoes ? `신발 = <span class="acc">"${s.attire.shoes}"</span>` : null
                ].filter(Boolean);
            } else if (state.view === 'image') {
                const atmosList = Array.isArray(s.imageAtmosphere) ? s.imageAtmosphere : [];
                rows = [
                    `화면사이즈 = <span class="acc">"${s.outputFrame}"</span>`,
                    `캐릭터연동 = <span class="acc">"${s.imageUseCharacter ? 'ON' : 'OFF'}"</span>`,
                    s.imageSubject ? `SUBJECT = <span class="acc">"${s.imageSubject}"</span>` : null,
                    s.imageComposition ? `COMPOSITION = <span class="acc">"${s.imageComposition}"</span>` : null,
                    s.imageLocationTier3 ? `LOCATION = <span class="acc">"${s.imageLocationTier3}"</span>` : null,
                    atmosList.length ? `ATMOSPHERE = <span class="acc">"${atmosList.join(', ')}"</span>` : null,
                    s.imageMood ? `MOOD = <span class="acc">"${s.imageMood}"</span>` : null,
                    s.imageStyle ? `STYLE = <span class="acc">"${s.imageStyle}"</span>` : null,
                    s.imageLighting ? `LIGHTING = <span class="acc">"${s.imageLighting}"</span>` : null,
                    s.imageColorTone ? `COLOR TONE = <span class="acc">"${s.imageColorTone}"</span>` : null,
                    s.imageLens ? `렌즈 = <span class="acc">"${s.imageLens}"</span>` : null,
                    s.imageAperture ? `조리개 = <span class="acc">"${s.imageAperture}"</span>` : null
                ].filter(Boolean);
            } else {
                rows = [
                    `화면사이즈 = <span class="acc">"${s.outputFrame}"</span>`,
                    `상태 = <span class="acc">"SEQUENCE_MODE"</span>`,
                    `시퀀스 탭에서 별도 프롬프트 엔진이 동작합니다.`
                ];
            }

            renderHighlightedLines('prompt-vars', rows, prevPromptVarsRows, (line, cls) => `<div class="${cls}"><span class="yel">SET</span> ${line};</div>`);
            prevPromptVarsRows = [...rows];

            const promptEl = document.getElementById('prompt-text');
            if (promptEl) {
                const promptLines = splitPromptToLines(`"${prompt}"`);
                renderHighlightedLines('prompt-text', promptLines, prevPromptTextLines, (line, cls) => `<div class="${cls}">${escapeHtml(line)}</div>`);
                prevPromptTextLines = [...promptLines];
                promptEl.classList.remove('fade-up');
                void promptEl.offsetWidth;
                promptEl.classList.add('fade-up');
            }
            prevPromptTextRaw = prompt;
        }

        /* ══════════════════════════════════════════
           UI RENDERERS
        ══════════════════════════════════════════ */

function initImageSingleChoice(selector, stateKey, guideMap, guideElId) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll(selector).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state[stateKey] = btn.dataset[stateKey.replace(/[A-Z]/g, m => '-' + m.toLowerCase())] || btn.getAttribute('data-' + stateKey.replace(/[A-Z]/g, m => '-' + m.toLowerCase()));
            if (guideMap && guideElId) {
                const el = document.getElementById(guideElId);
                if (el) el.textContent = guideMap[state[stateKey]] || '';
            }
            state.imagePreset = 'manual_custom';
            const guide = document.getElementById('image-preset-guide');
            if (guide) guide.textContent = '수동 커스텀 — 프리셋을 벗어나 직접 조합한 이미지 세팅입니다.';
            updatePrompt();
        });
    });
}

function syncImageControls() {
    document.querySelectorAll('#image-preset-grid .preset-card').forEach(btn => btn.classList.toggle('active', btn.dataset.imagePreset === state.imagePreset));
    const presetGuide = document.getElementById('image-preset-guide');
    if (presetGuide && IMAGE_PRESET_DATA[state.imagePreset]) presetGuide.textContent = IMAGE_PRESET_DATA[state.imagePreset].guide;
    document.querySelectorAll('.image-comp-chip').forEach(btn => btn.classList.toggle('active', btn.dataset.imageComposition === state.imageComposition));
    document.querySelectorAll('.image-mood-chip').forEach(btn => btn.classList.toggle('active', btn.dataset.imageMood === state.imageMood));
    document.querySelectorAll('.image-style-chip').forEach(btn => btn.classList.toggle('active', btn.dataset.imageStyle === state.imageStyle));
    document.querySelectorAll('.image-lighting-chip').forEach(btn => btn.classList.toggle('active', btn.dataset.imageLighting === state.imageLighting));
    document.querySelectorAll('.image-atmosphere-chip').forEach(btn => btn.classList.toggle('active', btn.dataset.imageAtmosphere === state.imageAtmosphere));
    const cg = document.getElementById('image-composition-guide');
    if (cg) cg.textContent = IMAGE_COMPOSITION_GUIDE[state.imageComposition] || '';
    const map = {
        'image-lens':'imageLens',
        'image-aperture':'imageAperture',
        'image-camera-side':'imageCameraSide',
        'image-camera-height':'imageCameraHeight',
        'image-camera-tilt':'imageCameraTilt',
        'image-lens-distortion':'imageLensDistortion'
    };
    Object.entries(map).forEach(([id,key]) => {
        const el = document.getElementById(id);
        if (el) el.value = state[key];
    });
}

document.addEventListener('DOMContentLoaded', () => {
            const appVersionEl = document.getElementById('appVersion');
            if (appVersionEl) appVersionEl.innerText = APP_VERSION;
            document.title = `TakeZero v${APP_VERSION}`;

            // Main Nav
            document.querySelectorAll('.main-nav-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.main-nav-btn').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.main-view').forEach(v => v.classList.remove('active'));
                    btn.classList.add('active');
                    const targetId = btn.getAttribute('data-target');
                    document.getElementById(targetId).classList.add('active');
                    state.view = targetId.replace('view-', '');
                    updateTerminalView();
                });
            });

            // Character Sub Tabs
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.tab-panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
                    btn.classList.add('active');
                    const panel = document.getElementById('tab-' + btn.dataset.tab);
                    if (panel) { panel.classList.add('active'); panel.style.display = 'flex'; panel.style.flexDirection = 'column'; panel.style.gap = '24px'; }
                });
            });
            // 초기 탭: 프로필만 보이게
            document.querySelectorAll('.tab-panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
            const firstTabBtn = document.querySelector('.tab-btn');
            if (firstTabBtn) firstTabBtn.click();

            // Stage Mode Switch
            const modeLoc = document.getElementById('mode-loc');
            const modeSet = document.getElementById('mode-set');
            if (modeLoc && modeSet) {
                modeLoc.addEventListener('click', () => { state.stageMode = 'location'; modeLoc.classList.add('active'); modeSet.classList.remove('active'); renderStageParams(); updatePrompt(); });
                modeSet.addEventListener('click', () => { state.stageMode = 'set'; modeSet.classList.add('active'); modeLoc.classList.remove('active'); renderStageParams(); updatePrompt(); });
            }

            // Basic Sliders
            const gSlider = document.getElementById('slider-gender');
            if (gSlider) {
                gSlider.addEventListener('input', () => {
                    const v = parseFloat(gSlider.value); state.gender = v;
                    document.getElementById('val-gender').textContent = genderLabel(v).ko;
                    const bp = document.getElementById('bust-panel');
                    if (v > 60) { bp.classList.add('open'); } else { bp.classList.remove('open'); }
                    const isFemale = v > 60; const catData = ATTIRE_DATA[state.attire.category];
                    if ((catData.condition === 'female' && !isFemale) || (catData.condition === 'male' && isFemale)) {
                        state.attire.category = '아우터'; state.attire.item = ATTIRE_DATA['아우터'].items[0].n;
                        if (state.attire.materialMode === 'auto') state.attire.material = ATTIRE_DATA['아우터'].items[0].dm;
                    }
                    renderL1(); renderL2(); renderL3(); renderL4(); updatePrompt();
                });
            }

            const aSlider = document.getElementById('slider-age');
            if (aSlider) aSlider.addEventListener('input', () => { const v = parseFloat(aSlider.value); state.age = v; const e = getAge(v); document.getElementById('val-age').textContent = `${v}세 (${e[2]})`; updatePrompt(); });

            // Race
            // 인종 3단계 UI
            function renderRaceTier1() {
                const c = document.getElementById('race-tier1-chips'); if (!c) return; c.innerHTML = '';
                RACE_TIER1.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.race.tier1 === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        if (state.race.tier1 === item.ko) {
                            state.race.tier1 = ''; state.race.tier2 = ''; state.race.tier3 = '';
                        } else {
                            state.race.tier1 = item.ko; state.race.tier2 = ''; state.race.tier3 = '';
                        }
                        renderRaceTier1(); renderRaceTier2(); renderRaceTier3(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }

            function renderRaceTier2() {
                const wrap = document.getElementById('race-tier2-wrap');
                const c = document.getElementById('race-tier2-chips');
                const label = document.getElementById('race-tier2-label');
                if (!wrap || !c) return;
                if (!state.race.tier1) { wrap.style.display = 'none'; return; }
                const key = state.race.tier1 === '동양인' ? 'eastern' : state.race.tier1 === '백인/라틴' ? 'caucasian' : 'black';
                const items = RACE_TIER2[key] || [];
                wrap.style.display = 'block';
                if (label) label.textContent = state.race.tier1 + ' — 지역 선택';
                c.innerHTML = '';
                items.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.race.tier2 === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        if (state.race.tier2 === item.ko) {
                            state.race.tier2 = ''; state.race.tier3 = '';
                        } else {
                            state.race.tier2 = item.ko;
                            // 자동 선택: 첫 번째 프리셋
                            const presets = RACE_TIER3[item.ko] || [];
                            state.race.tier3 = presets.length ? presets[0].ko : '';
                        }
                        renderRaceTier2(); renderRaceTier3(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }

            function renderRaceTier3() {
                const wrap = document.getElementById('race-tier3-wrap');
                const c = document.getElementById('race-tier3-chips');
                const label = document.getElementById('race-tier3-label');
                if (!wrap || !c) return;
                const presets = RACE_TIER3[state.race.tier2] || [];
                if (!state.race.tier2 || presets.length === 0) { wrap.style.display = 'none'; return; }
                wrap.style.display = 'block';
                if (label) label.textContent = state.race.tier2 + ' — 세부 프리셋';
                c.innerHTML = '';
                presets.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.race.tier3 === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        state.race.tier3 = state.race.tier3 === item.ko ? '' : item.ko;
                        renderRaceTier3(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }

            renderRaceTier1(); renderRaceTier2(); renderRaceTier3();

            // Mix sliders
            ['ca', 'ba', 'cb'].forEach(key => {
                const sl = document.getElementById(`slider-mix-${key}`);
                if (sl) sl.addEventListener('input', () => {
                    const v = parseFloat(sl.value); state.race[`mix${key.toUpperCase()}`] = v;
                    document.getElementById(`val-mix-${key}`).textContent = v + '%';
                    document.getElementById(`bar-mix-${key}`).style.width = v + '%';
                    if (v > 0) { state.activeMix = key; updateMixLock(key); }
                    else if (state.activeMix === key) { state.activeMix = null; ['ca', 'ba', 'cb'].forEach(k => { const el = document.getElementById(`slider-mix-${k}`); if (el) el.disabled = false; }); }
                    updatePrompt();
                });
            });
            const btnMixR = document.getElementById('btn-mix-reset');
            if (btnMixR) btnMixR.addEventListener('click', () => {
                state.activeMix = null; state.race.mixCA = 0; state.race.mixBA = 0; state.race.mixCB = 0;
                ['ca', 'ba', 'cb'].forEach(k => { const s = document.getElementById(`slider-mix-${k}`); if (s) { s.value = 0; s.disabled = false; document.getElementById(`val-mix-${k}`).textContent = '0%'; document.getElementById(`bar-mix-${k}`).style.width = '0%'; } });
                updatePrompt();
            });

            // Body
            const fatSl = document.getElementById('slider-fat'); const musSl = document.getElementById('slider-muscle');
            const hSl = document.getElementById('slider-height');

            // 미터치 슬라이더 흐리게 처리 함수
            function setSliderTouched(valId, touched) {
                const el = document.getElementById(valId);
                if (el) el.style.opacity = touched ? '1' : '0.35';
            }

            // 초기 흐리게
            ['val-height', 'val-fat', 'val-muscle', 'val-head', 'val-torsoleg', 'val-shoulder', 'val-roundness'].forEach(id => setSliderTouched(id, false));

            if (hSl) hSl.addEventListener('input', e => {
                state.height = parseFloat(e.target.value);
                state.heightTouched = true;
                document.getElementById('val-height').textContent = state.height + 'cm';
                setSliderTouched('val-height', true);
                updatePrompt();
            });
            if (fatSl) fatSl.addEventListener('input', () => {
                const fat = parseFloat(fatSl.value); state.bodyFat = fat;
                state.bodyFatTouched = true; state.muscleTouched = true;
                document.getElementById('val-fat').textContent = fat + '%';
                setSliderTouched('val-fat', true);
                const floor = Math.round(Math.max(0, 100 - fat * 2.2));
                if (state.muscle < floor) { state.muscle = floor; if (musSl) musSl.value = floor; document.getElementById('val-muscle').textContent = floor + '%'; }
                setSliderTouched('val-muscle', true);
                updatePrompt();
            });
            if (musSl) musSl.addEventListener('input', () => {
                state.muscle = parseFloat(musSl.value);
                state.muscleTouched = true;
                document.getElementById('val-muscle').textContent = state.muscle + '%';
                setSliderTouched('val-muscle', true);
                updatePrompt();
            });
            const rndSl = document.getElementById('slider-roundness');
            if (rndSl) rndSl.addEventListener('input', e => {
                state.roundness = parseFloat(e.target.value);
                state.roundnessTouched = true;
                document.getElementById('val-roundness').textContent = state.roundness + '%';
                setSliderTouched('val-roundness', true);
                updatePrompt();
            });

            [{ k: 'head', sk: 'headSize', tk: 'headSizeTouched', fmt: v => (v / 100).toFixed(2) + 'x' },
             { k: 'torsoleg', sk: 'torsoLeg', tk: 'torsoLegTouched', fmt: v => `${100 - v}/${v}` },
             { k: 'shoulder', sk: 'shoulder', tk: 'shoulderTouched', fmt: v => (v / 100).toFixed(2) + 'x' }
            ].forEach(({ k, sk, tk, fmt }) => {
                const sl = document.getElementById(`slider-${k}`);
                if (sl) {
                    sl.addEventListener('input', () => {
                        state[sk] = parseFloat(sl.value);
                        state[tk] = true;
                        document.getElementById(`val-${k}`).textContent = fmt(parseFloat(sl.value));
                        setSliderTouched(`val-${k}`, true);
                        updatePrompt();
                    });
                    document.getElementById(`val-${k}`).textContent = fmt(parseFloat(sl.value));
                }
            });

            // Chips Init
            makeChips('bust-chips', BUST_SIZES, 'bustSize', true);
            makeChips('face-shape-group', FACE_SHAPES, 'faceShape');
            makeChips('forehead-group', FOREHEAD_SHAPES, 'foreheadShape');
            makeChips('hair-style-group', HAIR_STYLES, 'hairStyle');
            makeChips('hair-color-group', HAIR_COLORS, 'hairColor', true);
            makeChips('skin-texture-group', SKIN_TEXTURES, 'skinTexture', false, 3);
            makeChips('eye-shape-group', EYE_SHAPES, 'eyeShape');
            makeChips('eyebrow-group', EYEBROW_SHAPES, 'eyebrowShape');
            makeChips('nose-group', NOSE_SHAPES, 'noseShape');
            makeChips('lip-group', LIP_SHAPES, 'lipShape');
            makeChips('eye-color-chips', EYE_COLORS, 'eyeColor', true);
            makeChips('prop-chips', STAGE_PROPS, 'props');

            buildChipUI('personality-chips-container', PERSONALITY_GROUPS, state.personality, PERSONALITY_CONFLICTS, 3, 'personality-counter');
            buildChipUI('voice-chips-container', VOICE_GROUPS, state.voice, VOICE_CONFLICTS, 2, 'voice-counter');

            renderL1(); renderL2(); renderL3(); renderL4(); renderStageParams();

            // Global OUTPUT FRAME
            function syncGeneralFrameUI() {
                document.querySelectorAll('.general-frame-chip').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.frame === state.outputFrame);
                });
                const info = OUTPUT_FRAME_DATA[state.outputFrame] || OUTPUT_FRAME_DATA['16:9'];
                document.querySelectorAll('.general-frame-guide').forEach(guide => {
                    guide.innerHTML = '<strong style="color:var(--acc-hi);">' + info.title + '</strong> — ' + info.guide;
                });
            }

            function syncCharSheetFrameUI() {
                document.querySelectorAll('.char-sheet-chip').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.charSheetFrame === state.charSheetFrame);
                });
                const info = OUTPUT_FRAME_DATA[state.charSheetFrame] || OUTPUT_FRAME_DATA['16:9'];
                document.querySelectorAll('.character-sheet-guide').forEach(guide => {
                    let desc = info.guide;
                    if (state.charSheetFrame === '16:9') desc = '캐릭터 레퍼런스 시트 기본 비율. 전신과 디테일 컷을 함께 배치하기 좋습니다.';
                    if (state.charSheetFrame === '4:3') desc = '안정적인 시트 비율. 전신과 얼굴 디테일을 차분하게 정리하기 좋습니다.';
                    if (state.charSheetFrame === '7:5') desc = '인스타형 캐릭터 시트 비율. 세로 느낌을 살리면서도 시트 구성이 답답하지 않습니다.';
                    guide.innerHTML = '<strong style="color:var(--acc-hi);">' + info.title + '</strong> — ' + desc;
                });
            }

            document.querySelectorAll('.general-frame-chip').forEach(btn => {
                btn.addEventListener('click', () => {
                    state.outputFrame = btn.dataset.frame;
                    state.format.aspectRatio = btn.dataset.aspect || btn.dataset.frame;
                    syncGeneralFrameUI();
                    compileAndRender();
                });
            });

            document.querySelectorAll('.char-sheet-chip').forEach(btn => {
                btn.addEventListener('click', () => {
                    state.charSheetFrame = btn.dataset.charSheetFrame;
                    syncCharSheetFrameUI();
                    updatePrompt();
                });
            });

            syncGeneralFrameUI();
            syncCharSheetFrameUI();

            // IMAGE engine controls
            const imageSubjectEl = document.getElementById('image-subject');
            if (imageSubjectEl) imageSubjectEl.addEventListener('input', e => { state.imageSubject = e.target.value; updatePrompt(); });

            // 단일 선택 칩 (composition/mood/style/lighting)
            function initImageSingleChoice(selector, stateKey, guideMap, guideElId) {
                document.querySelectorAll(selector).forEach(btn => {
                    btn.addEventListener('click', () => {
                        const val = btn.dataset[stateKey.replace(/[A-Z]/g, m => '-' + m.toLowerCase())] || btn.getAttribute('data-' + stateKey.replace(/[A-Z]/g, m => '-' + m.toLowerCase()));
                        if (state[stateKey] === val) {
                            state[stateKey] = '';
                            document.querySelectorAll(selector).forEach(b => b.classList.remove('active'));
                        } else {
                            document.querySelectorAll(selector).forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                            state[stateKey] = val;
                        }
                        if (guideMap && guideElId) {
                            const el = document.getElementById(guideElId);
                            if (el) { el.textContent = state[stateKey] ? (guideMap[state[stateKey]] || '') : ''; el.style.display = state[stateKey] ? 'block' : 'none'; }
                        }
                        updatePrompt();
                    });
                });
            }
            initImageSingleChoice('.image-comp-chip', 'imageComposition', IMAGE_COMPOSITION_GUIDE, 'image-composition-guide');
            initImageSingleChoice('.image-mood-chip', 'imageMood');
            initImageSingleChoice('.image-style-chip', 'imageStyle');
            initImageSingleChoice('.image-lighting-chip', 'imageLighting');

            // ATMOSPHERE — 복수선택 (최대 3) + 충돌 방지
            function renderAtmosphereChips() {
                const c = document.getElementById('image-atmosphere-chips'); if (!c) return; c.innerHTML = '';
                const selected = Array.isArray(state.imageAtmosphere) ? state.imageAtmosphere : [];
                const conflicted = new Set();
                selected.forEach(ko => { (ATMOSPHERE_CONFLICTS[ko] || []).forEach(x => conflicted.add(x)); });
                const maxed = selected.length >= 3;
                ATMOSPHERE_ITEMS.forEach(item => {
                    const btn = document.createElement('button');
                    const isActive = selected.includes(item.ko);
                    const isConflict = conflicted.has(item.ko) && !isActive;
                    const isDisabled = (maxed && !isActive) || isConflict;
                    btn.className = 'chip' + (isActive ? ' active' : '') + (isDisabled ? ' disabled' : '');
                    btn.textContent = item.ko;
                    if (isDisabled) btn.style.opacity = '0.35';
                    btn.addEventListener('click', () => {
                        if (isDisabled) return;
                        if (!Array.isArray(state.imageAtmosphere)) state.imageAtmosphere = [];
                        const idx = state.imageAtmosphere.indexOf(item.ko);
                        if (idx > -1) state.imageAtmosphere.splice(idx, 1);
                        else if (state.imageAtmosphere.length < 3) state.imageAtmosphere.push(item.ko);
                        renderAtmosphereChips(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }
            renderAtmosphereChips();

            // LOCATION 3단계 UI
            function renderLocTier1() {
                const c = document.getElementById('image-loc-tier1'); if (!c) return; c.innerHTML = '';
                LOCATION_TIER1.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.imageLocationTier1 === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        state.imageLocationTier1 = state.imageLocationTier1 === item.ko ? '' : item.ko;
                        state.imageLocationTier2 = ''; state.imageLocationTier3 = '';
                        renderLocTier1(); renderLocTier2(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }

            function renderLocTier2() {
                const wrap = document.getElementById('image-loc-tier2-wrap');
                const c = document.getElementById('image-loc-tier2');
                const label = document.getElementById('image-loc-tier2-label');
                if (!wrap || !c) return;
                if (!state.imageLocationTier1) { wrap.style.display = 'none'; document.getElementById('image-loc-tier3-wrap').style.display = 'none'; return; }
                const key = LOCATION_TIER1.find(x => x.ko === state.imageLocationTier1)?.key || '';
                const items = LOCATION_TIER2[key] || [];
                wrap.style.display = 'block';
                if (label) label.textContent = state.imageLocationTier1 + ' — 선택';
                c.innerHTML = '';
                items.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.imageLocationTier2 === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        state.imageLocationTier2 = state.imageLocationTier2 === item.ko ? '' : item.ko;
                        state.imageLocationTier3 = '';
                        renderLocTier2(); renderLocTier3(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
                renderLocTier3();
            }

            function renderLocTier3() {
                const wrap = document.getElementById('image-loc-tier3-wrap');
                const c = document.getElementById('image-loc-tier3');
                const label = document.getElementById('image-loc-tier3-label');
                if (!wrap || !c) return;
                const items = LOCATION_TIER3[state.imageLocationTier2] || [];
                if (!state.imageLocationTier2 || !items.length) { wrap.style.display = 'none'; return; }
                wrap.style.display = 'block';
                if (label) label.textContent = state.imageLocationTier2 + ' — 세부 선택';
                c.innerHTML = '';
                items.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.imageLocationTier3 === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        state.imageLocationTier3 = state.imageLocationTier3 === item.ko ? '' : item.ko;
                        renderLocTier3(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }

            renderLocTier1(); renderLocTier2();

            // 캐릭터 연동 토글
            const charToggleBtn = document.getElementById('image-char-toggle');
            function updateCharToggleUI() {
                if (!charToggleBtn) return;
                const on = state.imageUseCharacter;
                charToggleBtn.textContent = on ? 'ON' : 'OFF';
                charToggleBtn.style.background = on ? 'var(--acc)' : 'transparent';
                charToggleBtn.style.color = on ? '#00363d' : 'var(--text-dim)';
                charToggleBtn.style.borderColor = on ? 'var(--acc)' : 'var(--border)';
                // 안내문 표시/숨김
                const guide = document.getElementById('image-subject-guide');
                if (guide) guide.style.display = on ? 'block' : 'none';
                // placeholder 동적 변경
                const subjectEl = document.getElementById('image-subject');
                if (subjectEl) subjectEl.placeholder = on
                    ? '예: 눈물을 흘리고 있는, 뒷모습으로, 손만 클로즈업'
                    : '예: 빗속 골목에서 우산 없이 서 있는 젊은 여성, 손에 오래된 필름카메라';
            }
            if (charToggleBtn) {
                charToggleBtn.addEventListener('click', () => {
                    state.imageUseCharacter = !state.imageUseCharacter;
                    updateCharToggleUI();
                    updatePrompt();
                });
            }
            updateCharToggleUI();

            // 색감/톤 칩
            function renderColorToneChips() {
                const c = document.getElementById('image-colortone-chips'); if (!c) return; c.innerHTML = '';
                COLOR_TONES.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.imageColorTone === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        state.imageColorTone = state.imageColorTone === item.ko ? '' : item.ko;
                        renderColorToneChips(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }
            renderColorToneChips();

            // 이미지 프리셋
            document.querySelectorAll('#image-preset-grid .preset-card').forEach(btn => {
                btn.addEventListener('click', () => {
                    const key = btn.dataset.imagePreset;
                    const preset = IMAGE_PRESET_DATA[key];
                    if (!preset) return;
                    state.imagePreset = key;
                    state.imageComposition = preset.composition;
                    state.imageMood = preset.mood;
                    state.imageStyle = preset.style;
                    state.imageLighting = preset.lighting;
                    state.imageAtmosphere = preset.atmosphere ? [preset.atmosphere] : [];
                    document.querySelectorAll('#image-preset-grid .preset-card').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    document.querySelectorAll('.image-comp-chip').forEach(b => b.classList.toggle('active', b.dataset.imageComposition === state.imageComposition));
                    document.querySelectorAll('.image-mood-chip').forEach(b => b.classList.toggle('active', b.dataset.imageMood === state.imageMood));
                    document.querySelectorAll('.image-style-chip').forEach(b => b.classList.toggle('active', b.dataset.imageStyle === state.imageStyle));
                    document.querySelectorAll('.image-lighting-chip').forEach(b => b.classList.toggle('active', b.dataset.imageLighting === state.imageLighting));
                    renderAtmosphereChips();
                    updatePrompt();
                });
            });

            // 카메라 설정 select
            [['image-lens','imageLens'],['image-aperture','imageAperture'],['image-camera-side','imageCameraSide'],['image-camera-height','imageCameraHeight'],['image-camera-tilt','imageCameraTilt'],['image-lens-distortion','imageLensDistortion']].forEach(([id,key]) => {
                const el = document.getElementById(id);
                if (el) el.addEventListener('change', e => { state[key] = e.target.value; updatePrompt(); });
            });


            // Texts
            const bEx = document.getElementById('body-extra'); if (bEx) bEx.addEventListener('input', e => { state.bodyExtra = e.target.value; updatePrompt(); });
            const pEx = document.getElementById('prop-extra'); if (pEx) pEx.addEventListener('input', e => { state.propExtra = e.target.value; updatePrompt(); });
            const nInp = document.getElementById('input-name'); if (nInp) nInp.addEventListener('input', e => { state.name = e.target.value; updatePrompt(); });

            // 의상 추가 입력
            const outfitEx = document.getElementById('outfit-extra');
            if (outfitEx) outfitEx.addEventListener('input', e => { state.attire.extra = e.target.value; updatePrompt(); });

            // 의상 3단계 UI
            function renderOutfitTier1() {
                const c = document.getElementById('outfit-tier1-chips'); if (!c) return; c.innerHTML = '';
                OUTFIT_TIER1.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.attire.tier1 === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        state.attire.tier1 = state.attire.tier1 === item.ko ? '' : item.ko;
                        state.attire.tier2 = ''; state.attire.tier3 = '';
                        renderOutfitTier1(); renderOutfitTier2(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }

            function renderOutfitTier2() {
                const wrap = document.getElementById('outfit-tier2-wrap');
                const c = document.getElementById('outfit-tier2-chips');
                const label = document.getElementById('outfit-tier2-label');
                const tier3wrap = document.getElementById('outfit-tier3-wrap');
                if (!wrap || !c) return;
                if (!state.attire.tier1) {
                    wrap.style.display = 'none';
                    if (tier3wrap) tier3wrap.style.display = 'none';
                    return;
                }
                if (state.attire.tier1 !== '나라별') {
                    wrap.style.display = 'none';
                    renderOutfitTier3Direct();
                    return;
                }
                wrap.style.display = 'block';
                if (label) label.textContent = '나라 선택';
                c.innerHTML = '';
                (OUTFIT_TIER2.country || []).forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.attire.tier2 === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        state.attire.tier2 = state.attire.tier2 === item.ko ? '' : item.ko;
                        state.attire.tier3 = '';
                        renderOutfitTier2(); renderOutfitTier3(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }

            function renderOutfitTier3() {
                const wrap = document.getElementById('outfit-tier3-wrap');
                const c = document.getElementById('outfit-tier3-chips');
                const label = document.getElementById('outfit-tier3-label');
                if (!wrap || !c) return;
                if (state.attire.tier1 !== '나라별' || !state.attire.tier2) { wrap.style.display = 'none'; return; }
                const items = OUTFIT_COUNTRY_TIER3[state.attire.tier2] || [];
                if (!items.length) { wrap.style.display = 'none'; return; }
                wrap.style.display = 'block';
                if (label) label.textContent = state.attire.tier2 + ' — 의상 선택';
                c.innerHTML = '';
                items.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.attire.tier3 === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        state.attire.tier3 = state.attire.tier3 === item.ko ? '' : item.ko;
                        renderOutfitTier3(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }

            function renderOutfitTier3Direct() {
                // 나라별 아닌 대분류: tier2 없이 직접 tier3 목록 표시
                const wrap = document.getElementById('outfit-tier3-wrap');
                const c = document.getElementById('outfit-tier3-chips');
                const label = document.getElementById('outfit-tier3-label');
                if (!wrap || !c) return;
                const t1 = state.attire.tier1;
                let items = [];
                if (t1 === '직업별') items = OUTFIT_JOB;
                else if (t1 === '스포츠별') items = OUTFIT_SPORTS;
                else if (t1 === '서브컬처별') items = OUTFIT_SUBCULTURE;
                else if (t1 === '상황/TPO별') items = OUTFIT_TPO;
                else if (t1 === '계절별') items = OUTFIT_SEASON;
                else if (t1 === '판타지/장르별') items = OUTFIT_FANTASY;
                else if (t1 === '브랜드 스타일별') items = OUTFIT_BRANDSTYLE;
                if (!items.length) { wrap.style.display = 'none'; return; }
                wrap.style.display = 'block';
                if (label) label.textContent = t1 + ' — 선택';
                c.innerHTML = '';
                items.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.attire.tier3 === item.ko ? ' active' : '');
                    btn.textContent = item.ko;
                    btn.addEventListener('click', () => {
                        state.attire.tier3 = state.attire.tier3 === item.ko ? '' : item.ko;
                        renderOutfitTier3Direct(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }

            // 신발 칩
            function renderOutfitShoes() {
                const c = document.getElementById('outfit-shoes-chips'); if (!c) return; c.innerHTML = '';
                OUTFIT_SHOES.forEach(shoe => {
                    const btn = document.createElement('button');
                    btn.className = 'chip' + (state.attire.shoes === shoe ? ' active' : '');
                    btn.textContent = shoe;
                    btn.addEventListener('click', () => {
                        state.attire.shoes = state.attire.shoes === shoe ? '' : shoe;
                        renderOutfitShoes(); updatePrompt();
                    });
                    c.appendChild(btn);
                });
            }

            // 악세서리 카테고리별 칩
            function renderOutfitAcc() {
                const wrap = document.getElementById('outfit-acc-wrap'); if (!wrap) return; wrap.innerHTML = '';
                OUTFIT_ACC_CATS.forEach(cat => {
                    const section = document.createElement('div');
                    const catLabel = document.createElement('div');
                    catLabel.className = 'sec-sub'; catLabel.style.marginBottom = '5px';
                    catLabel.textContent = cat.cat;
                    section.appendChild(catLabel);
                    const chipWrap = document.createElement('div');
                    chipWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px;';
                    cat.items.forEach(item => {
                        const btn = document.createElement('button');
                        const isActive = (state.attire.accessories || []).includes(item);
                        btn.className = 'chip' + (isActive ? ' active' : '');
                        btn.textContent = item;
                        btn.addEventListener('click', () => {
                            if (!state.attire.accessories) state.attire.accessories = [];
                            const idx = state.attire.accessories.indexOf(item);
                            if (idx > -1) state.attire.accessories.splice(idx, 1);
                            else state.attire.accessories.push(item);
                            renderOutfitAcc(); updatePrompt();
                        });
                        chipWrap.appendChild(btn);
                    });
                    section.appendChild(chipWrap);
                    wrap.appendChild(section);
                });
            }

            renderOutfitTier1(); renderOutfitTier2(); renderOutfitTier3(); renderOutfitShoes(); renderOutfitAcc();

            // Buttons
            const btnCopy = document.getElementById('btn-copy');
            if (btnCopy) btnCopy.addEventListener('click', () => {
                navigator.clipboard.writeText(generatePrompt()).then(() => {
                    btnCopy.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;">check</span> COPIED!';
                    setTimeout(() => { btnCopy.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">content_copy</span>COPY PROMPT'; }, 2000);
                });
            });

            // 저장 — localStorage에 state 전체 저장
            function saveStateToLocal() {
                try {
                    localStorage.setItem('tz_state', JSON.stringify(state));
                    return true;
                } catch(e) { return false; }
            }
            function loadStateFromLocal() {
                try {
                    const saved = localStorage.getItem('tz_state');
                    if (!saved) return false;
                    const parsed = JSON.parse(saved);
                    Object.assign(state, parsed);
                    return true;
                } catch(e) { return false; }
            }

            // JSON — state를 .json 파일로 다운로드
            function exportStateAsJSON() {
                const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `TakeZero_state_${new Date().toISOString().slice(0,10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
            }

            // 버튼 바인딩 (CH/IMG용 + SEQ용 공통)
            ['btn-save', 'btn-save-chst'].forEach(id => {
                const btn = document.getElementById(id);
                if (btn) btn.addEventListener('click', () => {
                    const ok = saveStateToLocal();
                    btn.innerHTML = ok
                        ? '<span class="material-symbols-outlined" style="font-size:14px;">check</span>저장됨'
                        : '<span class="material-symbols-outlined" style="font-size:14px;">error</span>실패';
                    setTimeout(() => { btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;">save</span>저장'; }, 2000);
                });
            });
            ['btn-export', 'btn-export-chst'].forEach(id => {
                const btn = document.getElementById(id);
                if (btn) btn.addEventListener('click', exportStateAsJSON);
            });

            // 저장된 state 복원
            if (loadStateFromLocal()) updatePrompt();

            initThemeControls();

            if (state.gender > 60) { const bp = document.getElementById('bust-panel'); if (bp) bp.classList.add('open'); }
            updatePrompt();
            initSequence();
        });

        /* ══════════════════════════════════════════
           SEQUENCE DATA & LOGIC (v2.2)
        ══════════════════════════════════════════ */

function initSequence() {
            document.querySelectorAll('#platform-chips .platform-badge').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('#platform-chips .platform-badge').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    seqState.platform = btn.dataset.platform;
                    const hint = document.getElementById('platform-hint');
                    if (hint) hint.textContent = PLATFORM_HINTS[seqState.platform] || '';
                    buildSeqPrompt();
                });
            });

            document.querySelectorAll('#genre-chips .chip').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('#genre-chips .chip').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const genre = btn.dataset.genre;
                    const preset = GENRE_PRESETS[genre];
                    if (!preset) return;
                    const moodEl = document.getElementById('seq-mood');
                    const colorEl = document.getElementById('seq-color');
                    const styleEl = document.getElementById('seq-style');
                    const bgmEl = document.getElementById('seq-bgm');
                    const ambEl = document.getElementById('seq-ambient');
                    if (moodEl) moodEl.value = preset.mood;
                    const moodDetailEl = document.getElementById('moodDetail');
                    if (moodDetailEl) moodDetailEl.value = preset.mood;
                    state.mood.detail = preset.mood;
                    if (colorEl) colorEl.value = preset.color;
                    state.color.preset = preset.color;
                    state.color.custom = '';
                    const colorCustomEl = document.getElementById('colorCustom');
                    if (colorCustomEl) colorCustomEl.value = '';
                    if (styleEl) styleEl.value = preset.style;
                    if (bgmEl) bgmEl.value = preset.bgm;
                    if (ambEl) ambEl.value = preset.ambient;
                    state.bgm = preset.bgm;
                    state.ambient = preset.ambient;
                    applyMoodAutoPro(preset.mood);
                });
            });

            document.querySelectorAll('#lighting-chips .chip').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('#lighting-chips .chip').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    state.view = state.view; // no-op for consistency
                    seqState.lighting = btn.dataset.lighting;
                    updatePrompt();
                    buildSeqPrompt();
                });
            });
            const lightNone = document.querySelector('#lighting-chips .chip[data-lighting="none"]');
            if (lightNone) lightNone.classList.add('active');

            document.querySelectorAll('#particle-chips .chip').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('#particle-chips .chip').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    seqState.particle = btn.dataset.particle;
                    buildSeqPrompt();
                });
            });
            const particleNone = document.querySelector('#particle-chips .chip[data-particle="none"]');
            if (particleNone) particleNone.classList.add('active');

            const durSlider = document.getElementById('seq-duration-slider');
            if (durSlider) {
                durSlider.addEventListener('input', () => {
                    const v = durSlider.value;
                    state.format.duration = parseInt(v, 10);
                    const el = document.getElementById('val-duration');
                    if (el) el.textContent = v === '0' ? 'Still (스틸 이미지)' : v + '초';
                    compileAndRender();
                });
            }

            const bpmSlider = document.getElementById('seq-bpm-slider');
            if (bpmSlider) {
                bpmSlider.addEventListener('input', () => {
                    const v = bpmSlider.value;
                    state.format.bpm = parseInt(v, 10);
                    const el = document.getElementById('val-bpm');
                    if (el) el.textContent = v + ' BPM';
                    renderAllShots();
                    compileAndRender();
                });
            }

            document.querySelectorAll('[data-rhythm]').forEach(btn => {
                btn.addEventListener('click', () => {
                    state.format.rhythm = btn.dataset.rhythm;
                    document.querySelectorAll('[data-rhythm]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const rhythmDescription = document.getElementById('rhythmDescription');
                    if (rhythmDescription) rhythmDescription.innerText = rhythmDescMap[state.format.rhythm];
                    compileAndRender();
                });
            });

            const subMode = document.getElementById('seq-subject-mode');
            if (subMode) subMode.addEventListener('change', () => {
                const c = document.getElementById('seq-subject-custom');
                if (c) c.style.display = subMode.value === 'custom' ? 'block' : 'none';
                buildSeqPrompt();
            });

            const colorSel = document.getElementById('seq-color');
            if (colorSel) colorSel.addEventListener('change', () => {
                const cc = document.getElementById('seq-color-custom');
                if (cc) cc.style.display = colorSel.value === 'Custom' ? 'block' : 'none';
                state.color.preset = colorSel.value === 'Custom' ? (cc?.value || '') : colorSel.value;
                compileAndRender();
            });

            const colorCustom = document.getElementById('colorCustom');
            if (colorCustom) {
                colorCustom.oninput = e => {
                    state.color.custom = e.target.value;
                    compileAndRender();
                };
            }

            const legacyColorCustom = document.getElementById('seq-color-custom');
            if (legacyColorCustom) {
                legacyColorCustom.addEventListener('input', e => {
                    state.color.preset = e.target.value;
                    compileAndRender();
                });
            }



            const moodInput = document.getElementById('moodDetail') || document.getElementById('seq-mood');
            if (moodInput) {
                moodInput.addEventListener('input', () => {
                    state.mood.detail = moodInput.value;
                    const moodDetail = document.getElementById('moodDetail');
                    if (moodDetail) moodDetail.value = moodInput.value;
                    const seqMood = document.getElementById('seq-mood');
                    if (seqMood) seqMood.value = moodInput.value;
                    applyMoodAutoPro(moodInput.value, false);
                    compileAndRender();
                });
                moodInput.addEventListener('change', () => {
                    state.mood.detail = moodInput.value;
                    const seqMood = document.getElementById('seq-mood');
                    if (seqMood) seqMood.value = moodInput.value;
                    applyMoodAutoPro(moodInput.value);
                    compileAndRender();
                });
            }

            const moodDetail = document.getElementById('moodDetail');
            if (moodDetail) {
                moodDetail.addEventListener('input', e => {
                    state.mood.detail = e.target.value;
                    const seqMood = document.getElementById('seq-mood');
                    if (seqMood) seqMood.value = e.target.value;
                    compileAndRender();
                });
            }

            document.querySelectorAll('[data-mood]').forEach(btn => {
                btn.addEventListener('click', () => {
                    state.mood.preset = btn.dataset.mood;
                    document.querySelectorAll('[data-mood]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    compileAndRender();
                });
            });

            ['seq-wardrobe', 'seq-environment',
             'seq-style', 'seq-subject-text',
             'seq-bgm', 'seq-bgm-custom', 'seq-ambient', 'seq-ambient-custom'].forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                const handler = () => {
                    // Custom field toggle for BGM/Ambient (integrated to avoid duplicate listeners)
                    if (id === 'seq-bgm') {
                        const bc = document.getElementById('seq-bgm-custom');
                        if (bc) bc.style.display = el.value === 'Custom' ? 'block' : 'none';
                    } else if (id === 'seq-ambient') {
                        const ac = document.getElementById('seq-ambient-custom');
                        if (ac) ac.style.display = el.value === 'Custom' ? 'block' : 'none';
                    }
                    compileAndRender();
                };
                el.addEventListener('input', handler);
                el.addEventListener('change', handler);
            });

            const btnCopySeq = document.getElementById('btn-copy-seq');
            if (btnCopySeq) btnCopySeq.addEventListener('click', copySeqPrompt);

            renderReferencePanel();
            setSequenceMode(seqState.mode);
            addShot();
            updateTerminalView();
        }
