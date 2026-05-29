function renderStageParams() {
            const container = document.getElementById('stage-params-container');
            if (!container) return;
            container.innerHTML = '';
            if (state.stageMode === 'location') {
                container.innerHTML = `<div><div class="sec-sub">장소 (LOCATIONS)</div><div id="loc-chips" style="display:flex;flex-wrap:wrap;gap:4px;"></div></div><div><div class="sec-sub">대기 및 날씨 (ATMOSPHERE)</div><div id="atmo-chips" style="display:flex;flex-wrap:wrap;gap:4px;"></div></div>`;
                makeChips('loc-chips', STAGE_LOCATIONS, 'location', true);
                makeChips('atmo-chips', STAGE_ATMOSPHERES, 'atmosphere', true);
            } else {
                container.innerHTML = `<div><div class="sec-sub">공간 구조 (SET STRUCTURE)</div><div id="set-chips" style="display:flex;flex-wrap:wrap;gap:4px;"></div></div><div><div class="sec-sub">마감 재질 (SURFACE MATERIALS)</div><div id="stagemat-chips" style="display:flex;flex-wrap:wrap;gap:4px;"></div></div>`;
                makeChips('set-chips', STAGE_SET_DESIGNS, 'setDesign', true);
                makeChips('stagemat-chips', STAGE_SET_MATS, 'stageMat', true);
            }
        }

        function renderL1() {
            const L1 = document.getElementById('menu-l1'); if (!L1) return; L1.innerHTML = '';
            const isFemale = state.gender > 60;
            Object.keys(ATTIRE_DATA).forEach(cat => {
                const cData = ATTIRE_DATA[cat];
                if (cData.condition === 'female' && !isFemale) return;
                if (cData.condition === 'male' && isFemale) return;
                const btn = document.createElement('button'); btn.className = 'menu-l1-btn' + (cat === state.attire.category ? ' active' : '');
                btn.innerHTML = `<span>${cat}</span><span class="material-symbols-outlined" style="font-size:14px;">chevron_right</span>`;
                btn.addEventListener('click', () => {
                    state.attire.category = cat; state.attire.item = cData.items[0].n;
                    if (state.attire.materialMode === 'auto' && cData.items[0].dm) state.attire.material = cData.items[0].dm;
                    else if (state.attire.materialMode === 'manual') state.attire.material = cData.materials[0];
                    state.attire.status = ATTIRE_STATUS[0];
                    renderL1(); renderL2(); renderL3(); renderL4(); updatePrompt();
                });
                L1.appendChild(btn);
            });
        }
        function renderL2() {
            const L2 = document.getElementById('menu-l2'); if (!L2) return; const cat = state.attire.category;
            L2.innerHTML = `<div style="padding:4px 12px 6px;font-size:8px;font-family:'JetBrains Mono',monospace;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--text-dim);">${ATTIRE_DATA[cat].label}</div>`;
            ATTIRE_DATA[cat].items.forEach(item => {
                const btn = document.createElement('button'); btn.className = 'menu-l2-btn' + (item.n === state.attire.item ? ' active' : '');
                btn.innerHTML = `${item.n}<span class="menu-l2-desc">${item.d}</span>`;
                btn.addEventListener('click', () => {
                    state.attire.item = item.n;
                    if (state.attire.materialMode === 'auto' && item.dm) state.attire.material = item.dm;
                    renderL2(); renderL3(); updatePrompt();
                });
                L2.appendChild(btn);
            });
        }
        function renderL3() {
            const wrap = document.getElementById('material-chips'); if (!wrap) return; wrap.innerHTML = '';
            const autoBtn = document.createElement('button');
            autoBtn.className = 'chip' + (state.attire.materialMode === 'auto' ? ' active' : '');
            autoBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size:11px;vertical-align:text-top;margin-right:3px;">auto_awesome</span>자동 (Auto)`;
            autoBtn.addEventListener('click', () => {
                state.attire.materialMode = 'auto';
                const cData = ATTIRE_DATA[state.attire.category]; const currentItem = cData.items.find(i => i.n === state.attire.item);
                if (currentItem && currentItem.dm) state.attire.material = currentItem.dm;
                renderL3(); updatePrompt();
            });
            wrap.appendChild(autoBtn);
            ATTIRE_DATA[state.attire.category].materials.forEach(mat => {
                const chip = document.createElement('button'); chip.className = 'chip' + (state.attire.materialMode === 'manual' && mat === state.attire.material ? ' active' : '');
                chip.textContent = mat;
                chip.addEventListener('click', () => { state.attire.materialMode = 'manual'; state.attire.material = mat; renderL3(); updatePrompt(); });
                wrap.appendChild(chip);
            });
        }
        function renderL4() {
            const wrap = document.getElementById('status-chips'); if (!wrap) return; wrap.innerHTML = '';
            ATTIRE_STATUS.forEach(st => {
                const chip = document.createElement('button'); chip.className = 'chip' + (st === state.attire.status ? ' active' : '');
                chip.textContent = st;
                chip.addEventListener('click', () => { state.attire.status = st; renderL4(); updatePrompt(); });
                wrap.appendChild(chip);
            });
        }

        function makeChips(containerId, items, stateKey, isObjArr = false, maxCount = 0) {
            const c = document.getElementById(containerId); if (!c) return; c.innerHTML = '';
            items.forEach(item => {
                const val = isObjArr ? item.ko : item;
                const isActive = Array.isArray(state[stateKey]) ? state[stateKey].includes(val) : state[stateKey] === val;
                const isMaxed = maxCount > 0 && Array.isArray(state[stateKey]) && state[stateKey].length >= maxCount && !isActive;
                const btn = document.createElement('button'); btn.className = 'chip' + (isActive ? ' active' : '') + (isMaxed ? ' disabled' : '');
                if (isMaxed) btn.style.opacity = '0.4';
                if (isObjArr && item.c) btn.innerHTML = `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${item.c};margin-right:4px;vertical-align:middle;border:1px solid #555;"></span>${val}`;
                else btn.textContent = val;
                btn.addEventListener('click', () => {
                    if (isMaxed) return;
                    if (Array.isArray(state[stateKey])) {
                        const idx = state[stateKey].indexOf(val);
                        if (idx > -1) state[stateKey].splice(idx, 1); else state[stateKey].push(val);
                    } else {
                        state[stateKey] = val;
                    }
                    makeChips(containerId, items, stateKey, isObjArr, maxCount); updatePrompt();
                });
                c.appendChild(btn);
            });
        }

        function updateMixLock(activeKey) {
            ['ca', 'ba', 'cb'].forEach(k => {
                const sl = document.getElementById(`slider-mix-${k}`); if (!sl) return;
                if (k !== activeKey) { sl.disabled = true; sl.value = 0; state.race[`mix${k.toUpperCase()}`] = 0; document.getElementById(`bar-mix-${k}`).style.width = '0%'; }
                else sl.disabled = false;
            });
        }

        /* ══════════════════════════════════════════
           INIT
        ══════════════════════════════════════════ */
