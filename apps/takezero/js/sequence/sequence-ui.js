function renderReferencePanel() {
            ensureReferenceDefaults();
            const panel = document.getElementById('reference-panel');
            if (!panel) return;
            const slots = [
                { key: 'image1', title: 'Image Ref 1', tag: '@Image1' },
                { key: 'image2', title: 'Image Ref 2', tag: '@Image2' },
                { key: 'video1', title: 'Video Ref 1', tag: '@Video1' },
                { key: 'audio1', title: 'Audio Ref 1', tag: '@Audio1' }
            ];
            panel.innerHTML = `<div class="reference-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));">${slots.map(slot => {
                const ref = seqState.references[slot.key] || { role: '' };
                const roles = ['<option value="">unused</option>'].concat(REFERENCE_ROLES.map(role => `<option value="${role}" ${ref.role === role ? 'selected' : ''}>${role}</option>`)).join('');
                return `<div class="reference-item">
                    <div class="reference-title">${slot.title}</div>
                    <select class="seq-select" onchange="setReferenceRole('${slot.key}',this.value)">${roles}</select>
                    <div class="seq-help">${slot.tag}</div>
                </div>`;
            }).join('')}</div>`;
        }

        let previousSequenceHighlightState = {};
        let prevSoundText = '';

        function getSequenceHighlightState() {
            return {
                aspectRatio: state.format.aspectRatio,
                duration: state.format.duration,
                bpm: state.format.bpm,
                rhythm: state.format.rhythm,
                renderStyle: document.getElementById('seq-style')?.value || '',
                color: state.color.custom || state.color.preset || document.getElementById('seq-color')?.value || '',
                bgm: state.bgm || document.getElementById('seq-bgm')?.value || '',
                ambient: state.ambient || document.getElementById('seq-ambient')?.value || ''
            };
        }

        function getSequenceChanged(current) {
            const changed = getChanged(previousSequenceHighlightState, current);
            if (!Object.keys(previousSequenceHighlightState).length) {
                Object.keys(changed).forEach(key => { changed[key] = false; });
            }
            previousSequenceHighlightState = { ...current };
            return changed;
        }

        function highlightBlock(blockName) {
            const block = document.querySelector(`.compiler-block[data-block="${String(blockName).toLowerCase()}"]`);
            if (!block) return;
            block.classList.remove('block-flash');
            void block.offsetWidth;
            block.classList.add('block-flash');
        }

        function highlightChangedBlocks(changed, newSoundText) {
            if (
                changed.aspectRatio ||
                changed.duration ||
                changed.bpm ||
                changed.rhythm
            ) {
                highlightBlock('FORMAT');
            }

            if (
                changed.renderStyle ||
                changed.color
            ) {
                highlightBlock('STYLE');
            }

            if (changed.renderStyle) {
                highlightBlock('STYLE');
            }

            if (changed.bpm) {
                highlightBlock('FORMAT');
            }

            prevSoundText = newSoundText || '';
        }

        function setReferenceRole(key, role) {
            ensureReferenceDefaults();
            const ref = seqState.references[key];
            if (!ref) return;
            ref.role = role || '';
            buildSeqPrompt();
        }

        function setSequenceMode(mode) {
            seqState.mode = mode === 'pro' ? 'pro' : 'basic';
            const basic = document.getElementById('mode-basic-btn');
            const pro = document.getElementById('mode-pro-btn');
            if (basic) basic.classList.toggle('active', seqState.mode === 'basic');
            if (pro) pro.classList.toggle('active', seqState.mode === 'pro');
            document.querySelectorAll('.shot-body').forEach(body => body.classList.toggle('seq-pro-hidden', seqState.mode === 'basic'));
            buildSeqPrompt();
        }

        function renderShotCard(shot, index) {
            ensureShotDefaults(shot);
            recalculateShotTimecodes();
            const bpm = parseFloat(document.getElementById('seq-bpm-slider')?.value || 120);
            const beats = getBpmBeats(bpm);
            const beatBtns = [
                `<button class="chip ${shot.duration === 0 ? 'active' : ''}" style="font-size:9px;padding:3px 8px;" onclick="setShotDuration(${shot.id}, 0)">Still</button>`,
                ...beats.map(b =>
                    `<button class="chip ${shot.duration === b.val ? 'active' : ''}" style="font-size:9px;padding:3px 8px;" onclick="setShotDuration(${shot.id}, ${b.val})">${b.label} ${b.val}s</button>`
                )
            ].join('');

            const durationLabel = (shot.duration === 0 ? 'Still' : shot.duration + '초') + ' · ' + formatShotTimecode(shot);
            const previewText = shot.action ? shot.action.substring(0, 52) + (shot.action.length > 52 ? '…' : '') : '액션 지문을 입력하세요…';
            const typeChips = SHOT_TYPES.map(t => `<button class="chip has-tip ${shot.type === t.code ? 'active' : ''}" onclick="setShotField(${shot.id},'type','${t.code}',this)" style="font-size:8px;padding:3px 7px;">${t.label}<span class="tip-text">${t.tip}</span></button>`).join('');
            const lensOpts = LENS_OPTIONS.map(l => `<option value="${l.mm}" ${shot.lens === l.mm ? 'selected' : ''}>${l.mm}</option>`).join('');
            const movOpts = MOVEMENT_OPTIONS.map(m => `<option value="${m.val}" ${shot.movement === m.val ? 'selected' : ''}>${m.label}</option>`).join('');
            const transOpts = TRANSITION_OPTIONS.map(t => `<option value="${t.val}" ${shot.transition === t.val ? 'selected' : ''}>${t.label}</option>`).join('');
            const sfxTags = shot.sfx.map(s => { const info = SFX_PRESETS.find(p => p.en === s); const label = info ? info.ko : s; return `<span class="sfx-tag">${label}<span class="sfx-remove" onclick="removeSfx(${shot.id},'${s.replace(/'/g, "\'")}')">×</span></span>`; }).join('');
            const sfxPresetBtns = SFX_PRESETS.map(s => `<button class="chip ${shot.sfx.includes(s.en) ? 'active' : ''}" style="font-size:8px;padding:2px 6px;" onclick="toggleSfx(${shot.id},'${s.en}',this)" title="${s.en}">${s.ko}</button>`).join('');
            const lensInfo = LENS_OPTIONS.find(l => l.mm === shot.lens);
            const movInfo = MOVEMENT_OPTIONS.find(m => m.val === shot.movement);
            const transInfo = TRANSITION_OPTIONS.find(t => t.val === shot.transition);
            const cameraStartOpts = CAMERA_PRESETS.map(p => `<option value="${p.val}" ${shot.cameraStartPreset === p.val ? 'selected' : ''}>${p.label}</option>`).join('');
            const cameraEndOpts = CAMERA_END_PRESETS.map(p => `<option value="${p.val}" ${shot.cameraEndPreset === p.val ? 'selected' : ''}>${p.label}</option>`).join('');

            return `<div class="shot-card ${shot.open ? 'open' : ''} ${shot.locked ? 'locked' : ''}" id="shot-card-${shot.id}">
<div class="shot-header" onclick="toggleShot(${shot.id})">
  <div class="shot-num">SHOT ${String(index + 1).padStart(2, '0')} <span style="color:var(--acc);font-size:9px;font-weight:700;margin-left:6px;">${durationLabel}</span></div>
  <div class="shot-preview-text" id="shot-preview-${shot.id}">${shot.open ? previewText : '✏️ 클릭해서 수정 — ' + previewText}</div>
  <div class="shot-actions" onclick="event.stopPropagation()">
    <button class="shot-icon-btn lock-btn ${shot.locked ? 'locked' : ''}" title="${shot.locked ? '잠금 해제' : '이 샷 잠금'}" onclick="toggleShotLock(${shot.id})"><span class="material-symbols-outlined" style="font-size:14px;">${shot.locked ? 'lock' : 'lock_open'}</span></button>
    <button class="shot-icon-btn" title="샷 복제" onclick="duplicateShot(${shot.id})"><span class="material-symbols-outlined" style="font-size:14px;">content_copy</span></button>
    <button class="shot-icon-btn del-btn" title="샷 삭제" onclick="deleteShot(${shot.id})"><span class="material-symbols-outlined" style="font-size:14px;">delete</span></button>
  </div>
  <span class="material-symbols-outlined shot-chevron">expand_more</span>
</div>
<div class="shot-body ${seqState.mode === 'basic' ? 'seq-pro-hidden' : ''}">

  <!-- ⏱ 샷 길이 -->
  <div style="background:var(--bg-mid);border:1px solid var(--border);padding:12px;margin-bottom:4px;">
    <div class="seq-label" style="margin-bottom:8px;">⏱ 샷 길이</div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
      <input type="range" id="dur-slider-${shot.id}" min="0" max="30" step="0.5" value="${shot.duration}"
        style="flex:1;"
        oninput="setShotDuration(${shot.id}, parseFloat(this.value))" />
      <input type="number" id="dur-input-${shot.id}" min="0" max="30" step="0.5" value="${shot.duration}"
        style="width:70px;background:#111;color:#fff;border:1px solid #2a2a2a;border-radius:4px;padding:10px 12px;line-height:1.4;font-size:14px;box-sizing:border-box;font-family:'Inter','Apple SD Gothic Neo','Noto Sans KR',sans-serif;text-align:center;outline:none;"
        oninput="setShotDuration(${shot.id}, parseFloat(this.value)||0)" />
      <span style="font-size:11px;color:var(--text-dim);font-family:'JetBrains Mono',monospace;">초</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:5px;align-items:center;">
      <span style="font-size:10px;color:var(--text-dim);margin-right:2px;">🎵 BPM 추천:</span>
      ${beatBtns}
    </div>
  </div>

  <!-- 🌐 전역 물리 엔진 (샷별) -->
  <div style="background:var(--bg-mid);border:1px solid var(--border);padding:12px;margin-bottom:4px;">
    <div class="seq-label" style="margin-bottom:8px;">🌐 전역 물리 엔진</div>
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;font-size:12px;font-family:'Inter','Apple SD Gothic Neo','Noto Sans KR',sans-serif;font-weight:600;color:var(--text-sub);margin-bottom:6px;">
        <span>Motion Intensity <span style="color:var(--text-dim);font-weight:400;">— 이 샷의 속도감 / 모션 강도</span></span>
        <span id="val-motion-intensity-${shot.id}" style="color:var(--acc);font-weight:700;">${shot.motionIntensity}x</span>
      </div>
      <input type="range" id="shot-motion-intensity-${shot.id}" min="1" max="5" value="${shot.motionIntensity}" step="1" oninput="setShotMotionIntensity(${shot.id}, this.value)" />
      <div style="display:flex;justify-content:space-between;font-size:10px;font-family:'Inter',sans-serif;color:var(--text-dim);margin-top:4px;">
        <span>1x subtle</span><span>3x dynamic</span><span>5x extreme</span>
      </div>
    </div>
    <div class="shot-grid-2" style="align-items:start;">
      <div>
        <div class="seq-sub" style="margin-bottom:6px;">Gravity Logic (중력 연출)</div>
        <select class="seq-select" onchange="setShotGravity(${shot.id},this.value)">
          <option value="standard" ${shot.gravity === 'standard' ? 'selected' : ''}>표준 중력</option>
          <option value="low" ${shot.gravity === 'low' ? 'selected' : ''}>저중력</option>
          <option value="zero" ${shot.gravity === 'zero' ? 'selected' : ''}>무중력</option>
          <option value="bullet" ${shot.gravity === 'bullet' ? 'selected' : ''}>불릿타임</option>
        </select>
        <div id="gravity-desc-${shot.id}" style="font-size:10px;color:var(--text-dim);margin-top:8px;line-height:1.6;min-height:32px;">${GRAVITY_DESCRIPTIONS[shot.gravity] || ''}</div>
      </div>
      <div>
        <div class="seq-sub" style="margin-bottom:6px;">FX Preset Group (특수 효과 톤)</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;" id="fx-preset-chips-${shot.id}">
          <button class="chip ${shot.fxPreset === 'fpv_dynamic' ? 'active' : ''}" onclick="setShotFxPreset(${shot.id}, 'fpv_dynamic')">FPV 다이내믹</button>
          <button class="chip ${shot.fxPreset === 'glitch' ? 'active' : ''}" onclick="setShotFxPreset(${shot.id}, 'glitch')">글리치</button>
          <button class="chip ${shot.fxPreset === 'double_exposure' ? 'active' : ''}" onclick="setShotFxPreset(${shot.id}, 'double_exposure')">더블 익스포저</button>
          <button class="chip ${shot.fxPreset === 'anamorphic' ? 'active' : ''}" onclick="setShotFxPreset(${shot.id}, 'anamorphic')">아나모픽 플레어</button>
          <button class="chip ${shot.fxPreset === 'none' ? 'active' : ''}" onclick="setShotFxPreset(${shot.id}, 'none')">없음</button>
        </div>
        <div id="fx-preset-desc-${shot.id}" style="font-size:10px;color:var(--text-dim);margin-top:8px;line-height:1.6;min-height:32px;">${FX_DESCRIPTIONS[shot.fxPreset] || ''}</div>
      </div>
    </div>
  </div>

  <!-- 📷 카메라 설정 -->
  <div style="background:var(--bg-mid);border:1px solid var(--border);padding:12px;margin-bottom:4px;">
    <div class="seq-label" style="margin-bottom:8px;">📷 카메라 설정</div>
    <div class="seq-pro-field" style="margin-bottom:12px;">
      <div class="seq-label" style="margin-bottom:7px;">구도 — <span style="color:var(--text-dim);font-weight:400;font-size:10px;">ECU(극단 클로즈업) → EWS(극단 와이드) 순으로 넓어집니다.</span></div>
      <div class="seq-chip-group">${typeChips}</div>
    </div>

    <div class="shot-grid-3" style="margin-bottom:12px;">
      <div class="seq-pro-field">
        <div class="seq-label">Lens (렌즈)</div>
        <select class="seq-select" onchange="updateLensTip(${shot.id},this.value);setShotField(${shot.id},'lens',this.value,null)">${lensOpts}</select>
        <div id="lens-tip-${shot.id}" style="font-size:9px;color:var(--text-dim);margin-top:4px;line-height:1.5;">${lensInfo ? lensInfo.tip : ''}</div>
      </div>
      <div>
        <div class="seq-label">Camera Movement (카메라 무빙)</div>
        <select class="seq-select" onchange="updateMovTip(${shot.id},this.value);setShotField(${shot.id},'movement',this.value,null)">${movOpts}</select>
        <div id="mov-tip-${shot.id}" style="font-size:9px;color:var(--text-dim);margin-top:4px;line-height:1.5;">${movInfo ? movInfo.tip : ''}</div>
      </div>
      <div>
        <div class="seq-label">Transition (트랜지션)</div>
        <select class="seq-select" onchange="updateTransTip(${shot.id},this.value);setShotField(${shot.id},'transition',this.value,null)">${transOpts}</select>
        <div id="trans-tip-${shot.id}" style="font-size:9px;color:var(--text-dim);margin-top:4px;line-height:1.5;">${transInfo ? transInfo.tip : ''}</div>
      </div>
    </div>

    <div class="shot-grid-2" style="margin-bottom:12px;">
      <div>
        <div class="seq-label">Start Camera</div>
        <div class="seq-help">카메라가 이 샷에서 처음 어떻게 움직이기 시작하는지 정합니다.</div>
        <select class="seq-select" style="margin-top:7px;" onchange="updateCameraPresetDesc(${shot.id},'start',this.value);setShotField(${shot.id},'cameraStartPreset',this.value,null)">
          ${cameraStartOpts}
        </select>
        <input class="tz-input cam-start" value="${escapeHtml(shot.cameraStart || '')}" placeholder="예: dolly-in, slow push-in, handheld drift" oninput="setShotField(${shot.id},'cameraStart',this.value,null)" style="margin-top:6px;" />
        <div id="cam-start-desc-${shot.id}" class="seq-help-live">${CAMERA_PRESET_DESCRIPTIONS[shot.cameraStartPreset || ''] || ''}</div>
      </div>
      <div>
        <div class="seq-label">End Camera</div>
        <div class="seq-help">카메라가 샷 끝날 때 어떤 방향이나 상태로 마무리되는지 정합니다.</div>
        <select class="seq-select" style="margin-top:7px;" onchange="updateCameraPresetDesc(${shot.id},'end',this.value);setShotField(${shot.id},'cameraEndPreset',this.value,null)">
          ${cameraEndOpts}
        </select>
        <input class="tz-input cam-end" value="${escapeHtml(shot.cameraEnd || '')}" placeholder="예: pan right, hold frame, settle on close-up" oninput="setShotField(${shot.id},'cameraEnd',this.value,null)" style="margin-top:6px;" />
        <div id="cam-end-desc-${shot.id}" class="seq-help-live">${CAMERA_PRESET_DESCRIPTIONS[shot.cameraEndPreset || ''] || ''}</div>
      </div>
    </div>
    <div id="camera-warning-${shot.id}" class="seq-warning ${getCameraValidationWarning(shot) ? 'active' : ''}">${getCameraValidationWarning(shot)}</div>

    <div class="shot-grid-2" style="margin-bottom:12px;">
      <div>
        <div class="seq-label">Camera Speed</div>
        <div class="seq-help">카메라 이동의 기본 속도를 정합니다.</div>
        <select class="seq-select cam-speed" onchange="updateCameraSpeedDesc(${shot.id},this.value);setShotField(${shot.id},'cameraSpeed',this.value,null)" style="margin-top:7px;">
          <option value="slow" ${shot.cameraSpeed === 'slow' ? 'selected' : ''}>Slow</option>
          <option value="normal" ${shot.cameraSpeed === 'normal' ? 'selected' : ''}>Normal</option>
          <option value="fast" ${shot.cameraSpeed === 'fast' ? 'selected' : ''}>Fast</option>
        </select>
        <div id="cam-speed-desc-${shot.id}" class="seq-help-live">${CAMERA_SPEED_DESCRIPTIONS[shot.cameraSpeed || 'slow'] || ''}</div>
        <div id="cam-speed-warning-${shot.id}" class="seq-warning ${shot.cameraSpeed === 'fast' ? 'active' : ''}">Seedance에서는 fast 사용 시 jitter가 발생할 수 있습니다.</div>
      </div>
      <div>
        <div class="seq-label">Camera Easing</div>
        <div class="seq-help">카메라 속도가 시작부터 끝까지 어떻게 변하는지 정합니다.</div>
        <select class="seq-select cam-easing" onchange="updateCameraEasingDesc(${shot.id},this.value);setShotField(${shot.id},'cameraEasing',this.value,null)" style="margin-top:7px;">
          <option value="gentle" ${(shot.cameraEasing || 'gentle') === 'gentle' ? 'selected' : ''}>Gentle</option>
          <option value="none" ${shot.cameraEasing === 'none' ? 'selected' : ''}>None</option>
          <option value="accelerate" ${shot.cameraEasing === 'accelerate' ? 'selected' : ''}>Accelerate</option>
          <option value="decelerate" ${shot.cameraEasing === 'decelerate' ? 'selected' : ''}>Decelerate</option>
          <option value="hold" ${shot.cameraEasing === 'hold' ? 'selected' : ''}>Hold</option>
        </select>
        <div id="cam-easing-desc-${shot.id}" class="seq-help-live">${CAMERA_EASING_DESCRIPTIONS[shot.cameraEasing || 'gentle'] || ''}</div>
      </div>
    </div>

    <div class="shot-grid-3 seq-pro-field" style="margin-bottom:12px;">
      <div>
        <div class="seq-label">조리개값</div>
        <select class="seq-select" onchange="setShotField(${shot.id},'aperture',this.value,null)">
          <option value="f/1.4 ultra shallow depth of field" ${shot.aperture === 'f/1.4 ultra shallow depth of field' ? 'selected' : ''}>f/1.4 · 극얕은 심도</option>
          <option value="f/2 shallow depth of field" ${shot.aperture === 'f/2 shallow depth of field' ? 'selected' : ''}>f/2 · 얕은 심도</option>
          <option value="f/2.8 portrait depth of field" ${shot.aperture === 'f/2.8 portrait depth of field' ? 'selected' : ''}>f/2.8 · 인물용</option>
          <option value="f/4 balanced depth of field" ${shot.aperture === 'f/4 balanced depth of field' ? 'selected' : ''}>f/4 · 균형형</option>
          <option value="f/8 deep depth of field" ${shot.aperture === 'f/8 deep depth of field' ? 'selected' : ''}>f/8 · 깊은 심도</option>
        </select>
        <div style="font-size:9px;color:var(--text-dim);margin-top:4px;line-height:1.5;">이 샷의 심도와 배경 흐림 정도를 정합니다.</div>
      </div>
      <div>
        <div class="seq-label">좌우 위치</div>
        <select class="seq-select" onchange="setShotField(${shot.id},'cameraSide',this.value,null)">
          <option value="front view" ${shot.cameraSide === 'front view' ? 'selected' : ''}>정면</option>
          <option value="left profile view" ${shot.cameraSide === 'left profile view' ? 'selected' : ''}>왼쪽</option>
          <option value="right profile view" ${shot.cameraSide === 'right profile view' ? 'selected' : ''}>오른쪽</option>
          <option value="rear view" ${shot.cameraSide === 'rear view' ? 'selected' : ''}>뒤</option>
          <option value="front-left 45 degree view" ${shot.cameraSide === 'front-left 45 degree view' ? 'selected' : ''}>좌측 45도</option>
          <option value="front-right 45 degree view" ${shot.cameraSide === 'front-right 45 degree view' ? 'selected' : ''}>우측 45도</option>
        </select>
        <div style="font-size:9px;color:var(--text-dim);margin-top:4px;line-height:1.5;">피사체를 어느 방향에서 바라보는지 정합니다.</div>
      </div>
      <div>
        <div class="seq-label">높이</div>
        <select class="seq-select" onchange="setShotField(${shot.id},'cameraHeight',this.value,null)">
          <option value="slightly above eye level" ${shot.cameraHeight === 'slightly above eye level' ? 'selected' : ''}>살짝 위</option>
          <option value="eye-level camera" ${shot.cameraHeight === 'eye-level camera' ? 'selected' : ''}>눈높이</option>
          <option value="slightly below eye level" ${shot.cameraHeight === 'slightly below eye level' ? 'selected' : ''}>살짝 아래</option>
          <option value="high-angle top-down" ${shot.cameraHeight === 'high-angle top-down' ? 'selected' : ''}>위에서 내려다봄</option>
          <option value="low-angle hero shot" ${shot.cameraHeight === 'low-angle hero shot' ? 'selected' : ''}>아래에서 올려봄</option>
        </select>
        <div style="font-size:9px;color:var(--text-dim);margin-top:4px;line-height:1.5;">시점 높이만으로도 인상과 힘의 방향이 바뀝니다.</div>
      </div>
    </div>

    <div class="shot-grid-3 seq-pro-field">
      <div>
        <div class="seq-label">Time Flow (시간 흐름)</div>
        <select class="seq-select" onchange="setShotField(${shot.id},'timeFlow',this.value,null)">
          <option value="normal" ${shot.timeFlow === 'normal' ? 'selected' : ''}>Normal</option>
          <option value="slow" ${shot.timeFlow === 'slow' ? 'selected' : ''}>Slow-Mo</option>
          <option value="freeze" ${shot.timeFlow === 'freeze' ? 'selected' : ''}>Freeze</option>
          <option value="ramp" ${shot.timeFlow === 'ramp' ? 'selected' : ''}>Speed Ramp</option>
        </select>
        <div style="font-size:9px;color:var(--text-dim);margin-top:4px;line-height:1.5;">샷별 시간 감각을 프롬프트 토큰으로 넣습니다.</div>
      </div>
      <div>
        <div class="seq-label">Lens Distortion (렌즈 왜곡)</div>
        <select class="seq-select" onchange="setShotField(${shot.id},'lensDistortion',this.value,null)">
          <option value="none" ${shot.lensDistortion === 'none' ? 'selected' : ''}>None</option>
          <option value="slight" ${shot.lensDistortion === 'slight' ? 'selected' : ''}>Slight</option>
          <option value="fisheye" ${shot.lensDistortion === 'fisheye' ? 'selected' : ''}>Fisheye</option>
          <option value="wide_edge" ${shot.lensDistortion === 'wide_edge' ? 'selected' : ''}>Wide-Edge</option>
        </select>
        <div style="font-size:9px;color:var(--text-dim);margin-top:4px;line-height:1.5;">외곽 왜곡 묘사를 프롬프트에 반영합니다.</div>
      </div>
      <div>
        <div class="seq-label">Camera Tilt (카메라 각도)</div>
        <select class="seq-select" onchange="setShotField(${shot.id},'cameraTilt',this.value,null)">
          <option value="level horizon" ${(shot.cameraTilt || 'level horizon') === 'level horizon' ? 'selected' : ''}>Level</option>
          <option value="slight dutch tilt" ${shot.cameraTilt === 'slight dutch tilt' ? 'selected' : ''}>Slight Dutch</option>
          <option value="strong dutch tilt" ${shot.cameraTilt === 'strong dutch tilt' ? 'selected' : ''}>Strong Dutch</option>
        </select>
        <div style="font-size:9px;color:var(--text-dim);margin-top:4px;line-height:1.5;">수평/더치앵글로 장면의 안정감과 긴장감을 조절합니다.</div>
      </div>
      <div>
        <div class="seq-label">Seamless Link (자연 연결)</div>
        <label class="logic-toggle ${shot.seamless ? 'on' : ''}" style="padding:7px 10px;" onclick="event.preventDefault();toggleShotSeamless(${shot.id})">
          <div class="toggle-dot"></div>
          <div style="font-size:9px;font-family:'JetBrains Mono',monospace;color:var(--text-sub);">컷 없는 연결 문구 생성</div>
        </label>
        <div style="font-size:9px;color:var(--text-dim);margin-top:4px;line-height:1.5;">이전/다음 샷과 자연스럽게 붙는 문구를 추가합니다.</div>
      </div>
    </div>
  </div>

  <!-- 액션 설계 -->
  <div style="background:var(--bg-mid);border:1px solid var(--border);padding:12px;margin-bottom:4px;">
    <div class="seq-label" style="margin-bottom:8px;">✍️ 액션 설계</div>
    <div style="margin-bottom:10px;">
      <div class="seq-label" style="margin-bottom:5px;">Action Description (액션 지문) — <span style="color:var(--text-dim);font-weight:400;font-size:10px;">이 샷에서 무슨 일이 일어나는지 구체적으로 묘사.</span></div>
      <textarea class="tz-textarea" rows="6"
        placeholder="Describe ONE clear physical motion in present tense. Avoid emotional-only descriptions."
        oninput="setShotField(${shot.id},'action',this.value,null)"
        >${shot.action}</textarea>
      <div id="action-warning-${shot.id}" class="seq-warning ${getActionValidationWarning(shot) ? 'active' : ''}">${getActionValidationWarning(shot)}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <div>
        <div style="font-size:10px;font-weight:700;color:#4caf50;margin-bottom:5px;">🟢 Start Frame (시작 프레임)</div>
        <textarea class="tz-textarea" rows="2" id="start-frame-${shot.id}"
          placeholder="예: 문 앞에 선 인물, 손이 손잡이에 닿기 직전, 복도 조명은 차갑고 어두움"
          oninput="setShotField(${shot.id},'startFrame',this.value,null)">${shot.startFrame || ''}</textarea>
      </div>
      <div>
        <div style="font-size:10px;font-weight:700;color:#f44336;margin-bottom:5px;">🔴 End Frame (끝 프레임)</div>
        <textarea class="tz-textarea" rows="2" id="end-frame-${shot.id}"
          placeholder="예: 문이 열리며 강한 빛이 들어오고, 인물의 얼굴이 반쯤 드러난 상태"
          oninput="setShotField(${shot.id},'endFrame',this.value,null)">${shot.endFrame || ''}</textarea>
      </div>
    </div>
  </div>

  <!-- SFX -->
  <div style="background:var(--bg-mid);border:1px solid var(--border);padding:12px;margin-bottom:4px;">
    <div class="seq-label" style="margin-bottom:7px;">🔊 SFX</div>
    <div style="font-size:10px;color:var(--text-dim);margin-bottom:8px;">AI가 이 샷의 효과음을 자동 생성할 수 있도록 소리 단서를 정합니다.</div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;min-height:20px;" id="sfx-selected-${shot.id}">${sfxTags}</div>
    <div class="seq-chip-group" style="margin-bottom:8px;">${sfxPresetBtns}</div>
    <div style="display:flex;gap:6px;">
      <input type="text" class="tz-input" id="sfx-custom-${shot.id}" placeholder="직접 입력 후 Enter…" style="flex:1;" onkeydown="if(event.key==='Enter'){addCustomSfx(${shot.id});event.preventDefault()}" />
      <button class="btn-secondary" style="padding:5px 10px;font-size:9px;flex-shrink:0;" onclick="addCustomSfx(${shot.id})">ADD</button>
    </div>
  </div>

</div>
</div>`;
        }

        function renderAllShots() {
            const stack = document.getElementById('shot-stack');
            if (!stack) return;
            seqState.shots.forEach(ensureShotDefaults);
            recalculateShotTimecodes();
            stack.innerHTML = seqState.shots.map((s, i) => renderShotCard(s, i)).join('');
            updateShotCountBadge();
            updateTotalCounter();
            buildSeqPrompt();
        }

        function updateShotCountBadge() {
            const el = document.getElementById('shot-count-badge');
            if (el) el.textContent = `( ${seqState.shots.length} SHOT${seqState.shots.length !== 1 ? 'S' : ''} )`;
        }
