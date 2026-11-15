use crate::models::StrokeRule;

pub fn get_stroke_rules() -> Vec<StrokeRule> {
    vec![
        StrokeRule {
            number: 1,
            title: "Atas ke Bawah".into(),
            japanese: "上から下へ (Ue kara shita e)".into(),
            description: "Goresan selalu dimulai dari bagian paling atas menuju ke bagian bawah. Karakter ditulis menurun secara bertahap.".into(),
            example_chars: vec!["三".into(), "言".into(), "工".into()],
        },
        StrokeRule {
            number: 2,
            title: "Kiri ke Kanan".into(),
            japanese: "左から右へ (Hidari kara migi e)".into(),
            description: "Jika ada komponen berdampingan, tulis komponen sebelah kiri terlebih dahulu sebelum melanjutkan ke sisi kanan.".into(),
            example_chars: vec!["川".into(), "休".into(), "明".into()],
        },
        StrokeRule {
            number: 3,
            title: "Mendatar Sebelum Menegak".into(),
            japanese: "横が先、縦が後 (Yoko ga saki, tate ga ato)".into(),
            description: "Ketika garis horizontal dan vertikal saling berpotongan, tulis garis horizontal (mendatar) terlebih dahulu, baru garis vertikal.".into(),
            example_chars: vec!["十".into(), "木".into(), "大".into()],
        },
        StrokeRule {
            number: 4,
            title: "Tengah Dahulu untuk Bentuk Simetris".into(),
            japanese: "中が先、左右が後 (Naka ga saki, sayuu ga ato)".into(),
            description: "Pada karakter simetris dengan batang tengah yang menonjol, tulis garis tengah terlebih dahulu, lalu sayap kiri dan sayap kanan.".into(),
            example_chars: vec!["小".into(), "水".into(), "山".into()],
        },
        StrokeRule {
            number: 5,
            title: "Bingkai Luar Sebelum Isi Dalam".into(),
            japanese: "外が先、中が後 (Soto ga saki, naka ga ato)".into(),
            description: "Tulis garis tepi atau bingkai luar (kiri, atas, kanan) terlebih dahulu sebelum menggambar komponen di dalam kotak.".into(),
            example_chars: vec!["日".into(), "月".into(), "国".into()],
        },
        StrokeRule {
            number: 6,
            title: "Tutup Kotak Paling Akhir".into(),
            japanese: "中を入れてから閉じる (Naka wo irete kara tojiru)".into(),
            description: "Setelah seluruh isi dalam kotak selesai ditulis, baru tarik garis penutup bagian bawah bingkai dari kiri ke kanan.".into(),
            example_chars: vec!["田".into(), "四".into(), "回".into()],
        },
        StrokeRule {
            number: 7,
            title: "Garis Tembus Paling Terakhir".into(),
            japanese: "貫く画は最後 (Tsuranuku kaku wa saigo)".into(),
            description: "Garis vertikal atau horizontal panjang yang menembus bagian tengah karakter selalu ditarik paling terakhir.".into(),
            example_chars: vec!["中".into(), "半".into(), "事".into()],
        },
        StrokeRule {
            number: 8,
            title: "Titik / Aksen Minor Terakhir".into(),
            japanese: "点は最後 (Ten wa saigo)".into(),
            description: "Titik kecil (ten) di sudut atas atau di dalam karakter ditulis paling akhir setelah struktur utama selesai.".into(),
            example_chars: vec!["玉".into(), "太".into(), "犬".into()],
        },
    ]
}
