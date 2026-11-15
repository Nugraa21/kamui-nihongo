# 🌸 Kamui NihonGo (神威日本語) — Professional Japanese Language Mastery Suite

<div align="center">

![Kamui NihonGo Banner](https://img.shields.io/badge/Kamui_NihonGo-神威日本語-238636?style=for-the-badge&logo=rust&logoColor=white)
![JLPT Levels](https://img.shields.io/badge/JLPT_Curriculum-N5_•_N4_•_N3-58a6ff?style=for-the-badge)
![Engine](https://img.shields.io/badge/Engine-Rust_1.82_+_Tauri_2.0-d29922?style=for-the-badge&logo=tauri&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary_%C2%A9_nugra21-e53e3e?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Windows_x64-blue?style=for-the-badge&logo=windows&logoColor=white)

<br/>

**Kamui NihonGo** adalah perangkat lunak desktop native modern berkecepatan tinggi yang dirancang khusus untuk pembelajaran bahasa Jepang intensif dari tingkat pemula hingga menengah berstandar **JLPT (N5 • N4 • N3)** dan kurikulum resmi buku **Minna no Nihongo (Bab 1–25)**.

Dibuat dengan arsitektur UI bertema **GitHub & GitLab Developer Interface**, zero emojis (100% SVG vektor), synthesizer efek suara audio interaktif, serta mode simulasi ujian **Anti-Mencontek (Exam Lockdown)**.

[**🌐 Kunjungi Website Resmi Pembuat: nugra21.web.app**](https://nugra21.web.app)

</div>

---

## ✨ Fitur-Fitur Utama (Key Features)

### 🎯 1. Simulasi Resmi Ujian JLPT (N5 • N4 • N3) + Mode Lockdown
- **135+ Bank Soal Dinamis:** Mencakup *Moji-Goi* (Aksara & Kosakata), *Bunpou* (Tata Bahasa), dan *Dokkai* (Pemahaman Bacaan Kontekstual).
- **Fisher-Yates Shuffle Engine:** Setiap sesi ujian secara acak mengocok kombinasi 20 soal dan posisi pilihan ganda (A, B, C, D) sehingga latihan tidak pernah monoton.
- **Exam Lockdown (Anti-Mencontek):** Seluruh navigasi tab, pintasan keyboard (`/`, `Ctrl+K`, tombol angka `1-9`), dan header otomatis dikunci, diblur, dan dinonaktifkan (`pointer-events: none`) selama ujian berlangsung.
- **Timer 25 Menit & Palet Soal:** Dilengkapi penunjuk waktu mundur real-time, palet status 20 butir soal, kartu skor akhir (syarat kelulusan ≥ 60%), serta pembahasan lengkap setiap jawaban.

### 📖 2. Kurikulum Lengkap Minna no Nihongo (Bab 1–25)
- Penjelasan tata bahasa mendalam untuk seluruh 25 bab Minna no Nihongo I.
- Struktur rumus pola kalimat, penjelasan fungsi partikel, tabel konjugasi kata kerja (*bentuk Te, Nai, Ta, Kamus, Potensial*), serta dialog percakapan kontekstual (*Kaiwa*).
- Dilengkapi pelafalan audio sintetis untuk setiap contoh kalimat nyata.

### 📚 3. Kamus Ganda Komprehensif (450+ Entri Kata)
- **Kamus Kosakata (語彙):** Didukung backend native Rust dengan 238 kosakata esensial di 14 kategori tematik harian (*salam, aktivitas harian, angka, waktu, keluarga, makanan, belanja, kerja/kantor, perjalanan, kesehatan, emosi, sosial masyarakat*).
- **Kamus Bahasa Jepang (辞書):** 250+ kosakata pencarian cepat (Kanji, Kana, Romaji, Bahasa Indonesia) dengan filter kelas kata (*Kata Kerja, Kata Sifat, Kata Benda, Kata Keterangan, Ungkapan Harian*).
- **Audio Kata & Contoh Kalimat:** Setiap entri dan kalimat contoh memiliki tombol audio *Speech Synthesis* berbahasa Jepang asli.

### 🖌️ 4. Stroke Lab: Panduan Urutan Goresan Aksara (書き順)
- Diagram langkah demi langkah (*Step-by-Step Gallery*) untuk Hiragana, Katakana, dan Kanji N5-N3.
- Dilengkapi pin nomor lingkaran merah (`1`, `2`, `3`) pada titik awal goresan dan panah arah (*directional arrows*).
- **Kanvas Kaligrafi Interaktif:** Papan latihan menulis dengan kisi-kisi kuadran (*Tian Zi Ge / 田字格*) dan kuas kaligrafi responsif.

### 🎮 5. Kotoba Arena (言葉並べ) & Mini-Game
- Game susun kepingan kata acak menjadi kalimat Jepang yang sempurna.
- Sistem 5 nyawa hati, skor kombo beruntun, dan umpan balik suara.
- Game Memory Match huruf Hiragana & Katakana untuk melatih daya ingat cepat.

### 🔊 6. Synthesizer Efek Suara UI Interaktif (Web Audio API)
- Suara klik tombol halus (*subtle woodblock/pop*), suara berhasil (*two-tone chime*), dan suara peringatan tanpa memerlukan file audio eksternal.
- Dilengkapi tombol switch **ON / OFF** di menu Pengaturan & Modal Profil.

### 👤 7. Sistem Autentikasi & Profil Pengguna Mandiri
- Layar pendaftaran (*Register*) pada instalasi awal dan menu *Login* otomatis.
- Modal Profil pengguna terpadu untuk memantau XP, streak harian, huruf/kanji terkuasai, formulir ganti nama/email, serta pembaruan kata sandi.
- **Zona Berbahaya (Factory Reset):** Fitur reset setelan pabrik yang diproteksi verifikasi kata sandi akun untuk mencegah penghapusan data tanpa sengaja.

---

## 🛠️ Arsitektur Teknologi (Tech Stack)

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Backend Core** | Rust 1.82+ | Sistem performa tinggi, thread safety, dan memori efisien |
| **Desktop Framework** | Tauri 2.0 | Pengemas aplikasi native ringan (< 10 MB RAM footprint) |
| **Frontend** | Vanilla JavaScript (ES6+), HTML5, CSS3 | Tanpa bloatware framework, loading instan 0 milidetik |
| **Audio Engine** | Web Audio API + SpeechSynthesis | Audio synthesis murni di dalam browser/webview |
| **Icons** | Pure SVG Vectors | Zero emojis, desain rapi berstandar GitHub Octicons |
| **Platform Target** | Windows 10 / 11 (x64) | Single binary portable executable |

---

## 🚀 Panduan Kompilasi & Instalasi (Build from Source)

### Prasyarat (Prerequisites)
1. Pasang [Rust & Cargo](https://rustup.rs/) (versi 1.70 ke atas).
2. Pasang [Node.js](https://nodejs.org/) (versi LTS).
3. Visual Studio C++ Build Tools (untuk Windows).

### Langkah-Langkah:
```bash
# 1. Clone repository
git clone https://github.com/nugra21/kamui-nihongo.git
cd kamui-nihongo

# 2. Masuk ke direktori backend Tauri
cd src-tauri

# 3. Kompilasi biner release teroptimasi
cargo build --release
```

Biner berekstensi `.exe` yang sudah siap dijalankan akan berada di:
```
src-tauri/target/release/nihongo-app.exe
```

---

## 👨‍💻 Profil Pengembang (Author & Creator)

Aplikasi ini dirancang, didesain, dan dikembangkan secara independen oleh:

| | |
|---|---|
| **Nama Lengkap** | Ludang Prasetyo Nugroho |
| **Username / Alias** | `nugra21` |
| **Website Portofolio** | [nugra21.web.app](https://nugra21.web.app) |
| **GitHub** | [github.com/nugra21](https://github.com/nugra21) |
| **Role** | Software Developer, UI/UX Designer, Content Curator |

---

## 🏆 Kredit & Pengakuan Pihak Ketiga (Third-Party Credits)

Aplikasi **Kamui NihonGo** mengintegrasikan referensi dari sumber-sumber berikut. Hak cipta atas konten pihak ketiga **sepenuhnya milik pemilik aslinya** dan **tidak diklaim** oleh pengembang aplikasi ini.

### 📖 Minna no Nihongo (みんなの日本語)

| | |
|---|---|
| **Pemilik / Penerbit** | 3A Corporation (スリーエーネットワーク) |
| **Hak Cipta** | © 3A Corporation. All rights reserved. |
| **Website** | [www.3anet.co.jp](https://www.3anet.co.jp/) |
| **Keterangan** | Kurikulum, struktur bab, pola kalimat, dan kosakata yang merujuk pada buku "Minna no Nihongo Shokyuu I & II" digunakan **semata-mata sebagai referensi edukasi non-komersial**. Tidak direproduksi secara verbatim. |

### 🏛️ JLPT — 日本語能力試験

| | |
|---|---|
| **Pemilik** | Japan Foundation & Japan Educational Exchanges and Services (JEES) |
| **Hak Cipta** | © Japan Foundation & JEES. All rights reserved. |
| **Website** | [www.jlpt.jp](https://www.jlpt.jp/) |
| **Keterangan** | Format ujian (N5, N4, N3) dan struktur bagian (Moji-Goi, Bunpou, Dokkai) merujuk pada standar resmi JLPT. Soal dalam aplikasi adalah **karya orisinal penulis** yang terinspirasi format tersebut, bukan soal ujian asli. |

### ⚙️ Framework & Teknologi Open Source

| Komponen | Hak Cipta | Lisensi |
|---|---|---|
| **Rust Language** | © The Rust Project Developers | MIT / Apache 2.0 |
| **Tauri Framework** | © Tauri Contributors | MIT |
| **Web Speech API** | © W3C / Chromium / WebView2 | Platform Standard |

---

## 📜 Lisensi (License)

**Perangkat lunak Kamui NihonGo** (kode, arsitektur, UI/UX, sistem, dan aset orisinal) dilindungi oleh **Kamui NihonGo Proprietary License v1.1** — hak cipta eksklusif milik **Ludang Prasetyo Nugroho (nugra21)**.

> **⚠️ Seluruh hak cipta dilindungi. All rights reserved.**
>
> Perangkat lunak ini **bukan open source** dan **bukan public domain**.
> Tanpa izin tertulis eksplisit dari pemilik, Anda **dilarang** menyalin, mendistribusikan, memodifikasi, menjual, atau menggunakan kode ini untuk keperluan komersial.
>
> **Pengecualian Konten Pihak Ketiga:**
> Konten referensi dari *Minna no Nihongo* adalah milik © 3A Corporation, dan standar JLPT adalah milik © Japan Foundation & JEES. Hak cipta atas konten tersebut tetap sepenuhnya menjadi milik pemilik aslinya masing-masing.
>
> Untuk permintaan lisensi atau izin penggunaan, hubungi: **[nugra21.web.app](https://nugra21.web.app)**

Lihat file [LICENSE](./LICENSE) untuk ketentuan lengkap.

---

<div align="center">
  <sub>Dibuat dengan sepenuh hati oleh <strong>Ludang Prasetyo Nugroho (nugra21)</strong> untuk seluruh pembelajar bahasa Jepang di Indonesia &amp; Dunia.</sub>
  <br/>
  <sub>Konten Minna no Nihongo © 3A Corporation &nbsp;|&nbsp; Standar JLPT © Japan Foundation &amp; JEES &nbsp;|&nbsp; Hak Cipta Aplikasi © 2026 Ludang Prasetyo Nugroho</sub>
</div>
