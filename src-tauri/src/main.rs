mod japanese;
mod models;
mod quiz;

use models::*;
use std::sync::Mutex;
use tauri::State;

/// Application state managed by Tauri
struct AppState {
    progress: Mutex<UserProgress>,
}

// ==================== TAURI COMMANDS ====================

#[tauri::command]
fn app_minimize(window: tauri::Window) {
    let _ = window.minimize();
}

#[tauri::command]
fn app_toggle_maximize(window: tauri::Window) {
    if window.is_maximized().unwrap_or(false) {
        let _ = window.unmaximize();
    } else {
        let _ = window.maximize();
    }
}

#[tauri::command]
fn app_close(window: tauri::Window) {
    let _ = window.close();
}

#[tauri::command]
fn app_start_dragging(window: tauri::Window) {
    let _ = window.start_dragging();
}

#[tauri::command]
fn get_hiragana() -> Vec<JapaneseChar> {
    japanese::hiragana::get_all_hiragana()
}

#[tauri::command]
fn get_katakana() -> Vec<JapaneseChar> {
    japanese::katakana::get_all_katakana()
}

#[tauri::command]
fn get_kanji(level: String) -> Vec<Kanji> {
    japanese::kanji::get_kanji_by_level(&level)
}

#[tauri::command]
fn get_stroke_rules() -> Vec<StrokeRule> {
    japanese::stroke_rules::get_stroke_rules()
}

#[tauri::command]
fn get_grammar_lessons() -> Vec<MinnaLesson> {
    japanese::grammar::get_all_lessons()
}

#[tauri::command]
fn get_particles() -> Vec<ParticleGuide> {
    japanese::grammar::get_all_particles()
}

#[tauri::command]
fn get_vocabulary(level: String, category: String) -> Vec<Vocabulary> {
    japanese::vocab::get_vocabulary(&level, &category)
}

#[tauri::command]
fn get_vocab_categories() -> Vec<String> {
    japanese::vocab::get_categories()
}

#[tauri::command]
fn generate_quiz(quiz_type: String, level: String, count: u32) -> Vec<QuizQuestion> {
    quiz::generate_quiz(&quiz_type, &level, count)
}

#[tauri::command]
fn check_answer(correct_answer: String, user_answer: String) -> QuizResult {
    let clean_a = correct_answer.trim().to_lowercase();
    let clean_b = user_answer.trim().to_lowercase();
    let correct = clean_a == clean_b;
    QuizResult {
        correct,
        correct_answer,
    }
}

#[tauri::command]
fn get_progress(state: State<AppState>) -> UserProgress {
    state.progress.lock().unwrap().clone()
}

#[tauri::command]
fn record_study(state: State<AppState>, _category: String, character: String, correct: bool) {
    let mut progress = state.progress.lock().unwrap();

    progress.total_studied += 1;
    if correct {
        progress.total_correct += 1;
    }

    // Update character-level stats
    let entry = progress.char_stats.entry(character.clone()).or_insert((0, 0));
    if correct {
        entry.0 += 1;
    }
    entry.1 += 1;

    // Check mastered counts
    let hira_mastered = japanese::hiragana::get_all_hiragana().iter().filter(|c| {
        progress.char_stats.get(&c.character).map_or(false, |(c, _)| *c >= 3)
    }).count() as u32;

    let kata_mastered = japanese::katakana::get_all_katakana().iter().filter(|c| {
        progress.char_stats.get(&c.character).map_or(false, |(c, _)| *c >= 3)
    }).count() as u32;

    let kanji_n5_mastered = japanese::kanji::get_kanji_by_level("N5").iter().filter(|k| {
        progress.char_stats.get(&k.character).map_or(false, |(c, _)| *c >= 3)
    }).count() as u32;

    let kanji_n4_mastered = japanese::kanji::get_kanji_by_level("N4").iter().filter(|k| {
        progress.char_stats.get(&k.character).map_or(false, |(c, _)| *c >= 3)
    }).count() as u32;

    let kanji_n3_mastered = japanese::kanji::get_kanji_by_level("N3").iter().filter(|k| {
        progress.char_stats.get(&k.character).map_or(false, |(c, _)| *c >= 3)
    }).count() as u32;

    progress.hiragana_mastered = hira_mastered;
    progress.katakana_mastered = kata_mastered;
    progress.kanji_n5_mastered = kanji_n5_mastered;
    progress.kanji_n4_mastered = kanji_n4_mastered;
    progress.kanji_n3_mastered = kanji_n3_mastered;

    // Daily activity
    let today = chrono::Local::now().format("%Y-%m-%d").to_string();
    if let Some(activity) = progress.daily_activity.iter_mut().find(|a| a.date == today) {
        activity.count += 1;
    } else {
        progress.daily_activity.push(DailyActivity {
            date: today.clone(),
            count: 1,
        });
    }

    // Streak
    let today_date = chrono::Local::now().date_naive();
    if let Some(ref last_date_str) = progress.last_study_date {
        if let Ok(last_date) = chrono::NaiveDate::parse_from_str(last_date_str, "%Y-%m-%d") {
            let diff = (today_date - last_date).num_days();
            if diff == 1 {
                progress.current_streak += 1;
            } else if diff > 1 {
                progress.current_streak = 1;
            }
        }
    } else {
        progress.current_streak = 1;
    }
    if progress.current_streak > progress.best_streak {
        progress.best_streak = progress.current_streak;
    }
    progress.last_study_date = Some(today);

    // Achievements
    if progress.total_studied >= 1 {
        unlock_achievement(&mut progress, "first_step");
    }
    if progress.hiragana_mastered >= 46 {
        unlock_achievement(&mut progress, "hiragana_master");
    }
    if progress.katakana_mastered >= 46 {
        unlock_achievement(&mut progress, "katakana_master");
    }
    if progress.kanji_n5_mastered >= 10 {
        unlock_achievement(&mut progress, "kanji_n5");
    }
    if progress.kanji_n4_mastered >= 5 {
        unlock_achievement(&mut progress, "kanji_n4");
    }
    if progress.kanji_n3_mastered >= 5 {
        unlock_achievement(&mut progress, "kanji_n3");
    }
    if progress.current_streak >= 7 {
        unlock_achievement(&mut progress, "streak_7");
    }
}

fn unlock_achievement(progress: &mut UserProgress, id: &str) {
    if let Some(achievement) = progress.achievements.iter_mut().find(|a| a.id == id && !a.unlocked) {
        achievement.unlocked = true;
        achievement.unlocked_date = Some(chrono::Local::now().format("%Y-%m-%d").to_string());
    }
}

#[tauri::command]
fn get_stats(state: State<AppState>) -> serde_json::Value {
    let progress = state.progress.lock().unwrap();
    let total_hiragana = 46;
    let total_katakana = 46;
    let n5_len = japanese::kanji::get_n5_kanji().len() as u32;
    let n4_len = japanese::kanji::get_n4_kanji().len() as u32;  
    let n3_len = japanese::kanji::get_n3_kanji().len() as u32;

    serde_json::json!({
        "hiragana_percent": if total_hiragana > 0 { (progress.hiragana_mastered as f64 / total_hiragana as f64 * 100.0).min(100.0) as u32 } else { 0 },
        "katakana_percent": if total_katakana > 0 { (progress.katakana_mastered as f64 / total_katakana as f64 * 100.0).min(100.0) as u32 } else { 0 },
        "kanji_n5_percent": if n5_len > 0 { (progress.kanji_n5_mastered as f64 / n5_len as f64 * 100.0).min(100.0) as u32 } else { 0 },
        "kanji_n4_percent": if n4_len > 0 { (progress.kanji_n4_mastered as f64 / n4_len as f64 * 100.0).min(100.0) as u32 } else { 0 },
        "kanji_n3_percent": if n3_len > 0 { (progress.kanji_n3_mastered as f64 / n3_len as f64 * 100.0).min(100.0) as u32 } else { 0 },
        "total_studied": progress.total_studied,
        "total_correct": progress.total_correct,
        "accuracy": if progress.total_studied > 0 { (progress.total_correct as f64 / progress.total_studied as f64 * 100.0) as u32 } else { 0 },
        "current_streak": progress.current_streak,
        "best_streak": progress.best_streak,
    })
}

fn main() {
    tauri::Builder::default()
        .manage(AppState {
            progress: Mutex::new(UserProgress::default()),
        })
        .invoke_handler(tauri::generate_handler![
            app_minimize,
            app_toggle_maximize,
            app_close,
            app_start_dragging,
            get_hiragana,
            get_katakana,
            get_kanji,
            get_stroke_rules,
            get_grammar_lessons,
            get_particles,
            get_vocabulary,
            get_vocab_categories,
            generate_quiz,
            check_answer,
            get_progress,
            record_study,
            get_stats,
        ])
        .run(tauri::generate_context!())
        .expect("error while running NihonGo!");
}
