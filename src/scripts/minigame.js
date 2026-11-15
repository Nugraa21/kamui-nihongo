// ========================================
// NihonGo! Minigame — Memory Match
// Match Japanese characters with readings
// ========================================

let memoryState = {
    cards: [],
    flipped: [],
    matched: 0,
    moves: 0,
    pairs: 0,
    timer: null,
    seconds: 0,
    difficulty: 'easy',
    type: 'hiragana',
    locked: false,
};

function renderMinigameSetup(container) {
    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${icon('gamepad', 26)}</span> Arena Mini-Game Belajar Jepang</h1>
                <div class="header-subtitle">Pilih mode permainan: Tantangan Susun Kalimat (Kotoba Arena) atau Memory Match Huruf</div>
            </div>
        </div>

        <!-- Mode Selector -->
        <div class="game-mode-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:24px;">
            <div class="repo-readme-card" style="cursor:pointer;border:2px solid var(--accent-primary);transition:all .2s ease" onclick="navigateTo('duolingo')">
                <div class="repo-readme-header" style="background:rgba(35, 134, 54, 0.15)">
                    <div style="display:flex;align-items:center;gap:8px">
                        ${icon('sparkles', 18)}
                        <strong style="color:var(--text-primary)">Kotoba Arena (言葉並べ - Susun Kalimat)</strong>
                    </div>
                    <span class="gh-tab-badge" style="background:var(--accent-primary);color:#fff">BARU & REKOMENDASI</span>
                </div>
                <div class="repo-readme-body" style="padding:14px 18px">
                    <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">
                        Susun kepingan kata acak menjadi kalimat Jepang yang benar. Dilengkapi sistem 5 nyawa, kombo streak, dan efek suara sintetis!
                    </p>
                    <button class="btn-primary" style="width:100%" onclick="navigateTo('duolingo')">
                        ${icon('play', 15)} Mainkan Susun Kata Sekarang
                    </button>
                </div>
            </div>

            <div class="repo-readme-card" style="border:1px solid var(--border-default)">
                <div class="repo-readme-header">
                    <div style="display:flex;align-items:center;gap:8px">
                        ${icon('puzzle', 18)}
                        <strong style="color:var(--text-primary)">Memory Match (記憶合わせ)</strong>
                    </div>
                    <span class="gh-tab-badge">Klasik</span>
                </div>
                <div class="repo-readme-body" style="padding:14px 18px">
                    <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">
                        Asah ingatan jangka pendek dengan mencocokkan kartu Hiragana/Katakana dengan romaji yang bersesuaian secepat mungkin.
                    </p>
                    <button class="btn-secondary" style="width:100%" onclick="document.getElementById('memory-config-box').scrollIntoView({behavior:'smooth'})">
                        ${icon('layers', 15)} Konfigurasi Memory Match
                    </button>
                </div>
            </div>
        </div>

        <div class="minigame-container" id="memory-config-box">
            <h3 style="color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;font-size:12px;display:flex;align-items:center;gap:6px">
                ${icon('layers', 16)} 1. Pilih Karakter Memory Match
            </h3>
            <div class="gh-segmented-group" id="mg-type" style="margin-bottom:20px">
                <button class="gh-pill active" data-type="hiragana">Hiragana (あ)</button>
                <button class="gh-pill" data-type="katakana">Katakana (ア)</button>
            </div>

            <h3 style="color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;font-size:12px;display:flex;align-items:center;gap:6px">
                ${icon('barChart', 16)} 2. Tingkat Kesulitan
            </h3>
            <div class="gh-segmented-group" id="mg-difficulty" style="margin-bottom:24px">
                <button class="gh-pill active" data-diff="easy">Mudah (6 Pasang)</button>
                <button class="gh-pill" data-diff="medium">Sedang (8 Pasang)</button>
                <button class="gh-pill" data-diff="hard">Tantangan (12 Pasang)</button>
            </div>

            <button class="btn-primary" onclick="startMemoryGame()" style="max-width:340px">
                ${icon('play', 16)} Mulai Permainan Memory
            </button>
        </div>
    `;

    document.getElementById('mg-type').addEventListener('click', (e) => {
        const btn = e.target.closest('.gh-pill');
        if (!btn) return;
        document.querySelectorAll('#mg-type .gh-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        memoryState.type = btn.dataset.type;
    });

    document.getElementById('mg-difficulty').addEventListener('click', (e) => {
        const btn = e.target.closest('.gh-pill');
        if (!btn) return;
        document.querySelectorAll('#mg-difficulty .gh-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        memoryState.difficulty = btn.dataset.diff;
    });
}

async function startMemoryGame() {
    const pairCounts = { easy: 6, medium: 8, hard: 12 };
    const numPairs = pairCounts[memoryState.difficulty] || 6;

    // Get characters
    let chars;
    try {
        chars = await invoke(memoryState.type === 'hiragana' ? 'get_hiragana' : 'get_katakana');
    } catch(e) {
        chars = memoryState.type === 'hiragana' ? MOCK_HIRAGANA : MOCK_KATAKANA;
    }

    // Select random pairs
    const shuffledChars = [...chars].sort(() => Math.random() - 0.5).slice(0, numPairs);

    // Create card pairs: one card shows character, other shows romaji
    let cards = [];
    shuffledChars.forEach((ch, idx) => {
        cards.push({ id: idx * 2, pairId: idx, display: ch.character, type: 'char' });
        cards.push({ id: idx * 2 + 1, pairId: idx, display: ch.romaji, type: 'romaji' });
    });

    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    memoryState.cards = cards;
    memoryState.flipped = [];
    memoryState.matched = 0;
    memoryState.moves = 0;
    memoryState.pairs = numPairs;
    memoryState.seconds = 0;
    memoryState.locked = false;

    renderMemoryBoard();

    // Start timer
    if (memoryState.timer) clearInterval(memoryState.timer);
    memoryState.timer = setInterval(() => {
        memoryState.seconds++;
        const timerEl = document.getElementById('mg-timer');
        if (timerEl) timerEl.textContent = formatTime(memoryState.seconds);
    }, 1000);
}

function renderMemoryBoard() {
    const container = document.getElementById('content');
    const gridClass = memoryState.cards.length <= 12 ? 'size-4x3' :
                      memoryState.cards.length <= 16 ? 'size-4x4' : 'size-6x4';

    container.innerHTML = `
        <div class="page-header">
            <h1><span class="header-icon">${icon('puzzle', 24)}</span> Memory Match</h1>
        </div>

        <div class="minigame-container">
            <div class="minigame-header">
                <div class="minigame-stats">
                    <div class="minigame-stat">
                        <span class="ms-icon">${icon('mouse', 16)}</span>
                        Moves: <span class="ms-value" id="mg-moves">0</span>
                    </div>
                    <div class="minigame-stat">
                        <span class="ms-icon">${icon('clock', 16)}</span>
                        Time: <span class="ms-value" id="mg-timer">0:00</span>
                    </div>
                    <div class="minigame-stat">
                        <span class="ms-icon">${icon('checkCircle', 16)}</span>
                        Matched: <span class="ms-value" id="mg-matched">0</span> / ${memoryState.pairs}
                    </div>
                </div>
            </div>

            <div class="memory-grid ${gridClass}" id="memory-grid">
                ${memoryState.cards.map(card => `
                    <div class="memory-card" data-id="${card.id}" data-pair="${card.pairId}" onclick="flipCard(this)">
                        <div class="memory-card-inner">
                            <div class="memory-card-front">
                                <span class="card-question-mark">?</span>
                            </div>
                            <div class="memory-card-back">${card.display}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function flipCard(cardEl) {
    if (memoryState.locked) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    cardEl.classList.add('flipped');
    memoryState.flipped.push(cardEl);

    if (memoryState.flipped.length === 2) {
        memoryState.moves++;
        document.getElementById('mg-moves').textContent = memoryState.moves;
        memoryState.locked = true;

        const [card1, card2] = memoryState.flipped;
        const pair1 = parseInt(card1.dataset.pair);
        const pair2 = parseInt(card2.dataset.pair);

        if (pair1 === pair2 && card1.dataset.id !== card2.dataset.id) {
            // Match!
            card1.classList.add('matched');
            card2.classList.add('matched');
            memoryState.matched++;
            document.getElementById('mg-matched').textContent = memoryState.matched;
            memoryState.flipped = [];
            memoryState.locked = false;

            if (memoryState.matched === memoryState.pairs) {
                clearInterval(memoryState.timer);
                setTimeout(() => renderMinigameComplete(), 600);
            }
        } else {
            // No match
            card1.classList.add('wrong');
            card2.classList.add('wrong');
            setTimeout(() => {
                card1.classList.remove('flipped', 'wrong');
                card2.classList.remove('flipped', 'wrong');
                memoryState.flipped = [];
                memoryState.locked = false;
            }, 800);
        }
    }
}

function renderMinigameComplete() {
    // Score: fewer moves + less time = better score
    const maxScore = memoryState.pairs * 200;
    const movePenalty = Math.max(0, (memoryState.moves - memoryState.pairs) * 15);
    const timePenalty = memoryState.seconds * 2;
    const score = Math.max(0, maxScore - movePenalty - timePenalty);

    // XP reward
    let earnedXP = 30; // base
    if (memoryState.moves <= memoryState.pairs * 1.5) earnedXP += 20; // efficiency bonus
    if (memoryState.seconds < memoryState.pairs * 8) earnedXP += 15; // speed bonus
    addXP(earnedXP);

    const container = document.getElementById('content');
    container.innerHTML = `
        <div class="page-header">
            <h1><span class="header-icon">${icon('puzzle', 24)}</span> Memory Match</h1>
        </div>

        <div class="minigame-container">
            <div class="minigame-complete">
                <div style="margin-bottom:12px">${icon('trophy', 48)}</div>
                <h2 style="font-size:22px;margin-bottom:8px">Game Complete!</h2>
                <div class="mc-score">${score}</div>
                <p style="color:var(--text-muted);margin-bottom:4px">Score</p>
                <div style="color:var(--accent-purple);font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;margin:12px 0">${icon('zap', 18)} +${earnedXP} XP</div>
                <div class="mc-stats">
                    <div>
                        <div style="font-size:24px;font-weight:700">${memoryState.moves}</div>
                        <div style="font-size:12px;color:var(--text-muted)">Moves</div>
                    </div>
                    <div>
                        <div style="font-size:24px;font-weight:700">${formatTime(memoryState.seconds)}</div>
                        <div style="font-size:12px;color:var(--text-muted)">Time</div>
                    </div>
                    <div>
                        <div style="font-size:24px;font-weight:700">${memoryState.pairs}</div>
                        <div style="font-size:12px;color:var(--text-muted)">Pairs</div>
                    </div>
                </div>
                <div style="display:flex;gap:12px;justify-content:center">
                    <button class="btn-secondary" onclick="navigateTo('minigame')" style="width:auto;padding:12px 24px">
                        ${icon('arrowLeft', 16)} Back
                    </button>
                    <button class="btn-primary" onclick="startMemoryGame()" style="width:auto;padding:12px 24px">
                        ${icon('refresh', 16)} Play Again
                    </button>
                </div>
            </div>
        </div>
    `;
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
