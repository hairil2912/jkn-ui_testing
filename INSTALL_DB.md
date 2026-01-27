# Instalasi Database untuk Konfigurasi

Konfigurasi sekarang disimpan di database lokal (SQLite) agar bisa digunakan bersama tim.

## Instalasi Dependencies

Jalankan perintah berikut untuk menginstall dependency database:

```bash
npm install better-sqlite3 @types/better-sqlite3 --save --legacy-peer-deps
```

Atau jika menggunakan pnpm:

```bash
pnpm add better-sqlite3 @types/better-sqlite3
```

## Database File

Database akan dibuat otomatis di `web/config.db` saat server pertama kali dijalankan.

## Migrasi dari localStorage

Jika Anda sudah punya konfigurasi di localStorage sebelumnya, Anda bisa:

1. Export konfigurasi dari localStorage (jika masih ada fitur export)
2. Import kembali melalui halaman Konfigurasi

Atau manual:
1. Buka Developer Tools (F12)
2. Di Console, ketik: `localStorage.getItem('jkn_testing_configs')`
3. Copy hasilnya dan simpan sebagai file JSON
4. Import file tersebut melalui halaman Konfigurasi

## Catatan

- Database file (`web/config.db`) bisa di-share dengan tim melalui Git atau file sharing
- Pastikan file `config.db` tidak di-commit ke Git jika berisi kredensial production
- Gunakan `.gitignore` untuk mengecualikan `config.db` jika diperlukan
