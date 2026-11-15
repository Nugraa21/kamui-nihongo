use crate::models::JapaneseChar;

fn ch(c: &str, r: &str, g: &str, strokes: u32, steps: &[&str]) -> JapaneseChar {
    JapaneseChar {
        character: c.into(),
        romaji: r.into(),
        char_type: "katakana".into(),
        group: g.into(),
        stroke_count: strokes,
        stroke_steps: steps.iter().map(|s| s.to_string()).collect(),
    }
}

pub fn get_all_katakana() -> Vec<JapaneseChar> {
    vec![
        // === Vowels ===
        ch("ア", "a", "vowel", 2, &[
            "1. Garis siku: horizontal ke kanan lalu melipat miring tajam ke kiri bawah.",
            "2. Garis melengkung panjang dari atas menembus lipatan meluncur ke kiri bawah."
        ]),
        ch("イ", "i", "vowel", 2, &[
            "1. Garis miring pendek dari kanan atas meluncur ke kiri bawah.",
            "2. Garis vertikal tegak lurus dari tengah garis pertama turun lurus ke bawah."
        ]),
        ch("ウ", "u", "vowel", 3, &[
            "1. Titik pendek vertikal di bagian tengah atas.",
            "2. Garis vertikal pendek di sisi kiri.",
            "3. Garis horizontal dari kiri lalu melipat meluncur ke kiri bawah."
        ]),
        ch("エ", "e", "vowel", 3, &[
            "1. Garis horizontal atas ukuran sedang.",
            "2. Garis vertikal tengah tegak lurus ke bawah.",
            "3. Garis horizontal alas paling panjang menutup dasar."
        ]),
        ch("オ", "o", "vowel", 3, &[
            "1. Garis horizontal mendatar dari kiri ke kanan.",
            "2. Garis vertikal tegak lurus dengan kaitan kecil ke kiri di ujung bawah.",
            "3. Garis miring menyapu dari persimpangan meluncur ke kiri bawah."
        ]),

        // === K-row ===
        ch("カ", "ka", "k", 2, &[
            "1. Garis horizontal dari kiri ke kanan lalu melipat miring ke kiri bawah dengan kaitan tajam.",
            "2. Garis miring memotong menyapu dari atas ke kiri bawah."
        ]),
        ch("キ", "ki", "k", 3, &[
            "1. Garis horizontal atas agak miring naik.",
            "2. Garis horizontal bawah sejajar lebih panjang.",
            "3. Garis miring memotong kedua garis dari kanan atas meluncur ke kiri bawah."
        ]),
        ch("ク", "ku", "k", 2, &[
            "1. Garis miring pendek meluncur ke kiri bawah.",
            "2. Garis siku: mendatar ke kanan lalu melengkung panjang ke kiri bawah."
        ]),
        ch("ケ", "ke", "k", 3, &[
            "1. Garis miring pendek di kiri atas.",
            "2. Garis horizontal mendatar menempel pada goresan pertama.",
            "3. Garis melengkung panjang memotong garis horizontal meluncur ke kiri bawah."
        ]),
        ch("コ", "ko", "k", 2, &[
            "1. Garis siku: mendatar dari kiri ke kanan lalu menekuk vertikal turun ke bawah.",
            "2. Garis horizontal bawah menutup dari kiri ke kanan menghubungkan sudut bawah."
        ]),

        // === S-row ===
        ch("サ", "sa", "s", 3, &[
            "1. Garis horizontal panjang agak naik ke kanan.",
            "2. Garis vertikal kiri memotong garis horizontal.",
            "3. Garis vertikal kanan memotong garis horizontal melengkung sedikit ke kiri."
        ]),
        ch("シ", "shi", "s", 3, &[
            "1. Titik percikan pertama di kiri atas (sedikit miring).",
            "2. Titik percikan kedua di bawah titik pertama (hampir sejajar vertikal).",
            "3. Sapuan panjang dari kiri bawah melesat naik ke kanan atas."
        ]),
        ch("ス", "su", "s", 2, &[
            "1. Garis siku: mendatar ke kanan lalu melipat miring tajam ke kiri bawah.",
            "2. Garis miring menyapu dari tengah lipatan meluncur ke kanan bawah."
        ]),
        ch("セ", "se", "s", 2, &[
            "1. Garis horizontal mendatar lalu menekuk vertikal turun dengan kaitan ke kiri.",
            "2. Garis vertikal kiri turun lalu berbelok horizontal ke kanan di dasar."
        ]),
        ch("ソ", "so", "s", 2, &[
            "1. Titik pendek miring dari kiri atas ke kanan bawah.",
            "2. Sapuan panjang dari kanan atas meluncur miring ke kiri bawah."
        ]),

        // === T-row ===
        ch("タ", "ta", "t", 3, &[
            "1. Garis miring pendek meluncur ke kiri bawah.",
            "2. Garis siku horizontal lalu melengkung membulat ke kiri bawah.",
            "3. Garis miring pendek di bagian dalam memotong kurva."
        ]),
        ch("チ", "chi", "t", 3, &[
            "1. Garis miring pendek dari kanan atas ke kiri bawah.",
            "2. Garis horizontal mendatar di bawahnya.",
            "3. Garis vertikal melengkung memotong garis horizontal meluncur ke kiri bawah."
        ]),
        ch("ツ", "tsu", "t", 3, &[
            "1. Titik kiri pertama agak mendatar.",
            "2. Titik kanan kedua sejajar horizontal.",
            "3. Sapuan tajam dari kanan atas meluncur miring ke kiri bawah."
        ]),
        ch("テ", "te", "t", 3, &[
            "1. Garis horizontal atas lebih pendek.",
            "2. Garis horizontal kedua lebih panjang.",
            "3. Garis melengkung dari tengah garis kedua meluncur menyapu ke kiri bawah."
        ]),
        ch("ト", "to", "t", 2, &[
            "1. Garis vertikal tegak lurus dari atas ke bawah.",
            "2. Garis miring menyamping dari tengah garis vertikal meluncur ke kanan bawah."
        ]),

        // === N-row ===
        ch("ナ", "na", "n", 2, &[
            "1. Garis horizontal mendatar dari kiri ke kanan.",
            "2. Garis miring menyapu dari tengah garis horizontal meluncur panjang ke kiri bawah."
        ]),
        ch("ニ", "ni", "n", 2, &[
            "1. Garis horizontal atas lebih pendek.",
            "2. Garis horizontal bawah lebih panjang menopang di dasar."
        ]),
        ch("ヌ", "nu", "n", 2, &[
            "1. Garis siku: horizontal ke kanan lalu melipat miring ke kiri bawah.",
            "2. Garis miring menyapu dari kiri tengah melintasi garis pertama ke kanan bawah."
        ]),
        ch("ネ", "ne", "n", 4, &[
            "1. Titik pendek di bagian atas.",
            "2. Garis siku: horizontal lalu melipat miring ke kiri bawah.",
            "3. Garis vertikal lurus memotong lipatan.",
            "4. Titik menyapu di sebelah kanan bawah."
        ]),
        ch("ノ", "no", "n", 1, &[
            "1. Satu goresan tunggal miring melengkung lembut dari kanan atas meluncur ke kiri bawah."
        ]),

        // === H-row ===
        ch("ハ", "ha", "h", 2, &[
            "1. Garis miring kiri meluncur ke kiri bawah.",
            "2. Garis miring kanan terbuka meluncur ke kanan bawah."
        ]),
        ch("ヒ", "hi", "h", 2, &[
            "1. Garis horizontal pendek melengkung sedikit.",
            "2. Garis vertikal turun lalu menekuk horizontal ke kanan dan naik vertikal pendek."
        ]),
        ch("フ", "fu", "h", 1, &[
            "1. Satu goresan siku: mendatar dari kiri ke kanan lalu melipat melengkung ke kiri bawah."
        ]),
        ch("ヘ", "he", "h", 1, &[
            "1. Satu goresan sudut lereng: naik pendek ke kanan atas lalu turun panjang ke kanan bawah."
        ]),
        ch("ホ", "ho", "h", 4, &[
            "1. Garis horizontal atas.",
            "2. Garis vertikal tegak lurus menembus dengan kaitan di ujung bawah.",
            "3. Titik miring di sayap kiri.",
            "4. Titik miring di sayap kanan."
        ]),

        // === M-row ===
        ch("マ", "ma", "m", 2, &[
            "1. Garis siku: mendatar ke kanan lalu melipat miring tajam ke kiri bawah.",
            "2. Titik miring pendek menempel di sudut kanan bawah."
        ]),
        ch("ミ", "mi", "m", 3, &[
            "1. Garis miring pendek teratas.",
            "2. Garis miring kedua di tengah sejajar.",
            "3. Garis miring ketiga terbawah sedikit lebih panjang."
        ]),
        ch("ム", "mu", "m", 2, &[
            "1. Garis segitiga terbuka: miring ke kiri bawah lalu berbelok horizontal ke kanan.",
            "2. Titik aksen miring di bagian kanan atas."
        ]),
        ch("メ", "me", "m", 2, &[
            "1. Garis miring dari kanan atas meluncur panjang ke kiri bawah.",
            "2. Garis miring kedua memotong dari kiri atas meluncur ke kanan bawah."
        ]),
        ch("モ", "mo", "m", 3, &[
            "1. Garis horizontal atas.",
            "2. Garis horizontal bawah lebih panjang.",
            "3. Garis siku L: vertikal memotong kedua garis lalu menekuk mendatar ke kanan di dasar."
        ]),

        // === Y-row ===
        ch("ヤ", "ya", "y", 2, &[
            "1. Garis siku: mendatar lalu melipat miring tajam ke kiri bawah.",
            "2. Garis miring memotong dari tengah atas meluncur ke kiri bawah."
        ]),
        ch("ユ", "yu", "y", 2, &[
            "1. Garis siku: horizontal ke kanan lalu turun vertikal ke bawah.",
            "2. Garis horizontal panjang di dasar menembus garis vertikal dari kiri ke kanan."
        ]),
        ch("ヨ", "yo", "y", 3, &[
            "1. Garis siku atas: horizontal lalu turun vertikal sampai bawah.",
            "2. Garis horizontal tengah menempel di dalam.",
            "3. Garis horizontal bawah menutup dasar."
        ]),

        // === R-row ===
        ch("ラ", "ra", "r", 2, &[
            "1. Garis horizontal pendek di atas.",
            "2. Garis siku: turun melengkung lalu melipat tajam ke kiri bawah."
        ]),
        ch("リ", "ri", "r", 2, &[
            "1. Garis vertikal kiri pendek lurus.",
            "2. Garis vertikal kanan lebih panjang melengkung lembut ke kiri bawah di ujung."
        ]),
        ch("ル", "ru", "r", 2, &[
            "1. Garis miring kiri meluncur ke kiri bawah.",
            "2. Garis vertikal kanan turun lalu melengkung ke kanan atas dengan kaitan."
        ]),
        ch("レ", "re", "r", 1, &[
            "1. Satu goresan sudut: turun vertikal lalu melipat tajam miring naik ke kanan atas."
        ]),
        ch("ロ", "ro", "r", 3, &[
            "1. Garis vertikal sisi kiri kotak.",
            "2. Garis siku atas-kanan: horizontal lalu turun ke bawah.",
            "3. Garis horizontal bawah menutup kotak dari kiri ke kanan."
        ]),

        // === W-row & N ===
        ch("ワ", "wa", "w", 2, &[
            "1. Garis vertikal pendek di sisi kiri.",
            "2. Garis siku: mendatar ke kanan lalu melipat melengkung ke kiri bawah."
        ]),
        ch("ヲ", "wo", "w", 3, &[
            "1. Garis horizontal atas.",
            "2. Garis horizontal kedua sejajar di bawahnya.",
            "3. Garis miring meluncur dari garis atas memotong ke kiri bawah."
        ]),
        ch("ン", "n", "special", 2, &[
            "1. Titik pendek miring di sebelah kiri atas.",
            "2. Sapuan tajam dari kiri bawah melesat naik miring ke kanan atas."
        ]),

        // === Dakuten & Handakuten ===
        ch("ガ", "ga", "g", 4, &["Ikuti goresan 'カ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ギ", "gi", "g", 5, &["Ikuti goresan 'キ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("グ", "gu", "g", 4, &["Ikuti goresan 'ク' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ゲ", "ge", "g", 5, &["Ikuti goresan 'ケ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ゴ", "go", "g", 4, &["Ikuti goresan 'コ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ザ", "za", "z", 5, &["Ikuti goresan 'サ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ジ", "ji", "z", 5, &["Ikuti goresan 'シ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ズ", "zu", "z", 4, &["Ikuti goresan 'ス' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ゼ", "ze", "z", 4, &["Ikuti goresan 'セ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ゾ", "zo", "z", 4, &["Ikuti goresan 'ソ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ダ", "da", "d", 5, &["Ikuti goresan 'タ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ヂ", "di", "d", 5, &["Ikuti goresan 'チ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ヅ", "du", "d", 5, &["Ikuti goresan 'ツ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("デ", "de", "d", 5, &["Ikuti goresan 'テ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ド", "do", "d", 4, &["Ikuti goresan 'ト' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("バ", "ba", "b", 4, &["Ikuti goresan 'ハ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ビ", "bi", "b", 4, &["Ikuti goresan 'ヒ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ブ", "bu", "b", 3, &["Ikuti goresan 'フ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ベ", "be", "b", 3, &["Ikuti goresan 'ヘ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("ボ", "bo", "b", 6, &["Ikuti goresan 'ホ' lalu tambahkan dua tanda petik (dakuten) di kanan atas."]),
        ch("パ", "pa", "p", 3, &["Ikuti goresan 'ハ' lalu tambahkan lingkaran kecil (handakuten) di kanan atas."]),
        ch("ピ", "pi", "p", 3, &["Ikuti goresan 'ヒ' lalu tambahkan lingkaran kecil (handakuten) di kanan atas."]),
        ch("プ", "pu", "p", 2, &["Ikuti goresan 'フ' lalu tambahkan lingkaran kecil (handakuten) di kanan atas."]),
        ch("ペ", "pe", "p", 2, &["Ikuti goresan 'ヘ' lalu tambahkan lingkaran kecil (handakuten) di kanan atas."]),
        ch("ポ", "po", "p", 5, &["Ikuti goresan 'ホ' lalu tambahkan lingkaran kecil (handakuten) di kanan atas."]),
    ]
}
