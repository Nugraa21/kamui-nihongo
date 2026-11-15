# 🛠️ Kamui NihonGo — Developer Tools & Data Generators

Direktori ini berisi skrip-skrip utilitas berbasis **Python** yang digunakan oleh pengembang untuk memproses, memverifikasi, dan membuat basis data statis (JSON & JS) yang digunakan oleh aplikasi Kamui NihonGo.

> **Catatan:** Skrip-skrip ini **hanya untuk proses persiapan data (*development tools*)** dan **TIDAK dijalankan saat aplikasi desktop dibuka oleh pengguna**. Aplikasi desktop Kamui NihonGo berjalan 100% secara native menggunakan **Rust 1.82+** dan **Tauri 2.0**.

---

## 📂 Daftar dan Fungsi Skrip

| Nama Skrip | Fungsi & Deskripsi |
| :--- | :--- |
| `generate_hardcore_bank.py` | Mengompilasi dan menghasilkan 95+ butir soal awal untuk mode tantangan **Hardcore Boss Battle (Sudden Death)** mencakup materi JLPT N5, N4, dan N3. |
| `add_more_hardcore.py` | Skrip pembantu untuk menambahkan variasi soal tambahan ke dalam bank data hardcore. |
| `generate_stroke_db.py` | Membangun kurva vektor SVG urutan goresan untuk **101 aksara kaligrafi Jepang** (46 Hiragana, 46 Katakana, dan Kanji N5/N4). |
| `apply_stroke_update.py` | Mengintegrasikan kurva goresan aksara ke dalam mesin visualisasi `stroke.js`. |
| `build_full_grammar.py` | Mengompilasi silabus 25 Bab tata bahasa berstandar buku kurikulum resmi *Minna no Nihongo* beserta latihan soalnya. |
| `check_stroke.py` | Skrip verifikasi kelengkapan karakter pada tabel vektor aksara. |
| `check_stroke_funcs.py` | Pengujian unit untuk fungsi parsing urutan goresan. |
| `read_gallery.py` & `read_stroke_head.py` | Utilitas diagnostik untuk membaca pratinjau data vektor aksara. |

---

*Hak Cipta (c) 2026 Ludang Prasetyo Nugroho (nugra21) — nugra21.web.app*
