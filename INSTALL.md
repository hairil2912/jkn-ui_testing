# Instalasi dan Setup

## Masalah: pnpm tidak ditemukan

Jika Anda mendapatkan error `pnpm: command not found`, ada beberapa solusi:

### Solusi 1: Install pnpm secara global (Recommended)

```bash
npm install -g pnpm
```

Setelah itu, jalankan:
```bash
pnpm install
pnpm run ui
```

### Solusi 2: Gunakan npm sebagai alternatif

Jika tidak ingin install pnpm, Anda bisa menggunakan npm:

```bash
npm install
npm run ui
```

**Catatan:** Pastikan untuk mengupdate script di `package.json` jika menggunakan npm. Script sudah diset untuk menggunakan `tsx` yang akan diinstall oleh npm/pnpm.

### Solusi 3: Gunakan npx untuk menjalankan langsung

```bash
npx pnpm install
npx pnpm run ui
```

## Dependencies yang diperlukan

- Node.js (v18 atau lebih baru)
- npm atau pnpm
- tsx (akan diinstall otomatis)

## Setelah install dependencies

Jalankan server dengan:
```bash
pnpm run ui
# atau
npm run ui
```

Server akan berjalan di http://localhost:3000

## Modul yang Tersedia

Aplikasi ini mendukung berbagai modul JKN (BPJS) Bridging API:

- **Antrean**: Referensi, Update Jadwal, Tambah/Batal Antrean, Dashboard, Monitoring
- **Aplicares**: Referensi Kamar, Ketersediaan Tempat Tidur, CRUD Ruangan
- **VClaim**: 
  - Peserta (by Nomor Kartu/NIK)
  - Referensi (Diagnosa, Poli, Faskes, DPJP, Wilayah, PRB, Klaim)
  - SEP (Insert/Update/Delete v1.1 & v2.0, Pengajuan, Fingerprint, Random Question)
  - Rujukan (Cari, Insert/Update/Delete, Khusus, v2.0)
  - Rencana Kontrol (Insert/Update/Delete, SPRI, Data Poli/Dokter)
  - PRB (Insert/Update/Delete, Cari, Rekap)
  - Monitoring (Kunjungan, Klaim, Riwayat Pelayanan, Jasa Raharja)
  - LPK (Insert/Update/Delete, Data Pengajuan Klaim)
- **Apotek**: 
  - Referensi (DPHO, Poli, Faskes, Setting Apotek, Spesialistik, Obat)
  - Obat (Simpan Non Racikan/Racikan, Update Stok)
  - Pelayanan Obat (Daftar, Riwayat, Hapus)
  - Resep (Simpan, Hapus, Daftar)
  - SEP (Data Kunjungan)
  - Monitoring (Data Klaim Resep)
  - PRB (Rekap Peserta)
- **PCare**: 
  - Peserta (by Nomor Kartu/NIK)
  - Dokter (Get dengan pagination)
  - Kelompok (Club, Kegiatan, Peserta - GET, POST, DELETE)
  - Kesadaran (Get Data)
  - Kunjungan (Rujukan, Peserta, Add, Edit, Delete)
  - MCU (Kunjungan, Add, Edit, Delete)
  - Obat (DPHO, DPHO by KDPPK, Kunjungan, Add, Delete)
  - Pendaftaran (No Urut, Tgl Daftar, Add, Delete)
  - Poli (Get Data Poli FKTP dengan pagination)
  - Provider (Get Provider Rayonisasi dengan pagination)
  - Spesialis (Referensi, Sub Spesialis, Sarana, Khusus, Rujukan)
  - Status Pulang (Get by rawatInap)
  - Alergi (Get by jenis)
  - Prognosa (Get Data)
  - Tindakan (Kunjungan, Referensi, Add, Edit, Delete)
  - Skrining (Rekap, Peserta, Prolanis DM, Prolanis HT)
- **ICare**: FKRTL, FKTP
- **Rekam Medis**: Insert Rekam Medis

Untuk detail lengkap tentang endpoint dan parameter setiap modul, lihat [README.md](README.md#-modul-dan-submodul-yang-tersedia).
