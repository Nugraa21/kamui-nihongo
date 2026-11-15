// ========================================
// Kamui NihonGo! Quiz & Official JLPT Simulation
// 140+ Randomized Question Bank • Fisher-Yates Shuffle
// Anti-Cheating Exam Lockdown Mode • In-App Centered Modals
// Standards: JLPT N5 • N4 • N3
// Credit: nugra21.web.app
// ========================================

let quizState = {
    type: 'kanji',
    level: 'all',
    questions: [],
    currentIndex: 0,
    totalCorrect: 0,
    answered: false,
};

// Exam State for Official JLPT Simulation
let examState = {
    active: false,
    level: 'N5',
    timerInterval: null,
    totalSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    currentIndex: 0,
    answers: {}, // questionId -> selectedOption
    questions: [],
    startTime: null
};

// Global hook for app navigation & keyboard locking
window.isExamLockdownActive = function() {
    return examState.active;
};

// =======================================================
// 1. RENDER QUIZ / EXAM SETUP PAGE
// =======================================================
function renderQuizPage(container) {
    renderQuizSetup(container, 'exam');
}

function renderQuizSetup(container, defaultType = 'exam') {
    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${icon('target', 24)}</span> Pusat Simulasi Ujian JLPT & Latihan</h1>
                <div class="header-subtitle">Uji kemampuan bahasa Jepang Anda dengan Simulasi Resmi Berstandar JLPT (N5 • N4 • N3), Latihan Fleksibel, atau Boss Battle Hardcore!</div>
            </div>
        </div>

        <div class="gh-segmented-group" style="margin-bottom:20px;max-width:640px;flex-wrap:wrap">
            <button class="gh-pill ${defaultType === 'exam' ? 'active' : ''}" id="mode-exam-btn" onclick="renderQuizSetup(document.getElementById('content'), 'exam')">
                ${icon('checkCircle', 14)} Simulasi Resmi JLPT
            </button>
            <button class="gh-pill ${defaultType === 'practice' ? 'active' : ''}" id="mode-practice-btn" onclick="renderQuizSetup(document.getElementById('content'), 'practice')">
                ${icon('play', 14)} Latihan Cepat
            </button>
            <button class="gh-pill ${defaultType === 'hardcore' ? 'active' : ''}" id="mode-hardcore-btn" onclick="renderQuizSetup(document.getElementById('content'), 'hardcore')" style="${defaultType === 'hardcore' ? 'background:rgba(255,69,58,0.25);color:#ff453a;border-color:rgba(255,69,58,0.4);' : ''}">
                ${icon('skull', 14)} Mode Hardcore (Boss Battle)
            </button>
        </div>

        ${defaultType === 'exam' ? renderOfficialExamSetup() : (defaultType === 'hardcore' ? renderHardcoreSetup() : renderPracticeSetup())}
    `;
}

function renderOfficialExamSetup() {
    return `
        <div class="exam-hero-card">
            <div class="exam-hero-header">
                <div>
                    <span class="gh-tab-badge" style="background:var(--accent-primary);color:#fff;margin-bottom:8px">STANDAR RESMI JLPT</span>
                    <h2 style="font-size:20px;margin-bottom:4px;color:var(--text-primary)">Simulasi Ujian JLPT (日本語能力試験)</h2>
                    <p style="color:var(--text-secondary);font-size:13px;max-width:640px;line-height:1.6">
                        Simulasi ujian realistis 20 butir soal acak (dipilih dinamis dari bank 140+ soal) mencakup <strong>Moji-Goi (Huruf & Kosakata)</strong>, <strong>Bunpou (Tata Bahasa)</strong>, dan <strong>Dokkai (Pemahaman Membaca)</strong>.
                    </p>
                </div>
                <div class="exam-badge-icon">${icon('target', 48)}</div>
            </div>

            <div class="exam-rules-grid">
                <div class="exam-rule-item">
                    <div class="rule-icon">${icon('clock', 18)}</div>
                    <div>
                        <strong>Batas Waktu 25 Menit</strong>
                        <p>Penghitung waktu mundur otomatis berjalan saat ujian dimulai.</p>
                    </div>
                </div>
                <div class="exam-rule-item">
                    <div class="rule-icon" style="color:var(--status-danger)">${icon('lock', 18)}</div>
                    <div>
                        <strong>Exam Lockdown (Anti-Mencontek)</strong>
                        <p>Menu, tab navigasi, dan pintasan keyboard dikunci hingga ujian selesai.</p>
                    </div>
                </div>
                <div class="exam-rule-item">
                    <div class="rule-icon" style="color:var(--status-warning)">${icon('sparkles', 18)}</div>
                    <div>
                        <strong>Bank Soal Dinamis & Diacak</strong>
                        <p>Setiap sesi mengocok kombinasi soal dan pilihan baru agar efektif dan tidak monoton.</p>
                    </div>
                </div>
                <div class="exam-rule-item">
                    <div class="rule-icon" style="color:var(--accent-secondary)">${icon('checkCircle', 18)}</div>
                    <div>
                        <strong>Kriteria Kelulusan 60%</strong>
                        <p>Dapatkan minimal 12 jawaban benar untuk dinyatakan LULUS.</p>
                    </div>
                </div>
            </div>

            <div class="exam-level-selection">
                <label style="font-weight:700;font-size:13px;color:var(--text-primary)">Pilih Tingkatan Ujian JLPT:</label>
                <div class="gh-segmented-group" id="exam-level-picker" style="margin-top:8px">
                    <button class="gh-pill ${examState.level === 'N5' ? 'active' : ''}" data-lvl="N5" onclick="selectExamLevel('N5')">
                        <span class="level-badge n5">N5</span> Tingkat Dasar (Basic)
                    </button>
                    <button class="gh-pill ${examState.level === 'N4' ? 'active' : ''}" data-lvl="N4" onclick="selectExamLevel('N4')">
                        <span class="level-badge n4">N4</span> Pemula Lanjut (Elementary)
                    </button>
                    <button class="gh-pill ${examState.level === 'N3' ? 'active' : ''}" data-lvl="N3" onclick="selectExamLevel('N3')">
                        <span class="level-badge n3">N3</span> Menengah (Intermediate)
                    </button>
                </div>
            </div>

            <div style="margin-top:24px;display:flex;gap:12px;align-items:center">
                <button class="btn-primary" onclick="startOfficialJlptExam()" style="padding:10px 24px;font-size:14px">
                    ${icon('play', 16)} Mulai Simulasi Ujian Resmi
                </button>
                <span style="font-size:12px;color:var(--text-muted)">* Mode lockdown akan langsung aktif setelah tombol diklik.</span>
            </div>
        </div>
    `;
}

function renderPracticeSetup() {
    return `
        <div class="quiz-setup-card">
            <h3 style="margin-bottom:12px;font-size:16px;color:var(--text-primary)">Latihan Cepat Kategori Bebas</h3>
            <div class="setup-group">
                <label>Pilih Tipe Latihan:</label>
                <div class="gh-segmented-group" id="quiz-type-select">
                    <button class="gh-pill ${quizState.type === 'kanji' ? 'active' : ''}" data-type="kanji" onclick="selectPracticeType('kanji')">Kanji</button>
                    <button class="gh-pill ${quizState.type === 'hiragana' ? 'active' : ''}" data-type="hiragana" onclick="selectPracticeType('hiragana')">Hiragana</button>
                    <button class="gh-pill ${quizState.type === 'katakana' ? 'active' : ''}" data-type="katakana" onclick="selectPracticeType('katakana')">Katakana</button>
                    <button class="gh-pill ${quizState.type === 'vocab' ? 'active' : ''}" data-type="vocab" onclick="selectPracticeType('vocab')">Kosakata</button>
                </div>
            </div>

            <div class="setup-group">
                <label>Filter Level JLPT:</label>
                <div class="gh-segmented-group" id="quiz-level-select">
                    <button class="gh-pill ${quizState.level === 'all' ? 'active' : ''}" data-level="all" onclick="selectPracticeLevel('all')">Semua Level</button>
                    <button class="gh-pill ${quizState.level === 'N5' ? 'active' : ''}" data-level="N5" onclick="selectPracticeLevel('N5')">N5</button>
                    <button class="gh-pill ${quizState.level === 'N4' ? 'active' : ''}" data-level="N4" onclick="selectPracticeLevel('N4')">N4</button>
                    <button class="gh-pill ${quizState.level === 'N3' ? 'active' : ''}" data-level="N3" onclick="selectPracticeLevel('N3')">N3</button>
                </div>
            </div>

            <div style="margin-top:20px">
                <button class="btn-secondary" id="start-quiz-btn" onclick="startPracticeQuiz()">
                    ${icon('play', 16)} Mulai Latihan Cepat
                </button>
            </div>
        </div>
    `;
}

function selectPracticeType(type) {
    quizState.type = type;
    const group = document.getElementById('quiz-type-select');
    if (group) {
        group.querySelectorAll('.gh-pill').forEach(b => {
            if (b.getAttribute('data-type') === type) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
    }
}

function selectPracticeLevel(lvl) {
    quizState.level = lvl;
    const group = document.getElementById('quiz-level-select');
    if (group) {
        group.querySelectorAll('.gh-pill').forEach(b => {
            if (b.getAttribute('data-level') === lvl) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
    }
}

function selectExamLevel(lvl) {
    examState.level = lvl;
    const picker = document.getElementById('exam-level-picker');
    if (picker) {
        picker.querySelectorAll('.gh-pill').forEach(b => b.classList.remove('active'));
        const activeBtn = picker.querySelector(`[data-lvl="${lvl}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

// =======================================================
// 2. BANK SOAL LENGKAP JLPT N5 • N4 • N3 (140+ SOAL)
// =======================================================
const JLPT_EXAM_BANK = {
    N5: [
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Huruf kanji dari kata 「にほん」 adalah...",
                "options": [
                        "日本",
                        "毎日",
                        "日記",
                        "本屋"
                ],
                "correct": 0,
                "exp": "にほん (Nihon / Jepang) ditulis dengan kanji 日本."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Cara baca kanji 「雨」 yang benar adalah...",
                "options": [
                        "あめ (ame)",
                        "ゆき (yuki)",
                        "かぜ (kaze)",
                        "くも (kumo)"
                ],
                "correct": 0,
                "exp": "雨 dibaca あめ (ame) artinya hujan."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「友だち」 dibaca...",
                "options": [
                        "ともだち (tomodachi)",
                        "きょうだい (kyoudai)",
                        "かぞく (kazoku)",
                        "せんせい (sensei)"
                ],
                "correct": 0,
                "exp": "友だち (tomodachi) = teman / sahabat."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Cara baca kanji 「大きい」 adalah...",
                "options": [
                        "おおきい (ookii)",
                        "ちいさい (chiisai)",
                        "たかい (takai)",
                        "ひくい (hikui)"
                ],
                "correct": 0,
                "exp": "大きい dibaca おおきい (ookii) artinya besar."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「水」 memiliki arti...",
                "options": [
                        "Air",
                        "Api",
                        "Tanah",
                        "Angin"
                ],
                "correct": 0,
                "exp": "水 (mizu) = air."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「男の人」 dibaca...",
                "options": [
                        "おとこのひと (otoko no hito)",
                        "おんなのひと (onna no hito)",
                        "こどものひと (kodomo no hito)",
                        "おとなのひと (otona no hito)"
                ],
                "correct": 0,
                "exp": "男の人 = laki-laki / pria dewasa."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「山」 memiliki arti...",
                "options": [
                        "Gunung",
                        "Sungai",
                        "Hutan",
                        "Laut"
                ],
                "correct": 0,
                "exp": "山 (yama) = gunung."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「食べる」 dibaca...",
                "options": [
                        "たべる (taberu)",
                        "のむ (nomu)",
                        "みる (miru)",
                        "きく (kiku)"
                ],
                "correct": 0,
                "exp": "食べる (taberu) = makan."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「川」 dibaca...",
                "options": [
                        "かわ (kawa)",
                        "やま (yama)",
                        "うみ (umi)",
                        "そら (sora)"
                ],
                "correct": 0,
                "exp": "川 (kawa) = sungai."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「今日」 dibaca...",
                "options": [
                        "きょう (kyou)",
                        "あした (ashita)",
                        "きのう (kinou)",
                        "あさって (asatte)"
                ],
                "correct": 0,
                "exp": "今日 (kyou) = hari ini."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "毎朝、７時に（　　）。",
                "options": [
                        "起きます",
                        "寝ます",
                        "行きます",
                        "帰ります"
                ],
                "correct": 0,
                "exp": "起きる (okiru) = bangun tidur. Setiap pagi bangun jam 7."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "暑いですから、冷たい（　　）を飲みます。",
                "options": [
                        "水",
                        "本",
                        "靴",
                        "傘"
                ],
                "correct": 0,
                "exp": "Minum air dingin (冷たい水)."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "「こんにちは」artinya adalah...",
                "options": [
                        "Selamat siang / Halo",
                        "Selamat pagi",
                        "Selamat malam",
                        "Sampai jumpa"
                ],
                "correct": 0,
                "exp": "こんにちは digunakan untuk salam siang hari."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "郵便局で（　　）を買いました。",
                "options": [
                        "切手",
                        "パン",
                        "靴",
                        "テレビ"
                ],
                "correct": 0,
                "exp": "切手 (kitte = prangko) dibeli di kantor pos (郵便局)."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "病院へ行って、（　　）をもらいました。",
                "options": [
                        "薬",
                        "本",
                        "車",
                        "切符"
                ],
                "correct": 0,
                "exp": "Pergi ke rumah sakit dan mendapatkan obat (薬 = kusuri)."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "あしたは日曜日ですから、学校は（　　）です。",
                "options": [
                        "休み",
                        "勉強",
                        "授業",
                        "宿題"
                ],
                "correct": 0,
                "exp": "Karena hari Minggu, sekolah libur (休み = yasumi)."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "駅までタクシーで１０（　　）かかります。",
                "options": [
                        "分",
                        "時",
                        "月",
                        "年"
                ],
                "correct": 0,
                "exp": "Menyatakan durasi menit: 分 (fun / pun)."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "夜１１時に（　　）。おやすみなさい。",
                "options": [
                        "寝ます",
                        "起きます",
                        "食べます",
                        "勉強します"
                ],
                "correct": 0,
                "exp": "Tidur jam 11 malam (寝ます = nemasu)."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "「ありがとう」dibalas dengan ungkapan...",
                "options": [
                        "どういたしまして",
                        "ごめんなさい",
                        "いただきます",
                        "さようなら"
                ],
                "correct": 0,
                "exp": "どういたしまして = sama-sama / terima kasih kembali."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "のどが渇きましたから、お茶を（　　）たいです。",
                "options": [
                        "飲み",
                        "食べ",
                        "買い",
                        "見"
                ],
                "correct": 0,
                "exp": "Haus, ingin minum teh (お茶を飲みたい)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "わたしはマイク・ミラー（　　）です。",
                "options": [
                        "は",
                        "が",
                        "を",
                        "に"
                ],
                "correct": 0,
                "exp": "Partikel は (wa) sebagai penanda topik kalimat."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "日曜日、新幹線（　　）京都へ行きます。",
                "options": [
                        "で",
                        "に",
                        "を",
                        "へ"
                ],
                "correct": 0,
                "exp": "Partikel で menandai sarana transportasi yang dipakai."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "図書館で友達（　　）勉強しました。",
                "options": [
                        "と",
                        "へ",
                        "を",
                        "で"
                ],
                "correct": 0,
                "exp": "Partikel と menandai rekan yang menyertai (bersama teman)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "机の上に本が（　　）。",
                "options": [
                        "あります",
                        "います",
                        "します",
                        "来ます"
                ],
                "correct": 0,
                "exp": "Untuk benda mati (buku) memakai あります."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "ここで写真を撮って（　　）いけません。",
                "options": [
                        "は",
                        "も",
                        "に",
                        "が"
                ],
                "correct": 0,
                "exp": "Pola larangan: V-てはいけません."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "すみませんが、窓を（　　）ください。",
                "options": [
                        "開けて",
                        "開けます",
                        "開ける",
                        "開けない"
                ],
                "correct": 0,
                "exp": "Pola permohonan santun: V-てください (あけてください)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "日本へ桜を見（　　）行きたいです。",
                "options": [
                        "に",
                        "で",
                        "を",
                        "から"
                ],
                "correct": 0,
                "exp": "Pola tujuan pergi: V-stem + に行きます."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "銀行は９時（　　）３時までです。",
                "options": [
                        "から",
                        "まで",
                        "に",
                        "で"
                ],
                "correct": 0,
                "exp": "Pola rentang: 〜から (dari) 〜まで (sampai)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "わたしは猫が（　　）。",
                "options": [
                        "好きです",
                        "食べます",
                        "行きます",
                        "飲みます"
                ],
                "correct": 0,
                "exp": "Pola kesukaan: [Target] が好きです."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "部屋にテレビ（　　）あります。",
                "options": [
                        "が",
                        "を",
                        "に",
                        "は"
                ],
                "correct": 0,
                "exp": "Penanda subjek keberadaan di tempat: があります."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "公園に子供が３人（　　）。",
                "options": [
                        "います",
                        "あります",
                        "します",
                        "行きます"
                ],
                "correct": 0,
                "exp": "Keberadaan makhluk bernyawa (anak): います."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "わたしは日本料理を（　　）ことがあります。",
                "options": [
                        "食べた",
                        "食べる",
                        "食べて",
                        "食べない"
                ],
                "correct": 0,
                "exp": "Pola pengalaman pernah: V-たことがあります."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "あしたは雨が降る（　　）思い。",
                "options": [
                        "と",
                        "を",
                        "に",
                        "で"
                ],
                "correct": 0,
                "exp": "Pola menyatakan opini/pendapat: 〜と思います."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "危ないですから、走ら（　　）ください。",
                "options": [
                        "ないで",
                        "なくて",
                        "ない",
                        "ず"
                ],
                "correct": 0,
                "exp": "Pola larangan halus: V-ないでください."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "この靴は（　　）安いです。",
                "options": [
                        "軽くて",
                        "軽い",
                        "軽かった",
                        "軽く"
                ],
                "correct": 0,
                "exp": "Menghubungkan dua kata sifat-i: 軽くて安いです (ringan dan murah)."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "【メモ】「山田さん、きょうの会議は午後２時から３時半までです。第２会議室へ来てください。-佐藤」\n\n問：会議は何時に始まりますか。",
                "options": [
                        "午後２時",
                        "午後３時半",
                        "午前９時",
                        "午後１時"
                ],
                "correct": 0,
                "exp": "Teks memo menyatakan: 会議は午後２時から (Rapat dimulai dari jam 2 siang)."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "【看板】「この池で魚を釣ってはいけません。」\n\n問：この場所で何をしてはいけませんか。",
                "options": [
                        "Memancing ikan",
                        "Berenang",
                        "Memberi makan ikan",
                        "Membeli ikan"
                ],
                "correct": 0,
                "exp": "魚を釣る (sakana o tsuru) = memancing ikan. Dilarang memancing."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「きのうは雨でした。どこへも行きませんでした。うちで本を読みました。」\n\n問：この人はきのう何をしましたか。",
                "options": [
                        "うちで本を読んだ",
                        "京都へ旅行した",
                        "映画を見に行った",
                        "買い物へ行った"
                ],
                "correct": 0,
                "exp": "Teks jelas menyebutkan: うちで本を読みました (Membaca buku di rumah)."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「あしたのテストには、えんぴつと消しゴムを持って来てください。辞書は使えません。」\n\n問：テストで使えないものは何ですか。",
                "options": [
                        "辞書 (Kamus)",
                        "えんぴつ (Pensil)",
                        "消しゴム (Penghapus)",
                        "時計 (Jam)"
                ],
                "correct": 0,
                "exp": "辞書は使えません = Kamus tidak bisa digunakan."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「田中さんは毎朝パンと卵を食べます。コーヒーを飲みます。牛乳は飲みません。」\n\n問：田中さんが飲まないものは何ですか。",
                "options": [
                        "牛乳 (Susu)",
                        "コーヒー (Kopi)",
                        "お茶 (Teh)",
                        "水 (Air)"
                ],
                "correct": 0,
                "exp": "牛乳は飲みません = Tidak minum susu."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「リーさんは来週の月曜日に国へ帰ります。そして金曜日にまた日本へ来ます。」\n\n問：リーさんは何曜日に日本へ戻りますか。",
                "options": [
                        "金曜日",
                        "月曜日",
                        "水曜日",
                        "日曜日"
                ],
                "correct": 0,
                "exp": "そして金曜日にまた日本へ来ます = Kembali ke Jepang pada hari Jumat."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「美術館のチケットは大人１０００円、子供５００円です。」\n\n問：大人１人と子供２人でいくらですか。",
                "options": [
                        "２０００円",
                        "１５００円",
                        "２５００円",
                        "１０００円"
                ],
                "correct": 0,
                "exp": "1000 + (500 x 2) = 2000円."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「図書館は月曜日が休みです。火曜日から日曜日まで開いています。」\n\n問：図書館が休みなのは何曜日ですか。",
                "options": [
                        "月曜日",
                        "日曜日",
                        "火曜日",
                        "土曜日"
                ],
                "correct": 0,
                "exp": "月曜日が休みです = Hari Senin libur."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「富士山は７月と８月に登ることができます。冬は登れません。」\n\n問：富士山に登れる季節はいつですか。",
                "options": [
                        "夏 (Musim panas)",
                        "冬 (Musim dingin)",
                        "春 (Musim semi)",
                        "秋 (Musim gugur)"
                ],
                "correct": 0,
                "exp": "Bulan 7 dan 8 adalah musim panas (夏)."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「鈴木さんは毎晩１０時に寝て、朝６時に起きます。」\n\n問：鈴木さんは何時間寝ますか。",
                "options": [
                        "８時間",
                        "６時間",
                        "７時間",
                        "９時間"
                ],
                "correct": 0,
                "exp": "Dari jam 10 malam sampai jam 6 pagi = 8 jam (8時間)."
        }
],
    N4: [
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「案内」 dibaca...",
                "options": [
                        "あんない (annai)",
                        "あんぜん (anzen)",
                        "いない (inai)",
                        "ないえん (naien)"
                ],
                "correct": 0,
                "exp": "案内 (annai) = panduan / informasi."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「試験」 artinya adalah...",
                "options": [
                        "Ujian / Tes",
                        "Pekerjaan",
                        "Pengalaman",
                        "Percobaan sains"
                ],
                "correct": 0,
                "exp": "試験 (shiken) = ujian / tes resmi."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「複雑」 dibaca...",
                "options": [
                        "ふくざつ (fukuzatsu)",
                        "かんたん (kantan)",
                        "たいせつ (taisetsu)",
                        "しんせつ (shinsetsu)"
                ],
                "correct": 0,
                "exp": "複雑 (fukuzatsu) = rumit / kompleks."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「経験」 memiliki arti...",
                "options": [
                        "Pengalaman",
                        "Percobaan",
                        "Pemeriksaan",
                        "Pertemuan"
                ],
                "correct": 0,
                "exp": "経験 (keiken) = pengalaman."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「約束」 dibaca...",
                "options": [
                        "やくそく (yakusoku)",
                        "けいかく (keikaku)",
                        "よてい (yotei)",
                        "きそく (kisoku)"
                ],
                "correct": 0,
                "exp": "約束 (yakusoku) = janji / perjanjian."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「準備」 dibaca...",
                "options": [
                        "じゅんび (junbi)",
                        "よてい (yotei)",
                        "れんしゅう (renshuu)",
                        "しゅくだい (shukudai)"
                ],
                "correct": 0,
                "exp": "準備 (junbi) = persiapan."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「注意」 memiliki arti...",
                "options": [
                        "Perhatian / Hati-hati",
                        "Perintah",
                        "Pemberitahuan",
                        "Pertolongan"
                ],
                "correct": 0,
                "exp": "注意 (chuui) = perhatian / waspada."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「乗り換える」 dibaca...",
                "options": [
                        "のりかえる (norikaeru)",
                        "おりる (oriru)",
                        "のる (noru)",
                        "かえる (kaeru)"
                ],
                "correct": 0,
                "exp": "乗り換える (norikaeru) = pindah / transit kendaraan."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「生活」 dibaca...",
                "options": [
                        "せいかつ (seikatsu)",
                        "たんじょう (tanjou)",
                        "いっしょう (isshou)",
                        "かつどう (katsudou)"
                ],
                "correct": 0,
                "exp": "生活 (seikatsu) = kehidupan sehari-hari."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「説明」 dibaca...",
                "options": [
                        "せつめい (setsumei)",
                        "しょうかい (shoukai)",
                        "はつめい (hatsumei)",
                        "しょうめい (shoumei)"
                ],
                "correct": 0,
                "exp": "説明 (setsumei) = penjelasan / menerangkan."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "会議の（　　）をメールで送ってください。",
                "options": [
                        "予定",
                        "趣味",
                        "財布",
                        "手紙"
                ],
                "correct": 0,
                "exp": "会議の予定 (kaigi no yotei) = jadwal rapat."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "約束の時間に（　　）しまいました。",
                "options": [
                        "遅れて",
                        "早く",
                        "止まって",
                        "急いで"
                ],
                "correct": 0,
                "exp": "遅れる (okureru) = terlambat. Terlambat dari waktu janji."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "「遠慮しないでください」artinya...",
                "options": [
                        "Jangan sungkan-sungkan",
                        "Jangan berisik",
                        "Jangan terlambat",
                        "Jangan pergi"
                ],
                "correct": 0,
                "exp": "遠慮しない (enryo shinai) = tidak usah sungkan/malu."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "台風が来ますから、窓を（　　）閉めてください。",
                "options": [
                        "しっかり",
                        "すっかり",
                        "うっかり",
                        "ぴったり"
                ],
                "correct": 0,
                "exp": "しっかり (shikkari) = dengan rapat / kuat / mantap."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "道が混んでいますから、（　　）に行きましょう。",
                "options": [
                        "地下鉄",
                        "徒歩",
                        "飛行機",
                        "船"
                ],
                "correct": 0,
                "exp": "Naik kereta bawah tanah (地下鉄 = chikatetsu) saat jalanan macet."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "先生に分からないところを（　　）しました。",
                "options": [
                        "質問",
                        "説明",
                        "案内",
                        "紹介"
                ],
                "correct": 0,
                "exp": "質問する (shitsumon suru) = bertanya / mengajukan pertanyaan."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "お腹がいっぱいですから、（　　）食べられません。",
                "options": [
                        "もう",
                        "まだ",
                        "全然",
                        "もっと"
                ],
                "correct": 0,
                "exp": "もう〜ない = sudah tidak bisa makan lagi."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "日本へ行く（　　）にパスポートを取ります。",
                "options": [
                        "ため",
                        "よう",
                        "こと",
                        "もの"
                ],
                "correct": 0,
                "exp": "Pola tujuan demi: [Kata Benda] のために / V-jisho ために."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "部屋が散らかっていますから、（　　）ましょう。",
                "options": [
                        "片付け",
                        "壊し",
                        "捨て",
                        "汚し"
                ],
                "correct": 0,
                "exp": "片付ける (katadzukeru) = merapikan / membereskan kamar."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "「お疲れ様でした」digunakan pada saat...",
                "options": [
                        "Selesai bekerja bersama",
                        "Baru tiba di pagi hari",
                        "Mau makan siang",
                        "Membeli barang"
                ],
                "correct": 0,
                "exp": "お疲れ様でした diucapkan saat selesai jam kerja / kegiatan bersama."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "ご飯を（　　）あとで、薬を飲みます。",
                "options": [
                        "食べた",
                        "食べる",
                        "食べて",
                        "食べない"
                ],
                "correct": 0,
                "exp": "Pola urutan: V-たあとで (setelah makan)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "この漢字の（　　）方を教えてください。",
                "options": [
                        "読み",
                        "読む",
                        "読んだ",
                        "読まない"
                ],
                "correct": 0,
                "exp": "Pola cara melakukan: V-masu stem + 方 (yomikata = cara membaca)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "あしたは早く（　　）なければなりません。",
                "options": [
                        "起き",
                        "起きる",
                        "起きた",
                        "起きない"
                ],
                "correct": 0,
                "exp": "Pola keharusan: V-nakereba narimasen (okinakereba)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "富士山に（　　）ことがありますか。",
                "options": [
                        "登った",
                        "登る",
                        "登って",
                        "登らない"
                ],
                "correct": 0,
                "exp": "Pola riwayat pengalaman: V-たことがあります."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "休みの日は映画を見（　　）、買い物をしたりします。",
                "options": [
                        "たり",
                        "て",
                        "し",
                        "ながら"
                ],
                "correct": 0,
                "exp": "Pola perwakilan aksi: 〜たり、〜たりします."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "あした雨が（　　）、試合は中止です。",
                "options": [
                        "降ったら",
                        "降ると",
                        "降れば",
                        "降っても"
                ],
                "correct": 0,
                "exp": "Pola pengandaian bersyarat: V-たら."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "値段が（　　）ても、このパソコンを買いたいです。",
                "options": [
                        "高く",
                        "高い",
                        "高かっ",
                        "高くて"
                ],
                "correct": 0,
                "exp": "Pola perlawanan kata sifat-i: 高くても (meskipun mahal)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "日本語が（　　）話せるようになりたいです。",
                "options": [
                        "上手に",
                        "上手で",
                        "上手な",
                        "上手だ"
                ],
                "correct": 0,
                "exp": "Memodifikasi kata kerja dengan sifat-na: 上手に."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "このボタンを押す（　　）、お湯が出ます。",
                "options": [
                        "と",
                        "ば",
                        "たら",
                        "なら"
                ],
                "correct": 0,
                "exp": "Pola sebab-akibat mekanik otomatis: V-jisho + と."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "母がセーターを（　　）くれました。",
                "options": [
                        "編んで",
                        "編みます",
                        "編んだ",
                        "編む"
                ],
                "correct": 0,
                "exp": "Pola kebaikan untuk saya: V-てくれます (ande kuremashita)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "この本はとても面白くて、（　　）やすいです。",
                "options": [
                        "読み",
                        "読む",
                        "読んだ",
                        "読め"
                ],
                "correct": 0,
                "exp": "Pola kemudahan: V-stem + やすい (yomiyasui = mudah dibaca)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "音楽を（　　）ながら、ジョギングをします。",
                "options": [
                        "聞き",
                        "聞く",
                        "聞いて",
                        "聞いた"
                ],
                "correct": 0,
                "exp": "Pola melakukan dua hal bersamaan: V-stem + ながら."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "今夜は雪が降る（　　）もしれません。",
                "options": [
                        "かも",
                        "など",
                        "しか",
                        "ばかり"
                ],
                "correct": 0,
                "exp": "Pola kemungkinan: 〜かもしれません (mungkin)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "財布を電車の中に（　　）しまいました。",
                "options": [
                        "忘れて",
                        "忘れる",
                        "忘れた",
                        "忘れ"
                ],
                "correct": 0,
                "exp": "Pola penyesalan kelupaan: V-てしまいました."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "このケーキは甘（　　）て美味しいです。",
                "options": [
                        "すぎ",
                        "すぎる",
                        "すぎた",
                        "すぎない"
                ],
                "correct": 0,
                "exp": "Pola kelebihan dosis/derajat: Stem + すぎる."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「このアパートは駅から徒歩５分でとても便利です。しかし、家賃が少し高いです。」\n\n問：このアパートの欠点は何ですか。",
                "options": [
                        "家賃が高いこと (Sewa mahal)",
                        "駅から遠いこと",
                        "古いこと",
                        "狭いこと"
                ],
                "correct": 0,
                "exp": "欠点 (kekurangan) yang disebutkan adalah: 家賃が少し高い."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「図書館の本を借りる時は、学生証を見せてください。１回に３冊まで借りられます。」\n\n問：学生証を見せれば、本は何冊まで借りられますか。",
                "options": [
                        "３冊",
                        "１冊",
                        "５冊",
                        "無制限"
                ],
                "correct": 0,
                "exp": "Teks jelas menyebutkan: １回に３冊まで (Maksimal 3 buku)."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「明日のバーベキュー大会は、雨の場合は中止になります。朝７時にホームページで知らせます。」\n\n問：雨の時、どこで中止を確認できますか。",
                "options": [
                        "ホームページ (Website)",
                        "電話",
                        "学校の掲示板",
                        "メール"
                ],
                "correct": 0,
                "exp": "ホームページで知らせます = Diberitahukan lewat website."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「日本の電車の中では、携帯電話で通話をしてはいけません。マナーモードに設定してください。」\n\n問：電車の中でしてはいけないことは何ですか。",
                "options": [
                        "通話をする (Menelepon)",
                        "音楽を聞く",
                        "本を読む",
                        "寝る"
                ],
                "correct": 0,
                "exp": "通話をしてはいけません = Dilarang berbicara telepon."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「山田さんは毎朝６時に起きて犬の散歩をします。それから朝ご飯を食べて会社へ行きます。」\n\n問：山田さんが最初にする行動は何ですか。",
                "options": [
                        "犬の散歩 (Mengajak jalan anjing)",
                        "朝ご飯を食べる",
                        "会社へ行く",
                        "新聞を読む"
                ],
                "correct": 0,
                "exp": "犬の散歩をします kemudian 朝ご飯を食べる."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「薬は１日３回、毎食後３０分以内に飲んでください。お茶やジュースで飲んではいけません。」\n\n問：薬は何で飲むべきですか。",
                "options": [
                        "水 (Air putih)",
                        "お茶",
                        "ジュース",
                        "コーヒー"
                ],
                "correct": 0,
                "exp": "お茶やジュースで飲んではいけません, harus dengan air putih."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「このエレベーターは偶数階（2, 4, 6, 8階）にしか止まりません。奇数階へ行く人は階段を使ってください。」\n\n問：５階へ行くにはどうしますか。",
                "options": [
                        "階段を使う (Tangga manual)",
                        "このエレベーターに乗る",
                        "隣のビルに行く",
                        "行けない"
                ],
                "correct": 0,
                "exp": "奇数階 (lantai ganjil termasuk 5) harus memakai tangga (階段)."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「山田さんは英語も中国語も上手に話せます。日本語は今勉強中です。」\n\n問：山田さんが流暢に話せる言語は何ですか。",
                "options": [
                        "英語と中国語",
                        "日本語だけ",
                        "英語だけ",
                        "中国語と日本語"
                ],
                "correct": 0,
                "exp": "英語も中国語も上手に話せます."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「荷物の配達時間は午前中、午後２〜４時、夕方６〜８時のいずれかを選べます。」\n\n問：選べない配達時間帯はどれですか。",
                "options": [
                        "午後１２時〜１時",
                        "午前中",
                        "午後２〜４時",
                        "夕方６〜８時"
                ],
                "correct": 0,
                "exp": "Siang jam 12-13 tidak ada dalam daftar pilihan opsi."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「当店は毎週水曜日が定休日です。祝日の場合は翌木曜日が休みになります。」\n\n問：水曜日が祝日の場合、休みはいつですか。",
                "options": [
                        "木曜日",
                        "水曜日",
                        "金曜日",
                        "火曜日"
                ],
                "correct": 0,
                "exp": "祝日の場合は翌木曜日が休みになります."
        }
],
    N3: [
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「管理」 dibaca...",
                "options": [
                        "かんり (kanri)",
                        "かんけい (kankei)",
                        "かんしん (kanshin)",
                        "かんりょう (kanryou)"
                ],
                "correct": 0,
                "exp": "管理 (kanri) = pengelolaan / manajemen."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「責任」 memiliki arti...",
                "options": [
                        "Tanggung jawab",
                        "Kewajiban",
                        "Kepemimpinan",
                        "Kerja keras"
                ],
                "correct": 0,
                "exp": "責任 (sekinin) = tanggung jawab."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「曖昧」 dibaca...",
                "options": [
                        "あいまい (aimai)",
                        "あいまつ (aimatsu)",
                        "あんまい (anmai)",
                        "あいまいな (aimaina)"
                ],
                "correct": 0,
                "exp": "曖昧 (aimai) = samar / tidak jelas / ambigu."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「環境」 dibaca...",
                "options": [
                        "かんきょう (kankyou)",
                        "かんけい (kankei)",
                        "かんきょうな (kankyouna)",
                        "かんこう (kankou)"
                ],
                "correct": 0,
                "exp": "環境 (kankyou) = lingkungan hidup."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「成功」 artinya adalah...",
                "options": [
                        "Berhasil / Sukses",
                        "Gagal",
                        "Bekerja",
                        "Berjuang"
                ],
                "correct": 0,
                "exp": "成功 (seikou) = sukses / berhasil."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「積極的」 dibaca...",
                "options": [
                        "せっきょくてき (sekkyokuteki)",
                        "しょうきょくてき (shoukyokuteki)",
                        "せつじつてき (setsujitsuteki)",
                        "きょくてき (kyokuteki)"
                ],
                "correct": 0,
                "exp": "積極的 (sekkyokuteki) = proaktif / bersikap positif."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「態度」 memiliki arti...",
                "options": [
                        "Sikap / Perilaku",
                        "Penampilan",
                        "Perkataan",
                        "Wajah"
                ],
                "correct": 0,
                "exp": "態度 (taido) = sikap batin / perilaku luar."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「満足」 dibaca...",
                "options": [
                        "まんぞく (manzoku)",
                        "ふまん (fuman)",
                        "まんてん (manten)",
                        "まんえつ (man'etsu)"
                ],
                "correct": 0,
                "exp": "満足 (manzoku) = puas / kepuasan."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「複雑」 memilki lawan kata yaitu...",
                "options": [
                        "単純 (Tanjun)",
                        "安全 (Anzen)",
                        "危険 (Kiken)",
                        "親切 (Shinsetsu)"
                ],
                "correct": 0,
                "exp": "Lawan kata 複雑 (rumit) adalah 単純 (sederhana/tanjun)."
        },
        {
                "section": "文字・語彙 (Moji)",
                "prompt": "Kanji 「緊張」 dibaca...",
                "options": [
                        "きんちょう (kinchou)",
                        "しんちょう (shinchou)",
                        "たいちょう (taichou)",
                        "ふんいき (fun'iki)"
                ],
                "correct": 0,
                "exp": "緊張 (kinchou) = gugup / tegang."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "プロジェクトの契約を（　　）しました。",
                "options": [
                        "締結",
                        "約束",
                        "面接",
                        "電話"
                ],
                "correct": 0,
                "exp": "契約を締結する (keiyaku o teiketsu suru) = menandatangani kontrak resmi."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "彼女はどんな困難にも（　　）立ち向かった。",
                "options": [
                        "果敢に",
                        "うっかり",
                        "のんびり",
                        "すっかり"
                ],
                "correct": 0,
                "exp": "果敢に (kakan ni) = dengan berani dan pantang menyerah."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "「ご無沙汰しております」diucapkan ketika...",
                "options": [
                        "Sudah lama tidak saling berkabar",
                        "Bertemu orang baru pertama kali",
                        "Hendak berpamitan pulang kantor",
                        "Meminta maaf karena salah"
                ],
                "correct": 0,
                "exp": "ご無沙汰しております adalah salam sopan setelah lama tak bersua."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "新商品の売り上げが（　　）伸びています。",
                "options": [
                        "急速に",
                        "全然",
                        "あまり",
                        "たまに"
                ],
                "correct": 0,
                "exp": "急速に (kyuusoku ni) = secara pesat / drastis naik."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "お客様の要望に（　　）プランをご提案します。",
                "options": [
                        "応じた",
                        "関係した",
                        "断った",
                        "離れた"
                ],
                "correct": 0,
                "exp": "要望に応じた (youbou ni oujita) = sesuai dengan permintaan klien."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "彼の誠実な人柄に（　　）を持ちました。",
                "options": [
                        "好感",
                        "不満",
                        "疑問",
                        "恐怖"
                ],
                "correct": 0,
                "exp": "好感を持つ (koukan o motsu) = menaruh kesan baik / simpati."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "「お世話になっております」sering dipakai di...",
                "options": [
                        "Email bisnis / Pembuka percakapan kerja",
                        "Pesta ulang tahun teman sebaya",
                        "Saat memesan makanan di warung",
                        "Ketika menelepon keluarga"
                ],
                "correct": 0,
                "exp": "Salam bisnis standar dalam komunikasi profesional Jepang."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "計画が（　　）通りに進んでいます。",
                "options": [
                        "予定",
                        "趣味",
                        "偶然",
                        "事故"
                ],
                "correct": 0,
                "exp": "予定通り (yotei doori) = berjalan sesuai jadwal/rencana semula."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "その意見には（　　）反対です。",
                "options": [
                        "断固",
                        "しっかり",
                        "ぼんやり",
                        "うっかり"
                ],
                "correct": 0,
                "exp": "断固反対 (danko hantai) = menentang secara tegas/mutlak."
        },
        {
                "section": "文字・語彙 (Goi)",
                "prompt": "会議で貴重な（　　）をいただき感謝します。",
                "options": [
                        "ご意見",
                        "ご質問",
                        "ご案内",
                        "お邪魔"
                ],
                "correct": 0,
                "exp": "ご意見をいただき (menerima masukan/pendapat berharga)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "大切な会議なので、遅刻する（　　）にはいかない。",
                "options": [
                        "わけ",
                        "こと",
                        "もの",
                        "はず"
                ],
                "correct": 0,
                "exp": "Pola V-わけにはいかない: tidak boleh/tidak memungkinkan secara moral."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "努力を重ねた（　　）、ついに試験に合格した。",
                "options": [
                        "末に",
                        "うちに",
                        "ついでに",
                        "かわりに"
                ],
                "correct": 0,
                "exp": "Pola V-た末に (sue ni): setelah perjuangan panjang akhirnya berbuah hasil."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "現代社会に（　　）、情報セキュリティは極めて重要だ。",
                "options": [
                        "おいて",
                        "つれて",
                        "対して",
                        "関して"
                ],
                "correct": 0,
                "exp": "Pola 〜において: menyatakan lokasi/situasi konteks formal."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "彼は熱心に勉強しているから、合格する（　　）だ。",
                "options": [
                        "はず",
                        "わけ",
                        "つもり",
                        "こと"
                ],
                "correct": 0,
                "exp": "Pola 〜はずだ: ekspektasi kuat wajar terjadi (pasti lulus)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "雨が強くなるに（　　）、風も激しくなってきた。",
                "options": [
                        "したがって",
                        "くらべて",
                        "たいして",
                        "かんして"
                ],
                "correct": 0,
                "exp": "Pola 〜にしたがって: seiring dengan berkembangnya kondisi A, kondisi B berubah."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "山田先生に（　　）、この本を推薦していただきました。",
                "options": [
                        "よって",
                        "ついて",
                        "とって",
                        "たいして"
                ],
                "correct": 0,
                "exp": "Pola penanda pelaku pasif hormat: 〜によって."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "この仕事は、私（　　）大きな挑戦です。",
                "options": [
                        "にとって",
                        "に対して",
                        "について",
                        "にとっての"
                ],
                "correct": 0,
                "exp": "Pola 〜にとって: bagi (sudut pandang subjek)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "子供（　　）、大人のような鋭い意見を言った。",
                "options": [
                        "ながらも",
                        "つつも",
                        "ものの",
                        "わりに"
                ],
                "correct": 0,
                "exp": "Pola 〜ながらも: meskipun masih (anak kecil), tapi..."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "彼の話は信じ（　　）ものがある。",
                "options": [
                        "がたい",
                        "にくい",
                        "づらい",
                        "かねる"
                ],
                "correct": 0,
                "exp": "Pola V-stem + がたい: sulit secara psikologis untuk diyakini."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "健康を害してまで、お金を稼ぐ（　　）はない。",
                "options": [
                        "こと",
                        "わけ",
                        "はず",
                        "もの"
                ],
                "correct": 0,
                "exp": "Pola V-ことはない: tidak perlu sampai sejauh itu."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "準備が整い（　　）、ただちに出発します。",
                "options": [
                        "次第",
                        "次第で",
                        "次第に",
                        "通り"
                ],
                "correct": 0,
                "exp": "Pola V-stem + 次第 (shidai): segera setelah (A selesai, langsung lakukan B)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "年齢の（　　）、彼はとても若々しく見える。",
                "options": [
                        "わりに",
                        "くせに",
                        "とおり",
                        "反面"
                ],
                "correct": 0,
                "exp": "Pola 〜わりに: jika dibandingkan dengan (usianya), tampak sangat muda."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "社長（　　）始め、全社員が一丸となって働いた。",
                "options": [
                        "をはじめ",
                        "を中心にして",
                        "に代わって",
                        "をもとに"
                ],
                "correct": 0,
                "exp": "Pola 〜をはじめ: diawali dari (figur utama)."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "一度引き受けた以上、最後までやり遂げる（　　）だ。",
                "options": [
                        "べき",
                        "はず",
                        "わけ",
                        "こと"
                ],
                "correct": 0,
                "exp": "Pola 〜以上、〜べきだ: karena sudah berkomitmen, sepatutnya tuntas."
        },
        {
                "section": "文法 (Bunpou)",
                "prompt": "時間が経つに（　　）、緊張が和らいできた。",
                "options": [
                        "つれて",
                        "対して",
                        "反して",
                        "限って"
                ],
                "correct": 0,
                "exp": "Pola 〜につれて: seiring berjalannya waktu."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「現代のビジネスにおいては、単に専門知識を持つだけでなく、異なる文化背景を持つ人々と円滑に協働できる対人コミュニケーション能力が不可欠である。」\n\n問：筆者が現代ビジネスで不可欠だと主張している能力は何ですか。",
                "options": [
                        "対人コミュニケーション能力 (Komunikasi antarmanusia)",
                        "専門知識の暗記",
                        "語学のテストスコア",
                        "コンピュータのプログラミング技術"
                ],
                "correct": 0,
                "exp": "対人コミュニケーション能力が不可欠である dinyatakan secara tegas oleh penulis."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「環境保護の観点からプラスチック製品の削減が叫ばれているが、代替素材の導入にはコストや耐久性の面で依然として多くの課題が残されている。」\n\n問：代替素材導入の課題として挙げられているものは何ですか。",
                "options": [
                        "コストと耐久性 (Biaya dan ketahanan)",
                        "デザインと重さ",
                        "法律の制限",
                        "国民の関心の低さ"
                ],
                "correct": 0,
                "exp": "コストや耐久性の面で課題が残されている."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「読書の醍醐味は、他者の人生を追体験し、自分とは異なる視点から世界を見つめ直すきっかけを得られる点にある。」\n\n問：筆者によると、読書の醍醐味は何ですか。",
                "options": [
                        "他者の人生の追体験と新しい視点の獲得",
                        "漢字の知識が増えること",
                        "暇な時間を潰せること",
                        "一人で静かに過ごせること"
                ],
                "correct": 0,
                "exp": "他者の人生を追体験し、異なる視点を得られる点."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「失敗を恐れて新しい試みを避ける組織は、短期的には安定を保てても、長期的には時代の変化に対応できず衰退する運命にある。」\n\n問：新しい試みを避ける組織はどうなると筆者は述べていますか。",
                "options": [
                        "長期的には衰退する (Jangka panjang akan terpuruk)",
                        "常に高い利益を出し続ける",
                        "従業員の満足度が上がる",
                        "世界企業へと成長する"
                ],
                "correct": 0,
                "exp": "長期的には時代の変化に対応できず衰退する運命にある."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「健康を維持するためには、栄養バランスの取れた食事、適度な運動、そして十分な睡眠の３つが揃って初めて効果を発揮する。」\n\n問：健康維持に必要な３つの要素に含まれないものはどれですか。",
                "options": [
                        "高価なサプリメント (Suplemen mahal)",
                        "栄養バランスの取れた食事",
                        "適度な運動",
                        "十分な睡眠"
                ],
                "correct": 0,
                "exp": "Tiga elemen utama adalah nutrisi makanan, olahraga teratur, dan istirahat tidur."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「AIの進化は人間の仕事を奪うのではなく、人間がより創造的な活動に集中できる余白を生み出すための道具として捉えるべきである。」\n\n問：筆者はAIをどのように捉えるべきだと述べていますか。",
                "options": [
                        "人間の創造的活動を支える道具",
                        "すべての仕事を奪う脅威",
                        "使用を禁止すべき危険な技術",
                        "教育現場でのみ使うもの"
                ],
                "correct": 0,
                "exp": "人間が創造的な活動に集中できる余白を生み出す道具."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「伝統工芸の後継者不足が深刻化する中、若手デザイナーとの協業によって現代の生活様式にマッチした新商品を開発する試みが注目を集めている。」\n\n問：後継者不足の解決策として注目されている試みは何ですか。",
                "options": [
                        "若手デザイナーとの協業による新商品開発",
                        "伝統工芸の製造中止",
                        "海外への工場移転",
                        "機械による完全自動化"
                ],
                "correct": 0,
                "exp": "若手デザイナーとの協業によって新商品を開発する試み."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「言葉遣いひとつで相手に与える印象は劇的に変わる。特にビジネスシーンでは、謙虚かつ明瞭な話し方が信頼関係構築の土台となる。」\n\n問：信頼関係構築の土台として重視されている話し方はどのようなものですか。",
                "options": [
                        "謙虚かつ明瞭な話し方 (Rendah hati dan jelas)",
                        "大声で威圧的な話し方",
                        "曖昧で回りくどい話し方",
                        "敬語を使わないくだけた話し方"
                ],
                "correct": 0,
                "exp": "謙虚かつ明瞭な話し方が信頼関係構築の土台."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「都市部への一極集中を是正するため、テレワークの普及を機に地方移住を支援する自治体が増加している。」\n\n問：地方移住が増加しているきっかけは何ですか。",
                "options": [
                        "テレワークの普及 (Menjamurnya kerja jarak jauh / remote)",
                        "都市部の物価下落",
                        "地方の交通網の廃止",
                        "海外旅行の解禁"
                ],
                "correct": 0,
                "exp": "テレワークの普及を機に地方移住を支援."
        },
        {
                "section": "読解 (Dokkai)",
                "prompt": "「睡眠時間が不足すると、判断力や記憶力が低下するだけでなく、精神的なストレスに対する耐性も著しく弱まることが科学的に証明されている。」\n\n問：睡眠不足が引き起こす悪影響は何ですか。",
                "options": [
                        "判断力・記憶力の低下とストレス耐性の弱体化",
                        "食欲の異常な増加だけ",
                        "視力の急激な回復",
                        "体重の急激な減少"
                ],
                "correct": 0,
                "exp": "判断力や記憶力の低下、ストレス耐性の弱体化."
        }
]
};

// =======================================================
// 3. START OFFICIAL JLPT EXAM (LOCKDOWN & SHUFFLE)
// =======================================================
function startOfficialJlptExam(specifiedLevel) {
    const level = specifiedLevel || examState.level || 'N5';
    examState.level = level;
    examState.active = true;
    examState.currentIndex = 0;
    examState.answers = {};
    examState.totalSeconds = 25 * 60;
    examState.remainingSeconds = 25 * 60;
    examState.startTime = new Date();

    // 1. Pick and Fisher-Yates Shuffle questions from bank
    const pool = [...(JLPT_EXAM_BANK[level] || JLPT_EXAM_BANK['N5'])];
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Select 20 questions for this session
    const session = pool.slice(0, 20);

    // Shuffle options for each question so correct option is randomized
    examState.questions = session.map((q, idx) => {
        const correctVal = q.options[q.correct];
        const shuffledOpts = [...q.options];
        for (let i = shuffledOpts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOpts[i], shuffledOpts[j]] = [shuffledOpts[j], shuffledOpts[i]];
        }
        const newCorrectIdx = shuffledOpts.indexOf(correctVal);
        return {
            id: idx + 1,
            section: q.section,
            prompt: q.prompt,
            options: shuffledOpts,
            correct: newCorrectIdx,
            exp: q.exp
        };
    });

    // 2. Lock Navigation Tabs & Header
    const header = document.getElementById('gh-header');
    const navTabs = document.getElementById('gh-nav-tabs');
    if (header) header.classList.add('exam-locked');
    if (navTabs) navTabs.classList.add('exam-locked');

    // 3. Start Timer Interval
    if (examState.timerInterval) clearInterval(examState.timerInterval);
    examState.timerInterval = setInterval(() => {
        examState.remainingSeconds--;
        updateExamTimerDisplay();
        if (examState.remainingSeconds <= 0) {
            clearInterval(examState.timerInterval);
            showToast('Waktu simulasi ujian telah habis! Mengumpulkan otomatis...', 'warning');
            finishOfficialExam();
        }
    }, 1000);

    renderOfficialExamUi();
    showToast(`Mode Ujian Terkunci Aktif: Simulasi JLPT ${level} dimulai. Selamat mengerjakan!`, 'info');
}

function updateExamTimerDisplay() {
    const timerEl = document.getElementById('exam-timer-display');
    if (!timerEl) return;
    const m = Math.floor(examState.remainingSeconds / 60);
    const s = examState.remainingSeconds % 60;
    timerEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (examState.remainingSeconds <= 300) {
        timerEl.classList.add('timer-warning');
    }
}

// 4. RENDER EXAM UI (QUESTION & PALETTE)
function renderOfficialExamUi() {
    const container = document.getElementById('content');
    if (!container) return;

    const q = examState.questions[examState.currentIndex];
    const answeredCount = Object.keys(examState.answers).length;
    const totalQ = examState.questions.length;
    const progressPercent = Math.round((answeredCount / totalQ) * 100);

    const m = Math.floor(examState.remainingSeconds / 60);
    const s = examState.remainingSeconds % 60;
    const timeFormatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    container.innerHTML = `
        <!-- Lock Banner Top -->
        <div class="exam-lock-banner">
            <div style="display:flex;align-items:center;gap:10px">
                <span class="lock-indicator-pulse">${icon('lock', 16)}</span>
                <div>
                    <strong style="color:#ff7b72">SIMULASI UJIAN RESMI JLPT ${examState.level}</strong>
                    <span style="color:var(--text-muted);font-size:12px;margin-left:8px">• Mode Lockdown Anti-Mencontek Aktif</span>
                </div>
            </div>
            <div style="display:flex;align-items:center;gap:12px">
                <div class="exam-timer-chip" title="Sisa Waktu Ujian">
                    ${icon('clock', 16)}
                    <span id="exam-timer-display">${timeFormatted}</span>
                </div>
                <button class="btn-secondary" style="font-size:12px;padding:4px 10px;border-color:#ff7b72;color:#ff7b72" onclick="confirmCancelExam()">
                    ${icon('x', 14)} Batalkan Ujian
                </button>
            </div>
        </div>

        <div class="exam-layout-grid">
            <!-- Left: Question Card -->
            <div class="exam-question-card">
                <div class="exam-question-header">
                    <div style="display:flex;align-items:center;gap:10px">
                        <span class="exam-q-number">Soal #${q.id}</span>
                        <span class="gh-tab-badge">${q.section}</span>
                    </div>
                    <span style="font-size:12px;color:var(--text-muted)">
                        Terjawab: ${answeredCount} dari ${totalQ} Soal (${progressPercent}%)
                    </span>
                </div>

                <div class="exam-prompt-box">
                    ${q.prompt.replace(/\n/g, '<br>')}
                </div>

                <div class="exam-options-list">
                    ${q.options.map((opt, idx) => {
                        const isSelected = examState.answers[q.id] === idx;
                        return `
                            <button class="exam-option-btn ${isSelected ? 'selected' : ''}" onclick="selectExamOption(${q.id}, ${idx})">
                                <span class="exam-opt-index">${String.fromCharCode(65 + idx)}</span>
                                <span class="exam-opt-text">${opt}</span>
                                ${isSelected ? `<span class="exam-opt-check">${icon('checkCircle', 16)}</span>` : ''}
                            </button>
                        `;
                    }).join('')}
                </div>

                <div class="exam-question-footer">
                    <button class="btn-secondary" onclick="prevExamQuestion()" ${examState.currentIndex === 0 ? 'disabled' : ''}>
                        ${icon('arrowLeft', 14)} Soal Sebelumnya
                    </button>
                    <div style="display:flex;gap:8px">
                        ${examState.currentIndex < totalQ - 1 ? `
                            <button class="btn-primary" onclick="nextExamQuestion()">
                                Soal Berikutnya ${icon('arrowRight', 14)}
                            </button>
                        ` : `
                            <button class="btn-primary" style="background:var(--accent-primary);border-color:var(--accent-primary)" onclick="confirmFinishExam()">
                                ${icon('checkCircle', 15)} Selesai & Kumpulkan
                            </button>
                        `}
                    </div>
                </div>
            </div>

            <!-- Right: Question Navigation Palette -->
            <div class="exam-palette-card">
                <div class="palette-header">
                    <strong style="font-size:13px;color:var(--text-primary)">Palet Nomor Soal</strong>
                    <span style="font-size:11px;color:var(--text-muted)">JLPT ${examState.level}</span>
                </div>

                <div class="exam-palette-grid">
                    ${examState.questions.map((item, idx) => {
                        const isAns = examState.answers[item.id] !== undefined;
                        const isCurrent = idx === examState.currentIndex;
                        return `
                            <button class="palette-num-btn ${isAns ? 'answered' : ''} ${isCurrent ? 'current' : ''}" onclick="jumpToExamQuestion(${idx})">
                                ${item.id}
                            </button>
                        `;
                    }).join('')}
                </div>

                <div class="palette-legend">
                    <div class="legend-item"><span class="legend-dot answered"></span><span>Sudah Terjawab</span></div>
                    <div class="legend-item"><span class="legend-dot current"></span><span>Soal Saat Ini</span></div>
                    <div class="legend-item"><span class="legend-dot empty"></span><span>Belum Terjawab</span></div>
                </div>

                <button class="btn-primary" style="width:100%;margin-top:16px;background:var(--accent-primary);border-color:var(--accent-primary)" onclick="confirmFinishExam()">
                    ${icon('checkCircle', 15)} Kumpulkan Jawaban
                </button>
            </div>
        </div>
    `;
}

function selectExamOption(qId, optIdx) {
    examState.answers[qId] = optIdx;
    renderOfficialExamUi();
}

function nextExamQuestion() {
    if (examState.currentIndex < examState.questions.length - 1) {
        examState.currentIndex++;
        renderOfficialExamUi();
    }
}

function prevExamQuestion() {
    if (examState.currentIndex > 0) {
        examState.currentIndex--;
        renderOfficialExamUi();
    }
}

function jumpToExamQuestion(idx) {
    if (idx >= 0 && idx < examState.questions.length) {
        examState.currentIndex = idx;
        renderOfficialExamUi();
    }
}

// =======================================================
// 5. IN-APP CENTERED MODAL DIALOGS (NO BROWSER CONFIRM)
// =======================================================
function confirmFinishExam() {
    const unanswered = examState.questions.length - Object.keys(examState.answers).length;
    const msg = unanswered > 0
        ? `Masih ada ${unanswered} soal yang belum Anda jawab. Apakah Anda yakin ingin mengumpulkan lembar ujian sekarang?`
        : 'Apakah Anda yakin ingin menyelesaikan dan mengumpulkan lembar jawaban ujian simulasi ini?';

    if (typeof showConfirmModal === 'function') {
        showConfirmModal({
            title: 'Kumpulkan Lembar Ujian?',
            message: msg,
            confirmText: 'Ya, Kumpulkan Ujian',
            cancelText: 'Kembali Periksa',
            isDanger: unanswered > 0,
            iconType: 'checkCircle',
            onConfirm: () => finishOfficialExam()
        });
    } else {
        if (confirm(msg)) finishOfficialExam();
    }
}

function confirmCancelExam() {
    const msg = 'Apakah Anda yakin ingin membatalkan simulasi ujian ini? Navigasi menu akan terbuka kembali dan lembar jawaban tidak akan dinilai.';

    if (typeof showConfirmModal === 'function') {
        showConfirmModal({
            title: 'Batalkan Simulasi Ujian?',
            message: msg,
            confirmText: 'Ya, Batalkan Ujian',
            cancelText: 'Lanjutkan Ujian',
            isDanger: true,
            iconType: 'alertTriangle',
            onConfirm: () => {
                unlockExamLockdown();
                showToast('Simulasi ujian telah dibatalkan.', 'info');
                renderQuizSetup(document.getElementById('content'), 'exam');
            }
        });
    } else {
        if (confirm(msg)) {
            unlockExamLockdown();
            renderQuizSetup(document.getElementById('content'), 'exam');
        }
    }
}

function unlockExamLockdown() {
    examState.active = false;
    if (examState.timerInterval) {
        clearInterval(examState.timerInterval);
        examState.timerInterval = null;
    }
    const header = document.getElementById('gh-header');
    const navTabs = document.getElementById('gh-nav-tabs');
    if (header) header.classList.remove('exam-locked');
    if (navTabs) navTabs.classList.remove('exam-locked');
}

// 6. FINISH EXAM & RENDER OFFICIAL SCORECARD
function finishOfficialExam() {
    unlockExamLockdown();

    let correctCount = 0;
    const results = examState.questions.map(q => {
        const userAns = examState.answers[q.id];
        const isCorrect = userAns === q.correct;
        if (isCorrect) correctCount++;
        return {
            q: q,
            userAns: userAns,
            isCorrect: isCorrect
        };
    });

    const total = examState.questions.length;
    const percent = Math.round((correctCount / total) * 100);
    const isPassed = percent >= 60; // 60% passing mark
    const xpEarned = correctCount * 25 + (isPassed ? 100 : 0);

    // Save XP
    if (typeof addXP === 'function') {
        addXP(xpEarned);
    }

    const container = document.getElementById('content');
    if (!container) return;

    container.innerHTML = `
        <div class="exam-scorecard">
            <div class="scorecard-header ${isPassed ? 'passed' : 'failed'}">
                <div class="scorecard-icon">
                    ${isPassed ? icon('checkCircle', 48) : icon('x', 48)}
                </div>
                <h2 style="font-size:22px;margin-bottom:6px;color:#fff">
                    ${isPassed ? 'SELAMAT, ANDA LULUS!' : 'BELUM MEMENUHI SYARAT KELULUSAN'}
                </h2>
                <div style="font-size:14px;color:rgba(255,255,255,0.85)">
                    Simulasi Resmi JLPT Tingkat ${examState.level}
                </div>
            </div>

            <div class="scorecard-body">
                <div class="scorecard-stats-row">
                    <div class="score-stat-box">
                        <div class="stat-number">${correctCount} / ${total}</div>
                        <div class="stat-label">Jawaban Benar</div>
                    </div>
                    <div class="score-stat-box">
                        <div class="stat-number" style="color:${isPassed ? 'var(--accent-primary)' : '#ff7b72'}">${percent}%</div>
                        <div class="stat-label">Nilai Akhir (Passing 60%)</div>
                    </div>
                    <div class="score-stat-box">
                        <div class="stat-number" style="color:var(--accent-secondary)">+${xpEarned}</div>
                        <div class="stat-label">XP Diperoleh</div>
                    </div>
                    <div class="score-stat-box">
                        <span class="exam-status-pill ${isPassed ? 'pass' : 'fail'}">
                            ${isPassed ? 'LULUS (合格)' : 'TIDAK LULUS (不合格)'}
                        </span>
                        <div class="stat-label" style="margin-top:4px">Status Ujian</div>
                    </div>
                </div>

                <div style="display:flex;gap:12px;justify-content:center;margin-top:20px">
                    <button class="btn-primary" onclick="startOfficialJlptExam('${examState.level}')">
                        ${icon('play', 15)} Ikuti Ujian Baru (Soal Diacak)
                    </button>
                    <button class="btn-secondary" onclick="renderQuizSetup(document.getElementById('content'), 'exam')">
                        ${icon('arrowLeft', 15)} Pilih Level Lain
                    </button>
                </div>

                <!-- Detailed Answers Review -->
                <div class="exam-review-list">
                    <h3 style="font-size:16px;color:var(--text-primary);margin-bottom:12px;display:flex;align-items:center;gap:8px">
                        ${icon('bookOpen', 18)} Pembahasan Lembar Jawaban:
                    </h3>
                    ${results.map((res, idx) => {
                        const userChoice = res.userAns !== undefined ? res.q.options[res.userAns] : 'Tidak Dijawab';
                        const correctChoice = res.q.options[res.q.correct];
                        return `
                            <div class="exam-review-item ${res.isCorrect ? 'correct' : 'wrong'}">
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                                    <strong style="color:var(--text-primary)">Soal #${idx + 1} • ${res.q.section}</strong>
                                    <span class="gh-tab-badge" style="background:${res.isCorrect ? 'var(--accent-primary)' : '#ff7b72'};color:#fff">
                                        ${res.isCorrect ? 'BENAR (+1)' : 'SALAH'}
                                    </span>
                                </div>
                                <div style="font-size:14px;color:var(--text-primary);margin-bottom:8px;font-family:var(--font-jp)">
                                    ${res.q.prompt.replace(/\n/g, '<br>')}
                                </div>
                                <div style="font-size:13px;margin-bottom:4px">
                                    <span style="color:var(--text-muted)">Jawaban Anda:</span>
                                    <strong style="color:${res.isCorrect ? 'var(--accent-primary)' : '#ff7b72'}">${userChoice}</strong>
                                </div>
                                ${!res.isCorrect ? `
                                    <div style="font-size:13px;margin-bottom:6px">
                                        <span style="color:var(--text-muted)">Jawaban Benar:</span>
                                        <strong style="color:var(--accent-primary)">${correctChoice}</strong>
                                    </div>
                                ` : ''}
                                <div style="font-size:12px;color:var(--text-secondary);background:var(--bg-subtle);padding:8px 12px;border-radius:var(--radius-xs);margin-top:6px">
                                    ${icon('info', 13)} <em>Penjelasan:</em> ${res.q.exp}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
}

// =======================================================
// 7. PRACTICE QUICK QUIZ FUNCTIONS
// =======================================================
async function startPracticeQuiz() {
    const btn = document.getElementById('start-quiz-btn');
    if (btn) btn.disabled = true;

    try {
        const qType = quizState.type === 'vocab' ? 'vocabulary' : quizState.type;
        const questions = await invoke('generate_quiz', {
            quizType: qType,
            level: quizState.level || 'all',
            count: 10,
        });

        if (!questions || questions.length === 0) {
            showToast('Tidak ada pertanyaan untuk kategori ini.', 'warning');
            if (btn) btn.disabled = false;
            return;
        }

        quizState.questions = questions;
        quizState.currentIndex = 0;
        quizState.totalCorrect = 0;
        quizState.answered = false;

        renderPracticeQuizQuestion();
    } catch (e) {
        console.error('Error generating practice quiz:', e);
        showToast('Gagal memuat soal latihan.', 'danger');
        if (btn) btn.disabled = false;
    }
}

function renderPracticeQuizQuestion() {
    const container = document.getElementById('content');
    if (!container) return;

    const q = quizState.questions[quizState.currentIndex];
    const total = quizState.questions.length;
    const progress = Math.round(((quizState.currentIndex + 1) / total) * 100);

    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${icon('target', 24)}</span> Latihan Cepat</h1>
                <div class="header-subtitle">Pertanyaan ${quizState.currentIndex + 1} dari ${total}</div>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-progress-bar">
                <div class="quiz-progress-fill" style="width: ${progress}%"></div>
            </div>

            <div class="quiz-card">
                <div class="quiz-prompt-type">${q.question || q.question_type || 'Tebak Karakter & Makna'}</div>
                <div class="quiz-prompt">${q.display_char || q.question || q.prompt || ''}</div>

                <div class="quiz-options-grid">
                    ${q.options.map(opt => `
                        <button class="quiz-option-btn" onclick="selectPracticeAnswer(this, '${escapeAttr(opt)}')">
                            ${opt}
                        </button>
                    `).join('')}
                </div>

                <div id="quiz-feedback" class="quiz-feedback" style="display:none"></div>

                <div class="quiz-footer-actions" id="quiz-next-actions" style="display:none;margin-top:20px;text-align:right">
                    <button class="btn-primary" onclick="nextPracticeQuestion()">
                        Pertanyaan Selanjutnya ${icon('arrowRight', 14)}
                    </button>
                </div>
            </div>
        </div>
    `;
    quizState.answered = false;
}

async function selectPracticeAnswer(btn, userAnswer) {
    if (quizState.answered) return;
    quizState.answered = true;

    const q = quizState.questions[quizState.currentIndex];
    const allBtns = document.querySelectorAll('.quiz-option-btn');
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = userAnswer.trim().toLowerCase() === (q.correct_answer || '').trim().toLowerCase();

    const feedback = document.getElementById('quiz-feedback');
    const nextActions = document.getElementById('quiz-next-actions');

    if (isCorrect) {
        btn.classList.add('correct');
        quizState.totalCorrect++;
        if (typeof addXP === 'function') addXP(15);
        if (typeof playSuccessSound === 'function') playSuccessSound();
        feedback.className = 'quiz-feedback correct';
        feedback.innerHTML = `<strong>Tepat Sekali!</strong> Jawaban Anda benar (+15 XP).`;
    } else {
        btn.classList.add('wrong');
        if (typeof playErrorSound === 'function') playErrorSound();
        allBtns.forEach(b => {
            if (b.textContent.trim().toLowerCase() === (q.correct_answer || '').trim().toLowerCase()) {
                b.classList.add('correct');
            }
        });
        feedback.className = 'quiz-feedback wrong';
        feedback.innerHTML = `<strong>Kurang Tepat.</strong> Jawaban yang benar adalah: <strong>${q.correct_answer}</strong>`;
    }

    feedback.style.display = 'block';
    if (nextActions) nextActions.style.display = 'block';
}

function nextPracticeQuestion() {
    if (quizState.currentIndex < quizState.questions.length - 1) {
        quizState.currentIndex++;
        renderPracticeQuizQuestion();
    } else {
        renderPracticeResults();
    }
}

function renderPracticeResults() {
    const container = document.getElementById('content');
    if (!container) return;

    const total = quizState.questions.length;
    const percent = Math.round((quizState.totalCorrect / total) * 100);

    container.innerHTML = `
        <div class="quiz-scorecard">
            <h2>Latihan Selesai!</h2>
            <div class="score-display">
                <div class="score-number">${quizState.totalCorrect} / ${total}</div>
                <div class="score-percent">${percent}% Benar</div>
            </div>
            <div style="margin-top:24px;display:flex;gap:12px;justify-content:center">
                <button class="btn-primary" onclick="renderQuizSetup(document.getElementById('content'), 'practice')">
                    ${icon('play', 15)} Latihan Lagi
                </button>
                <button class="btn-secondary" onclick="renderQuizSetup(document.getElementById('content'), 'exam')">
                    ${icon('target', 15)} Ikuti Simulasi Resmi JLPT
                </button>
            </div>
        </div>
    `;
}

function escapeAttr(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}


// =======================================================
// 8. HARDCORE BOSS BATTLE QUIZ MODE (SUDDEN DEATH • 死線)
// Kurikulum Gabungan JLPT N5 • N4 • N3
// 1 Kesalahan = Game Over & Skor Reset ke 0!
// Data dimuat dari src/data/hardcore_questions.js
// =======================================================

let hardcoreState = {
    questions: [],
    currentIndex: 0,
    currentStreak: 0,
    highScore: 0,
    answered: false
};

function getHardcoreHighScore() {
    return parseInt(localStorage.getItem('kamui_hardcore_highscore') || '0', 10);
}

function setHardcoreHighScore(score) {
    localStorage.setItem('kamui_hardcore_highscore', score.toString());
}

function renderHardcoreSetup() {
    const highScore = getHardcoreHighScore();
    const totalBank = (window.HARDCORE_QUESTIONS_DATA && window.HARDCORE_QUESTIONS_DATA.length) || 95;

    return `
        <div class="exam-hero-card" style="border-color: rgba(248, 81, 73, 0.4); background: linear-gradient(135deg, rgba(248, 81, 73, 0.08), rgba(0, 0, 0, 0.4));">
            <div class="exam-hero-header">
                <div>
                    <span class="gh-tab-badge" style="background:#da3633;color:#fff;margin-bottom:8px">
                        ${icon('skull', 12)} SUDDEN DEATH • 死線モード
                    </span>
                    <h2 style="font-size:22px;margin-bottom:6px;color:var(--text-primary)">Tantangan Boss Hardcore (Sudden Death)</h2>
                    <p style="color:var(--text-secondary);font-size:13.5px;max-width:650px;line-height:1.6">
                        Ujian ketahanan mental paling ekstrem! Soal acak tanpa henti menguji seluruh materi <strong>JLPT N5, N4, dan N3</strong>. 
                        <strong>Satu kesalahan saja membuat Anda langsung gugur dan skor kembali ke 0.</strong>
                    </p>
                </div>
                <div class="exam-badge-icon" style="background:rgba(248,81,73,0.15);color:#ff7b72;border-color:rgba(248,81,73,0.3)">
                    ${icon('swords', 42)}
                </div>
            </div>

            <div class="hardcore-stats-bar" style="display:flex;gap:16px;margin:20px 0;flex-wrap:wrap">
                <div class="exam-info-card" style="flex:1;min-width:180px">
                    <span class="info-label">${icon('award', 14)} Rekor Tertinggi Anda</span>
                    <span class="info-val" style="color:#f1e05a;font-size:24px;font-weight:800">${highScore} <small style="font-size:13px;font-weight:400;color:var(--text-muted)">Soal Beruntun</small></span>
                </div>
                <div class="exam-info-card" style="flex:1;min-width:180px">
                    <span class="info-label">${icon('database', 14)} Bank Soal Tersedia</span>
                    <span class="info-val" style="color:var(--accent-secondary);font-size:24px;font-weight:800">${totalBank} <small style="font-size:13px;font-weight:400;color:var(--text-muted)">Soal di Folder Data</small></span>
                </div>
                <div class="exam-info-card" style="flex:1;min-width:180px">
                    <span class="info-label">${icon('alertTriangle', 14)} Batas Toleransi</span>
                    <span class="info-val" style="color:#ff7b72;font-size:24px;font-weight:800">0 Kesalahan <small style="font-size:13px;font-weight:400;color:var(--text-muted)">(1 Salah = Kalah)</small></span>
                </div>
            </div>

            <div class="exam-rules-list">
                <div class="rule-item">
                    <span class="rule-num">1</span>
                    <div>
                        <strong>Format Permainan Terbuka & Tanpa Ampun</strong>
                        <p>Setiap jawaban benar bernilai +1 skor streak dan +25 XP. Rekor skor tertinggi Anda dicatat secara otomatis.</p>
                    </div>
                </div>
                <div class="rule-item">
                    <span class="rule-num">2</span>
                    <div>
                        <strong>Bank Soal Mandiri & Dinamis</strong>
                        <p>Soal dimuat dari <code>src/data/hardcore_questions.js</code>. Anda dapat menambahkan soal baru kapan saja.</p>
                    </div>
                </div>
                <div class="rule-item">
                    <span class="rule-num">3</span>
                    <div>
                        <strong>Tingkat Kesulitan Beragam (N5, N4, N3)</strong>
                        <p>Kombinasi acak kosakata kerja, kanji kompleks, partikel jebakan, dan pola tata bahasa.</p>
                    </div>
                </div>
            </div>

            <div style="margin-top:24px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
                <button class="btn-primary" style="background:#da3633;border-color:#f85149;padding:12px 24px;font-size:15px;font-weight:700" onclick="startHardcoreMode()">
                    ${icon('swords', 16)} Mulai Tantangan Boss Hardcore
                </button>
                <button class="btn-secondary" onclick="renderQuizSetup(document.getElementById('content'), 'exam')">
                    ${icon('arrowLeft', 14)} Kembali ke Simulasi Biasa
                </button>
            </div>
        </div>
    `;
}

function startHardcoreMode() {
    const rawBank = window.HARDCORE_QUESTIONS_DATA || [];
    if (!rawBank || rawBank.length === 0) {
        showToast('Bank soal hardcore belum siap atau file data tidak ditemukan.', 'warning');
        return;
    }

    const shuffled = [...rawBank].sort(() => Math.random() - 0.5);

    hardcoreState = {
        questions: shuffled,
        currentIndex: 0,
        currentStreak: 0,
        highScore: getHardcoreHighScore(),
        answered: false
    };

    renderHardcoreQuestion();
}

function renderHardcoreQuestion() {
    const container = document.getElementById('content');
    if (!container) return;

    if (hardcoreState.currentIndex >= hardcoreState.questions.length) {
        renderHardcoreVictory();
        return;
    }

    const q = hardcoreState.questions[hardcoreState.currentIndex];
    const streak = hardcoreState.currentStreak;
    const highScore = hardcoreState.highScore;

    container.innerHTML = `
        <div class="page-header" style="border-bottom-color:rgba(248,81,73,0.3)">
            <div class="page-header-text">
                <h1>
                    <span class="header-icon" style="background:rgba(248,81,73,0.2);color:#ff7b72">${icon('skull', 22)}</span> 
                    Mode Hardcore: Boss Battle (死線)
                </h1>
                <div class="header-subtitle">
                    Streak Saat Ini: <strong style="color:#f1e05a;font-size:15px">${streak}</strong> | 
                    Rekor Tertinggi: <strong style="color:var(--accent-secondary);font-size:15px">${highScore}</strong> | 
                    Tingkat: <span class="gh-tab-badge" style="background:#da3633;color:#fff">${q.level || 'N5-N3'}</span>
                </div>
            </div>
            <div class="page-header-actions">
                <button class="btn-secondary" onclick="renderQuizSetup(document.getElementById('content'), 'hardcore')" title="Menyerah & Keluar">
                    ${icon('x', 14)} Keluar
                </button>
            </div>
        </div>

        <div class="quiz-container">
            <div class="quiz-card" style="border:1px solid rgba(248,81,73,0.35);box-shadow: 0 8px 32px rgba(248,81,73,0.15)">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
                    <span class="gh-tab-badge" style="background:rgba(248,81,73,0.2);color:#ff7b72;border:1px solid rgba(248,81,73,0.4)">
                        ${icon('target', 12)} Kategori: ${q.category || 'Materi JLPT'}
                    </span>
                    <span style="font-size:12px;color:var(--text-muted);font-weight:600">
                        Tantangan #${hardcoreState.currentIndex + 1}
                    </span>
                </div>

                <div class="quiz-prompt-type" style="font-size:16px;color:var(--text-primary);font-weight:600;margin-bottom:12px">
                    ${q.question}
                </div>

                ${q.display ? `
                    <div class="quiz-prompt" style="font-size:36px;color:var(--text-primary);padding:18px;margin-bottom:20px;letter-spacing:1px;font-family:'Noto Sans JP', sans-serif">
                        ${q.display}
                    </div>
                ` : ''}

                ${(() => {
                    if (!q._shuffled) {
                        const correctText = q.options[q.correct];
                        const opts = [...q.options].sort(() => Math.random() - 0.5);
                        q._shuffled = {
                            options: opts,
                            correctIndex: opts.indexOf(correctText)
                        };
                    }
                    return '';
                })()}
                <div class="quiz-options-grid">
                    ${q._shuffled.options.map((opt, idx) => `
                        <button class="quiz-option-btn" onclick="selectHardcoreAnswer(${idx}, this)">
                            <span style="opacity:0.6;margin-right:8px;font-weight:700">${['A', 'B', 'C', 'D'][idx]}.</span> ${opt}
                        </button>
                    `).join('')}
                </div>

                <div id="hardcore-feedback" class="quiz-feedback" style="display:none"></div>
            </div>
        </div>
    `;

    hardcoreState.answered = false;
}

function selectHardcoreAnswer(selectedIdx, btn) {
    if (hardcoreState.answered) return;
    hardcoreState.answered = true;

    const q = hardcoreState.questions[hardcoreState.currentIndex];
    const correctIdx = q._shuffled ? q._shuffled.correctIndex : q.correct;
    const isCorrect = selectedIdx === correctIdx;

    const allBtns = document.querySelectorAll('.quiz-option-btn');
    allBtns.forEach(b => b.disabled = true);

    const feedback = document.getElementById('hardcore-feedback');

    if (isCorrect) {
        btn.classList.add('correct');
        hardcoreState.currentStreak++;
        if (typeof addXP === 'function') addXP(25);
        if (typeof playSuccessSound === 'function') playSuccessSound();

        if (hardcoreState.currentStreak > hardcoreState.highScore) {
            hardcoreState.highScore = hardcoreState.currentStreak;
            setHardcoreHighScore(hardcoreState.highScore);
        }

        if (feedback) {
            feedback.className = 'quiz-feedback correct';
            feedback.innerHTML = `
                <div style="display:flex;align-items:center;gap:8px">
                    ${icon('checkCircle', 18)}
                    <div>
                        <strong>Tepat Sekali! (+25 XP)</strong>
                        <div style="font-size:12.5px;margin-top:2px;opacity:0.9">${q.exp || 'Jawaban Anda benar.'}</div>
                    </div>
                </div>
            `;
            feedback.style.display = 'block';
        }

        setTimeout(() => {
            hardcoreState.currentIndex++;
            renderHardcoreQuestion();
        }, 1200);

    } else {
        btn.classList.add('incorrect');
        if (allBtns[correctIdx]) {
            allBtns[correctIdx].classList.add('correct');
        }

        if (typeof playErrorSound === 'function') playErrorSound();

        if (feedback) {
            feedback.className = 'quiz-feedback incorrect';
            feedback.innerHTML = `
                <div style="display:flex;align-items:center;gap:8px">
                    ${icon('alertTriangle', 18)}
                    <div>
                        <strong>Jawaban Salah! Game Over!</strong>
                        <div style="font-size:12.5px;margin-top:2px;opacity:0.9">${q.exp || ('Jawaban benar: ' + q.options[q.correct])}</div>
                    </div>
                </div>
            `;
            feedback.style.display = 'block';
        }

        setTimeout(() => {
            renderHardcoreGameOver(hardcoreState.currentStreak, q);
        }, 1500);
    }
}

function renderHardcoreGameOver(finalStreak, failedQuestion) {
    const container = document.getElementById('content');
    if (!container) return;

    const isNewRecord = finalStreak > 0 && finalStreak >= hardcoreState.highScore;

    container.innerHTML = `
        <div class="quiz-scorecard" style="border: 1px solid rgba(248,81,73,0.4); background: linear-gradient(135deg, rgba(248,81,73,0.12), rgba(13,17,23,0.95));">
            <div style="font-size:48px;color:#ff7b72;margin-bottom:10px">
                ${icon('skull', 56)}
            </div>
            <h2 style="font-size:26px;color:#ff7b72;margin-bottom:6px">GAME OVER! (死線終結)</h2>
            <p style="color:var(--text-secondary);font-size:14px;max-width:540px;margin:0 auto 20px;line-height:1.6">
                Satu langkah salah mengakhiri perjuangan Anda. Skor telah direset kembali ke 0.
            </p>

            ${isNewRecord ? `
                <div style="display:inline-block;padding:6px 14px;background:#f1e05a;color:#000;border-radius:20px;font-weight:800;font-size:13px;margin-bottom:16px">
                    ${icon('award', 14)} REKOR TERTINGGI BARU!
                </div>
            ` : ''}

            <div class="score-display" style="border-color:rgba(248,81,73,0.3)">
                <div class="score-number" style="color:#ff7b72">${finalStreak}</div>
                <div class="score-percent">Soal Berhasil Dijawab Beruntun</div>
            </div>

            <div style="margin:20px 0;padding:14px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid var(--border-subtle);max-width:500px;margin-left:auto;margin-right:auto;text-align:left">
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Pertanyaan Terakhir Yang Gagal:</div>
                <div style="font-size:13px;color:var(--text-primary);font-weight:600">${failedQuestion.question}</div>
                <div style="font-size:12px;color:var(--accent-hover);margin-top:4px">Kunci: ${failedQuestion._shuffled ? failedQuestion._shuffled.options[failedQuestion._shuffled.correctIndex] : failedQuestion.options[failedQuestion.correct]}</div>
            </div>

            <p style="font-style:italic;color:var(--text-muted);font-size:13px;margin:16px 0">
                「七転び八起き」(Nana korobi ya oki) — Jatuh tujuh kali, bangkit delapan kali!
            </p>

            <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
                <button class="btn-primary" style="background:#da3633;border-color:#f85149;padding:12px 22px" onclick="startHardcoreMode()">
                    ${icon('refreshCw', 15)} Coba Lagi Dari Awal
                </button>
                <button class="btn-secondary" onclick="renderQuizSetup(document.getElementById('content'), 'hardcore')">
                    ${icon('arrowLeft', 15)} Kembali ke Menu Hardcore
                </button>
            </div>
        </div>
    `;
}

function renderHardcoreVictory() {
    const container = document.getElementById('content');
    if (!container) return;

    container.innerHTML = `
        <div class="quiz-scorecard" style="border: 1px solid rgba(56, 139, 253, 0.4); background: linear-gradient(135deg, rgba(56, 139, 253, 0.12), rgba(13,17,23,0.95));">
            <div style="font-size:48px;color:#f1e05a;margin-bottom:10px">
                ${icon('award', 56)}
            </div>
            <h2 style="font-size:26px;color:#f1e05a;margin-bottom:6px">PENAKLUK SEJATI! (完全制覇)</h2>
            <p style="color:var(--text-secondary);font-size:14px;max-width:540px;margin:0 auto 20px;line-height:1.6">
                Luar biasa! Anda berhasil menuntaskan seluruh ${hardcoreState.questions.length} soal dalam bank data Hardcore tanpa ada satupun kesalahan!
            </p>
            <div class="score-display">
                <div class="score-number">${hardcoreState.currentStreak}</div>
                <div class="score-percent">Skor Sempurna Tanpa Pernah Gugur</div>
            </div>
            <div style="margin-top:24px;display:flex;gap:12px;justify-content:center">
                <button class="btn-primary" onclick="startHardcoreMode()">
                    ${icon('refreshCw', 15)} Tantang Sekali Lagi
                </button>
                <button class="btn-secondary" onclick="renderQuizSetup(document.getElementById('content'), 'exam')">
                    ${icon('arrowLeft', 15)} Ke Menu Utama
                </button>
            </div>
        </div>
    `;
}

window.renderHardcoreSetup = renderHardcoreSetup;
window.startHardcoreMode = startHardcoreMode;
window.selectHardcoreAnswer = selectHardcoreAnswer;
