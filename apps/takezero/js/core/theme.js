function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.themeVal === theme);
    });
    try { localStorage.setItem('tz_theme', theme); } catch (e) {}
}

function initThemeControls() {
    const savedTheme = localStorage.getItem('tz_theme') || 'dark';
    applyTheme(savedTheme);
    const btnSet = document.getElementById('btn-settings');
    if (btnSet) btnSet.addEventListener('click', e => {
        e.stopPropagation();
        document.getElementById('settings-dropdown').classList.toggle('open');
    });
    document.addEventListener('click', () => {
        const drop = document.getElementById('settings-dropdown');
        if (drop) drop.classList.remove('open');
    });
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => applyTheme(btn.dataset.themeVal));
    });
}
