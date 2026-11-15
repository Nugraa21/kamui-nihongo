// =======================================================
// NihonGo! Duolingo-style Sentence Builder Game (言葉並べ)
// Authentic Word Scramble & Sentence Construction
// Audio Voice Feedback • Hearts System • Combo XP
// Credit: nugra21.web.app
// =======================================================

const DUO_QUESTIONS = [
    {
        id: 1,
        indonesian: "Saya makan roti setiap pagi.",
        correctTokens: ["わたしは", "毎朝", "パンを", "食べます"],
        distractors: ["飲みます", "図書館で", "行きます"],
        fullSentence: "わたしは毎朝パンを食べます。",
        grammarTip: "Pola: [Subjek] は [Waktu] [Objek] を [Predikat]"
    },
    {
        id: 2,
        indonesian: "Besok saya pergi ke Tokyo naik Shinkansen.",
        correctTokens: ["あした", "新幹線で", "東京へ", "行きます"],
        distractors: ["来ました", "バスで", "食べます"],
        fullSentence: "あした新幹線で東京へ行きます。",
        grammarTip: "Partikel で (sarana transportasi) & へ (arah tujuan)"
    },
    {
        id: 3,
        indonesian: "Tolong tulis nama Anda di sini.",
        correctTokens: ["ここに", "名前を", "書いてください"],
        distractors: ["読まないで", "行きます", "本を"],
        fullSentence: "ここに名前を書いてください。",
        grammarTip: "Bentuk Te: 書いて (kaite) + ください (permohonan santun)"
    },
    {
        id: 4,
        indonesian: "Bolehkah saya mengambil foto di sini?",
        correctTokens: ["ここで", "写真を", "撮ってもいいですか"],
        distractors: ["撮ってはいけません", "見ます", "映画を"],
        fullSentence: "ここで写真を撮ってもいいですか。",
        grammarTip: "Pola meminta izin: V-てもいいですか"
    },
    {
        id: 5,
        indonesian: "Saya belajar bahasa Jepang bersama teman di perpustakaan.",
        correctTokens: ["図書館で", "友達と", "日本語を", "勉強します"],
        distractors: ["一人で", "飲みます", "会社へ"],
        fullSentence: "図書館で友達と日本語を勉強します。",
        grammarTip: "で (tempat aksi), と (rekan bersama), を (objek)"
    },
    {
        id: 6,
        indonesian: "Bank buka dari jam 9 sampai jam 3.",
        correctTokens: ["銀行は", "９時から", "３時までです"],
        distractors: ["５時まで", "学校は", "起きます"],
        fullSentence: "銀行は９時から３時までです。",
        grammarTip: "Pola rentang: 〜から (dari) 〜まで (sampai)"
    },
    {
        id: 7,
        indonesian: "Dilarang merokok di dalam ruangan ini.",
        correctTokens: ["この部屋で", "タバコを", "吸ってはいけません"],
        distractors: ["吸ってもいいです", "外で", "本を"],
        fullSentence: "この部屋でタバコを吸ってはいけません。",
        grammarTip: "Pola larangan tegas: V-てはいけません"
    },
    {
        id: 8,
        indonesian: "Maukah Anda makan siang bersama saya?",
        correctTokens: ["いっしょに", "昼ごはんを", "食べませんか"],
        distractors: ["食べましょう", "朝ごはん", "買います"],
        fullSentence: "いっしょに昼ごはんを食べませんか。",
        grammarTip: "Pola ajakan santun: V-ませんか"
    },
    {
        id: 9,
        indonesian: "Saya menyukai kucing tapi tidak menyukai anjing.",
        correctTokens: ["わたしは", "猫が好きですが", "犬は", "好きじゃありません"],
        distractors: ["魚が", "鳥を", "食べます"],
        fullSentence: "わたしは猫が好きですが、犬は好きじゃありません。",
        grammarTip: "Partikel が (kesukaan) & が/けど (tetapi)"
    },
    {
        id: 10,
        indonesian: "Kemarin cuaca sangat bagus ya.",
        correctTokens: ["きのうは", "天気が", "とても", "よかったです", "ね"],
        distractors: ["雨でした", "あした", "わるい"],
        fullSentence: "きのうは天気がとてもよかったですね。",
        grammarTip: "Bentuk lampau kata sifat: よかったです + partikel ね"
    },
    {
        id: 11,
        indonesian: "Permisi, stasiun kereta ada di mana ya?",
        correctTokens: ["すみません", "駅は", "どこに", "ありますか"],
        distractors: ["交差点で", "行きます", "だれですか"],
        fullSentence: "すみません、駅はどこにありますか。",
        grammarTip: "Menanyakan lokasi benda mati: 〜はどこにありますか"
    },
    {
        id: 12,
        indonesian: "Sekarang saya ingin minum kopi yang hangat.",
        correctTokens: ["いま", "温かい", "コーヒーが", "飲みたいです"],
        distractors: ["冷たい", "食べます", "お茶を"],
        fullSentence: "いま温かいコーヒーが飲みたいです。",
        grammarTip: "Bentuk keinginan: V-たい (nomitai desu)"
    },
    {
        id: 13,
        indonesian: "Saya bisa berbicara bahasa Jepang sedikit.",
        correctTokens: ["わたしは", "日本語が", "少し", "話せます"],
        distractors: ["話しません", "英語を", "読めない"],
        fullSentence: "わたしは日本語が少し話せます。",
        grammarTip: "Bentuk kesanggupan (Potensial): 話せる (hanaseru)"
    },
    {
        id: 14,
        indonesian: "Setelah makan malam, saya menonton anime bersama adik.",
        correctTokens: ["晩ごはんを", "食べたあとで", "妹と", "アニメを", "見ます"],
        distractors: ["食べるまえに", "映画を", "寝ます"],
        fullSentence: "晩ごはんを食べたあとで妹とアニメを見ます。",
        grammarTip: "Pola urutan: V-たあとで (setelah melakukan V)"
    },
    {
        id: 15,
        indonesian: "Tolong ajari saya cara membaca kanji ini.",
        correctTokens: ["この漢字の", "読み方を", "教えて", "ください"],
        distractors: ["書き方を", "買いません", "聞いて"],
        fullSentence: "この漢字の読み方を教えてください。",
        grammarTip: "Pola cara melakukan sesuatu: V-masu + 方 (kata)"
    },
    {
        id: 16,
        indonesian: "Keluarga saya tinggal di Kyoto sejak tahun lalu.",
        correctTokens: ["家族は", "去年から", "京都に", "住んでいます"],
        distractors: ["来年から", "東京へ", "行きました"],
        fullSentence: "家族は去年から京都に住んでいます。",
        grammarTip: "Pola keadaan menetap: 〜に住んでいます"
    },
    {
        id: 17,
        indonesian: "Jangan lupa membawa payung ya.",
        correctTokens: ["傘を", "持って行くのを", "忘れないで", "くださいね"],
        distractors: ["靴を", "置いて", "見ないで"],
        fullSentence: "傘を持って行くのを忘れないでくださいね。",
        grammarTip: "Pola larangan halus: V-ないでください"
    },
    {
        id: 18,
        indonesian: "Meskipun besok hujan, mari kita tetap berangkat.",
        correctTokens: ["あした", "雨が降っても", "出発", "しましょう"],
        distractors: ["晴れたら", "帰りましょう", "降らない"],
        fullSentence: "あした雨が降っても出発しましょう。",
        grammarTip: "Pola pengandaian perlawanan: V-ても (meskipun)"
    },
    {
        id: 19,
        indonesian: "Buku ini sangat menarik dan mudah dibaca.",
        correctTokens: ["この本は", "とても", "おもしろくて", "読みやすいです"],
        distractors: ["むずかしくて", "高くて", "買いません"],
        fullSentence: "この本はとてもおもしろくて読みやすいです。",
        grammarTip: "Bentuk mudah dilakukan: V-masu + やすい"
    },
    {
        id: 20,
        indonesian: "Jika ada waktu luang, ayo belajar bersama lagi.",
        correctTokens: ["もし", "時間があったら", "また", "いっしょに", "勉強しましょう"],
        distractors: ["なくても", "一人で", "やめましょう"],
        fullSentence: "もし時間があったらまたいっしょに勉強しましょう。",
        grammarTip: "Pola pengandaian: もし 〜たら (jika)"
    }
];

let duoState = {
    currentIndex: 0,
    hearts: 5,
    streak: 0,
    totalEarnedXP: 0,
    activeQuestion: null,
    bankChips: [],
    slotChips: [],
    isChecked: false,
    isCorrect: false
};

// Web Audio API Synthesizer (No external files needed)
const DuoAudio = {
    ctx: null,
    init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    playCorrect() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880.00, now + 0.12); // A5
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
    },
    playWrong() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(164.81, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
    },
    playPop() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
    }
};

function renderDuolingoPage(container) {
    duoState = {
        currentIndex: 0,
        hearts: 5,
        streak: 0,
        totalEarnedXP: 0,
        activeQuestion: null,
        bankChips: [],
        slotChips: [],
        isChecked: false,
        isCorrect: false
    };
    loadDuoQuestion();
}

function loadDuoQuestion() {
    const container = document.getElementById('content');
    if (!container) return;

    if (duoState.currentIndex >= DUO_QUESTIONS.length || duoState.hearts <= 0) {
        renderDuoFinished(container);
        return;
    }

    const q = DUO_QUESTIONS[duoState.currentIndex];
    duoState.activeQuestion = q;
    duoState.slotChips = [];
    duoState.isChecked = false;
    duoState.isCorrect = false;

    // Combine correct tokens and distractors, then shuffle
    const allTokens = [...q.correctTokens, ...q.distractors];
    duoState.bankChips = allTokens.sort(() => Math.random() - 0.5).map((tok, idx) => ({
        id: idx,
        text: tok,
        used: false
    }));

    renderDuoQuestionUI();
}

function renderDuoQuestionUI() {
    const container = document.getElementById('content');
    if (!container) return;
    const q = duoState.activeQuestion;
    const progressPercent = (duoState.currentIndex / DUO_QUESTIONS.length) * 100;

    // Generate hearts display
    let heartsHtml = '';
    for (let i = 0; i < 5; i++) {
        const isFilled = i < duoState.hearts;
        heartsHtml += `<span class="duo-heart ${isFilled ? 'filled' : 'empty'}">${icon('heart', 18)}</span>`;
    }

    container.innerHTML = `
        <div class="duo-wrapper">
            <!-- Duolingo Header Stats Bar -->
            <div class="duo-header-bar">
                <div class="duo-progress-outer">
                    <div class="duo-progress-inner" style="width:${progressPercent}%"></div>
                </div>
                <div class="duo-stats-row">
                    <div class="duo-stat-item hearts" title="Sisa Nyawa (Hearts)">
                        ${heartsHtml}
                    </div>
                    <div class="duo-stat-item streak" title="Combo Streak">
                        ${icon('flame', 16)} <span>${duoState.streak} Combo</span>
                    </div>
                    <div class="duo-stat-item xp" title="XP Terkumpul">
                        ${icon('zap', 16)} <span>+${duoState.totalEarnedXP} XP</span>
                    </div>
                </div>
            </div>

            <!-- Challenge Prompt Card -->
            <div class="duo-prompt-card">
                <div class="duo-prompt-label">
                    <span>${icon('sparkles', 15)} TANTANGAN SUSUN KALIMAT JEPANG</span>
                    <span class="level-badge n5">Soal ${duoState.currentIndex + 1}/${DUO_QUESTIONS.length}</span>
                </div>
                <div class="duo-sentence-target">
                    <h3>"${q.indonesian}"</h3>
                    <button class="vocab-audio-btn" onclick="speakWord('${q.fullSentence.replace(/[。、]/g, '')}')" title="Dengarkan Contoh Pengucapan">
                        ${icon('volume2', 16)}
                    </button>
                </div>
                <div class="duo-instruction-hint">
                    ${icon('info', 14)} Klik kata-kata di bawah untuk menyusun kalimat bahasa Jepang yang tepat dan gramatikal:
                </div>
            </div>

            <!-- Sentence Construction Slot (Drop Zone) -->
            <div class="duo-sentence-slot ${duoState.slotChips.length === 0 ? 'empty-state' : ''}" id="duo-sentence-slot">
                ${duoState.slotChips.length === 0
                    ? `<div class="slot-placeholder">Letakkan kata di sini dengan mengeklik tombol kata di bawah...</div>`
                    : duoState.slotChips.map((chip, slotIdx) => `
                        <button class="duo-chip slot-chip" onclick="removeChipFromSlot(${slotIdx})">
                            <span>${chip.text}</span>
                        </button>
                    `).join('')}
            </div>

            <!-- Word Bank -->
            <div class="duo-word-bank" id="duo-word-bank">
                ${duoState.bankChips.map(chip => `
                    <button class="duo-chip bank-chip ${chip.used ? 'chip-disabled' : ''}"
                            ${chip.used ? 'disabled' : ''}
                            onclick="addChipToSlot(${chip.id})">
                        <span>${chip.text}</span>
                    </button>
                `).join('')}
            </div>

            <!-- Bottom Duolingo Review Banner -->
            <div class="duo-footer-banner ${duoState.isChecked ? (duoState.isCorrect ? 'banner-correct' : 'banner-wrong') : ''}" id="duo-footer">
                ${renderFooterBannerContent()}
            </div>
        </div>
    `;
}

function renderFooterBannerContent() {
    if (!duoState.isChecked) {
        const canCheck = duoState.slotChips.length > 0;
        return `
            <div class="duo-banner-inner">
                <button class="duo-action-btn ${canCheck ? 'btn-active' : 'btn-disabled'}"
                        ${canCheck ? '' : 'disabled'}
                        onclick="checkSentenceAnswer()">
                    PERIKSA JAWABAN ${icon('arrowRight', 16)}
                </button>
            </div>
        `;
    }

    if (duoState.isCorrect) {
        return `
            <div class="duo-banner-inner">
                <div class="banner-feedback">
                    <div class="feedback-icon-box success">${icon('checkCircle', 28)}</div>
                    <div>
                        <h4>Luar Biasa! (正解)</h4>
                        <p style="color:var(--level-n5);font-weight:700">+25 XP Diperoleh • Combo ${duoState.streak}x</p>
                        <small style="color:var(--text-muted)">${duoState.activeQuestion.grammarTip}</small>
                    </div>
                </div>
                <button class="duo-action-btn next-btn" onclick="nextDuoQuestion()">
                    LANJUTKAN ${icon('arrowRight', 16)}
                </button>
            </div>
        `;
    } else {
        return `
            <div class="duo-banner-inner">
                <div class="banner-feedback">
                    <div class="feedback-icon-box error">${icon('xCircle', 28)}</div>
                    <div>
                        <h4 style="color:#f85149">Kurang Tepat! (-1 Nyawa)</h4>
                        <p>Jawaban yang benar: <strong>${duoState.activeQuestion.fullSentence}</strong></p>
                        <small style="color:var(--text-muted)">${duoState.activeQuestion.grammarTip}</small>
                    </div>
                </div>
                <button class="duo-action-btn next-btn" onclick="nextDuoQuestion()">
                    LANJUTKAN ${icon('arrowRight', 16)}
                </button>
            </div>
        `;
    }
}

function addChipToSlot(bankChipId) {
    if (duoState.isChecked) return;
    const chip = duoState.bankChips.find(c => c.id === bankChipId);
    if (!chip || chip.used) return;

    DuoAudio.playPop();
    chip.used = true;
    duoState.slotChips.push({ bankId: chip.id, text: chip.text });
    renderDuoQuestionUI();
}

function removeChipFromSlot(slotIdx) {
    if (duoState.isChecked) return;
    const removed = duoState.slotChips[slotIdx];
    if (!removed) return;

    DuoAudio.playPop();
    const bankChip = duoState.bankChips.find(c => c.id === removed.bankId);
    if (bankChip) bankChip.used = false;

    duoState.slotChips.splice(slotIdx, 1);
    renderDuoQuestionUI();
}

function checkSentenceAnswer() {
    if (duoState.isChecked || duoState.slotChips.length === 0) return;

    const userSentence = duoState.slotChips.map(c => c.text).join('');
    const targetSentence = duoState.activeQuestion.correctTokens.join('');

    duoState.isChecked = true;
    if (userSentence === targetSentence) {
        duoState.isCorrect = true;
        duoState.streak++;
        duoState.totalEarnedXP += 25;
        addXP(25);
        DuoAudio.playCorrect();
        speakWord(duoState.activeQuestion.fullSentence.replace(/[。、]/g, ''));
    } else {
        duoState.isCorrect = false;
        duoState.streak = 0;
        duoState.hearts = Math.max(0, duoState.hearts - 1);
        DuoAudio.playWrong();
    }

    renderDuoQuestionUI();
}

function nextDuoQuestion() {
    duoState.currentIndex++;
    loadDuoQuestion();
}

function renderDuoFinished(container) {
    const isWin = duoState.hearts > 0;
    const completedCount = Math.min(duoState.currentIndex, DUO_QUESTIONS.length);

    container.innerHTML = `
        <div class="duo-wrapper" style="text-align:center;padding:40px 20px">
            <div style="font-size:56px;margin-bottom:16px">
                ${isWin ? icon('trophy', 64) : icon('xCircle', 64)}
            </div>
            <h2 style="font-size:26px;font-weight:800;color:var(--text-primary);margin-bottom:8px">
                ${isWin ? 'Tantangan Kotoba Arena Selesai!' : 'Nyawa Kamu Telah Habis!'}
            </h2>
            <p style="color:var(--text-secondary);font-size:15px;max-width:480px;margin:0 auto 24px auto">
                ${isWin
                    ? 'Luar biasa! Kamu telah berhasil menyusun kalimat bahasa Jepang berstandar Minna no Nihongo dengan tata bahasa yang akurat.'
                    : 'Jangan berkecil hati! Pelajari kembali partikel dan pola kalimat di tab Minna no Nihongo lalu coba tantang dirimu lagi.'}
            </p>

            <div class="stats-row" style="max-width:540px;margin:0 auto 30px auto">
                <div class="stat-card">
                    <div class="stat-card-header">TOTAL XP DIRAIH</div>
                    <div class="stat-value" style="color:var(--accent-secondary)">+${duoState.totalEarnedXP}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">SOAL TUNTAS</div>
                    <div class="stat-value" style="color:var(--level-n5)">${completedCount}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">SISA HEARTS</div>
                    <div class="stat-value" style="color:#ff4b4b">${duoState.hearts}/5</div>
                </div>
            </div>

            <div style="display:flex;gap:12px;justify-content:center">
                <button class="btn-secondary" onclick="navigateTo('home')">
                    ${icon('home', 16)} Ke Halaman Utama
                </button>
                <button class="btn-primary" onclick="renderDuolingoPage(document.getElementById('content'))">
                    ${icon('refresh', 16)} Mainkan Lagi
                </button>
            </div>
        </div>
    `;
}
