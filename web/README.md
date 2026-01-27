# JKN Testing UI

UI untuk testing JKN (BPJS) Bridging API secara interaktif.

## Cara Menggunakan

1. **Install Dependencies**

   Jika pnpm tidak ditemukan, install dulu:
   ```bash
   npm install -g pnpm
   ```
   
   Atau gunakan npm sebagai alternatif:
   ```bash
   npm install
   ```

2. **Jalankan Server**
   ```bash
   pnpm run ui
   # atau jika menggunakan npm:
   npm run ui
   ```
   atau untuk development dengan auto-reload:
   ```bash
   pnpm run ui:dev
   # atau:
   npm run ui:dev
   ```
   
   **Catatan:** Lihat file `INSTALL.md` di root project untuk solusi lengkap masalah pnpm.

3. **Buka Browser**
   Buka http://localhost:3000 di browser Anda

4. **Konfigurasi**
   - Isi form konfigurasi dengan data akses BPJS Anda:
     - Mode Environment (Development/Production)
     - Kode PPK
     - Cons ID
     - Cons Secret
     - User Keys untuk masing-masing modul
   - Klik "Simpan Konfigurasi" untuk menyimpan
   - Konfigurasi akan tersimpan di localStorage browser

5. **Testing Endpoint**
   - Pilih modul yang ingin di-test (Antrean, Aplicares, VClaim, dll)
   - Jika modul memiliki submodul, pilih submodul terlebih dahulu
   - Pilih endpoint yang ingin di-test
   - Isi parameter yang diperlukan
   - Klik "Test Endpoint"
   - Lihat hasil response di panel Response

## Fitur

- ✅ Form konfigurasi dengan penyimpanan otomatis
- ✅ Pilihan modul dan endpoint yang tersedia
- ✅ Form parameter dinamis berdasarkan endpoint
- ✅ **Bulk Mode** - Test multiple requests sekaligus
- ✅ Tampilan response yang rapi dengan syntax highlighting
- ✅ Copy dan download response
- ✅ Support untuk semua modul JKN (Antrean, Aplicares, VClaim, Apotek, PCare, ICare, Rekam Medis)

## Bulk Parameter Mode

Bulk Parameter Mode memungkinkan Anda untuk test satu endpoint dengan banyak variasi parameter sekaligus. Sangat berguna untuk test endpoint POST seperti insert SEP, insert antrean, dll.

**Cara menggunakan:**
1. Pilih modul, submodul (jika ada), dan endpoint yang ingin di-test
2. Aktifkan toggle "Bulk Parameter" di bagian Parameter
3. Input JSON array dengan banyak variasi parameter
4. Klik "Test Endpoint" untuk menjalankan semua request

**Contoh untuk SEP Insert:**

```json
[
  {
    "request": {
      "t_sep": {
        "noKartu": "0001112230666",
        "tglSep": "2017-10-18",
        "ppkPelayanan": "0301R001",
        "jnsPelayanan": "2",
        "klsRawat": "3",
        "noMR": "123456",
        ...
      }
    }
  },
  {
    "request": {
      "t_sep": {
        "noKartu": "0001112230667",
        "tglSep": "2017-10-19",
        ...
      }
    }
  }
]
```

Klik "Load Template" untuk melihat contoh format sesuai endpoint yang dipilih.

## Catatan

- Konfigurasi disimpan di localStorage browser, jadi akan tetap tersimpan setelah refresh
- Pastikan kredensial BPJS Anda valid sebelum testing
- Mode Development menggunakan URL development BPJS, Production menggunakan URL production
