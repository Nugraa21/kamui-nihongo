// ========================================
// NihonGo! Progress — N5, N4, N3 Standard
// GitHub-style contribution graph & Mastery Trackers
// ========================================

async function renderProgressPage(container) {
    let progress = {
        daily_activity: [],
        achievements: [],
        total_studied: 0,
        total_correct: 0,
        current_streak: 0,
        best_streak: 0,
        hiragana_mastered: 0,
        katakana_mastered: 0,
        kanji_n5_mastered: 0,
        kanji_n4_mastered: 0,
        kanji_n3_mastered: 0,
    };
    let stats = {
        hiragana_percent: 0,
        katakana_percent: 0,
        kanji_n5_percent: 0,
        kanji_n4_percent: 0,
        kanji_n3_percent: 0,
        accuracy: 0,
        total_studied: 0,
    };

    try {
        progress = await invoke('get_progress');
        stats = await invoke('get_stats');
    } catch (e) {}

    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${icon('barChart', 26)}</span> Kemajuan Belajar (進捗状況)</h1>
                <div class="header-subtitle">Statistik penguasaan huruf, tingkatan JLPT N5 - N3, dan grafik aktivitas belajar harian</div>
            </div>
        </div>

        <div class="stats-row">
            <div class="stat-card">
                <div class="stat-icon flame">${icon('flame', 24)}</div>
                <div class="stat-value">${progress.current_streak || 0}</div>
                <div class="stat-label">Current Streak (Hari)</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon star">${icon('star', 24)}</div>
                <div class="stat-value">${progress.best_streak || 0}</div>
                <div class="stat-label">Best Streak Rekor</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">${icon('book', 24)}</div>
                <div class="stat-value">${stats.total_studied || progress.total_studied || 0}</div>
                <div class="stat-label">Total Latihan Karakter</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon target">${icon('target', 24)}</div>
                <div class="stat-value">${stats.accuracy || 0}%</div>
                <div class="stat-label">Rata-rata Akurasi</div>
            </div>
        </div>

        <!-- Mastery Progress Bars per Level -->
        <div class="progress-bar-container">
            <div class="progress-section-title">
                <span class="section-icon">${icon('trendingUp', 18)}</span> Tingkat Penguasaan Standar Pembelajaran
            </div>

            <div class="progress-bar-item">
                <span class="pb-label">Hiragana</span>
                <div class="pb-bar"><div class="pb-fill hiragana" style="width:${stats.hiragana_percent || 0}%"></div></div>
                <span class="pb-percent">${stats.hiragana_percent || 0}%</span>
            </div>

            <div class="progress-bar-item">
                <span class="pb-label">Katakana</span>
                <div class="pb-bar"><div class="pb-fill katakana" style="width:${stats.katakana_percent || 0}%"></div></div>
                <span class="pb-percent">${stats.katakana_percent || 0}%</span>
            </div>

            <div class="progress-bar-item">
                <span class="pb-label">Kanji N5 (Dasar)</span>
                <div class="pb-bar"><div class="pb-fill" style="background:var(--level-n5);width:${stats.kanji_n5_percent || 0}%"></div></div>
                <span class="pb-percent">${stats.kanji_n5_percent || 0}%</span>
            </div>

            <div class="progress-bar-item">
                <span class="pb-label">Kanji N4 (Pemula)</span>
                <div class="pb-bar"><div class="pb-fill" style="background:var(--level-n4);width:${stats.kanji_n4_percent || 0}%"></div></div>
                <span class="pb-percent">${stats.kanji_n4_percent || 0}%</span>
            </div>

            <div class="progress-bar-item">
                <span class="pb-label">Kanji N3 (Menengah)</span>
                <div class="pb-bar"><div class="pb-fill" style="background:var(--level-n3);width:${stats.kanji_n3_percent || 0}%"></div></div>
                <span class="pb-percent">${stats.kanji_n3_percent || 0}%</span>
            </div>
        </div>

        <!-- GitHub-style Contribution Heatmap -->
        <div class="progress-section-title">
            <span class="section-icon">${icon('calendar', 18)}</span> Grafik Aktivitas Belajar (Activity Heatmap)
        </div>
        <div class="contrib-graph-container">
            <div class="contrib-graph" id="contrib-graph"></div>
            <div class="contrib-legend">
                <span>Jarang</span>
                <div class="contrib-cell"></div>
                <div class="contrib-cell level-1"></div>
                <div class="contrib-cell level-2"></div>
                <div class="contrib-cell level-3"></div>
                <div class="contrib-cell level-4"></div>
                <span>Sering</span>
            </div>
        </div>

        <!-- Achievements Badges -->
        <div class="progress-section-title">
            <span class="section-icon">${icon('award', 18)}</span> Pencapaian & Lencana (Achievements)
        </div>
        <div class="achievements-grid" id="achievements-grid"></div>
    `;

    renderContribGraph(progress.daily_activity || []);
    renderAchievements(progress.achievements || []);
}

function renderContribGraph(dailyActivity) {
    const graph = document.getElementById('contrib-graph');
    if (!graph) return;
    const today = new Date();
    const weeks = 26;
    const activityMap = {};
    dailyActivity.forEach(a => { activityMap[a.date] = a.count; });

    let html = '';
    for (let w = weeks - 1; w >= 0; w--) {
        html += '<div class="contrib-week">';
        for (let d = 0; d < 7; d++) {
            const date = new Date(today);
            date.setDate(date.getDate() - (w * 7 + (6 - d)));
            const dateStr = date.toISOString().split('T')[0];
            const count = activityMap[dateStr] || 0;
            let level = '';
            if (count >= 15) level = 'level-4';
            else if (count >= 10) level = 'level-3';
            else if (count >= 5) level = 'level-2';
            else if (count >= 1) level = 'level-1';
            html += `<div class="contrib-cell ${level}" title="${dateStr}: ${count} kali belajar"></div>`;
        }
        html += '</div>';
    }
    graph.innerHTML = html;
}

function renderAchievements(achievements) {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;

    const defaultAchievements = [
        { id: 'first_step', name: 'First Step', description: 'Menyelesaikan kuis pertama Anda', icon: 'target', unlocked: false },
        { id: 'hiragana_master', name: 'Hiragana Master', description: 'Kuasai seluruh 46 Hiragana dasar', icon: 'award', unlocked: false },
        { id: 'katakana_master', name: 'Katakana Master', description: 'Kuasai seluruh 46 Katakana dasar', icon: 'award', unlocked: false },
        { id: 'streak_7', name: 'Week Warrior', description: 'Belajar 7 hari berturut-turut tanpa jeda', icon: 'flame', unlocked: false },
        { id: 'kanji_n5', name: 'N5 Apprentice', description: 'Kuasai 15 Kanji standar JLPT N5', icon: 'layers', unlocked: false },
        { id: 'kanji_n4', name: 'N4 Scholar', description: 'Kuasai 15 Kanji standar JLPT N4', icon: 'layers', unlocked: false },
        { id: 'kanji_n3', name: 'N3 Master', description: 'Taklukkan Kanji tingkat menengah N3', icon: 'star', unlocked: false },
        { id: 'stroke_master', name: 'Calligraphy Master', description: 'Berlatih goresan di kanvas kaligrafi', icon: 'bookOpen', unlocked: false },
    ];

    const achList = achievements && achievements.length > 0 ? achievements : defaultAchievements;

    grid.innerHTML = achList.map(ach => {
        const isUnlocked = ach.unlocked;
        const iconName = ach.icon || 'award';
        return `
            <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                <div class="ach-icon">${icon(iconName, 22)}</div>
                <div class="ach-info">
                    <h4>${ach.name}</h4>
                    <p>${ach.description}</p>
                    ${isUnlocked && ach.unlocked_date ? `<p style="color:var(--accent-orange);font-size:11px;margin-top:3px;display:flex;align-items:center;gap:4px">${icon('unlock', 12)} Terbuka: ${ach.unlocked_date}</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
}
