use crate::models::{Kanji, KanjiExample};

pub fn get_kanji_by_level(level: &str) -> Vec<Kanji> {
    match level {
        "N5" => get_n5_kanji(),
        "N4" => get_n4_kanji(),
        "N3" => get_n3_kanji(),
        "all" => {
            let mut all = get_n5_kanji();
            all.extend(get_n4_kanji());
            all.extend(get_n3_kanji());
            all
        }
        _ => get_n5_kanji(),
    }
}

pub fn get_n5_kanji() -> Vec<Kanji> {
    vec![
        Kanji {
            character: "一".into(), onyomi: vec!["イチ".into(), "イツ".into()], kunyomi: vec!["ひと(つ)".into()],
            meaning: vec!["Satu".into(), "One".into()], jlpt_level: "N5".into(), stroke_count: 1,
            stroke_steps: vec!["1. Tarik garis horizontal dari kiri ke kanan dengan tekanan stabil.".into()],
            radical: "一 (Ichi)".into(),
            examples: vec![
                KanjiExample { word: "一人".into(), reading: "ひとり".into(), meaning: "Sendirian / 1 orang".into() },
                KanjiExample { word: "一日".into(), reading: "ついたち / いちにち".into(), meaning: "Tanggal satu / 1 hari".into() },
            ],
        },
        Kanji {
            character: "二".into(), onyomi: vec!["ニ".into()], kunyomi: vec!["ふた(つ)".into()],
            meaning: vec!["Dua".into(), "Two".into()], jlpt_level: "N5".into(), stroke_count: 2,
            stroke_steps: vec![
                "1. Garis horizontal atas lebih pendek dari kiri ke kanan.".into(),
                "2. Garis horizontal bawah lebih panjang dan tegas dari kiri ke kanan.".into(),
            ],
            radical: "二 (Ni)".into(),
            examples: vec![
                KanjiExample { word: "二人".into(), reading: "ふたり".into(), meaning: "Dua orang".into() },
                KanjiExample { word: "二月".into(), reading: "にがつ".into(), meaning: "Bulan Februari".into() },
            ],
        },
        Kanji {
            character: "三".into(), onyomi: vec!["サン".into()], kunyomi: vec!["み(つ)".into(), "みっ(つ)".into()],
            meaning: vec!["Tiga".into(), "Three".into()], jlpt_level: "N5".into(), stroke_count: 3,
            stroke_steps: vec![
                "1. Garis horizontal atas ukuran sedang.".into(),
                "2. Garis horizontal tengah paling pendek.".into(),
                "3. Garis horizontal bawah paling panjang mendasari karakter.".into(),
            ],
            radical: "一 (Ichi)".into(),
            examples: vec![
                KanjiExample { word: "三日月".into(), reading: "みかづき".into(), meaning: "Bulan sabit".into() },
                KanjiExample { word: "三年".into(), reading: "さんねん".into(), meaning: "Tiga tahun".into() },
            ],
        },
        Kanji {
            character: "四".into(), onyomi: vec!["シ".into()], kunyomi: vec!["よ(つ)".into(), "よん".into()],
            meaning: vec!["Empat".into(), "Four".into()], jlpt_level: "N5".into(), stroke_count: 5,
            stroke_steps: vec![
                "1. Garis vertikal kiri dari atas ke bawah.".into(),
                "2. Garis siku atas-kanan melipat ke bawah.".into(),
                "3. Goresan kurva kiri di dalam kotak.".into(),
                "4. Goresan tekukan kanan di dalam kotak.".into(),
                "5. Garis horizontal bawah menutup kotak dari kiri ke kanan.".into(),
            ],
            radical: "囗 (Kunigamae)".into(),
            examples: vec![
                KanjiExample { word: "四月".into(), reading: "しがつ".into(), meaning: "Bulan April".into() },
                KanjiExample { word: "四季".into(), reading: "しき".into(), meaning: "Empat musim".into() },
            ],
        },
        Kanji {
            character: "五".into(), onyomi: vec!["ゴ".into()], kunyomi: vec!["いつ(つ)".into()],
            meaning: vec!["Lima".into(), "Five".into()], jlpt_level: "N5".into(), stroke_count: 4,
            stroke_steps: vec![
                "1. Garis horizontal atas dari kiri ke kanan.".into(),
                "2. Garis miring menurun ke kiri di bagian tengah.".into(),
                "3. Garis sudut dari tengah ke kanan lalu belok turun.".into(),
                "4. Garis horizontal bawah menutup dasar karakter.".into(),
            ],
            radical: "二 (Ni)".into(),
            examples: vec![
                KanjiExample { word: "五月".into(), reading: "ごがつ".into(), meaning: "Bulan Mei".into() },
                KanjiExample { word: "五日".into(), reading: "いつか".into(), meaning: "Tanggal lima / 5 hari".into() },
            ],
        },
        Kanji {
            character: "日".into(), onyomi: vec!["ニチ".into(), "ジツ".into()], kunyomi: vec!["ひ".into(), "か".into()],
            meaning: vec!["Matahari".into(), "Hari".into(), "Sun / Day".into()], jlpt_level: "N5".into(), stroke_count: 4,
            stroke_steps: vec![
                "1. Garis vertikal kiri dari atas ke bawah.".into(),
                "2. Garis siku mendatar dari kiri lalu turun vertikal ke bawah.".into(),
                "3. Garis horizontal tengah dari kiri ke kanan menghubungkan kedua sisi.".into(),
                "4. Garis horizontal bawah menutup kotak bingkai.".into(),
            ],
            radical: "日 (Hi)".into(),
            examples: vec![
                KanjiExample { word: "日本".into(), reading: "にほん".into(), meaning: "Jepang".into() },
                KanjiExample { word: "今日".into(), reading: "きょう".into(), meaning: "Hari ini".into() },
                KanjiExample { word: "日曜日".into(), reading: "にちようび".into(), meaning: "Hari Minggu".into() },
            ],
        },
        Kanji {
            character: "月".into(), onyomi: vec!["ゲツ".into(), "ガツ".into()], kunyomi: vec!["つき".into()],
            meaning: vec!["Bulan".into(), "Moon / Month".into()], jlpt_level: "N5".into(), stroke_count: 4,
            stroke_steps: vec![
                "1. Garis melengkung vertikal sisi kiri dari atas ke bawah.".into(),
                "2. Garis siku dari kiri atas ke kanan lalu turun dengan kait di ujung.".into(),
                "3. Garis horizontal tengah pertama di dalam.".into(),
                "4. Garis horizontal tengah kedua di dalam.".into(),
            ],
            radical: "月 (Tsuki)".into(),
            examples: vec![
                KanjiExample { word: "月曜日".into(), reading: "げつようび".into(), meaning: "Hari Senin".into() },
                KanjiExample { word: "今月".into(), reading: "こんげつ".into(), meaning: "Bulan ini".into() },
            ],
        },
        Kanji {
            character: "火".into(), onyomi: vec!["カ".into()], kunyomi: vec!["ひ".into()],
            meaning: vec!["Api".into(), "Fire".into()], jlpt_level: "N5".into(), stroke_count: 4,
            stroke_steps: vec![
                "1. Titik percikan api di sebelah kiri condong ke bawah.".into(),
                "2. Titik percikan api di sebelah kanan condong ke bawah.".into(),
                "3. Garis lengkung utama di tengah menyapu ke kiri bawah.".into(),
                "4. Garis menyapu dari tengah ke kanan bawah menyeimbangkan bentuk.".into(),
            ],
            radical: "火 (Hi)".into(),
            examples: vec![
                KanjiExample { word: "火曜日".into(), reading: "かようび".into(), meaning: "Hari Selasa".into() },
                KanjiExample { word: "花火".into(), reading: "はなび".into(), meaning: "Kembang api".into() },
            ],
        },
        Kanji {
            character: "水".into(), onyomi: vec!["スイ".into()], kunyomi: vec!["みず".into()],
            meaning: vec!["Air".into(), "Water".into()], jlpt_level: "N5".into(), stroke_count: 4,
            stroke_steps: vec![
                "1. Batang vertikal tengah dengan kait di bawah (tulis bagian tengah dulu).".into(),
                "2. Sayap kiri atas menekuk meluncur ke kiri bawah.".into(),
                "3. Sayap kanan atas menukik pendek ke arah tengah.".into(),
                "4. Sapuan kanan bawah memanjang ke kanan bawah.".into(),
            ],
            radical: "水 (Mizu)".into(),
            examples: vec![
                KanjiExample { word: "水曜日".into(), reading: "すいようび".into(), meaning: "Hari Rabu".into() },
                KanjiExample { word: "お水".into(), reading: "おみず".into(), meaning: "Air minum (sopan)".into() },
            ],
        },
        Kanji {
            character: "木".into(), onyomi: vec!["モク".into(), "ボク".into()], kunyomi: vec!["き".into()],
            meaning: vec!["Pohon / Kayu".into(), "Tree / Wood".into()], jlpt_level: "N5".into(), stroke_count: 4,
            stroke_steps: vec![
                "1. Garis horizontal mendatar (cabang pohon).".into(),
                "2. Garis vertikal tegak lurus menembus tengah (batang pohon).".into(),
                "3. Garis akar menyapu ke kiri bawah.".into(),
                "4. Garis akar menyapu ke kanan bawah.".into(),
            ],
            radical: "木 (Ki)".into(),
            examples: vec![
                KanjiExample { word: "木曜日".into(), reading: "もくようび".into(), meaning: "Hari Kamis".into() },
                KanjiExample { word: "木乃伊".into(), reading: "ミイラ".into(), meaning: "Mumi".into() },
            ],
        },
        Kanji {
            character: "金".into(), onyomi: vec!["キン".into(), "コン".into()], kunyomi: vec!["かね".into()],
            meaning: vec!["Emas / Uang".into(), "Gold / Money".into()], jlpt_level: "N5".into(), stroke_count: 8,
            stroke_steps: vec![
                "1. Atap miring ke kiri atas.".into(),
                "2. Atap miring ke kanan atas memayungi.".into(),
                "3. Garis horizontal atas di bawah atap.".into(),
                "4. Garis horizontal tengah lebih pendek.".into(),
                "5. Garis vertikal pendek di tengah.".into(),
                "6. Titik kiri di samping garis vertikal.".into(),
                "7. Titik kanan di samping garis vertikal.".into(),
                "8. Garis horizontal alas paling panjang di bawah.".into(),
            ],
            radical: "金 (Kane)".into(),
            examples: vec![
                KanjiExample { word: "金曜日".into(), reading: "きんようび".into(), meaning: "Hari Jumat".into() },
                KanjiExample { word: "お金".into(), reading: "おかね".into(), meaning: "Uang".into() },
            ],
        },
        Kanji {
            character: "土".into(), onyomi: vec!["ド".into(), "ト".into()], kunyomi: vec!["つち".into()],
            meaning: vec!["Tanah / Bumi".into(), "Earth / Soil".into()], jlpt_level: "N5".into(), stroke_count: 3,
            stroke_steps: vec![
                "1. Garis horizontal atas lebih pendek.".into(),
                "2. Garis vertikal tegak lurus dari atas ke bawah.".into(),
                "3. Garis horizontal dasar paling panjang menopang tanah.".into(),
            ],
            radical: "土 (Tsuchi)".into(),
            examples: vec![
                KanjiExample { word: "土曜日".into(), reading: "どようび".into(), meaning: "Hari Sabtu".into() },
                KanjiExample { word: "土地".into(), reading: "とち".into(), meaning: "Tanah pekarangan".into() },
            ],
        },
        Kanji {
            character: "人".into(), onyomi: vec!["ジン".into(), "ニン".into()], kunyomi: vec!["ひと".into()],
            meaning: vec!["Orang / Manusia".into(), "Person".into()], jlpt_level: "N5".into(), stroke_count: 2,
            stroke_steps: vec![
                "1. Garis kaki kiri menyapu melengkung ke kiri bawah.".into(),
                "2. Garis kaki kanan berpijak dari tengah kaki kiri menyapu ke kanan bawah.".into(),
            ],
            radical: "人 (Hito)".into(),
            examples: vec![
                KanjiExample { word: "日本人".into(), reading: "にほんじん".into(), meaning: "Orang Jepang".into() },
                KanjiExample { word: "三人".into(), reading: "さんにん".into(), meaning: "Tiga orang".into() },
            ],
        },
        Kanji {
            character: "山".into(), onyomi: vec!["サン".into()], kunyomi: vec!["やま".into()],
            meaning: vec!["Gunung".into(), "Mountain".into()], jlpt_level: "N5".into(), stroke_count: 3,
            stroke_steps: vec![
                "1. Garis puncak tengah paling tinggi (tengah dulu untuk bentuk simetris).".into(),
                "2. Garis lereng kiri turun lalu berbelok horizontal ke kanan di dasar.".into(),
                "3. Garis lereng kanan turun vertikal menutup sisi kanan.".into(),
            ],
            radical: "山 (Yama)".into(),
            examples: vec![
                KanjiExample { word: "富士山".into(), reading: "ふじさん".into(), meaning: "Gunung Fuji".into() },
                KanjiExample { word: "火山".into(), reading: "かざん".into(), meaning: "Gunung berapi".into() },
            ],
        },
        Kanji {
            character: "学".into(), onyomi: vec!["ガク".into()], kunyomi: vec!["まな(ぶ)".into()],
            meaning: vec!["Belajar / Ilmu".into(), "Study / Learn".into()], jlpt_level: "N5".into(), stroke_count: 8,
            stroke_steps: vec![
                "1-3. Tiga titik mahkota di atas (kiri, tengah, kanan).".into(),
                "4-5. Atap kanopi kanji (Garis tekuk kiri dan kanan atas).".into(),
                "6. Garis horizontal anak (子) di bawah.".into(),
                "7. Garis vertikal melengkung dengan kaitan bawah.".into(),
                "8. Garis horizontal tengah melintang memotong badan.".into(),
            ],
            radical: "子 (Ko)".into(),
            examples: vec![
                KanjiExample { word: "学校".into(), reading: "がっこう".into(), meaning: "Sekolah".into() },
                KanjiExample { word: "学生".into(), reading: "がくせい".into(), meaning: "Siswa / Mahasiswa".into() },
                KanjiExample { word: "大学".into(), reading: "だいがく".into(), meaning: "Universitas".into() },
            ],
        },
        Kanji {
            character: "先".into(), onyomi: vec!["セン".into()], kunyomi: vec!["さき".into()],
            meaning: vec!["Terdahulu / Ujung".into(), "Before / Ahead".into()], jlpt_level: "N5".into(), stroke_count: 6,
            stroke_steps: vec![
                "1. Garis pendek miring di kiri atas.".into(),
                "2. Garis horizontal atas.".into(),
                "3. Garis vertikal pendek menembus garis horizontal.".into(),
                "4. Garis horizontal panjang kedua.".into(),
                "5. Kaki kiri meluncur ke kiri bawah.".into(),
                "6. Kaki kanan melengkung ke kanan bawah dengan kaitan ujung ke atas.".into(),
            ],
            radical: "儿 (Hitoashi)".into(),
            examples: vec![
                KanjiExample { word: "先生".into(), reading: "せんせい".into(), meaning: "Guru / Dokter".into() },
                KanjiExample { word: "先月".into(), reading: "せんげつ".into(), meaning: "Bulan lalu".into() },
            ],
        },
        Kanji {
            character: "食".into(), onyomi: vec!["ショク".into()], kunyomi: vec!["た(べる)".into()],
            meaning: vec!["Makan / Makanan".into(), "Eat / Food".into()], jlpt_level: "N5".into(), stroke_count: 9,
            stroke_steps: vec![
                "1-2. Atap kanopi (payung kiri dan kanan).".into(),
                "3. Garis horizontal pendek di bawah atap.".into(),
                "4. Garis vertikal pendek menurun.".into(),
                "5. Garis siku membentuk bingkai kecil.".into(),
                "6. Garis horizontal penutup kotak kecil.".into(),
                "7. Garis horizontal tengah bawah.".into(),
                "8. Garis kiri bawah meluncur.".into(),
                "9. Garis kanan bawah dengan kaitan melengkung ke atas.".into(),
            ],
            radical: "食 (Shoku)".into(),
            examples: vec![
                KanjiExample { word: "食べ物".into(), reading: "たべもの".into(), meaning: "Makanan".into() },
                KanjiExample { word: "食事".into(), reading: "しょくじ".into(), meaning: "Santapan / Makan bersama".into() },
            ],
        },
    ]
}

pub fn get_n4_kanji() -> Vec<Kanji> {
    vec![
        Kanji {
            character: "会".into(), onyomi: vec!["カイ".into(), "エ".into()], kunyomi: vec!["あ(う)".into()],
            meaning: vec!["Bertemu / Perkumpulan".into(), "Meet / Association".into()], jlpt_level: "N4".into(), stroke_count: 6,
            stroke_steps: vec![
                "1. Atap miring ke kiri.".into(),
                "2. Atap miring ke kanan memayungi.".into(),
                "3. Garis horizontal tengah.".into(),
                "4. Garis siku kiri bawah.".into(),
                "5. Garis horizontal di dalam dasar.".into(),
                "6. Garis horizontal penutup paling bawah.".into(),
            ],
            radical: "人 (Hito)".into(),
            examples: vec![
                KanjiExample { word: "会社".into(), reading: "かいしゃ".into(), meaning: "Perusahaan".into() },
                KanjiExample { word: "会話".into(), reading: "かいわ".into(), meaning: "Percakapan".into() },
                KanjiExample { word: "会う".into(), reading: "あう".into(), meaning: "Bertemu".into() },
            ],
        },
        Kanji {
            character: "社".into(), onyomi: vec!["シャ".into()], kunyomi: vec!["やしろ".into()],
            meaning: vec!["Masyarakat / Kuil / Perusahaan".into(), "Company / Shrine".into()], jlpt_level: "N4".into(), stroke_count: 7,
            stroke_steps: vec![
                "1. Titik kiri atas (radikal shimesu).".into(),
                "2. Garis siku horizontal-turun.".into(),
                "3. Garis vertikal kiri penyangga.".into(),
                "4. Titik miring kanan pada radikal kiri.".into(),
                "5. Garis horizontal atas pada karakter tanah (土).".into(),
                "6. Garis vertikal tengah.".into(),
                "7. Garis horizontal alas paling panjang.".into(),
            ],
            radical: "示 (Shimesu)".into(),
            examples: vec![
                KanjiExample { word: "社会".into(), reading: "しゃかい".into(), meaning: "Masyarakat".into() },
                KanjiExample { word: "社長".into(), reading: "しゃちょう".into(), meaning: "Direktur / Presiden Direktur".into() },
                KanjiExample { word: "神社".into(), reading: "じんじゃ".into(), meaning: "Kuil Shinto".into() },
            ],
        },
        Kanji {
            character: "店".into(), onyomi: vec!["テン".into()], kunyomi: vec!["みせ".into()],
            meaning: vec!["Toko / Kedai".into(), "Shop / Store".into()], jlpt_level: "N4".into(), stroke_count: 8,
            stroke_steps: vec![
                "1. Titik atap di bagian atas.".into(),
                "2. Garis horizontal naungan atap.".into(),
                "3. Garis dinding kiri meluncur ke bawah.".into(),
                "4. Garis horizontal atas di dalam atap.".into(),
                "5. Garis vertikal menembus garis horizontal.".into(),
                "6. Garis vertikal kiri kotak mulut (口).".into(),
                "7. Garis siku atas-kanan mulut.".into(),
                "8. Garis penutup bawah kotak mulut.".into(),
            ],
            radical: "广 (Madare)".into(),
            examples: vec![
                KanjiExample { word: "店員".into(), reading: "てんいん".into(), meaning: "Pelayan toko / Kasir".into() },
                KanjiExample { word: "売店".into(), reading: "ばいてん".into(), meaning: "Kios / Kantin".into() },
            ],
        },
        Kanji {
            character: "駅".into(), onyomi: vec!["エキ".into()], kunyomi: vec![],
            meaning: vec!["Stasiun Kereta".into(), "Station".into()], jlpt_level: "N4".into(), stroke_count: 14,
            stroke_steps: vec![
                "1-10. Tulis radikal Kuda (馬) di sisi kiri secara lengkap.".into(),
                "11-14. Tulis komponen kanan (尺) dari atas ke bawah.".into(),
            ],
            radical: "馬 (Uma)".into(),
            examples: vec![
                KanjiExample { word: "駅前".into(), reading: "えきまえ".into(), meaning: "Depan stasiun".into() },
                KanjiExample { word: "駅員".into(), reading: "えきいん".into(), meaning: "Petugas stasiun".into() },
            ],
        },
        Kanji {
            character: "動".into(), onyomi: vec!["ドウ".into()], kunyomi: vec!["うご(く)".into()],
            meaning: vec!["Bergerak".into(), "Move / Motion".into()], jlpt_level: "N4".into(), stroke_count: 11,
            stroke_steps: vec![
                "1-9. Tulis komponen berat (重) di sebelah kiri dari atas ke bawah.".into(),
                "10. Garis siku tenaga (力) di sisi kanan.".into(),
                "11. Garis melengkung memotong menyapu ke kiri bawah.".into(),
            ],
            radical: "力 (Chikara)".into(),
            examples: vec![
                KanjiExample { word: "動物".into(), reading: "どうぶつ".into(), meaning: "Hewan / Binatang".into() },
                KanjiExample { word: "運動".into(), reading: "うんどう".into(), meaning: "Olahraga".into() },
                KanjiExample { word: "自動車".into(), reading: "じどうしゃ".into(), meaning: "Mobil".into() },
            ],
        },
        Kanji {
            character: "思".into(), onyomi: vec!["シ".into()], kunyomi: vec!["おも(う)".into()],
            meaning: vec!["Berpikir / Mengira".into(), "Think / Thought".into()], jlpt_level: "N4".into(), stroke_count: 9,
            stroke_steps: vec![
                "1-5. Tulis kotak Sawah (田) di bagian atas secara berurutan.".into(),
                "6. Titik kiri hati (心) di bawah.".into(),
                "7. Garis lengkung utama hati dengan kaitan ke atas.".into(),
                "8. Titik tengah hati.".into(),
                "9. Titik kanan atas hati.".into(),
            ],
            radical: "心 (Kokoro)".into(),
            examples: vec![
                KanjiExample { word: "思い出".into(), reading: "おもいで".into(), meaning: "Kenangan".into() },
                KanjiExample { word: "思う".into(), reading: "おもう".into(), meaning: "Berpikir / Mengira".into() },
            ],
        },
        Kanji {
            character: "新".into(), onyomi: vec!["シン".into()], kunyomi: vec!["あたら(しい)".into()],
            meaning: vec!["Baru".into(), "New / Fresh".into()], jlpt_level: "N4".into(), stroke_count: 13,
            stroke_steps: vec![
                "1-9. Tulis komponen berdiri (立) dan kayu (木) di sisi kiri.".into(),
                "10-13. Tulis komponen kapak (斤) di sisi kanan dari kiri ke kanan.".into(),
            ],
            radical: "斤 (Ono)".into(),
            examples: vec![
                KanjiExample { word: "新聞".into(), reading: "しんぶん".into(), meaning: "Koran / Surat kabar".into() },
                KanjiExample { word: "新年".into(), reading: "しんねん".into(), meaning: "Tahun baru".into() },
                KanjiExample { word: "新しい".into(), reading: "あたらしい".into(), meaning: "Baru".into() },
            ],
        },
        Kanji {
            character: "空".into(), onyomi: vec!["クウ".into()], kunyomi: vec!["そら".into(), "あ(く)".into(), "から".into()],
            meaning: vec!["Langit / Kosong".into(), "Sky / Empty".into()], jlpt_level: "N4".into(), stroke_count: 8,
            stroke_steps: vec![
                "1-5. Tulis mahkota gua/lubang (穴) di bagian atas.".into(),
                "6-8. Tulis komponen tukang/pekerjaan (工) di bagian bawah.".into(),
            ],
            radical: "穴 (Ana)".into(),
            examples: vec![
                KanjiExample { word: "空港".into(), reading: "くうこう".into(), meaning: "Bandara".into() },
                KanjiExample { word: "青空".into(), reading: "あおぞら".into(), meaning: "Langit biru".into() },
                KanjiExample { word: "空気".into(), reading: "くうき".into(), meaning: "Udara / Atmosfer".into() },
            ],
        },
    ]
}

pub fn get_n3_kanji() -> Vec<Kanji> {
    vec![
        Kanji {
            character: "政".into(), onyomi: vec!["セイ".into(), "ショウ".into()], kunyomi: vec!["まつりごと".into()],
            meaning: vec!["Politik / Pemerintahan".into(), "Politics / Government".into()], jlpt_level: "N3".into(), stroke_count: 9,
            stroke_steps: vec![
                "1-5. Tulis komponen 正 (benar/lurus) di sebelah kiri dari atas ke bawah.".into(),
                "6-9. Tulis radikal pukulan/aksi (攵) di sebelah kanan.".into(),
            ],
            radical: "攵 (Nogome)".into(),
            examples: vec![
                KanjiExample { word: "政治".into(), reading: "せいじ".into(), meaning: "Politik".into() },
                KanjiExample { word: "政府".into(), reading: "せいふ".into(), meaning: "Pemerintah".into() },
                KanjiExample { word: "政策".into(), reading: "せいさく".into(), meaning: "Kebijakan politik".into() },
            ],
        },
        Kanji {
            character: "治".into(), onyomi: vec!["ジ".into(), "チ".into()], kunyomi: vec!["おさ(める)".into(), "なお(る)".into()],
            meaning: vec!["Memerintah / Menyembuhkan".into(), "Govern / Cure".into()], jlpt_level: "N3".into(), stroke_count: 8,
            stroke_steps: vec![
                "1-3. Tulis 3 percikan air (sanzui 氵) di sebelah kiri dari atas ke bawah.".into(),
                "4. Garis miring di kanan atas.".into(),
                "5. Garis horizontal-tekuk kanan.".into(),
                "6-8. Tulis kotak mulut (口) di kanan bawah.".into(),
            ],
            radical: "水 (Sanzui 氵)".into(),
            examples: vec![
                KanjiExample { word: "治療".into(), reading: "ちりょう".into(), meaning: "Pengobatan medis".into() },
                KanjiExample { word: "自治".into(), reading: "じち".into(), meaning: "Otonomi daerah".into() },
                KanjiExample { word: "治る".into(), reading: "なおる".into(), meaning: "Sembuh dari sakit".into() },
            ],
        },
        Kanji {
            character: "経".into(), onyomi: vec!["ケイ".into(), "キョウ".into()], kunyomi: vec!["へ(る)".into()],
            meaning: vec!["Melewati / Mengelola / Ekonomi".into(), "Pass through / Manage".into()], jlpt_level: "N3".into(), stroke_count: 11,
            stroke_steps: vec![
                "1-6. Tulis radikal benang (糸) di sisi kiri secara proporsional.".into(),
                "7-11. Tulis komponen kanan dari atas ke bawah.".into(),
            ],
            radical: "糸 (Ito)".into(),
            examples: vec![
                KanjiExample { word: "経済".into(), reading: "けいざい".into(), meaning: "Ekonomi".into() },
                KanjiExample { word: "経験".into(), reading: "けいけん".into(), meaning: "Pengalaman".into() },
                KanjiExample { word: "経営".into(), reading: "けいえい".into(), meaning: "Manajemen bisnis".into() },
            ],
        },
        Kanji {
            character: "済".into(), onyomi: vec!["サイ".into(), "セイ".into()], kunyomi: vec!["す(む)".into()],
            meaning: vec!["Selesai / Menyelamatkan".into(), "Settle / Finish".into()], jlpt_level: "N3".into(), stroke_count: 11,
            stroke_steps: vec![
                "1-3. Tulis radikal air (氵) di sebelah kiri.".into(),
                "4-6. Tulis mahkota atas di sebelah kanan.".into(),
                "7-11. Tulis komponen bulan/dasar di kanan bawah.".into(),
            ],
            radical: "水 (Sanzui 氵)".into(),
            examples: vec![
                KanjiExample { word: "返済".into(), reading: "へんさい".into(), meaning: "Pelunasan utang".into() },
                KanjiExample { word: "救済".into(), reading: "きゅうさい".into(), meaning: "Bantuan / Penyelamatan".into() },
                KanjiExample { word: "済む".into(), reading: "すむ".into(), meaning: "Sudah selesai".into() },
            ],
        },
        Kanji {
            character: "認".into(), onyomi: vec!["ニン".into()], kunyomi: vec!["みと(める)".into()],
            meaning: vec!["Mengakui / Menyetujui".into(), "Recognize / Approve".into()], jlpt_level: "N3".into(), stroke_count: 14,
            stroke_steps: vec![
                "1-7. Tulis radikal kata/bicara (言) di sisi kiri.".into(),
                "8-10. Tulis mata pisau (刃) di kanan atas.".into(),
                "11-14. Tulis hati (心) di kanan bawah.".into(),
            ],
            radical: "言 (Gonben)".into(),
            examples: vec![
                KanjiExample { word: "確認".into(), reading: "かくにん".into(), meaning: "Konfirmasi / Pengecekan".into() },
                KanjiExample { word: "認識".into(), reading: "にんしき".into(), meaning: "Kesadaran / Persepsi".into() },
                KanjiExample { word: "認める".into(), reading: "みとめる".into(), meaning: "Mengakui / Menyetujui".into() },
            ],
        },
        Kanji {
            character: "識".into(), onyomi: vec!["シキ".into()], kunyomi: vec![],
            meaning: vec!["Pengetahuan / Mengenal".into(), "Knowledge / Discern".into()], jlpt_level: "N3".into(), stroke_count: 19,
            stroke_steps: vec![
                "1-7. Tulis radikal kata (言) di sisi kiri.".into(),
                "8-19. Tulis komponen kanan (戠) secara bertahap dari atas ke bawah.".into(),
            ],
            radical: "言 (Gonben)".into(),
            examples: vec![
                KanjiExample { word: "知識".into(), reading: "ちしき".into(), meaning: "Pengetahuan / Wawasan".into() },
                KanjiExample { word: "常識".into(), reading: "じょうしき".into(), meaning: "Akal sehat / Common sense".into() },
                KanjiExample { word: "意識".into(), reading: "いしき".into(), meaning: "Kesadaran diri".into() },
            ],
        },
        Kanji {
            character: "環".into(), onyomi: vec!["カン".into()], kunyomi: vec!["わ".into()],
            meaning: vec!["Lingkaran / Cincin / Sekitar".into(), "Ring / Circle / Surround".into()], jlpt_level: "N3".into(), stroke_count: 17,
            stroke_steps: vec![
                "1-4. Tulis radikal permata/raja (王) di sebelah kiri.".into(),
                "5-17. Tulis komponen mata dan lingkaran di sebelah kanan secara berurutan.".into(),
            ],
            radical: "玉 (Tama / Ou)".into(),
            examples: vec![
                KanjiExample { word: "環境".into(), reading: "かんきょう".into(), meaning: "Lingkungan hidup".into() },
                KanjiExample { word: "循環".into(), reading: "じゅんかん".into(), meaning: "Sirkulasi / Daur ulang".into() },
                KanjiExample { word: "環状線".into(), reading: "かんじょうせん".into(), meaning: "Jalur lingkar".into() },
            ],
        },
        Kanji {
            character: "境".into(), onyomi: vec!["キョウ".into(), "ケイ".into()], kunyomi: vec!["さかい".into()],
            meaning: vec!["Batas / Perbatasan".into(), "Boundary / Border".into()], jlpt_level: "N3".into(), stroke_count: 14,
            stroke_steps: vec![
                "1-3. Tulis radikal tanah (土) di sebelah kiri.".into(),
                "4-8. Tulis komponen berdiri (立) di kanan atas.".into(),
                "9-14. Tulis komponen melihat (見) di kanan bawah.".into(),
            ],
            radical: "土 (Tsuchi)".into(),
            examples: vec![
                KanjiExample { word: "国境".into(), reading: "こっきょう".into(), meaning: "Perbatasan negara".into() },
                KanjiExample { word: "境目".into(), reading: "さかいめ".into(), meaning: "Garis batas pemisah".into() },
            ],
        },
        Kanji {
            character: "感".into(), onyomi: vec!["カン".into()], kunyomi: vec![],
            meaning: vec!["Perasaan / Kesan".into(), "Feeling / Emotion".into()], jlpt_level: "N3".into(), stroke_count: 13,
            stroke_steps: vec![
                "1-9. Tulis komponen tombak/tanggapan di bagian atas.".into(),
                "10-13. Tulis hati (心) menopang di bagian paling bawah.".into(),
            ],
            radical: "心 (Kokoro)".into(),
            examples: vec![
                KanjiExample { word: "感情".into(), reading: "かんじょう".into(), meaning: "Emosi / Perasaan".into() },
                KanjiExample { word: "感動".into(), reading: "かんどう".into(), meaning: "Terharu / Tersentuh".into() },
                KanjiExample { word: "感謝".into(), reading: "かんしゃ".into(), meaning: "Rasa terima kasih".into() },
            ],
        },
        Kanji {
            character: "情".into(), onyomi: vec!["ジョウ".into(), "セイ".into()], kunyomi: vec!["なさ(け)".into()],
            meaning: vec!["Informasi / Kasih sayang".into(), "Condition / Emotion".into()], jlpt_level: "N3".into(), stroke_count: 11,
            stroke_steps: vec![
                "1-3. Tulis radikal hati berdiri (risshinben 忄) di sisi kiri.".into(),
                "4-11. Tulis komponen biru (青) di sisi kanan dari atas ke bawah.".into(),
            ],
            radical: "心 (Risshinben 忄)".into(),
            examples: vec![
                KanjiExample { word: "情報".into(), reading: "じょうほう".into(), meaning: "Informasi / Berita".into() },
                KanjiExample { word: "友情".into(), reading: "ゆうじょう".into(), meaning: "Persahabatan".into() },
                KanjiExample { word: "表情".into(), reading: "ひょうじょう".into(), meaning: "Ekspresi wajah".into() },
            ],
        },
    ]
}
