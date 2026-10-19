# BISAM Professional v6

Frontend prototype terstruktur untuk Bintang Samudra BINJAS & PSI dengan dua area: peserta dan admin.

## Jalankan

```bash
npm run dev
```

Buka `http://localhost:5173`.

Tidak perlu `npm install` untuk mode lokal karena project tidak memakai dependency eksternal.

## Struktur

```text
src/
├── app/              router
├── components/       layout + UI reusable
├── config/           konfigurasi global
├── data/             seed katalog dan bank soal
├── features/         engine khusus Pauli & Kraepelin
├── pages/            halaman peserta/admin
├── repositories/     boundary sumber data
├── services/         business logic
├── styles/           CSS terpisah
└── utils/            utility
```

## Data awal

Fresh install:

- peserta: 0
- riwayat: 0
- ranking: 0
- jadwal: 0
- pengumuman: 0
- progress member: 0

Modul dan bank soal tetap tersedia sebagai seed konten — total **16 modul, 725 soal**:

| Modul | Jumlah soal | Engine |
|---|---|---|
| Logika Dasar, Numerik Dasar, Verbal, Sinonim & Antonim, Analogi Kata, Deret Angka, Matematika Dasar, Penalaran Analitis, Spasial, Kecepatan Konsentrasi, Kepribadian Kerja | 50 soal / modul | quiz |
| Tes Ketelitian (Pencerminan Gambar) | 25 soal (bergambar) | quiz |
| Pauli & Kraepelin | tes waktu | interaktif |
| TIU, TWK, TKD | 50 soal / modul | quiz (halaman `/ujian`) |

Semua bank soal ada di `src/data/questions/*.js`, digabung otomatis lewat
`src/data/questions.data.js`. Katalog modul ada di satu file:
`src/data/modules.data.js`.

## Admin

Baca `ADMIN-HANDOFF.md` sebelum serah-terima ke developer production (jika file ini belum ada, buat berdasarkan catatan di `firebase/README.md`).

## Firebase

Project default menggunakan provider `mock`. Untuk mengirim seluruh konten
(modul + 725 soal) ke Firestore project kamu dan mengaktifkan provider
`firebase`, ikuti langkah lengkap di `src/firebase/README.md` bagian
"Mengirim (seed) data ke Firestore project kamu". Ringkas:

```bash
npm install
npm run seed:firebase -- ./serviceAccountKey.json
```

lalu ubah `provider: 'mock'` menjadi `provider: 'firebase'` di
`src/config/data-source.config.js`.

## Riwayat pembaruan

- **v6.1** — Menambahkan modul TIU, TWK, TKD (150 soal).
- **v6.2** — Menggabungkan 550 soal baru (11 modul) dari paket `soal_gabungan`,
  merapikan seluruh bank soal ke satu skema data yang konsisten, menyatukan
  katalog modul yang sebelumnya ganda/tidak sinkron, menyambungkan kembali
  fitur Pauli & Kraepelin dan Tes Ketelitian (Pencerminan Gambar) yang
  sebelumnya tidak ter-routing, menambahkan tampilan pembahasan jawaban, dan
  membangun adapter Firestore + script seeding agar konten bisa langsung
  dikirim ke Firebase.


## Soal manual ⇄ kode (v8.7)

Soal yang dibuat lewat web tersimpan di Firestore dan bisa dijadikan kode di
`src/data/questions/custom.js` (tombol "Unduh kode soal manual" atau
`npm run export:custom`), lalu dikirim balik ke web dengan
`npm run import:custom`. Detail: lihat `PERUBAHAN_v8_7.md`.
