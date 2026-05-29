function detectMoodCluster(moodText) {
            const text = String(moodText || '').trim();
            if (!text) return '';
            for (const cluster of Object.keys(MOOD_CLUSTER_KEYWORDS)) {
                if (MOOD_CLUSTER_KEYWORDS[cluster].some(keyword => text.includes(keyword))) return cluster;
            }
            return '';
        }

        function applyAutoProToShot(shot, cluster) {
            ensureShotDefaults(shot);
            const preset = MOOD_AUTO_PRO_DEFAULTS[cluster];
            if (!preset) return false;
            const map = {
                shotType: 'type',
                lens: 'lens',
                cameraHeight: 'cameraHeight',
                cameraTilt: 'cameraTilt',
                lensDistortion: 'lensDistortion',
                timeflow: 'timeFlow',
                cameraSpeed: 'cameraSpeed',
                cameraEasing: 'cameraEasing'
            };
            Object.entries(map).forEach(([overrideKey, shotKey]) => {
                if (!shot.proOverrides[overrideKey]) shot[shotKey] = preset[overrideKey];
            });
            shot.moodCluster = cluster;
            shot.autoProApplied = true;
            return true;
        }

        function applyMoodAutoPro(moodText, shouldRender = true) {
            const cluster = detectMoodCluster(moodText);
            seqState.moodCluster = cluster;
            seqState.autoProApplied = false;
            if (!cluster) {
                buildSeqPrompt();
                return;
            }
            seqState.shots.forEach(shot => {
                if (applyAutoProToShot(shot, cluster)) seqState.autoProApplied = true;
                if (!shouldRender) syncShotProControls(shot);
            });
            if (shouldRender) renderAllShots();
            else buildSeqPrompt();
        }

        function syncShotProControls(shot) {
            if (!shot) return;
            const card = document.getElementById('shot-card-' + shot.id);
            if (!card) return;
            card.querySelectorAll('.seq-chip-group .chip').forEach(btn => {
                const call = btn.getAttribute('onclick') || '';
                if (call.includes("'type'")) btn.classList.toggle('active', call.includes("'" + shot.type + "'"));
            });
            const setSelect = (field, value) => {
                const select = Array.from(card.querySelectorAll('select')).find(el => (el.getAttribute('onchange') || '').includes("'" + field + "'"));
                if (select) select.value = value || '';
            };
            setSelect('lens', shot.lens);
            setSelect('cameraHeight', shot.cameraHeight);
            setSelect('cameraTilt', shot.cameraTilt);
            setSelect('lensDistortion', shot.lensDistortion);
            setSelect('timeFlow', shot.timeFlow);
            setSelect('cameraSpeed', shot.cameraSpeed);
            setSelect('cameraEasing', shot.cameraEasing);
            updateCameraSpeedDesc(shot.id, shot.cameraSpeed);
            updateCameraEasingDesc(shot.id, shot.cameraEasing);
            updateLensTip(shot.id, shot.lens);
            updateShotWarnings(shot.id);
        }

        function markProOverride(shot, field) {
            ensureShotDefaults(shot);
            const map = {
                type: 'shotType',
                lens: 'lens',
                cameraHeight: 'cameraHeight',
                cameraTilt: 'cameraTilt',
                lensDistortion: 'lensDistortion',
                timeFlow: 'timeflow',
                cameraSpeed: 'cameraSpeed',
                cameraEasing: 'cameraEasing'
            };
            const key = map[field];
            if (key) shot.proOverrides[key] = true;
        }

        function getActionValidationWarning(shot) {
            return /\b(pan|dolly|tilt|zoom)\b/i.test(shot && shot.action || '')
                ? '카메라 움직임은 Camera 필드에 입력하는 것이 더 정확합니다.'
                : '';
        }

        function getCameraValidationWarning(shot) {
            const cameraText = [shot && shot.cameraStart, shot && shot.cameraEnd, shot && shot.cameraStartPreset, shot && shot.cameraEndPreset, shot && shot.movement].filter(Boolean).join(' ');
            return /\b(walk|run|jump)\b/i.test(cameraText)
                ? '인물 동작은 Action 필드에 입력하는 것이 더 자연스럽습니다.'
                : '';
        }

        function updateShotWarnings(id) {
            const shot = seqState.shots.find(s => s.id === id);
            if (!shot) return;
            const actionWarning = getActionValidationWarning(shot);
            const actionEl = document.getElementById(`action-warning-${id}`);
            if (actionEl) {
                actionEl.textContent = actionWarning;
                actionEl.classList.toggle('active', !!actionWarning);
            }
            const cameraWarning = getCameraValidationWarning(shot);
            const cameraEl = document.getElementById(`camera-warning-${id}`);
            if (cameraEl) {
                cameraEl.textContent = cameraWarning;
                cameraEl.classList.toggle('active', !!cameraWarning);
            }
            const speedEl = document.getElementById(`cam-speed-warning-${id}`);
            if (speedEl) speedEl.classList.toggle('active', shot.cameraSpeed === 'fast');
        }

const moodClusterMap = MOOD_CLUSTER_KEYWORDS;
const clusterPreset = MOOD_AUTO_PRO_DEFAULTS;
