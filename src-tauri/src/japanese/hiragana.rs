use crate::models::JapaneseChar;

fn ch(c: &str, r: &str, g: &str, strokes: u32, steps: &[&str]) -> JapaneseChar {
    JapaneseChar {
        character: c.into(),
        romaji: r.into(),
        char_type: "hiragana".into(),
        group: g.into(),
        stroke_count: strokes,
        stroke_steps: steps.iter().map(|s| s.to_string()).collect(),
    }
}

pub fn get_all_hiragana() -> Vec<JapaneseChar> {
    vec![
        // === Vowels ===
        ch("あ", "a", "vowel", 3, &[
            "1. Garis horizontal dari kiri ke kanan agak naik.",
            "2. Garis vertikal melengkung sedikit memotong garis pertama.",
            "3. Garis melingkar dari tengah memutar lebar ke kanan bawah."
        ]),
        ch("い", "i", "vowel", 2, &[
            "1. Garis melengkung kiri dari atas ke bawah berujung kaitan ke atas.",
            "2. Garis pendek kanan melengkung ke bawah lebih pendek."
        ]),
        ch("う", "u", "vowel", 2, &[
            "1. Titik garis miring pendek di bagian atas.",
            "2. Garis lengkung besar membulat ke kanan bawah."
        ]),
        ch("え", "e", "vowel", 2, &[
            "1. Titik pendek miring ke bawah di bagian atas.",
            "2. Garis kontinu: datar ke kanan, miring ke kiri bawah, lalu meliuk ke kanan bawah."
        ]),
        ch("お", "o", "vowel", 3, &[
            "1. Garis horizontal pendek dari kiri ke kanan.",
            "2. Garis vertikal turun, meliuk membentuk lingkaran di bawah.",
            "3. Titik miring di sebelah kanan atas."
        ]),

        // === K-row ===
        ch("か", "ka", "k", 3, &[
            "1. Garis horizontal melengkung ke bawah dengan kaitan.",
            "2. Garis miring melengkung di sisi kiri menembus garis pertama.",
            "3. Titik aksen di sebelah kanan atas."
        ]),
        ch("き", "ki", "k", 4, &[
            "1. Garis horizontal atas dari kiri ke kanan.",
            "2. Garis horizontal bawah sejajar agak lebih panjang.",
            "3. Garis miring memotong kedua garis horizontal dengan kaitan kiri.",
            "4. Lengkungan bawah melingkar dari kiri ke kanan."
        ]),
        ch("く", "ku", "k", 1, &[
            "1. Satu goresan sudut lancip: miring ke kiri bawah lalu berbelok tajam ke kanan bawah."
        ]),
        ch("け", "ke", "k", 3, &[
            "1. Garis vertikal kiri melengkung dengan kaitan ke kanan atas.",
            "2. Garis horizontal pendek di kanan.",
            "3. Garis vertikal kanan menembus garis horizontal melengkung ke bawah."
        ]),
        ch("こ", "ko", "k", 2, &[
            "1. Garis horizontal atas dari kiri ke kanan dengan kaitan kecil ke kiri bawah.",
            "2. Garis lengkung bawah dari kiri ke kanan menopang bentuk."
        ]),

        // === S-row ===
        ch("さ", "sa", "s", 3, &[
            "1. Garis horizontal dari kiri ke kanan agak naik.",
            "2. Garis miring memotong dengan kaitan kecil ke kiri bawah.",
            "3. Garis lengkung bawah terpisah dari kiri ke kanan."
        ]),
        ch("し", "shi", "s", 1, &[
            "1. Garis vertikal turun lurus dari atas lalu melengkung lembut ke kanan atas seperti kail pancing."
        ]),
        ch("す", "su", "s", 2, &[
            "1. Garis horizontal dari kiri ke kanan.",
            "2. Garis vertikal memotong, membuat loop lingkaran kecil di tengah lalu meluncur ke bawah."
        ]),
        ch("せ", "se", "s", 3, &[
            "1. Garis horizontal mendatar cukup panjang.",
            "2. Garis vertikal kanan turun berbelok horizontal ke kiri.",
            "3. Garis vertikal kiri menembus garis horizontal ke bawah."
        ]),
        ch("そ", "so", "s", 1, &[
            "1. Satu goresan kontinu zigzag: datar kanan, miring kiri, datar kanan, lalu melengkung membulat di bawah."
        ]),

        // === T-row ===
        ch("た", "ta", "t", 4, &[
            "1. Garis horizontal pendek dari kiri ke kanan.",
            "2. Garis miring memotong meluncur ke kiri bawah.",
            "3. Garis horizontal kecil di sebelah kanan atas.",
            "4. Garis lengkung bawah kecil di sebelah kanan bawah."
        ]),
        ch("ち", "chi", "t", 2, &[
            "1. Garis horizontal pendek agak miring ke atas.",
            "2. Garis miring memotong lalu berputar melengkung besar ke kanan bawah membentuk angka 5."
        ]),
        ch("つ", "tsu", "t", 1, &[
            "1. Satu lengkungan lembut seperti ombak: dari kiri atas naik sedikit lalu melengkung besar ke kanan bawah."
        ]),
        ch("て", "te", "t", 1, &[
            "1. Satu goresan: mendatar dari kiri ke kanan lalu melengkung besar membulat ke kiri bawah."
        ]),
        ch("と", "to", "t", 2, &[
            "1. Garis miring pendek dari kiri atas ke kanan bawah.",
            "2. Lengkungan besar seperti huruf C memeluk garis pertama."
        ]),

        // === N-row ===
        ch("な", "na", "n", 4, &[
            "1. Garis horizontal pendek.",
            "2. Garis miring memotong ke kiri bawah.",
            "3. Titik pendek di kanan atas.",
            "4. Garis lengkung dengan loop simpul di kanan bawah."
        ]),
        ch("に", "ni", "n", 3, &[
            "1. Garis vertikal kiri melengkung dengan kaitan kecil.",
            "2. Garis horizontal atas di sebelah kanan.",
            "3. Garis horizontal bawah di sebelah kanan."
        ]),
        ch("ぬ", "nu", "n", 2, &[
            "1. Garis miring dari kiri atas ke kanan bawah.",
            "2. Garis melengkung dari kanan atas, membelah, melingkar ke kanan dan membentuk simpul kecil di ujung."
        ]),
        ch("ね", "ne", "n", 2, &[
            "1. Garis vertikal tegak lurus di sisi kiri.",
            "2. Garis berzigzag lalu membentuk simpul melingkar kecil di ujung kanan bawah."
        ]),
        ch("の", "no", "n", 1, &[
            "1. Satu goresan spiral: dari tengah miring ke kiri bawah lalu melingkar besar ke kanan atas dan turun ke bawah."
        ]),

        // === H-row ===
        ch("は", "ha", "h", 3, &[
            "1. Garis vertikal kiri dengan kaitan kecil.",
            "2. Garis horizontal tengah kanan.",
            "3. Garis vertikal memotong lalu membuat loop simpul di kanan bawah."
        ]),
        ch("ひ", "hi", "h", 1, &[
            "1. Satu goresan meliuk membentuk tapal kuda atau senyuman lebar."
        ]),
        ch("ふ", "fu", "h", 4, &[
            "1. Titik pendek di bagian atas.",
            "2. Garis tengah melengkung seperti hidung.",
            "3. Titik kiri bawah.",
            "4. Titik kanan bawah."
        ]),
        ch("へ", "he", "h", 1, &[
            "1. Satu goresan membentuk lereng bukit: naik miring pendek ke kanan lalu turun panjang ke kanan bawah."
        ]),
        ch("ほ", "ho", "h", 4, &[
            "1. Garis vertikal kiri.",
            "2. Garis horizontal atas kanan.",
            "3. Garis horizontal bawah sejajar.",
            "4. Garis vertikal kanan memotong garis bawah (tidak menembus garis atas) lalu membuat simpul."
        ]),

        // === M-row ===
        ch("ま", "ma", "m", 3, &[
            "1. Garis horizontal atas.",
            "2. Garis horizontal bawah lebih pendek.",
            "3. Garis vertikal memotong kedua garis lalu membuat loop simpul di bawah."
        ]),
        ch("み", "mi", "m", 2, &[
            "1. Garis horizontal miring melingkar membuat loop lalu meluncur ke kanan bawah.",
            "2. Garis miring memotong melengkung dari kanan atas ke bawah."
        ]),
        ch("む", "mu", "m", 3, &[
            "1. Garis horizontal pendek.",
            "2. Garis vertikal turun membuat loop ke kiri lalu ditarik ke kanan atas.",
            "3. Titik aksen di kanan atas."
        ]),
        ch("め", "me", "m", 2, &[
            "1. Garis miring dari kiri atas ke kanan bawah.",
            "2. Garis melengkung memotong garis pertama dan membulat lebar ke kanan."
        ]),
        ch("も", "mo", "m", 3, &[
            "1. Garis vertikal tengah melengkung seperti kail pancing (tengah dulu).",
            "2. Garis horizontal atas memotong.",
            "3. Garis horizontal bawah memotong."
        ]),

        // === Y-row ===
        ch("や", "ya", "y", 3, &[
            "1. Garis melengkung dari kiri ke kanan atas lalu turun meliuk.",
            "2. Titik kecil di kanan atas.",
            "3. Garis miring memotong di sebelah kiri."
        ]),
        ch("ゆ", "yu", "y", 2, &[
            "1. Garis vertikal turun melengkung besar membulat ke kanan.",
            "2. Garis vertikal panjang memotong dari atas ke bawah."
        ]),
        ch("よ", "yo", "y", 2, &[
            "1. Garis horizontal pendek di atas.",
            "2. Garis vertikal dari kanan turun membuat loop simpul ke kiri bawah."
        ]),

        // === R-row ===
        ch("ら", "ra", "r", 2, &[
            "1. Titik pendek miring di bagian atas.",
            "2. Lengkungan vertikal membulat ke kanan bawah seperti angka 5."
        ]),
        ch("り", "ri", "r", 2, &[
            "1. Garis vertikal kiri pendek dengan kaitan.",
            "2. Garis vertikal kanan lebih panjang melengkung lembut ke bawah."
        ]),
        ch("る", "ru", "r", 1, &[
            "1. Satu goresan meliuk mirip angka 3 dengan lingkaran simpul kecil di ujung bawah."
        ]),
        ch("れ", "re", "r", 2, &[
            "1. Garis vertikal kiri tegak lurus.",
            "2. Garis zigzag lalu meliuk ke kanan dengan ujung melengkung ke atas."
        ]),
        ch("ろ", "ro", "r", 1, &[
            "1. Satu goresan mirip angka 3 tanpa lingkaran simpul di ujungnya."
        ]),

        // === W-row & N ===
        ch("わ", "wa", "w", 2, &[
            "1. Garis vertikal kiri lurus.",
            "2. Garis zigzag lalu melengkung membulat lebar ke kanan bawah."
        ]),
        ch("を", "wo", "w", 3, &[
            "1. Garis horizontal pendek.",
            "2. Garis miring turun lalu berbelok horizontal ke kanan.",
            "3. Lengkungan bulan sabit memotong di bawah."
        ]),
        ch("ん", "n", "special", 1, &[
            "1. Satu goresan kontinu dari kiri atas turun miring lalu meliuk melengkung naik dan turun seperti huruf 'n' latin."
        ]),

        // === Dakuten & Handakuten ===
        ch("が", "ga", "g", 5, &["Ikuti goresan 'か' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ぎ", "gi", "g", 6, &["Ikuti goresan 'き' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ぐ", "gu", "g", 3, &["Ikuti goresan 'く' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("げ", "ge", "g", 5, &["Ikuti goresan 'け' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ご", "go", "g", 4, &["Ikuti goresan 'こ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ざ", "za", "z", 5, &["Ikuti goresan 'さ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("じ", "ji", "z", 3, &["Ikuti goresan 'し' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ず", "zu", "z", 4, &["Ikuti goresan 'す' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ぜ", "ze", "z", 5, &["Ikuti goresan 'せ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ぞ", "zo", "z", 3, &["Ikuti goresan 'そ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("だ", "da", "d", 6, &["Ikuti goresan 'た' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ぢ", "di", "d", 4, &["Ikuti goresan 'ち' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("づ", "du", "d", 3, &["Ikuti goresan 'つ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("で", "de", "d", 3, &["Ikuti goresan 'て' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ど", "do", "d", 4, &["Ikuti goresan 'と' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ば", "ba", "b", 5, &["Ikuti goresan 'は' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("び", "bi", "b", 3, &["Ikuti goresan 'ひ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ぶ", "bu", "b", 6, &["Ikuti goresan 'ふ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("べ", "be", "b", 3, &["Ikuti goresan 'へ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ぼ", "bo", "b", 6, &["Ikuti goresan 'ほ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ぱ", "pa", "p", 4, &["Ikuti goresan 'は' lalu tambahkan lingkaran kecil (handakuten) di kanan atas."]),
        ch("ぴ", "pi", "p", 2, &["Ikuti goresan 'ひ' lalu tambahkan lingkaran kecil (handakuten) di kanan atas."]),
        ch("ぷ", "pu", "p", 5, &["Ikuti goresan 'ふ' lalu tambahkan lingkaran kecil (handakuten) di kanan atas."]),
        ch("ぺ", "pe", "p", 2, &["Ikuti goresan 'へ' lalu tambahkan lingkaran kecil (handakuten) di kanan atas."]),
        ch("ぽ", "po", "p", 5, &["Ikuti goresan 'ほ' lalu tambahkan lingkaran kecil (handakuten) di kanan atas."]),
    ]
}
