import json
import os

code = '''use crate::models::{GrammarExample, GrammarPattern, KaiwaDialog, MinnaLesson, ParticleGuide};

pub fn get_all_lessons() -> Vec<MinnaLesson> {
    vec![
        // ==================== BAB 1 ====================
        MinnaLesson {
            chapter: 1,
            title: "Bab 1: Perkenalan Diri & Pola Dasar です".into(),
            subtitle: "Watashi wa Miraa desu (Saya adalah Miller)".into(),
            summary: "Mempelajari cara memperkenalkan diri, menyatakan identitas, pekerjaan, kebangsaan, dan membuat kalimat tanya serta sanggahan.".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "N1 は N2 です".into(),
                    meaning: "N1 adalah N2".into(),
                    explanation: "Partikel は (dibaca 'wa') berfungsi sebagai penanda topik pembicaraan. です diletakkan di akhir untuk memberikan nuansa sopan dan tegas.".into(),
                    examples: vec![
                        GrammarExample { japanese: "わたしはマイク・ミラーです。".into(), romaji: "Watashi wa Maiku Miraa desu.".into(), indonesian: "Saya adalah Mike Miller.".into() },
                        GrammarExample { japanese: "サントスさんは会社員です。".into(), romaji: "Santosu-san wa kaishain desu.".into(), indonesian: "Tuan Santos adalah seorang karyawan perusahaan.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "N1 は N2 じゃ（ではありません）".into(),
                    meaning: "N1 bukan N2 (Bentuk Negatif)".into(),
                    explanation: "Bentuk negatif dari です. じゃありません lebih sering digunakan dalam percakapan santai-sopan, sedangkan ではありません lebih formal dalam penulisan.".into(),
                    examples: vec![
                        GrammarExample { japanese: "サントスさんは学生じゃありません。".into(), romaji: "Santosu-san wa gakusei ja arimasen.".into(), indonesian: "Tuan Santos bukan seorang mahasiswa.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "S ですか".into(),
                    meaning: "Apakah S? (Kalimat Tanya)".into(),
                    explanation: "Partikel か diletakkan di akhir kalimat untuk mengubah kalimat menjadi pertanyaan tanpa perlu mengubah urutan kata.".into(),
                    examples: vec![
                        GrammarExample { japanese: "ミラーさんはアメリカ人ですか。".into(), romaji: "Miraa-san wa amerikajin desu ka.".into(), indonesian: "Apakah Tuan Miller orang Amerika?".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "佐藤 (Sato)".into(), japanese: "おはようございます。".into(), romaji: "Ohayou gozaimasu.".into(), indonesian: "Selamat pagi.".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "初めまして、マイク・ミラーです。どうぞよろしく。".into(), romaji: "Hajimemashite, Maiku Miraa desu. Douzo yoroshiku.".into(), indonesian: "Senang bertemu, saya Mike Miller. Mohon bimbingannya.".into() },
            ],
        },

        // ==================== BAB 2 ====================
        MinnaLesson {
            chapter: 2,
            title: "Bab 2: Menunjuk Benda これ・それ・あれ".into(),
            subtitle: "Kore wa hon desu (Ini adalah buku)".into(),
            summary: "Mempelajari kata tunjuk benda berdasarkan jarak dari pembicara dan lawan bicara, serta partikel の untuk kepemilikan.".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "これ / それ / あれ は N です".into(),
                    meaning: "Ini / Itu / Itu (jauh) adalah N".into(),
                    explanation: "これ (dekat pembicara), それ (dekat lawan bicara), あれ (jauh dari kedua pembicara).".into(),
                    examples: vec![
                        GrammarExample { japanese: "これは辞書です。".into(), romaji: "Kore wa jisho desu.".into(), indonesian: "Ini adalah kamus.".into() },
                        GrammarExample { japanese: "あれはコンピューターです。".into(), romaji: "Are wa konpyuutaa desu.".into(), indonesian: "Itu (di sana) adalah komputer.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "この / その / あの N は ... です".into(),
                    meaning: "N ini / N itu adalah ...".into(),
                    explanation: "Kata tunjuk yang langsung menempel pada kata benda (harus diikuti kata benda).".into(),
                    examples: vec![
                        GrammarExample { japanese: "この本はわたしのです。".into(), romaji: "Kono hon wa watashi no desu.".into(), indonesian: "Buku ini adalah milik saya.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "N1 の N2".into(),
                    meaning: "N2 milik N1 / N2 tentang N1".into(),
                    explanation: "Partikel の menghubungkan dua kata benda untuk menyatakan kepemilikan atau isi materi.".into(),
                    examples: vec![
                        GrammarExample { japanese: "これは自動車の本です。".into(), romaji: "Kore wa jidousha no hon desu.".into(), indonesian: "Ini adalah buku tentang mobil.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "山田 (Yamada)".into(), japanese: "それは何ですか。".into(), romaji: "Sore wa nan desu ka.".into(), indonesian: "Itu apa?".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "これは日本の傘です。どうぞ。".into(), romaji: "Kore wa nihon no kasa desu. Douzo.".into(), indonesian: "Ini adalah payung Jepang. Silakan (terimalah).".into() },
            ],
        },

        // ==================== BAB 3 ====================
        MinnaLesson {
            chapter: 3,
            title: "Bab 3: Menunjuk Tempat ここ・そこ・あそこ".into(),
            subtitle: "Koko wa kyoushitsu desu (Di sini adalah ruang kelas)".into(),
            summary: "Mempelajari kata tunjuk lokasi/tempat, menanyakan keberadaan ruangan, lantai gedung, dan asal negara/perusahaan.".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "ここ / そこ / あそこ は N です".into(),
                    meaning: "Di sini / Di situ / Di sana adalah N (Tempat)".into(),
                    explanation: "Menunjuk lokasi fisik: ここ (dekat pembicara), そこ (dekat lawan bicara), あそこ (jauh dari keduanya).".into(),
                    examples: vec![
                        GrammarExample { japanese: "ここは受付です。".into(), romaji: "Koko wa uketsuke desu.".into(), indonesian: "Di sini adalah meja resepsionis.".into() },
                        GrammarExample { japanese: "お手洗いはあそこです。".into(), romaji: "Otearai wa asoko desu.".into(), indonesian: "Toilet ada di sebelah sana.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "N は どこ / どちら ですか".into(),
                    meaning: "N ada di mana? (Sopan)".into(),
                    explanation: "どこ menanyakan tempat secara umum, どちら adalah bentuk yang lebih sopan dan bisa menanyakan arah serta nama institusi.".into(),
                    examples: vec![
                        GrammarExample { japanese: "エレベーターはどちらですか。".into(), romaji: "Erebeetaa wa dochira desu ka.".into(), indonesian: "Lift ada di sebelah mana?".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "マリア (Maria)".into(), japanese: "すみません、事務所はどこですか。".into(), romaji: "Sumimasen, jimusho wa doko desu ka.".into(), indonesian: "Permisi, kantor ada di mana?".into() },
                KaiwaDialog { speaker: "店員 (Petugas)".into(), japanese: "あちらです。２階にあります。".into(), romaji: "Achira desu. Ni-kai ni arimasu.".into(), indonesian: "Di sebelah sana. Ada di lantai 2.".into() },
            ],
        },

        // ==================== BAB 4 ====================
        MinnaLesson {
            chapter: 4,
            title: "Bab 4: Waktu, Jam, & Kata Kerja Bentuk ます".into(),
            subtitle: "Ima nan-ji desu ka (Sekarang jam berapa?)".into(),
            summary: "Menyatakan waktu jam & menit, hari kerja, rentang waktu から〜まで, dan bentuk lampau/negatif kata kerja ます.".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "いま 〜時 〜分 です".into(),
                    meaning: "Sekarang jam ~ lewat ~ menit".into(),
                    explanation: "Pola menyatakan waktu saat ini.".into(),
                    examples: vec![
                        GrammarExample { japanese: "いま午前９時半です。".into(), romaji: "Ima gozen kuji han desu.".into(), indonesian: "Sekarang jam 9:30 pagi.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V-ます / V-ません / V-ました / V-ませんでした".into(),
                    meaning: "Bentuk Kalimat Kerja (Sekarang / Negatif / Lampau)".into(),
                    explanation: "Konjugasi sopan dasar kata kerja bahasa Jepang.".into(),
                    examples: vec![
                        GrammarExample { japanese: "毎朝６時に起きます。".into(), romaji: "Maiasa rokuji ni okimasu.".into(), indonesian: "Setiap pagi saya bangun pada jam 6.".into() },
                        GrammarExample { japanese: "きのう勉強しませんでした。".into(), romaji: "Kinou benkyou shimasen deshita.".into(), indonesian: "Kemarin saya tidak belajar.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "〜から 〜まで".into(),
                    meaning: "Dari ~ sampai ~".into(),
                    explanation: "Menandai titik awal dan batas akhir waktu atau tempat.".into(),
                    examples: vec![
                        GrammarExample { japanese: "銀行は９時から３時までです。".into(), romaji: "Ginkou wa kuji kara sanji made desu.".into(), indonesian: "Bank buka dari jam 9 sampai jam 3.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "美術館は何時から何時までですか。".into(), romaji: "Bijutsukan wa nanji kara nanji made desu ka.".into(), indonesian: "Museum seni buka dari jam berapa sampai jam berapa?".into() },
                KaiwaDialog { speaker: "案内係 (Informasi)".into(), japanese: "９時から午後４時半までです。月曜日は休みです。".into(), romaji: "Kuji kara gogo yoji han made desu. Getsuyoubi wa yasumi desu.".into(), indonesian: "Dari jam 9 sampai jam 4:30 sore. Hari Senin libur.".into() },
            ],
        },

        // ==================== BAB 5 ====================
        MinnaLesson {
            chapter: 5,
            title: "Bab 5: Perpindahan & Sarana 行きます・来ます・帰ります".into(),
            subtitle: "Kyoto e ikimasu (Pergi ke Kyoto)".into(),
            summary: "Menyatakan arah tujuan pergerakan dengan partikel へ, sarana transportasi dengan で, dan bepergian bersama dengan と.".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "N (Tempat) へ 行きます / 来ます / 帰ります".into(),
                    meaning: "Pergi / Datang / Pulang ke N".into(),
                    explanation: "Partikel へ (dilafalkan 'e') menandai arah tujuan pergerakan.".into(),
                    examples: vec![
                        GrammarExample { japanese: "来週京都へ行きます。".into(), romaji: "Raishuu Kyouto e ikimasu.".into(), indonesian: "Minggu depan saya akan pergi ke Kyoto.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "N (Kendaraan) で 行きます".into(),
                    meaning: "Pergi dengan naik N (Sarana)".into(),
                    explanation: "Partikel で menandai sarana transportasi. Jika berjalan kaki gunakan 歩いて (aruite) tanpa partikel で.".into(),
                    examples: vec![
                        GrammarExample { japanese: "新幹線で東京へ行きます。".into(), romaji: "Shinkansen de Toukyou e ikimasu.".into(), indonesian: "Pergi ke Tokyo naik Shinkansen.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "N (Orang) と 行きます".into(),
                    meaning: "Pergi bersama N".into(),
                    explanation: "Partikel と menandai rekan yang menyertai suatu aktivitas.".into(),
                    examples: vec![
                        GrammarExample { japanese: "友達と日本へ来ました。".into(), romaji: "Tomodachi to Nihon e kimashita.".into(), indonesian: "Datang ke Jepang bersama teman.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "佐藤 (Sato)".into(), japanese: "日曜日どこへ行きましたか。".into(), romaji: "Nichiyoubi doko e ikimashita ka.".into(), indonesian: "Hari Minggu pergi ke mana?".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "奈良へ行きました。友達と車で行きました。".into(), romaji: "Nara e ikimashita. Tomodachi to kuruma de ikimashita.".into(), indonesian: "Pergi ke Nara. Pergi naik mobil bersama teman.".into() },
            ],
        },

        // ==================== BAB 6 ====================
        MinnaLesson {
            chapter: 6,
            title: "Bab 6: Tindakan Transitif & Ajakan を・ませんか・ましょう".into(),
            subtitle: "Gohan o tabemasu (Makan nasi)".into(),
            summary: "Mempelajari objek langsung dengan partikel を, tempat kejadian aktif dengan で, dan pola ajakan santun V-ませんか serta V-ましょう.".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "N を V-ます".into(),
                    meaning: "Melakukan V terhadap objek N".into(),
                    explanation: "Partikel を (dilafalkan 'o') menandai objek langsung penderita tindakan kata kerja transitif.".into(),
                    examples: vec![
                        GrammarExample { japanese: "パンを食べます。水を飲みます。".into(), romaji: "Pan o tabemasu. Mizu o nomimasu.".into(), indonesian: "Makan roti. Minum air.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "N (Tempat) で V-ます".into(),
                    meaning: "Melakukan kegiatan V di tempat N".into(),
                    explanation: "Partikel で menandai tempat terjadinya suatu aktivitas fisik yang aktif.".into(),
                    examples: vec![
                        GrammarExample { japanese: "図書館で日本語を勉強します。".into(), romaji: "Toshokan de nihongo o benkyou shimasu.".into(), indonesian: "Belajar bahasa Jepang di perpustakaan.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V-ませんか / V-ましょう".into(),
                    meaning: "Maukah Anda V? / Ayo kita V!".into(),
                    explanation: "V-ませんか adalah ajakan sopan mempertimbangkan persetujuan lawan bicara. V-ましょう adalah ajakan tegas penuh antusiasme.".into(),
                    examples: vec![
                        GrammarExample { japanese: "いっしょに京都へ行きませんか。".into(), romaji: "Isshoni Kyouto e ikimasen ka.".into(), indonesian: "Maukah Anda pergi ke Kyoto bersama-sama?".into() },
                        GrammarExample { japanese: "ええ、行きましょう！".into(), romaji: "Ee, ikimashou!".into(), indonesian: "Ya, ayo kita pergi!".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "いっしょにお昼ごはんを食べませんか。".into(), romaji: "Isshoni ohiru gohan o tabemasen ka.".into(), indonesian: "Maukah makan siang bersama?".into() },
                KaiwaDialog { speaker: "佐藤 (Sato)".into(), japanese: "いいですね。駅前のラーメン屋へ行きましょう。".into(), romaji: "Ii desu ne. Ekimae no raamenya e ikimashou.".into(), indonesian: "Bagus sekali. Ayo pergi ke kedai ramen depan stasiun.".into() },
            ],
        },

        // ==================== BAB 7 ====================
        MinnaLesson {
            chapter: 7,
            title: "Bab 7: Alat, Sarana & Pemberian あげます・もらいます".into(),
            subtitle: "Hashi de tabemasu (Makan dengan sumpit)".into(),
            summary: "Menggunakan alat/bahasa dengan partikel で, memberi (あげます), menerima (もらいます), serta sudah melakukan (もう〜ました).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "N (Alat/Bahasa) で V-ます".into(),
                    meaning: "Melakukan V dengan sarana/alat N".into(),
                    explanation: "Partikel で menunjukkan alat tulis, perkakas, atau bahasa yang digunakan.".into(),
                    examples: vec![
                        GrammarExample { japanese: "箸でご飯を食べます。".into(), romaji: "Hashi de gohan o tabemasu.".into(), indonesian: "Makan nasi dengan sumpit.".into() },
                        GrammarExample { japanese: "日本語でレポートを書きます。".into(), romaji: "Nihongo de repooto o kakimasu.".into(), indonesian: "Menulis laporan dalam bahasa Jepang.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "N (Orang) に あげます / もらいます".into(),
                    meaning: "Memberi kepada N / Menerima dari N".into(),
                    explanation: "あげます: subjek memberi hadiah kepada orang lain (に). もらいます: subjek menerima dari orang lain (に / から).".into(),
                    examples: vec![
                        GrammarExample { japanese: "わたしは母に花をあげました。".into(), romaji: "Watashi wa haha ni hana o agemashita.".into(), indonesian: "Saya memberi bunga kepada ibu.".into() },
                        GrammarExample { japanese: "友達にプレゼントをもらいました。".into(), romaji: "Tomodachi ni purezento o moraimashita.".into(), indonesian: "Menerima kado dari teman.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "もう V-ました / まだ V-ていません".into(),
                    meaning: "Sudah V / Belum V".into(),
                    explanation: "Menyatakan apakah suatu tindakan sudah tuntas dilakukan atau belum.".into(),
                    examples: vec![
                        GrammarExample { japanese: "もう荷物を送りましたか。はい、送りました。".into(), romaji: "Mou nimotsu o okurimashita ka. Hai, okurimashita.".into(), indonesian: "Apakah sudah mengirim paket? Ya, sudah kirim.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "山田 (Yamada)".into(), japanese: "そのネクタイ、すてきですね。".into(), romaji: "Sono nekutai, suteki desu ne.".into(), indonesian: "Dasi itu bagus sekali ya.".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "ありがとうございます。誕生日に父にもらいました。".into(), romaji: "Arigatou gozaimasu. Tanjoubi ni chichi ni moraimashita.".into(), indonesian: "Terima kasih. Saya mendapatkannya dari ayah pada hari ulang tahun.".into() },
            ],
        },

        // ==================== BAB 8 ====================
        MinnaLesson {
            chapter: 8,
            title: "Bab 8: Kata Sifat い・な (Adjectives)".into(),
            subtitle: "Fujisan wa takai desu (Gunung Fuji tinggi)".into(),
            summary: "Menguasai 2 golongan kata sifat: Kata Sifat-i (い形容詞) dan Kata Sifat-na (な形容詞), bentuk negatif, serta memodifikasi kata benda.".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "Kata Sifat-i: 〜いです / 〜くないです".into(),
                    meaning: "Sifat (Positif) / Tidak Sifat (Negatif)".into(),
                    explanation: "Kata sifat berakhiran 'i'. Bentuk negatif: buang huruf 'i' terakhir lalu ganti dengan 'kunaidesu'.".into(),
                    examples: vec![
                        GrammarExample { japanese: "日本の食べ物はおいしいですが、高いです。".into(), romaji: "Nihon no tabemono wa oishii desu ga, takai desu.".into(), indonesian: "Makanan Jepang enak, tetapi mahal.".into() },
                        GrammarExample { japanese: "今日はあまり寒くないです。".into(), romaji: "Kyou wa amari samukunai desu.".into(), indonesian: "Hari ini tidak begitu dingin.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "Kata Sifat-na: 〜です / 〜じゃありません".into(),
                    meaning: "Sifat-na (Positif / Negatif)".into(),
                    explanation: "Dalam kalimat predikat berperilaku seperti kata benda (memakai desu / ja arimasen). Saat menerangkan kata benda, wajib memakai 'na'.".into(),
                    examples: vec![
                        GrammarExample { japanese: "この町はとても静かです。".into(), romaji: "Kono machi wa totemo shizuka desu.".into(), indonesian: "Kota ini sangat tenang.".into() },
                        GrammarExample { japanese: "奈良は静かな町です。".into(), romaji: "Nara wa shizuka na machi desu.".into(), indonesian: "Nara adalah kota yang tenang.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "マリア (Maria)".into(), japanese: "日本の生活はどうですか。".into(), romaji: "Nihon no seikatsu wa dou desu ka.".into(), indonesian: "Bagaimana kehidupan di Jepang?".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "毎日とても忙しいですが、おもしろいです。".into(), romaji: "Mainichi totemo isogashii desu ga, omoshiroi desu.".into(), indonesian: "Setiap hari sangat sibuk, tapi menarik.".into() },
            ],
        },

        // ==================== BAB 9 ====================
        MinnaLesson {
            chapter: 9,
            title: "Bab 9: Kesukaan, Kemampuan & Alasan が・から".into(),
            subtitle: "Nihongo ga wakarimasu (Saya mengerti bahasa Jepang)".into(),
            summary: "Menyatakan kesukaan (好き), ketidaksukaan (嫌い), kemahiran (上手), kepemilikan abstrak (あります), dan alasan sebab-akibat (〜から).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "N が 好きです / 嫌いです / 上手です / 下手です".into(),
                    meaning: "Suka / Tidak Suka / Pandai / Lemah dalam N".into(),
                    explanation: "Kata sifat psikologis dan kemampuan memerlukan partikel が untuk menandai targetnya.".into(),
                    examples: vec![
                        GrammarExample { japanese: "わたしはイタリア料理が好きです。".into(), romaji: "Watashi wa itaria ryouri ga suki desu.".into(), indonesian: "Saya menyukai masakan Italia.".into() },
                        GrammarExample { japanese: "サントスさんはサッカーが上手です。".into(), romaji: "Santosu-san wa sakkaa ga jouzu desu.".into(), indonesian: "Tuan Santos pandai bermain sepak bola.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "N が わかります / あります".into(),
                    meaning: "Mengerti N / Mempunyai N".into(),
                    explanation: "Kata kerja keadaan memerlukan partikel が bukan を.".into(),
                    examples: vec![
                        GrammarExample { japanese: "ひらがなが少しわかります。".into(), romaji: "Hiragana ga sukoshi wakarimasu.".into(), indonesian: "Saya sedikit mengerti huruf Hiragana.".into() },
                        GrammarExample { japanese: "今日はお金がありません。".into(), romaji: "Kyou wa okane ga arimasen.".into(), indonesian: "Hari ini saya tidak ada uang.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "Alasan から、Akibat".into(),
                    meaning: "Karena Alasan, maka Akibat".into(),
                    explanation: "Partikel から di akhir anak kalimat menyatakan sebab atau pertimbangan logis.".into(),
                    examples: vec![
                        GrammarExample { japanese: "時間がありませんから、タクシーで行きましょう。".into(), romaji: "Jikan ga arimasen kara, takushii de ikimashou.".into(), indonesian: "Karena tidak ada waktu, ayo pergi naik taksi.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "木村 (Kimura)".into(), japanese: "カラオケが好きですか。".into(), romaji: "Karaoke ga suki desu ka.".into(), indonesian: "Apakah Anda suka karaoke?".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "ええ、大好きです。でも、歌はあまり上手じゃありません。".into(), romaji: "Ee, daisuki desu. Demo, uta wa amari jouzu ja arimasen.".into(), indonesian: "Ya, sangat suka. Tapi, menyanyi saya tidak begitu pandai.".into() },
            ],
        },

        // ==================== BAB 10 ====================
        MinnaLesson {
            chapter: 10,
            title: "Bab 10: Keberadaan Benda & Makhluk あります・います".into(),
            subtitle: "Tsukue no ue ni hon ga arimasu (Di atas meja ada buku)".into(),
            summary: "Membedakan keberadaan benda mati (あります) dengan makhluk hidup bernyawa (います), serta posisi ruang (atas, bawah, dalam, luar, dll).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "Tempat に Benda が あります / Makhluk が います".into(),
                    meaning: "Di (Tempat) ada (Benda / Orang / Hewan)".into(),
                    explanation: "あります untuk tumbuhan, benda mati, gedung. います untuk manusia, hewan peliharaan, dan serangga.".into(),
                    examples: vec![
                        GrammarExample { japanese: "部屋にテレビがあります。".into(), romaji: "Heya ni terebi ga arimasu.".into(), indonesian: "Di dalam kamar ada televisi.".into() },
                        GrammarExample { japanese: "庭に犬と猫がいます。".into(), romaji: "Niwa ni inu to neko ga imasu.".into(), indonesian: "Di halaman ada anjing dan kucing.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "N1 の Posisi に N2 が あります / います".into(),
                    meaning: "Di (posisi) N1 ada N2".into(),
                    explanation: "Posisi ruang: 上 (ue-atas), 下 (shita-bawah), 前 (mae-depan), 後ろ (ushiro-belakang), 中 (naka-dalam), 隣 (tonari-sebelah).".into(),
                    examples: vec![
                        GrammarExample { japanese: "机の上に写真があります。".into(), romaji: "Tsukue no ue ni shashin ga arimasu.".into(), indonesian: "Di atas meja ada foto.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "男 (Pria)".into(), japanese: "すみません、コンビニはどこにありますか。".into(), romaji: "Sumimasen, konbini wa doko ni arimasu ka.".into(), indonesian: "Permisi, minimarket ada di mana ya?".into() },
                KaiwaDialog { speaker: "女 (Wanita)".into(), japanese: "あそこのビルの隣にありますよ。".into(), romaji: "Asoko no biru no tonari ni arimasu yo.".into(), indonesian: "Ada di sebelah gedung di sana itu lho.".into() },
            ],
        },

        // ==================== BAB 11 ====================
        MinnaLesson {
            chapter: 11,
            title: "Bab 11: Kata Bilangan & Satuan Penghitung (助数詞)".into(),
            subtitle: "Ringo o mittsu kaimashita (Membeli 3 buah apel)".into(),
            summary: "Menghitung benda umum (ひとつ、ふたつ), satuan lembar (~まい), batang (~ほん), unit (~だい), orang (~にん), dan durasi rentang waktu.".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "N を Bilangan + Satuan V-ます".into(),
                    meaning: "Melakukan V sebanyak [Jumlah]".into(),
                    explanation: "Kata bilangan berposisi tepat di depan kata kerja tanpa partikel tambahan.".into(),
                    examples: vec![
                        GrammarExample { japanese: "切手を５枚買いました。".into(), romaji: "Kitte o go-mai kaimashita.".into(), indonesian: "Saya membeli 5 lembar prangko.".into() },
                        GrammarExample { japanese: "りんごを３つ食べました。".into(), romaji: "Ringo o mittsu tabemashita.".into(), indonesian: "Saya memakan 3 buah apel.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "Periode に 〜回 V-ます".into(),
                    meaning: "Melakukan V sebanyak ~ kali dalam kurun waktu".into(),
                    explanation: "Menyatakan frekuensi pengulangan rutinitas.".into(),
                    examples: vec![
                        GrammarExample { japanese: "１か月に２回映画を見ます。".into(), romaji: "Ikkagetsu ni ni-kai eiga o mimasu.".into(), indonesian: "Menonton film 2 kali dalam sebulan.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "客 (Pelanggan)".into(), japanese: "すみません、サンドイッチを２つとコーヒーを１つください。".into(), romaji: "Sumimasen, sandoicchi o futatsu to koohii o hitotsu kudasai.".into(), indonesian: "Permisi, tolong beri saya 2 roti lapis dan 1 kopi.".into() },
                KaiwaDialog { speaker: "店員 (Pelayan)".into(), japanese: "かしこまりました。少々お待ちください。".into(), romaji: "Kashikomarimashita. Shou-shou omachi kudasai.".into(), indonesian: "Baik, dimengerti. Mohon tunggu sebentar.".into() },
            ],
        },

        // ==================== BAB 12 ====================
        MinnaLesson {
            chapter: 12,
            title: "Bab 12: Lampau Kata Sifat & Perbandingan より・一番".into(),
            subtitle: "Kinou wa ame deshita (Kemarin hujan)".into(),
            summary: "Bentuk lampau kata sifat, komparatif dua hal (A のほうが B より), dan superlatif terbaik di antara semuanya (いちばん).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "Kata Sifat Lampau: 〜かったです / 〜でした".into(),
                    meaning: "Bentuk Lampau Kata Sifat & Nomina".into(),
                    explanation: "Sifat-i lampau: 〜かったです (negatif: 〜くなかったです). Sifat-na lampau: 〜でした (negatif: 〜じゃありませんでした).".into(),
                    examples: vec![
                        GrammarExample { japanese: "きのうのパーティーはとても楽しかったです。".into(), romaji: "Kinou no paatii wa totemo tanoshikatta desu.".into(), indonesian: "Pesta kemarin sangat menyenangkan.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "N1 は N2 より Sifat です".into(),
                    meaning: "N1 lebih Sifat daripada N2".into(),
                    explanation: "Partikel より berarti 'daripada' sebagai titik acuan pembanding.".into(),
                    examples: vec![
                        GrammarExample { japanese: "新幹線は飛行機より安いです。".into(), romaji: "Shinkansen wa hikouki yori yasui desu.".into(), indonesian: "Shinkansen lebih murah daripada pesawat terbang.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "Kelompok の中で [Apa/Siapa] が いちばん Sifat ですか".into(),
                    meaning: "Di antara (Kelompok), apa yang paling Sifat?".into(),
                    explanation: "Pola superlatif untuk mencari pilihan nomor satu dalam satu kategori.".into(),
                    examples: vec![
                        GrammarExample { japanese: "１年の中で春がいちばん好きです。".into(), romaji: "Ichinen no naka de haru ga ichiban suki desu.".into(), indonesian: "Di dalam satu tahun, saya paling menyukai musim semi.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "カリナ (Karina)".into(), japanese: "京都と奈良と、どちらがおもしろいですか。".into(), romaji: "Kyouto to Nara to, dochira ga omoshiroi desu ka.".into(), indonesian: "Antara Kyoto dan Nara, mana yang lebih menarik?".into() },
                KaiwaDialog { speaker: "山田 (Yamada)".into(), japanese: "京都のほうがおもしろいです。お寺が多いですから。".into(), romaji: "Kyouto no hou ga omoshiroi desu. Otera ga ooi desu kara.".into(), indonesian: "Kyoto lebih menarik. Karena kuilnya banyak.".into() },
            ],
        },

        // ==================== BAB 13 ====================
        MinnaLesson {
            chapter: 13,
            title: "Bab 13: Keinginan 欲しい・〜たい & Tujuan Pergi に行く".into(),
            subtitle: "Nihon e ikitai desu (Saya ingin pergi ke Jepang)".into(),
            summary: "Menyatakan keinginan memiliki benda (欲しい), keinginan beraktivitas (〜たい), dan pergi ke suatu tempat demi tujuan tertentu (〜に行く).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "N が 欲しいです".into(),
                    meaning: "Saya menginginkan N (Benda)".into(),
                    explanation: "Hanya untuk keinginan orang pertama (pembicara) terhadap suatu barang kepemilikan.".into(),
                    examples: vec![
                        GrammarExample { japanese: "いま新しいパソコンが欲しいです。".into(), romaji: "Ima atarashii pasokon ga hoshii desu.".into(), indonesian: "Sekarang saya menginginkan laptop baru.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V-ます stem + たいです".into(),
                    meaning: "Ingin melakukan V".into(),
                    explanation: "Ganti akhiran ます dengan たい. Partikel objek を bisa berubah menjadi が.".into(),
                    examples: vec![
                        GrammarExample { japanese: "日本へ桜を見に行きたいです。".into(), romaji: "Nihon e sakura o mi ni ikitai desu.".into(), indonesian: "Saya ingin pergi ke Jepang untuk melihat bunga sakura.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "Tempat へ V-stem に 行きます / 来ます".into(),
                    meaning: "Pergi / Datang ke (Tempat) untuk tujuan V".into(),
                    explanation: "Partikel に di sini menyatakan tujuan dari pergerakan pergi atau datang.".into(),
                    examples: vec![
                        GrammarExample { japanese: "デパートへ買い物に行きます。".into(), romaji: "Depaato e kaimono ni ikimasu.".into(), indonesian: "Pergi ke mall untuk berbelanja.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "佐藤 (Sato)".into(), japanese: "夏休みはどこかへ行きましたか。".into(), romaji: "Natsuyasumi wa dokoka e ikimashita ka.".into(), indonesian: "Apakah waktu liburan musim panas pergi ke suatu tempat?".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "北海道へスキーに行きました。とても楽しかったです。".into(), romaji: "Hokkaidou e sukii ni ikimashita. Totemo tanoshikatta desu.".into(), indonesian: "Pergi ke Hokkaido untuk bermain ski. Sangat menyenangkan.".into() },
            ],
        },

        // ==================== BAB 14 ====================
        MinnaLesson {
            chapter: 14,
            title: "Bab 14: Bentuk Te (て形) & Permohonan 〜てください".into(),
            subtitle: "Chotto matte kudasai (Tolong tunggu sebentar)".into(),
            summary: "Menguasai aturan konjugasi Bentuk Te untuk Golongan 1, 2, dan 3, permohonan santun (〜てください), dan sedang melakukan (〜ています).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "V-てください".into(),
                    meaning: "Tolong lakukan V (Permohonan Santun)".into(),
                    explanation: "Bentuk permohonan umum yang ramah dan sopan.".into(),
                    examples: vec![
                        GrammarExample { japanese: "ここに名前と住所を書いてください。".into(), romaji: "Koko ni namae to juusho o kaite kudasai.".into(), indonesian: "Tolong tulis nama dan alamat Anda di sini.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V-ています".into(),
                    meaning: "Sedang melakukan V (Progressive)".into(),
                    explanation: "Menyatakan tindakan yang sedang berlangsung saat pembicaraan terjadi.".into(),
                    examples: vec![
                        GrammarExample { japanese: "いま雨が降っています。".into(), romaji: "Ima ame ga futte imasu.".into(), indonesian: "Sekarang sedang turun hujan.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "運転手 (Sopir)".into(), japanese: "どちらまでですか。".into(), romaji: "Dochira made desu ka.".into(), indonesian: "Mau sampai ke mana?".into() },
                KaiwaDialog { speaker: "乗客 (Penumpang)".into(), japanese: "東京駅までお願いします。急いでください。".into(), romaji: "Toukyou eki made onegaishimasu. Isoide kudasai.".into(), indonesian: "Tolong sampai Stasiun Tokyo. Mohon lekas ya.".into() },
            ],
        },

        // ==================== BAB 15 ====================
        MinnaLesson {
            chapter: 15,
            title: "Bab 15: Izin 〜てもいい & Larangan 〜てはいけません".into(),
            subtitle: "Shashin o tottemo ii desu ka (Bolehkah memotret?)".into(),
            summary: "Meminta izin melakukan sesuatu (〜てもいいですか), menyatakan larangan tegas (〜てはいけません), dan status menetap (住んでいます).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "V-てもいいですか".into(),
                    meaning: "Bolehkah saya melakukan V? (Minta Izin)".into(),
                    explanation: "Pola meminta izin sopan kepada lawan bicara.".into(),
                    examples: vec![
                        GrammarExample { japanese: "ここで写真を撮ってもいいですか。".into(), romaji: "Koko de shashin o tottemo ii desu ka.".into(), indonesian: "Bolehkah saya mengambil foto di sini?".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V-てはいけません".into(),
                    meaning: "Dilarang / Tidak boleh melakukan V".into(),
                    explanation: "Menyatakan larangan berdasarkan peraturan atau etika resmi.".into(),
                    examples: vec![
                        GrammarExample { japanese: "ここでタバコを吸ってはいけません。".into(), romaji: "Koko de tabako o sutte wa ikemasen.".into(), indonesian: "Dilarang merokok di tempat ini.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "学生 (Siswa)".into(), japanese: "先生、辞書を使ってもいいですか。".into(), romaji: "Sensei, jisho o tsukattemo ii desu ka.".into(), indonesian: "Guru, bolehkah saya memakai kamus?".into() },
                KaiwaDialog { speaker: "先生 (Guru)".into(), japanese: "いいえ、テストですから、使ってはいけません。".into(), romaji: "Iie, tesuto desu kara, tsukatte wa ikemasen.".into(), indonesian: "Tidak boleh, karena ini ujian, dilarang memakai kamus.".into() },
            ],
        },

        // ==================== BAB 16 ====================
        MinnaLesson {
            chapter: 16,
            title: "Bab 16: Urutan Tindakan V-て, V-て & Setelah V-てから".into(),
            subtitle: "Asagohan o tabete kara dekakemasu (Berangkat setelah sarapan)".into(),
            summary: "Menghubungkan beberapa tindakan berurutan secara kronologis menggunakan bentuk Te, serta pola setelah melakukan sesuatu (〜てから).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "V1-て、V2-て、V3-ます".into(),
                    meaning: "Melakukan V1, lalu V2, kemudian V3".into(),
                    explanation: "Menyambung kata kerja secara kronologis. Waktu kalimat ditentukan oleh kata kerja terakhir.".into(),
                    examples: vec![
                        GrammarExample { japanese: "朝起きて、シャワーを浴びて、朝ごはんを食べます。".into(), romaji: "Asa okite, shawaa o abite, asagohan o tabemasu.".into(), indonesian: "Pagi bangun, mandi shower, lalu sarapan pagi.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V1-てから、V2".into(),
                    meaning: "Setelah tuntas V1, baru melakukan V2".into(),
                    explanation: "Menekankan bahwa V2 tidak bisa dimulai sebelum V1 benar-benar selesai.".into(),
                    examples: vec![
                        GrammarExample { japanese: "国へ帰ってから、父の会社で働きます。".into(), romaji: "Kuni e kaette kara, chichi no kaisha de hatarakimasu.".into(), indonesian: "Setelah pulang ke negara asal, saya akan bekerja di perusahaan ayah.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "観光客 (Turis)".into(), japanese: "金閣寺へはどうやって行きますか。".into(), romaji: "Kinkakuji e wa dou yatte ikimasu ka.".into(), indonesian: "Bagaimana cara pergi ke Kuil Kinkakuji?".into() },
                KaiwaDialog { speaker: "駅員 (Petugas)".into(), japanese: "京都駅から１６番のバスに乗って、金閣寺道で降りてください。".into(), romaji: "Kyouto eki kara juurokuban no basu ni notte, Kinkakujimichi de orite kudasai.".into(), indonesian: "Dari Stasiun Kyoto naik bus no 16, lalu turun di Kinkakujimichi.".into() },
            ],
        },

        // ==================== BAB 17 ====================
        MinnaLesson {
            chapter: 17,
            title: "Bab 17: Bentuk Negatif Nai (ない形) & Keharusan".into(),
            subtitle: "Kusuri o nomanakereba narimasen (Harus minum obat)".into(),
            summary: "Konjugasi Bentuk Nai (ない形), larangan halus (〜ないでください), keharusan wajib (〜なければなりません), dan tidak perlu (〜なくてもいいです).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "V-ないでください".into(),
                    meaning: "Tolong jangan melakukan V".into(),
                    explanation: "Permohonan halus agar seseorang tidak melakukan tindakan tertentu.".into(),
                    examples: vec![
                        GrammarExample { japanese: "ここで写真を撮らないでください。".into(), romaji: "Koko de shashin o toranaide kudasai.".into(), indonesian: "Tolong jangan mengambil foto di sini.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V-なければなりません".into(),
                    meaning: "Harus / Wajib melakukan V".into(),
                    explanation: "Menyatakan kewajiban atau keharusan mutlak tanpa memandang kehendak pribadi.".into(),
                    examples: vec![
                        GrammarExample { japanese: "熱がありますから、病院へ行かなければなりません。".into(), romaji: "Netsu ga arimasu kara, byouin e ikanakereba narimasen.".into(), indonesian: "Karena demam, saya harus pergi ke rumah sakit.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V-なくてもいいです".into(),
                    meaning: "Tidak perlu / Boleh tidak melakukan V".into(),
                    explanation: "Menyatakan tidak adanya kewajiban.".into(),
                    examples: vec![
                        GrammarExample { japanese: "あしたは休みですから、早く起きなくてもいいです。".into(), romaji: "Ashita wa yasumi desu kara, hayaku okinakutemo ii desu.".into(), indonesian: "Karena besok libur, tidak perlu bangun pagi-pagi.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "医者 (Dokter)".into(), japanese: "風邪ですね。今日はお風呂に入らないでください。".into(), romaji: "Kaze desu ne. Kyou wa ofuro ni hairanaide kudasai.".into(), indonesian: "Masuk angin ya. Hari ini tolong jangan berendam di bak mandi.".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "わかりました。薬は食後に飲まなければなりませんか。".into(), romaji: "Wakarimashita. Kusuri wa shokugo ni nomanakereba narimasen ka.".into(), indonesian: "Baik saya paham. Apakah obat harus diminum sesudah makan?".into() },
            ],
        },

        // ==================== BAB 18 ====================
        MinnaLesson {
            chapter: 18,
            title: "Bab 18: Bentuk Kamus (辞書形) & Kemampuan 〜ができる".into(),
            subtitle: "Nihongo o hanasu koto ga dekimasu (Bisa bicara bahasa Jepang)".into(),
            summary: "Konjugasi Bentuk Kamus (Jisho-kei), menyatakan kesanggupan/potensi (〜ことができる), menyatakan hobi (趣味は〜ことです), dan sebelum (〜まえに).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "V-jisho ことができます".into(),
                    meaning: "Bisa / Mampu melakukan V".into(),
                    explanation: "Mengubah kata kerja menjadi kata benda dengan こと lalu menambahkan ができます.".into(),
                    examples: vec![
                        GrammarExample { japanese: "ミラーさんは漢字を読むことができます。".into(), romaji: "Miraa-san wa kanji o yomu koto ga dekimasu.".into(), indonesian: "Tuan Miller bisa membaca kanji.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "わたしの趣味は V-jisho ことです".into(),
                    meaning: "Hobi saya adalah melakukan V".into(),
                    explanation: "Pola menyatakan minat hobi.".into(),
                    examples: vec![
                        GrammarExample { japanese: "わたしの趣味は古い音楽を聴くことです。".into(), romaji: "Watashi no shumi wa furui ongaku o kiku koto desu.".into(), indonesian: "Hobi saya adalah mendengarkan musik klasik.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V1-jisho / N の まえに、V2".into(),
                    meaning: "Sebelum V1, melakukan V2".into(),
                    explanation: "Menyatakan urutan sebelum suatu peristiwa.".into(),
                    examples: vec![
                        GrammarExample { japanese: "寝るまえに、本を読みます。".into(), romaji: "Neru mae ni, hon o yomimasu.".into(), indonesian: "Sebelum tidur, saya membaca buku.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "受付 (Resepsionis)".into(), japanese: "クレジットカードで払うことができますか。".into(), romaji: "Kurejitto kaado de harau koto ga dekimasu ka.".into(), indonesian: "Apakah bisa membayar dengan kartu kredit?".into() },
                KaiwaDialog { speaker: "店員 (Kasir)".into(), japanese: "はい、お使いいただけます。こちらへどうぞ。".into(), romaji: "Hai, otsukai itadakemasu. Kochira e douzo.".into(), indonesian: "Ya, bisa digunakan. Silakan ke sebelah sini.".into() },
            ],
        },

        // ==================== BAB 19 ====================
        MinnaLesson {
            chapter: 19,
            title: "Bab 19: Bentuk Lampau Ta (た形) & Pengalaman 〜ことがある".into(),
            subtitle: "Fuji-san ni nobotta koto ga arimasu (Pernah mendaki Gunung Fuji)".into(),
            summary: "Bentuk Ta (lampau kasual), pengalaman pernah melakukan (〜たことがある), perwakilan aksi tak berurutan (〜たり〜たりする), dan menjadi (〜になる).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "V-た ことがあります".into(),
                    meaning: "Pernah melakukan V (Pengalaman Hidup)".into(),
                    explanation: "Hanya untuk menyatakan sejarah pengalaman hidup yang berharga di masa lampau.".into(),
                    examples: vec![
                        GrammarExample { japanese: "富士山に登ったことがあります。".into(), romaji: "Fujisan ni nobotta koto ga arimasu.".into(), indonesian: "Saya pernah mendaki Gunung Fuji.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V1-たり、V2-たり します".into(),
                    meaning: "Melakukan kegiatan seperti V1, V2, dll".into(),
                    explanation: "Menyebutkan beberapa contoh kegiatan representatif tanpa ikatan urutan waktu.".into(),
                    examples: vec![
                        GrammarExample { japanese: "休みの日は買い物をしたり、映画を見たりします。".into(), romaji: "Yasumi no hi wa kaimono o shitari, eiga o mitari shimasu.".into(), indonesian: "Pada hari libur saya berbelanja, menonton film, dan lain sebagainya.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "Kata Sifat / Nomina に / く なります".into(),
                    meaning: "Menjadi ... (Perubahan Kondisi)".into(),
                    explanation: "Sifat-i: buang 'i' tambah 'ku narimasu'. Sifat-na & Nomina: tambah 'ni narimasu'.".into(),
                    examples: vec![
                        GrammarExample { japanese: "だんだん暖かくなりました。".into(), romaji: "Dandan atatakaku narimashita.".into(), indonesian: "Berangsur-angsur cuaca menjadi hangat.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "山田 (Yamada)".into(), japanese: "すしを食べたことがありますか。".into(), romaji: "Sushi o tabeta koto ga arimasu ka.".into(), indonesian: "Apakah pernah makan sushi?".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "はい、一度あります。とてもおいしかったです。".into(), romaji: "Hai, ichido arimasu. Totemo oishikatta desu.".into(), indonesian: "Ya, pernah satu kali. Sangat lezat.".into() },
            ],
        },

        // ==================== BAB 20 ====================
        MinnaLesson {
            chapter: 20,
            title: "Bab 20: Bahasa Biasa Kasual (普通形 - Futsuukei)".into(),
            subtitle: "Ashita Toukyou e iku? (Besok kamu pergi ke Tokyo?)".into(),
            summary: "Mengubah bentuk sopan (丁寧形 - Teineikei) menjadi bahasa santai/akrab (普通形 - Futsuukei) untuk percakapan sehari-hari sesama teman akrab.".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "Kata Kerja: 行く (Iku) / 行かない (Ikanai) / 行った (Itta) / 行かなかった (Ikanakatta)".into(),
                    meaning: "Bentuk Biasa Kata Kerja".into(),
                    explanation: "Bentuk kamus untuk positif masa kini/depan, nai untuk negatif, ta untuk lampau, dan nakatta untuk lampau negatif.".into(),
                    examples: vec![
                        GrammarExample { japanese: "今日暇？ うん、暇だよ。/ ううん、暇じゃない。".into(), romaji: "Kyou hima? Un, hima da yo. / Uun, hima ja nai.".into(), indonesian: "Hari ini senggang? Ya, senggang. / Gak, gak senggang.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "小林 (Kobayashi)".into(), japanese: "あした、どこか行く？".into(), romaji: "Ashita, dokoka iku?".into(), indonesian: "Besok mau pergi ke suatu tempat?".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "うん、京都へ行こうと思ってる。いっしょに行く？".into(), romaji: "Un, Kyouto e ikou to omotteru. Isshoni iku?".into(), indonesian: "Ya, lagi kepikiran mau ke Kyoto. Mau ikut bareng?".into() },
            ],
        },

        // ==================== BAB 21 ====================
        MinnaLesson {
            chapter: 21,
            title: "Bab 21: Opini 〜と思います & Kutipan 〜と言いました".into(),
            subtitle: "Nihon wa bukka ga takai to omoimasu (Saya pikir harga barang di Jepang mahal)".into(),
            summary: "Menyampaikan opini dan dugaan pribadi (〜と思います), serta mengutip ucapan orang lain secara langsung maupun tidak langsung (〜と言いました).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "[Futsuukei] と 思います".into(),
                    meaning: "Saya pikir / Menurut saya ...".into(),
                    explanation: "Di depan partikel と wajib menggunakan kalimat dalam bentuk biasa (Futsuukei). Digunakan untuk menyampaikan dugaan santun.".into(),
                    examples: vec![
                        GrammarExample { japanese: "あしたは雨が降ると思います。".into(), romaji: "Ashita wa ame ga furu to omoimasu.".into(), indonesian: "Menurut saya besok akan turun hujan.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "[Kalimat] と 言いました".into(),
                    meaning: "Berkata bahwa ... (Kutipan)".into(),
                    explanation: "Mengutip apa yang disampaikan oleh seseorang.".into(),
                    examples: vec![
                        GrammarExample { japanese: "田中さんは来週出張すると言いました。".into(), romaji: "Tanaka-san wa raishuu shucchou suru to iimashita.".into(), indonesian: "Tuan Tanaka berkata bahwa minggu depan akan dinas ke luar kota.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "記者 (Wartawan)".into(), japanese: "新しい首相についてどう思いますか。".into(), romaji: "Atarashii shushou ni tsuite dou omoimasu ka.".into(), indonesian: "Bagaimana pendapat Anda tentang perdana menteri baru?".into() },
                KaiwaDialog { speaker: "市民 (Warga)".into(), japanese: "経済が良くなると思います。期待しています。".into(), romaji: "Keizai ga yoku naru to omoimasu. Kitai shite imasu.".into(), indonesian: "Saya pikir ekonomi akan membaik. Saya menaruh harapan.".into() },
            ],
        },

        // ==================== BAB 22 ====================
        MinnaLesson {
            chapter: 22,
            title: "Bab 22: Klausa Relatif / Modifikasi Nomina (連体修飾)".into(),
            subtitle: "Kore wa watashi ga tsukutta ryouri desu (Ini masakan yang saya buat)".into(),
            summary: "Mempelajari cara membuat anak kalimat penjelas yang menerangkan kata benda di belakangnya (seperti kata 'yang' dalam bahasa Indonesia).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "[Anak Kalimat Bentuk Biasa] + Kata Benda".into(),
                    meaning: "Kata Benda yang [Anak Kalimat]".into(),
                    explanation: "Di bahasa Jepang tidak ada kata hubung 'yang' seperti relative clause. Cukup letakkan kalimat bentuk biasa di depan kata benda. Subjek anak kalimat memakai が.".into(),
                    examples: vec![
                        GrammarExample { japanese: "あそこで本を読んでいる人はだれですか。".into(), romaji: "Asoko de hon o yonde iru hito wa dare desu ka.".into(), indonesian: "Orang yang sedang membaca buku di sana itu siapa?".into() },
                        GrammarExample { japanese: "これは母が作ってくれたセーターです。".into(), romaji: "Kore wa haha ga tsukutte kureta seetaa desu.".into(), indonesian: "Ini adalah sweter yang dibuatkan oleh ibu untuk saya.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "木村 (Kimura)".into(), japanese: "すてきな時計ですね。どこで買いましたか。".into(), romaji: "Suteki na tokei desu ne. Doko de kaimashita ka.".into(), indonesian: "Jam tangan yang indah ya. Beli di mana?".into() },
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "これは会社に入ったとき、父がくれた時計です。".into(), romaji: "Kore wa kaisha ni haitta toki, chichi ga kureta tokei desu.".into(), indonesian: "Ini adalah jam yang diberikan ayah saat saya masuk perusahaan.".into() },
            ],
        },

        // ==================== BAB 23 ====================
        MinnaLesson {
            chapter: 23,
            title: "Bab 23: Waktu Kondisi 〜とき & Hubungan Bersyarat 〜と".into(),
            subtitle: "Kono botan o osu to, kippu ga demasu (Kalau tekan tombol ini, tiket keluar)".into(),
            summary: "Menyatakan ketika/saat peristiwa berlangsung (〜とき), serta hubungan sebab-akibat alami atau mekanik yang otomatis terjadi (〜と).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "[V-jisho / V-ta / Keiyoushi] とき".into(),
                    meaning: "Saat / Ketika ...".into(),
                    explanation: "Menyatakan waktu terjadinya suatu perbuatan atau keadaan.".into(),
                    examples: vec![
                        GrammarExample { japanese: "図書館で本を借りるとき、カードが要ります。".into(), romaji: "Toshokan de hon o kariru toki, kaado ga irimasu.".into(), indonesian: "Saat meminjam buku di perpustakaan, kartu dibutuhkan.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V-jisho と、[Peristiwa Otomatis]".into(),
                    meaning: "Begitu V dilakukan, pasti langsung terjadi ...".into(),
                    explanation: "Digunakan untuk instruksi mesin jalan, petunjuk arah jalan, atau hukum alam yang tak terelakkan.".into(),
                    examples: vec![
                        GrammarExample { japanese: "このボタンを押すと、おつりが出ます。".into(), romaji: "Kono botan o osu to, otsuri ga demasu.".into(), indonesian: "Begitu menekan tombol ini, uang kembalian akan keluar.".into() },
                        GrammarExample { japanese: "右へ曲がると、郵便局があります。".into(), romaji: "Migi e magaru to, yuubinkyoku ga arimasu.".into(), indonesian: "Begitu belok ke kanan, Anda akan melihat kantor pos.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "旅行者 (Pelancong)".into(), japanese: "すみません、市役所へ行きたいんですが...".into(), romaji: "Sumimasen, shiyakusho e ikitai n desu ga...".into(), indonesian: "Permisi, saya mau pergi ke kantor walikota...".into() },
                KaiwaDialog { speaker: "通行人 (Warga)".into(), japanese: "この道をまっすぐ行くと、左側に大きな公園があります。その前ですよ。".into(), romaji: "Kono michi o massugu iku to, hidarigawa ni ookina kouen ga arimasu. Sono mae desu yo.".into(), indonesian: "Kalau jalan lurus di jalan ini, di sebelah kiri ada taman besar. Persis di depannya lho.".into() },
            ],
        },

        // ==================== BAB 24 ====================
        MinnaLesson {
            chapter: 24,
            title: "Bab 24: Kebaikan & Jasa 〜てあげる・〜てもらう・〜てくれる".into(),
            subtitle: "Haha ga seetaa o okutte kuremashita (Ibu mengirimkan sweter untuk saya)".into(),
            summary: "Menyatakan tindakan saling membantu dan memberikan jasa kebaikan dari berbagai sudut pandang pembicara.".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "V-て あげます / もらいます / くれます".into(),
                    meaning: "Melakukan kebaikan untuk orang lain / Menerima kebaikan / Orang lain berbuat baik untuk saya".into(),
                    explanation: "〜てくれます khusus digunakan ketika orang lain berinisiatif memberikan bantuan atau kebaikan kepada pembicara (saya) atau keluarga saya.".into(),
                    examples: vec![
                        GrammarExample { japanese: "わたしは友達の荷物を持ってあげました。".into(), romaji: "Watashi wa tomodachi no nimotsu o motte agemashita.".into(), indonesian: "Saya membawakan barang bawaan teman saya.".into() },
                        GrammarExample { japanese: "佐藤さんはわたしにおいしいお茶を淹れてくれました。".into(), romaji: "Sato-san wa watashi ni oishii ocha o irete kuremashita.".into(), indonesian: "Nona Sato menyeduhkan teh lezat untuk saya.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "重そうですね。手伝ってあげましょうか。".into(), romaji: "Omosou desu ne. Tetsudatte agemashou ka.".into(), indonesian: "Kelihatannya berat ya. Mau saya bantu?".into() },
                KaiwaDialog { speaker: "山田 (Yamada)".into(), japanese: "ありがとうございます。すみませんが、これを持ってくれますか。".into(), romaji: "Arigatou gozaimasu. Sumimasen ga, kore o motte kuremasu ka.".into(), indonesian: "Terima kasih banyak. Maaf merepotkan, maukah memegang yang ini?".into() },
            ],
        },

        // ==================== BAB 25 ====================
        MinnaLesson {
            chapter: 25,
            title: "Bab 25: Pengandaian 〜たら & Walaupun 〜ても".into(),
            subtitle: "Ame ga futtara, ikimasen (Kalau hujan, saya tidak pergi)".into(),
            summary: "Bab pamungkas Minna no Nihongo Shokyu 1! Pola pengandaian bersyarat (〜たら) dan pengandaian kontradiktif walaupun/meskipun (〜ても).".into(),
            patterns: vec![
                GrammarPattern {
                    pattern: "V-たら / Sifat-たら / N だったら、...".into(),
                    meaning: "Kalau / Jika ..., maka ...".into(),
                    explanation: "Bentuk pengandaian paling umum dan fleksibel. Dibentuk dari bentuk Ta + ら.".into(),
                    examples: vec![
                        GrammarExample { japanese: "お金がたくさんあったら、世界旅行をしたいです。".into(), romaji: "Okane ga takusan attara, sekai ryokou o shitai desu.".into(), indonesian: "Kalau punya banyak uang, saya ingin keliling dunia.".into() },
                        GrammarExample { japanese: "駅に着いたら、電話をかけてください。".into(), romaji: "Eki ni tsuitara, denwa o kakete kudasai.".into(), indonesian: "Kalau sudah sampai stasiun, tolong telepon saya.".into() },
                    ],
                },
                GrammarPattern {
                    pattern: "V-ても / Sifat-くても / N でも、...".into(),
                    meaning: "Meskipun / Walaupun ..., tetap ...".into(),
                    explanation: "Menyatakan hasil yang bertentangan dengan apa yang wajar diharapkan dari kondisi awal.".into(),
                    examples: vec![
                        GrammarExample { japanese: "雨が降っても、サッカーの試合をします。".into(), romaji: "Ame ga futtemo, sakkaa no shiai o shimasu.".into(), indonesian: "Meskipun turun hujan, pertandingan sepak bola tetap berjalan.".into() },
                        GrammarExample { japanese: "高くても、この辞書を買いたいです。".into(), romaji: "Takakutemo, kono jisho o kaitai desu.".into(), indonesian: "Meskipun mahal, saya ingin membeli kamus ini.".into() },
                    ],
                },
            ],
            kaiwa: vec![
                KaiwaDialog { speaker: "ミラー (Miller)".into(), japanese: "先生、今までいろいろありがとうございました。".into(), romaji: "Sensei, ima made iroiro arigatou gozaimashita.".into(), indonesian: "Guru, terima kasih banyak atas segala bimbingannya sampai saat ini.".into() },
                KaiwaDialog { speaker: "先生 (Guru)".into(), japanese: "国へ帰っても、日本語の勉強を続けてくださいね。がんばって！".into(), romaji: "Kuni e kaettemo, nihongo no benkyou o tsuzukete kudasai ne. Ganbatte!".into(), indonesian: "Meskipun sudah pulang ke negara asal, tolong tetap lanjutkan belajar bahasa Jepang ya. Semangat!".into() },
            ],
        },
    ]
}

pub fn get_all_particles() -> Vec<ParticleGuide> {
    vec![
        // === 1. NO (の) ===
        ParticleGuide {
            particle: "の".into(),
            romaji: "no".into(),
            title: "Partikel Kepemilikan, Asosiasi & Modifikasi Nomina".into(),
            explanation: "Menghubungkan dua kata benda. Menunjukkan kepemilikan ('milik siapa'), asal negara/perusahaan pembuat, bidang keahlian, atau penjelasan materi.".into(),
            rules: vec![
                "Kepemilikan pribadi: わたしの本 (Buku saya).".into(),
                "Asal pembuatan / produsen: 日本の車 (Mobil buatan Jepang).".into(),
                "Organisasi / Institusi: 東京大学の学生 (Mahasiswa Universitas Tokyo).".into(),
                "Pengganti kata benda yang sudah jelas: 赤いのはわたしのです (Yang merah itu punya saya).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "これはさくら大学の学生証です。".into(), romaji: "Kore wa Sakura Daigaku no gakuseishou desu.".into(), indonesian: "Ini adalah kartu mahasiswa Universitas Sakura.".into() },
                GrammarExample { japanese: "その黒い鞄はだれのですか。".into(), romaji: "Sono kuroi kaban wa dare no desu ka.".into(), indonesian: "Tas hitam itu milik siapa?".into() },
            ],
        },

        // === 2. WA (は) ===
        ParticleGuide {
            particle: "は".into(),
            romaji: "wa".into(),
            title: "Partikel Topik Utama Pembicaraan".into(),
            explanation: "Meskipun ditulis hiragana 'ha', selalu dilafalkan 'wa'. Berfungsi mengangkat topik ke panggung pembicaraan ('Adapun mengenai X...').".into(),
            rules: vec![
                "Menandai topik kalimat: [Topik] は [Penjelasan]".into(),
                "Menunjukkan kontras saat membandingkan dua hal: 肉は食べますが、魚は食べません".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "わたしは学生です。".into(), romaji: "Watashi wa gakusei desu.".into(), indonesian: "Saya adalah seorang siswa.".into() },
                GrammarExample { japanese: "肉は食べますが、魚は食べません。".into(), romaji: "Niku wa tabemasu ga, sakana wa tabemasen.".into(), indonesian: "Daging saya makan, tetapi ikan saya tidak makan (kontras).".into() },
            ],
        },

        // === 3. MO (も) ===
        ParticleGuide {
            particle: "も".into(),
            romaji: "mo".into(),
            title: "Partikel 'Juga' / 'Pun'".into(),
            explanation: "Menggantikan partikel は, が, atau を ketika informasi yang dikenakan sama persis dengan yang telah disebutkan sebelumnya.".into(),
            rules: vec![
                "Menyatakan kesamaan predikat: わたしも日本人です (Saya juga orang Jepang).".into(),
                "Bersama kata tanya negatif (penolakan total): だれもいません (Tidak ada siapa pun), 何も食べません (Tidak makan apa pun).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "ミラーさんも会社員です。".into(), romaji: "Miraa-san mo kaishain desu.".into(), indonesian: "Tuan Miller juga seorang karyawan.".into() },
                GrammarExample { japanese: "日曜日はどこへも行きませんでした。".into(), romaji: "Nichiyoubi wa doko e mo ikimasen deshita.".into(), indonesian: "Hari Minggu saya tidak pergi ke mana pun.".into() },
            ],
        },

        // === 4. GA (が) ===
        ParticleGuide {
            particle: "が".into(),
            romaji: "ga".into(),
            title: "Partikel Subjek Gramatikal Sejati & Penegas Fokus".into(),
            explanation: "Menekankan kata benda di depannya sebagai fokus utama. Dipakai untuk kata kerja intransitif, kata sifat psikologis/kesukaan, dan kata kerja potensial.".into(),
            rules: vec![
                "Subjek fenomena alam / intransitif: 雨が降ります (Hujan turun).".into(),
                "Menandai sasaran kata sifat / kesukaan: わたしは猫が好きです (Saya suka kucing).".into(),
                "Menjawab kata tanya subjek: だれが来ましたか。山田さんが来ました。".into(),
                "Konjungsi antarkalimat yang berarti 'tetapi': 日本語はおもしろいですが、難しいです。".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "富士山がきれいです。".into(), romaji: "Fujisan ga kirei desu.".into(), indonesian: "Gunung Fuji sangat indah.".into() },
                GrammarExample { japanese: "わたしはピアノを弾くことができます。".into(), romaji: "Watashi wa piano o hiku koto ga dekimasu.".into(), indonesian: "Saya bisa memainkan piano.".into() },
            ],
        },

        // === 5. O (を) ===
        ParticleGuide {
            particle: "を".into(),
            romaji: "o".into(),
            title: "Partikel Objek Langsung (Penderita Tindakan)".into(),
            explanation: "Selalu dilafalkan 'o'. Menandai objek yang langsung dikenai perbuatan kata kerja transitif, atau ruang fisik yang dilintasi.".into(),
            rules: vec![
                "Objek langsung kata kerja: ご飯を食べます (Makan nasi).".into(),
                "Ruang/lintasan yang dilewati: 公園を散歩します (Jalan-jalan melintasi taman), 橋を渡ります (Menyeberangi jembatan).".into(),
                "Titik lepas landas/keluar: 電車を降ります (Turun dari kereta).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "毎朝新聞を読みます。".into(), romaji: "Maiasa shinbun o yomimasu.".into(), indonesian: "Setiap pagi saya membaca koran.".into() },
            ],
        },

        // === 6. NI (に) ===
        ParticleGuide {
            particle: "に".into(),
            romaji: "ni".into(),
            title: "Partikel Waktu Tepat, Titik Tiba, & Lokasi Keberadaan".into(),
            explanation: "Memiliki 4 peran krusial: penunjuk waktu berangka spesifik, titik tiba akhir perpindahan, tempat menetapnya keberadaan (います/あります), dan target orang penerima perbuatan.".into(),
            rules: vec![
                "Waktu spesifik berangka: ７時に起きます (Bangun pada jam 7 tepat).".into(),
                "Lokasi keberadaan: 机の上にペンがあります (Di atas meja ada pena).".into(),
                "Tujuan akhir tiba: 東京に着きました (Tiba di Tokyo).".into(),
                "Orang yang dituju / diberi: 友達に電話をかけます (Menelepon teman).".into(),
                "Tujuan melakukan aksi: 買い物に行きます (Pergi untuk berbelanja).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "日曜日の朝８時に駅で会いましょう。".into(), romaji: "Nichiyoubi no asa hachiji ni eki de aimashou.".into(), indonesian: "Mari bertemu di stasiun pada jam 8 pagi hari Minggu.".into() },
                GrammarExample { japanese: "京都に住んでいます。".into(), romaji: "Kyouto ni sunde imasu.".into(), indonesian: "Saya tinggal menetap di Kyoto.".into() },
            ],
        },

        // === 7. DE (で) ===
        ParticleGuide {
            particle: "で".into(),
            romaji: "de".into(),
            title: "Partikel Tempat Aksi, Alat/Sarana, & Batasan".into(),
            explanation: "Menunjukkan tempat berlangsungnya suatu kegiatan aktif, alat/kendaraan yang dipakai, bahan material, atau batasan kuantitas.".into(),
            rules: vec![
                "Tempat terjadinya aktivitas: レストランで食べます (Makan di restoran).".into(),
                "Alat / sarana transportasi: バスで来ました (Datang naik bus), 箸で食べます (Makan pakai sumpit).".into(),
                "Bahasa pengantar: 日本語で話してください (Tolong bicara dalam bahasa Jepang).".into(),
                "Penyebab / alasan alamiah: 事故で電車が止まりました (Kereta berhenti karena kecelakaan).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "図書館で日本語の本を読みました。".into(), romaji: "Toshokan de nihongo no hon o yomimashita.".into(), indonesian: "Membaca buku bahasa Jepang di perpustakaan.".into() },
                GrammarExample { japanese: "新幹線で大阪へ行きます。".into(), romaji: "Shinkansen de Oosaka e ikimasu.".into(), indonesian: "Pergi ke Osaka menggunakan Shinkansen.".into() },
            ],
        },

        // === 8. E (へ) ===
        ParticleGuide {
            particle: "へ".into(),
            romaji: "e".into(),
            title: "Partikel Arah Pergerakan Perpindahan Fisik".into(),
            explanation: "Meskipun ditulis hiragana 'he', partikel ini selalu dilafalkan 'e'. Berfungsi khusus menandai arah orientasi pergerakan fisik menuju suatu destinasi.".into(),
            rules: vec![
                "Arah tujuan kata kerja gerak: [Arah] へ 行きます / 来ます / 帰ります".into(),
                "Tujuan surat / sambutan: 田中さんへ (Kepada Tuan Tanaka).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "来月日本へ旅行に行きます。".into(), romaji: "Raigetsu Nihon e ryokou ni ikimasu.".into(), indonesian: "Bulan depan saya akan pergi berwisata ke Jepang.".into() },
                GrammarExample { japanese: "早くうちへ帰りましょう。".into(), romaji: "Hayaku uchi e kaerimashou.".into(), indonesian: "Ayo lekas pulang menuju rumah.".into() },
            ],
        },

        // === 9. TO (と) ===
        ParticleGuide {
            particle: "と".into(),
            romaji: "to".into(),
            title: "Partikel 'Dan' (Pencacahan Lengkap) & 'Bersama'".into(),
            explanation: "Menghubungkan dua atau lebih kata benda secara menyeluruh tanpa sisa, atau menunjukkan mitra yang menemani suatu aktivitas perbuatan.".into(),
            rules: vec![
                "Pencacahan tuntas: パンと卵と牛乳 (Roti, telur, dan susu).".into(),
                "Melakukan bersama rekan: 友達と映画を見ます (Menonton film bersama teman).".into(),
                "Penanda kutipan isi pikiran / ucapan: ...と思います / ...と言いました".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "きのう家族とデパートへ行きました。".into(), romaji: "Kinou kazoku to depaato e ikimashita.".into(), indonesian: "Kemarin saya pergi ke mall bersama keluarga.".into() },
                GrammarExample { japanese: "あしたは晴れると思います。".into(), romaji: "Ashita wa hareru to omoimasu.".into(), indonesian: "Saya pikir besok cuaca akan cerah.".into() },
            ],
        },

        // === 10. KARA / MADE (から・まで) ===
        ParticleGuide {
            particle: "から / まで".into(),
            romaji: "kara / made".into(),
            title: "Partikel 'Dari' (Titik Awal) dan 'Sampai' (Batas Akhir)".into(),
            explanation: "から menandai awal mula waktu, titik berangkat tempat, atau sebab alasan. まで menandai titik finis batas akhir waktu atau tempat.".into(),
            rules: vec![
                "Rentang waktu operasional: ９時から５時まで (Dari jam 9 sampai jam 5).".into(),
                "Asal daerah / negara: インドネシアから来ました (Berasal dari Indonesia).".into(),
                "Alasan sebab-akibat: 雨ですから、出かけません (Karena hujan, tidak bepergian).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "昼休みは１２時から１時までです。".into(), romaji: "Hiruyasumi wa juuniji kara ichiji made desu.".into(), indonesian: "Istirahat siang dari jam 12 sampai jam 1.".into() },
                GrammarExample { japanese: "東京から京都まで新幹線で２時間半かかります。".into(), romaji: "Toukyou kara Kyouto made Shinkansen de ni-jikan han kakarimasu.".into(), indonesian: "Dari Tokyo sampai Kyoto naik Shinkansen memakan waktu 2,5 jam.".into() },
            ],
        },

        // === 11. MADENI (までに) ===
        ParticleGuide {
            particle: "までに".into(),
            romaji: "madeni".into(),
            title: "Partikel Tenggat Waktu ('Paling Lambat Sebelum')".into(),
            explanation: "Berbeda dengan まで yang menyatakan durasi terus-menerus hingga akhir, までに menandai batas tenggat (deadline) di mana suatu perbuatan tuntas dilakukan sebelum waktu itu tiba.".into(),
            rules: vec![
                "Tenggat waktu pengumpulan: 金曜日までにレポートを出してください (Kumpulkan laporan paling lambat hari Jumat).".into(),
                "Batas kepulangan: ５時までに帰らなければなりません (Harus pulang paling lambat sebelum jam 5).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "明日までにこの本を返してください。".into(), romaji: "Ashita madeni kono hon o kaeshite kudasai.".into(), indonesian: "Tolong kembalikan buku ini paling lambat sebelum besok.".into() },
            ],
        },

        // === 12. YORI (より) ===
        ParticleGuide {
            particle: "より".into(),
            romaji: "yori".into(),
            title: "Partikel Komparasi Perbandingan ('Daripada')".into(),
            explanation: "Berfungsi sebagai titik acuan pembanding ketika membandingkan dua hal (A は B より Sifat: A lebih Sifat daripada B).".into(),
            rules: vec![
                "Titik tolak pembanding: 飛行機は新幹線より速いです (Pesawat lebih cepat daripada Shinkansen).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "今年は去年より寒いです。".into(), romaji: "Kotoshi wa kyonen yori samui desu.".into(), indonesian: "Tahun ini lebih dingin daripada tahun lalu.".into() },
            ],
        },

        // === 13. YA (や) ===
        ParticleGuide {
            particle: "や".into(),
            romaji: "ya".into(),
            title: "Partikel Pencacahan Tak Tuntas ('Dan Lain-lain')".into(),
            explanation: "Menghubungkan contoh-contoh benda representatif dari suatu kelompok tanpa menyebutkan semuanya secara lengkap. Sering dipasangkan dengan など (nado).".into(),
            rules: vec![
                "Daftar representatif: 机の上に本やペンなどがあります (Di atas meja ada buku, pena, dan lain-lain).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "かばんの中に財布や鍵や携帯があります。".into(), romaji: "Kaban no naka ni saifu ya kagi ya keitai ga arimasu.".into(), indonesian: "Di dalam tas ada dompet, kunci, ponsel, dan lain sebagainya.".into() },
            ],
        },

        // === 14. KA (か) ===
        ParticleGuide {
            particle: "か".into(),
            romaji: "ka".into(),
            title: "Partikel Kalimat Tanya & Pilihan ('Atau')".into(),
            explanation: "Di akhir kalimat berfungsi mengubah pernyataan menjadi pertanyaan. Di antara dua kata benda berfungsi sebagai kata hubung pilihan alternatif ('atau').".into(),
            rules: vec![
                "Kalimat tanya interogatif: あなたは日本人ですか (Apakah Anda orang Jepang?).".into(),
                "Pilihan alternatif 'atau': コーヒーか紅茶はいかがですか (Mau kopi atau teh?).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "日曜日か月曜日に会いましょう。".into(), romaji: "Nichiyoubi ka getsuyoubi ni aimashou.".into(), indonesian: "Mari bertemu pada hari Minggu atau hari Senin.".into() },
            ],
        },

        // === 15. NE (ね) ===
        ParticleGuide {
            particle: "ね".into(),
            romaji: "ne".into(),
            title: "Partikel Akhir Konfirmasi Ramah ('...ya kan?')".into(),
            explanation: "Diletakkan di akhir kalimat untuk mencari persetujuan, simpati, atau memastikan hal yang diduga sama-sama disadari oleh kedua belah pihak.".into(),
            rules: vec![
                "Menuntut persetujuan / kehangatan rasa: 今日はいい天気ですね (Hari ini cuacanya bagus sekali ya kan!).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "このラーメンはおいしいですね。".into(), romaji: "Kono raamen wa oishii desu ne.".into(), indonesian: "Ramen ini enak sekali ya kan.".into() },
            ],
        },

        // === 16. YO (よ) ===
        ParticleGuide {
            particle: "よ".into(),
            romaji: "yo".into(),
            title: "Partikel Akhir Penegasan Informasi Baru ('...lho / lho ya!')".into(),
            explanation: "Diletakkan di akhir tuturan untuk memberitahu lawan bicara tentang fakta yang diyakini pembicara belum diketahui atau perlu ditegaskan kepada lawan bicara.".into(),
            rules: vec![
                "Memberitahu info baru yang penting: その電車は京都へ行きませんよ (Kereta itu tidak pergi ke Kyoto lho!).".into(),
            ],
            examples: vec![
                GrammarExample { japanese: "明日テストがありますよ。".into(), romaji: "Ashita tesuto ga arimasu yo.".into(), indonesian: "Besok ada ujian lho!".into() },
            ],
        },
    ]
}
'''

with open("nihongo-app/src-tauri/src/japanese/grammar.rs", "w", encoding="utf-8") as f:
    f.write(code)

print("Successfully wrote full Minna no Nihongo Bab 1-25 and complete Particle guides!")
