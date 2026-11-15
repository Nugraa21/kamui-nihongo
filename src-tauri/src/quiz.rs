use rand::seq::SliceRandom;

use crate::japanese::{hiragana, katakana, kanji, vocab};
use crate::models::QuizQuestion;

pub fn generate_quiz(quiz_type: &str, level: &str, count: u32) -> Vec<QuizQuestion> {
    match quiz_type {
        "hiragana" => generate_kana_quiz("hiragana", count),
        "katakana" => generate_kana_quiz("katakana", count),
        "kanji" => generate_kanji_quiz(level, count),
        "vocabulary" | "vocab" => generate_vocab_quiz(level, count),
        "grammar" => generate_grammar_quiz(count),
        "mixed" => generate_mixed_quiz(level, count),
        _ => generate_kana_quiz("hiragana", count),
    }
}

fn generate_grammar_quiz(count: u32) -> Vec<QuizQuestion> {
    let pool = vec![
        QuizQuestion {
            id: 0,
            question: "Lengkapi kalimat: わたし [ ? ] 学生です。(Saya adalah siswa)".into(),
            display_char: "わたし [ ? ] 学生".into(),
            question_type: "multiple_choice".into(),
            options: vec!["は (wa)".into(), "を (o)".into(), "で (de)".into(), "へ (e)".into()],
            correct_answer: "は (wa)".into(),
            category: "grammar".into(),
            jlpt_level: Some("N5".into()),
        },
        QuizQuestion {
            id: 1,
            question: "Tempat aksi aktif: 図書館 [ ? ] 本を読みます。(Membaca di perpustakaan)".into(),
            display_char: "図書館 [ ? ] 読む".into(),
            question_type: "multiple_choice".into(),
            options: vec!["で (de)".into(), "に (ni)".into(), "を (o)".into(), "へ (e)".into()],
            correct_answer: "で (de)".into(),
            category: "grammar".into(),
            jlpt_level: Some("N5".into()),
        },
        QuizQuestion {
            id: 2,
            question: "Objek penderita tindakan: パン [ ? ] 食べます。(Makan roti)".into(),
            display_char: "パン [ ? ] 食べる".into(),
            question_type: "multiple_choice".into(),
            options: vec!["を (o)".into(), "が (ga)".into(), "に (ni)".into(), "で (de)".into()],
            correct_answer: "を (o)".into(),
            category: "grammar".into(),
            jlpt_level: Some("N5".into()),
        },
        QuizQuestion {
            id: 3,
            question: "Arah tujuan pergi: 京都 [ ? ] 行きます。(Pergi ke Kyoto)".into(),
            display_char: "京都 [ ? ] 行く".into(),
            question_type: "multiple_choice".into(),
            options: vec!["へ (e)".into(), "で (de)".into(), "を (o)".into(), "から (kara)".into()],
            correct_answer: "へ (e)".into(),
            category: "grammar".into(),
            jlpt_level: Some("N5".into()),
        },
        QuizQuestion {
            id: 4,
            question: "Pola meminta izin sopan Minna no Nihongo: 'Bolehkah memotret?'".into(),
            display_char: "〜てもいいですか".into(),
            question_type: "multiple_choice".into(),
            options: vec!["写真を撮ってもいいですか".into(), "写真を撮ってはいけません".into(), "写真を撮ってください".into(), "写真を撮ります".into()],
            correct_answer: "写真を撮ってもいいですか".into(),
            category: "grammar".into(),
            jlpt_level: Some("N5".into()),
        },
        QuizQuestion {
            id: 5,
            question: "Pola larangan tegas: 'Dilarang merokok di sini'".into(),
            display_char: "〜てはいけません".into(),
            question_type: "multiple_choice".into(),
            options: vec!["ここでタバコを吸ってはいけません".into(), "ここでタバコを吸ってもいいです".into(), "ここでタバコを吸ってください".into(), "タバコを吸いませんでした".into()],
            correct_answer: "ここでタバコを吸ってはいけません".into(),
            category: "grammar".into(),
            jlpt_level: Some("N5".into()),
        },
        QuizQuestion {
            id: 6,
            question: "Rekan bersama: 友達 [ ? ] 映画を見ました。(Nonton bersama teman)".into(),
            display_char: "友達 [ ? ] 一緒に".into(),
            question_type: "multiple_choice".into(),
            options: vec!["と (to)".into(), "で (de)".into(), "を (o)".into(), "に (ni)".into()],
            correct_answer: "と (to)".into(),
            category: "grammar".into(),
            jlpt_level: Some("N5".into()),
        },
        QuizQuestion {
            id: 7,
            question: "Titik waktu spesifik: 毎朝 ６時 [ ? ] 起きます。(Bangun jam 6)".into(),
            display_char: "６時 [ ? ] 起きる".into(),
            question_type: "multiple_choice".into(),
            options: vec!["に (ni)".into(), "で (de)".into(), "を (o)".into(), "へ (e)".into()],
            correct_answer: "に (ni)".into(),
            category: "grammar".into(),
            jlpt_level: Some("N5".into()),
        },
        QuizQuestion {
            id: 8,
            question: "Bentuk permohonan santun (Bentuk Te): 'Tolong tunggu sebentar'".into(),
            display_char: "〜てください".into(),
            question_type: "multiple_choice".into(),
            options: vec!["ちょっと待ってください".into(), "ちょっと待ってはいけません".into(), "ちょっと待ちました".into(), "ちょっと待ちません".into()],
            correct_answer: "ちょっと待ってください".into(),
            category: "grammar".into(),
            jlpt_level: Some("N5".into()),
        },
    ];

    let mut rng = rand::thread_rng();
    let mut selected = pool;
    selected.shuffle(&mut rng);
    selected.truncate(count as usize);
    for (i, q) in selected.iter_mut().enumerate() {
        q.id = i;
    }
    selected
}

fn generate_kana_quiz(kana_type: &str, count: u32) -> Vec<QuizQuestion> {
    let chars = if kana_type == "hiragana" {
        hiragana::get_all_hiragana()
    } else {
        katakana::get_all_katakana()
    };

    let mut rng = rand::thread_rng();
    let mut selected: Vec<_> = chars.clone();
    selected.shuffle(&mut rng);
    selected.truncate(count as usize);

    selected
        .iter()
        .enumerate()
        .map(|(i, ch)| {
            let mut options: Vec<String> = chars
                .iter()
                .filter(|c| c.romaji != ch.romaji)
                .map(|c| c.romaji.clone())
                .collect();
            options.shuffle(&mut rng);
            options.truncate(3);
            options.push(ch.romaji.clone());
            options.shuffle(&mut rng);

            QuizQuestion {
                id: i,
                question: "Bagaimana cara membaca huruf ini dalam romaji?".into(),
                display_char: ch.character.clone(),
                question_type: "multiple_choice".into(),
                options,
                correct_answer: ch.romaji.clone(),
                category: kana_type.into(),
                jlpt_level: None,
            }
        })
        .collect()
}

fn generate_kanji_quiz(level: &str, count: u32) -> Vec<QuizQuestion> {
    let kanji_list = kanji::get_kanji_by_level(level);
    let all_kanji = kanji::get_kanji_by_level("all");
    let mut rng = rand::thread_rng();
    let mut selected = kanji_list.clone();
    selected.shuffle(&mut rng);
    selected.truncate(count as usize);

    selected
        .iter()
        .enumerate()
        .map(|(i, k)| {
            let correct = k.meaning.first().cloned().unwrap_or_default();
            let mut options: Vec<String> = all_kanji
                .iter()
                .filter(|other| other.character != k.character)
                .flat_map(|other| other.meaning.first().cloned())
                .collect();
            options.shuffle(&mut rng);
            options.truncate(3);
            options.push(correct.clone());
            options.shuffle(&mut rng);

            QuizQuestion {
                id: i,
                question: format!("Apa arti dari Kanji {} ({}) ini?", k.character, k.jlpt_level),
                display_char: k.character.clone(),
                question_type: "multiple_choice".into(),
                options,
                correct_answer: correct,
                category: "kanji".into(),
                jlpt_level: Some(k.jlpt_level.clone()),
            }
        })
        .collect()
}

fn generate_vocab_quiz(level: &str, count: u32) -> Vec<QuizQuestion> {
    let vocab_list = vocab::get_vocabulary(level, "all");
    let all_vocab = vocab::get_vocabulary("all", "all");
    let mut rng = rand::thread_rng();
    let mut selected = vocab_list.clone();
    selected.shuffle(&mut rng);
    selected.truncate(count as usize);

    selected
        .iter()
        .enumerate()
        .map(|(i, v)| {
            let mut options: Vec<String> = all_vocab
                .iter()
                .filter(|other| other.word != v.word)
                .map(|other| other.meaning.clone())
                .collect();
            options.shuffle(&mut rng);
            options.truncate(3);
            options.push(v.meaning.clone());
            options.shuffle(&mut rng);

            QuizQuestion {
                id: i,
                question: format!("Apa arti dari kosakata {} [{}]?", v.word, v.reading),
                display_char: v.word.clone(),
                question_type: "multiple_choice".into(),
                options,
                correct_answer: v.meaning.clone(),
                category: "vocabulary".into(),
                jlpt_level: Some(v.jlpt_level.clone()),
            }
        })
        .collect()
}

fn generate_mixed_quiz(level: &str, count: u32) -> Vec<QuizQuestion> {
    let mut rng = rand::thread_rng();
    let per_type = (count / 3).max(1);
    let mut questions = Vec::new();

    questions.extend(generate_kana_quiz("hiragana", per_type));
    questions.extend(generate_kana_quiz("katakana", per_type));
    questions.extend(generate_kanji_quiz(level, per_type));

    questions.shuffle(&mut rng);
    for (i, q) in questions.iter_mut().enumerate() {
        q.id = i;
    }
    questions.truncate(count as usize);
    questions
}
