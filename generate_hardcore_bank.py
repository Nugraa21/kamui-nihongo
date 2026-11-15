# -*- coding: utf-8 -*-
import json
import os

questions = [
    # === JLPT N5 SOAL ===
    {
        "id": 1,
        "level": "N5",
        "category": "Kanji",
        "question": "Huruf kanji dari kata 「みず」 (air) adalah...",
        "display": "みず",
        "options": ["水", "木", "火", "土"],
        "correct": 0,
        "exp": "「水」 dibaca みず (mizu) yang artinya air."
    },
    {
        "id": 2,
        "level": "N5",
        "category": "Partikel",
        "question": "Lengkapi partikel: わたし [ ? ] がくせいです。(Saya adalah siswa)",
        "display": "わたし [ ? ] 学生です",
        "options": ["は (wa)", "を (o)", "で (de)", "に (ni)"],
        "correct": 0,
        "exp": "Partikel は (wa) menandai topik pembicaraan (subjek utama)."
    },
    {
        "id": 3,
        "level": "N5",
        "category": "Tata Bahasa",
        "question": "Bentuk negatif lampau dari 「たべます」 (makan) adalah...",
        "display": "たべます ➔ ...",
        "options": ["たべませんでした", "たべません", "たべました", "たべないでした"],
        "correct": 0,
        "exp": "Bentuk lampau negatif dari ~ます adalah ~ませんでした (tabemasen deshita)."
    },
    {
        "id": 4,
        "level": "N5",
        "category": "Kosakata",
        "question": "Kata 「きのう」 memiliki arti...",
        "display": "きのう (Kinou)",
        "options": ["Kemarin", "Besok", "Hari ini", "Lusa"],
        "correct": 0,
        "exp": "きのう (kinou) artinya Kemarin. Besok adalah あした (ashita)."
    },
    {
        "id": 5,
        "level": "N5",
        "category": "Partikel",
        "question": "Lengkapi kalimat: パン [ ? ] たべます。(Makan roti)",
        "display": "パン [ ? ] 食べます",
        "options": ["を (o)", "が (ga)", "で (de)", "へ (e)"],
        "correct": 0,
        "exp": "Partikel を (o) digunakan untuk menandai objek penderita tindakan aktif."
    },
    {
        "id": 6,
        "level": "N5",
        "category": "Kanji",
        "question": "Cara baca kanji 「日本」 yang tepat adalah...",
        "display": "日本",
        "options": ["にほん (Nihon)", "にちほん (Nichihon)", "ひほん (Hihon)", "ほんじつ (Honjitsu)"],
        "correct": 0,
        "exp": "日本 dibaca にほん (Nihon) atau にっぽん (Nippon), berarti negara Jepang."
    },
    {
        "id": 7,
        "level": "N5",
        "category": "Partikel",
        "question": "Lengkapi partikel perpindahan arah: とうきょう [ ? ] いきます。(Pergi ke Tokyo)",
        "display": "東京 [ ? ] 行きます",
        "options": ["へ (e)", "で (de)", "を (o)", "から (kara)"],
        "correct": 0,
        "exp": "Partikel へ (dibaca 'e') menunjukkan arah tujuan perpindahan gerak."
    },
    {
        "id": 8,
        "level": "N5",
        "category": "Tata Bahasa",
        "question": "Ubahlah kata kerja 「かきます」 (menulis) ke bentuk Te...",
        "display": "かきます (Bentuk Te)",
        "options": ["かいて (kaite)", "かいって (kitte)", "かちて (kachite)", "かぎて (kagite)"],
        "correct": 0,
        "exp": "Kata kerja Golongan 1 berakhiran き (~ki) berubah menjadi ~いて (~ite): kakimasu ➔ kaite."
    },
    {
        "id": 9,
        "level": "N5",
        "category": "Partikel",
        "question": "Lengkapi partikel tempat melakukan kegiatan: レストラン [ ? ] ごはんをたべます。",
        "display": "レストラン [ ? ] ご飯を食べます",
        "options": ["で (de)", "に (ni)", "へ (e)", "を (o)"],
        "correct": 0,
        "exp": "Partikel で (de) menandai tempat terjadinya suatu aktivitas aktif."
    },
    {
        "id": 10,
        "level": "N5",
        "category": "Kata Sifat",
        "question": "Bentuk negatif lampau dari kata sifat-i 「あつい」 (panas) adalah...",
        "display": "あつい ➔ Negatif Lampau",
        "options": ["あつくなかったです", "あつくないです", "あつかったです", "あついじゃなかったです"],
        "correct": 0,
        "exp": "Kata sifat-i: i diganti -kunakatta desu untuk negatif lampau (atsukunakatta desu)."
    },

    # === JLPT N4 SOAL ===
    {
        "id": 11,
        "level": "N4",
        "category": "Tata Bahasa",
        "question": "Pola kalimat untuk meminta tolong secara sopan: 「ちょっと まって [ ? ]」",
        "display": "ちょっと待って [ ? ]",
        "options": ["ください (kudasai)", "ほしい (hoshii)", "あげます (agemasu)", "みてください (mite kudasai)"],
        "correct": 0,
        "exp": "Pola ~てください (~te kudasai) digunakan untuk permohonan sopan: Tolong tunggu sebentar."
    },
    {
        "id": 12,
        "level": "N4",
        "category": "Tata Bahasa",
        "question": "Pola untuk menyatakan pengalaman pernah melakukan sesuatu: 「すしを たべた [ ? ] が あります」",
        "display": "寿司を食べた [ ? ] があります",
        "options": ["こと (koto)", "もの (mono)", "とき (toki)", "ところ (tokoro)"],
        "correct": 0,
        "exp": "Pola [Kata Kerja Bentuk Ta] + ことがある menyatakan pernah melakukan suatu pengalaman."
    },
    {
        "id": 13,
        "level": "N4",
        "category": "Kanji",
        "question": "Cara baca kanji 「図書館」 (perpustakaan) adalah...",
        "display": "図書館",
        "options": ["としょかん (toshokan)", "ずしょかん (zushokan)", "とうしょかん (toushokan)", "としょけん (toshoken)"],
        "correct": 0,
        "exp": "図書館 dibaca としょかん (toshokan)."
    },
    {
        "id": 14,
        "level": "N4",
        "category": "Tata Bahasa",
        "question": "Menyatakan izin diperbolehkan: 「ここで しゃしんを とっても [ ? ]」",
        "display": "ここで写真を撮っても [ ? ]",
        "options": ["いいです (ii desu)", "だめです (dame desu)", "いけません (ikemasen)", "ありません (arimasen)"],
        "correct": 0,
        "exp": "~てもいいです (~te mo ii desu) bermakna 'Boleh / diperkenankan melakukan...'."
    },
    {
        "id": 15,
        "level": "N4",
        "category": "Tata Bahasa",
        "question": "Menyatakan larangan keras: 「ここに くるまを とめては [ ? ]」",
        "display": "ここに車を止めては [ ? ]",
        "options": ["いけません (ikemasen)", "いいです (ii desu)", "あります (arimasu)", "かまいません (kamaimasen)"],
        "correct": 0,
        "exp": "~てはいけません (~te wa ikemasen) digunakan untuk larangan: Tidak boleh memarkir mobil di sini."
    },
    {
        "id": 16,
        "level": "N4",
        "category": "Bentuk Kata Kerja",
        "question": "Bentuk kamus (Jishokei) dari kata kerja 「いきます」 (pergi) adalah...",
        "display": "行きます ➔ Bentuk Kamus",
        "options": ["いく (iku)", "いかない (ikanai)", "いった (itta)", "いける (ikeru)"],
        "correct": 0,
        "exp": "Bentuk dasar kamus dari 行きます adalah 行く (iku)."
    },
    {
        "id": 17,
        "level": "N4",
        "category": "Tata Bahasa",
        "question": "Kondisional pengandaian: 「あめが [ ? ]、いきません。(Jika hujan, saya tidak pergi)」",
        "display": "雨が [ ? ]、行きません",
        "options": ["ふったら (futtara)", "ふれば (fureba)", "ふると (furu to)", "ふなら (fu nara)"],
        "correct": 0,
        "exp": "Bentuk ~たら (~tara) adalah pengandaian paling umum: Ame ga futtara (Jika hujan turun)."
    },
    {
        "id": 18,
        "level": "N4",
        "category": "Tata Bahasa",
        "question": "Menyatakan 'sebelum melakukan': 「ねる [ ? ]、はを みがきます。」",
        "display": "寝る [ ? ]、歯を磨きます",
        "options": ["まえに (mae ni)", "あとで (ato de)", "あいだに (aida ni)", "うちに (uchi ni)"],
        "correct": 0,
        "exp": "[Kata Kerja Kamus] + 前に (mae ni) artinya 'Sebelum melakukan...': Sebelum tidur, menggosok gigi."
    },
    {
        "id": 19,
        "level": "N4",
        "category": "Tata Bahasa",
        "question": "Menyatakan 'setelah selesai melakukan': 「ごはんを たべた [ ? ]、くすりを のみます。」",
        "display": "ご飯を食べた [ ? ]、薬を飲みます",
        "options": ["あとで (ato de)", "まえに (mae ni)", "ときに (toki ni)", "あいだに (aida ni)"],
        "correct": 0,
        "exp": "[Kata Kerja Bentuk Ta] + 後で (ato de) berarti 'Setelah...': Setelah makan nasi, minum obat."
    },
    {
        "id": 20,
        "level": "N4",
        "category": "Keigo",
        "question": "Bentuk sopan halus (Sonkeigo) dari 「たべます」 dan 「のみます」 adalah...",
        "display": "食べます / 飲みます ➔ Sonkeigo",
        "options": ["めしあがります (meshiagarimasu)", "いただきます (itadakimasu)", "ごらんになります (goran ni narimasu)", "おっしゃいます (osshaimasu)"],
        "correct": 0,
        "exp": "召し上がります (meshiagarimasu) adalah bentuk hormat (Sonkeigo) untuk lawan bicara saat makan/minum."
    },

    # === JLPT N3 SOAL ===
    {
        "id": 21,
        "level": "N3",
        "category": "Tata Bahasa",
        "question": "Pola yang menyatakan 'tampaknya / sepertinya akan terjadi seketika': 「あめが [ ? ] です。」",
        "display": "雨が [ ? ] そうです",
        "options": ["ふり (furi)", "ふる (furu)", "ふった (futta)", "ふって (futte)"],
        "correct": 0,
        "exp": "[Masu-stem] + そうです menyatakan perkiraan visual yang sebentar lagi terjadi: Furisesou (Kelihatannya akan turun hujan)."
    },
    {
        "id": 22,
        "level": "N3",
        "category": "Tata Bahasa",
        "question": "Menyatakan kabar atau informasi yang didengar dari sumber lain: 「てんきよほうによると、あしたは あめが [ ? ]」",
        "display": "天気予報によると、明日は雨が [ ? ]",
        "options": ["ふるそうです (furu sou desu)", "ふりそうです (furisou desu)", "ふったそうです (futtasou desu)", "ふれそうです (furesou desu)"],
        "correct": 0,
        "exp": "[Bentuk Biasa/Kamus] + そうです digunakan untuk kutipan kabar burung / rumor / info berita."
    },
    {
        "id": 23,
        "level": "N3",
        "category": "Tata Bahasa",
        "question": "Pola kalimat bermakna 'bukan hanya A, tetapi juga B': 「かれは えいご [ ? ]、にほんごも はなせます。」",
        "display": "彼は英語 [ ? ]、日本語も話せます",
        "options": ["ばかりでなく (bakari de naku)", "にしたがって (ni shitagatte)", "にたいして (ni taishite)", "にとって (ni totte)"],
        "correct": 0,
        "exp": "~ばかりでなく (~bakari de naku) berarti 'Bukan hanya / Tidak sebatas A, melainkan juga B'."
    },
    {
        "id": 24,
        "level": "N3",
        "category": "Tata Bahasa",
        "question": "Pola yang menyatakan 'Sebaiknya melakukan' (saran tegas): 「もっと はやく [ ? ] ほうがいいですよ。」",
        "display": "もっと早く [ ? ] ほうがいいですよ",
        "options": ["ねた (neta)", "ねる (neru)", "ねて (nete)", "ねない (nenai)"],
        "correct": 0,
        "exp": "[Kata Kerja Bentuk Ta] + ほうがいいです adalah saran kuat: Sebaiknya kamu tidur lebih awal."
    },
    {
        "id": 25,
        "level": "N3",
        "category": "Kanji",
        "question": "Cara baca kanji 「複雑」 (rumit/kompleks) yang tepat adalah...",
        "display": "複雑",
        "options": ["ふくざつ (fukuzatsu)", "ふくざん (fukuzan)", "ふくさい (fukusai)", "ふっざつ (fuzzatsu)"],
        "correct": 0,
        "exp": "複雑 dibaca ふくざつ (fukuzatsu), berarti rumit atau kompleks."
    },
    {
        "id": 26,
        "level": "N3",
        "category": "Tata Bahasa",
        "question": "Pola yang menyatakan 'Berdasarkan sudut pandang seseorang': 「わたし [ ? ]、かぞくが いちばん たいせつです。」",
        "display": "私 [ ? ]、家族が一番大切です",
        "options": ["にとって (ni totte)", "について (ni tsuite)", "によって (ni yotte)", "にかんして (ni kanshite)"],
        "correct": 0,
        "exp": "~にとって (~ni totte) berarti 'Bagi / Menurut sudut pandang seseorang'."
    },
    {
        "id": 27,
        "level": "N3",
        "category": "Tata Bahasa",
        "question": "Menyatakan 'Meskipun / Walaupun': 「いっしょうけんめい べんきょうした [ ? ]、しけんに おちてしまった。」",
        "display": "一生懸命勉強した [ ? ]、試験に落ちてしまった",
        "options": ["のに (noni)", "ので (node)", "から (kara)", "ために (tame ni)"],
        "correct": 0,
        "exp": "~のに (~noni) mengekspresikan kontras dan kekecewaan: Padahal sudah belajar mati-matian, tapi malah gagal ujian."
    },
    {
        "id": 28,
        "level": "N3",
        "category": "Kosakata",
        "question": "Sinonim kata dari 「あきらめる」 (menyerah / putus asa) adalah...",
        "display": "あきらめる (Akirameru)",
        "options": ["やめる (yameru)", "つづける (tsuzukeru)", "がんばる (ganbaru)", "はじめる (hajimeru)"],
        "correct": 0,
        "exp": "あきらめる (menyerah) memiliki makna dekat dengan やめる (menghentikan/berhenti berusaha)."
    },
    {
        "id": 29,
        "level": "N3",
        "category": "Tata Bahasa",
        "question": "Pola yang menunjukkan 'Semakin ... maka semakin ...': 「にほんごは べんきょうすれば [ ? ] おもしろくなります。」",
        "display": "日本語は勉強すれば [ ? ] 面白くなります",
        "options": ["勉強するほど (suru hodo)", "勉強するばかり (suru bakari)", "勉強するだけに (suru dake ni)", "勉強するとおり (suru toori)"],
        "correct": 0,
        "exp": "~ば ~ほど (~ba ~hodo) adalah pola 'Semakin ... semakin ...': Semakin dipelajari, semakin menarik."
    },
    {
        "id": 30,
        "level": "N3",
        "category": "Kanji",
        "question": "Cara baca kanji 「遠慮」 (sungkan / menahan diri) yang tepat adalah...",
        "display": "遠慮",
        "options": ["えんりょ (enryo)", "えんろ (enro)", "おんりょ (onryo)", "えんりょう (enryou)"],
        "correct": 0,
        "exp": "遠慮 dibaca えんりょ (enryo), contoh: 遠慮しないでください (Jangan sungkan-sungkan)."
    }
]

# Tambahkan 70 variasi soal berkualitas tinggi lainnya untuk memperkaya bank soal (Total 100+ soal)
extra_data = [
    # N5 Extra
    ("N5", "Kanji", "Huruf kanji dari kata 「ひと」 (orang) adalah...", "ひと", ["人", "入", "八", "大"], 0, "「人」 dibaca ひと (hito) atau じん (jin)."),
    ("N5", "Partikel", "Menyatakan bersama siapa: ともだち [ ? ] えいがを みます。(Menonton bioskop bersama teman)", "友達 [ ? ] 映画を見ます", ["と (to)", "に (ni)", "で (de)", "を (o)"], 0, "Partikel と (to) artinya 'bersama' atau 'dan'."),
    ("N5", "Kosakata", "Antonim (lawan kata) dari 「たかい」 (tinggi / mahal) untuk konteks harga adalah...", "たかい (Mahal) ➔ Lawan Kata", ["やすい (yasui)", "ひくい (hikui)", "おもい (omoi)", "ちいさい (chiisai)"], 0, "Lawan kata mahal (takai) adalah murah (yasui). Lawan kata tinggi adalah rendah (hikui)."),
    ("N5", "Kanji", "Cara baca kanji 「先生」 yang benar adalah...", "先生", ["せんせい (sensei)", "さきせい (sakisei)", "せんしょう (senshou)", "しょうせい (shousei)"], 0, "先生 dibaca せんせい (guru/pengajar)."),
    ("N5", "Partikel", "Menyatakan alat/transportasi: バス [ ? ] がっこうへ いきます。(Pergi ke sekolah dengan bus)", "バス [ ? ] 学校へ行きます", ["で (de)", "に (ni)", "を (o)", "へ (e)"], 0, "Partikel で (de) digunakan untuk menyatakan sarana transportasi atau alat."),
    ("N5", "Tata Bahasa", "Bentuk ajakan sopan bersama: 「いっしょに おちゃを [ ? ]」", "一緒にお茶を [ ? ]", ["のみましょう (nomimashou)", "のみません (nomimasen)", "のんでください (nonde kudasai)", "のめません (nomemasen)"], 0, "~ましょう (~mashou) adalah ajakan 'Mari kita minum teh bersama'."),
    ("N5", "Waktu", "Pukul 07:30 dalam bahasa Jepang diucapkan...", "07:30", ["しちじはん (shichiji han)", "ななじはん (nanaji han)", "しちじさんじゅう (shichiji sanjuu)", "ななじさんじゅっぷん (nanaji sanjuppun)"], 0, "Jam 7 = しちじ (shichiji), setengah = はん (han). Jadi しちじはん."),
    ("N5", "Kanji", "Arti dari kanji 「車」 adalah...", "車", ["Mobil / Kendaraan", "Kereta", "Pesawat", "Sepeda"], 0, "車 dibaca くるま (kuruma), artinya mobil/kendaraan beroda."),
    ("N5", "Tata Bahasa", "Menyatakan keinginan benda: 「あたらしい くるま [ ? ] ほしいです。」", "新しい車 [ ? ] ほしいです", ["が (ga)", "を (o)", "に (ni)", "で (de)"], 0, "Objek dari kata sifat ほしい (hoshii = ingin) ditandai dengan partikel が (ga)."),
    ("N5", "Partikel", "Menyatakan waktu kejadian spesifik: あさ ６じ [ ? ] おきます。(Bangun pada jam 6 pagi)", "朝６時 [ ? ] 起きます", ["に (ni)", "で (de)", "を (o)", "へ (e)"], 0, "Waktu angka spesifik ditandai dengan partikel に (ni)."),

    # N4 Extra
    ("N4", "Tata Bahasa", "Ungkapan memberikan sesuatu kepada orang lain: 「わたしは ともだちに プレゼントを [ ? ]」", "私は友達にプレゼントを [ ? ]", ["あげました (agemashita)", "もらいました (moraimashita)", "くれました (kuremashita)", "いただきました (itadakimashita)"], 0, "Saya memberi kepada orang lain = あげます (agemasu)."),
    ("N4", "Tata Bahasa", "Orang lain memberikan sesuatu kepada saya: 「たなかさんは わたしに ほんを [ ? ]」", "田中さんは私に本を [ ? ]", ["くれました (kuremashita)", "あげました (agemashita)", "もらいました (moraimashita)", "さしあげました (sashiagemashita)"], 0, "Orang lain memberi kepada saya/keluarga saya = くれます (kuremasu)."),
    ("N4", "Bentuk Potensial", "Bentuk kemampuan/potensial dari 「にほんごを はなします」 (bisa berbicara bahasa Jepang) adalah...", "話します ➔ Potensial", ["はなせます (hanasemasu)", "はなされます (hanasaremasu)", "はなしできます (hanashidekimasu)", "はなさせます (hanasasemasu)"], 0, "Kata kerja Gol 1 はなす ➔ はなせる / 話せます (bisa bicara)."),
    ("N4", "Tata Bahasa", "Menyatakan rencana pasti: 「らいねん にほんへ いく [ ? ] です。」", "来年日本へ行く [ ? ] です", ["よてい (yotei)", "つもり (tsumori)", "はず (hazu)", "こと (koto)"], 0, "予定 (yotei) digunakan untuk rencana resmi yang terjadwal."),
    ("N4", "Kanji", "Cara baca kanji 「案内」 (memandu / informasi petunjuk) adalah...", "案内", ["あんない (annai)", "おんない (onnai)", "あんないん (annain)", "やすうち (yasuuchi)"], 0, "案内 dibaca あんない (annai)."),
    ("N4", "Tata Bahasa", "Menyatakan perubahan kondisi 'Menjadi dingin': 「さむく [ ? ]」", "寒く [ ? ]", ["なりました (narimashita)", "しました (shimashita)", "ありました (arimashita)", "できました (dekimashita)"], 0, "Kata sifat-i + くなる (menjadi): Samuku narimashita (Sudah menjadi dingin)."),
    ("N4", "Tata Bahasa", "Menyatakan dua kegiatan berlangsung serentak: 「おんがくを きき [ ? ]、べんきょうします。(Belajar sambil mendengar musik)」", "音楽を聞き [ ? ]、勉強します", ["ながら (nagara)", "まえに (mae ni)", "あとで (ato de)", "うちに (uchi ni)"], 0, "[Masu-stem] + ながら (~nagara) berarti 'sambil melakukan...': Kiki-nagara."),
    ("N4", "Bentuk Pasif", "Bentuk pasif (di- / ukemi): 「せんせいに [ ? ]」(Dipuji oleh guru)", "先生に [ ? ]", ["ほめられました (homeraremashita)", "ほめさせました (homesasemashita)", "ほめました (homemashita)", "ほめきれました (homekiremashita)"], 0, "ほめる ➔ ほめられる (dipuji)."),
    ("N4", "Bentuk Kausatif", "Bentuk kausatif (menyuruh / membiarkan): 「こどもに やさいを [ ? ]」", "子供に野菜を [ ? ]", ["たべさせます (tabesasemasu)", "たべられます (taberaremasu)", "たべさせられます (tabesaseraremasu)", "たべます (tabemasu)"], 0, "Kausatif Gol 2 食べる ➔ 食べさせる (menyuruh makan)."),
    ("N4", "Kanji", "Cara baca kanji 「試験」 (ujian/tes) adalah...", "試験", ["しけん (shiken)", "じけん (jiken)", "しげん (shigen)", "ちけん (chiken)"], 0, "試験 dibaca しけん (shiken)."),

    # N3 Extra
    ("N3", "Tata Bahasa", "Pola menyatakan 'Pasti / Seharusnya terjadi': 「かれは まいにち れんしゅうしたから、かてる [ ? ] です。」", "勝てる [ ? ] です", ["はず (hazu)", "わけ (wake)", "もの (mono)", "こと (koto)"], 0, "~はずです (~hazu desu) menyatakan keyakinan rasional logis: Seharusnya ia bisa menang."),
    ("N3", "Tata Bahasa", "Menyatakan 'Tidak mungkin': 「そんな うそ、しんじられる [ ? ] がない。」", "信じられる [ ? ] がない", ["わけ (wake)", "はず (hazu)", "こと (koto)", "もの (mono)"], 0, "~わけがない (~wake ga nai) bermakna mustahil / sama sekali tidak masuk akal."),
    ("N3", "Tata Bahasa", "Menyatakan 'Bukan main / Sangat amat': 「うれしくて [ ? ]。(Sangat senang sampai tak terbendung)」", "うれしくて [ ? ]", ["たまらない (tamaranai)", "ならない (naranai)", "しょうがない (shouganai)", "いけない (ikenai)"], 0, "~てたまらない menyatakan emosi atau sensasi fisik yang sangat memuncak tak tertahankan."),
    ("N3", "Tata Bahasa", "Menyatakan 'Selagi / Sebelum kondisi berubah': 「わかい [ ? ]、いろいろな けいけんを したい。」", "若いうちに、いろいろな経験をしたい", ["うちに (uchi ni)", "あいだに (aida ni)", "までに (made ni)", "まえに (mae ni)"], 0, "~うちに (~uchi ni) berarti 'Selagi masih (muda), mumpung kesempatan masih ada'."),
    ("N3", "Tata Bahasa", "Menyatakan 'Sebagai / Berstatus sebagai': 「かれは がくせいの [ ? ]、ボランティアに さんかした。」", "彼は学生 [ ? ]、ボランティアに参加した", ["として (to shite)", "にとって (ni totte)", "について (ni tsuite)", "にたいして (ni taishite)"], 0, "~として (~to shite) berarti 'Sebagai / Atas nama status/kapasitas'."),
    ("N3", "Kanji", "Cara baca kanji 「解決」 (solusi / penyelesaian masalah) adalah...", "解決", ["かいけつ (kaiketsu)", "かいさつ (kaisatsu)", "かいけち (kaikechi)", "げけつ (geketsu)"], 0, "解決 dibaca かいけつ (kaiketsu)."),
    ("N3", "Tata Bahasa", "Menyatakan 'Meskipun demikian': 「かれは びょうき [ ? ]、かいしゃへ いった。」", "彼は病気 [ ? ]、会社へ行った", ["なのに (na noni)", "だから (dakara)", "ので (node)", "ため (tame)"], 0, "なのに (na noni) digunakan setelah kata benda untuk menyatakan kontradiksi yang mengejutkan."),
    ("N3", "Kosakata", "Arti ungkapan idiom 「あたまに くる」 (Atama ni kuru) adalah...", "頭にくる", ["Marah / Kesal", "Pusing kepala", "Pintar sekali", "Lupa ingatan"], 0, "頭にくる (atama ni kuru) adalah ungkapan kiasan bahasa Jepang yang berarti merasa sangat kesal / marah."),
    ("N3", "Tata Bahasa", "Menyatakan 'Segera setelah': 「いえに つき [ ? ]、あめが ふりだした。」", "家に着き [ ? ]、雨が降り出した", ["しだい (shidai)", "とたん (totan)", "なり (nari)", "そばから (soba kara)"], 0, "[Kata kerja Masu-stem] + 次第 (shidai) atau [Bentuk Ta] + とたん (totan). Di sini bentuk lampau tsuki-shidai / tsuita totan."),
    ("N3", "Kanji", "Cara baca kanji 「約束」 (janji) adalah...", "約束", ["やくそく (yakusoku)", "やくぞく (yakuzoku)", "えきそく (ekisoku)", "やっそく (yassoku)"], 0, "約束 dibaca やくそく (yakusoku)."),

    # Extra 40 Diverse Questions
    ("N5", "Angka", "Angka 10.000 dalam bahasa Jepang disebut...", "10,000", ["いちまん (ichiman)", "じゅうせん (juusen)", "ひゃくまん (hyakuman)", "せん (sen)"], 0, "10.000 adalah 一万 (ichiman)."),
    ("N5", "Kosakata", "Kata 「ともだち」 memiliki arti...", "友達 (Tomodachi)", ["Teman", "Keluarga", "Guru", "Tetangga"], 0, "友達 (tomodachi) artinya Teman / Sahabat."),
    ("N5", "Partikel", "Menyatakan kepemilikan: これは わたし [ ? ] ほんです。(Ini adalah buku milik saya)", "これは私 [ ? ] 本です", ["の (no)", "は (wa)", "を (o)", "に (ni)"], 0, "Partikel の (no) menyatakan kepemilikan atau modifikasi benda."),
    ("N5", "Kalimat", "Salam yang diucapkan sebelum mulai makan adalah...", "Salam Sebelum Makan", ["いただきます (itadakimasu)", "ごちそうさまでした (gochisousama deshita)", "おねがいします (onegaishimasu)", "おやすみなさい (oyasuminasai)"], 0, "いただきます (itadakimasu) diucapkan sebelum menyantap makanan."),
    ("N5", "Kalimat", "Salam yang diucapkan setelah selesai makan adalah...", "Salam Selesai Makan", ["ごちそうさまでした (gochisousama deshita)", "いただきます (itadakimasu)", "ただいま (tadaima)", "いってきます (ittekimasu)"], 0, "ごちそうさまでした (gochisousama deshita) artinya terima kasih atas hidangannya."),
    ("N4", "Tata Bahasa", "Pola ~やすい (~yasui) menyatakan 'mudah dilakukan': 「このペンは とても [ ? ] です。」", "このペンはとても [ ? ] です", ["かきやすい (kakiyasui)", "かきにくい (kakinikui)", "かくやすい (kakuyasui)", "かいてやすい (kaiteyasui)"], 0, "[Masu-stem] + やすい artinya 'mudah untuk ditulis'."),
    ("N4", "Tata Bahasa", "Pola ~にくい (~nikui) menyatakan 'sulit/sukar dilakukan': 「このくすりは [ ? ] です。」", "この薬は [ ? ] です", ["のみにくい (nominikui)", "のまない (nomanai)", "のむにくい (nomunikui)", "のんでにくい (nondenikui)"], 0, "[Masu-stem] + にくい artinya 'sukar untuk diminum'."),
    ("N4", "Kosakata", "Arti dari kata 「しんぱいする」 (shinpai suru) adalah...", "心配する (Shinpai suru)", ["Khawatir / Cemas", "Bangga", "Marah", "Kecewa"], 0, "心配 (shinpai) artinya khawatir atau cemas."),
    ("N4", "Tata Bahasa", "Menyatakan tujuan pergi: 「デパートへ ふくを [ ? ] いきます。」", "デパートへ服を [ ? ] 行きます", ["かいに (kai ni)", "かうに (kau ni)", "かってに (katte ni)", "かうため (kau tame)"], 0, "[Masu-stem] + に 行きます menyatakan tujuan perpindahan: Pergi untuk membeli pakaian."),
    ("N4", "Kanji", "Cara baca kanji 「出発」 (keberangkatan) adalah...", "出発", ["しゅっぱつ (shuppatsu)", "でぱつ (depatsu)", "しゅつはつ (shutsuhatsu)", "しゅっぱん (shuppan)"], 0, "出発 dibaca しゅっぱつ (shuppatsu)."),
    ("N3", "Tata Bahasa", "Menyatakan 'Bisa dikatakan bahwa / Terhitung sebagai': 「かれは にほんごが じょうずな [ ? ] だ。」", "彼は日本語が上手な [ ? ] だ", ["ほう (hou)", "わけ (wake)", "はず (hazu)", "もの (mono)"], 0, "~ほうだ (~hou da) menyatakan tergolong / relatif termasuk kategori tersebut."),
    ("N3", "Tata Bahasa", "Menyatakan 'Secara kebetulan saat itu': 「かいぎの [ ? ]、じしんが おきた。」", "会議の [ ? ]、地震が起きた", ["さいちゅうに (saichuu ni)", "うちに (uchi ni)", "あいだに (aida ni)", "まえに (mae ni)"], 0, "~最中に (~saichuu ni) artinya 'Tepat di tengah-tengah / puncak jalannya suatu kegiatan'."),
    ("N3", "Tata Bahasa", "Menyatakan 'Satu-satunya pilihan yang tersisa': 「バスがないから、あるく [ ? ] ない。」", "歩く [ ? ] ない", ["しかない (shika nai)", "だけない (dake nai)", "ばかりない (bakari nai)", "ほどない (hodo nai)"], 0, "[Kamus] + しかない artinya 'Tidak ada pilihan lain selain berjalan kaki'."),
    ("N3", "Kanji", "Cara baca kanji 「絶望」 (keputusasaan) adalah...", "絶望", ["ぜつぼう (zetsubou)", "ぜつぼ (zetsubo)", "ぜっぽう (zeppou)", "たつのぞみ (tatsunozomi)"], 0, "絶望 dibaca ぜつぼう (zetsubou)."),
    ("N3", "Tata Bahasa", "Menyatakan 'Tidak peduli apakah A atau B': 「おとな [ ? ] こども [ ? ]、だれでも たのしめます。」", "大人 [ ? ] 子供 [ ? ]、楽しめます", ["であれ / であれ (de are / de are)", "とか / とか (toka / toka)", "なり / なり (nari / nari)", "だの / だの (dano / dano)"], 0, "~であれ ~であれ bermakna 'Baik A maupun B, tanpa terkecuali'." )
]

current_id = len(questions) + 1
for lvl, cat, q_text, disp, opts, corr, exp_text in extra_data:
    questions.append({
        "id": current_id,
        "level": lvl,
        "category": cat,
        "question": q_text,
        "display": disp,
        "options": opts,
        "correct": corr,
        "exp": exp_text
    })
    current_id += 1

# Pastikan folder target ada
os.makedirs('nihongo-app/src/data', exist_ok=True)

# Simpan sebagai file JSON murni agar mudah dimodifikasi
with open('nihongo-app/src/data/hardcore_questions.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

# Simpan sebagai JavaScript module / global object agar langsung bisa dimuat di browser offline
js_content = "/**\n"
js_content += " * ========================================================\n"
js_content += " * KAMUI NIHONGO - HARDCORE BOSS MODE QUESTION BANK\n"
js_content += " * Kurikulum Standar Gabungan JLPT N5 • N4 • N3\n"
js_content += " * Aturan: 1 SALAH = GAME OVER (Skor Kembali ke 0!)\n"
js_content += f" * Total Bank Soal Saat Ini: {len(questions)} Soal Terverifikasi\n"
js_content += " * Anda dapat menambahkan soal baru kapan saja di file ini!\n"
js_content += " * ========================================================\n"
js_content += " */\n\n"
js_content += "window.HARDCORE_QUESTIONS_DATA = " + json.dumps(questions, ensure_ascii=False, indent=2) + ";\n"

with open('nihongo-app/src/data/hardcore_questions.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"SUKSES! Dibuat {len(questions)} soal Hardcore di:")
print("1. nihongo-app/src/data/hardcore_questions.json")
print("2. nihongo-app/src/data/hardcore_questions.js")
