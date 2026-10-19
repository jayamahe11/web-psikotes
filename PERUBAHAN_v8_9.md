# BISAM v8.9 — 11 modul latihan diganti total (level sulit)

Semua soal lama di 11 modul berikut dibuang dan diganti 50 soal baru per modul
(total 550 soal, 5 pilihan A-E, pembahasan lengkap). Modul Ketelitian, Ingatan
Verbal, TIU, TWK, TKD, TWK#2, TIU#2, TKP#2 tidak diubah.

| Modul | File | ID soal | Isi |
|---|---|---|---|
| Logika Dasar | `logika.js` | 1001-1050 | silogisme (diagram Venn), logika proposisi, jujur-bohong, penempatan urutan |
| Numerik Dasar | `numerik.js` | 1101-1150 | pangkat/akar, pecahan, persen berlapis, KPK-FPB, bentuk baku, sisa & satuan, deret hitung |
| Verbal | `verbal.js` | 1201-1250 | kata baku, kalimat efektif, peribahasa, padanan istilah, paragraf, imbuhan |
| Sinonim & Antonim | `sinonim.js` | 1301-1350 | 25 sinonim + 25 antonim (istilah sulit, tiap soal punya pengecoh jebakan) |
| Analogi Kata | `analogi.js` | 1401-1450 | 8 jenis hubungan (alat-fungsi, sebab-akibat, tingkatan, dsb.) |
| Deret Angka | `deret.js` | 1501-1550 | kuadratik, kubik, berselang-seling, Fibonacci varian, prima, operasi bergilir |
| Matematika Dasar | `matematika.js` | 1601-1650 | untung-rugi, pekerjaan, kecepatan, campuran, bunga, SPLDV, geometri, peluang, statistik |
| Penalaran Analitis | `analitis.js` | 1701-1750 | peringkat, jadwal, meja bundar, tim, hubungan keluarga, tabel, seleksi bersyarat, umur |
| Spasial | `spasial.js` | 1901-1950 | arah, jarak, balok dicat, jam cermin, lipat kertas, transformasi titik, diagonal ruang |
| Kecepatan Konsentrasi | `konsentrasi.js` | 2001-2050 | hitung pola/angka, bandingkan kode, prima, angka hilang, vokal |
| Kepribadian | `kepribadian.js` | 2101-2150 | situasional 5 aspek; jawaban terbaik = skor 5 (skor 1-5 ada di pembahasan) |

Jawaban untuk soal hitungan/logika/penalaran dihasilkan dan diverifikasi oleh
program (brute force pada puzzle), bukan diketik manual.

## Agar soal lama benar-benar hilang
- Aplikasi: `QUESTION_BANK_REVISION` (di `src/data/questions.data.js`) membuat browser/Firestore
  yang masih menyimpan soal lama otomatis memakai soal baru dari kode (sekali per revisi).
- Firestore: `npm run seed:firebase -- ./serviceAccountKey.json --prune`
  (`--prune` menghapus dokumen soal lama di `questions` dan `answerKeys`; soal manual
  buatan admin di `customQuestions` tidak disentuh).
- Setelah mengganti soal lagi di masa depan: ubah nilai `QUESTION_BANK_REVISION`,
  lalu `npm run build:seed` dan seed ulang.
