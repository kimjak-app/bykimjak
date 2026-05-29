let prevPromptVarsRows = [];
        let prevPromptTextRaw = '';
        let prevPromptTextLines = [];
        let prevSeqLines = [];
        let prevSeqBlocks = {};
        let latestSequencePromptRaw = '';

        function escapeHtml(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function splitPromptToLines(text) {
            if (!text) return [];
            return String(text)
                .replace(/\s+/g, ' ')
                .replace(/\.\s+/g, '.\n')
                .split('\n')
                .map(s => s.trim())
                .filter(Boolean);
        }

        function renderHighlightedLines(containerId, lines, prevLines, formatter) {
            const el = document.getElementById(containerId);
            if (!el) return;
            el.innerHTML = lines.map((line, idx) => {
                const cls = prevLines[idx] !== line ? 'line-flash' : '';
                return formatter(line, cls, idx);
            }).join('');
        }

        function renderHighlightedBlocks(containerId, blocks, prevBlocks) {
            const el = document.getElementById(containerId);
            if (!el) return;
            el.innerHTML = blocks.map(block => {
                const prev = prevBlocks[block.key] || '';
                const cls = prev !== block.value ? 'block-flash' : '';
                return `<div class="compiler-block ${cls}" data-block="${String(block.key).toLowerCase()}"><div class="compiler-block-title">[${block.label}]</div><div class="compiler-block-body">${escapeHtml(block.value)}</div></div>`;
            }).join('');
        }

function updateTerminalView() {
            const chstView = document.getElementById('term-chst-view');
            const seqView = document.getElementById('term-seq-view');
            const btnCopy = document.getElementById('btn-copy');
            const seqBtns = document.getElementById('seq-footer-btns');
            const chstBtns = document.getElementById('chst-footer-btns');
            const badge = document.getElementById('terminal-mode-badge');

            if (state.view === 'sequence') {
                if (chstView) chstView.style.display = 'none';
                if (seqView) { seqView.style.display = 'flex'; }
                if (btnCopy) btnCopy.style.display = 'none';
                if (seqBtns) seqBtns.style.display = 'flex';
                if (chstBtns) chstBtns.style.display = 'none';
                if (badge) badge.textContent = 'SEQ';
                buildSeqPrompt();
            } else {
                if (chstView) chstView.style.display = 'flex';
                if (seqView) seqView.style.display = 'none';
                if (btnCopy) btnCopy.style.display = 'flex';
                if (seqBtns) seqBtns.style.display = 'none';
                if (chstBtns) chstBtns.style.display = 'grid';
                if (badge) badge.textContent = state.view === 'character' ? 'CH' : 'IMG';
                updatePrompt();
            }
        }
