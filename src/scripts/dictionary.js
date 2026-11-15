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

    {"kanji": "資料", "reading": "しりょう", "romaji": "shiryou", "meaning": "Dokumen / Berkas materi", "pos": "Kata Benda", "level": "N4", "example": "会議の資料を印刷してください。(Tolong cetak berkas untuk rapat)"},
    {"kanji": "連絡", "reading": "れんらく", "romaji": "renraku", "meaning": "Menghubungi / Komunikasi", "pos": "Kata Benda", "level": "N4", "example": "後でメールで連絡します。(Nanti saya hubungi lewat email)"},
    {"kanji": "報告", "reading": "ほうこく", "romaji": "houkoku", "meaning": "Laporan kerja", "pos": "Kata Benda", "level": "N4", "example": "進捗状況を部長に報告しました。(Saya sudah melaporkan progres ke manajer)"},
    {"kanji": "相談", "reading": "そうだん", "romaji": "soudan", "meaning": "Konsultasi / Berdiskusi", "pos": "Kata Benda", "level": "N4", "example": "仕事について先輩に相談します。(Saya berkonsultasi mengenai pekerjaan dengan senior)"},
    {"kanji": "同僚", "reading": "どうりょう", "romaji": "douryou", "meaning": "Rekan kerja", "pos": "Kata Benda", "level": "N3", "example": "同僚と一緒にランチを食べました。(Makan siang bersama rekan kerja)"},
    {"kanji": "先輩", "reading": "せんぱい", "romaji": "senpai", "meaning": "Senior", "pos": "Kata Benda", "level": "N4", "example": "優しい先輩に仕事を教わりました。(Diajari pekerjaan oleh senior yang ramah)"},
    {"kanji": "後輩", "reading": "こうはい", "romaji": "kouhai", "meaning": "Junior", "pos": "Kata Benda", "level": "N4", "example": "新しく入った後輩をサポートします。(Mendukung junior yang baru masuk)"},
    {"kanji": "社長", "reading": "しゃちょう", "romaji": "shachou", "meaning": "Direktur utama / Presiden direktur", "pos": "Kata Benda", "level": "N4", "example": "社長が新しい方針を発表しました。(Presiden direktur mengumumkan kebijakan baru)"},
    {"kanji": "部長", "reading": "ぶちょう", "romaji": "buchou", "meaning": "Kepala bagian / Manajer departemen", "pos": "Kata Benda", "level": "N4", "example": "部長に書類を提出しました。(Menyerahkan berkas kepada manajer)"},
    {"kanji": "休暇", "reading": "きゅうか", "romaji": "kyuuka", "meaning": "Cuti / Libur kerja", "pos": "Kata Benda", "level": "N3", "example": "有給休暇を取って旅行します。(Mengambil cuti berbayar dan berlibur)"},
    {"kanji": "給料", "reading": "きゅうりょう", "romaji": "kyuuryou", "meaning": "Gaji / Upah", "pos": "Kata Benda", "level": "N4", "example": "毎月２５日は給料日です。(Setiap tanggal 25 adalah hari gajian)"},
    {"kanji": "契約", "reading": "けいやく", "romaji": "keiyaku", "meaning": "Kontrak kerja / Perjanjian", "pos": "Kata Benda", "level": "N3", "example": "新しいクライアントと契約を結びました。(Menandatangani kontrak dengan klien baru)"},
    {"kanji": "面接", "reading": "めんせつ", "romaji": "mensetsu", "meaning": "Wawancara (interview)", "pos": "Kata Benda", "level": "N4", "example": "明日就職の面接があります。(Besok ada wawancara kerja)"},
    {"kanji": "履歴書", "reading": "りれきしょ", "romaji": "rirekisho", "meaning": "Curriculum Vitae / Daftar riwayat hidup", "pos": "Kata Benda", "level": "N3", "example": "会社に履歴書を送りました。(Mengirimkan CV ke perusahaan)"},
    {"kanji": "進捗", "reading": "しんちょく", "romaji": "shinchoku", "meaning": "Progres kemajuan pekerjaan", "pos": "Kata Benda", "level": "N3", "example": "タスクの進捗は順調です。(Progres pekerjaan berjalan lancar)"},
    {"kanji": "修正", "reading": "しゅうせい", "romaji": "shuusei", "meaning": "Revisi / Koreksi perbaikan", "pos": "Kata Benda", "level": "N3", "example": "指摘されたバグを修正しました。(Sudah memperbaiki bug yang dilaporkan)"},
    {"kanji": "開発", "reading": "かいはつ", "romaji": "kaihatsu", "meaning": "Pengembangan / Software development", "pos": "Kata Benda", "level": "N3", "example": "新しいアプリを開発しています。(Sedang mengembangkan aplikasi baru)"},
    {"kanji": "設計", "reading": "せっけい", "romaji": "sekkei", "meaning": "Perancangan arsitektur / Desain", "pos": "Kata Benda", "level": "N3", "example": "データベースの設計を見直します。(Meninjau ulang perancangan database)"},
    {"kanji": "確認", "reading": "かくにん", "romaji": "kakunin", "meaning": "Pengecekan / Konfirmasi", "pos": "Kata Benda", "level": "N4", "example": "メールの内容を確認してください。(Mohon cek isi surel)"},
    {"kanji": "送信", "reading": "そうしん", "romaji": "soushin", "meaning": "Kirim surel/data (transmission)", "pos": "Kata Benda", "level": "N3", "example": "添付ファイルを送信しました。(File lampiran sudah terkirim)"},
    {"kanji": "受信", "reading": "じゅしん", "romaji": "juushin", "meaning": "Terima surel/sinyal (reception)", "pos": "Kata Benda", "level": "N3", "example": "新しいメールを受信しました。(Menerima email baru)"},
    {"kanji": "久しぶり", "reading": "ひさしぶり", "romaji": "hisashiburi", "meaning": "Sudah lama tidak berjumpa", "pos": "Ungkapan", "level": "N4", "example": "お久しぶりですね！元気でしたか？(Lama tak jumpa ya! Apakah sehat?)"},
    {"kanji": "了解です", "reading": "りょうかいです", "romaji": "ryoukai desu", "meaning": "Dimengerti / Siap / Roger", "pos": "Ungkapan", "level": "N4", "example": "明日のスケジュール、了解です！(Jadwal besok, dimengerti!)"},
    {"kanji": "気をつけて", "reading": "きをつけて", "romaji": "ki o tsukete", "meaning": "Hati-hati di jalan", "pos": "Ungkapan", "level": "N5", "example": "暗いから気をつけて帰ってね。(Karena gelap, hati-hati pulang ya)"},
    {"kanji": "頑張って", "reading": "がんばって", "romaji": "ganbatte", "meaning": "Semangat / Berjuanglah", "pos": "Ungkapan", "level": "N5", "example": "明日のテスト、頑張ってください！(Ujian besok, semangat ya!)"},
    {"kanji": "お疲れ様です", "reading": "おつかれさまです", "romaji": "otsukaresama desu", "meaning": "Terima kasih atas kerja kerasnya (salam kantor)", "pos": "Ungkapan", "level": "N4", "example": "今日も一日お疲れ様でした。(Terima kasih atas kerja kerasnya hari ini)"},
    {"kanji": "よろしくお願いします", "reading": "よろしくおねがいします", "romaji": "yoroshiku onegai shimasu", "meaning": "Mohon bantuan & kerjasamanya", "pos": "Ungkapan", "level": "N5", "example": "こちらこそ、よろしくお願いします。(Saya juga mohon bantuannya)"},
    {"kanji": "失礼します", "reading": "しつれいします", "romaji": "shitsurei shimasu", "meaning": "Permisi (saat masuk/keluar ruangan)", "pos": "Ungkapan", "level": "N5", "example": "失礼します、入ってもいいですか？(Permisi, bolehkah saya masuk?)"},
    {"kanji": "お邪魔します", "reading": "おじゃまします", "romaji": "ojamashimasu", "meaning": "Permisi bertamu ke rumah orang", "pos": "Ungkapan", "level": "N4", "example": "お邪魔します、素敵な家ですね。(Permisi bertamu, rumah yang indah ya)"},
    {"kanji": "本当に", "reading": "ほんとうに", "romaji": "hontou ni", "meaning": "Benar-benar / Sungguh", "pos": "Kata Keterangan", "level": "N5", "example": "本当にありがとうございました。(Sungguh terima kasih banyak)"},
    {"kanji": "特に", "reading": "とくに", "romaji": "tokuni", "meaning": "Khususnya / Terutama", "pos": "Kata Keterangan", "level": "N4", "example": "日本の食べ物、特にラーメンが好きです。(Suka makanan Jepang, khususnya ramen)"},
    {"kanji": "例えば", "reading": "たとえば", "romaji": "tatoeba", "meaning": "Contohnya / Sebagai permisalan", "pos": "Kata Keterangan", "level": "N4", "example": "例えば、どんなスポーツが好き？(Misalnya, olahraga seperti apa yang kamu sukai?)"},
    {"kanji": "冗談", "reading": "じょうだん", "romaji": "joudan", "meaning": "Lelucon / Candaan", "pos": "Kata Benda", "level": "N4", "example": "冗談ですよ、本気にしないで！(Cuma bercanda, jangan dianggap serius ya!)"},
    {"kanji": "意見", "reading": "いけん", "romaji": "iken", "meaning": "Pendapat / Opini", "pos": "Kata Benda", "level": "N4", "example": "何かご意見はありますか？(Apakah ada pendapat lain?)"},
    {"kanji": "質問", "reading": "しつもん", "romaji": "shitsumon", "meaning": "Pertanyaan", "pos": "Kata Benda", "level": "N5", "example": "先生に質問があります。(Saya ada pertanyaan untuk guru)"},
    {"kanji": "説明", "reading": "せつめい", "romaji": "setsumei", "meaning": "Penjelasan", "pos": "Kata Benda", "level": "N4", "example": "使い方の説明を読んでください。(Tolong baca penjelasan cara pakai)"},
    {"kanji": "予定", "reading": "よてい", "romaji": "yotei", "meaning": "Rencana / Jadwal", "pos": "Kata Benda", "level": "N4", "example": "今週末の予定は何ですか？(Apa rencana akhir pekan ini?)"},
    {"kanji": "理由", "reading": "りゆう", "romaji": "riyuu", "meaning": "Alasan", "pos": "Kata Benda", "level": "N4", "example": "遅刻した理由を教えてください。(Tolong beritahu alasan terlambat)"},
    {"kanji": "賛成", "reading": "さんせい", "romaji": "sansei", "meaning": "Setuju / Sepakat", "pos": "Kata Benda", "level": "N4", "example": "彼の提案に賛成します。(Saya setuju dengan usulannya)"},
    {"kanji": "反対", "reading": "はんたい", "romaji": "hantai", "meaning": "Tidak setuju / Berlawanan", "pos": "Kata Benda", "level": "N4", "example": "その意見には反対です。(Saya tidak setuju dengan pendapat itu)"},
    {"kanji": "乾杯", "reading": "かんぱい", "romaji": "kanpai", "meaning": "Bersulang! (Cheers)", "pos": "Ungkapan", "level": "N5", "example": "みんなで一緒に乾杯しましょう！(Ayo kita semua bersulang bersama!)"},
    {"kanji": "改札", "reading": "かいさつ", "romaji": "kaisatsu", "meaning": "Pintu masuk/keluar tiket stasiun", "pos": "Kata Benda", "level": "N4", "example": "改札を出たところで待っています。(Saya menunggu di luar gerbang tiket)"},
    {"kanji": "切符", "reading": "きっぷ", "romaji": "kippu", "meaning": "Tiket karcis", "pos": "Kata Benda", "level": "N5", "example": "新幹線の切符を買いました。(Membeli tiket kereta cepat Shinkansen)"},
    {"kanji": "乗り換え", "reading": "のりかえ", "romaji": "norikae", "meaning": "Transit / Pindah jalur kendaraan", "pos": "Kata Benda", "level": "N4", "example": "新宿駅で地下鉄に乗り換えます。(Pindah ke subway di stasiun Shinjuku)"},
    {"kanji": "空港", "reading": "くうこう", "romaji": "kuukou", "meaning": "Bandar udara (Airport)", "pos": "Kata Benda", "level": "N4", "example": "羽田空港へタクシーで行きます。(Pergi ke bandara Haneda naik taksi)"},
    {"kanji": "飛行機", "reading": "ひこうき", "romaji": "hikouki", "meaning": "Pesawat terbang", "pos": "Kata Benda", "level": "N5", "example": "飛行機で北海道へ行きました。(Pergi ke Hokkaido naik pesawat)"},
    {"kanji": "荷物", "reading": "にもつ", "romaji": "nimotsu", "meaning": "Barang bawaan / Koper", "pos": "Kata Benda", "level": "N5", "example": "重い荷物を運ぶのを手伝います。(Membantu membawakan barang bawaan yang berat)"},
    {"kanji": "案内", "reading": "あんない", "romaji": "annai", "meaning": "Pemandu / Informasi petunjuk", "pos": "Kata Benda", "level": "N4", "example": "東京の街を案内します。(Saya akan memandu Anda berkeliling kota Tokyo)"},
    {"kanji": "予約", "reading": "よやく", "romaji": "yoyaku", "meaning": "Reservasi / Booking", "pos": "Kata Benda", "level": "N4", "example": "今夜のレストランを予約しました。(Saya sudah mereservasi restoran malam ini)"},
    {"kanji": "会計", "reading": "かいけい", "romaji": "kaikei", "meaning": "Kasir / Pembayaran tagihan", "pos": "Kata Benda", "level": "N4", "example": "お会計をお願いします。(Tolong tagihannya / minta bill)"},
    {"kanji": "レシート", "reading": "レシート", "romaji": "reshiito", "meaning": "Struk bukti belanja", "pos": "Kata Benda", "level": "N5", "example": "レシートをもらえますか？(Bolehkah saya minta struknya?)"},
    {"kanji": "割引", "reading": "わりびき", "romaji": "waribiki", "meaning": "Diskon potongan harga", "pos": "Kata Benda", "level": "N4", "example": "この商品は２０％割引です。(Barang ini didiskon 20%)"},
    {"kanji": "無料", "reading": "むりょう", "romaji": "muryou", "meaning": "Gratis (bebas biaya)", "pos": "Kata Benda", "level": "N4", "example": "このWi-Fiは無料で使えます。(Wi-Fi ini dapat digunakan secara gratis)"},
    {"kanji": "有料", "reading": "ゆうりょう", "romaji": "yuuryou", "meaning": "Berbayar / Dikenakan tarif", "pos": "Kata Benda", "level": "N4", "example": "駐車場は有料です。(Tempat parkirnya berbayar)"},
    {"kanji": "現金", "reading": "げんきん", "romaji": "genkin", "meaning": "Uang tunai (Cash)", "pos": "Kata Benda", "level": "N4", "example": "現金でお支払いします。(Saya bayar menggunakan uang tunai)"},
    {"kanji": "暗証番号", "reading": "あんしょうばんごう", "romaji": "anshou bangou", "meaning": "Nomor PIN rahasia", "pos": "Kata Benda", "level": "N3", "example": "暗証番号を４桁入力してください。(Masukkan nomor PIN 4 digit)"},
    {"kanji": "薬", "reading": "くすり", "romaji": "kusuri", "meaning": "Obat", "pos": "Kata Benda", "level": "N5", "example": "食後にこの薬を飲んでください。(Minumlah obat ini setelah makan)"},
    {"kanji": "熱", "reading": "ねつ", "romaji": "netsu", "meaning": "Demam / Suhu panas tubuh", "pos": "Kata Benda", "level": "N4", "example": "少し熱があるので休みます。(Karena sedikit demam, saya istirahat)"},
    {"kanji": "頭痛", "reading": "ずつう", "romaji": "zutsuu", "meaning": "Sakit kepala", "pos": "Kata Benda", "level": "N4", "example": "朝からひどい頭痛がします。(Dari pagi mengalami sakit kepala parah)"},
    {"kanji": "怪我", "reading": "けが", "romaji": "kega", "meaning": "Luka / Cedera", "pos": "Kata Benda", "level": "N4", "example": "足に怪我をしてしまいました。(Kaki saya mengalami cedera)"},
    {"kanji": "警察", "reading": "けいさつ", "romaji": "keisatsu", "meaning": "Kantor polisi", "pos": "Kata Benda", "level": "N4", "example": "財布を落としたので警察に届けました。(Melapor ke polisi karena dompet hilang)"},
    {"kanji": "救急車", "reading": "きゅうきゅうしゃ", "romaji": "kyuukyuusha", "meaning": "Ambulans", "pos": "Kata Benda", "level": "N4", "example": "すぐに救急車を呼んでください！(Tolong segera panggilkan ambulans!)"},
    {"kanji": "消防署", "reading": "しょうぼうしょ", "romaji": "shoubousho", "meaning": "Dinas pemadam kebakaran", "pos": "Kata Benda", "level": "N3", "example": "火事の時は１１９番です。(Saat terjadi kebakaran hubungi 119)"},
    {"kanji": "充電器", "reading": "じゅうでんき", "romaji": "juudenki", "meaning": "Charger pengisi daya", "pos": "Kata Benda", "level": "N4", "example": "スマホの充電器を貸してください。(Bolehkah saya pinjam charger HP?)"},
    {"kanji": "電池", "reading": "でんち", "romaji": "denchi", "meaning": "Baterai", "pos": "Kata Benda", "level": "N5", "example": "リモコンの電池が切れました。(Baterai remote control sudah habis)"},
    {"kanji": "画面", "reading": "がめん", "romaji": "gamen", "meaning": "Layar monitor (Screen)", "pos": "Kata Benda", "level": "N4", "example": "画面を共有して説明します。(Saya jelaskan sambil membagikan layar)"},
    {"kanji": "接続", "reading": "せつぞく", "romaji": "setsuzoku", "meaning": "Koneksi jaringan", "pos": "Kata Benda", "level": "N3", "example": "インターネットの接続が不安定です。(Koneksi internet tidak stabil)"},
    {"kanji": "再起動", "reading": "さいきどう", "romaji": "saikidou", "meaning": "Restart / Mulai ulang sistem", "pos": "Kata Benda", "level": "N3", "example": "パソコンを一度再起動してみてください。(Coba restart komputer Anda sekali)"},
    {"kanji": "検索", "reading": "けんさく", "romaji": "kensaku", "meaning": "Pencarian (Search)", "pos": "Kata Benda", "level": "N3", "example": "分からない単語をネットで検索します。(Mencari kata yang tidak dipahami di internet)"},
    {"kanji": "保存", "reading": "ほぞん", "romaji": "hozon", "meaning": "Simpan berkas (Save)", "pos": "Kata Benda", "level": "N3", "example": "作成したファイルを保存しました。(Menyimpan file yang telah dibuat)"},
    {"kanji": "削除", "reading": "さくじょ", "romaji": "sakujo", "meaning": "Hapus data (Delete)", "pos": "Kata Benda", "level": "N3", "example": "不要なデータを削除してください。(Tolong hapus data yang tidak diperlukan)"},
    {"kanji": "見積もり", "reading": "みつもり", "romaji": "mitsumori", "meaning": "Estimasi biaya / Penawaran harga", "pos": "Kata Benda", "level": "N3", "example": "プロジェクトの見積もり書を作成してください。(Tolong buatkan dokumen estimasi proyek)"},
    {"kanji": "請求書", "reading": "せいきゅうしょ", "romaji": "seikyuusho", "meaning": "Faktur tagihan (Invoice)", "pos": "Kata Benda", "level": "N3", "example": "月末に請求書を送付します。(Mengirim invoice di akhir bulan)"},
    {"kanji": "領収書", "reading": "りょうしゅうしょ", "romaji": "ryoushuusho", "meaning": "Kwitansi tanda terima resmi", "pos": "Kata Benda", "level": "N3", "example": "会社の経費にするので領収書をください。(Minta kwitansi untuk biaya klaim kantor)"},
    {"kanji": "担当者", "reading": "たんとうしゃ", "romaji": "tantousha", "meaning": "Penanggung jawab (PIC / Person in charge)", "pos": "Kata Benda", "level": "N3", "example": "この案件の担当者は誰ですか？(Siapa PIC proyek ini?)"},
    {"kanji": "引き継ぎ", "reading": "ひきつぎ", "romaji": "hikitsugi", "meaning": "Serah terima tugas (Handover)", "pos": "Kata Benda", "level": "N3", "example": "来週後輩に業務の引き継ぎをします。(Minggu depan serah terima pekerjaan ke junior)"},
    {"kanji": "有給", "reading": "ゆうきゅう", "romaji": "yuukyuu", "meaning": "Cuti berbayar tahunan", "pos": "Kata Benda", "level": "N3", "example": "金曜日に有給を取って連休にします。(Ambil cuti hari Jumat untuk libur panjang)"},
    {"kanji": "通勤", "reading": "つうきん", "romaji": "tsuukin", "meaning": "Perjalanan pulang-pergi kerja (Commute)", "pos": "Kata Benda", "level": "N4", "example": "毎日の通勤に１時間かかります。(Perjalanan kerja butuh 1 jam setiap hari)"},
    {"kanji": "退勤", "reading": "たいきん", "romaji": "taikin", "meaning": "Jam pulang kantor (Clock out)", "pos": "Kata Benda", "level": "N3", "example": "定時で退勤できました。(Bisa pulang kantor tepat waktu)"},
    {"kanji": "出勤", "reading": "しゅっきん", "romaji": "shukkin", "meaning": "Masuk kerja (Clock in)", "pos": "Kata Benda", "level": "N4", "example": "明日は朝８時に出勤します。(Besok masuk kerja jam 8 pagi)"},
    {"kanji": "共有", "reading": "きょうゆう", "romaji": "kyouyuu", "meaning": "Membagikan data (Share / Sharing)", "pos": "Kata Benda", "level": "N3", "example": "ファイルをチームで共有してください。(Tolong bagikan file ini ke tim)"},
    {"kanji": "連携", "reading": "れんけい", "romaji": "renkei", "meaning": "Koordinasi / Kerja sama tim", "pos": "Kata Benda", "level": "N3", "example": "他部署としっかり連携を取ります。(Berkoordinasi erat dengan divisi lain)"},
    {"kanji": "改善", "reading": "かいぜん", "romaji": "kaizen", "meaning": "Perbaikan mutu secara terus-menerus", "pos": "Kata Benda", "level": "N3", "example": "作業効率を改善するアイデアを出します。(Mengeluarkan ide untuk meningkatkan efisiensi)"},
    {"kanji": "効率", "reading": "こうりつ", "romaji": "kouritsu", "meaning": "Efisiensi kerja", "pos": "Kata Benda", "level": "N3", "example": "ショートカットキーで効率を上げます。(Meningkatkan efisiensi dengan tombol pintas)"},
    {"kanji": "仕様", "reading": "しよう", "romaji": "shiyou", "meaning": "Spesifikasi sistem / Ketentuan teknis", "pos": "Kata Benda", "level": "N3", "example": "システムの仕様を確認します。(Mengecek spesifikasi teknis sistem)"},
    {"kanji": "不具合", "reading": "ふぐあい", "romaji": "fuguai", "meaning": "Kekurangan / Malfungsi / Bug", "pos": "Kata Benda", "level": "N3", "example": "アプリに不具合が見つかりました。(Ditemukan bug pada aplikasi)"},
    {"kanji": "更新", "reading": "こうしん", "romaji": "koushin", "meaning": "Pembaruan (Update / Renew)", "pos": "Kata Benda", "level": "N3", "example": "最新バージョンに更新してください。(Harap perbarui ke versi terbaru)"},
    {"kanji": "お世話になります", "reading": "おせわになります", "romaji": "osewa ni narimasu", "meaning": "Terima kasih atas bantuan/kerjasamanya", "pos": "Ungkapan", "level": "N4", "example": "今後ともお世話になります。(Ke depannya saya mohon bantuannya)"},
    {"kanji": "とんでもないです", "reading": "とんでもないです", "romaji": "tondemo nai desu", "meaning": "Sama sekali bukan apa-apa (merendah sopan)", "pos": "Ungkapan", "level": "N3", "example": "「お礼を言わせてください」「いいえ、とんでもないです」('Biarkan saya berterima kasih' 'Ah sama sekali tidak')"},
    {"kanji": "恐れ入りますが", "reading": "おそれいりますが", "romaji": "osoreirimasu ga", "meaning": "Mohon maaf sebelumnya, tetapi...", "pos": "Ungkapan", "level": "N3", "example": "恐れ入りますが、お名前を伺えますか？(Mohon maaf sebelumnya, bolehkah saya tahu nama Anda?)"},
    {"kanji": "おかげさまで", "reading": "おかげさまで", "romaji": "okagesama de", "meaning": "Berkat doa & bantuan Anda (Alhamdulillah)", "pos": "Ungkapan", "level": "N4", "example": "おかげさまで元気に過ごしています。(Berkat doa Anda saya sehat walafiat)"},
    {"kanji": "気楽に", "reading": "きらくに", "romaji": "kiraku ni", "meaning": "Santai saja / Jangan tegang", "pos": "Kata Keterangan", "level": "N3", "example": "気楽に行きましょう、大丈夫ですよ。(Bawa santai saja, tidak apa-apa kok)"},
    {"kanji": "無理しないで", "reading": "むりしないで", "romaji": "muri shinaide", "meaning": "Jangan memaksakan diri", "pos": "Ungkapan", "level": "N4", "example": "疲れた時は無理しないで休んでね。(Kalau capek jangan dipaksakan, istirahat ya)"},
    {"kanji": "相変わらず", "reading": "あいかわらず", "romaji": "aikawarazu", "meaning": "Seperti biasa / Tidak berubah", "pos": "Kata Keterangan", "level": "N3", "example": "彼は相変わらず元気そうでした。(Dia seperti biasa kelihatan selalu bersemangat)"},
    {"kanji": "注文", "reading": "ちゅうもん", "romaji": "chuumon", "meaning": "Pesanan makanan / Memesan", "pos": "Kata Benda", "level": "N4", "example": "ご注文はお決まりですか？(Apakah Anda sudah siap memesan?)"},
    {"kanji": "お冷", "reading": "おひや", "romaji": "ohiya", "meaning": "Air putih dingin gratis di restoran", "pos": "Kata Benda", "level": "N4", "example": "すみません、お冷をもう一杯ください。(Permisi, tolong minta air putih segelas lagi)"},
    {"kanji": "店内", "reading": "てんない", "romaji": "tennai", "meaning": "Makan di tempat (Dine in)", "pos": "Kata Benda", "level": "N4", "example": "店内でお召し上がりですか？(Apakah ingin makan di dalam resto?)"},
    {"kanji": "おかわり", "reading": "おかわり", "romaji": "okawari", "meaning": "Nambah porsi (Refill)", "pos": "Kata Benda", "level": "N4", "example": "ご飯のおかわりは無料です。(Tambah nasi gratis)"},
    {"kanji": "大盛り", "reading": "おおもり", "romaji": "oomori", "meaning": "Porsi besar (Large size)", "pos": "Kata Benda", "level": "N4", "example": "ラーメン大盛りでお願いします。(Minta ramen porsi besar ya)"},
    {"kanji": "並盛り", "reading": "なみもり", "romaji": "namimori", "meaning": "Porsi standar biasa (Regular size)", "pos": "Kata Benda", "level": "N4", "example": "牛丼の並盛りをひとつください。(Minta gyudon porsi biasa satu)"},
    {"kanji": "甘口", "reading": "あまくち", "romaji": "amakuchi", "meaning": "Rasa manis / Tidak pedas (Mild)", "pos": "Kata Benda", "level": "N4", "example": "カレーは甘口が好きです。(Saya suka kari rasa manis/tidak pedas)"},
    {"kanji": "辛口", "reading": "からくち", "romaji": "karakuchi", "meaning": "Rasa pedas / Tajam (Spicy)", "pos": "Kata Benda", "level": "N4", "example": "辛口のソースをかけて食べます。(Makan dengan saus pedas)"},
    {"kanji": "居酒屋", "reading": "いざかや", "romaji": "izakaya", "meaning": "Kedai makan & minum santai khas Jepang", "pos": "Kata Benda", "level": "N4", "example": "仕事終わりに居酒屋へ行きました。(Pergi ke izakaya sepulang kerja)"},
    {"kanji": "焼き鳥", "reading": "やきとり", "romaji": "yakitori", "meaning": "Sate ayam khas Jepang", "pos": "Kata Benda", "level": "N5", "example": "居酒屋で美味しい焼き鳥を頼みました。(Memesan yakitori lezat di kedai)"},
    {"kanji": "おつまみ", "reading": "おつまみ", "romaji": "otsumami", "meaning": "Camilan ringan pendamping minuman", "pos": "Kata Benda", "level": "N4", "example": "ビールにおつまみの枝豆がよく合います。(Kacang edamame sangat cocok untuk camilan bir)"},
    {"kanji": "生ビール", "reading": "なまビール", "romaji": "namabiiru", "meaning": "Bir draft segar (Draft beer)", "pos": "Kata Benda", "level": "N4", "example": "とりあえず生ビールで！(Untuk permulaan, bir draft satu!)"},
    {"kanji": "袋", "reading": "ふくろ", "romaji": "fukuro", "meaning": "Kantong plastik belanjaan", "pos": "Kata Benda", "level": "N5", "example": "レジ袋はご利用ですか？(Apakah Anda memerlukan kantong plastik?)"},
    {"kanji": "温め", "reading": "あたため", "romaji": "atatame", "meaning": "Pemanasan microwave makanan", "pos": "Kata Benda", "level": "N4", "example": "お弁当を温めますか？(Apakah bento-nya mau dihangatkan di microwave?)"},
    {"kanji": "税込み", "reading": "ぜいこみ", "romaji": "zeikomi", "meaning": "Harga sudah termasuk pajak (Tax included)", "pos": "Kata Benda", "level": "N4", "example": "この商品は税込み５００円です。(Barang ini harganya 500 yen sudah termasuk pajak)"},
    {"kanji": "税抜き", "reading": "ぜいぬき", "romaji": "zeinuki", "meaning": "Harga belum termasuk pajak", "pos": "Kata Benda", "level": "N4", "example": "税抜き価格が表示されています。(Harga yang tertera belum termasuk pajak)"},
    {"kanji": "売り切れ", "reading": "うりきれ", "romaji": "urikire", "meaning": "Habis terjual (Sold out)", "pos": "Kata Benda", "level": "N4", "example": "大人気でチケットが売り切れました。(Saking populernya tiket sudah habis terjual)"},
    {"kanji": "返品", "reading": "へんぴん", "romaji": "henpin", "meaning": "Pengembalian barang retur", "pos": "Kata Benda", "level": "N3", "example": "サイズが合わないので返品したいです。(Mau retur karena ukurannya tidak pas)"},
    {"kanji": "交換", "reading": "こうかん", "romaji": "koukan", "meaning": "Penukaran barang / Barter", "pos": "Kata Benda", "level": "N4", "example": "不良品を新品と交換してもらいました。(Menukar barang rusak dengan yang baru)"},
    {"kanji": "試着", "reading": "しちゃく", "romaji": "shichaku", "meaning": "Mencoba pakaian (Fitting)", "pos": "Kata Benda", "level": "N4", "example": "試着室を使ってもいいですか？(Bolehkah saya memakai ruang pas untuk mencoba?)"},
    {"kanji": "ポイントカード", "reading": "ポイントカード", "romaji": "pointo kaado", "meaning": "Kartu poin member belanja", "pos": "Kata Benda", "level": "N4", "example": "ポイントカードはお持ちですか？(Apakah Anda membawa kartu poin?)"},
    {"kanji": "終電", "reading": "しゅうでん", "romaji": "shuuden", "meaning": "Kereta terakhir malam hari (Last train)", "pos": "Kata Benda", "level": "N4", "example": "終電を逃さないように急ぎましょう！(Ayo buruan biar tidak ketinggalan kereta terakhir!)"},
    {"kanji": "始発", "reading": "しはつ", "romaji": "shihatsu", "meaning": "Kereta pertama pagi hari (First train)", "pos": "Kata Benda", "level": "N3", "example": "明日の始発電車で出発します。(Berangkat naik kereta pertama besok pagi)"},
    {"kanji": "各駅停車", "reading": "かくえきていしゃ", "romaji": "kakueki teisha", "meaning": "Kereta lokal yang berhenti di tiap stasiun", "pos": "Kata Benda", "level": "N3", "example": "この電車は各駅停車です。(Kereta ini berhenti di setiap stasiun)"},
    {"kanji": "快速", "reading": "かいそく", "romaji": "kaisoku", "meaning": "Kereta semi cepat (Rapid)", "pos": "Kata Benda", "level": "N4", "example": "快速に乗ると早く着きますよ。(Kalau naik kereta cepat bakal sampai lebih awal)"},
    {"kanji": "特急", "reading": "とっきゅう", "romaji": "tokkyuu", "meaning": "Kereta ekspres khusus (Limited express)", "pos": "Kata Benda", "level": "N4", "example": "特急券を窓口で購入しました。(Membeli tiket ekspres di loket)"},
    {"kanji": "指定席", "reading": "していせき", "romaji": "seiteiseki", "meaning": "Kursi pesanan khusus (Reserved seat)", "pos": "Kata Benda", "level": "N4", "example": "新幹線の指定席を予約しました。(Memesan kursi khusus di Shinkansen)"},
    {"kanji": "自由席", "reading": "じゆうせき", "romaji": "jiyuuseki", "meaning": "Kursi bebas tanpa reservasi", "pos": "Kata Benda", "level": "N4", "example": "自由席は少し混雑しています。(Gerbong kursi bebas agak ramai)"},
    {"kanji": "満員", "reading": "まんいん", "romaji": "man'in", "meaning": "Penuh sesak penumpang (Packed)", "pos": "Kata Benda", "level": "N3", "example": "朝の満員電車はとても大変です。(Kereta pagi yang penuh sesak sangat melelahkan)"},
    {"kanji": "片道", "reading": "かたみち", "romaji": "katamichi", "meaning": "Perjalanan satu arah (One-way)", "pos": "Kata Benda", "level": "N4", "example": "東京までの片道切符を買いました。(Membeli tiket satu arah menuju Tokyo)"},
    {"kanji": "往復", "reading": "おうふく", "romaji": "oufuku", "meaning": "Perjalanan pulang-pergi (Round trip)", "pos": "Kata Benda", "level": "N4", "example": "往復割引が適用されます。(Mendapat potongan harga tiket pulang-pergi)"},
    {"kanji": "両替", "reading": "りょうがえ", "romaji": "ryougae", "meaning": "Penukaran mata uang (Money exchange)", "pos": "Kata Benda", "level": "N4", "example": "空港で日本円に両替しました。(Menukar uang rupiah ke Yen di bandara)"},
    {"kanji": "観光", "reading": "かんこう", "romaji": "kankou", "meaning": "Pariwisata / Berwisata (Sightseeing)", "pos": "Kata Benda", "level": "N4", "example": "京都の名所を観光しました。(Berwisata mengunjungi tempat terkenal di Kyoto)"},
    {"kanji": "神社", "reading": "じんじゃ", "romaji": "jinja", "meaning": "Kuil Shinto Jepang (Shrine)", "pos": "Kata Benda", "level": "N5", "example": "有名な神社でお参りをしました。(Berdoa di kuil Shinto terkenal)"},
    {"kanji": "お寺", "reading": "おてら", "romaji": "otera", "meaning": "Kuil Buddha Jepang (Temple)", "pos": "Kata Benda", "level": "N5", "example": "静かなお寺の庭園を眺めました。(Memandangi taman kuil Buddha yang tenang)"},
    {"kanji": "温泉", "reading": "おんせん", "romaji": "onsen", "meaning": "Pemandian air panas alami (Hot spring)", "pos": "Kata Benda", "level": "N4", "example": "箱根の温泉に入って癒やされました。(Mandi di onsen Hakone terasa menyegarkan)"},
    {"kanji": "安心", "reading": "あんしん", "romaji": "anshin", "meaning": "Lega / Merasa tenang", "pos": "Kata Sifat-Na", "level": "N4", "example": "元気な顔を見て安心しました。(Lega melihat wajahmu yang sehat)"},
    {"kanji": "心配", "reading": "しんぱい", "romaji": "shinpai", "meaning": "Khawatir / Cemas", "pos": "Kata Sifat-Na", "level": "N5", "example": "あまり心配しないでください。(Tolong jangan terlalu cemas)"},
    {"kanji": "緊張", "reading": "きんちょう", "romaji": "kinchou", "meaning": "Gugup / Tegang (Nervous)", "pos": "Kata Benda", "level": "N4", "example": "スピーチの前に緊張しました。(Gugup sekali sebelum berpidato)"},
    {"kanji": "感動", "reading": "かんどう", "romaji": "kandou", "meaning": "Terharu / Tersentuh hati", "pos": "Kata Benda", "level": "N3", "example": "映画を見て深く感動しました。(Sangat terharu menonton film itu)"},
    {"kanji": "親切", "reading": "しんせつ", "romaji": "shinsetsu", "meaning": "Ramah / Baik hati", "pos": "Kata Sifat-Na", "level": "N5", "example": "駅員さんがとても親切に教えてくれました。(Petugas stasiun dengan ramah memberi petunjuk)"},
    {"kanji": "真面目", "reading": "まじめ", "romaji": "majime", "meaning": "Rajin / Sungguh-sungguh / Disiplin", "pos": "Kata Sifat-Na", "level": "N4", "example": "彼はとても真面目に勉強しています。(Dia belajar dengan sangat rajin dan sungguh-sungguh)"},
    {"kanji": "正直", "reading": "しょうじき", "romaji": "shoujiki", "meaning": "Jujur / Sejujurnya", "pos": "Kata Sifat-Na", "level": "N3", "example": "正直に言うと少し怖かったです。(Sejujurnya saya tadi agak takut)"},
    {"kanji": "我慢", "reading": "がまん", "romaji": "gaman", "meaning": "Bersabar / Bertahan / Tabah", "pos": "Kata Benda", "level": "N3", "example": "もう少しだけ我慢してください。(Harap bersabar sebentar lagi)"},
    {"kanji": "応援", "reading": "おうえん", "romaji": "ouen", "meaning": "Mendukung / Bersorak menyemangati", "pos": "Kata Benda", "level": "N3", "example": "あなたの挑戦を心から応援しています。(Saya mendukung perjuanganmu sepenuh hati)"},
    {"kanji": "感謝", "reading": "かんしゃ", "romaji": "kansha", "meaning": "Rasa terima kasih mendalam (Gratitude)", "pos": "Kata Benda", "level": "N3", "example": "皆様のご協力に深く感謝いたします。(Terima kasih yang sebesar-besarnya atas bantuan Anda semua)"},
    {"kanji": "晴れ", "reading": "はれ", "romaji": "hare", "meaning": "Cerah berawan sedikit", "pos": "Kata Benda", "level": "N5", "example": "今日は気持ちの良い晴れです。(Hari ini cuacanya cerah menyenangkan)"},
    {"kanji": "曇り", "reading": "くもり", "romaji": "kumori", "meaning": "Mendung berawan", "pos": "Kata Benda", "level": "N5", "example": "午後は曇りになる見込みです。(Diperkirakan siang nanti bakal mendung)"},
    {"kanji": "大雨", "reading": "おおあめ", "romaji": "ooame", "meaning": "Hujan lebat / Deras", "pos": "Kata Benda", "level": "N4", "example": "大雨警報が発令されました。(Peringatan hujan lebat telah dikeluarkan)"},
    {"kanji": "雷", "reading": "かみなり", "romaji": "kaminari", "meaning": "Petir / Halilintar / Guruh", "pos": "Kata Benda", "level": "N3", "example": "遠くで雷の音が鳴っています。(Terdengar suara petir bergemuruh di kejauhan)"},
    {"kanji": "虹", "reading": "にじ", "romaji": "niji", "meaning": "Pelangi indah", "pos": "Kata Benda", "level": "N3", "example": "雨上がりの空にきれいな虹が出ました。(Muncul pelangi indah di langit sehabis hujan)"},
    {"kanji": "風", "reading": "かぜ", "romaji": "kaze", "meaning": "Angin semilir", "pos": "Kata Benda", "level": "N5", "example": "爽やかな春の風が吹いています。(Angin musim semi bertiup sepoi-sepoi)"},
    {"kanji": "星", "reading": "ほし", "romaji": "hoshi", "meaning": "Bintang di langit", "pos": "Kata Benda", "level": "N5", "example": "夜空に満天の星が輝いています。(Bintang gemerlap memenuhi langit malam)"},
    {"kanji": "月", "reading": "つき", "romaji": "tsuki", "meaning": "Bulan purnama", "pos": "Kata Benda", "level": "N5", "example": "今夜は月がとても明るいです。(Malam ini rembulan bersinar sangat terang)"},
    {"kanji": "太陽", "reading": "たいよう", "romaji": "taiyou", "meaning": "Matahari", "pos": "Kata Benda", "level": "N4", "example": "太陽の光を浴びて歩きます。(Berjalan di bawah hangatnya sinar mentari)"},
    {"kanji": "湖", "reading": "みずうみ", "romaji": "mizuumi", "meaning": "Danau", "pos": "Kata Benda", "level": "N4", "example": "琵琶湖は日本で一番大きな湖です。(Danau Biwa adalah danau terbesar di Jepang)"},
    {"kanji": "川", "reading": "かわ", "romaji": "kawa", "meaning": "Sungai", "pos": "Kata Benda", "level": "N5", "example": "きれいな川で魚が泳いでいます。(Ikan berenang di sungai yang jernih)"},
    {"kanji": "島", "reading": "しま", "romaji": "shima", "meaning": "Pulau", "pos": "Kata Benda", "level": "N4", "example": "小さな島を船で一周しました。(Mengelilingi pulau kecil dengan perahu)"},
    {"kanji": "森", "reading": "もり", "romaji": "mori", "meaning": "Hutan lebat", "pos": "Kata Benda", "level": "N4", "example": "静かな森の中を散策しました。(Berjalan santai di dalam keheningan hutan)"},
    {"kanji": "海岸", "reading": "かいがん", "romaji": "kaigan", "meaning": "Tepi pantai / Pesisir laut", "pos": "Kata Benda", "level": "N4", "example": "夕方に海岸を散歩しました。(Berjalan-jalan di tepi pantai saat senja)"},
    {"kanji": "玄関", "reading": "げんかん", "romaji": "genkan", "meaning": "Pintu masuk rumah (tempat lepas sepatu)", "pos": "Kata Benda", "level": "N4", "example": "玄関で靴を脱いで上がってください。(Harap lepas sepatu di genkan sebelum masuk)"},
    {"kanji": "廊下", "reading": "ろうか", "romaji": "rouka", "meaning": "Lorong koridor jalan", "pos": "Kata Benda", "level": "N4", "example": "廊下は走らないでください。(Tolong jangan berlari di lorong)"},
    {"kanji": "階段", "reading": "かいだん", "romaji": "kaidan", "meaning": "Tangga", "pos": "Kata Benda", "level": "N5", "example": "階段を使って３階まで上がります。(Naik tangga sampai lantai 3)"},
    {"kanji": "台所", "reading": "だいどころ", "romaji": "daidokoro", "meaning": "Dapur tempat memasak (Kitchen)", "pos": "Kata Benda", "level": "N5", "example": "台所でお母さんが夕飯を作っています。(Ibu sedang memasak makan malam di dapur)"},
    {"kanji": "寝室", "reading": "しんしつ", "romaji": "shinshitsu", "meaning": "Kamar tidur (Bedroom)", "pos": "Kata Benda", "level": "N4", "example": "静かな寝室でぐっすり眠りました。(Tidur nyenyak di kamar tidur yang tenang)"},
    {"kanji": "居間", "reading": "いま", "romaji": "ima", "meaning": "Ruang keluarga / Ruang tamu santai", "pos": "Kata Benda", "level": "N4", "example": "家族みんなで居間に集まりました。(Semua keluarga berkumpul di ruang tamu)"},
    {"kanji": "押入れ", "reading": "おしいれ", "romaji": "oshiire", "meaning": "Lemari dinding geser khas Jepang", "pos": "Kata Benda", "level": "N4", "example": "布団を押入れにしまいました。(Menyimpan kasur lipat futon di lemari oshiire)"},
    {"kanji": "畳", "reading": "たたみ", "romaji": "tatami", "meaning": "Tikar jerami tradisional Jepang (Tatami)", "pos": "Kata Benda", "level": "N4", "example": "畳の香りがとても落ち着きます。(Aroma anyaman tatami sangat menenangkan)"},
    {"kanji": "障子", "reading": "しょうじ", "romaji": "shouji", "meaning": "Pintu geser kertas Jepang", "pos": "Kata Benda", "level": "N3", "example": "和室の障子から光が差し込みます。(Sinar mentari masuk lewat pintu shouji kamar gaya Jepang)"},
    {"kanji": "家具", "reading": "かぐ", "romaji": "kagu", "meaning": "Perabotan rumah / Mebel (Furniture)", "pos": "Kata Benda", "level": "N4", "example": "新しい家具を部屋に置きました。(Menaruh mebel baru di ruangan)"},
    {"kanji": "掃除機", "reading": "そうじき", "romaji": "soujiki", "meaning": "Alat penyedot debu (Vacuum cleaner)", "pos": "Kata Benda", "level": "N4", "example": "掃除機で部屋をきれいにしました。(Membersihkan kamar dengan vacuum cleaner)"},
    {"kanji": "洗濯機", "reading": "せんたくき", "romaji": "sentakuki", "meaning": "Mesin cuci pakaian", "pos": "Kata Benda", "level": "N5", "example": "洗濯機を回して服を洗います。(Menyalakan mesin cuci untuk membersihkan baju)"},
    {"kanji": "冷蔵庫", "reading": "れいぞうこ", "romaji": "reizouko", "meaning": "Kulkas lemari es", "pos": "Kata Benda", "level": "N5", "example": "牛乳を冷蔵庫に入れておきます。(Menyimpan susu di kulkas)"},
    {"kanji": "電子レンジ", "reading": "でんしレンジ", "romaji": "denshirenji", "meaning": "Microwave penghangat makanan", "pos": "Kata Benda", "level": "N4", "example": "電子レンジでスープを温めます。(Menghangatkan sup di microwave)"},
    {"kanji": "炊飯器", "reading": "すいはんき", "romaji": "suihanki", "meaning": "Penanak nasi (Rice cooker)", "pos": "Kata Benda", "level": "N4", "example": "炊飯器でお米を炊きました。(Memasak beras di rice cooker)"},
    {"kanji": "見つけます", "reading": "みつけます", "romaji": "mitsukemasu", "meaning": "Menemukan (barang yang dicari)", "pos": "Kata Kerja", "level": "N4", "example": "机の下でペンを見つけました。(Menemukan pulpen di bawah meja)"},
    {"kanji": "捨てます", "reading": "すてます", "romaji": "sutemasu", "meaning": "Membuang (sampah)", "pos": "Kata Kerja", "level": "N5", "example": "ゴミ箱にいらない紙を捨てます。(Membuang kertas yang tidak terpakai ke tempat sampah)"},
    {"kanji": "届けます", "reading": "とどけます", "romaji": "todokemasu", "meaning": "Mengantarkan / Mengirim sampai tujuan", "pos": "Kata Kerja", "level": "N4", "example": "書類をお客様の会社へ届けます。(Mengantarkan berkas ke kantor klien)"},
    {"kanji": "預けます", "reading": "あずけます", "romaji": "azukemasu", "meaning": "Menitipkan barang", "pos": "Kata Kerja", "level": "N4", "example": "ホテルに荷物を預けて出かけました。(Menitipkan koper di hotel lalu jalan-jalan)"},
    {"kanji": "乗り遅れます", "reading": "のりにおくれます", "romaji": "noriniokuremasu", "meaning": "Ketinggalan kendaraan (kereta/bus)", "pos": "Kata Kerja", "level": "N4", "example": "寝坊して電車に乗り遅れました。(Kesiangan jadi ketinggalan kereta)"},
    {"kanji": "並びます", "reading": "ならびます", "romaji": "narabimasu", "meaning": "Mengantre berbaris", "pos": "Kata Kerja", "level": "N5", "example": "レジの前で順番に並びます。(Mengantre berurutan di depan kasir)"},
    {"kanji": "渡します", "reading": "わたします", "romaji": "watashimasu", "meaning": "Menyerahkan ke tangan orang lain", "pos": "Kata Kerja", "level": "N5", "example": "先生に宿題のノートを渡しました。(Menyerahkan buku tugas kepada guru)"},
    {"kanji": "引っ越します", "reading": "ひっこします", "romaji": "hikkoshimasu", "meaning": "Pindah tempat tinggal (Pindahan)", "pos": "Kata Kerja", "level": "N4", "example": "来月新しいアパートに引っ越します。(Bulan depan pindah ke apartemen baru)"},
    {"kanji": "建てます", "reading": "たてます", "romaji": "tatemasu", "meaning": "Membangun gedung / mendirikan rumah", "pos": "Kata Kerja", "level": "N4", "example": "将来大きな家を建てたいです。(Di masa depan ingin membangun rumah besar)"},
    {"kanji": "賑やか", "reading": "にぎやか", "romaji": "nigiyaka", "meaning": "Ramai menyenangkan / Semarak", "pos": "Kata Sifat-Na", "level": "N5", "example": "お祭りの夜はとても賑やかでした。(Malam festival sangat ramai dan semarak)"},
    {"kanji": "不便", "reading": "ふべん", "romaji": "fuben", "meaning": "Tidak praktis / Sulit dijangkau", "pos": "Kata Sifat-Na", "level": "N5", "example": "駅から遠いので少し不便です。(Agak repot/tidak praktis karena jauh dari stasiun)"},
    {"kanji": "便利", "reading": "べんり", "romaji": "benri", "meaning": "Praktis / Memudahkan hidup", "pos": "Kata Sifat-Na", "level": "N5", "example": "スマホはとても便利な道具です。(Smartphone adalah alat yang sangat praktis)"},
    {"kanji": "安全", "reading": "あんぜん", "romaji": "anzen", "meaning": "Aman tanpa bahaya", "pos": "Kata Sifat-Na", "level": "N4", "example": "日本は夜でも比較的安全です。(Jepang relatif aman bahkan di malam hari)"},
    {"kanji": "危険", "reading": "きけん", "romaji": "kiken", "meaning": "Berbahaya / Risiko tinggi", "pos": "Kata Sifat-Na", "level": "N4", "example": "線路に入るのは非常に危険です。(Masuk ke rel kereta api sangat berbahaya)"},
    {"kanji": "複雑", "reading": "ふくざつ", "romaji": "fukuzatsu", "meaning": "Rumit / Kompleks", "pos": "Kata Sifat-Na", "level": "N4", "example": "地下鉄の路線図が複雑で迷いました。(Peta jalur subway rumit sehingga saya tersesat)"},
    {"kanji": "簡単", "reading": "かんたん", "romaji": "kantan", "meaning": "Mudah / Sederhana (Simple)", "pos": "Kata Sifat-Na", "level": "N5", "example": "この料理は簡単で作るのが楽しいです。(Masakan ini mudah dan seru dibuat)"},
    {"kanji": "大切", "reading": "たいせつ", "romaji": "taisetsu", "meaning": "Penting / Berharga sekali", "pos": "Kata Sifat-Na", "level": "N5", "example": "友達との思い出を大切にします。(Menghargai kenangan berharga bersama kawan)"},
    {"kanji": "特別", "reading": "とくべつ", "romaji": "tokubetsu", "meaning": "Spesial / Istimewa", "pos": "Kata Sifat-Na", "level": "N4", "example": "誕生日に特別なディナーを食べました。(Makan malam istimewa saat ulang tahun)"},
    {"kanji": "普通", "reading": "ふつう", "romaji": "futsuu", "meaning": "Biasa / Normal / Standar", "pos": "Kata Benda", "level": "N4", "example": "普通の味ですが家庭的で美味しいです。(Rasa biasa tapi enak terasa masakan rumahan)"},
    {"kanji": "うっかり", "reading": "うっかり", "romaji": "ukkari", "meaning": "Secara tidak sengaja / Ceroboh", "pos": "Kata Keterangan", "level": "N3", "example": "うっかり傘を電車に置き忘れた。(Ceroboh payung ketinggalan di kereta)"},
    {"kanji": "ぎりぎり", "reading": "ぎりぎり", "romaji": "girigiri", "meaning": "Nyaris mepet / Di batas waktu", "pos": "Kata Keterangan", "level": "N3", "example": "ぎりぎりセーフで試験に合格した！(Lolos ujian nyaris mepet batas kelulusan!)"},
    {"kanji": "ばっちり", "reading": "ばっちり", "romaji": "bacchiri", "meaning": "Sempurna / Beres mantap", "pos": "Kata Keterangan", "level": "N3", "example": "試験の準備はばっちりです！(Persiapan menghadapi ujian sudah mantap!)"},
    {"kanji": "のんびり", "reading": "のんびり", "romaji": "nonbiri", "meaning": "Santai santai / Menikmati waktu rileks", "pos": "Kata Keterangan", "level": "N3", "example": "週末は家でのんびり過ごします。(Menghabiskan akhir pekan santai rileks di rumah)"},
    {"kanji": "どんどん", "reading": "どんどん", "romaji": "dondon", "meaning": "Semakin cepat / Terus menerus maju", "pos": "Kata Keterangan", "level": "N4", "example": "日本語がどんどん上手になっています。(Bahasa Jepangnya semakin cepat mahir)"},
    {"kanji": "だんだん", "reading": "だんだん", "romaji": "dandan", "meaning": "Perlahan-lahan / Berangsur-angsur", "pos": "Kata Keterangan", "level": "N5", "example": "秋になってだんだん寒くなりました。(Masuk musim gugur berangsur dingin)"},
    {"kanji": "いよいよ", "reading": "いよいよ", "romaji": "iyoiyo", "meaning": "Akhirnya tiba saatnya (yang dinanti)", "pos": "Kata Keterangan", "level": "N3", "example": "いよいよ明日が本番の日です！(Akhirnya besok adalah hari penentuan!)"},
    {"kanji": "やっと", "reading": "やっと", "romaji": "yatto", "meaning": "Akhirnya berhasil juga (dengan perjuangan)", "pos": "Kata Keterangan", "level": "N4", "example": "長い勉強の末、やっと合格しました！(Setelah lama belajar, akhirnya lulus juga!)"},
    {"kanji": "一昨日", "reading": "おととい", "romaji": "ototoi", "meaning": "Kemarin lusa", "pos": "Kata Benda", "level": "N5", "example": "一昨日買った本を読み終えました。(Selesai membaca buku yang dibeli lusa lalu)"},
    {"kanji": "明後日", "reading": "あさって", "romaji": "asatte", "meaning": "Besok lusa", "pos": "Kata Benda", "level": "N5", "example": "明後日の午後に会いましょう。(Mari bertemu besok lusa siang)"},
    {"kanji": "先々週", "reading": "せんせんしゅう", "romaji": "sensenshuu", "meaning": "Dua minggu yang lalu", "pos": "Kata Benda", "level": "N4", "example": "先々週から新しい仕事を始めました。(Mulai pekerjaan baru sejak dua minggu lalu)"},
    {"kanji": "再来週", "reading": "さらいしゅう", "romaji": "saraishuu", "meaning": "Dua minggu yang akan datang", "pos": "Kata Benda", "level": "N4", "example": "再来週にプレゼンを発表します。(Akan mempresentasikan dua minggu lagi)"},
    {"kanji": "平日", "reading": "へいじつ", "romaji": "heijitsu", "meaning": "Hari kerja biasa (Senin-Jumat)", "pos": "Kata Benda", "level": "N4", "example": "平日は毎日残業で忙しいです。(Hari kerja selalu sibuk lembur setiap hari)"},
    {"kanji": "祝日", "reading": "しゅくじつ", "romaji": "shukujitsu", "meaning": "Hari libur nasional tanggal merah", "pos": "Kata Benda", "level": "N3", "example": "月曜日が祝日で三連休になります。(Senin libur nasional jadi libur 3 hari)"},
    {"kanji": "年末年始", "reading": "ねんまつねんし", "romaji": "nenmatsunenshi", "meaning": "Periode liburan akhir & tahun baru", "pos": "Kata Benda", "level": "N3", "example": "年末年始は実家へ帰省します。(Pulang kampung saat liburan tahun baru)"},
    {"kanji": "四季", "reading": "しき", "romaji": "shiki", "meaning": "Empat musim Jepang (Semi, Panas, Gugur, Dingin)", "pos": "Kata Benda", "level": "N3", "example": "日本には美しい四季があります。(Jepang memiliki keindahan empat musim)"},
    {"kanji": "梅雨", "reading": "つゆ", "romaji": "tsuyu", "meaning": "Musim hujan lebat bulan Juni Jepang", "pos": "Kata Benda", "level": "N3", "example": "梅雨の季節は毎日雨が続きます。(Musim tsuyu hujan terus turun tiap hari)"},
    {"kanji": "真夏", "reading": "まなつ", "romaji": "manatsu", "meaning": "Puncak musim panas yang terik", "pos": "Kata Benda", "level": "N3", "example": "真夏の昼間はとても暑いです。(Siang hari di puncak musim panas sangat terik)"},
    {"kanji": "初雪", "reading": "はつゆき", "romaji": "hatsuyuki", "meaning": "Salju pertama yang turun tahun ini", "pos": "Kata Benda", "level": "N3", "example": "富士山に初雪が観測されました。(Salju pertama teramati di Gunung Fuji)"},
    {"kanji": "花火", "reading": "はなび", "romaji": "hanabi", "meaning": "Kembang api festival musim panas", "pos": "Kata Benda", "level": "N4", "example": "夏祭りで夜空に広がる花火を見ました。(Melihat kembang api mekar di langit festival musim panas)"},
    {"kanji": "着物", "reading": "きもの", "romaji": "kimono", "meaning": "Pakaian tradisional Kimono", "pos": "Kata Benda", "level": "N5", "example": "京都で着物を着て街を歩きました。(Memakai kimono dan berjalan-jalan di kota Kyoto)"},
    {"kanji": "浴衣", "reading": "ゆかた", "romaji": "yukata", "meaning": "Kimono katun santai musim panas", "pos": "Kata Benda", "level": "N4", "example": "浴衣を着て花火大会へ出かけました。(Pergi ke festival kembang api mengenakan yukata)"},
    {"kanji": "抹茶", "reading": "まっちゃ", "romaji": "matcha", "meaning": "Teh hijau bubuk halus Jepang", "pos": "Kata Benda", "level": "N4", "example": "茶道で本格的な抹茶をいただきました。(Menikmati matcha asli dalam upacara minum teh)"},
    {"kanji": "生け花", "reading": "いけばな", "romaji": "ikebana", "meaning": "Seni merangkai bunga tradisional", "pos": "Kata Benda", "level": "N3", "example": "母は生け花の教室に通っています。(Ibu rutin mengikuti kursus seni ikebana)"},
    {"kanji": "折り紙", "reading": "おりがみ", "romaji": "origami", "meaning": "Seni melipat kertas Jepang", "pos": "Kata Benda", "level": "N5", "example": "子供たちと折り紙で鶴を折りました。(Melipat burung bangau origami bersama anak-anak)"},
    {"kanji": "歌舞伎", "reading": "かぶき", "romaji": "kabuki", "meaning": "Seni teater drama klasik Jepang", "pos": "Kata Benda", "level": "N3", "example": "銀座の劇場で初めて歌舞伎を鑑賞しました。(Menonton drama kabuki untuk pertama kali di teater Ginza)"},
    {"kanji": "相撲", "reading": "すもう", "romaji": "sumou", "meaning": "Gulat tradisional Jepang (Sumo)", "pos": "Kata Benda", "level": "N4", "example": "両国国技館で大相撲を観戦しました。(Menyaksikan pertandingan sumo di Ryogoku Kokugikan)"},
    {"kanji": "漫画", "reading": "まんが", "romaji": "manga", "meaning": "Komik Jepang (Manga)", "pos": "Kata Benda", "level": "N5", "example": "休日は家で大好きな漫画を読みます。(Saat libur membaca komik manga kesukaan di rumah)"},
    {"kanji": "アニメ", "reading": "アニメ", "romaji": "anime", "meaning": "Animasi Jepang (Anime)", "pos": "Kata Benda", "level": "N5", "example": "日本のアニメを見て日本語を学びました。(Belajar bahasa Jepang dari menonton anime)"},
    {"kanji": "声優", "reading": "せいゆう", "romaji": "seiyuu", "meaning": "Pengisi suara karakter (Voice actor)", "pos": "Kata Benda", "level": "N3", "example": "大好きな声優のイベントに参加しました。(Menghadiri acara jumpa fans pengisi suara favorit)"},
    {"kanji": "在宅勤務", "reading": "ざいたくきんむ", "romaji": "zaitaku kinmu", "meaning": "Bekerja dari rumah (Work from home / WFH)", "pos": "Kata Benda", "level": "N3", "example": "週に３日在宅勤務をしています。(Tiga hari dalam seminggu saya bekerja dari rumah)"},
    {"kanji": "動画", "reading": "どうが", "romaji": "douga", "meaning": "Video rekaman digital", "pos": "Kata Benda", "level": "N4", "example": "YouTubeで料理の作り方動画を見ます。(Menonton video cara memasak di YouTube)"},
    {"kanji": "写真", "reading": "しゃしん", "romaji": "shashin", "meaning": "Foto / Gambar potret", "pos": "Kata Benda", "level": "N5", "example": "桜の前で記念写真を撮りました。(Mengambil foto kenang-kenangan di depan pohon sakura)"},
    {"kanji": "投稿", "reading": "とうこう", "romaji": "toukou", "meaning": "Unggahan postingan media sosial", "pos": "Kata Benda", "level": "N3", "example": "旅の思い出の写真をSNSに投稿しました。(Mengunggah foto kenangan liburan ke medsos)"},
    {"kanji": "記事", "reading": "きじ", "romaji": "kiji", "meaning": "Artikel berita / Tulisan blog", "pos": "Kata Benda", "level": "N4", "example": "面白いニュース記事を読みました。(Membaca artikel berita yang menarik)"},
    {"kanji": "翻訳", "reading": "ほんやく", "romaji": "honyaku", "meaning": "Penerjemahan teks tertulis", "pos": "Kata Benda", "level": "N4", "example": "英語のドキュメントを日本語に翻訳します。(Menerjemahkan dokumen bahasa Inggris ke bahasa Jepang)"},
    {"kanji": "通訳", "reading": "つうやく", "romaji": "tsuuyaku", "meaning": "Penerjemah lisan (Interpreter)", "pos": "Kata Benda", "level": "N3", "example": "国際会議で通訳を務めました。(Bertindak sebagai penerjemah lisan di konferensi internasional)"},
    {"kanji": "お土産", "reading": "おみやげ", "romaji": "omiyage", "meaning": "Oleh-oleh buah tangan khas daerah", "pos": "Kata Benda", "level": "N5", "example": "旅行の帰りに同僚へお土産を買いました。(Membeli oleh-oleh untuk rekan kerja sepulang berlibur)"},
    {"kanji": "贈り物", "reading": "おくりもの", "romaji": "okurimono", "meaning": "Kado hadiah bingkisan", "pos": "Kata Benda", "level": "N4", "example": "友達の結婚祝いに贈り物を送りました。(Mengirim kado hadiah ucapan pernikahan untuk sahabat)"},
    {"kanji": "挨拶", "reading": "あいさつ", "romaji": "aisatsu", "meaning": "Tegur sapa salam", "pos": "Kata Benda", "level": "N4", "example": "毎朝明るく元気な挨拶を心がけます。(Membiasakan menyapa dengan ceria setiap pagi)"},
    {"kanji": "お礼", "reading": "おれい", "romaji": "orei", "meaning": "Ucapan terima kasih / Tanda balas budi", "pos": "Kata Benda", "level": "N4", "example": "手伝ってくれた先輩にお礼の手紙を書きました。(Menulis surat terima kasih untuk senior yang membantu)"},
    {"kanji": "お詫び", "reading": "おわび", "romaji": "owabi", "meaning": "Permohonan maaf resmi", "pos": "Kata Benda", "level": "N3", "example": "納期の遅れについて深くお詫び申し上げます。(Kami memohon maaf yang sebesar-besarnya atas keterlambatan pengiriman)"},
    {"kanji": "遠慮", "reading": "えんりょ", "romaji": "enryo", "meaning": "Segan / Merasa sungkan", "pos": "Kata Benda", "level": "N4", "example": "どうぞ遠慮なさらないで召し上がってください。(Silakan dinikmati, jangan sungkan ya)"},
    {"kanji": "謙遜", "reading": "けんそん", "romaji": "kenson", "meaning": "Sikap rendah hati", "pos": "Kata Benda", "level": "N3", "example": "褒められても謙遜する態度が美しいです。(Sikap rendah hati saat dipuji sangatlah terpuji)"},
    {"kanji": "非常口", "reading": "ひじょうぐち", "romaji": "hijouguchi", "meaning": "Pintu keluar darurat (Emergency exit)", "pos": "Kata Benda", "level": "N4", "example": "ホテルの非常口の場所を確認しておきます。(Memastikan letak pintu darurat di hotel)"},
    {"kanji": "避難所", "reading": "ひなんじょ", "romaji": "hinanjo", "meaning": "Tempat evakuasi pengungsian bencana", "pos": "Kata Benda", "level": "N3", "example": "地震に備えて避難所を確認しましょう。(Mari cek lokasi tempat evakuasi untuk antisipasi gempa)"},
    {"kanji": "消火器", "reading": "しょうかき", "romaji": "shoukaki", "meaning": "Tabung pemadam kebakaran (APAR)", "pos": "Kata Benda", "level": "N3", "example": "廊下に消火器が設置されています。(Tabung pemadam kebakaran terpasang di lorong)"},
    {"kanji": "落とし物", "reading": "おとしもの", "romaji": "otoshimono", "meaning": "Barang yang terjatuh / tertinggal", "pos": "Kata Benda", "level": "N4", "example": "駅の落とし物センターに届け出ました。(Melapor ke pusat barang hilang stasiun)"},
    {"kanji": "忘れ物", "reading": "わすれもの", "romaji": "wasuremono", "meaning": "Barang yang terlupa / ketinggalan", "pos": "Kata Benda", "level": "N5", "example": "車内に忘れ物がないか確かめてください。(Pastikan tidak ada barang yang ketinggalan di dalam kendaraan)"},
    {"kanji": "健康", "reading": "けんこう", "romaji": "kenkou", "meaning": "Kesehatan tubuh prima", "pos": "Kata Benda", "level": "N4", "example": "健康のために毎朝ジョギングをしています。(Jogging setiap pagi demi menjaga kesehatan)"},
    {"kanji": "睡眠", "reading": "すいみん", "romaji": "suimin", "meaning": "Tidur / Waktu istirahat lelap", "pos": "Kata Benda", "level": "N3", "example": "質の良い睡眠を毎日８時間取ります。(Tidur berkualitas selama 8 jam setiap hari)"},
    {"kanji": "栄養", "reading": "えいよう", "romaji": "eiyou", "meaning": "Gizi nutrisi makanan", "pos": "Kata Benda", "level": "N3", "example": "栄養バランスを考えた食事を作ります。(Membuat masakan dengan keseimbangan nutrisi)"},
    {"kanji": "運動", "reading": "うんどう", "romaji": "undou", "meaning": "Olahraga gerak badan", "pos": "Kata Benda", "level": "N5", "example": "適度な運動はストレス解消に最適です。(Olahraga teratur sangat baik untuk meredakan stres)"},
    {"kanji": "水分補給", "reading": "すいぶんほきゅう", "romaji": "suibun hokyuu", "meaning": "Hidrasi tubuh minum air cukup", "pos": "Kata Benda", "level": "N3", "example": "夏場はこまめな水分補給が大切です。(Saat musim panas sangat penting rutin minum air)"},
    {"kanji": "絶景", "reading": "ぜっけい", "romaji": "zekkei", "meaning": "Pemandangan spektakuler memukau", "pos": "Kata Benda", "level": "N3", "example": "山頂からの富士山の絶景に息を呑みました。(Terpana melihat pemandangan memukau Gunung Fuji dari puncak)"},
    {"kanji": "紅葉", "reading": "こうよう", "romaji": "kouyou", "meaning": "Daun gugur berwarna merah keemasan musim gugur", "pos": "Kata Benda", "level": "N4", "example": "秋の京都で美しい紅葉狩りを楽しみました。(Menikmati keindahan daun musim gugur di Kyoto)"},
    {"kanji": "桜吹雪", "reading": "さくらふぶき", "romaji": "sakurafubuki", "meaning": "Guguran kelopak sakura yang tertiup angin bagai salju", "pos": "Kata Benda", "level": "N3", "example": "風が吹いて見事な桜吹雪が舞いました。(Angin berhembus menerbangkan kelopak bunga sakura)"},
    {"kanji": "夕焼け", "reading": "ゆうやけ", "romaji": "yuuyake", "meaning": "Semburat jingga matahari terbenam (Sunset glow)", "pos": "Kata Benda", "level": "N3", "example": "茜色に染まる夕焼け空に見とれました。(Terpesona memandangi langit senja yang memerah)"},
    {"kanji": "朝焼け", "reading": "あさやけ", "romaji": "asayake", "meaning": "Semburat fajar pagi hari (Sunrise glow)", "pos": "Kata Benda", "level": "N3", "example": "朝焼けが街を優しく照らし始めました。(Cahaya fajar mulai menyinari kota perlahan)"},
    {"kanji": "合格", "reading": "ごうかく", "romaji": "goukaku", "meaning": "Lulus ujian resmi (Pass exam)", "pos": "Kata Benda", "level": "N4", "example": "JLPT N2試験に見事合格しました！(Berhasil lulus ujian JLPT N2 dengan gemilang!)"},
    {"kanji": "満点", "reading": "まんてん", "romaji": "manten", "meaning": "Nilai sempurna seratus (Perfect score)", "pos": "Kata Benda", "level": "N3", "example": "漢字テストで満点を取りました！(Mendapat nilai seratus pada ujian kanji!)"},
    {"kanji": "成長", "reading": "せいちょう", "romaji": "seichou", "meaning": "Pertumbuhan diri / Berkembang pesat", "pos": "Kata Benda", "level": "N3", "example": "日々の勉強で大きな成長を感じます。(Merasakan perkembangan besar dari belajar setiap hari)"},
    {"kanji": "努力", "reading": "どりょく", "romaji": "doryoku", "meaning": "Usaha gigih / Kerja keras", "pos": "Kata Benda", "level": "N4", "example": "日頃の努力は必ず報われます。(Usaha gigih setiap hari pasti akan membuahkan hasil)"},
    {"kanji": "挑戦", "reading": "ちょうせん", "romaji": "chousen", "meaning": "Tantangan / Menantang diri sendiri", "pos": "Kata Benda", "level": "N3", "example": "新しい目標に向かって挑戦し続けます。(Terus menantang diri untuk meraih impian baru)"},
    {"kanji": "達成", "reading": "たっせい", "romaji": "tassei", "meaning": "Pencapaian target berhasil (Achieve)", "pos": "Kata Benda", "level": "N3", "example": "年間目標を前倒しで達成しました。(Berhasil mencapai target tahunan lebih awal)"},
    {"kanji": "希望", "reading": "きぼう", "romaji": "kibou", "meaning": "Harapan cerah (Hope)", "pos": "Kata Benda", "level": "N4", "example": "明るい未来への希望を持って進みます。(Melangkah maju dengan harapan akan masa depan yang cerah)"},
    {"kanji": "情熱", "reading": "じょうねつ", "romaji": "jounetsu", "meaning": "Semangat membara (Passion)", "pos": "Kata Benda", "level": "N3", "example": "日本語の学習に情熱を注いでいます。(Mencurahkan semangat membara untuk belajar bahasa Jepang)"},
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
                <div class="dict-example-box" style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                    <div>
                        <small style="color:var(--text-muted);font-size:11px">Contoh Kalimat:</small>
                        <div style="font-family:var(--font-jp);font-size:12.5px;color:var(--text-secondary);margin-top:2px">${item.example}</div>
                    </div>
                    <button class="vocab-audio-btn" style="padding:4px 6px;flex-shrink:0;margin-top:2px" onclick="speakWord(escapeAudioText('${item.example.replace(/'/g, "\\'")}'))" title="Dengarkan Contoh Kalimat">
                        ${icon('volume2', 13)}
                    </button>
                </div>
            ` : ''}
        </div>
    `).join('');
}
