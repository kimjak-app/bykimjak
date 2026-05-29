function addShot() {
            if (seqState.shots.length >= 100) return;
            const shot = createShotData();
            const moodEl = document.getElementById('seq-mood');
            const cluster = detectMoodCluster(moodEl?.value || '');
            if (cluster) {
                applyAutoProToShot(shot, cluster);
                seqState.moodCluster = cluster;
                seqState.autoProApplied = true;
            }
            seqState.shots.push(shot);
            renderAllShots();
        }

        function deleteShot(id) {
            const shot = seqState.shots.find(s => s.id === id);
            if (shot && shot.locked) { return; }
            seqState.shots = seqState.shots.filter(s => s.id !== id);
            renderAllShots();
        }

        function duplicateShot(id) {
            const idx = seqState.shots.findIndex(s => s.id === id);
            if (idx === -1) return;
            const orig = seqState.shots[idx];
            shotIdCounter++;
            const copy = { ...orig, id: shotIdCounter, locked: false, open: true, sfx: [...orig.sfx], proOverrides: { ...PRO_OVERRIDE_DEFAULTS, ...(orig.proOverrides || {}) } };
            seqState.shots.splice(idx + 1, 0, copy);
            renderAllShots();
        }

        function toggleShot(id) {
            const shot = seqState.shots.find(s => s.id === id);
            if (shot) { shot.open = !shot.open; renderAllShots(); }
        }

        function toggleShotLock(id) {
            const shot = seqState.shots.find(s => s.id === id);
            if (shot) { shot.locked = !shot.locked; renderAllShots(); }
        }

        function toggleShotSeamless(id) {
            const shot = seqState.shots.find(s => s.id === id);
            if (shot) { shot.seamless = !shot.seamless; renderAllShots(); }
        }

        function collapseAllShots() {
            seqState.shots.forEach(s => s.open = false);
            renderAllShots();
        }

        function setShotField(id, field, value, btn) {
            const shot = seqState.shots.find(s => s.id === id);
            if (!shot) return;
            markProOverride(shot, field);
            shot[field] = value;
            if (field === 'cameraStart') shot.startMovement = value;
            if (field === 'cameraEnd') shot.endMovement = value;
            if (field === 'action') {
                const prev = document.getElementById(`shot-preview-${id}`);
                if (prev) prev.textContent = value ? value.substring(0, 52) + (value.length > 52 ? '…' : '') : '액션 지문을 입력하세요…';
            }
            if (btn && field === 'type') {
                const group = btn.closest('.seq-chip-group');
                if (group) group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
            }
            updateShotWarnings(id);
            buildSeqPrompt();
        }

        function setShotDuration(id, val) {
            val = parseFloat(val) || 0;
            val = Math.round(val * 2) / 2; // 0.5초 단위 스냅
            val = Math.max(0, Math.min(30, val));
            const shot = seqState.shots.find(s => s.id === id);
            if (!shot) return;
            shot.duration = val;
            // 슬라이더 + 숫자 입력 동기화
            const slider = document.getElementById('dur-slider-' + id);
            const input = document.getElementById('dur-input-' + id);
            if (slider) slider.value = val;
            if (input) input.value = val;
            updateShotTimecodeLabels();
            // BPM 추천 버튼 active 업데이트
            const bpm = parseFloat(document.getElementById('seq-bpm-slider')?.value || 120);
            const beats = getBpmBeats(bpm);
            const card = document.getElementById('shot-card-' + id);
            if (card) {
                card.querySelectorAll('.shot-body .chip').forEach(btn => {
                    const btnVal = parseFloat(btn.textContent.match(/[\d.]+s/)?.[0]);
                    const isStill = btn.textContent.includes('Still');
                    if (!isNaN(btnVal)) btn.classList.toggle('active', btnVal === val);
                    if (isStill) btn.classList.toggle('active', val === 0);
                });
            }
            updateTotalCounter();
            validateDuration(seqState.shots, state.format.duration);
            buildSeqPrompt();
        }

        function setShotMotionIntensity(id, val) {
            const shot = seqState.shots.find(s => s.id === id);
            if (!shot) return;
            shot.motionIntensity = parseInt(val || 1, 10);
            const label = document.getElementById(`val-motion-intensity-${id}`);
            if (label) label.textContent = shot.motionIntensity + 'x';
            buildSeqPrompt();
        }


        function setShotGravity(id, gravity) {
            const shot = seqState.shots.find(s => s.id === id);
            if (!shot) return;
            shot.gravity = gravity;
            const desc = document.getElementById(`gravity-desc-${id}`);
            if (desc) desc.textContent = GRAVITY_DESCRIPTIONS[gravity] || '';
            buildSeqPrompt();
        }

        function setShotFxPreset(id, fx) {
            const shot = seqState.shots.find(s => s.id === id);
            if (!shot) return;
            shot.fxPreset = fx;
            const wrap = document.getElementById(`fx-preset-chips-${id}`);
            if (wrap) {
                wrap.querySelectorAll('.chip').forEach(btn => btn.classList.remove('active'));
                const labels = {
                    fpv_dynamic: 'FPV 다이내믹',
                    glitch: '글리치',
                    double_exposure: '더블 익스포저',
                    anamorphic: '아나모픽 플레어',
                    none: '없음'
                };
                const target = Array.from(wrap.querySelectorAll('.chip')).find(btn => btn.textContent.trim() === labels[fx]);
                if (target) target.classList.add('active');
            }
            const desc = document.getElementById(`fx-preset-desc-${id}`);
            if (desc) desc.textContent = FX_DESCRIPTIONS[fx] || '';
            buildSeqPrompt();
        }

        function updateLensTip(id, val) { const i = LENS_OPTIONS.find(l => l.mm === val); const e = document.getElementById(`lens-tip-${id}`); if (e && i) e.textContent = i.tip; }
        function updateMovTip(id, val) { const i = MOVEMENT_OPTIONS.find(m => m.val === val); const e = document.getElementById(`mov-tip-${id}`); if (e && i) e.textContent = i.tip; }
        function updateTransTip(id, val) { const i = TRANSITION_OPTIONS.find(t => t.val === val); const e = document.getElementById(`trans-tip-${id}`); if (e && i) e.textContent = i.tip; }
        function updateCameraPresetDesc(id, pos, val) {
            const e = document.getElementById(`cam-${pos}-desc-${id}`);
            if (e) e.textContent = CAMERA_PRESET_DESCRIPTIONS[val || ''] || '';
        }
        function updateCameraSpeedDesc(id, val) {
            const e = document.getElementById(`cam-speed-desc-${id}`);
            if (e) e.textContent = CAMERA_SPEED_DESCRIPTIONS[val || 'slow'] || '';
        }
        function updateCameraEasingDesc(id, val) {
            const e = document.getElementById(`cam-easing-desc-${id}`);
            if (e) e.textContent = CAMERA_EASING_DESCRIPTIONS[val || 'gentle'] || '';
        }

        function toggleSfx(id, sfxVal, btn) {
            const shot = seqState.shots.find(s => s.id === id);
            if (!shot) return;
            const idx = shot.sfx.indexOf(sfxVal);
            if (idx === -1) { shot.sfx.push(sfxVal); if (btn) btn.classList.add('active'); }
            else { shot.sfx.splice(idx, 1); if (btn) btn.classList.remove('active'); }
            const tagsEl = document.getElementById(`sfx-selected-${id}`);
            if (tagsEl) tagsEl.innerHTML = shot.sfx.map(s => `<span class="sfx-tag">${s}<span class="sfx-remove" onclick="removeSfx(${id},'${s.replace(/'/g, "\\'")}')">×</span></span>`).join('');
            buildSeqPrompt();
        }

        function removeSfx(id, sfxVal) {
            const shot = seqState.shots.find(s => s.id === id);
            if (!shot) return;
            shot.sfx = shot.sfx.filter(s => s !== sfxVal);
            renderAllShots();
        }

        function addCustomSfx(id) {
            const input = document.getElementById(`sfx-custom-${id}`);
            if (!input || !input.value.trim()) return;
            const shot = seqState.shots.find(s => s.id === id);
            if (!shot) return;
            const val = input.value.trim();
            if (!shot.sfx.includes(val)) shot.sfx.push(val);
            input.value = '';
            renderAllShots();
        }

        function toggleLogicRule() {
            seqState.logicRule = !seqState.logicRule;
            const el = document.getElementById('logic-rule-toggle');
            if (el) el.classList.toggle('on', seqState.logicRule);
            buildSeqPrompt();
        }

        const PLATFORM_HINTS = {
            seedance: '씨댄스 2.0: 멀티모달(@태그) · FORMAT 헤더 구조 · 15초 멀티샷 시퀀스 최적화 · 네이티브 오디오 생성',
            kling: '클링 3.0: 자연스러운 물리 모션 · 4K@60fps · 간결한 프롬프트 권장 · Elements 레퍼런스 시스템',
            higgsfield: '힉스필드: 레이어 분리 구조 (IMAGE / IDENTITY / MOTION) · Cinema Studio · 20+ 카메라 프리셋',
            veo: 'Veo 3.1: 시네마 4K · 오디오 자동 생성 · Google Workspace 연동 · 고화질 우선'
        };

        /* ══════════════════════════════════════════
           TERMINAL VIEW SWITCHER (잼코치 v2.4 패턴)
        ══════════════════════════════════════════ */
