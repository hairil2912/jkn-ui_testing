# Instalasi Sistem Autentikasi

Sistem autentikasi telah ditambahkan untuk keamanan aplikasi.

## Instalasi Dependencies

Jalankan perintah berikut untuk menginstall dependency autentikasi:

```bash
npm install bcrypt express-session @types/bcrypt @types/express-session --save --legacy-peer-deps
```

Atau jika menggunakan pnpm:

```bash
pnpm add bcrypt express-session @types/bcrypt @types/express-session
```

## Kredensial Default

Setelah instalasi, user default akan dibuat otomatis:
- **Username**: `khairil` (atau sesuai `DEFAULT_USERNAME` env var)
- **Password**: `password123` (atau sesuai `DEFAULT_PASSWORD` env var)

⚠️ **PENTING**: 
- **Ganti password default** setelah instalasi pertama!
- Untuk production, **WAJIB** set environment variables `DEFAULT_USERNAME` dan `DEFAULT_PASSWORD`
- Jangan gunakan password default di production!

## Fitur Keamanan

1. **Password Hashing**: Password disimpan menggunakan bcrypt (salt rounds: 10)
2. **Session Management**: Menggunakan express-session dengan cookie httpOnly
3. **Route Protection**: Semua API endpoints (kecuali login) memerlukan autentikasi
4. **Auto Redirect**: Halaman akan redirect ke login jika tidak terautentikasi

## Cara Menggunakan

1. Buka aplikasi di browser
2. Anda akan diarahkan ke halaman login
3. Masukkan username dan password
4. Setelah login, Anda dapat mengakses semua fitur

## Logout

Klik tombol "Logout" di header untuk keluar dari sistem.

## Mengganti Password

Untuk mengganti password, edit langsung di database atau buat script untuk update password:

```javascript
const bcrypt = require('bcrypt');
const hashedPassword = bcrypt.hashSync('password-baru', 10);
// Update di database dengan hashedPassword
```

## Environment Variables (Opsional)

Untuk production, set environment variable untuk session secret:

```bash
export SESSION_SECRET="your-very-secure-random-secret-key"
```

Atau buat file `.env`:
```
SESSION_SECRET=your-very-secure-random-secret-key
```
