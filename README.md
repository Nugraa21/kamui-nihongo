# 🌸 Kamui NihonGo (神威日本語) — Professional Japanese Language Mastery Suite

<div align="center">

![Kamui NihonGo Banner](https://img.shields.io/badge/Kamui_NihonGo-神威日本語-0a84ff?style=for-the-badge&logo=rust&logoColor=white)
![JLPT Levels](https://img.shields.io/badge/JLPT_Curriculum-N5_•_N4_•_N3-58a6ff?style=for-the-badge)
![UI Design](https://img.shields.io/badge/Theme-Apple_iOS_Liquid_Glass-bf5af2?style=for-the-badge&logo=apple&logoColor=white)
![Engine](https://img.shields.io/badge/Engine-Rust_1.82_+_Tauri_2.0-d29922?style=for-the-badge&logo=tauri&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary_%C2%A9_nugra21-e53e3e?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Windows_x64-blue?style=for-the-badge&logo=windows&logoColor=white)

<br/>

**Kamui NihonGo** adalah aplikasi desktop native berkecepatan tinggi yang dirancang khusus untuk pembelajaran bahasa Jepang intensif dari pemula hingga mahir berstandar **JLPT (N5 • N4 • N3)** dan kurikulum buku resmi **Minna no Nihongo (Bab 1–25)**.

Dibuat dengan estetika **Apple iOS Liquid Glass (Glassmorphism)**, zero emojis (100% SVG vektor), Web Audio API sound synthesizer, serta mode tantangan **Hardcore Sudden Death Boss Battle**.

[**🌐 Kunjungi Website Resmi Pembuat: nugra21.web.app**](https://nugra21.web.app) • [**🐙 GitHub Profil: @nugra21**](https://github.com/nugra21)

</div>

---

## 👨‍💻 Profil Pemilik & Pengembang (Creator Attribution)

Aplikasi dan seluruh ekosistem perangkat lunak **Kamui NihonGo** dirancang, dikembangkan, dan dimiliki secara independen oleh:

- **Nama Lengkap:** Ludang Prasetyo Nugroho
- **Alias / Akun GitHub:** [@nugra21](https://github.com/nugra21)
- **Website Portofolio Resmi:** [https://nugra21.web.app](https://nugra21.web.app)
- **Hak Cipta:** Proprietary Copyright © 2026 Ludang Prasetyo Nugroho. All rights reserved.

---

## ✨ Fitur-Fitur Utama (Key Features)

### 💎 1. Desain Modern Apple iOS Liquid Glass (Glassmorphism)
- **Frosted Blur Transparan:** Menggunakan efek kaca transparan `backdrop-filter: blur(28px) saturate(200%)` dengan specular highlight borders (`rgba(255, 255, 255, 0.12)`).
- **Navbar & Sidebar Interaktif:** Header floating dengan tombol hamburger responsif, search bar Ctrl+K berbentuk rounded glass pill, stat badges, dan avatar profil.
- **Zero Emojis (100% SVG Vector Icons):** Tampilan bersih dan profesional tanpa karakter emoji, seluruh tombol dan status menggunakan ikon vektor SVG tajam.

### 💀 2. Mode Hardcore: Sudden Death Boss Battle (死線モード)
- **Tantangan Bertahan Hidup:** Soal acak tanpa henti yang menggabungkan seluruh materi **JLPT N5, N4, dan N3** (Kanji kompleks, partikel jebakan, kata kerja, dan pola tata bahasa).
- **Aturan Sudden Death:** **1 kesalahan saja = Langsung GAME OVER & Skor direset kembali ke 0!**
- **Bank Soal Mandiri:** Soal disimpan dalam folder mandiri `src/data/hardcore_questions.js` dan `src/data/hardcore_questions.json`, memudahkan siapa saja untuk menambah soal baru kapan saja.
- **Pencatatan Rekor Permanen:** Skor tertinggi Anda disimpan secara permanen di penyimpanan lokal aplikasi.

### 🎯 3. Simulasi Resmi Ujian JLPT (N5 • N4 • N3) + Mode Lockdown
- **Bank Soal Komprehensif:** Menguji *Moji-Goi* (Aksara & Kosakata), *Bunpou* (Tata Bahasa), dan *Dokkai* (Pemahaman Bacaan Kontekstual).
- **Mode Ujian Anti-Mencontek (Lockdown):** Seluruh sidebar, tombol menu, dan navigasi dikunci secara ketat selama ujian berlangsung hingga sesi selesai dikumpulkan.
- **Skor & Pembahasan Detail:** Kartu hasil ujian menampilkan persentase kelulusan, skor tiap bidang, dan pembahasan lengkap pada tiap soal.

### ✍️ 4. Stroke Lab: Panduan Urutan Goresan Aksara Asli
- **101 Karakter Lengkap:** Seluruh 46 Hiragana standar, 46 Katakana standar, serta Kanji penting N5/N4.
- **Autentisitas Bentuk Tulisan:** Dilengkapi watermark tipografi aksara Jepang asli (`Noto Sans JP`) dan kurva vektor langkah-demi-langkah sehingga arah dan bentuk goresan akurat sesuai standar kaligrafi Jepang.

### 📖 5. Kamus Lengkap Bahasa Jepang - Indonesia (500+ Kosakata)
- **Kategori Sangat Relevan:** Kosakata dunia kerja (meeting, deadline, laporan, revisi, lembur), percakapan santai harian, transportasi/kereta, belanja, kesehatan/darurat, dan teknologi.
- **Audio Pengucapan Ganda:** Dengarkan pelafalan bahasa Jepang asli baik untuk kata maupun contoh kalimat lengkap hanya dengan satu klik tombol audio.

### 🔊 6. Synthesizer Efek Suara UI Interaktif (Web Audio API)
- **Sentuhan Audio Modern:** Bunyi klik lembut dan modern saat menekan tombol, serta melodi harmoni untuk jawaban benar atau kekalahan di mode Hardcore.
- **Pintasan Cepat di Navbar:** Tombol speaker langsung di navbar atas untuk mengaktifkan atau mematikan efek suara dalam 1 klik tanpa harus masuk menu setelan.

### 👤 7. Profil Pengguna & Keamanan Data
- **Autentikasi Lokal:** Sistem pendaftaran, login pengguna, dan ubah kata sandi dengan perlindungan hashing.
- **Layout Profil Ergonomis:** Tata letak profil berukuran konsisten dengan tombol keluar (logout) yang selalu terkunci rapi di posisi bawah.

---

## 🛠️ Arsitektur & Teknologi

| Komponen | Spesifikasi / Teknologi |
| :--- | :--- |
| **Backend Native** | Rust 1.82+ (Performa tinggi, konsumsi RAM < 45 MB) |
| **GUI Framework** | Tauri 2.0 (IPC Commands, sandboxed WebView2 engine) |
| **Frontend** | Vanilla JavaScript (ES2022+), CSS3 Variables & Glassmorphism |
| **Audio Engine** | Web Audio API Oscillator & Gain Synthesizer (Tanpa file WAV/MP3 eksternal) |
| **Database Soal** | JSON Data Banks (`src/data/hardcore_questions.js`, `src/data/hardcore_questions.json`) |
| **Sistem Operasi** | Windows 10 / 11 (x86_64) |

---

## 🚀 Panduan Menjalankan Proyek (Development & Build)

### Prasyarat
1. **Rust:** Pastikan Rust telah terinstal (`rustc --version >= 1.82`).
2. **Node.js:** Versi 18+ untuk utilitas tooling.
3. **C++ Build Tools:** Visual Studio C++ Build Tools (untuk kompilasi Tauri pada Windows).

### Menjalankan Mode Development
```bash
cd nihongo-app
npm install  # jika menggunakan npm
cargo tauri dev
```

### Mengompilasi File Executable Rilis Standalone (.exe)
```bash
cd nihongo-app/src-tauri
cargo build --release
```
File executable biner yang telah dioptimalkan akan berada di:
`nihongo-app/src-tauri/target/release/nihongo-app.exe`

---

## 📜 Lisensi & Atribusi Hak Cipta (License & Third-Party Credits)

### Hak Cipta Perangkat Lunak (Proprietary Software Copyright)
Hak Cipta (c) 2026 **Ludang Prasetyo Nugroho (nugra21)**. Seluruh hak cipta dilindungi undang-undang (*All rights reserved*).
Seluruh arsitektur kode sumber (Rust, JavaScript, CSS, HTML), desain antarmuka pengguna, logika simulasi ujian, algoritma synthesizer audio, bank data hardcore, dan identitas merek aplikasi adalah karya dan kepemilikan eksklusif dari **Ludang Prasetyo Nugroho**. Detail lengkap dapat dibaca pada berkas [LICENSE](./LICENSE).

### Pengecualian & Kredit Pihak Ketiga (Third-Party Disclaimer)
1. **Minna no Nihongo (みんなの日本語):**
   *Minna no Nihongo* adalah merek dagang dan hak cipta terdaftar milik **3A Corporation (3A Network, Tokyo, Japan)**. Penyebutan, urutan bab, dan struktur kosakata dalam aplikasi ini semata-mata digunakan sebagai referensi kurikulum pendidikan dan bukan merupakan produk resmi dari 3A Corporation.
2. **JLPT (Japanese Language Proficiency Test / 日本語能力試験):**
   Standar tingkatan (N5, N4, N3) dan spesifikasi ujian adalah hak cipta dan merek milik **Japan Educational Exchanges and Services (JEES)** dan **The Japan Foundation**.
