use serde::{Deserialize, Serialize};

/// A single Japanese character (hiragana or katakana) with stroke order info
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JapaneseChar {
    pub character: String,
    pub romaji: String,
    pub char_type: String,
    pub group: String,
    pub stroke_count: u32,
    pub stroke_steps: Vec<String>,
}

/// A kanji character with readings, meanings, and stroke order steps
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Kanji {
    pub character: String,
    pub onyomi: Vec<String>,
    pub kunyomi: Vec<String>,
    pub meaning: Vec<String>,
    pub jlpt_level: String,
    pub stroke_count: u32,
    pub stroke_steps: Vec<String>,
    pub radical: String,
    pub examples: Vec<KanjiExample>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct KanjiExample {
    pub word: String,
    pub reading: String,
    pub meaning: String,
}

/// Stroke order rule for writing Japanese characters
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StrokeRule {
    pub number: u32,
    pub title: String,
    pub japanese: String,
    pub description: String,
    pub example_chars: Vec<String>,
}

/// A vocabulary word
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Vocabulary {
    pub word: String,
    pub reading: String,
    pub meaning: String,
    pub category: String,
    pub jlpt_level: String,
    pub example_sentence: Option<String>,
    pub example_translation: Option<String>,
}

/// Minna no Nihongo Lesson Structure
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MinnaLesson {
    pub chapter: u32,
    pub title: String,
    pub subtitle: String,
    pub summary: String,
    pub patterns: Vec<GrammarPattern>,
    pub kaiwa: Vec<KaiwaDialog>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GrammarPattern {
    pub pattern: String,
    pub meaning: String,
    pub explanation: String,
    pub examples: Vec<GrammarExample>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GrammarExample {
    pub japanese: String,
    pub romaji: String,
    pub indonesian: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct KaiwaDialog {
    pub speaker: String,
    pub japanese: String,
    pub romaji: String,
    pub indonesian: String,
}

/// Japanese Particle Guide
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ParticleGuide {
    pub particle: String,
    pub romaji: String,
    pub title: String,
    pub explanation: String,
    pub rules: Vec<String>,
    pub examples: Vec<GrammarExample>,
}

/// A quiz question
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct QuizQuestion {
    pub id: usize,
    pub question: String,
    pub display_char: String,
    pub question_type: String,
    pub options: Vec<String>,
    pub correct_answer: String,
    pub category: String,
    pub jlpt_level: Option<String>,
}

/// Quiz result from checking an answer
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct QuizResult {
    pub correct: bool,
    pub correct_answer: String,
}

/// User progress data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserProgress {
    pub total_studied: u32,
    pub total_correct: u32,
    pub hiragana_mastered: u32,
    pub katakana_mastered: u32,
    pub kanji_n5_mastered: u32,
    pub kanji_n4_mastered: u32,
    pub kanji_n3_mastered: u32,
    pub vocab_mastered: u32,
    pub current_streak: u32,
    pub best_streak: u32,
    pub last_study_date: Option<String>,
    pub daily_activity: Vec<DailyActivity>,
    pub achievements: Vec<Achievement>,
    pub char_stats: std::collections::HashMap<String, (u32, u32)>,
}

impl Default for UserProgress {
    fn default() -> Self {
        Self {
            total_studied: 0,
            total_correct: 0,
            hiragana_mastered: 0,
            katakana_mastered: 0,
            kanji_n5_mastered: 0,
            kanji_n4_mastered: 0,
            kanji_n3_mastered: 0,
            vocab_mastered: 0,
            current_streak: 0,
            best_streak: 0,
            last_study_date: None,
            daily_activity: Vec::new(),
            achievements: vec![
                Achievement {
                    id: "first_step".into(),
                    name: "First Step".into(),
                    description: "Complete your first quiz".into(),
                    icon: "target".into(),
                    unlocked: false,
                    unlocked_date: None,
                },
                Achievement {
                    id: "hiragana_master".into(),
                    name: "Hiragana Master".into(),
                    description: "Master all 46 basic hiragana".into(),
                    icon: "award".into(),
                    unlocked: false,
                    unlocked_date: None,
                },
                Achievement {
                    id: "katakana_master".into(),
                    name: "Katakana Master".into(),
                    description: "Master all 46 basic katakana".into(),
                    icon: "award".into(),
                    unlocked: false,
                    unlocked_date: None,
                },
                Achievement {
                    id: "streak_7".into(),
                    name: "Week Warrior".into(),
                    description: "Study 7 days in a row".into(),
                    icon: "flame".into(),
                    unlocked: false,
                    unlocked_date: None,
                },
                Achievement {
                    id: "kanji_n5".into(),
                    name: "N5 Apprentice".into(),
                    description: "Master 15 N5 Kanji".into(),
                    icon: "layers".into(),
                    unlocked: false,
                    unlocked_date: None,
                },
                Achievement {
                    id: "kanji_n4".into(),
                    name: "N4 Scholar".into(),
                    description: "Master 15 N4 Kanji".into(),
                    icon: "layers".into(),
                    unlocked: false,
                    unlocked_date: None,
                },
                Achievement {
                    id: "kanji_n3".into(),
                    name: "N3 Master".into(),
                    description: "Conquer intermediate N3 Kanji".into(),
                    icon: "star".into(),
                    unlocked: false,
                    unlocked_date: None,
                },
                Achievement {
                    id: "stroke_master".into(),
                    name: "Calligraphy Master".into(),
                    description: "Practice stroke order writing on canvas".into(),
                    icon: "bookOpen".into(),
                    unlocked: false,
                    unlocked_date: None,
                },
            ],
            char_stats: std::collections::HashMap::new(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DailyActivity {
    pub date: String,
    pub count: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Achievement {
    pub id: String,
    pub name: String,
    pub description: String,
    pub icon: String,
    pub unlocked: bool,
    pub unlocked_date: Option<String>,
}
