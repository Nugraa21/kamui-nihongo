# -*- coding: utf-8 -*-
import json
import os

with open('nihongo-app/src/data/hardcore_questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

additional_questions = [
    ("N5", "Kanji", "Huruf kanji dari kata 「やま」 (gunung) adalah...", "やま", ["山", "川", "田", "木"], 0, "「山」 dibaca やま (yama) artinya Gunung."),
    ("N5", "Kanji", "Huruf kanji dari kata 「かわ」 (sungai) adalah...", "かわ", ["川", "山", "水", "林"], 0, "「川」 dibaca かわ (kawa) artinya Sungai."),
    ("N5", "Kosakata", "Kata 「あした」 memiliki arti...", "明日 (Ashita)", ["Besok", "Kemarin", "Hari ini", "Lusa"], 0, "明日 (ashita) artinya Besok."),
    ("N5", "Partikel", "Menyatakan keberadaan benda mati: へやに テレビ [ ? ] あります。(Di kamar ada TV)", "部屋にテレビ [ ? ] あります", ["が (ga)", "を (o)", "で (de)", "に (ni)"], 0, "Objek keberadaan dengan あります / います menggunakan partikel が (ga)."),
    ("N5", "Partikel", "Menyatakan keberadaan makhluk hidup: にわに いぬ [ ? ] います。(Di halaman ada anjing)", "庭に犬 [ ? ] います", ["が (ga)", "を (o)", "で (de)", "へ (e)"], 0, "Makhluk hidup bernyawa menggunakan います dengan partikel が (ga)."),
    ("N5", "Tata Bahasa", "Bentuk lampau positif dari 「いきます」 adalah...", "行きます ➔ Lampau", ["いきました (ikimashita)", "いきません (ikimasen)", "いかない (ikanai)", "いって (itte)"], 0, "Bentuk lampau positif dari ~ます adalah ~ました (ikimashita = sudah pergi)."),
    ("N4", "Tata Bahasa", "Menyatakan 'mencoba melakukan sesuatu': 「にほんの りょうりを [ ? ] みたいです。」", "日本の料理を [ ? ] みたいです", ["たべて (tabete)", "たべた (tabeta)", "たべる (taberu)", "たべに (tabe ni)"], 0, "~てみる (~te miru) bermakna 'Mencoba melakukan': Tabete mitai (Ingin coba makan)."),
    ("N4", "Tata Bahasa", "Menyatakan 'segera setelah / pas saat': 「でんしゃが [ ? ] とたん、ドアが しまった。」", "電車が [ ? ] とたん、ドアが閉まった", ["とまった (tomatta)", "とまる (tomaru)", "とまって (tomatte)", "とまり (tomari)"], 0, "[Bentuk Ta] + とたん (totan) artinya 'Tepat pada saat/seketika'."),
    ("N4", "Tata Bahasa", "Menyatakan 'terlalu berlebihan': 「きのう おさけを [ ? ] すぎました。」", "昨日お酒を [ ? ] すぎました", ["のみ (nomi)", "のむ (nomu)", "のんで (nonde)", "のんだ (nonda)"], 0, "[Masu-stem] + すぎる artinya 'Terlalu banyak/berlebihan': Nomi-sugimashita."),
    ("N4", "Kanji", "Cara baca kanji 「急行」 (kereta ekspres) adalah...", "急行", ["きゅうこう (kyuukou)", "きゅうぎょう (kyuugyou)", "いそごう (isogou)", "きゅうゆき (kyuuyuki)"], 0, "急行 dibaca きゅうこう (kyuukou)."),
    ("N4", "Kosakata", "Lawan kata dari 「あんぜん」 (aman) adalah...", "安全 (Aman) ➔ Lawan Kata", ["きけん (kiken)", "べんり (benri)", "しんせつ (shinsetsu)", "しずか (shizuka)"], 0, "Lawan kata aman (安全/Anzen) adalah bahaya (危険/Kiken)."),
    ("N3", "Tata Bahasa", "Menyatakan 'tidak ada kaitannya dengan / tanpa memandang': 「ねんれい [ ? ]、だれでも おうぼできます。」", "年齢 [ ? ]、誰でも応募できます", ["にかかわらず (ni kakawarazu)", "にしたがって (ni shitagatte)", "にたいして (ni taishite)", "によって (ni yotte)"], 0, "~に関わらず (~ni kakawarazu) berarti 'Tanpa memandang / Tanpa memedulikan (usia)'."),
    ("N3", "Tata Bahasa", "Menyatakan 'seiring dengan berjalannya waktu/perubahan': 「じかんが たつ [ ? ]、わすれていった。」", "時間が経つ [ ? ]、忘れていった", ["につれて (ni tsurete)", "にとって (ni totte)", "について (ni tsuite)", "によって (ni yotte)"], 0, "~につれて (~ni tsurete) artinya 'Seiring dengan bertambahnya waktu'."),
    ("N3", "Tata Bahasa", "Menyatakan 'seolah-olah / bagaikan': 「かれは まるで ぜんぶ しっている [ ? ] はなす。」", "彼はまるで全部知っている [ ? ] 話す", ["かのようだ (ka no you da)", "わけだ (wake da)", "はずだ (hazu da)", "にすぎない (ni suginai)"], 0, "まるで ~かのようだ artinya 'Seolah-olah / bagaikan tahu segalanya'."),
    ("N3", "Kanji", "Cara baca kanji 「偶然」 (kebetulan) adalah...", "偶然", ["ぐうぜん (guuzen)", "ぐうさん (guusan)", "ぎょうぜん (gyouzen)", "こうぜん (kouzen)"], 0, "偶然 dibaca ぐうぜん (guuzen)."),
    ("N3", "Kosakata", "Arti dari kata 「おもいがけない」 (Omoigakenai) adalah...", "思いがけない", ["Tak terduga / Di luar dugaan", "Sangat sedih", "Mengecewakan", "Sulit dipikirkan"], 0, "思いがけない (omoigakenai) bermakna tak disangka-sangka / di luar dugaan."),
    ("N3", "Tata Bahasa", "Menyatakan 'tidak heran / wajar saja kalau': 「あんなに れんしゅうしたのだから、じょうずになる [ ? ] だ。」", "上手になる [ ? ] だ", ["わけ (wake)", "もの (mono)", "こと (koto)", "ところ (tokoro)"], 0, "~わけだ (~wake da) menyatakan kesimpulan wajar logis: Pantas saja dia jadi jago."),
    ("N3", "Kanji", "Cara baca kanji 「曖昧」 (samar-samar / ambigu) adalah...", "曖昧", ["あいまい (aimai)", "あいみ (aimi)", "あんまい (anmai)", "あいばい (aibai)"], 0, "曖昧 dibaca あいまい (aimai)."),
    ("N3", "Tata Bahasa", "Menyatakan 'hanya sekadar / tidak lebih dari': 「わたしは たんに じじつを つたえた [ ? ]。」", "私は単に事実を伝えた [ ? ]", ["にすぎない (ni suginai)", "にちがいない (ni chigainai)", "ほかにならない (hoka ni naranai)", "わけではない (wake de wa nai)"], 0, "~にすぎない (~ni suginai) artinya 'Hanya sebatas / Tidak lebih dari'."),
    ("N3", "Tata Bahasa", "Menyatakan 'kepastian tak terbantahkan': 「これだけ あしあとが あるのだから、だれか きた [ ? ]。」", "誰か来た [ ? ]", ["にちがいない (ni chigainai)", "はずがない (hazu ga nai)", "わけがない (wake ga nai)", "かもしれない (kamo shirenai)"], 0, "~に違いない (~ni chigainai) bermakna 'Pasti / Tak diragukan lagi'." )
]

cur_id = len(questions) + 1
for lvl, cat, q_text, disp, opts, corr, exp_text in additional_questions:
    questions.append({
        "id": cur_id,
        "level": lvl,
        "category": cat,
        "question": q_text,
        "display": disp,
        "options": opts,
        "correct": corr,
        "exp": exp_text
    })
    cur_id += 1

# Re-write both JSON and JS
with open('nihongo-app/src/data/hardcore_questions.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

js_content = "/**\n"
js_content += " * ========================================================\n"
js_content += " * KAMUI NIHONGO - HARDCORE BOSS MODE QUESTION BANK\n"
js_content += " * Kurikulum Standar Gabungan JLPT N5 • N4 • N3\n"
js_content += " * Aturan: 1 SALAH = GAME OVER (Skor Kembali ke 0!)\n"
js_content += f" * Total Bank Soal: {len(questions)} Soal Terverifikasi\n"
js_content += " * Anda dapat menambahkan soal baru kapan saja di folder & file ini!\n"
js_content += " * ========================================================\n"
js_content += " */\n\n"
js_content += "window.HARDCORE_QUESTIONS_DATA = " + json.dumps(questions, ensure_ascii=False, indent=2) + ";\n"

with open('nihongo-app/src/data/hardcore_questions.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Total Soal Hardcore Sekarang: {len(questions)} butir soal!")
