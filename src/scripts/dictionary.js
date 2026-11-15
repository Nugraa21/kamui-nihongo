// =======================================================
// NihonGo! Kamus Lengkap Bahasa Jepang - Indonesia
// Search by Kanji, Kana, Romaji, or Indonesian Meaning
// Audio Pronunciation • JLPT Level Tags • Part of Speech
// Credit: nugra21.web.app
// =======================================================

const DICTIONARY_DATABASE = [
    {"kanji": "行きます", "reading": "いきます", "romaji": "ikimasu", "meaning": "Pergi", "pos": "Kata Kerja", "level": "N5", "example": "明日学校へ行きます。(Besok pergi ke sekolah)"},
    {"kanji": "来ます", "reading": "きます", "romaji": "kimasu", "meaning": "Datang", "pos": "Kata Kerja", "level": "N5", "example": "友達が日本へ来ます。(Teman datang ke Jepang)"},
    {"kanji": "帰ります", "reading": "かえります", "romaji": "kaerimasu", "meaning": "Pulang", "pos": "Kata Kerja", "level": "N5", "example": "午後６時にうちへ帰ります。(Pulang ke rumah jam 6 sore)"},
    {"kanji": "食べます", "reading": "たべます", "romaji": "tabemasu", "meaning": "Makan", "pos": "Kata Kerja", "level": "N5", "example": "朝ご飯を食べます。(Makan sarapan pagi)"},
    {"kanji": "飲みます", "reading": "のみます", "romaji": "nomimasu", "meaning": "Minum", "pos": "Kata Kerja", "level": "N5", "example": "お茶を飲みます。(Minum teh hijau)"},
    {"kanji": "見ます", "reading": "みます", "romaji": "mimasu", "meaning": "Melihat / Menonton", "pos": "Kata Kerja", "level": "N5", "example": "映画を見ます。(Menonton film)"},
    {"kanji": "聞きます", "reading": "ききます", "romaji": "kikimasu", "meaning": "Mendengar / Bertanya", "pos": "Kata Kerja", "level": "N5", "example": "音楽を聞きます。(Mendengarkan musik)"},
    {"kanji": "読みます", "reading": "よみます", "romaji": "yomimasu", "meaning": "Membaca", "pos": "Kata Kerja", "level": "N5", "example": "本を読みます。(Membaca buku)"},
    {"kanji": "書きます", "reading": "かきます", "romaji": "kakimasu", "meaning": "Menulis / Menggambar", "pos": "Kata Kerja", "level": "N5", "example": "手紙を書きます。(Menulis surat)"},
    {"kanji": "買います", "reading": "かいます", "romaji": "kaimasu", "meaning": "Membeli", "pos": "Kata Kerja", "level": "N5", "example": "パンを買います。(Membeli roti)"},
    {"kanji": "話します", "reading": "はなします", "romaji": "hanashimasu", "meaning": "Berbicara / Menceritakan", "pos": "Kata Kerja", "level": "N5", "example": "日本語で話します。(Berbicara dalam bahasa Jepang)"},
    {"kanji": "会います", "reading": "あいます", "romaji": "aimasu", "meaning": "Bertemu", "pos": "Kata Kerja", "level": "N5", "example": "駅で先生に会います。(Bertemu guru di stasiun)"},
    {"kanji": "起きます", "reading": "おきます", "romaji": "okimasu", "meaning": "Bangun tidur", "pos": "Kata Kerja", "level": "N5", "example": "毎朝６時に起きます。(Setiap pagi bangun jam 6)"},
    {"kanji": "寝ます", "reading": "ねます", "romaji": "nemasu", "meaning": "Tidur / Beristirahat", "pos": "Kata Kerja", "level": "N5", "example": "夜１１時に寝ます。(Tidur jam 11 malam)"},
    {"kanji": "勉強します", "reading": "べんきょうします", "romaji": "benkyou shimasu", "meaning": "Belajar", "pos": "Kata Kerja", "level": "N5", "example": "日本語を勉強します。(Belajar bahasa Jepang)"},
    {"kanji": "働きます", "reading": "はたらきます", "romaji": "hatarakimasu", "meaning": "Bekerja", "pos": "Kata Kerja", "level": "N5", "example": "日本の会社で働きます。(Bekerja di perusahaan Jepang)"},
    {"kanji": "休みます", "reading": "やすみます", "romaji": "yasumimasu", "meaning": "Istirahat / Libur", "pos": "Kata Kerja", "level": "N5", "example": "日曜日は休みます。(Hari Minggu beristirahat)"},
    {"kanji": "教えます", "reading": "おしえます", "romaji": "oshiemasu", "meaning": "Mengajar / Memberitahukan", "pos": "Kata Kerja", "level": "N5", "example": "英語を教えます。(Mengajar bahasa Inggris)"},
    {"kanji": "習います", "reading": "ならいます", "romaji": "naraimasu", "meaning": "Belajar (dari orang lain)", "pos": "Kata Kerja", "level": "N5", "example": "先生に習います。(Belajar dari guru)"},
    {"kanji": "貸します", "reading": "かします", "romaji": "kashimasu", "meaning": "Meminjamkan", "pos": "Kata Kerja", "level": "N5", "example": "ペンを貸します。(Meminjamkan pena)"},
    {"kanji": "借ります", "reading": "かります", "romaji": "karimasu", "meaning": "Meminjam", "pos": "Kata Kerja", "level": "N5", "example": "図書館で本を借ります。(Meminjam buku di perpustakaan)"},
    {"kanji": "あげます", "reading": "あげます", "romaji": "agemasu", "meaning": "Memberi (kepada orang lain)", "pos": "Kata Kerja", "level": "N5", "example": "友達にプレゼントをあげます。(Memberi kado kepada teman)"},
    {"kanji": "もらいます", "reading": "もらいます", "romaji": "moraimasu", "meaning": "Menerima / Mendapatkan", "pos": "Kata Kerja", "level": "N5", "example": "母から花をもらいました。(Menerima bunga dari ibu)"},
    {"kanji": "降ります", "reading": "ふります", "romaji": "furimasu", "meaning": "Turun (hujan / salju)", "pos": "Kata Kerja", "level": "N5", "example": "雨が降ります。(Hujan turun)"},
    {"kanji": "乗ります", "reading": "のります", "romaji": "norimasu", "meaning": "Naik (kendaraan)", "pos": "Kata Kerja", "level": "N5", "example": "電車に乗ります。(Naik kereta)"},
    {"kanji": "降ります", "reading": "おります", "romaji": "orimasu", "meaning": "Turun (dari kendaraan)", "pos": "Kata Kerja", "level": "N5", "example": "バスを降ります。(Turun dari bus)"},
    {"kanji": "洗います", "reading": "あらいます", "romaji": "araimasu", "meaning": "Mencuci", "pos": "Kata Kerja", "level": "N5", "example": "手を洗います。(Mencuci tangan)"},
    {"kanji": "泳ぎます", "reading": "およぎます", "romaji": "oyogimasu", "meaning": "Berenang", "pos": "Kata Kerja", "level": "N5", "example": "プールで泳ぎます。(Berenang di kolam renang)"},
    {"kanji": "待ちます", "reading": "まちます", "romaji": "machimasu", "meaning": "Menunggu", "pos": "Kata Kerja", "level": "N5", "example": "ここで待ってください。(Tolong tunggu di sini)"},
    {"kanji": "持ちます", "reading": "もちます", "romaji": "mochimasu", "meaning": "Membawa / Memegang", "pos": "Kata Kerja", "level": "N5", "example": "荷物を持ちます。(Membawa barang bawaan)"},
    {"kanji": "呼びます", "reading": "よびます", "romaji": "yobimasu", "meaning": "Memanggil", "pos": "Kata Kerja", "level": "N5", "example": "タクシーを呼びます。(Memanggil taksi)"},
    {"kanji": "立ちます", "reading": "たちます", "romaji": "tachimasu", "meaning": "Berdiri", "pos": "Kata Kerja", "level": "N5", "example": "席から立ちます。(Berdiri dari kursi)"},
    {"kanji": "座ります", "reading": "すわります", "romaji": "suwarimasu", "meaning": "Duduk", "pos": "Kata Kerja", "level": "N5", "example": "椅子に座ります。(Duduk di kursi)"},
    {"kanji": "使います", "reading": "つかいます", "romaji": "tsukaimasu", "meaning": "Menggunakan / Memakai", "pos": "Kata Kerja", "level": "N5", "example": "パソコンを使います。(Menggunakan komputer)"},
    {"kanji": "置きます", "reading": "おきます", "romaji": "okimasu", "meaning": "Meletakkan / Menaruh", "pos": "Kata Kerja", "level": "N5", "example": "机の上に置きます。(Menaruh di atas meja)"},
    {"kanji": "作ります", "reading": "つくります", "romaji": "tsukurimasu", "meaning": "Membuat / Memproduksi", "pos": "Kata Kerja", "level": "N5", "example": "日本料理を作ります。(Membuat masakan Jepang)"},
    {"kanji": "売ります", "reading": "うります", "romaji": "urimasu", "meaning": "Menjual", "pos": "Kata Kerja", "level": "N5", "example": "野菜を売ります。(Menjual sayur-sayuran)"},
    {"kanji": "知ります", "reading": "しります", "romaji": "shirimasu", "meaning": "Mengetahui / Mengenal", "pos": "Kata Kerja", "level": "N5", "example": "その人を知っています。(Saya mengenal orang tersebut)"},
    {"kanji": "住みます", "reading": "すみます", "romaji": "sumimasu", "meaning": "Tinggal / Menetap", "pos": "Kata Kerja", "level": "N5", "example": "東京に住んでいます。(Tinggal di Tokyo)"},
    {"kanji": "案内します", "reading": "あんないします", "romaji": "annai shimasu", "meaning": "Memandu / Menuntun jalan", "pos": "Kata Kerja", "level": "N4", "example": "街を案内します。(Memandu keliling kota)"},
    {"kanji": "説明します", "reading": "せつめいします", "romaji": "setsumei shimasu", "meaning": "Menjelaskan / Menerangkan", "pos": "Kata Kerja", "level": "N4", "example": "使い方を説明します。(Menjelaskan cara penggunaan)"},
    {"kanji": "相談します", "reading": "そうだんします", "romaji": "soudan shimasu", "meaning": "Berkonsultasi / Berdiskusi", "pos": "Kata Kerja", "level": "N4", "example": "先生に相談します。(Berkonsultasi dengan guru)"},
    {"kanji": "紹介します", "reading": "しょうかいします", "romaji": "shoukai shimasu", "meaning": "Memperkenalkan", "pos": "Kata Kerja", "level": "N4", "example": "友達を紹介します。(Memperkenalkan teman)"},
    {"kanji": "準備します", "reading": "じゅんびします", "romaji": "junbi shimasu", "meaning": "Mempersiapkan", "pos": "Kata Kerja", "level": "N4", "example": "旅行の準備をします。(Mempersiapkan perjalanan)"},
    {"kanji": "連絡します", "reading": "れんらくします", "romaji": "renraku shimasu", "meaning": "Menghubungi", "pos": "Kata Kerja", "level": "N4", "example": "後で連絡します。(Nanti saya hubungi)"},
    {"kanji": "片付けます", "reading": "かたづけます", "romaji": "katadzukemasu", "meaning": "Membereskan / Merapikan", "pos": "Kata Kerja", "level": "N4", "example": "部屋を片付けます。(Merapikan kamar)"},
    {"kanji": "乗り換えます", "reading": "のりかえます", "romaji": "norikaemasu", "meaning": "Pindah kendaraan / Transit", "pos": "Kata Kerja", "level": "N4", "example": "新宿で乗り換えます。(Pindah kereta di Shinjuku)"},
    {"kanji": "届きます", "reading": "とどきます", "romaji": "todokimasu", "meaning": "Sampai / Tiba (paket/surat)", "pos": "Kata Kerja", "level": "N4", "example": "荷物が届きました。(Paket kiriman telah tiba)"},
    {"kanji": "運びます", "reading": "はこびます", "romaji": "hakobimasu", "meaning": "Mengangkut / Membawa", "pos": "Kata Kerja", "level": "N4", "example": "重い荷物を運びます。(Mengangkut barang yang berat)"},
    {"kanji": "直します", "reading": "なおします", "romaji": "naoshimasu", "meaning": "Memperbaiki / Mengoreksi", "pos": "Kata Kerja", "level": "N4", "example": "自転車を直します。(Memperbaiki sepeda)"},
    {"kanji": "見つかります", "reading": "みつかります", "romaji": "mitsukarimasu", "meaning": "Ditemukan / Tertemukan", "pos": "Kata Kerja", "level": "N4", "example": "鍵が見つかりました。(Kuncinya sudah ketemu)"},
    {"kanji": "探します", "reading": "さがします", "romaji": "sagashimasu", "meaning": "Mencari", "pos": "Kata Kerja", "level": "N4", "example": "新しいアパートを探します。(Mencari apartemen baru)"},
    {"kanji": "遅れます", "reading": "おくremark: おくれます", "romaji": "okuremasu", "meaning": "Terlambat", "pos": "Kata Kerja", "level": "N4", "example": "授業に遅れました。(Terlambat masuk kelas)"},
    {"kanji": "間に合います", "reading": "まにあいます", "romaji": "maniaimasu", "meaning": "Tepat waktu / Sempat", "pos": "Kata Kerja", "level": "N4", "example": "電車に間に合いました。(Sempat naik kereta)"},
    {"kanji": "手伝います", "reading": "てつだいます", "romaji": "tetsudaimasu", "meaning": "Membantu", "pos": "Kata Kerja", "level": "N4", "example": "料理を手伝います。(Membantu memasak)"},
    {"kanji": "選びます", "reading": "えらびます", "romaji": "erabimasu", "meaning": "Memilih", "pos": "Kata Kerja", "level": "N4", "example": "好きな色を選びます。(Memilih warna yang disukai)"},
    {"kanji": "通います", "reading": "かよいます", "romaji": "kayoimasu", "meaning": "Pergi-pulang / Rutin mondar-mandir", "pos": "Kata Kerja", "level": "N4", "example": "大学に通っています。(Rutin kuliah di universitas)"},
    {"kanji": "頼みます", "reading": "たのみます", "romaji": "tanomimasu", "meaning": "Meminta tolong / Memesan", "pos": "Kata Kerja", "level": "N4", "example": "コーヒーを頼みます。(Memesan kopi)"},
    {"kanji": "断ります", "reading": "ことわります", "romaji": "kotowarimasu", "meaning": "Menolak", "pos": "Kata Kerja", "level": "N4", "example": "誘いを断ります。(Menolak ajakan)"},
    {"kanji": "成功します", "reading": "せいこうします", "romaji": "seikou shimasu", "meaning": "Berhasil / Sukses", "pos": "Kata Kerja", "level": "N3", "example": "プロジェクトが成功しました。(Proyek berhasil dengan sukses)"},
    {"kanji": "失敗します", "reading": "しっぱいします", "romaji": "shippai shimasu", "meaning": "Gagal", "pos": "Kata Kerja", "level": "N3", "example": "試験に失敗しました。(Gagal dalam ujian)"},
    {"kanji": "参加します", "reading": "さんかします", "romaji": "sanka shimasu", "meaning": "Berpartisipasi / Mengikuti", "pos": "Kata Kerja", "level": "N3", "example": "セミナーに参加します。(Mengikuti seminar)"},
    {"kanji": "解決します", "reading": "かいけつします", "romaji": "kaiketsu shimasu", "meaning": "Menyelesaikan masalah", "pos": "Kata Kerja", "level": "N3", "example": "問題を解決します。(Menyelesaikan persoalan)"},
    {"kanji": "遠慮します", "reading": "えんりょします", "romaji": "enryo shimasu", "meaning": "Sungkan / Menahan diri", "pos": "Kata Kerja", "level": "N3", "example": "遠慮しないでください。(Jangan sungkan-sungkan)"},
    {"kanji": "確認します", "reading": "かくにんします", "romaji": "kakunin shimasu", "meaning": "Memeriksa / Mengonfirmasi", "pos": "Kata Kerja", "level": "N3", "example": "スケジュールを確認します。(Mengonfirmasi jadwal)"},
    {"kanji": "応援します", "reading": "おうえんします", "romaji": "ouen shimasu", "meaning": "Mendukung / Bersorak menyemangati", "pos": "Kata Kerja", "level": "N3", "example": "いつも応援しています。(Selalu mendukungmu)"},
    {"kanji": "管理します", "reading": "かんりします", "romaji": "kanri shimasu", "meaning": "Mengelola / Memanajemeni", "pos": "Kata Kerja", "level": "N3", "example": "データを安全に管理します。(Mengelola data dengan aman)"},
    {"kanji": "発展します", "reading": "はってんします", "romaji": "hatten shimasu", "meaning": "Berkembang / Maju pesat", "pos": "Kata Kerja", "level": "N3", "example": "経済が急速に発展します。(Perekonomian berkembang pesat)"},
    {"kanji": "集中します", "reading": "しゅうちゅうします", "romaji": "shuuchuu shimasu", "meaning": "Berkonsentrasi / Fokus", "pos": "Kata Kerja", "level": "N3", "example": "勉強に集中します。(Fokus belajar)"},
    {"kanji": "感動します", "reading": "かんどうします", "romaji": "kandou shimasu", "meaning": "Terharu / Tersentuh hati", "pos": "Kata Kerja", "level": "N3", "example": "その映画に感動しました。(Sangat terharu menonton film itu)"},
    {"kanji": "満足します", "reading": "まんぞくします", "romaji": "manzoku shimasu", "meaning": "Merasa puas", "pos": "Kata Kerja", "level": "N3", "example": "結果に満足しています。(Puas dengan hasilnya)"},
    {"kanji": "大きい", "reading": "おおきい", "romaji": "ookii", "meaning": "Besar", "pos": "Kata Sifat", "level": "N5", "example": "大きい家。(Rumah besar)"},
    {"kanji": "小さい", "reading": "ちいさい", "romaji": "chiisai", "meaning": "Kecil", "pos": "Kata Sifat", "level": "N5", "example": "小さい猫。(Kucing kecil)"},
    {"kanji": "新しい", "reading": "あたらしい", "romaji": "atarashii", "meaning": "Baru", "pos": "Kata Sifat", "level": "N5", "example": "新しい靴。(Sepatu baru)"},
    {"kanji": "古い", "reading": "ふるい", "romaji": "furui", "meaning": "Lama / Kuno", "pos": "Kata Sifat", "level": "N5", "example": "古いお寺。(Kuil kuno)"},
    {"kanji": "いい / よい", "reading": "いい", "romaji": "ii / yoi", "meaning": "Bagus / Baik", "pos": "Kata Sifat", "level": "N5", "example": "天気がいいです。(Cuacanya bagus)"},
    {"kanji": "悪い", "reading": "わるい", "romaji": "warui", "meaning": "Buruk / Jelek", "pos": "Kata Sifat", "level": "N5", "example": "気分が悪いです。(Merasa tidak enak badan)"},
    {"kanji": "暑い", "reading": "あつい", "romaji": "atsui", "meaning": "Panas (suhu/cuaca)", "pos": "Kata Sifat", "level": "N5", "example": "今日はとても暑い。(Hari ini sangat panas)"},
    {"kanji": "熱い", "reading": "あつい", "romaji": "atsui", "meaning": "Panas (benda/makanan)", "pos": "Kata Sifat", "level": "N5", "example": "熱いお茶。(Teh panas)"},
    {"kanji": "寒い", "reading": "さむい", "romaji": "samui", "meaning": "Dingin (suhu/cuaca)", "pos": "Kata Sifat", "level": "N5", "example": "冬は寒いです。(Musim dingin itu dingin)"},
    {"kanji": "冷たい", "reading": "つめたい", "romaji": "tsumetai", "meaning": "Dingin (benda/sikap)", "pos": "Kata Sifat", "level": "N5", "example": "冷たい水。(Air dingin)"},
    {"kanji": "高い", "reading": "たかい", "romaji": "takai", "meaning": "Tinggi / Mahal", "pos": "Kata Sifat", "level": "N5", "example": "富士山は高い山です。(Gunung Fuji adalah gunung yang tinggi)"},
    {"kanji": "安い", "reading": "やすい", "romaji": "yasui", "meaning": "Murah", "pos": "Kata Sifat", "level": "N5", "example": "この店は安いです。(Toko ini harganya murah)"},
    {"kanji": "低い", "reading": "ひくい", "romaji": "hikui", "meaning": "Rendah", "pos": "Kata Sifat", "level": "N5", "example": "背が低いです。(Tubuhnya pendek)"},
    {"kanji": "面白い", "reading": "おもしろい", "romaji": "omoshiroi", "meaning": "Menarik / Lucu", "pos": "Kata Sifat", "level": "N5", "example": "面白い本。(Buku yang menarik)"},
    {"kanji": "美味しい", "reading": "おいしい", "romaji": "oishii", "meaning": "Enak / Lezat", "pos": "Kata Sifat", "level": "N5", "example": "ラーメンは美味しいです。(Ramen sangat lezat)"},
    {"kanji": "まずい", "reading": "まずい", "romaji": "mazui", "meaning": "Tidak enak", "pos": "Kata Sifat", "level": "N5", "example": "薬はまずいです。(Obat itu rasanya tidak enak)"},
    {"kanji": "忙しい", "reading": "いそがしい", "romaji": "isogashii", "meaning": "Sibuk", "pos": "Kata Sifat", "level": "N5", "example": "今週はとても忙しい。(Minggu ini sangat sibuk)"},
    {"kanji": "楽しい", "reading": "たのしい", "romaji": "tanoshii", "meaning": "Menyenangkan", "pos": "Kata Sifat", "level": "N5", "example": "旅行は楽しかったです。(Perjalanannya menyenangkan)"},
    {"kanji": "白い", "reading": "しろい", "romaji": "shiroi", "meaning": "Putih", "pos": "Kata Sifat", "level": "N5", "example": "白いシャツ。(Kemeja putih)"},
    {"kanji": "黒い", "reading": "くろい", "romaji": "kuroi", "meaning": "Hitam", "pos": "Kata Sifat", "level": "N5", "example": "黒い靴。(Sepatu hitam)"},
    {"kanji": "赤い", "reading": "あかい", "romaji": "akai", "meaning": "Merah", "pos": "Kata Sifat", "level": "N5", "example": "赤いりんご。(Apel merah)"},
    {"kanji": "青い", "reading": "あおい", "romaji": "aoi", "meaning": "Biru", "pos": "Kata Sifat", "level": "N5", "example": "青い海。(Laut biru)"},
    {"kanji": "静か「な」", "reading": "しずか「な」", "romaji": "shizuka[na]", "meaning": "Tenang / Sunyi", "pos": "Kata Sifat", "level": "N5", "example": "静かな図書館。(Perpustakaan yang tenang)"},
    {"kanji": "賑やか「な」", "reading": "にぎやか「な」", "romaji": "nigiyaka[na]", "meaning": "Ramai / Meriah", "pos": "Kata Sifat", "level": "N5", "example": "賑やかな街。(Kota yang ramai)"},
    {"kanji": "有名「な」", "reading": "ゆうめい「な」", "romaji": "yuumei[na]", "meaning": "Terkenal", "pos": "Kata Sifat", "level": "N5", "example": "有名な場所。(Tempat yang terkenal)"},
    {"kanji": "親切「な」", "reading": "しんせつ「な」", "romaji": "shinsetsu[na]", "meaning": "Ramah / Baik hati", "pos": "Kata Sifat", "level": "N5", "example": "親切な人。(Orang yang ramah)"},
    {"kanji": "元気「な」", "reading": "げんき「な」", "romaji": "genki[na]", "meaning": "Sehat / Bersemangat", "pos": "Kata Sifat", "level": "N5", "example": "お元気ですか。(Apa kabar?)"},
    {"kanji": "便利「な」", "reading": "べんり「な」", "romaji": "benri[na]", "meaning": "Praktis / Mudah", "pos": "Kata Sifat", "level": "N5", "example": "電車は便利です。(Kereta sangat praktis)"},
    {"kanji": "暇「な」", "reading": "ひま「な」", "romaji": "hima[na]", "meaning": "Senggang / Luang", "pos": "Kata Sifat", "level": "N5", "example": "明日は暇です。(Besok saya senggang)"},
    {"kanji": "好き「な」", "reading": "すき「な」", "romaji": "suki[na]", "meaning": "Suka / Gemar", "pos": "Kata Sifat", "level": "N5", "example": "日本のアニメが好きです。(Saya suka anime Jepang)"},
    {"kanji": "嫌い「な」", "reading": "きらい「な」", "romaji": "kirai[na]", "meaning": "Benci / Tidak suka", "pos": "Kata Sifat", "level": "N5", "example": "魚が嫌いです。(Saya tidak suka ikan)"},
    {"kanji": "上手「な」", "reading": "じょうず「な」", "romaji": "jouzu[na]", "meaning": "Pintar / Mahir", "pos": "Kata Sifat", "level": "N5", "example": "日本語が上手ですね。(Bahasa Jepang Anda mahir ya)"},
    {"kanji": "下手「な」", "reading": "へた「な」", "romaji": "heta[na]", "meaning": "Kurang pandai / Tidak mahir", "pos": "Kata Sifat", "level": "N5", "example": "歌が下手です。(Saya tidak pandai bernyanyi)"},
    {"kanji": "安全「な」", "reading": "あんぜん「な」", "romaji": "anzen[na]", "meaning": "Aman", "pos": "Kata Sifat", "level": "N4", "example": "日本は安全な国です。(Jepang adalah negara yang aman)"},
    {"kanji": "危険「な」", "reading": "きけん「な」", "romaji": "kiken[na]", "meaning": "Bahaya", "pos": "Kata Sifat", "level": "N4", "example": "夜道は危険です。(Jalan malam berbahaya)"},
    {"kanji": "複雑「な」", "reading": "ふくざつ「な」", "romaji": "fukuzatsu[na]", "meaning": "Rumit / Kompleks", "pos": "Kata Sifat", "level": "N4", "example": "複雑な手続き。(Prosedur yang rumit)"},
    {"kanji": "簡単「な」", "reading": "かんたん「な」", "romaji": "kantan[na]", "meaning": "Sederhana / Mudah", "pos": "Kata Sifat", "level": "N4", "example": "簡単なテスト。(Ujian yang mudah)"},
    {"kanji": "大切「な」", "reading": "たいせつ「な」", "romaji": "taisetsu[na]", "meaning": "Berharga / Sangat penting", "pos": "Kata Sifat", "level": "N4", "example": "大切な思い出。(Kenangan berharga)"},
    {"kanji": "必要「な」", "reading": "ひつよう「な」", "romaji": "hitsuyou[na]", "meaning": "Perlu / Dibutuhkan", "pos": "Kata Sifat", "level": "N4", "example": "パスポートが必要です。(Paspor diperlukan)"},
    {"kanji": "不思議「な」", "reading": "ふしぎ「な」", "romaji": "fushigi[na]", "meaning": "Ajaib / Misterius", "pos": "Kata Sifat", "level": "N4", "example": "不思議な現象。(Fenomena ajaib)"},
    {"kanji": "恥ずかしい", "reading": "はずかしい", "romaji": "hazukashii", "meaning": "Malu", "pos": "Kata Sifat", "level": "N4", "example": "間違えて恥ずかしかった。(Malu karena salah)"},
    {"kanji": "寂しい", "reading": "さびしい", "romaji": "sabishii", "meaning": "Kesepian", "pos": "Kata Sifat", "level": "N4", "example": "一人で寂しいです。(Merasa kesepian sendirian)"},
    {"kanji": "厳しい", "reading": "きびしい", "romaji": "kibishii", "meaning": "Tegas / Disiplin keras", "pos": "Kata Sifat", "level": "N4", "example": "厳しい先生。(Guru yang tegas)"},
    {"kanji": "優しい", "reading": "やさしい", "romaji": "yasashii", "meaning": "Ramah / Baik / Lembut hati", "pos": "Kata Sifat", "level": "N4", "example": "優しいお母さん。(Ibu yang berhati lembut)"},
    {"kanji": "易しい", "reading": "やさしい", "romaji": "yasashii", "meaning": "Mudah / Gampang dipahami", "pos": "Kata Sifat", "level": "N4", "example": "易しい問題。(Soal yang mudah)"},
    {"kanji": "積極的「な」", "reading": "せっきょくてき「な」", "romaji": "sekkyokuteki[na]", "meaning": "Proaktif / Positif bersikap", "pos": "Kata Sifat", "level": "N3", "example": "積極的に意見を言います。(Proaktif menyampaikan pendapat)"},
    {"kanji": "消極的「な」", "reading": "しょうきょくてき「な」", "romaji": "shoukyokuteki[na]", "meaning": "Pasif / Ragu-ragu", "pos": "Kata Sifat", "level": "N3", "example": "消極的な態度。(Sikap pasif)"},
    {"kanji": "具体的「な」", "reading": "ぐたいてき「な」", "romaji": "gutaiteki[na]", "meaning": "Konkret / Spesifik", "pos": "Kata Sifat", "level": "N3", "example": "具体的な計画。(Rencana konkret)"},
    {"kanji": "抽象的「な」", "reading": "ちゅうしょうてき「な」", "romaji": "chuushouteki[na]", "meaning": "Abstrak", "pos": "Kata Sifat", "level": "N3", "example": "抽象的な説明。(Penjelasan abstrak)"},
    {"kanji": "見事「な」", "reading": "みごと「な」", "romaji": "migoto[na]", "meaning": "Luar biasa / Mengagumkan", "pos": "Kata Sifat", "level": "N3", "example": "見事な演技。(Penampilan akting yang luar biasa)"},
    {"kanji": "曖昧「な」", "reading": "あいまい「な」", "romaji": "aimai[na]", "meaning": "Samar / Ambigu", "pos": "Kata Sifat", "level": "N3", "example": "曖昧な返事。(Jawaban yang menggantung/samar)"},
    {"kanji": "貧しい", "reading": "まずしい", "romaji": "mazushii", "meaning": "Miskin / Kurang mampu", "pos": "Kata Sifat", "level": "N3", "example": "心が豊かなら貧しくない。(Jika kaya hati, tidaklah miskin)"},
    {"kanji": "悔しい", "reading": "くやしい", "romaji": "kuyashii", "meaning": "Menyesal / Kesal kecewa", "pos": "Kata Sifat", "level": "N3", "example": "負けて悔しいです。(Sangat kesal kecewa karena kalah)"},
    {"kanji": "怪しい", "reading": "あやしい", "romaji": "ayashii", "meaning": "Mencurigakan", "pos": "Kata Sifat", "level": "N3", "example": "怪しい人物。(Orang yang mencurigakan)"},
    {"kanji": "私", "reading": "わたし", "romaji": "watashi", "meaning": "Saya / Aku", "pos": "Kata Benda", "level": "N5", "example": "私は学生です。(Saya adalah pelajar)"},
    {"kanji": "あなた", "reading": "あなた", "romaji": "anata", "meaning": "Anda / Kamu", "pos": "Kata Benda", "level": "N5", "example": "あなたのお名前は何ですか。(Siapa nama Anda?)"},
    {"kanji": "友達", "reading": "ともだち", "romaji": "tomodachi", "meaning": "Teman / Sahabat", "pos": "Kata Benda", "level": "N5", "example": "友達と遊びます。(Bermain bersama teman)"},
    {"kanji": "先生", "reading": "せんせい", "romaji": "sensei", "meaning": "Guru / Pengajar / Dokter", "pos": "Kata Benda", "level": "N5", "example": "田中先生。(Guru Tanaka)"},
    {"kanji": "学生", "reading": "がくせい", "romaji": "gakusei", "meaning": "Pelajar / Mahasiswa", "pos": "Kata Benda", "level": "N5", "example": "大学の学生。(Mahasiswa universitas)"},
    {"kanji": "学校", "reading": "がっこう", "romaji": "gakkou", "meaning": "Sekolah", "pos": "Kata Benda", "level": "N5", "example": "学校へ通います。(Pergi ke sekolah)"},
    {"kanji": "会社", "reading": "かいしゃ", "romaji": "kaisha", "meaning": "Perusahaan / Kantor", "pos": "Kata Benda", "level": "N5", "example": "日本の会社。(Perusahaan Jepang)"},
    {"kanji": "家族", "reading": "かぞく", "romaji": "kazoku", "meaning": "Keluarga", "pos": "Kata Benda", "level": "N5", "example": "家族は４人です。(Keluarga saya ada 4 orang)"},
    {"kanji": "父", "reading": "ちち", "romaji": "chichi", "meaning": "Ayah saya", "pos": "Kata Benda", "level": "N5", "example": "父はエンジニアです。(Ayah saya adalah insinyur)"},
    {"kanji": "母", "reading": "はは", "romaji": "haha", "meaning": "Ibu saya", "pos": "Kata Benda", "level": "N5", "example": "母の手料理。(Masakan buatan ibu saya)"},
    {"kanji": "朝ご飯", "reading": "あさごはん", "romaji": "asagohan", "meaning": "Sarapan pagi", "pos": "Kata Benda", "level": "N5", "example": "朝ご飯を食べましたか。(Apakah sudah sarapan?)"},
    {"kanji": "昼ご飯", "reading": "ひるごはん", "romaji": "hirugohan", "meaning": "Makan siang", "pos": "Kata Benda", "level": "N5", "example": "お昼ご飯を一緒に食べましょう。(Ayo makan siang bersama)"},
    {"kanji": "晩ご飯", "reading": "ばんごはん", "romaji": "bangohan", "meaning": "Makan malam", "pos": "Kata Benda", "level": "N5", "example": "今夜の晩ご飯。(Makan malam malam ini)"},
    {"kanji": "水", "reading": "みず", "romaji": "mizu", "meaning": "Air", "pos": "Kata Benda", "level": "N5", "example": "水を一杯ください。(Minta segelas air)"},
    {"kanji": "お茶", "reading": "おちゃ", "romaji": "ocha", "meaning": "Teh Jepang", "pos": "Kata Benda", "level": "N5", "example": "お茶をどうぞ。(Silakan minum tehnya)"},
    {"kanji": "コーヒー", "reading": "コーヒー", "romaji": "koohii", "meaning": "Kopi", "pos": "Kata Benda", "level": "N5", "example": "温かいコーヒー。(Kopi hangat)"},
    {"kanji": "時間", "reading": "じかん", "romaji": "jikan", "meaning": "Waktu / Jam durasi", "pos": "Kata Benda", "level": "N5", "example": "時間がありません。(Tidak ada waktu)"},
    {"kanji": "今日", "reading": "きょう", "romaji": "kyou", "meaning": "Hari ini", "pos": "Kata Benda", "level": "N5", "example": "今日は月曜日です。(Hari ini hari Senin)"},
    {"kanji": "明日", "reading": "あした", "romaji": "ashita", "meaning": "Besok", "pos": "Kata Benda", "level": "N5", "example": "明日会いましょう。(Ayo bertemu besok)"},
    {"kanji": "昨日", "reading": "きのう", "romaji": "kinou", "meaning": "Kemarin", "pos": "Kata Benda", "level": "N5", "example": "昨日は雨でした。(Kemarin hujan)"},
    {"kanji": "今", "reading": "いま", "romaji": "ima", "meaning": "Sekarang", "pos": "Kata Benda", "level": "N5", "example": "今何時ですか。(Sekarang jam berapa?)"},
    {"kanji": "駅", "reading": "えき", "romaji": "eki", "meaning": "Stasiun kereta", "pos": "Kata Benda", "level": "N5", "example": "駅の改札口。(Gerbang tiket stasiun)"},
    {"kanji": "電車", "reading": "でんしゃ", "romaji": "densha", "meaning": "Kereta listrik", "pos": "Kata Benda", "level": "N5", "example": "電車に乗ります。(Naik kereta)"},
    {"kanji": "車", "reading": "くるま", "romaji": "kuruma", "meaning": "Mobil", "pos": "Kata Benda", "level": "N5", "example": "新しい車。(Mobil baru)"},
    {"kanji": "本", "reading": "ほん", "romaji": "hon", "meaning": "Buku", "pos": "Kata Benda", "level": "N5", "example": "日本語の教科書。(Buku pelajaran bahasa Jepang)"},
    {"kanji": "お金", "reading": "おかね", "romaji": "okane", "meaning": "Uang", "pos": "Kata Benda", "level": "N5", "example": "お金を払います。(Membayar uang)"},
    {"kanji": "部屋", "reading": "へや", "romaji": "heya", "meaning": "Kamar / Ruangan", "pos": "Kata Benda", "level": "N5", "example": "広い部屋。(Kamar yang luas)"},
    {"kanji": "病院", "reading": "びょういん", "romaji": "byouin", "meaning": "Rumah sakit", "pos": "Kata Benda", "level": "N5", "example": "病院に行きます。(Pergi ke rumah sakit)"},
    {"kanji": "住所", "reading": "じゅうしょ", "romaji": "juusho", "meaning": "Alamat rumah", "pos": "Kata Benda", "level": "N4", "example": "ここに住所を書いてください。(Tolong tuliskan alamat di sini)"},
    {"kanji": "電話番号", "reading": "でんわばんごう", "romaji": "denwa bangou", "meaning": "Nomor telepon", "pos": "Kata Benda", "level": "N4", "example": "電話番号を教えてください。(Tolong beritahu nomor teleponnya)"},
    {"kanji": "約束", "reading": "やくそく", "romaji": "yakusoku", "meaning": "Janji / Perjanjian", "pos": "Kata Benda", "level": "N4", "example": "約束を守ります。(Menepati janji)"},
    {"kanji": "趣味", "reading": "しゅみ", "romaji": "shumi", "meaning": "Hobi / Minat kegemaran", "pos": "Kata Benda", "level": "N4", "example": "私の趣味は読書です。(Hobi saya membaca buku)"},
    {"kanji": "経験", "reading": "けいけん", "romaji": "keiken", "meaning": "Pengalaman", "pos": "Kata Benda", "level": "N4", "example": "良い経験になりました。(Menjadi pengalaman yang berharga)"},
    {"kanji": "会議", "reading": "かいぎ", "romaji": "kaigi", "meaning": "Rapat / Pertemuan kantor", "pos": "Kata Benda", "level": "N4", "example": "午後から会議があります。(Ada rapat mulai siang ini)"},
    {"kanji": "書類", "reading": "しょるい", "romaji": "shorui", "meaning": "Dokumen / Berkas", "pos": "Kata Benda", "level": "N4", "example": "書類を提出します。(Mengumpulkan dokumen)"},
    {"kanji": "機械", "reading": "きかい", "romaji": "kikai", "meaning": "Mesin", "pos": "Kata Benda", "level": "N4", "example": "最新の機械。(Mesin tercanggih)"},
    {"kanji": "文化", "reading": "ぶんか", "romaji": "bunka", "meaning": "Kebudayaan / Kultur", "pos": "Kata Benda", "level": "N4", "example": "日本の伝統文化。(Kebudayaan tradisional Jepang)"},
    {"kanji": "習慣", "reading": "しゅうかん", "romaji": "shuukan", "meaning": "Kebiasaan / Adat", "pos": "Kata Benda", "level": "N4", "example": "生活の習慣。(Kebiasaan pola hidup)"},
    {"kanji": "季節", "reading": "きせつ", "romaji": "kisetsu", "meaning": "Musim (empat musim)", "pos": "Kata Benda", "level": "N4", "example": "好きな季節は秋です。(Musim kesukaan saya adalah musim gugur)"},
    {"kanji": "地震", "reading": "じしん", "romaji": "jishin", "meaning": "Gempa bumi", "pos": "Kata Benda", "level": "N4", "example": "地震に注意してください。(Hati-hati terhadap gempa bumi)"},
    {"kanji": "台風", "reading": "たいふう", "romaji": "taifuu", "meaning": "Angin topan / Taifun", "pos": "Kata Benda", "level": "N4", "example": "大型の台風が接近しています。(Topan besar sedang mendekat)"},
    {"kanji": "社会", "reading": "しゃかい", "romaji": "shakai", "meaning": "Masyarakat / Sosial", "pos": "Kata Benda", "level": "N3", "example": "現代社会の問題。(Masalah masyarakat modern)"},
    {"kanji": "経済", "reading": "けいざい", "romaji": "keizai", "meaning": "Perekonomian / Ekonomi", "pos": "Kata Benda", "level": "N3", "example": "世界の経済。(Perekonomian dunia)"},
    {"kanji": "環境", "reading": "かんきょう", "romaji": "kankyou", "meaning": "Lingkungan hidup", "pos": "Kata Benda", "level": "N3", "example": "地球環境を守ります。(Melindungi lingkungan bumi)"},
    {"kanji": "責任", "reading": "せきにん", "romaji": "sekinin", "meaning": "Tanggung jawab", "pos": "Kata Benda", "level": "N3", "example": "責任を持って行動します。(Bertindak dengan penuh tanggung jawab)"},
    {"kanji": "態度", "reading": "たいど", "romaji": "taido", "meaning": "Sikap / Perilaku", "pos": "Kata Benda", "level": "N3", "example": "真面目な態度。(Sikap yang bersungguh-sungguh)"},
    {"kanji": "情報", "reading": "じょうほう", "romaji": "jouhou", "meaning": "Informasi / Data", "pos": "Kata Benda", "level": "N3", "example": "正確な情報。(Informasi yang akurat)"},
    {"kanji": "目標", "reading": "もくひょう", "romaji": "mokuhyou", "meaning": "Target / Tujuan capaian", "pos": "Kata Benda", "level": "N3", "example": "今年度の目標。(Target tahun fiskal ini)"},
    {"kanji": "機会", "reading": "きかい", "romaji": "kikai", "meaning": "Kesempatan / Peluang", "pos": "Kata Benda", "level": "N3", "example": "良い機会を得ました。(Mendapatkan peluang bagus)"},
    {"kanji": "こんにちは", "reading": "こんにちは", "romaji": "konnichiwa", "meaning": "Halo / Selamat siang", "pos": "Ungkapan", "level": "N5", "example": "皆さん、こんにちは。(Halo semuanya)"},
    {"kanji": "おはようございます", "reading": "おはようございます", "romaji": "ohayou gozaimasu", "meaning": "Selamat pagi (sopan)", "pos": "Ungkapan", "level": "N5", "example": "部長、おはようございます。(Selamat pagi, Pak Kepala Bagian)"},
    {"kanji": "こんばんは", "reading": "こんばんは", "romaji": "konbanwa", "meaning": "Selamat malam", "pos": "Ungkapan", "level": "N5", "example": "こんばんは、お邪魔します。(Selamat malam, permisi bertamu)"},
    {"kanji": "ありがとうございます", "reading": "ありがとうございます", "romaji": "arigatou gozaimasu", "meaning": "Terima kasih banyak (sopan)", "pos": "Ungkapan", "level": "N5", "example": "ご親切にありがとうございます。(Terima kasih atas kebaikan Anda)"},
    {"kanji": "どういたしまして", "reading": "どういたしまして", "romaji": "douitashimashite", "meaning": "Sama-sama / Terima kasih kembali", "pos": "Ungkapan", "level": "N5", "example": "いいえ、どういたしまして。(Tidak apa, sama-sama)"},
    {"kanji": "すみません", "reading": "すみません", "romaji": "sumimasen", "meaning": "Permisi / Maaf", "pos": "Ungkapan", "level": "N5", "example": "すみません、お会計をお願いします。(Permisi, tolong bon tagihannya)"},
    {"kanji": "ごめんなさい", "reading": "ごめんなさい", "romaji": "gomennasai", "meaning": "Mohon maaf", "pos": "Ungkapan", "level": "N5", "example": "遅くなってごめんなさい。(Maaf sudah membuat menunggu/terlambat)"},
    {"kanji": "はじめまして", "reading": "はじめまして", "romaji": "hajimemashite", "meaning": "Senang bertemu pertama kali", "pos": "Ungkapan", "level": "N5", "example": "はじめまして、サントスです。(Senang bertemu Anda, saya Santos)"},
    {"kanji": "よろしくおねがいします", "reading": "よろしくおねがいします", "romaji": "yoroshiku onegaishimasu", "meaning": "Mohon kerja sama / bimbingannya", "pos": "Ungkapan", "level": "N5", "example": "どうぞよろしくお願いします。(Mohon bimbingan dan bantuannya)"},
    {"kanji": "いただきます", "reading": "いただきます", "romaji": "itadakimasu", "meaning": "Selamat makan (ucapan syukur)", "pos": "Ungkapan", "level": "N5", "example": "美味しいご飯をいただきます。(Mari makan hidangan lezat ini)"},
    {"kanji": "ごちそうさまでした", "reading": "ごちそうさまでした", "romaji": "gochisousama deshita", "meaning": "Terima kasih atas hidangannya", "pos": "Ungkapan", "level": "N5", "example": "ごちそうさまでした、とても美味しかったです。(Terima kasih atas hidangannya, sangat enak)"},
    {"kanji": "いってきます", "reading": "いってきます", "romaji": "ittekimasu", "meaning": "Saya berangkat dulu (ke luar rumah)", "pos": "Ungkapan", "level": "N5", "example": "学校へいってきます。(Saya berangkat ke sekolah dulu)"},
    {"kanji": "いってらっしゃい", "reading": "いってらっしゃい", "romaji": "itterasshai", "meaning": "Selamat jalan / Hati-hati di jalan", "pos": "Ungkapan", "level": "N5", "example": "気をつけていってらっしゃい。(Hati-hati ya, selamat beraktivitas)"},
    {"kanji": "ただいま", "reading": "ただいま", "romaji": "tadaima", "meaning": "Saya pulang / Kembali ke rumah", "pos": "Ungkapan", "level": "N5", "example": "ただいま戻りました。(Saya sudah pulang)"},
    {"kanji": "おかえりなさい", "reading": "おかえりなさい", "romaji": "okaerinasai", "meaning": "Selamat datang kembali di rumah", "pos": "Ungkapan", "level": "N5", "example": "お仕事お疲れ様、おかえりなさい。(Lelah bekerja seharian ya, selamat datang kembali)"},
    {"kanji": "お大事に", "reading": "おだいじに", "romaji": "odaiji ni", "meaning": "Semoga lekas sembuh", "pos": "Ungkapan", "level": "N5", "example": "風邪ですか、どうぞお大事に。(Kamu flu ya, lekas sembuh ya)"},
    {"kanji": "お疲れ様でした", "reading": "おつかれさまでした", "romaji": "otsukaresama deshita", "meaning": "Terima kasih atas kerja kerasnya", "pos": "Ungkapan", "level": "N4", "example": "今日の業務はお疲れ様でした。(Terima kasih atas kerja kerasnya hari ini)"},
    {"kanji": "お先に失礼します", "reading": "おさきにしつれいします", "romaji": "osaki ni shitsurei shimasu", "meaning": "Permisi pulang duluan (kantor)", "pos": "Ungkapan", "level": "N4", "example": "まだ仕事中ですが、お先に失礼します。(Masih pada kerja ya, saya mohon izin pulang duluan)"},
    {"kanji": "ご無沙汰しております", "reading": "ごぶさたしております", "romaji": "gobusata shite orimasu", "meaning": "Sudah lama tidak saling kontak (sopan)", "pos": "Ungkapan", "level": "N3", "example": "大変ご無沙汰しております、お元気ですか。(Lama sekali tidak bersua, apa kabar?)"},
    {"kanji": "お世話になっております", "reading": "おせわになっております", "romaji": "osewa ni natte orimasu", "meaning": "Terima kasih atas kerja samanya (bisnis)", "pos": "Ungkapan", "level": "N3", "example": "平素は大変お世話になっております。(Selalu berterima kasih atas kerja sama Anda)"},
    {"kanji": "かしこまりました", "reading": "かしこまりました", "romaji": "kashikomarimashita", "meaning": "Dimengerti / Baik saya laksanakan (ke atasan/tamu)", "pos": "Ungkapan", "level": "N3", "example": "ご注文、かしこまりました。(Pesanan Anda telah saya catat dan mengerti)"},
    {"kanji": "承知いたしました", "reading": "しょうちいたしました", "romaji": "shouchi itashimashita", "meaning": "Saya memahami dan menyetujuinya (formal)", "pos": "Ungkapan", "level": "N3", "example": "件の件、承知いたしました。(Mengenai hal tersebut, telah kami pahami)"},
    {"kanji": "とても", "reading": "とても", "romaji": "totemo", "meaning": "Sangat / Amat", "pos": "Kata Keterangan", "level": "N5", "example": "とても美味しいです。(Sangat lezat)"},
    {"kanji": "少し", "reading": "すこし", "romaji": "sukoshi", "meaning": "Sedikit", "pos": "Kata Keterangan", "level": "N5", "example": "少し疲労があります。(Sedikit agak lelah)"},
    {"kanji": "もっと", "reading": "もっと", "romaji": "motto", "meaning": "Lebih / Lagi", "pos": "Kata Keterangan", "level": "N5", "example": "もっとゆっくり話してください。(Tolong bicara lebih pelan)"},
    {"kanji": "もう", "reading": "もう", "romaji": "mou", "meaning": "Sudah / Lagi", "pos": "Kata Keterangan", "level": "N5", "example": "もう食べました。(Sudah makan)"},
    {"kanji": "まだ", "reading": "まだ", "romaji": "mada", "meaning": "Masih / Belum", "pos": "Kata Keterangan", "level": "N5", "example": "まだ決めていません。(Masih belum memutuskan)"},
    {"kanji": "いつも", "reading": "いつも", "romaji": "itsumo", "meaning": "Selalu", "pos": "Kata Keterangan", "level": "N5", "example": "いつもここでコーヒーを飲みます。(Selalu minum kopi di sini)"},
    {"kanji": "時々", "reading": "ときどき", "romaji": "tokidoki", "meaning": "Kadang-kadang", "pos": "Kata Keterangan", "level": "N5", "example": "時々映画館に行きます。(Kadang-kadang pergi ke bioskop)"},
    {"kanji": "全然", "reading": "ぜんぜん", "romaji": "zenzen", "meaning": "Sama sekali (diikuti kalimat negatif)", "pos": "Kata Keterangan", "level": "N5", "example": "全然わかりません。(Sama sekali tidak mengerti)"},
    {"kanji": "あまり", "reading": "あまり", "romaji": "amari", "meaning": "Tidak begitu (diikuti kalimat negatif)", "pos": "Kata Keterangan", "level": "N5", "example": "あまり高くありません。(Tidak begitu mahal)"},
    {"kanji": "必ず", "reading": "かならず", "romaji": "kanarazu", "meaning": "Pasti / Tanpa kecuali", "pos": "Kata Keterangan", "level": "N4", "example": "明日は必ず行きます。(Besok pasti saya datang)"},
    {"kanji": "たぶん", "reading": "たぶん", "romaji": "tabun", "meaning": "Mungkin / Kemungkinan", "pos": "Kata Keterangan", "level": "N4", "example": "たぶん雨が降るでしょう。(Mungkin hari ini akan turun hujan)"},
    {"kanji": "大体", "reading": "だいたい", "romaji": "daitai", "meaning": "Kira-kira / Kurang lebih / Garis besar", "pos": "Kata Keterangan", "level": "N4", "example": "大体理解できました。(Secara garis besar sudah bisa paham)"},
    {"kanji": "ゆっくり", "reading": "ゆっくり", "romaji": "yukkuri", "meaning": "Perlahan / Santai", "pos": "Kata Keterangan", "level": "N4", "example": "お茶を飲んでゆっくりしてください。(Minumlah teh dan bersantailah)"},
    {"kanji": "しっかり", "reading": "しっかり", "romaji": "shikkari", "meaning": "Dengan mantap / Kuat / Sungguh-sungguh", "pos": "Kata Keterangan", "level": "N4", "example": "しっかり握ってください。(Pegang dengan kuat/mantap)"},
    {"kanji": "すっかり", "reading": "すっかり", "romaji": "sukkari", "meaning": "Benar-benar / Tuntas seutuhnya", "pos": "Kata Keterangan", "level": "N3", "example": "忘れてすっかり安心しました。(Lupa sama sekali dan sekarang lega)"},
    {"kanji": "ぴったり", "reading": "ぴったり", "romaji": "pittari", "meaning": "Pas / Cocok tepat", "pos": "Kata Keterangan", "level": "N3", "example": "サイズがぴったりです。(Ukurannya pas sekali)"},
    {"kanji": "ますます", "reading": "ますます", "romaji": "masumasu", "meaning": "Semakin / Kian bertambah", "pos": "Kata Keterangan", "level": "N3", "example": "寒さがますます厳しくなります。(Hawa dingin semakin menjadi-jadi)"},
    {"kanji": "とうとう", "reading": "とうとう", "romaji": "toutou", "meaning": "Akhirnya (setelah perjalanan panjang)", "pos": "Kata Keterangan", "level": "N3", "example": "とうとう完成しました。(Akhirnya selesai juga)"},
    {"kanji": "やはり / やっぱり", "reading": "やはり", "romaji": "yahari / yappari", "meaning": "Ternyata benar dugaan / Seperti yang diduga", "pos": "Kata Keterangan", "level": "N3", "example": "やはり彼が来ました。(Ternyata benar dia yang datang)"},
    {"kanji": "残業", "reading": "ざんぎょう", "romaji": "zangyou", "meaning": "Lembur kerja", "pos": "Kata Benda", "level": "N4", "example": "今日は残業をせずに帰ります。(Hari ini pulang tanpa lembur)"},
    {"kanji": "出張", "reading": "しゅっちょう", "romaji": "shucchou", "meaning": "Perjalanan dinas", "pos": "Kata Benda", "level": "N4", "example": "来週大阪へ出張します。(Minggu depan dinas ke Osaka)"},
    {"kanji": "報告します", "reading": "ほうこくします", "romaji": "houkoku shimasu", "meaning": "Melaporkan (progress kerja)", "pos": "Kata Kerja", "level": "N4", "example": "進捗状況を上司に報告します。(Melaporkan progres ke atasan)"},
    {"kanji": "提出します", "reading": "ていしゅつします", "romaji": "teishutsu shimasu", "meaning": "Mengumpulkan / Menyerahkan berkas", "pos": "Kata Kerja", "level": "N4", "example": "今日中に企画書を提出します。(Menyerahkan proposal hari ini)"},
    {"kanji": "有給休暇", "reading": "ゆうきゅうきゅうか", "romaji": "yuukyuu kyuuka", "meaning": "Cuti tahunan berbayar", "pos": "Kata Benda", "level": "N3", "example": "来月有給休暇を取ります。(Mengambil cuti berbayar bulan depan)"},
    {"kanji": "締め切り", "reading": "しめきり", "romaji": "shimekiri", "meaning": "Deadline / Tenggat waktu", "pos": "Kata Benda", "level": "N3", "example": "締め切りに間に合わせます。(Mengejar agar tepat sebelum deadline)"},
    {"kanji": "担当", "reading": "たんとう", "romaji": "tantou", "meaning": "Penanggung jawab (PIC)", "pos": "Kata Benda", "level": "N3", "example": "私がこの業務の担当者です。(Saya penanggung jawab tugas ini)"},
    {"kanji": "打ち合わせ", "reading": "うちあわせ", "romaji": "uchiawase", "meaning": "Briefing / Diskusi persiapan awal", "pos": "Kata Benda", "level": "N3", "example": "事前に打ち合わせを行います。(Melakukan briefing sebelumnya)"},
    {"kanji": "本当？", "reading": "ほんとう？", "romaji": "hontou?", "meaning": "Benarkah? / Serius?", "pos": "Ungkapan", "level": "N5", "example": "本当にそう思いますか。(Apakah kamu benar-benar berpikir begitu?)"},
    {"kanji": "なるほど", "reading": "なるほど", "romaji": "naruhodo", "meaning": "Pantas saja / Begitu rupanya (paham)", "pos": "Ungkapan", "level": "N5", "example": "なるほど、よくわかりました。(Begitu rupanya, saya paham sekali)"},
    {"kanji": "もちろん", "reading": "もちろん", "romaji": "mochiron", "meaning": "Tentu saja / Pastinya", "pos": "Kata Keterangan", "level": "N5", "example": "もちろん参加します。(Tentu saja saya ikut)"},
    {"kanji": "やっぱり", "reading": "やっぱり", "romaji": "yappari", "meaning": "Ternyata benar / Sudah kuduga", "pos": "Kata Keterangan", "level": "N4", "example": "やっぱり日本料理が一番好きです。(Ternyata memang masakan Jepang yang paling kusuka)"},
    {"kanji": "ちょっと", "reading": "ちょっと", "romaji": "chotto", "meaning": "Sebentar / Agak sedikit / Maaf (menolak halus)", "pos": "Kata Keterangan", "level": "N5", "example": "ちょっと待ってください。(Tolong tunggu sebentar)"},
    {"kanji": "大丈夫", "reading": "だいじょうぶ", "romaji": "daijoubu", "meaning": "Tidak apa-apa / Baik-baik saja", "pos": "Kata Sifat", "level": "N5", "example": "心配しないで、大丈夫ですよ。(Jangan cemas, semua baik-baik saja)"},
    {"kanji": "すごい", "reading": "すごい", "romaji": "sugoi", "meaning": "Hebat / Luar biasa", "pos": "Kata Sifat", "level": "N5", "example": "日本語がとても上手で、すごいですね。(Bahasa Jepangmu mahir, hebat sekali ya)"},
    {"kanji": "どうしたの？", "reading": "どうしたの？", "romaji": "doushitano?", "meaning": "Ada apa? / Kamu kenapa?", "pos": "Ungkapan", "level": "N5", "example": "元気がないね、どうしたの？(Kelihatannya tidak bersemangat, ada apa?)"},
    {"kanji": "久しぶり！", "reading": "ひさしぶり！", "romaji": "hisashiburi!", "meaning": "Lama tak jumpa! (akrab)", "pos": "Ungkapan", "level": "N5", "example": "久しぶり、元気だった？(Lama tak jumpa, kabarmu baik?)"},
    {"kanji": "まさか", "reading": "まさか", "romaji": "masaka", "meaning": "Masa sih?! / Tidak mungkin!", "pos": "Ungkapan", "level": "N4", "example": "まさかそんなことが起きるとは。(Masa sih hal seperti itu sampai terjadi)"},
    {"kanji": "さすが", "reading": "さすが", "romaji": "sasuga", "meaning": "Pantas saja (pujian kehebatan)", "pos": "Kata Keterangan", "level": "N4", "example": "さすが先輩、仕事が早いです。(Pantas saja senior, kerjanya cepat sekali)"},
    {"kanji": "とりあえず", "reading": "とりあえず", "romaji": "toriaezu", "meaning": "Untuk sementara ini / Pertama-tama", "pos": "Kata Keterangan", "level": "N4", "example": "とりあえず生ビールをください。(Untuk sekarang, minta bir dulu)"},
    {"kanji": "せっかく", "reading": "せっかく", "romaji": "sekkaku", "meaning": "Mumpung / Sudah susah payah", "pos": "Kata Keterangan", "level": "N3", "example": "せっかく日本に来たから温泉に行こう。(Mumpung sudah ke Jepang ayo ke onsen)"},
    {"kanji": "たまたま", "reading": "たまたま", "romaji": "tamatama", "meaning": "Secara kebetulan", "pos": "Kata Keterangan", "level": "N3", "example": "駅でたまたま友達に会いました。(Kebetulan bertemu teman di stasiun)"},
    {"kanji": "思いがけない", "reading": "おもいがけない", "romaji": "omoigakenai", "meaning": "Tak terduga / Di luar dugaan", "pos": "Kata Sifat", "level": "N3", "example": "思いがけないプレゼントをもらいました。(Mendapat hadiah yang tak disangka-sangka)"},
    {"kanji": "注文します", "reading": "ちゅうもんします", "romaji": "chuumon shimasu", "meaning": "Memesan makanan / Order", "pos": "Kata Kerja", "level": "N5", "example": "料理を注文します。(Memesan makanan)"},
    {"kanji": "お会計", "reading": "おかいけい", "romaji": "okaikei", "meaning": "Tagihan bon / Pembayaran", "pos": "Kata Benda", "level": "N5", "example": "すみません、お会計をお願いします。(Permisi, tolong minta bonnya)"},
    {"kanji": "おすすめ", "reading": "おすすめ", "romaji": "osusume", "meaning": "Rekomendasi / Menu andalan", "pos": "Kata Benda", "level": "N5", "example": "今日のおすすめは何ですか。(Apa menu rekomendasi hari ini?)"},
    {"kanji": "持ち帰り", "reading": "もちかえり", "romaji": "mochikaeri", "meaning": "Bungkus / Take away", "pos": "Kata Benda", "level": "N5", "example": "持ち帰りでお願いします。(Tolong dibungkus bawa pulang ya)"},
    {"kanji": "割り勘", "reading": "わりかん", "romaji": "warikan", "meaning": "Bayar patungan (masing-masing)", "pos": "Kata Benda", "level": "N4", "example": "今日の食事は割り勘にしましょう。(Makan hari ini mari kita bayar patungan)"},
    {"kanji": "ごちそうします", "reading": "ごちそうします", "romaji": "gochisou shimasu", "meaning": "Mentraktir makan", "pos": "Kata Kerja", "level": "N4", "example": "今日は私がごちそうします。(Hari ini saya yang traktir)"},
    {"kanji": "ほっとする", "reading": "ほっとする", "romaji": "hotto suru", "meaning": "Merasa lega / Tenang", "pos": "Kata Kerja", "level": "N4", "example": "試験が終わってほっとしました。(Merasa sangat lega ujian sudah selesai)"},
    {"kanji": "がっかりする", "reading": "がっかりする", "romaji": "gakkari suru", "meaning": "Kecewa", "pos": "Kata Kerja", "level": "N4", "example": "雨で旅行が中止になり、がっかりしました。(Kecewa perjalanan batal karena hujan)"},
    {"kanji": "わくわくする", "reading": "わくわくする", "romaji": "wakuwaku suru", "meaning": "Bersemangat antusias tak sabar", "pos": "Kata Kerja", "level": "N4", "example": "明日からの旅行にわくわくしています。(Sangat antusias menanti liburan besok)"},
    {"kanji": "いらいらする", "reading": "いらいらする", "romaji": "iraira suru", "meaning": "Kesal / Jengkel tidak sabar", "pos": "Kata Kerja", "level": "N3", "example": "バスが遅れていらいらします。(Kesal karena busnya terlambat)"},
    {"kanji": "うらやましい", "reading": "うらやましい", "romaji": "urayamashii", "meaning": "Iri (dalam arti positif / kagum)", "pos": "Kata Sifat", "level": "N3", "example": "長い休みがあってうらやましいです。(Wah enak banget ya dapat libur panjang)"},
    {"kanji": "もったいない", "reading": "もったいない", "romaji": "mottainai", "meaning": "Sayang sekali (mubazir / sia-sia)", "pos": "Kata Sifat", "level": "N3", "example": "食べ物を捨てるのはもったいない。(Mubazir membuang-buang makanan)"},
    {"kanji": "しょうがない", "reading": "しょうがない", "romaji": "shouganai", "meaning": "Apa boleh buat / Mau bagaimana lagi", "pos": "Ungkapan", "level": "N4", "example": "雨が降ったらしょうがないね。(Kalau hujan ya apa boleh buat)"},
];


function escapeAudioText(text) {
    if (!text) return '';
    // Extract Japanese part before Indonesian parentheses (e.g. "明日学校へ行きます。(Besok pergi)")
    const jpPart = text.split(/[(（]/)[0].trim();
    return jpPart.replace(/['"]/g, '');
}
let dictState = {
    searchQuery: '',
    selectedPos: 'all',
    selectedLevel: 'all'
};

function renderDictionaryPage(container) {
    container.innerHTML = `
        <div class="page-header">
            <div class="page-header-text">
                <h1><span class="header-icon">${icon('dictionary', 24)}</span> Kamus Bahasa Jepang - Indonesia</h1>
                <div class="header-subtitle">Kamus komprehensif kosakata penting, kata kerja, kata sifat, dan ungkapan harian berstandar JLPT N5 • N4 • N3</div>
            </div>
        </div>

        <!-- Dictionary Search and Filter Controls -->
        <div class="dict-control-panel">
            <div class="dict-search-box">
                <span class="dict-search-icon">${icon('search', 16)}</span>
                <input type="text" id="dict-search-input" placeholder="Cari kata: Romaji (tabemasu), Kanji (食べる), Hiragana, atau Bahasa Indonesia (makan)..." value="${dictState.searchQuery}">
                ${dictState.searchQuery ? `<button class="dict-clear-btn" onclick="clearDictSearch()">${icon('x', 14)}</button>` : ''}
            </div>

            <div class="dict-filters-row">
                <div class="gh-segmented-group" id="dict-pos-filter">
                    <button class="gh-pill ${dictState.selectedPos === 'all' ? 'active' : ''}" data-pos="all">Semua Jenis Kata</button>
                    <button class="gh-pill ${dictState.selectedPos === 'Kata Kerja' ? 'active' : ''}" data-pos="Kata Kerja">Kata Kerja</button>
                    <button class="gh-pill ${dictState.selectedPos === 'Kata Sifat' ? 'active' : ''}" data-pos="Kata Sifat">Kata Sifat</button>
                    <button class="gh-pill ${dictState.selectedPos === 'Kata Benda' ? 'active' : ''}" data-pos="Kata Benda">Kata Benda</button>
                    <button class="gh-pill ${dictState.selectedPos === 'Kata Keterangan' ? 'active' : ''}" data-pos="Kata Keterangan">Kata Keterangan</button>
                    <button class="gh-pill ${dictState.selectedPos === 'Ungkapan' ? 'active' : ''}" data-pos="Ungkapan">Ungkapan / Salam</button>
                </div>

                <div class="gh-segmented-group" id="dict-level-filter">
                    <button class="gh-pill ${dictState.selectedLevel === 'all' ? 'active' : ''}" data-lvl="all">Semua Level</button>
                    <button class="gh-pill ${dictState.selectedLevel === 'N5' ? 'active' : ''}" data-lvl="N5">N5</button>
                    <button class="gh-pill ${dictState.selectedLevel === 'N4' ? 'active' : ''}" data-lvl="N4">N4</button>
                    <button class="gh-pill ${dictState.selectedLevel === 'N3' ? 'active' : ''}" data-lvl="N3">N3</button>
                </div>
            </div>
        </div>

        <div class="dict-results-count" id="dict-results-count"></div>
        <div class="dict-grid" id="dict-grid"></div>
    `;

    setupDictListeners();
    renderDictList();
}

function setupDictListeners() {
    const input = document.getElementById('dict-search-input');
    if (input) {
        input.addEventListener('input', (e) => {
            dictState.searchQuery = e.target.value.trim().toLowerCase();
            renderDictList();
        });
    }

    const posFilter = document.getElementById('dict-pos-filter');
    if (posFilter) {
        posFilter.addEventListener('click', (e) => {
            const btn = e.target.closest('.gh-pill');
            if (!btn) return;
            dictState.selectedPos = btn.dataset.pos;
            posFilter.querySelectorAll('.gh-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderDictList();
        });
    }

    const levelFilter = document.getElementById('dict-level-filter');
    if (levelFilter) {
        levelFilter.addEventListener('click', (e) => {
            const btn = e.target.closest('.gh-pill');
            if (!btn) return;
            dictState.selectedLevel = btn.dataset.lvl;
            levelFilter.querySelectorAll('.gh-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderDictList();
        });
    }
}

function clearDictSearch() {
    dictState.searchQuery = '';
    const input = document.getElementById('dict-search-input');
    if (input) input.value = '';
    renderDictList();
}

function renderDictList() {
    const grid = document.getElementById('dict-grid');
    const countEl = document.getElementById('dict-results-count');
    if (!grid) return;

    const filtered = DICTIONARY_DATABASE.filter(item => {
        // POS filter
        if (dictState.selectedPos !== 'all' && item.pos !== dictState.selectedPos) return false;
        // Level filter
        if (dictState.selectedLevel !== 'all' && item.level !== dictState.selectedLevel) return false;
        // Search query
        if (dictState.searchQuery) {
            const q = dictState.searchQuery;
            return item.kanji.toLowerCase().includes(q) ||
                   item.reading.toLowerCase().includes(q) ||
                   item.romaji.toLowerCase().includes(q) ||
                   item.meaning.toLowerCase().includes(q);
        }
        return true;
    });

    if (countEl) {
        countEl.textContent = `Menampilkan ${filtered.length} kata dari ${DICTIONARY_DATABASE.length} entri kamus`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">
                ${icon('search', 32)}
                <p style="margin-top:10px;font-size:14px">Tidak ada kata ditemukan yang cocok dengan pencarian Anda.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(item => `
        <div class="dict-card">
            <div class="dict-card-top">
                <div>
                    <div class="dict-word-jp" onclick="speakWord('${item.kanji.replace(/[（）]/g, '')}')">${item.kanji}</div>
                    <div class="dict-reading-romaji">
                        <span>${item.reading}</span> • <em>${item.romaji}</em>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px">
                    <span class="level-badge ${item.level.toLowerCase()}">${item.level}</span>
                    <button class="vocab-audio-btn" onclick="speakWord('${item.kanji.replace(/[（）]/g, '')}')" title="Dengarkan Suara Pengucapan">
                        ${icon('volume2', 15)}
                    </button>
                </div>
            </div>

            <div class="dict-meaning-text">
                <strong>${item.meaning}</strong>
                <span class="dict-pos-pill">${item.pos}</span>
            </div>

            ${item.example ? `
                <div class="dict-example-box">
                    <small style="color:var(--text-muted);font-size:11px">Contoh:</small>
                    <div style="font-family:var(--font-jp);font-size:12.5px;color:var(--text-secondary);margin-top:2px">${item.example}</div>
                </div>
            ` : ''}
        </div>
    `).join('');
}
