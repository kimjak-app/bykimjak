function buildChipUI(containerId, groups, stateArr, conflictMap, maxCount, counterId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';

            function refreshAll() {
                const conflicted = new Set();
                stateArr.forEach(ko => { (conflictMap[ko] || []).forEach(c => conflicted.add(c)); });
                const maxed = stateArr.length >= maxCount;

                container.querySelectorAll('.pchip').forEach(btn => {
                    const ko = btn.dataset.ko;
                    const isActive = stateArr.includes(ko);
                    const isConflicted = conflicted.has(ko);
                    const isLocked = !isActive && (isConflicted || maxed);

                    btn.classList.toggle('active', isActive);
                    btn.classList.toggle('disabled', isLocked);
                    btn.style.opacity = isConflicted && !isActive ? '0.25' : isLocked && !isConflicted ? '0.4' : '1';
                });
                const counter = document.getElementById(counterId);
                if (counter) { counter.textContent = `${stateArr.length} / ${maxCount}`; counter.style.color = stateArr.length >= maxCount ? '#ffb4ab' : 'var(--acc)'; }
                updatePrompt();
            }

            groups.forEach(g => {
                const section = document.createElement('div');
                section.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
                const title = document.createElement('div'); title.className = 'sec-sub'; title.style.marginBottom = '4px'; title.textContent = g.group;
                section.appendChild(title);
                const chipWrap = document.createElement('div'); chipWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px;';
                g.chips.forEach(c => {
                    const btn = document.createElement('button'); btn.className = 'chip pchip'; btn.dataset.ko = c.ko; btn.textContent = c.ko;
                    btn.addEventListener('click', () => {
                        if (btn.classList.contains('disabled') && !stateArr.includes(c.ko)) return;
                        const idx = stateArr.indexOf(c.ko);
                        if (idx >= 0) stateArr.splice(idx, 1);
                        else { if (stateArr.length >= maxCount) return; stateArr.push(c.ko); }
                        refreshAll();
                    });
                    chipWrap.appendChild(btn);
                });
                section.appendChild(chipWrap); container.appendChild(section);
            });
            refreshAll();
        }
