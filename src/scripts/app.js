// =======================================================
// NihonGo! Main Application Controller
// GitHub × GitLab Developer UI Architecture
// Multi-Theme Engine • Zero Emojis • Fast Search Palette
// Credit: nugra21.web.app
// =======================================================

const _tauriAvailable = !!(window.__TAURI__);
const invoke = _tauriAvailable
    ? window.__TAURI__.core.invoke
    : mockInvoke;

// =======================================================
// 0. CUSTOM GITHUB DESKTOP WINDOW CONTROLS (TAURI 2.0)
// =======================================================
async function windowMinimize() {
    try {
        await invoke('app_minimize');
    } catch (e) {
        console.warn('Window minimize:', e);
    }
}

async function windowToggleMaximize() {
    try {
        await invoke('app_toggle_maximize');
    } catch (e) {
        console.warn('Window toggle maximize:', e);
    }
}

async function windowClose() {
    try {
        await invoke('app_close');
    } catch (e) {
        console.warn('Window close:', e);
    }
}

function setupTitlebarDragging() {
    const titlebar = document.getElementById('custom-titlebar');
    if (!titlebar) return;

    titlebar.addEventListener('mousedown', (e) => {
        // Do not trigger window drag on buttons or controls
        if (e.target.closest('.titlebar-controls') || e.target.closest('button')) return;
        if (e.button === 0) { // Primary left click
            try {
                invoke('app_start_dragging');
            } catch (err) {
                console.warn('Start dragging error:', err);
            }
        }
    });

    titlebar.addEventListener('dblclick', (e) => {
        if (e.target.closest('.titlebar-controls') || e.target.closest('button')) return;
        windowToggleMaximize();
    });
}

// =======================================================
// UI SOUND FX ENGINE (WEB AUDIO API SYNTHESIZER)
// Zero external files • Crisp subtle clicks • Full toggle control
// =======================================================
let audioCtx = null;
const SOUND_STORAGE_KEY = 'kamui_sound_enabled';

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function isSoundEnabled() {
    return localStorage.getItem(SOUND_STORAGE_KEY) !== 'false';
}

function setSoundEnabled(enabled) {
    localStorage.setItem(SOUND_STORAGE_KEY, enabled ? 'true' : 'false');
    const toggle = document.getElementById('sound-fx-toggle');
    if (toggle) toggle.checked = enabled;
    const profileToggle = document.getElementById('profile-sound-toggle');
    if (profileToggle) profileToggle.checked = enabled;
    if (enabled) playClickSound();
    showToast(enabled ? 'Efek suara UI diaktifkan.' : 'Efek suara UI dinonaktifkan.', 'info');
}

function playClickSound() {
    if (!isSoundEnabled()) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.045);
    } catch (e) {}
}

function playSuccessSound() {
    if (!isSoundEnabled()) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sine';

        osc1.frequency.setValueAtTime(523.25, now);
        osc1.frequency.setValueAtTime(659.25, now + 0.08);

        osc2.frequency.setValueAtTime(783.99, now + 0.08);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now + 0.08);
        osc1.stop(now + 0.24);
        osc2.stop(now + 0.24);
    } catch (e) {}
}

function playErrorSound() {
    if (!isSoundEnabled()) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(160, now + 0.06);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
    } catch (e) {}
}

function setupGlobalSoundFx() {
    document.addEventListener('click', (e) => {
        const clickable = e.target.closest('button, .gh-tab-btn, .gh-pill, .palette-num-btn, .exam-option-btn, .action-card, .kanji-grid-card, .char-card, .dict-pos-pill');
        if (clickable) {
            playClickSound();
        }
    }, true);
}

window.isSoundEnabled = isSoundEnabled;
window.setSoundEnabled = setSoundEnabled;
window.playClickSound = playClickSound;
window.playSuccessSound = playSuccessSound;
window.playErrorSound = playErrorSound;

// =======================================================
// 1. MULTI-COLOR THEME ENGINE (8 DISTINCT PALETTES)
// =======================================================
const THEMES = [
    {
        id: 'ios-liquid-glass',
        name: 'Apple iOS Liquid Glass (Unggulan)',
        desc: 'Estetika premium Apple iOS Glassmorphism: kaca frosted transparan, specular highlight, dan aksen biru kobalt',
        colors: ['#0b101b', '#0a84ff', '#30d158', 'rgba(255,255,255,0.14)'],
        mode: 'dark'
    },
    {
        id: 'ios-light-glass',
        name: 'Apple iOS Light Glass (Mode Terang)',
        desc: 'Kaca frosted mutiara putih bersih ala Apple iOS, aksen biru langit dan abu-abu slate elegan',
        colors: ['#f2f2f7', '#007aff', '#34c759', '#e5e5ea'],
        mode: 'light'
    },
    {
        id: 'sakura-light',
        name: 'Sakura Blossom Spring (Mode Terang)',
        desc: 'Nuansa musim semi Jepang: putih salju lembut dengan sentuhan kelopak bunga sakura merah muda ceri',
        colors: ['#fdf6f7', '#d63384', '#e83e8c', '#f8d7da'],
        mode: 'light'
    },
    {
        id: 'nordic-snow',
        name: 'Nordic Snow Frost (Mode Terang)',
        desc: 'Glasier kutub utara yang sejuk: putih es mutiara dengan aksen biru laut dingin dan cyan kristal',
        colors: ['#f0f4f8', '#0284c7', '#06b6d4', '#cbd5e1'],
        mode: 'light'
    },
    {
        id: 'coffee-mocha',
        name: 'Coffee & Mocha Barista (Mode Gelap)',
        desc: 'Espresso hangat yang menenangkan mata: beludru cokelat tua pekat, karamel amber, dan emas hangat',
        colors: ['#161210', '#d97706', '#f59e0b', '#382b26'],
        mode: 'dark'
    },
    {
        id: 'synthwave-80s',
        name: 'Synthwave 80s Sunset (Mode Gelap)',
        desc: 'Retro 80s arcade: ungu midnight neon, hot magenta bercahaya, dan aksen laser sunset gold',
        colors: ['#120e24', '#ff2a85', '#00f0ff', '#2d2254'],
        mode: 'dark'
    },
    {
        id: 'tokyo-night',
        name: 'Tokyo Night Navy (Mode Gelap)',
        desc: 'Nuansa malam kota Tokyo dengan biru badai, magenta neon, dan cyan es sejuk',
        colors: ['#1a1b26', '#7aa2f7', '#bb9af7', '#343b58'],
        mode: 'dark'
    },
    {
        id: 'cyberpunk-neon',
        name: 'Cyberpunk Neon 2077 (Mode Gelap)',
        desc: 'Gaya futuristik synthwave dengan hot pink neon, electric cyan, dan laser yellow tajam',
        colors: ['#0c0d14', '#ff2a6d', '#05d9e8', '#2d3552'],
        mode: 'dark'
    },
    {
        id: 'sunset-tangerine',
        name: 'Sunset Tangerine (Mode Gelap)',
        desc: 'Palet oranye hangat matahari terbenam Jepang dengan kontras gelap elegan',
        colors: ['#131418', '#ff7849', '#ff9500', '#333845'],
        mode: 'dark'
    },
    {
        id: 'dracula',
        name: 'Dracula Pro (Mode Gelap)',
        desc: 'Skema warna populer programmer: ungu vampir, merah muda, dan mint pastel',
        colors: ['#282a36', '#bd93f9', '#ff79c6', '#4d5166'],
        mode: 'dark'
    },
    {
        id: 'emerald-matrix',
        name: 'Emerald Matrix (Mode Gelap)',
        desc: 'Tema hacker obsidian dengan aksen hijau zamrud cyber dan mint bercahaya',
        colors: ['#0a0f0d', '#00ff87', '#60efff', '#253d30'],
        mode: 'dark'
    },
    {
        id: 'github-dark',
        name: 'GitHub Dark Primer (Mode Gelap)',
        desc: 'Nuansa slate gelap ikonik GitHub dengan aksen hijau emerald dan biru primer',
        colors: ['#0d1117', '#238636', '#58a6ff', '#30363d'],
        mode: 'dark'
    },
    {
        id: 'gitlab-dark',
        name: 'GitLab Tanuki Dark (Mode Gelap)',
        desc: 'Nuansa arang pekat GitLab dengan aksen ungu Tanuki dan oranye terang',
        colors: ['#18191c', '#7b58c3', '#fc6d26', '#3b3e45'],
        mode: 'dark'
    }
];

function applyTheme(themeId) {
    const selected = THEMES.find(t => t.id === themeId) || THEMES[0];
    if (selected.id === 'github-dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', selected.id);
    }
    localStorage.setItem('nihongo_theme', selected.id);

    // Update status bar label
    const sbLabel = document.getElementById('sb-theme-label');
    if (sbLabel) {
        sbLabel.textContent = `Theme: ${selected.name}`;
    }

    renderThemeGrid();
}

function initTheme() {
    const saved = localStorage.getItem('nihongo_theme') || 'ios-liquid-glass';
    applyTheme(saved);
}

function openThemeModal() {
    const modal = document.getElementById('theme-modal');
    if (modal) {
        renderThemeGrid();
        modal.classList.add('open');
    }
}

function closeThemeModal() {
    const modal = document.getElementById('theme-modal');
    if (modal) modal.classList.remove('open');
}

function closeThemeModalOnBackdrop(e) {
    if (e.target.id === 'theme-modal') {
        closeThemeModal();
    }
}

function renderThemeGrid() {
    const grid = document.getElementById('theme-grid');
    if (!grid) return;
    const currentTheme = localStorage.getItem('nihongo_theme') || 'ios-liquid-glass';

    grid.innerHTML = THEMES.map(t => {
        const isActive = t.id === currentTheme;
        return `
            <div class="theme-card ${isActive ? 'active' : ''}" onclick="selectTheme('${t.id}')">
                <div class="theme-card-header">
                    <span class="theme-card-title">${t.name}</span>
                    <span class="theme-active-indicator">${icon('check', 14)} AKTIF</span>
                </div>
                <div class="theme-swatches">
                    ${t.colors.map(c => `<div class="theme-swatch-dot" style="background:${c};" title="${c}"></div>`).join('')}
                </div>
                <p class="theme-card-desc">${t.desc}</p>
            </div>
        `;
    }).join('');
}

function selectTheme(themeId) {
    applyTheme(themeId);
    showToast(`Tema diterapkan: ${THEMES.find(t => t.id === themeId)?.name || themeId}`, 'success');
}

// =======================================================
// 2. SCORING & XP GAMIFICATION SYSTEM
// =======================================================
let xpState = {
    totalXP: 0,
    level: 1,
    currentXP: 0,
    xpToNext: 100,
};

function getLevel(xp) {
    let lvl = 1;
    let needed = 100;
    let total = 0;
    while (total + needed <= xp) {
        total += needed;
        lvl++;
        needed = Math.floor(100 * Math.pow(1.3, lvl - 1));
    }
    return { level: lvl, currentXP: xp - total, xpToNext: needed, totalXP: xp };
}

function addXP(amount) {
    xpState.totalXP += amount;
    const info = getLevel(xpState.totalXP);
    xpState = { ...info };
    localStorage.setItem('nihongo_xp', xpState.totalXP);
    updateMetrics();
    return amount;
}

function loadXP() {
    const saved = localStorage.getItem('nihongo_xp');
    if (saved) {
        xpState.totalXP = parseInt(saved) || 0;
        const info = getLevel(xpState.totalXP);
        xpState = { ...info };
    }
    updateMetrics();
}

function updateMetrics(streak = null) {
    const xpEl = document.getElementById('top-xp-count');
    if (xpEl) xpEl.textContent = `Lv.${xpState.level} • ${xpState.totalXP} XP`;
    if (streak !== null) {
        const streakEl = document.getElementById('top-streak-count');
        if (streakEl) streakEl.textContent = `${streak} Hari`;
    }
}

// =======================================================
// 3. NAVIGATION CONTROLLER (GITHUB REPOSITORY TABS)
// =======================================================
let currentPage = 'home';
let selectedKanjiLevel = 'all';
let selectedVocabLevel = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initTheme();
    loadXP();
    setupNavigation();
    setupKeyboardShortcuts();
    setupTitlebarDragging();
    setupGlobalSoundFx();
    if (window.initAuthSystem) window.initAuthSystem();
    navigateTo('home');
});

// ---- Sidebar Toggle ----
let _sidebarOpen = true;
function toggleSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;
    _sidebarOpen = !_sidebarOpen;
    if (_sidebarOpen) {
        sidebar.classList.remove('sidebar-collapsed');
    } else {
        sidebar.classList.add('sidebar-collapsed');
    }
}
function closeSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) sidebar.classList.add('sidebar-collapsed');
    _sidebarOpen = false;
}
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;


function toggleSoundFxQuick() {
    const nextState = !isSoundEnabled();
    setSoundEnabled(nextState);
    updateSoundIconButton();
}

function updateSoundIconButton() {
    const el = document.getElementById('sound-icon-placeholder');
    if (!el) return;
    const enabled = isSoundEnabled();
    el.innerHTML = enabled ? icon('volume2', 17) : icon('volumeX', 17);
    const btn = document.getElementById('topbar-sound-btn');
    if (btn) btn.title = enabled ? 'Suara UI: Menyala (Klik untuk Mematikan)' : 'Suara UI: Mati (Klik untuk Menyalakan)';
}
window.toggleSoundFxQuick = toggleSoundFxQuick;
window.updateSoundIconButton = updateSoundIconButton;

function initIcons() {
    // Custom Titlebar Icons
    const safeSet = (id, html) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    };

    safeSet('win-min-icon', icon('windowMin', 12));
    safeSet('win-max-icon', icon('windowMax', 12));
    safeSet('win-close-icon', icon('windowClose', 12));

    // Top Bar icons
    safeSet('hamburger-icon', icon('menu', 18));
    safeSet('search-icon-placeholder', icon('search', 15));
    safeSet('flame-icon-placeholder', icon('flame', 15));
    safeSet('zap-icon-placeholder', icon('zap', 15));
    safeSet('palette-icon-placeholder', icon('palette', 16));
    safeSet('topbar-chevron-icon', icon('chevronDown', 12));

    // Sidebar nav icons
    safeSet('snav-home-icon', icon('home', 16));
    safeSet('snav-progress-icon', icon('barChart', 16));
    safeSet('snav-hiragana-icon', icon('layers', 16));
    safeSet('snav-katakana-icon', icon('layers', 16));
    safeSet('snav-kanji-icon', icon('book', 16));
    safeSet('snav-stroke-icon', icon('penTool', 16));
    safeSet('snav-vocab-icon', icon('repo', 16));
    safeSet('snav-dict-icon', icon('dictionary', 16));
    safeSet('snav-grammar-icon', icon('bookOpen', 16));
    safeSet('snav-particle-icon', icon('code', 16));
    safeSet('snav-quiz-icon', icon('target', 16));
    safeSet('snav-hardcore-icon', icon('skull', 16));
    safeSet('snav-duo-icon', icon('sparkles', 16));
    safeSet('snav-game-icon', icon('gamepad', 16));
    safeSet('snav-settings-icon', icon('settings', 16));

    // Modal icons
    safeSet('modal-theme-icon', icon('palette', 18));
    safeSet('modal-theme-close-icon', icon('x', 18));
    safeSet('palette-search-icon', icon('search', 18));
    safeSet('modal-profile-icon', icon('user', 18));
    safeSet('modal-profile-close-icon', icon('x', 18));
    safeSet('pw-prompt-icon', icon('alertTriangle', 26));

    // Legacy status bar (kept for compat)
    const safeGet = id => document.getElementById(id);
    if (safeGet('sb-branch-icon')) safeSet('sb-branch-icon', icon('gitBranch', 12));
    if (safeGet('branch-icon-placeholder')) safeSet('branch-icon-placeholder', icon('gitBranch', 13));
}

function setupNavigation() {
    // Sidebar nav items
    document.querySelectorAll('.sidebar-nav-item[data-page]').forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.page));
    });

    // Legacy tab buttons (backward compat)
    document.querySelectorAll('.gh-tab-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.page));
    });
}

function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        // Exam Lockdown Protection
        if (window.isExamLockdownActive && window.isExamLockdownActive()) {
            if (e.key === '/' || (e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key >= '1' && e.key <= '9' && document.activeElement.tagName !== 'INPUT')) {
                e.preventDefault();
                showToast('[LOCK] Ujian Sedang Berlangsung: Menu & pintasan dikunci demi integritas simulasi.', 'warning');
                return;
            }
        }

        // Quick Search: "/" or Ctrl+K
        if ((e.key === '/' && document.activeElement.tagName !== 'INPUT') || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
            e.preventDefault();
            openSearchModal();
            return;
        }

        // Close modals on ESC
        if (e.key === 'Escape') {
            closeSearchModal();
            closeThemeModal();
            const strokeModal = document.querySelector('.stroke-modal-overlay');
            if (strokeModal) strokeModal.remove();
            return;
        }

        // Number keys 1-9 to switch tabs when not typing in an input
        if (document.activeElement.tagName !== 'INPUT' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            const pages = ['home', 'hiragana', 'katakana', 'kanji', 'vocabulary', 'strokes', 'quiz', 'minigame', 'progress'];
            const num = parseInt(e.key);
            if (num >= 1 && num <= pages.length) {
                navigateTo(pages[num - 1]);
            }
        }
    });
}

function navigateTo(page, param) {
    if (window.isExamLockdownActive && window.isExamLockdownActive() && page !== 'quiz') {
        showToast('[LOCK] Mode Ujian Terkunci: Harap kumpulkan atau batalkan ujian terlebih dahulu sebelum membuka menu lain.', 'warning');
        return;
    }

    currentPage = page;

    // Update active sidebar nav item
    document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });
    // Also update legacy tab buttons if present
    document.querySelectorAll('.gh-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });

    const content = document.getElementById('content');
    content.scrollTop = 0;

    switch (page) {
        case 'home': renderHomePage(content); break;
        case 'grammar': renderGrammarPage(content, param); break;
        case 'particles': renderParticlesPage(content); break;
        case 'hiragana': renderKanaPage(content, 'hiragana'); break;
        case 'katakana': renderKanaPage(content, 'katakana'); break;
        case 'kanji':
            if (param) selectedKanjiLevel = param;
            renderKanjiPage(content);
            break;
        case 'strokes': renderStrokeRulesPage(content); break;
        case 'vocabulary':
            if (param) selectedVocabLevel = param;
            renderVocabPage(content);
            break;
        case 'dictionary': renderDictionaryPage(content); break;
        case 'duolingo': renderDuolingoPage(content); break;
        case 'quiz': renderQuizSetup(content, param); break;
        case 'hardcore': renderQuizSetup(content, 'hardcore'); break;
        case 'minigame': renderMinigameSetup(content); break;
        case 'progress': renderProgressPage(content); break;
        case 'settings': renderSettingsPage(content); break;
    }
}

// =======================================================
// 4. HOME PAGE (README & REPO OVERVIEW)
// =======================================================
async function renderHomePage(container) {
    let stats = { current_streak: 0, total_studied: 0, accuracy: 0, best_streak: 0 };
    try {
        stats = await invoke('get_stats');
        updateMetrics(stats.current_streak);
    } catch(e) {}

    container.innerHTML = `
        <!-- README Panel Header -->
        <div class="repo-readme-card">
            <div class="repo-readme-header">
                <div style="display:flex;align-items:center;gap:8px">
                    ${icon('book', 16)}
                    <span>README.md — NihonGo! Workspace Overview</span>
                </div>
                <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted)">MIT License • nugra21</span>
            </div>
            <div class="repo-readme-body">
                <h2>日本語を学ぼう — Platform Pembelajaran Bahasa Jepang</h2>
                <p>
                    Aplikasi desktop native berperforma tinggi dibangun dengan <strong>Rust & Tauri 2.0</strong>. 
                    Mencakup kurikulum standar berjenjang <strong>JLPT N5, N4, dan N3</strong> lengkap dengan ratusan Kanji, kosakata esensial, 
                    serta <strong>tata cara urutan penulisan goresan (書き順)</strong> menggunakan kanvas kaligrafi interaktif berbasis grid tradisional (田字格).
                </p>
            </div>
        </div>

        <!-- 3 JLPT Track Cards -->
        <div class="home-levels-grid">
            <div class="level-summary-card n5-card">
                <div>
                    <div class="lsc-header">
                        <span class="lsc-title">Tingkat N5 (Dasar)</span>
                        <span class="level-badge n5">JLPT N5</span>
                    </div>
                    <div class="lsc-desc">Fondasi penting bahasa Jepang: Hiragana, Katakana, kanji dasar (angka, hari, arah), serta tata bahasa kalimat sederhana.</div>
                </div>
                <button class="lsc-btn" onclick="navigateTo('kanji', 'N5')">Buka Modul N5 ${icon('arrowRight', 14)}</button>
            </div>

            <div class="level-summary-card n4-card">
                <div>
                    <div class="lsc-header">
                        <span class="lsc-title">Tingkat N4 (Pemula Lanjut)</span>
                        <span class="level-badge n4">JLPT N4</span>
                    </div>
                    <div class="lsc-desc">Percakapan situasi nyata: stasiun, transportasi, toko belanja, jam kerja kantor, dan kata kerja bentuk majemuk.</div>
                </div>
                <button class="lsc-btn" onclick="navigateTo('kanji', 'N4')">Buka Modul N4 ${icon('arrowRight', 14)}</button>
            </div>

            <div class="level-summary-card n3-card">
                <div>
                    <div class="lsc-header">
                        <span class="lsc-title">Tingkat N3 (Menengah)</span>
                        <span class="level-badge n3">JLPT N3</span>
                    </div>
                    <div class="lsc-desc">Membaca teks autentik: berita surat kabar, artikel sosial politik, istilah sains lingkungan, dan nuansa emosional mendalam.</div>
                </div>
                <button class="lsc-btn" onclick="navigateTo('kanji', 'N3')">Buka Modul N3 ${icon('arrowRight', 14)}</button>
            </div>
        </div>

        <!-- Quick Stats Overview -->
        <div class="stats-row">
            <div class="stat-card">
                <div class="stat-card-header">
                    <span>STREAK AKTIF</span>
                    <span style="color:#ff9500">${icon('flame', 16)}</span>
                </div>
                <div class="stat-value">${stats.current_streak || 0}</div>
                <div class="stat-label">Hari berturut-turut belajar</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <span>KARAKTER DIPELAJARI</span>
                    <span style="color:var(--accent-secondary)">${icon('book', 16)}</span>
                </div>
                <div class="stat-value">${stats.total_studied || 0}</div>
                <div class="stat-label">Total huruf & kanji dikuasai</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <span>AKURASI UJIAN</span>
                    <span style="color:var(--level-n5)">${icon('target', 16)}</span>
                </div>
                <div class="stat-value">${stats.accuracy || 0}%</div>
                <div class="stat-label">Tingkat ketepatan jawaban kuis</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <span>REKOR STREAK</span>
                    <span style="color:var(--accent-purple)">${icon('star', 16)}</span>
                </div>
                <div class="stat-value">${stats.best_streak || 0}</div>
                <div class="stat-label">Pencapaian streak terpanjang</div>
            </div>
        </div>

        <!-- Feature Shortcuts -->
        <div class="quick-actions">
            <h3>${icon('terminal', 18)} Modul Pembelajaran Interaktif (Minna no Nihongo & JLPT)</h3>
            <div class="action-grid">
                <div class="action-card" onclick="navigateTo('grammar')">
                    <div class="action-icon">${icon('bookOpen', 22)}</div>
                    <div class="action-info">
                        <h4>Minna no Nihongo (文法 & 会話)</h4>
                        <p>Pola tata bahasa Bab 1-25 & percakapan situasional</p>
                    </div>
                </div>
                <div class="action-card" onclick="navigateTo('particles')">
                    <div class="action-icon">助</div>
                    <div class="action-info">
                        <h4>Master Partikel (助詞)</h4>
                        <p>Panduan lengkap は, が, を, に, で, へ, dll</p>
                    </div>
                </div>
                <div class="action-card" onclick="navigateTo('strokes')">
                    <div class="action-icon">${icon('penTool', 22)}</div>
                    <div class="action-info">
                        <h4>Tata Cara Penulisan (書き順)</h4>
                        <p>8 Aturan emas goresan & kanvas kaligrafi (田字格)</p>
                    </div>
                </div>
                <div class="action-card" onclick="navigateTo('kanji')">
                    <div class="action-icon">漢</div>
                    <div class="action-info">
                        <h4>Kanji Matrix (N5 • N4 • N3)</h4>
                        <p>Radikal, Onyomi, Kunyomi, dan latihan menulis</p>
                    </div>
                </div>
                <div class="action-card" onclick="navigateTo('vocabulary')">
                    <div class="action-icon">${icon('repo', 22)}</div>
                    <div class="action-info">
                        <h4>Kosakata (語彙)</h4>
                        <p>Kamus kosakata esensial dengan pelafalan suara</p>
                    </div>
                </div>
                <div class="action-card" onclick="navigateTo('duolingo')">
                    <div class="action-icon">${icon('sparkles', 22)}</div>
                    <div class="action-info">
                        <h4>Kotoba Arena (言葉並べ - Susun Kalimat)</h4>
                        <p>Game susun kata interaktif dengan 5 nyawa & sound effects</p>
                    </div>
                </div>
                <div class="action-card" onclick="navigateTo('dictionary')">
                    <div class="action-icon">${icon('dictionary', 22)}</div>
                    <div class="action-info">
                        <h4>Kamus Lengkap (辞書 N5-N3)</h4>
                        <p>Pencarian kosakata instan dengan audio pelafalan & contoh</p>
                    </div>
                </div>
                <div class="action-card" onclick="navigateTo('quiz')">
                    <div class="action-icon">${icon('target', 22)}</div>
                    <div class="action-info">
                        <h4>Simulasi Ujian & Kuis JLPT</h4>
                        <p>Latihan interaktif dengan evaluasi dan hadiah XP</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// =======================================================
// 4B. MINNA NO NIHONGO (GRAMMAR & KAIWA)
// =======================================================
let selectedGrammarChapter = 1;

async function renderGrammarPage(container, targetChapter) {
    if (targetChapter) selectedGrammarChapter = parseInt(targetChapter);

    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${icon('bookOpen', 24)}</span> Minna no Nihongo (みんなの日本語)</h1>
                <div class="header-subtitle">Kurikulum tata bahasa standar buku Minna no Nihongo Bab 1-25 lengkap dengan pola kalimat dan percakapan kontekstual (Kaiwa)</div>
            </div>
        </div>

        <div class="grammar-chapter-nav" id="grammar-chapter-nav">
            <div style="color:var(--text-muted);font-size:12px;padding:6px">Memuat daftar bab...</div>
        </div>

        <div id="grammar-chapter-content">
            <div style="color:var(--text-muted);padding:24px">Memuat materi bab...</div>
        </div>
    `;

    try {
        const lessons = await invoke('get_grammar_lessons');
        const nav = document.getElementById('grammar-chapter-nav');
        if (lessons && lessons.length > 0) {
            nav.innerHTML = lessons.map(l => `
                <button class="chapter-nav-btn ${l.chapter === selectedGrammarChapter ? 'active' : ''}" data-ch="${l.chapter}">
                    Bab ${l.chapter}
                </button>
            `).join('');

            nav.addEventListener('click', (e) => {
                const btn = e.target.closest('.chapter-nav-btn');
                if (!btn) return;
                selectedGrammarChapter = parseInt(btn.dataset.ch);
                nav.querySelectorAll('.chapter-nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderChapterDetails(lessons.find(l => l.chapter === selectedGrammarChapter));
            });

            const activeLesson = lessons.find(l => l.chapter === selectedGrammarChapter) || lessons[0];
            renderChapterDetails(activeLesson);
        }
    } catch(e) {
        document.getElementById('grammar-chapter-content').innerHTML = `<div style="color:var(--status-danger)">Gagal memuat materi: ${e}</div>`;
    }
}

function renderChapterDetails(lesson) {
    const container = document.getElementById('grammar-chapter-content');
    if (!container || !lesson) return;

    container.innerHTML = `
        <div class="repo-readme-card" style="margin-bottom:20px">
            <div class="repo-readme-header">
                <div style="display:flex;align-items:center;gap:8px">
                    ${icon('book', 16)}
                    <span>${lesson.title}</span>
                </div>
                <span class="level-badge n5">Minna no Nihongo I</span>
            </div>
            <div class="repo-readme-body">
                <h3 style="font-size:16px;color:var(--accent-secondary);margin-bottom:6px">${lesson.subtitle}</h3>
                <p>${lesson.summary}</p>
            </div>
        </div>

        <!-- Pola Kalimat (Grammar Patterns) -->
        <h3 style="font-size:16px;font-weight:700;margin-bottom:14px;color:var(--text-primary);display:flex;align-items:center;gap:8px">
            ${icon('layers', 18)} Pola Tata Bahasa Utama (文法)
        </h3>

        ${lesson.patterns.map((p, idx) => `
            <div class="grammar-card">
                <div class="grammar-card-header">
                    <span class="grammar-pattern-title">${idx + 1}. ${p.pattern}</span>
                    <span class="grammar-pattern-meaning">${p.meaning}</span>
                </div>
                <div class="grammar-card-body">
                    <div class="grammar-explanation">${p.explanation}</div>
                    <div class="grammar-examples-list">
                        <strong style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px">Contoh Kalimat:</strong>
                        ${p.examples.map(ex => `
                            <div class="grammar-example-item">
                                <div class="example-text-col">
                                    <span class="example-jp">${ex.japanese}</span>
                                    <span class="example-romaji">${ex.romaji}</span>
                                    <span class="example-id">${ex.indonesian}</span>
                                </div>
                                <button class="vocab-audio-btn" onclick="speakWord('${ex.japanese.replace(/[。、]/g, '')}')" title="Dengarkan Suara Asli">
                                    ${icon('volume2', 15)}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('')}

        <!-- Percakapan Nyata (Kaiwa) -->
        ${lesson.kaiwa && lesson.kaiwa.length > 0 ? `
            <div class="kaiwa-section">
                <div class="kaiwa-header">
                    ${icon('user', 18)}
                    <span>Praktik Percakapan Situasional (会話 - Kaiwa)</span>
                </div>
                <div class="kaiwa-dialogs">
                    ${lesson.kaiwa.map(k => `
                        <div class="kaiwa-bubble">
                            <div class="kaiwa-avatar">${k.speaker.charAt(0)}</div>
                            <div class="kaiwa-content">
                                <span class="kaiwa-speaker-name">${k.speaker}</span>
                                <span class="kaiwa-jp">${k.japanese}</span>
                                <span class="kaiwa-romaji">${k.romaji}</span>
                                <span class="kaiwa-id">${k.indonesian}</span>
                            </div>
                            <button class="vocab-audio-btn" onclick="speakWord('${k.japanese.replace(/[。、]/g, '')}')" title="Dengarkan Suara">
                                ${icon('volume2', 15)}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
}

// =======================================================
// 4C. PARTICLE MASTER GUIDE (JOSHI 助詞)
// =======================================================
async function renderParticlesPage(container) {
    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${icon('layers', 24)}</span> Master Partikel Bahasa Jepang (助詞 - Joshi)</h1>
                <div class="header-subtitle">Panduan lengkap fungsi partikel, rumus pola kalimat, perbedaan makna, dan contoh nyata berstandar JLPT</div>
            </div>
        </div>

        <div class="particles-grid" id="particles-grid">
            <div style="color:var(--text-muted);padding:24px">Memuat panduan partikel...</div>
        </div>
    `;

    try {
        const particles = await invoke('get_particles');
        const grid = document.getElementById('particles-grid');
        if (particles && particles.length > 0) {
            grid.innerHTML = particles.map(p => `
                <div class="particle-card">
                    <div class="particle-header">
                        <div class="particle-badge-large">${p.particle}</div>
                        <div class="particle-title-info">
                            <h3>Partikel ${p.particle} [${p.romaji}]</h3>
                            <span>${p.title}</span>
                        </div>
                    </div>
                    <p class="particle-desc">${p.explanation}</p>
                    <div class="particle-rules">
                        <strong style="font-size:11px;text-transform:uppercase;color:var(--text-muted);letter-spacing:0.5px">Fungsi & Aturan Pakai:</strong>
                        ${p.rules.map(r => `<div>• ${r}</div>`).join('')}
                    </div>
                    <div class="grammar-examples-list" style="margin-top:4px">
                        <strong style="font-size:11px;text-transform:uppercase;color:var(--text-muted);letter-spacing:0.5px">Contoh Penggunaan:</strong>
                        ${p.examples.map(ex => `
                            <div class="grammar-example-item" style="padding:8px 10px">
                                <div class="example-text-col">
                                    <span class="example-jp" style="font-size:13.5px">${ex.japanese}</span>
                                    <span class="example-romaji" style="font-size:11px">${ex.romaji}</span>
                                    <span class="example-id" style="font-size:11.5px">${ex.indonesian}</span>
                                </div>
                                <button class="vocab-audio-btn" style="width:26px;height:26px" onclick="speakWord('${ex.japanese.replace(/[。、]/g, '')}')" title="Dengarkan Suara">
                                    ${icon('volume2', 13)}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }
    } catch(e) {
        document.getElementById('particles-grid').innerHTML = `<div style="color:var(--status-danger)">Gagal memuat partikel: ${e}</div>`;
    }
}
// =======================================================
async function renderKanaPage(container, type) {
    const isHira = type === 'hiragana';
    const title = isHira ? 'Hiragana (ひらがな)' : 'Katakana (カタカナ)';
    const subtitle = isHira
        ? 'Huruf dasar bahasa Jepang untuk kata asli, partikel kalimat, dan furigana'
        : 'Huruf khusus untuk kata serapan bahasa asing, onomatopoeia, dan penekanan khusus';

    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${isHira ? 'あ' : 'ア'}</span> ${title}</h1>
                <div class="header-subtitle">${subtitle} • <em>Klik kartu untuk membuka papan latihan goresan</em></div>
            </div>
        </div>

        <div class="gh-filter-bar">
            <div class="group-filter" id="group-filter"></div>
            <div style="font-family:var(--font-mono);font-size:12px;color:var(--text-muted)">Total: 71 Karakter</div>
        </div>

        <div class="char-grid" id="char-grid"><div style="color:var(--text-muted);padding:20px">Memuat data karakter...</div></div>
    `;

    try {
        const chars = await invoke(isHira ? 'get_hiragana' : 'get_katakana');
        const groups = ['all', ...new Set(chars.map(c => c.group))];
        const filterContainer = document.getElementById('group-filter');
        filterContainer.innerHTML = groups.map(g =>
            `<button class="filter-btn ${g === 'all' ? 'active' : ''}" data-group="${g}">
                ${g === 'all' ? 'Semua Baris' : 'Baris ' + g.toUpperCase()}
            </button>`
        ).join('');

        filterContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const group = btn.dataset.group;
            renderKanaGrid(group === 'all' ? chars : chars.filter(c => c.group === group), isHira);
        });

        renderKanaGrid(chars, isHira);
    } catch (e) {
        document.getElementById('char-grid').innerHTML = `<div style="color:var(--status-danger)">Gagal memuat: ${e}</div>`;
    }
}

function renderKanaGrid(chars, isHira) {
    const grid = document.getElementById('char-grid');
    grid.innerHTML = chars.map(ch => `
        <div class="char-card" onclick="openKanaStrokeModal('${ch.character}', '${ch.romaji}', '${ch.group}', ${ch.stroke_count}, ${JSON.stringify(ch.stroke_steps || []).replace(/"/g, '&quot;')})">
            <button class="char-audio-btn" onclick="event.stopPropagation(); playKanaAudio('${ch.character}', '${ch.romaji}')" title="Dengarkan Suara Vokal">
                ${icon('volume2', 13)}
            </button>
            <div class="char-main">${ch.character}</div>
            <div class="char-romaji">${ch.romaji}</div>
            <div class="char-strokes">${ch.stroke_count} goresan</div>
        </div>
    `).join('');
}

function playKanaAudio(character, romaji) {
    speakWord(character);
    showToast(`Pelafalan: "${character}" (${romaji})`, 'info');
}

function openKanaStrokeModal(character, romaji, group, strokes, steps) {
    openStrokeModal({
        character: character,
        title: `${character} — "${romaji}"`,
        subtitle: `Kelompok Baris: ${group.toUpperCase()} • ${strokes} Goresan`,
        badge: `${strokes} Goresan`,
        readings: `Romaji: <strong>${romaji}</strong>`,
        radical: 'Kana Dasar',
        stroke_steps: steps,
    });
}

// =======================================================
// 6. KANJI MATRIX (N5, N4, N3)
// =======================================================
async function renderKanjiPage(container) {
    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${icon('layers', 24)}</span> Database Kanji (漢字 N5 • N4 • N3)</h1>
                <div class="header-subtitle">Daftar kanji lengkap dengan radikal, bacaan Onyomi/Kunyomi, arti, contoh kata kamus (熟語), dan urutan goresan visual</div>
            </div>
        </div>

        <div class="gh-filter-bar" style="flex-wrap:wrap;gap:12px">
            <div class="gh-segmented-group" id="kanji-level-filter">
                <button class="gh-pill ${selectedKanjiLevel === 'all' ? 'active' : ''}" data-level="all">Semua Level</button>
                <button class="gh-pill ${selectedKanjiLevel === 'N5' ? 'active' : ''}" data-level="N5">
                    <span class="level-badge n5">N5</span> Dasar
                </button>
                <button class="gh-pill ${selectedKanjiLevel === 'N4' ? 'active' : ''}" data-level="N4">
                    <span class="level-badge n4">N4</span> Pemula Lanjut
                </button>
                <button class="gh-pill ${selectedKanjiLevel === 'N3' ? 'active' : ''}" data-level="N3">
                    <span class="level-badge n3">N3</span> Menengah
                </button>
            </div>

            <!-- Instant Kanji Search Input -->
            <div style="flex:1;min-width:240px;position:relative">
                <input type="text" id="kanji-search-box" class="gh-filter-input" placeholder="Cari Kanji, Onyomi, Kunyomi, atau arti..." style="width:100%;padding:6px 12px 6px 32px;border-radius:var(--radius-sm);background:var(--bg-canvas);border:1px solid var(--border-default);color:var(--text-primary);font-size:12.5px">
                <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-muted)">${icon('search', 13)}</span>
            </div>

            <div style="font-family:var(--font-mono);font-size:12px;color:var(--text-muted)">
                Filter Aktif: <strong>${selectedKanjiLevel.toUpperCase()}</strong>
            </div>
        </div>

        <div class="kanji-grid" id="kanji-grid"><div style="color:var(--text-muted);padding:24px">Memuat database kanji...</div></div>
    `;

    let allLoadedKanji = [];

    const renderKanjiList = (kanji) => {
        const grid = document.getElementById('kanji-grid');
        if (!grid) return;
        if (kanji.length === 0) {
            grid.innerHTML = '<div style="color:var(--text-muted);padding:24px;text-align:center">Tidak ada kanji ditemukan untuk filter ini.</div>';
            return;
        }
        grid.innerHTML = kanji.map(k => `
            <div class="kanji-card" onclick="openKanjiStrokeModal('${k.character}')">
                <div class="kanji-top">
                    <div class="kanji-char">${k.character}</div>
                    <div class="kanji-info">
                        <div class="kanji-meaning">${k.meaning.join(' • ')}</div>
                        <div class="kanji-reading">ON: ${k.onyomi.map(r => `<span>${r}</span>`).join('') || '-'}</div>
                        <div class="kanji-reading">KUN: ${k.kunyomi.map(r => `<span>${r}</span>`).join('') || '-'}</div>
                        <div class="kanji-badges-row">
                            <span class="level-badge ${k.jlpt_level.toLowerCase()}">${k.jlpt_level}</span>
                            <span class="level-badge" style="background:var(--bg-canvas);border:1px solid var(--border-default);color:var(--text-secondary)">${k.stroke_count} Goresan</span>
                            <span class="level-badge" style="background:var(--bg-canvas);border:1px solid var(--border-default);color:var(--text-secondary)">${k.radical}</span>
                        </div>
                    </div>
                </div>
                ${k.examples && k.examples.length > 0 ? `
                    <div class="kanji-examples">
                        <div style="font-size:10.5px;color:var(--text-dim);font-weight:600;margin-bottom:4px;letter-spacing:0.3px;text-transform:uppercase">Contoh Kata Kamus (熟語):</div>
                        ${k.examples.slice(0, 3).map(ex => `
                            <div class="kanji-example" style="display:flex;align-items:center;justify-content:space-between">
                                <div><strong>${ex.word}</strong> <span style="color:var(--text-secondary);font-size:11px">(${ex.reading})</span> — ${ex.meaning}</div>
                                <button class="vocab-audio-btn" style="width:20px;height:20px;min-width:20px" onclick="event.stopPropagation(); speakWord('${ex.word}')" title="Dengarkan Suara">
                                    ${icon('volume2', 12)}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                <div class="kanji-practice-hint">
                    ${icon('penTool', 13)} Lihat titik awal goresan & latihan kaligrafi
                </div>
            </div>
        `).join('');
    };

    const loadKanji = async (level) => {
        try {
            allLoadedKanji = await invoke('get_kanji', { level });
            renderKanjiList(allLoadedKanji);
        } catch (e) {
            document.getElementById('kanji-grid').innerHTML = `<div style="color:var(--status-danger)">Gagal memuat: ${e}</div>`;
        }
    };

    document.getElementById('kanji-level-filter').addEventListener('click', (e) => {
        const btn = e.target.closest('.gh-pill');
        if (!btn) return;
        selectedKanjiLevel = btn.dataset.level;
        document.querySelectorAll('#kanji-level-filter .gh-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadKanji(selectedKanjiLevel);
    });

    const searchInput = document.getElementById('kanji-search-box');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const q = e.target.value.trim().toLowerCase();
            if (!q) {
                renderKanjiList(allLoadedKanji);
                return;
            }
            const filtered = allLoadedKanji.filter(k =>
                k.character.toLowerCase().includes(q) ||
                k.onyomi.some(o => o.toLowerCase().includes(q)) ||
                k.kunyomi.some(u => u.toLowerCase().includes(q)) ||
                k.meaning.some(m => m.toLowerCase().includes(q)) ||
                (k.examples && k.examples.some(ex => ex.word.toLowerCase().includes(q) || ex.meaning.toLowerCase().includes(q)))
            );
            renderKanjiList(filtered);
        });
    }

    loadKanji(selectedKanjiLevel);
}

function openKanjiStrokeModal(character) {
    lookupAndOpenChar(character);
}

// =======================================================
// 7. VOCABULARY PAGE (WITH PRONUNCIATION AUDIO & SEARCH)
// =======================================================
async function renderVocabPage(container) {
    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${icon('repo', 24)}</span> Kamus Kosakata (語彙 N5 • N4 • N3)</h1>
                <div class="header-subtitle">Kosakata esensial terlengkap dilengkapi pelafalan audio kata dan contoh kalimat, kelas kata, serta pencarian instan</div>
            </div>
        </div>

        <div class="gh-filter-bar" style="flex-wrap:wrap;gap:12px">
            <div class="gh-segmented-group" id="vocab-level-filter">
                <button class="gh-pill ${selectedVocabLevel === 'all' ? 'active' : ''}" data-level="all">Semua Level</button>
                <button class="gh-pill ${selectedVocabLevel === 'N5' ? 'active' : ''}" data-level="N5">
                    <span class="level-badge n5">N5</span> Dasar
                </button>
                <button class="gh-pill ${selectedVocabLevel === 'N4' ? 'active' : ''}" data-level="N4">
                    <span class="level-badge n4">N4</span> Pemula Lanjut
                </button>
                <button class="gh-pill ${selectedVocabLevel === 'N3' ? 'active' : ''}" data-level="N3">
                    <span class="level-badge n3">N3</span> Menengah
                </button>
            </div>

            <!-- Instant Vocab Search Box -->
            <div style="flex:1;min-width:240px;position:relative">
                <input type="text" id="vocab-search-box" class="gh-filter-input" placeholder="Cari kata Jepang, romaji, atau arti Indonesia..." style="width:100%;padding:6px 12px 6px 32px;border-radius:var(--radius-sm);background:var(--bg-canvas);border:1px solid var(--border-default);color:var(--text-primary);font-size:12.5px">
                <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-muted)">${icon('search', 13)}</span>
            </div>

            <div class="vocab-categories" id="vocab-categories" style="margin-bottom:0">
                <button class="category-btn active" data-cat="all">
                    ${icon('grid', 14)} Semua Topik
                </button>
            </div>
        </div>

        <div class="vocab-list" id="vocab-list"><div style="color:var(--text-muted);padding:24px">Memuat kosakata...</div></div>
    `;

    let activeCategory = 'all';
    let allLoadedVocab = [];

    const renderVocabList = (vocab) => {
        const list = document.getElementById('vocab-list');
        if (!list) return;
        if (vocab.length === 0) {
            list.innerHTML = '<div style="color:var(--text-muted);padding:24px;text-align:center">Tidak ada kosakata yang cocok dengan pencarian / filter ini.</div>';
            return;
        }
        list.innerHTML = vocab.map(v => `
            <div class="vocab-item">
                <div style="display:flex;align-items:flex-start;justify-content:space-between">
                    <div class="vocab-word" onclick="lookupAndOpenChar('${v.word.charAt(0)}')">${v.word}</div>
                    <div style="display:flex;align-items:center;gap:6px">
                        <span class="level-badge ${v.jlpt_level.toLowerCase()}">${v.jlpt_level}</span>
                        <button class="vocab-audio-btn" onclick="speakWord('${v.word}')" title="Dengarkan Pelafalan Kata">
                            ${icon('volume2', 15)}
                        </button>
                    </div>
                </div>
                <div class="vocab-reading">${v.reading}</div>
                <div class="vocab-meaning">
                    ${v.meaning}
                    ${v.example_sentence ? `
                        <div class="dict-example-box" style="margin-top:8px;display:flex;align-items:center;justify-content:space-between">
                            <div>
                                <strong style="color:var(--text-primary);font-size:12.5px">${v.example_sentence}</strong>
                                <div style="color:var(--text-muted);font-size:11.5px;margin-top:2px">${v.example_translation || ''}</div>
                            </div>
                            <button class="vocab-audio-btn" style="width:24px;height:24px;min-width:24px" onclick="speakWord('${v.example_sentence.replace(/[。、]/g, '')}')" title="Dengarkan Contoh Kalimat">
                                ${icon('volume2', 13)}
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    };

    const loadVocab = async () => {
        try {
            allLoadedVocab = await invoke('get_vocabulary', { level: selectedVocabLevel, category: activeCategory });
            renderVocabList(allLoadedVocab);
        } catch (e) {
            document.getElementById('vocab-list').innerHTML = `<div style="color:var(--status-danger)">Gagal memuat: ${e}</div>`;
        }
    };

    const searchInput = document.getElementById('vocab-search-box');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const q = e.target.value.trim().toLowerCase();
            if (!q) {
                renderVocabList(allLoadedVocab);
                return;
            }
            const filtered = allLoadedVocab.filter(v =>
                v.word.toLowerCase().includes(q) ||
                v.reading.toLowerCase().includes(q) ||
                v.meaning.toLowerCase().includes(q) ||
                (v.example_sentence && v.example_sentence.toLowerCase().includes(q)) ||
                (v.example_translation && v.example_translation.toLowerCase().includes(q))
            );
            renderVocabList(filtered);
        });
    }

    try {
        const categories = await invoke('get_vocab_categories');
        const catContainer = document.getElementById('vocab-categories');
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.dataset.cat = cat;
            btn.innerHTML = `${icon('book', 13)} ${cat}`;
            catContainer.appendChild(btn);
        });

        catContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.category-btn');
            if (!btn) return;
            activeCategory = btn.dataset.cat;
            catContainer.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadVocab();
        });
    } catch(e) {}

    document.getElementById('vocab-level-filter').addEventListener('click', (e) => {
        const btn = e.target.closest('.gh-pill');
        if (!btn) return;
        selectedVocabLevel = btn.dataset.level;
        document.querySelectorAll('#vocab-level-filter .gh-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadVocab();
    });

    loadVocab();
}

function speakWord(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    } else {
        showToast('Web Speech API tidak didukung di sistem ini.', 'info');
    }
}

// =======================================================
// 8. SETTINGS & REPOSITORY ABOUT PAGE
// =======================================================
function renderSettingsPage(container) {
    const currentTheme = localStorage.getItem('nihongo_theme') || 'ios-liquid-glass';

    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${icon('settings', 24)}</span> Preferences & Repository Config</h1>
                <div class="header-subtitle">Kustomisasi tema tampilan software, data statistik, dan profil pengembang</div>
            </div>
        </div>

        <!-- Creator Profile Card -->
        <div class="settings-section">
            <h3>${icon('user', 18)} Profil Pengembang (Creator)</h3>
            <p>Aplikasi ini dibuat dan dikembangkan secara independen oleh:</p>
            <div class="creator-card">
                <div class="creator-info">
                    <div class="creator-avatar">神</div>
                    <div class="creator-meta">
                        <h4>Ludang Prasetyo Nugroho (nugra21)</h4>
                        <span>Software Engineer • Pemilik & Pembuat Kamui NihonGo</span>
                    </div>
                </div>
                <a href="https://nugra21.web.app" target="_blank" class="creator-link-btn">
                    <span>nugra21.web.app</span>
                    ${icon('externalLink', 14)}
                </a>
            </div>
        </div>

        <!-- Audio & Sound FX Preferences -->
        <div class="settings-section">
            <div style="display:flex;align-items:center;justify-content:space-between">
                <div>
                    <h3 style="margin-bottom:2px">${icon('volume2', 18)} Efek Suara Interaktif (UI Sound FX)</h3>
                    <p style="margin:0;font-size:12.5px;color:var(--text-secondary)">Bunyikan efek suara klik sintetis halus saat menekan tombol, tab navigasi, dan kuis.</p>
                </div>
                <label class="switch-control">
                    <input type="checkbox" id="sound-fx-toggle" ${isSoundEnabled() ? 'checked' : ''} onchange="setSoundEnabled(this.checked)">
                    <span class="switch-slider"></span>
                </label>
            </div>
        </div>

        <!-- Theme Switcher Section -->
        <div class="settings-section">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
                <div>
                    <h3 style="margin-bottom:2px">${icon('palette', 18)} Pilihan Skema Warna & Tema Software</h3>
                    <p style="margin-bottom:0">Pilih salah satu dari 8 tema developer di bawah ini:</p>
                </div>
                <button class="lsc-btn" onclick="openThemeModal()">${icon('palette', 14)} Buka Modal Tema</button>
            </div>
            <div class="theme-picker-grid">
                ${THEMES.map(t => {
                    const isActive = t.id === currentTheme;
                    return `
                        <div class="theme-card ${isActive ? 'active' : ''}" onclick="selectTheme('${t.id}')">
                            <div class="theme-card-header">
                                <span class="theme-card-title">${t.name}</span>
                                <span class="theme-active-indicator" style="display:${isActive ? 'inline-block' : 'none'}">${icon('check', 14)} AKTIF</span>
                            </div>
                            <div class="theme-swatches">
                                ${t.colors.map(c => `<div class="theme-swatch-dot" style="background:${c};"></div>`).join('')}
                            </div>
                            <p class="theme-card-desc">${t.desc}</p>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <!-- Technical Specs & Engine -->
        <div class="settings-section">
            <h3>${icon('terminal', 18)} Spesifikasi Teknis & Lingkungan</h3>
            <div style="font-family:var(--font-mono);font-size:12.5px;color:var(--text-secondary);display:flex;flex-direction:column;gap:6px;background:var(--bg-canvas);padding:14px;border-radius:var(--radius-sm);border:1px solid var(--border-default)">
                <div>• Architecture : Native Rust v1.82 (Tauri 2.0 Engine)</div>
                <div>• OS Target    : Windows 10 / 11 64-bit</div>
                <div>• Standards    : JLPT N5 • JLPT N4 • JLPT N3</div>
                <div>• Icons        : Pure SVG Octicons & Feather (100% Vector, Zero Emojis)</div>
                <div>• Canvas       : HTML5 2D Calligraphy Engine with Quadrant Crosshairs (田字格)</div>
                <div>• Audio        : Web Speech Synthesis (ja-JP)</div>
                <div>• Storage      : Local Storage + Rust Local State Persistence</div>
            </div>
        </div>

        <!-- Data Reset Section -->
        <div class="settings-section">
            <h3>${icon('trash', 18)} Pengelolaan Data & Progres</h3>
            <p>Anda dapat mengatur ulang seluruh riwayat latihan dan perolehan XP:</p>
            <button class="canvas-btn danger" style="max-width:200px" onclick="resetAllData()">
                ${icon('trash', 14)} Reset Data Pembelajaran
            </button>
        </div>
    `;
}

function resetAllData() {
    showConfirmModal({
        title: 'Reset Progres Latihan?',
        message: 'Apakah Anda yakin ingin mengatur ulang data progres latihan dan perolehan XP?',
        confirmText: 'Ya, Reset Data',
        cancelText: 'Batal',
        isDanger: true,
        iconType: 'trash',
        onConfirm: () => {
            localStorage.removeItem('nihongo_xp');
            xpState = { totalXP: 0, level: 1, currentXP: 0, xpToNext: 100 };
            updateMetrics(0);
            showToast('Data progres berhasil direset!', 'info');
            navigateTo('home');
        }
    });
}

// =======================================================
// CENTERED MODAL DIALOGS (REPLACES NATIVE BROWSER ALERTS)
// =======================================================
let currentConfirmCallback = null;
let currentCancelCallback = null;

function showConfirmModal({
    title = 'Konfirmasi Tindakan',
    message = 'Apakah Anda yakin ingin melanjutkan?',
    confirmText = 'Lanjutkan',
    cancelText = 'Batal',
    isDanger = false,
    iconType = 'alertTriangle',
    onConfirm = () => {},
    onCancel = () => {}
}) {
    const modal = document.getElementById('confirm-modal');
    if (!modal) {
        if (confirm(`${title}\n\n${message}`)) {
            onConfirm();
        } else {
            onCancel();
        }
        return;
    }

    currentConfirmCallback = onConfirm;
    currentCancelCallback = onCancel;

    const iconEl = document.getElementById('confirm-modal-icon');
    if (iconEl) {
        iconEl.className = `confirm-icon-center ${isDanger ? 'danger' : 'info'}`;
        iconEl.innerHTML = icon(isDanger ? 'alertTriangle' : (iconType || 'info'), 28);
    }

    const titleEl = document.getElementById('confirm-modal-title');
    if (titleEl) titleEl.textContent = title;

    const msgEl = document.getElementById('confirm-modal-message');
    if (msgEl) msgEl.textContent = message;

    const confirmBtn = document.getElementById('confirm-modal-btn-ok');
    if (confirmBtn) {
        confirmBtn.textContent = confirmText;
        confirmBtn.className = isDanger ? 'btn-danger' : 'btn-primary';
    }

    const cancelBtn = document.getElementById('confirm-modal-btn-cancel');
    if (cancelBtn) cancelBtn.textContent = cancelText;

    modal.style.display = 'flex';
}

function handleConfirmOk() {
    const modal = document.getElementById('confirm-modal');
    if (modal) modal.style.display = 'none';
    if (typeof currentConfirmCallback === 'function') {
        currentConfirmCallback();
    }
}

function handleConfirmCancel() {
    const modal = document.getElementById('confirm-modal');
    if (modal) modal.style.display = 'none';
    if (typeof currentCancelCallback === 'function') {
        currentCancelCallback();
    }
}

function closeConfirmModalOnBackdrop(e) {
    if (e.target.id === 'confirm-modal') {
        handleConfirmCancel();
    }
}

// Password Prompt Modal for Sensitive Actions (e.g. Factory Reset)
let currentPasswordPromptCallback = null;

function showPasswordPromptModal({
    title = 'Konfirmasi Kata Sandi Akun',
    message = 'Masukkan kata sandi Anda untuk verifikasi:',
    onConfirm = () => {}
}) {
    const modal = document.getElementById('password-prompt-modal');
    if (!modal) return;

    currentPasswordPromptCallback = onConfirm;

    const titleEl = document.getElementById('pw-prompt-title');
    if (titleEl) titleEl.textContent = title;

    const msgEl = document.getElementById('pw-prompt-message');
    if (msgEl) msgEl.textContent = message;

    const iconWrapper = document.getElementById('pw-prompt-icon');
    if (iconWrapper) iconWrapper.innerHTML = icon('alertTriangle', 26);

    const input = document.getElementById('pw-prompt-input');
    if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 100);
    }

    modal.style.display = 'flex';
}

function handlePasswordPromptOk(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('password-prompt-modal');
    const input = document.getElementById('pw-prompt-input');
    const entered = input ? input.value : '';
    if (modal) modal.style.display = 'none';
    if (typeof currentPasswordPromptCallback === 'function') {
        currentPasswordPromptCallback(entered);
    }
}

function handlePasswordPromptCancel() {
    const modal = document.getElementById('password-prompt-modal');
    if (modal) modal.style.display = 'none';
}

function closePasswordPromptModalOnBackdrop(e) {
    if (e.target.id === 'password-prompt-modal') {
        handlePasswordPromptCancel();
    }
}

window.showConfirmModal = showConfirmModal;
window.showPasswordPromptModal = showPasswordPromptModal;
window.handleConfirmOk = handleConfirmOk;
window.handleConfirmCancel = handleConfirmCancel;
window.closeConfirmModalOnBackdrop = closeConfirmModalOnBackdrop;
window.handlePasswordPromptOk = handlePasswordPromptOk;
window.handlePasswordPromptCancel = handlePasswordPromptCancel;
window.closePasswordPromptModalOnBackdrop = closePasswordPromptModalOnBackdrop;

// =======================================================
// 9. QUICK SEARCH PALETTE (COMMAND MODAL)
// =======================================================
let searchDataset = [];

async function buildSearchDataset() {
    if (searchDataset.length > 0) return;
    try {
        const kanji = await invoke('get_kanji', { level: 'all' });
        kanji.forEach(k => {
            searchDataset.push({
                char: k.character,
                title: `${k.character} (${k.meaning.join(', ')})`,
                desc: `Kanji ${k.jlpt_level} • ON: ${k.onyomi.join(', ')} • KUN: ${k.kunyomi.join(', ')}`,
                tag: k.jlpt_level,
                action: () => lookupAndOpenChar(k.character)
            });
        });
    } catch(e) {}

    try {
        const hira = await invoke('get_hiragana');
        hira.forEach(h => {
            searchDataset.push({
                char: h.character,
                title: `${h.character} [${h.romaji}]`,
                desc: `Hiragana Baris ${h.group.toUpperCase()} • ${h.stroke_count} goresan`,
                tag: 'Hiragana',
                action: () => lookupAndOpenChar(h.character)
            });
        });
    } catch(e) {}

    try {
        const kata = await invoke('get_katakana');
        kata.forEach(k => {
            searchDataset.push({
                char: k.character,
                title: `${k.character} [${k.romaji}]`,
                desc: `Katakana Baris ${k.group.toUpperCase()} • ${k.stroke_count} goresan`,
                tag: 'Katakana',
                action: () => lookupAndOpenChar(k.character)
            });
        });
    } catch(e) {}

    try {
        const vocab = await invoke('get_vocabulary', { level: 'all', category: 'all' });
        vocab.forEach(v => {
            searchDataset.push({
                char: v.word.charAt(0),
                title: `${v.word} [${v.reading}]`,
                desc: `${v.meaning} • ${v.jlpt_level}`,
                tag: 'Vocab',
                action: () => {
                    navigateTo('vocabulary', v.jlpt_level);
                    speakWord(v.word);
                }
            });
        });
    } catch(e) {}

    try {
        const lessons = await invoke('get_grammar_lessons');
        lessons.forEach(l => {
            searchDataset.push({
                char: `第${l.chapter}`,
                title: l.title,
                desc: l.subtitle,
                tag: 'Minna',
                action: () => navigateTo('grammar', l.chapter)
            });
            l.patterns.forEach(p => {
                searchDataset.push({
                    char: '文',
                    title: `Pola: ${p.pattern}`,
                    desc: `${p.meaning} (Bab ${l.chapter})`,
                    tag: 'Bunpou',
                    action: () => navigateTo('grammar', l.chapter)
                });
            });
        });
    } catch(e) {}

    try {
        const particles = await invoke('get_particles');
        particles.forEach(p => {
            searchDataset.push({
                char: p.particle,
                title: `Partikel ${p.particle} [${p.romaji}]`,
                desc: p.title,
                tag: 'Partikel',
                action: () => navigateTo('particles')
            });
        });
    } catch(e) {}

    if (typeof DICTIONARY_DATABASE !== 'undefined' && Array.isArray(DICTIONARY_DATABASE)) {
        DICTIONARY_DATABASE.slice(0, 40).forEach(d => {
            searchDataset.push({
                char: d.word.charAt(0),
                title: `${d.word} [${d.reading}]`,
                desc: `${d.meaning} (${d.pos}) • ${d.level}`,
                tag: 'Kamus',
                action: () => {
                    navigateTo('dictionary');
                    speakWord(d.word);
                }
            });
        });
    }

    searchDataset.push({
        char: 'K',
        title: 'Kotoba Arena — Susun Kata & Kalimat (言葉並べ)',
        desc: 'Tantangan susun kata interaktif dengan sistem hati, streak & efek suara sintetis',
        tag: 'Arena',
        action: () => navigateTo('duolingo')
    });
}

function openSearchModal() {
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    buildSearchDataset();
    modal.classList.add('open');
    const input = document.getElementById('palette-search-input');
    if (input) {
        input.value = '';
        input.focus();
        renderSearchResults('');
    }
}

function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) modal.classList.remove('open');
}

function closeSearchModalOnBackdrop(e) {
    if (e.target.id === 'search-modal') {
        closeSearchModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('palette-search-input');
    if (input) {
        input.addEventListener('input', (e) => {
            renderSearchResults(e.target.value.trim().toLowerCase());
        });
    }
});

function renderSearchResults(query) {
    const resultsContainer = document.getElementById('palette-results');
    if (!resultsContainer) return;

    if (!query) {
        resultsContainer.innerHTML = `
            <div style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px">
                Ketik nama huruf (misal: "a", "ka", "kaisha"), kanji, atau arti untuk mencari secara instan...
            </div>
        `;
        return;
    }

    const matches = searchDataset.filter(item => {
        return item.title.toLowerCase().includes(query) ||
               item.desc.toLowerCase().includes(query) ||
               item.char.toLowerCase() === query;
    }).slice(0, 15);

    if (matches.length === 0) {
        resultsContainer.innerHTML = `
            <div style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px">
                Tidak ada hasil ditemukan untuk "<strong>${query}</strong>".
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = matches.map((item, idx) => `
        <div class="search-result-item" onclick="executeSearchResult(${idx})">
            <div class="search-result-main">
                <span class="search-result-char">${item.char}</span>
                <div class="search-result-details">
                    <h4>${item.title}</h4>
                    <span>${item.desc}</span>
                </div>
            </div>
            <span class="search-result-tag">${item.tag}</span>
        </div>
    `).join('');

    window._currentSearchMatches = matches;
}

function executeSearchResult(idx) {
    if (window._currentSearchMatches && window._currentSearchMatches[idx]) {
        closeSearchModal();
        window._currentSearchMatches[idx].action();
    }
}

// =======================================================
// 10. TOAST SYSTEM
// =======================================================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = {
        success: icon('checkCircle', 16),
        error: icon('xCircle', 16),
        info: icon('info', 16)
    };
    toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.success}</span> <span>${message}</span>`;
    const container = document.getElementById('toast-container');
    if (container) {
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
    }
}

// =======================================================
// 11. MOCK DATA FALLBACK (STANDALONE TESTING)
// =======================================================
async function mockInvoke(cmd, args) {
    await new Promise(r => setTimeout(r, 40));
    switch (cmd) {
        case 'get_hiragana':
            return [
                { character: "あ", romaji: "a", char_type: "hiragana", group: "vowel", stroke_count: 3, stroke_steps: ["1. Garis horizontal mendatar sedikit naik.", "2. Garis vertikal melengkung memotong di tengah.", "3. Garis melingkar memutar lebar searah jarum jam."] },
                { character: "い", romaji: "i", char_type: "hiragana", group: "vowel", stroke_count: 2, stroke_steps: ["1. Garis lengkung sisi kiri dari atas ke bawah berujung kaitan.", "2. Garis lengkung pendek sisi kanan."] },
                { character: "う", romaji: "u", char_type: "hiragana", group: "vowel", stroke_count: 2, stroke_steps: ["1. Titik garis miring pendek di bagian atas.", "2. Garis lengkung membulat besar ke kanan bawah."] },
                { character: "え", romaji: "e", char_type: "hiragana", group: "vowel", stroke_count: 2, stroke_steps: ["1. Titik pendek miring ke kanan bawah.", "2. Garis berzigzag lalu meliuk ke kanan bawah."] },
                { character: "お", romaji: "o", char_type: "hiragana", group: "vowel", stroke_count: 3, stroke_steps: ["1. Garis horizontal pendek.", "2. Garis vertikal meliuk memutar membentuk simpul.", "3. Titik miring di kanan atas."] },
                { character: "か", romaji: "ka", char_type: "hiragana", group: "k", stroke_count: 3, stroke_steps: ["1. Garis siku melengkung berkait.", "2. Garis miring di sisi kiri.", "3. Titik aksen di kanan atas."] },
            ];
        case 'get_katakana':
            return [
                { character: "ア", romaji: "a", char_type: "katakana", group: "vowel", stroke_count: 2, stroke_steps: ["1. Garis siku mendatar lalu melipat miring tajam ke kiri bawah.", "2. Garis melengkung panjang memotong."] },
                { character: "イ", romaji: "i", char_type: "katakana", group: "vowel", stroke_count: 2, stroke_steps: ["1. Garis miring pendek menyapu ke kiri bawah.", "2. Garis vertikal lurus ke bawah."] },
                { character: "カ", romaji: "ka", char_type: "katakana", group: "k", stroke_count: 2, stroke_steps: ["1. Garis siku mendatar melipat miring tajam ke bawah.", "2. Garis miring memotong menyapu ke kiri."] },
            ];
        case 'get_kanji':
            return [
                { character: "一", onyomi: ["イチ"], kunyomi: ["ひと(つ)"], meaning: ["Satu", "One"], jlpt_level: "N5", stroke_count: 1, stroke_steps: ["1. Tarik garis horizontal dari kiri ke kanan dengan tekanan stabil."], radical: "一 (Ichi)", examples: [{ word: "一人", reading: "ひとり", meaning: "Sendirian" }] },
                { character: "日", onyomi: ["ニチ", "ジツ"], kunyomi: ["ひ", "か"], meaning: ["Matahari", "Hari"], jlpt_level: "N5", stroke_count: 4, stroke_steps: ["1. Garis vertikal kiri.", "2. Garis siku atas-kanan turun ke bawah.", "3. Garis horizontal tengah.", "4. Garis horizontal bawah menutup."], radical: "日 (Hi)", examples: [{ word: "日本", reading: "にほん", meaning: "Jepang" }] },
                { character: "会", onyomi: ["カイ"], kunyomi: ["あ(う)"], meaning: ["Bertemu", "Perusahaan"], jlpt_level: "N4", stroke_count: 6, stroke_steps: ["1. Atap miring ke kiri.", "2. Atap miring ke kanan.", "3. Garis horizontal tengah.", "4. Garis siku.", "5. Garis horizontal dalam.", "6. Garis horizontal penutup."], radical: "人 (Hito)", examples: [{ word: "会社", reading: "かいしゃ", meaning: "Perusahaan" }] },
                { character: "政", onyomi: ["セイ"], kunyomi: ["まつりごと"], meaning: ["Politik", "Pemerintahan"], jlpt_level: "N3", stroke_count: 9, stroke_steps: ["1-5. Tulis komponen 正 di kiri.", "6-9. Tulis radikal pukulan 攵 di kanan."], radical: "攵 (Nogome)", examples: [{ word: "政治", reading: "せいじ", meaning: "Politik" }] },
                { character: "経", onyomi: ["ケイ"], kunyomi: ["へ(る)"], meaning: ["Ekonomi", "Melewati"], jlpt_level: "N3", stroke_count: 11, stroke_steps: ["1-6. Tulis radikal benang 糸 di kiri.", "7-11. Tulis komponen kanan dari atas ke bawah."], radical: "糸 (Ito)", examples: [{ word: "経済", reading: "けいざい", meaning: "Ekonomi" }] },
            ];
        case 'get_stroke_rules':
            return [
                { number: 1, title: "Atas ke Bawah", japanese: "上から下へ", description: "Goresan selalu dimulai dari bagian paling atas menuju ke bagian bawah.", example_chars: ["三", "言", "工"] },
                { number: 2, title: "Kiri ke Kanan", japanese: "左から右へ", description: "Tulis komponen sisi kiri terlebih dahulu sebelum melanjutkan ke sisi kanan.", example_chars: ["川", "休", "明"] },
                { number: 3, title: "Mendatar Sebelum Menegak", japanese: "横が先、縦が後", description: "Ketika garis horizontal dan vertikal berpotongan, tulis garis mendatar dahulu.", example_chars: ["十", "木", "大"] },
                { number: 4, title: "Tengah Dahulu untuk Simetris", japanese: "中が先、左右が後", description: "Pada bentuk simetris bertiang tengah, tulis garis tengah terlebih dahulu baru sayap kiri-kanan.", example_chars: ["小", "水", "山"] },
                { number: 5, title: "Bingkai Luar Sebelum Isi Dalam", japanese: "外が先、中が後", description: "Tulis garis tepi luar kotak terlebih dahulu sebelum mengisi komponen dalamnya.", example_chars: ["日", "月", "国"] },
                { number: 6, title: "Tutup Kotak Paling Terakhir", japanese: "中を入れてから閉じる", description: "Setelah seluruh isi dalam kotak selesai digambar, baru tutup garis bawah kotak.", example_chars: ["田", "四", "回"] },
                { number: 7, title: "Garis Tembus Paling Terakhir", japanese: "貫く画は最後", description: "Garis panjang yang menembus bagian tengah karakter selalu ditarik paling terakhir.", example_chars: ["中", "半", "事"] },
                { number: 8, title: "Titik Minor Paling Akhir", japanese: "点は最後", description: "Titik aksen (ten) di sudut atau di dalam karakter dibubuhkan paling akhir.", example_chars: ["玉", "太", "犬"] },
            ];
        case 'get_vocabulary':
            return [
                { word: "こんにちは", reading: "konnichiwa", meaning: "Halo / Selamat siang", category: "greetings", jlpt_level: "N5", example_sentence: "こんにちは、お元気ですか？", example_translation: "Halo, apa kabar?" },
                { word: "会社員", reading: "kaishain", meaning: "Karyawan perusahaan", category: "work", jlpt_level: "N4", example_sentence: "父は会社員です。", example_translation: "Ayah adalah karyawan." },
                { word: "経済", reading: "keizai", meaning: "Perekonomian / Ekonomi", category: "society", jlpt_level: "N3", example_sentence: "日本の経済を勉強します。", example_translation: "Mempelajari ekonomi Jepang." },
            ];
        case 'get_vocab_categories':
            return ["greetings", "numbers", "family", "food", "time", "work", "travel", "society", "daily"];
        case 'get_grammar_lessons':
            return [
                {
                    chapter: 1,
                    title: "Bab 1: Perkenalan Diri & Pola Dasar です",
                    subtitle: "Watashi wa Miraa desu (Saya adalah Miller)",
                    summary: "Mempelajari cara memperkenalkan diri, menyatakan identitas, pekerjaan, kebangsaan, dan membuat kalimat tanya serta sanggahan.",
                    patterns: [
                        {
                            pattern: "N1 は N2 です",
                            meaning: "N1 adalah N2",
                            explanation: "Partikel は (dibaca 'wa') berfungsi sebagai penanda topik pembicaraan. です diletakkan di akhir untuk memberikan nuansa sopan.",
                            examples: [
                                { japanese: "わたしはマイク・ミラーです。", romaji: "Watashi wa Maiku Miraa desu.", indonesian: "Saya adalah Mike Miller." },
                                { japanese: "サントスさんは会社員です。", romaji: "Santosu-san wa kaishain desu.", indonesian: "Tuan Santos adalah seorang karyawan." }
                            ]
                        },
                        {
                            pattern: "N1 は N2 じゃありません",
                            meaning: "N1 bukan N2",
                            explanation: "Bentuk negatif sopan dari です.",
                            examples: [
                                { japanese: "サントスさんは学生じゃありません。", romaji: "Santosu-san wa gakusei ja arimasen.", indonesian: "Tuan Santos bukan seorang mahasiswa." }
                            ]
                        }
                    ],
                    kaiwa: [
                        { speaker: "佐藤", japanese: "おはようございます。", romaji: "Ohayou gozaimasu.", indonesian: "Selamat pagi." },
                        { speaker: "ミラー", japanese: "初めまして、マイク・ミラーです。どうぞよろしく。", romaji: "Hajimemashite, Maiku Miraa desu. Douzo yoroshiku.", indonesian: "Senang bertemu, saya Mike Miller. Mohon bimbingannya." }
                    ]
                },
                {
                    chapter: 2,
                    title: "Bab 2: Menunjuk Benda これ・それ・あれ",
                    subtitle: "Kore wa hon desu (Ini adalah buku)",
                    summary: "Mempelajari kata tunjuk benda berdasarkan jarak dari pembicara dan lawan bicara, serta partikel の untuk kepemilikan.",
                    patterns: [
                        {
                            pattern: "これ / それ / あれ は N です",
                            meaning: "Ini / Itu adalah N",
                            explanation: "これ (dekat pembicara), それ (dekat lawan bicara), あれ (jauh dari keduanya).",
                            examples: [
                                { japanese: "これは本です。", romaji: "Kore wa hon desu.", indonesian: "Ini adalah buku." }
                            ]
                        }
                    ],
                    kaiwa: [
                        { speaker: "山田", japanese: "これは何ですか。", romaji: "Kore wa nan desu ka.", indonesian: "Ini apa ya?" },
                        { speaker: "ミラー", japanese: "それは辞書です。", romaji: "Sore wa jisho desu.", indonesian: "Itu adalah kamus." }
                    ]
                }
            ];
        case 'get_particles':
            return [
                {
                    particle: "は", romaji: "wa", title: "Partikel Topik Utama",
                    explanation: "Menandai topik pembicaraan kalimat ('Adapun mengenai X...'). Selalu dibaca 'wa'.",
                    rules: ["Menandai topik kalimat: [Topik] は [Penjelasan]", "Menunjukkan kontras saat membandingkan dua hal."],
                    examples: [
                        { japanese: "わたしは学生です。", romaji: "Watashi wa gakusei desu.", indonesian: "Saya adalah seorang siswa." }
                    ]
                },
                {
                    particle: "が", romaji: "ga", title: "Partikel Subjek Gramatikal",
                    explanation: "Menandai subjek gramatikal sejati atau fokus penegas.",
                    rules: ["Menandai subjek dari kata sifat atau kata kerja intransitif: [Subjek] が 好き / あります"],
                    examples: [
                        { japanese: "富士山がきれいです。", romaji: "Fujisan ga kirei desu.", indonesian: "Gunung Fuji sangat indah." }
                    ]
                },
                {
                    particle: "を", romaji: "o", title: "Partikel Objek Langsung",
                    explanation: "Menandai objek langsung penderita tindakan kata kerja transitif. Selalu dibaca 'o'.",
                    rules: ["Menandai objek: [Objek] を [Kata Kerja Transitif]"],
                    examples: [
                        { japanese: "水を飲みます。", romaji: "Mizu o nomimasu.", indonesian: "Minum air." }
                    ]
                }
            ];
        case 'generate_quiz':
            return [
                { id: 0, question: "Apa arti dari Kanji 日 (N5) ini?", display_char: "日", question_type: "multiple_choice", options: ["Matahari / Hari", "Bulan", "Api", "Air"], correct_answer: "Matahari / Hari", category: "kanji", jlpt_level: "N5" },
            ];
        case 'check_answer':
            return { correct: (args?.correctAnswer || '').trim().toLowerCase() === (args?.userAnswer || '').trim().toLowerCase(), correct_answer: args?.correctAnswer || '' };
        case 'get_stats':
            return { current_streak: 1, total_studied: 12, accuracy: 88, best_streak: 3, hiragana_percent: 25, katakana_percent: 15, kanji_n5_percent: 40, kanji_n4_percent: 20, kanji_n3_percent: 10 };
        case 'get_progress':
            return { daily_activity: [], achievements: [], total_studied: 12, total_correct: 10, current_streak: 1, best_streak: 3 };
        case 'app_minimize':
        case 'app_toggle_maximize':
        case 'app_close':
            return true;
        default:
            return null;
    }
}
