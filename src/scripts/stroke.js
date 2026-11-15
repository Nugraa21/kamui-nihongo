// ========================================
// NihonGo! Stroke Order & Calligraphy Practice Pad
// Tata Cara Penulisan Huruf Jepang (書き順)
// Visual Step-by-Step Gallery with Start Pins & Direction Arrows
// ========================================

// Exact SVG stroke coordinates and start points for Hiragana, Katakana & Key Kanji
const STROKE_VECTORS = {
    // === Vowels ===
    "あ": [
        { d: "M 22 36 Q 50 34 78 32", start: [22, 36], dir: "➔ Kiri ke Kanan", desc: "Garis horizontal mendatar agak naik" },
        { d: "M 50 16 Q 48 45 44 84", start: [50, 16], dir: "⬇ Atas ke Bawah", desc: "Garis vertikal melengkung memotong di tengah" },
        { d: "M 38 48 C 18 64 24 88 52 86 C 82 84 86 52 64 48 C 45 44 38 60 48 78", start: [38, 48], dir: "⤴ Melingkar Memutar", desc: "Garis melingkar memutar lebar ke kanan bawah" }
    ],
    "い": [
        { d: "M 32 24 C 28 50 30 72 38 78 Q 42 76 46 68", start: [32, 24], dir: "⬇ Lengkung Kait", desc: "Garis lengkung kiri berujung kait ke kanan atas" },
        { d: "M 68 35 C 72 52 70 65 66 70", start: [68, 35], dir: "⬇ Pendek Kanan", desc: "Garis lengkung pendek sisi kanan" }
    ],
    "う": [
        { d: "M 42 22 Q 52 26 58 30", start: [42, 22], dir: "● Titik Atas", desc: "Titik garis miring pendek di bagian atas" },
        { d: "M 36 44 C 58 36 78 44 74 65 C 70 82 50 84 38 78", start: [36, 44], dir: "⤴ Lengkung Membulat", desc: "Garis lengkung besar membulat ke kanan bawah" }
    ],
    "え": [
        { d: "M 44 20 Q 52 24 58 28", start: [44, 20], dir: "● Titik Atas", desc: "Titik pendek miring ke bawah di bagian atas" },
        { d: "M 30 46 L 68 44 L 38 72 Q 56 62 76 78", start: [30, 46], dir: "⤵ Berkelok Zigzag", desc: "Garis kontinu datar, miring kiri bawah, lalu meliuk" }
    ],
    "お": [
        { d: "M 22 38 L 58 36", start: [22, 38], dir: "➔ Kiri ke Kanan", desc: "Garis horizontal pendek" },
        { d: "M 44 20 L 44 64 C 44 82 26 78 28 66 C 30 54 58 52 74 74", start: [44, 20], dir: "⬇ Vertikal & Simpul", desc: "Garis vertikal turun membentuk lingkaran bawah" },
        { d: "M 68 30 Q 76 38 78 44", start: [68, 30], dir: "● Titik Kanan Atas", desc: "Titik miring di sebelah kanan atas" }
    ],

    // === K-row ===
    "か": [
        { d: "M 30 36 C 58 34 68 40 64 62 Q 62 70 56 66", start: [30, 36], dir: "⤵ Siku Berkait", desc: "Garis siku melengkung berkait" },
        { d: "M 46 22 C 40 46 32 70 25 82", start: [46, 22], dir: "↙ Serong Memotong", desc: "Garis miring melengkung di sisi kiri" },
        { d: "M 70 28 Q 78 34 82 40", start: [70, 28], dir: "● Titik Aksen", desc: "Titik aksen di kanan atas" }
    ],
    "き": [
        { d: "M 30 34 L 70 30", start: [30, 34], dir: "➔ Datar Atas", desc: "Garis horizontal atas agak naik" },
        { d: "M 26 48 L 74 44", start: [26, 48], dir: "➔ Datar Bawah", desc: "Garis horizontal kedua sejajar" },
        { d: "M 54 20 L 42 66 Q 38 70 34 66", start: [54, 20], dir: "↙ Miring Berkait", desc: "Garis miring memotong berujung kait" },
        { d: "M 34 76 C 48 84 66 82 68 70", start: [34, 76], dir: "⤴ Lengkung Dasar", desc: "Lengkungan bawah melingkar dari kiri ke kanan" }
    ],
    "く": [
        { d: "M 64 25 L 34 50 L 66 75", start: [64, 25], dir: "⤵ Sudut Lancip", desc: "Satu goresan siku lancip miring kiri lalu kanan" }
    ],
    "け": [
        { d: "M 30 22 C 26 50 28 72 32 80 Q 36 78 40 70", start: [30, 22], dir: "⬇ Vertikal Kait", desc: "Garis vertikal kiri melengkung berkait" },
        { d: "M 52 38 L 80 34", start: [52, 38], dir: "➔ Datar Kanan", desc: "Garis horizontal pendek di kanan" },
        { d: "M 68 22 C 68 48 66 72 64 84", start: [68, 22], dir: "⬇ Vertikal Lurus", desc: "Garis vertikal kanan menembus garis mendatar" }
    ],
    "こ": [
        { d: "M 32 34 C 48 30 64 30 72 34 Q 70 40 64 38", start: [32, 34], dir: "➔ Garis Atas Kait", desc: "Garis horizontal atas berujung kaitan kecil" },
        { d: "M 30 68 C 45 74 65 74 74 68", start: [30, 68], dir: "➔ Garis Bawah", desc: "Garis lengkung mendatar di bagian bawah" }
    ],

    // === S-row ===
    "さ": [
        { d: "M 28 38 L 72 34", start: [28, 38], dir: "➔ Datar Atas", desc: "Garis horizontal dari kiri ke kanan" },
        { d: "M 56 22 L 44 68 Q 40 72 34 68", start: [56, 22], dir: "↙ Miring Kait", desc: "Garis miring memotong berujung kaitan" },
        { d: "M 36 76 C 52 84 68 80 66 68", start: [36, 76], dir: "⤴ Lengkung Bawah", desc: "Lengkungan membulat di bagian bawah" }
    ],
    "し": [
        { d: "M 40 22 C 40 60 42 78 58 78 C 70 78 74 68 76 58", start: [40, 22], dir: "⬇ Kail Ikan", desc: "Garis vertikal melengkung membulat ke kanan atas" }
    ],
    "す": [
        { d: "M 25 38 L 78 36", start: [25, 38], dir: "➔ Kiri ke Kanan", desc: "Garis horizontal dari kiri ke kanan" },
        { d: "M 52 18 L 52 50 C 52 64 36 62 36 50 C 36 38 60 40 60 62 C 60 76 52 82 46 86", start: [52, 18], dir: "⬇ Simpul Lingkaran", desc: "Garis vertikal turun, membentuk simpul lingkaran" }
    ],
    "せ": [
        { d: "M 24 42 L 76 38", start: [24, 42], dir: "➔ Datar Panjang", desc: "Garis mendatar memotong melintasi" },
        { d: "M 64 24 L 64 68 C 64 78 58 78 52 76", start: [64, 24], dir: "⬇ Vertikal Kait Kanan", desc: "Garis vertikal kanan berujung kait ke kiri" },
        { d: "M 38 28 L 38 72 L 68 72", start: [38, 28], dir: "⤵ Siku Bawah", desc: "Garis vertikal kiri berbelok mendatar ke kanan" }
    ],
    "そ": [
        { d: "M 35 28 L 65 28 L 35 52 C 55 46 75 52 72 70 C 68 84 48 84 38 78", start: [35, 28], dir: "⤵ Zigzag Lengkung", desc: "Satu goresan zigzag berlanjut lengkungan membulat" }
    ],

    // === T-row ===
    "た": [
        { d: "M 25 36 L 52 34", start: [25, 36], dir: "➔ Datar Kiri", desc: "Garis horizontal mendatar" },
        { d: "M 38 22 C 34 46 30 68 24 78", start: [38, 22], dir: "↙ Miring Kiri", desc: "Garis miring memotong ke kiri bawah" },
        { d: "M 52 46 L 76 44", start: [52, 46], dir: "➔ Datar Kanan Atas", desc: "Garis horizontal kecil di kanan atas" },
        { d: "M 50 64 C 60 68 72 68 76 62", start: [50, 64], dir: "➔ Lengkung Kanan Bawah", desc: "Garis lengkung kecil di kanan bawah" }
    ],
    "ち": [
        { d: "M 35 28 L 68 24", start: [35, 28], dir: "➔ Datar Atas", desc: "Garis horizontal pendek agak naik" },
        { d: "M 50 20 L 30 52 L 56 50 C 74 50 78 72 62 82 C 48 90 35 80 32 74", start: [50, 20], dir: "⤵ Miring & Membulat", desc: "Garis miring ke bawah lalu melingkar membentuk perut bulat" }
    ],
    "つ": [
        { d: "M 30 38 C 55 30 78 35 74 58 C 70 78 50 82 35 82", start: [30, 38], dir: "⤴ Gelombang Melengkung", desc: "Satu goresan kurva besar melengkung menyerupai gelombang" }
    ],
    "て": [
        { d: "M 28 34 L 72 32 C 62 48 42 66 45 76 C 48 84 62 84 72 78", start: [28, 34], dir: "⤵ Datar & Lengkung", desc: "Garis mendatar lalu melipat melengkung membulat" }
    ],
    "と": [
        { d: "M 42 22 L 54 48", start: [42, 22], dir: "↘ Miring Pendek", desc: "Garis miring pendek ke kanan bawah" },
        { d: "M 64 36 C 42 48 36 68 48 80 C 60 90 76 80 78 70", start: [64, 36], dir: "⤴ Kurva Membulat", desc: "Kurva besar melengkung dari atas ke bawah" }
    ],

    // === N-row & Others ===
    "な": [
        { d: "M 26 38 L 48 36", start: [26, 38], dir: "➔ Datar Kiri", desc: "Garis horizontal pendek" },
        { d: "M 38 24 C 36 46 34 68 28 78", start: [38, 24], dir: "↙ Miring Memotong", desc: "Garis miring memotong garis pertama" },
        { d: "M 56 34 Q 62 40 66 44", start: [56, 34], dir: "● Titik Kanan", desc: "Titik aksen pendek di kanan atas" },
        { d: "M 64 54 C 64 74 48 76 52 64 C 54 54 72 58 74 76", start: [64, 54], dir: "⬇ Simpul Bawah", desc: "Garis vertikal meliuk membentuk simpul bulat" }
    ],
    "に": [
        { d: "M 30 22 C 28 50 30 74 34 82 Q 38 80 42 72", start: [30, 22], dir: "⬇ Vertikal Kait", desc: "Garis vertikal kiri melengkung berkait" },
        { d: "M 52 38 L 78 36", start: [52, 38], dir: "➔ Datar Atas", desc: "Garis horizontal kanan atas" },
        { d: "M 50 68 C 62 72 76 72 80 66", start: [50, 68], dir: "➔ Lengkung Bawah", desc: "Garis lengkung kanan bawah" }
    ],
    "の": [
        { d: "M 54 28 L 42 56 C 35 72 45 84 60 82 C 78 80 82 56 68 42 C 55 30 35 45 32 64", start: [54, 28], dir: "⤴ Spiral Memutar", desc: "Satu goresan spiral dari tengah memutar penuh ke luar" }
    ],
    "は": [
        { d: "M 28 22 C 26 50 28 74 32 82 Q 36 80 40 72", start: [28, 22], dir: "⬇ Vertikal Kait", desc: "Garis vertikal kiri melengkung berkait" },
        { d: "M 48 38 L 76 36", start: [48, 38], dir: "➔ Datar Tengah", desc: "Garis mendatar di sisi kanan" },
        { d: "M 64 22 L 64 64 C 64 80 48 80 50 68 C 52 56 72 60 76 74", start: [64, 22], dir: "⬇ Vertikal & Simpul", desc: "Garis vertikal melipat simpul di kanan bawah" }
    ],
    "ま": [
        { d: "M 28 34 L 72 32", start: [28, 34], dir: "➔ Datar Atas", desc: "Garis mendatar pertama" },
        { d: "M 26 50 L 74 48", start: [26, 50], dir: "➔ Datar Kedua", desc: "Garis mendatar kedua sejajar" },
        { d: "M 52 20 L 52 66 C 52 82 38 80 40 68 C 42 58 64 62 68 76", start: [52, 20], dir: "⬇ Simpul Bawah", desc: "Garis vertikal memotong lalu bersimpul bulat" }
    ],
    "ん": [
        { d: "M 38 24 L 28 72 C 38 52 55 50 62 64 C 70 78 76 80 80 76", start: [38, 24], dir: "⤵ Miring & Gelombang", desc: "Garis miring turun lalu meliuk naik ke kanan atas" }
    ],

    // === Basic Kanji ===
    "一": [
        { d: "M 20 50 L 80 50", start: [20, 50], dir: "➔ Kiri ke Kanan", desc: "Garis horizontal mendatar seimbang" }
    ],
    "二": [
        { d: "M 28 38 L 72 38", start: [28, 38], dir: "➔ Datar Atas", desc: "Garis horizontal atas lebih pendek" },
        { d: "M 18 64 L 82 64", start: [18, 64], dir: "➔ Datar Bawah", desc: "Garis horizontal bawah lebih panjang" }
    ],
    "三": [
        { d: "M 26 30 L 74 30", start: [26, 30], dir: "➔ Datar Atas", desc: "Garis horizontal atas sedang" },
        { d: "M 32 50 L 68 50", start: [32, 50], dir: "➔ Datar Tengah", desc: "Garis horizontal tengah paling pendek" },
        { d: "M 18 72 L 82 72", start: [18, 72], dir: "➔ Datar Dasar", desc: "Garis horizontal penopang paling panjang" }
    ],
    "十": [
        { d: "M 20 48 L 80 48", start: [20, 48], dir: "➔ Datar Dahulu", desc: "Garis mendatar ditarik pertama" },
        { d: "M 50 18 L 50 82", start: [50, 18], dir: "⬇ Vertikal Memotong", desc: "Garis vertikal memotong tepat di tengah" }
    ],
    "日": [
        { d: "M 28 22 L 28 80", start: [28, 22], dir: "⬇ Sisi Kiri", desc: "Tarik garis vertikal sisi kiri" },
        { d: "M 28 22 L 72 22 L 72 80", start: [28, 22], dir: "⤵ Bingkai Atas & Kanan", desc: "Garis mendatar lalu menekuk turun ke bawah" },
        { d: "M 28 50 L 72 50", start: [28, 50], dir: "➔ Penyekat Tengah", desc: "Garis horizontal membagi ruang di dalam kotak" },
        { d: "M 28 80 L 72 80", start: [28, 80], dir: "➔ Penutup Bawah", desc: "Tutup garis dasar kotak paling terakhir" }
    ],
    "月": [
        { d: "M 30 20 L 26 84", start: [30, 20], dir: "⬇ Vertikal Kiri", desc: "Garis vertikal melengkung sisi kiri" },
        { d: "M 30 20 L 72 20 L 72 84 Q 68 84 62 80", start: [30, 20], dir: "⤵ Bingkai Siku Berkait", desc: "Garis mendatar lalu turun berujung kait ke dalam" },
        { d: "M 30 42 L 72 42", start: [30, 42], dir: "➔ Garis Dalam Atas", desc: "Garis horizontal bagian dalam atas" },
        { d: "M 29 62 L 72 62", start: [29, 62], dir: "➔ Garis Dalam Bawah", desc: "Garis horizontal bagian dalam bawah" }
    ],
    "木": [
        { d: "M 20 42 L 80 42", start: [20, 42], dir: "➔ Garis Datar", desc: "Garis horizontal ditarik melintang" },
        { d: "M 50 18 L 50 82", start: [50, 18], dir: "⬇ Batang Utama", desc: "Garis vertikal menembus garis mendatar" },
        { d: "M 50 42 L 22 78", start: [50, 42], dir: "↙ Cabang Kiri", desc: "Garis miring diagonal ke kiri bawah" },
        { d: "M 50 42 L 78 78", start: [50, 42], dir: "↘ Cabang Kanan", desc: "Garis miring diagonal ke kanan bawah" }
    ],
    "人": [
        { d: "M 50 20 C 44 48 34 72 20 84", start: [50, 20], dir: "↙ Kaki Kiri", desc: "Garis miring melengkung menyapu ke kiri bawah" },
        { d: "M 44 45 C 56 64 68 76 82 84", start: [44, 45], dir: "↘ Kaki Kanan", desc: "Garis miring bertumpu menyapu ke kanan bawah" }
    ],
    "山": [
        { d: "M 50 20 L 50 78", start: [50, 20], dir: "⬇ Tiang Tengah", desc: "Tiang tengah simetris ditarik pertama" },
        { d: "M 24 45 L 24 78 L 76 78", start: [24, 45], dir: "⤵ Sisi Kiri & Dasar", desc: "Garis vertikal kiri berbelok mendatar menyambung dasar" },
        { d: "M 76 45 L 76 78", start: [76, 45], dir: "⬇ Sisi Kanan", desc: "Garis vertikal sisi kanan menutup bentuk gunung" }
    ]
};

// Procedural generator for any character not present in explicit vector map
function getOrCreateStrokeVectors(char, strokeCount, strokeSteps) {
    if (STROKE_VECTORS[char]) {
        return STROKE_VECTORS[char];
    }

    const count = Math.max(1, strokeCount || (strokeSteps ? strokeSteps.length : 1));
    const generated = [];

    for (let i = 0; i < count; i++) {
        const stepText = (strokeSteps && strokeSteps[i]) ? strokeSteps[i].toLowerCase() : '';
        let d = "";
        let start = [25, 25];
        let dir = "➔ Goresan " + (i + 1);
        let desc = (strokeSteps && strokeSteps[i]) ? strokeSteps[i].replace(/^\d+\.\s*/, '') : `Goresan ke-${i + 1}`;

        // Heuristics based on text descriptions
        if (stepText.includes('horizontal') || stepText.includes('mendatar') || stepText.includes('kiri ke kanan')) {
            const y = 30 + Math.floor((i / count) * 45);
            start = [20, y];
            d = `M 20 ${y} L 80 ${y}`;
            dir = "➔ Kiri ke Kanan";
        } else if (stepText.includes('vertikal') || stepText.includes('tegak') || stepText.includes('atas ke bawah')) {
            const x = 30 + Math.floor((i / count) * 40);
            start = [x, 20];
            d = `M ${x} 20 L ${x} 80`;
            dir = "⬇ Atas ke Bawah";
        } else if (stepText.includes('menekuk') || stepText.includes('sudut') || stepText.includes('siku') || stepText.includes('kait')) {
            start = [25, 30];
            d = "M 25 30 L 75 30 L 75 75";
            dir = "⤵ Menekuk Sudut";
        } else if (stepText.includes('melingkar') || stepText.includes('simpul') || stepText.includes('lingkaran')) {
            start = [40, 45];
            d = "M 40 45 C 20 65 30 85 55 82 C 78 80 80 55 60 50 C 45 45 40 65 48 78";
            dir = "⤴ Melingkar Memutar";
        } else if (stepText.includes('kiri') || stepText.includes('serong kiri')) {
            start = [55, 25];
            d = "M 55 25 C 45 50 35 70 20 82";
            dir = "↙ Serong Kiri";
        } else if (stepText.includes('kanan') || stepText.includes('serong kanan')) {
            start = [45, 35];
            d = "M 45 35 C 55 55 68 72 82 82";
            dir = "↘ Serong Kanan";
        } else if (stepText.includes('titik') || stepText.includes('ten')) {
            start = [65, 30];
            d = "M 65 30 Q 72 36 76 40";
            dir = "● Titik Aksen";
        } else {
            // General geometric progression
            const y = 25 + Math.floor((i / count) * 50);
            start = [25, y];
            d = `M 25 ${y} L 75 ${y}`;
            dir = "➔ Arah Goresan";
        }

        generated.push({ d, start, dir, desc });
    }

    return generated;
}

// Generate the visual sequence cards HTML (Matching the user's uploaded screenshot)
function generateVisualStrokeGalleryHtml(character, strokeCount, strokeSteps) {
    const strokes = getOrCreateStrokeVectors(character, strokeCount, strokeSteps);
    const charId = 'stk_' + Math.random().toString(36).substring(2, 8);

    // Card 0: Overview (all strokes in faint white/grey with numbered start pins)
    const overviewSvg = `
        <svg viewBox="0 0 100 100" class="stroke-box-svg">
            <line x1="50" y1="6" x2="50" y2="94" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
            <line x1="6" y1="50" x2="94" y2="50" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
            ${strokes.map(s => `
                <path d="${s.d}" fill="none" stroke="#e6edf3" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
            `).join('')}
            ${strokes.map((s, idx) => `
                <g class="stroke-start-pin" transform="translate(${s.start[0]}, ${s.start[1]})">
                    <circle cx="0" cy="0" r="7.5" fill="#ff5252" stroke="#ffffff" stroke-width="1.5" />
                    <text x="0" y="3" font-size="8.5" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="system-ui, sans-serif">${idx + 1}</text>
                </g>
            `).join('')}
        </svg>
    `;

    // Step Cards 1..N
    const stepCards = strokes.map((s, idx) => {
        const stepNum = idx + 1;
        const markerId = `arrow_${charId}_${stepNum}`;

        const svgContent = `
            <svg viewBox="0 0 100 100" class="stroke-box-svg">
                <defs>
                    <marker id="${markerId}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#70a0ff" />
                    </marker>
                </defs>
                <line x1="50" y1="6" x2="50" y2="94" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
                <line x1="6" y1="50" x2="94" y2="50" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
                
                <!-- Ghosted Completed Prior Strokes -->
                ${strokes.slice(0, idx).map(prior => `
                    <path d="${prior.d}" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                `).join('')}

                <!-- Active Step Stroke with Direction Arrow -->
                <path d="${s.d}" fill="none" stroke="#70a0ff" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#${markerId})" />

                <!-- Red Starting Point Pin with Number Badge -->
                <g class="stroke-start-pin" transform="translate(${s.start[0]}, ${s.start[1]})">
                    <circle cx="0" cy="0" r="7.5" fill="#ff5252" stroke="#ffffff" stroke-width="1.5" />
                    <text x="0" y="3" font-size="8.5" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="system-ui, sans-serif">${stepNum}</text>
                </g>
            </svg>
        `;

        return `
            <div class="stroke-visual-card" title="Goresan ${stepNum}: ${s.dir} — ${s.desc}">
                <div class="stroke-svg-box">
                    ${svgContent}
                </div>
                <div class="stroke-card-meta">
                    <div class="stroke-card-step">Step ${stepNum}</div>
                    <div class="stroke-card-desc">${s.dir}</div>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="stroke-gallery-section">
            <div class="stroke-gallery-header">
                <div style="display:flex;align-items:center;gap:6px">
                    ${icon('penTool', 14)}
                    <span>Diagram Urutan & Titik Awal Penulisan (書き順) — Dari Mana Mulai Menulis</span>
                </div>
                <span class="stroke-gallery-badge">${strokes.length} Goresan</span>
            </div>
            <div class="stroke-visual-gallery">
                <!-- Overview Card -->
                <div class="stroke-visual-card overview" title="Ringkasan Seluruh ${strokes.length} Goresan">
                    <div class="stroke-svg-box">
                        ${overviewSvg}
                    </div>
                    <div class="stroke-card-meta">
                        <div class="stroke-card-step" style="color:var(--accent-secondary)">Semua Titik</div>
                        <div class="stroke-card-desc">${strokes.length} Awal Goresan</div>
                    </div>
                </div>
                <!-- Step-by-Step Cards with Pins & Directional Arrows -->
                ${stepCards}
            </div>
        </div>
    `;
}

async function renderStrokeRulesPage(container) {
    let rules = [];
    try {
        rules = await invoke('get_stroke_rules');
    } catch (e) {
        rules = [
            { number: 1, title: "Atas ke Bawah", japanese: "上から下へ", description: "Goresan selalu dimulai dari bagian paling atas menuju ke bagian bawah.", example_chars: ["三", "言", "工"] },
            { number: 2, title: "Kiri ke Kanan", japanese: "左から右へ", description: "Tulis komponen sisi kiri terlebih dahulu sebelum melanjutkan ke sisi kanan.", example_chars: ["川", "休", "明"] },
            { number: 3, title: "Mendatar Sebelum Menegak", japanese: "横が先、縦が後", description: "Ketika garis horizontal dan vertikal berpotongan, tulis garis mendatar dahulu.", example_chars: ["十", "木", "大"] },
            { number: 4, title: "Tengah Dahulu untuk Simetris", japanese: "中が先、左右が後", description: "Pada bentuk simetris bertiang tengah, tulis garis tengah terlebih dahulu baru sayap kiri-kanan.", example_chars: ["小", "水", "山"] },
            { number: 5, title: "Bingkai Luar Sebelum Isi Dalam", japanese: "外が先、中が後", description: "Tulis garis tepi luar kotak terlebih dahulu sebelum mengisi komponen dalamnya.", example_chars: ["日", "月", "国"] },
            { number: 6, title: "Tutup Kotak Paling Terakhir", japanese: "中を入れてから閉じる", description: "Setelah seluruh isi dalam kotak selesai digambar, baru tutup garis bawah kotak.", example_chars: ["田", "四", "回"] },
            { number: 7, title: "Garis Tembus Paling Terakhir", japanese: "貫く画は最後", description: "Garis panjang yang menembus bagian tengah karakter selalu ditarik paling terakhir.", example_chars: ["中", "半", "事"] },
            { number: 8, title: "Titik Minor Paling Akhir", japanese: "点は最後", description: "Titik aksen (ten) di sudut atau di dalam karakter dibubuhkan paling akhir.", example_chars: ["玉", "太", "犬"] },
        ];
    }

    container.innerHTML = `
        <div class="page-header">
            <h1><span class="header-icon">${icon('penTool', 24)}</span> Tata Cara Penulisan (書き順)</h1>
            <div class="header-subtitle">8 Prinsip Emas Urutan Goresan (Stroke Order) & Papan Latihan Tulis Kaligrafi</div>
        </div>

        <div class="stroke-banner">
            <div class="stroke-banner-text">
                <h3>Kenapa Urutan Goresan Sangat Penting?</h3>
                <p>Dalam tulisan Jepang (Kanji, Hiragana, Katakana), menulis dengan urutan dan arah yang benar menghasilkan bentuk yang seimbang, proporsional, dan mudah dibaca. Klik karakter manapun untuk membuka <strong>Diagram Visual Arah Goresan & Papan Kaligrafi</strong>!</p>
            </div>
            <div class="stroke-banner-grid-preview">田</div>
        </div>

        <div class="stroke-rules-grid">
            ${rules.map(r => `
                <div class="stroke-rule-card">
                    <div class="srule-header">
                        <span class="srule-num">#${r.number}</span>
                        <div>
                            <h4>${r.title}</h4>
                            <div class="srule-jp">${r.japanese}</div>
                        </div>
                    </div>
                    <p class="srule-desc">${r.description}</p>
                    <div class="srule-examples">
                        <span class="srule-ex-label">Contoh Praktik:</span>
                        ${r.example_chars.map(c => `
                            <button class="srule-char-btn" onclick="lookupAndOpenChar('${c}')" title="Klik untuk lihat diagram titik awal & latihan">${c}</button>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Global quick lookup from any character
async function lookupAndOpenChar(char) {
    let kanjiList = [];
    try { kanjiList = await invoke('get_kanji', { level: 'all' }); } catch(e) {}
    const foundK = kanjiList.find(k => k.character === char);
    if (foundK) {
        openStrokeModal({
            character: foundK.character,
            title: foundK.character,
            subtitle: foundK.meaning.join(', '),
            badge: `${foundK.jlpt_level} • ${foundK.stroke_count} Goresan`,
            readings: `ON: ${foundK.onyomi.join(', ')} | KUN: ${foundK.kunyomi.join(', ')}`,
            radical: foundK.radical,
            stroke_count: foundK.stroke_count,
            stroke_steps: foundK.stroke_steps,
        });
        return;
    }

    let hiraList = [];
    try { hiraList = await invoke('get_hiragana'); } catch(e) {}
    const foundH = hiraList.find(h => h.character === char);
    if (foundH) {
        openStrokeModal({
            character: foundH.character,
            title: foundH.character,
            subtitle: `Hiragana "${foundH.romaji}"`,
            badge: `${foundH.stroke_count} Goresan`,
            readings: `Romaji: ${foundH.romaji}`,
            radical: 'Hiragana Dasar',
            stroke_count: foundH.stroke_count,
            stroke_steps: foundH.stroke_steps,
        });
        return;
    }

    let kataList = [];
    try { kataList = await invoke('get_katakana'); } catch(e) {}
    const foundKa = kataList.find(k => k.character === char);
    if (foundKa) {
        openStrokeModal({
            character: foundKa.character,
            title: foundKa.character,
            subtitle: `Katakana "${foundKa.romaji}"`,
            badge: `${foundKa.stroke_count} Goresan`,
            readings: `Romaji: ${foundKa.romaji}`,
            radical: 'Katakana Serapan',
            stroke_count: foundKa.stroke_count,
            stroke_steps: foundKa.stroke_steps,
        });
        return;
    }

    // Default fallback
    openStrokeModal({
        character: char,
        title: char,
        subtitle: 'Karakter Kaligrafi Jepang',
        badge: 'Praktik Tulis',
        readings: '',
        radical: 'Kanji / Kana',
        stroke_count: 3,
        stroke_steps: [
            "1. Garis horizontal mendatar dari kiri ke kanan.",
            "2. Garis vertikal melintang dari atas ke bawah.",
            "3. Penutup seimbang di bagian dasar."
        ],
    });
}

function getStrokeDirectionArrow(stepText) {
    const text = (stepText || '').toLowerCase();
    if (text.includes('kiri ke kanan') || text.includes('mendatar') || text.includes('horizontal')) {
        return '<span class="stroke-dir-badge dir-right" title="Arah: Kiri ke Kanan">➔ Kiri ke Kanan</span>';
    }
    if (text.includes('atas ke bawah') || text.includes('vertikal') || text.includes('menegak') || text.includes('tegak') || text.includes('ke bawah')) {
        return '<span class="stroke-dir-badge dir-down" title="Arah: Atas ke Bawah">⬇ Atas ke Bawah</span>';
    }
    if (text.includes('menekuk') || text.includes('sudut') || text.includes('kait') || text.includes('belok')) {
        return '<span class="stroke-dir-badge dir-turn" title="Arah: Menekuk / Kait">⤵ Menekuk Sudut</span>';
    }
    if (text.includes('serong kiri') || text.includes('melengkung ke kiri') || text.includes('menukik ke kiri') || text.includes('kiri bawah')) {
        return '<span class="stroke-dir-badge dir-diagonal-left" title="Arah: Serong Kiri">↙ Serong Kiri</span>';
    }
    if (text.includes('serong kanan') || text.includes('melengkung ke kanan') || text.includes('menukik ke kanan') || text.includes('kanan bawah')) {
        return '<span class="stroke-dir-badge dir-diagonal-right" title="Arah: Serong Kanan">↘ Serong Kanan</span>';
    }
    if (text.includes('titik') || text.includes('ten')) {
        return '<span class="stroke-dir-badge dir-dot" title="Arah: Titik Tekan">● Titik Aksen</span>';
    }
    return '<span class="stroke-dir-badge dir-right" title="Arah Goresan">➔ Arah Tulis</span>';
}

// Open interactive stroke practice modal with visual gallery & real Canvas drawing pad
function openStrokeModal(data) {
    const existing = document.querySelector('.stroke-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'stroke-modal-overlay';
    overlay.innerHTML = `
        <div class="stroke-modal-content">
            <div class="smodal-header">
                <div>
                    <h2 class="smodal-title">${data.title} <span class="smodal-badge">${data.badge}</span></h2>
                    <div class="smodal-subtitle">${data.subtitle}</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                    <button class="vocab-audio-btn" onclick="speakWord('${data.character}')" title="Dengarkan Suara">
                        ${icon('volume2', 16)}
                    </button>
                    <button class="smodal-close-btn" onclick="this.closest('.stroke-modal-overlay').remove()">
                        ${icon('xCircle', 20)}
                    </button>
                </div>
            </div>

            <!-- ===== VISUAL STEP-BY-STEP STROKE CARDS GALLERY ===== -->
            ${generateVisualStrokeGalleryHtml(data.character, data.stroke_count, data.stroke_steps)}

            <div class="smodal-body">
                <!-- Left: Japanese Quadrant Grid Canvas (田字格) -->
                <div class="canvas-practice-col">
                    <div class="canvas-header-bar">
                        <span>${icon('penTool', 16)} Papan Latihan Tulis Kaligrafi</span>
                        <div class="canvas-tools">
                            <button class="tool-btn" id="toggle-guide-btn" title="Nyalakan/Matikan Bayangan Karakter">
                                ${icon('eye', 14)} Panduan
                            </button>
                            <button class="tool-btn" id="clear-canvas-btn" title="Hapus Gambar">
                                ${icon('trash', 14)} Hapus
                            </button>
                        </div>
                    </div>

                    <div class="japanese-grid-wrapper">
                        <!-- Background Guide Watermark -->
                        <div class="grid-watermark active" id="grid-watermark">${data.character}</div>
                        <!-- Canvas Dotted Quadrants -->
                        <div class="quadrant-cross-h"></div>
                        <div class="quadrant-cross-v"></div>
                        <canvas id="writing-pad" width="280" height="280"></canvas>
                    </div>

                    <div class="canvas-hint">
                        ${icon('mouse', 14)} Gunakan mouse atau sentuhan jari di atas kotak untuk berlatih menulis.
                    </div>
                </div>

                <!-- Right: Stroke Directions & Steps (Arah & Urutan Goresan) -->
                <div class="stroke-steps-col">
                    <div class="steps-heading">
                        ${icon('layers', 18)} Tata Urutan Penulisan (Dari Mana ke Mana)
                    </div>

                    ${data.readings ? `<div class="smodal-readings">${data.readings}</div>` : ''}
                    ${data.radical ? `<div class="smodal-radical">Radikal / Bentuk: <strong>${data.radical}</strong></div>` : ''}

                    <div class="stroke-step-list">
                        ${(data.stroke_steps && data.stroke_steps.length > 0 ? data.stroke_steps : [
                            "1. Mulai dari sisi paling atas atau kiri ke kanan.",
                            "2. Tarik garis vertikal dari atas ke bawah.",
                            "3. Akhiri dengan penutup mendatar dari kiri ke kanan."
                        ]).map((step, idx) => {
                            const cleanText = step.replace(/^\d+\.\s*/, '');
                            return `
                                <div class="stroke-step-item">
                                    <div class="step-num">${idx + 1}</div>
                                    <div class="step-text-wrap">
                                        <div class="step-dir-row">${getStrokeDirectionArrow(cleanText)}</div>
                                        <div class="step-text">${cleanText}</div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <div class="practice-reward-box">
                        ${icon('star', 16)} Selesai berlatih? Tulis di kanvas dan raih <strong>+15 XP</strong> Kaligrafi!
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Initialize Canvas Painting
    initCanvasPainter();
}

function initCanvasPainter() {
    const canvas = document.getElementById('writing-pad');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let hasDrawn = false;

    ctx.strokeStyle = '#58a6ff';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function startPos(e) {
        isDrawing = true;
        draw(e);
    }

    function endPos() {
        if (isDrawing && !hasDrawn) {
            hasDrawn = true;
            if (typeof addXP === 'function') {
                addXP(15);
                showToast('+15 XP Praktik Kaligrafi Selesai!', 'success');
            }
        }
        isDrawing = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    canvas.addEventListener('mousedown', startPos);
    canvas.addEventListener('mouseup', endPos);
    canvas.addEventListener('mouseleave', endPos);
    canvas.addEventListener('mousemove', draw);

    // Touch support for tablets/surface devices
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPos(e); });
    canvas.addEventListener('touchend', (e) => { e.preventDefault(); endPos(); });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });

    // Tool actions
    const clearBtn = document.getElementById('clear-canvas-btn');
    if (clearBtn) {
        clearBtn.onclick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hasDrawn = false;
        };
    }

    const guideBtn = document.getElementById('toggle-guide-btn');
    const watermark = document.getElementById('grid-watermark');
    if (guideBtn && watermark) {
        guideBtn.onclick = () => {
            watermark.classList.toggle('active');
            guideBtn.classList.toggle('active');
        };
    }
}
