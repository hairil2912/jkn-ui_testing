# Contributing to JKN Testing UI

Terima kasih telah tertarik untuk berkontribusi pada project ini! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

Kami berkomitmen untuk menyediakan lingkungan yang ramah dan inklusif untuk semua kontributor, terlepas dari usia, ukuran tubuh, disabilitas, etnis, identitas dan ekspresi gender, tingkat pengalaman, pendidikan, status sosial-ekonomi, kebangsaan, penampilan pribadi, ras, agama, atau identitas dan orientasi seksual.

### Our Standards

**Contoh perilaku yang berkontribusi untuk menciptakan lingkungan positif:**

- Menggunakan bahasa yang ramah dan inklusif
- Menghormati sudut pandang dan pengalaman yang berbeda
- Menerima kritik konstruktif dengan baik
- Fokus pada apa yang terbaik untuk komunitas
- Menunjukkan empati terhadap anggota komunitas lainnya

**Contoh perilaku yang tidak dapat diterima:**

- Penggunaan bahasa atau gambar yang bersifat seksual dan perhatian atau rayuan yang tidak diinginkan
- Trolling, komentar menghina/menghina, dan serangan pribadi atau politik
- Pelecehan publik atau pribadi
- Mempublikasikan informasi pribadi orang lain, seperti alamat fisik atau elektronik, tanpa izin eksplisit
- Perilaku lain yang tidak pantas dalam pengaturan profesional

## Getting Started

### Prerequisites

- Node.js 18+ atau Bun/Deno
- pnpm (disarankan) atau npm
- Git

### Setup Development Environment

1. **Fork Repository**
   - Klik tombol "Fork" di GitHub
   - Clone fork Anda:
     ```bash
     git clone https://github.com/YOUR_USERNAME/jkn-testing.git
     cd jkn-testing
     ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/hairil2912/jkn-testing.git
   ```

3. **Install Dependencies**
   ```bash
   pnpm install
   ```

4. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # atau
   git checkout -b fix/your-bug-fix
   ```

5. **Start Development Server**
   ```bash
   pnpm run ui:dev
   ```

## Development Process

### Branch Naming Convention

- `feature/` - Untuk fitur baru
- `fix/` - Untuk bug fixes
- `docs/` - Untuk perubahan dokumentasi
- `refactor/` - Untuk code refactoring
- `test/` - Untuk menambah test
- `chore/` - Untuk maintenance tasks

**Contoh:**
- `feature/add-dark-mode`
- `fix/login-error-handling`
- `docs/update-installation-guide`

### Making Changes

1. **Plan Your Changes**
   - Diskusikan perubahan besar di issue terlebih dahulu
   - Pastikan perubahan Anda sesuai dengan tujuan project

2. **Write Code**
   - Ikuti coding standards (lihat bagian [Coding Standards](#coding-standards))
   - Tulis kode yang jelas dan mudah dipahami
   - Tambahkan komentar jika diperlukan

3. **Test Your Changes**
   - Test semua fitur yang berubah
   - Pastikan tidak ada error di console
   - Test di browser yang berbeda jika diperlukan

4. **Update Documentation**
   - Update README jika ada perubahan penting
   - Update inline documentation jika diperlukan
   - Tambahkan contoh penggunaan jika menambah fitur baru

## Pull Request Process

### Before Submitting

- [ ] Code mengikuti style guide project
- [ ] Self-review code Anda sendiri
- [ ] Comment kode yang kompleks
- [ ] Dokumentasi telah diupdate
- [ ] Tidak ada console errors atau warnings
- [ ] Tested di browser yang berbeda (jika UI changes)

### Creating Pull Request

1. **Update Your Fork**
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. **Rebase Your Branch** (jika diperlukan)
   ```bash
   git checkout feature/your-feature-name
   git rebase main
   ```

3. **Push Your Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Buka GitHub dan buat Pull Request
   - Isi template PR dengan lengkap
   - Jelaskan perubahan yang Anda buat
   - Link ke related issue jika ada
   - Screenshot jika ada perubahan UI

### PR Template

```markdown
## Description
Jelaskan perubahan yang Anda buat secara singkat dan jelas.

## Type of Change
- [ ] Bug fix (non-breaking change yang memperbaiki issue)
- [ ] New feature (non-breaking change yang menambah fitur)
- [ ] Breaking change (fix atau feature yang menyebabkan perubahan existing functionality)
- [ ] Documentation update

## Testing
Jelaskan bagaimana Anda telah test perubahan ini.

## Checklist
- [ ] Code mengikuti style guide project
- [ ] Self-review code
- [ ] Comment kode yang kompleks
- [ ] Dokumentasi telah diupdate
- [ ] Tidak ada console errors atau warnings
- [ ] Tested di browser yang berbeda (jika UI changes)
```

## Coding Standards

### JavaScript/TypeScript

- Gunakan **ES6+** features
- Gunakan **const** dan **let**, hindari **var**
- Gunakan **arrow functions** untuk callbacks
- Gunakan **template literals** untuk string concatenation
- Gunakan **async/await** untuk asynchronous operations
- Tambahkan **JSDoc comments** untuk functions yang kompleks

**Contoh:**
```javascript
/**
 * Mengambil data konfigurasi dari database
 * @param {number} id - ID konfigurasi
 * @returns {Promise<Config>} Data konfigurasi
 */
async function getConfig(id) {
    const config = await configDB.getById(id);
    return config;
}
```

### HTML

- Gunakan **semantic HTML**
- Gunakan **indentation** yang konsisten (2 spaces)
- Tambahkan **alt text** untuk images
- Gunakan **aria-labels** untuk accessibility

### CSS

- Gunakan **CSS variables** untuk theming
- Gunakan **BEM naming convention** untuk class names
- Gunakan **flexbox/grid** untuk layout
- Responsive design untuk mobile devices

**Contoh:**
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
}

.button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

.button--primary {
    background-color: var(--primary-color);
}
```

### File Naming

- **JavaScript/TypeScript**: `camelCase.js` atau `camelCase.ts`
- **HTML**: `kebab-case.html`
- **CSS**: `kebab-case.css`

## Testing

### Manual Testing Checklist

- [ ] Test semua fitur yang berubah
- [ ] Test di browser yang berbeda (Chrome, Firefox, Safari, Edge)
- [ ] Test di mobile devices (jika applicable)
- [ ] Test error handling
- [ ] Test edge cases

### Testing Scenarios

1. **Login Flow**
   - Valid credentials
   - Invalid credentials
   - Empty fields

2. **Configuration Management**
   - Add new config
   - Edit existing config
   - Delete config
   - Export/Import config

3. **API Testing**
   - Single parameter mode
   - Bulk parameter mode
   - Error responses
   - Success responses

## Documentation

### Code Comments

- Tambahkan komentar untuk logic yang kompleks
- Gunakan JSDoc untuk functions
- Jelaskan "why" bukan "what"

**Contoh:**
```javascript
// ❌ Bad
// Increment counter
counter++;

// ✅ Good
// Increment counter untuk tracking jumlah request per detik
// Digunakan untuk rate limiting
counter++;
```

### README Updates

- Update README jika ada perubahan penting
- Tambahkan contoh penggunaan untuk fitur baru
- Update installation steps jika diperlukan

## Questions?

Jika Anda memiliki pertanyaan:

1. Buka [GitHub Discussion](https://github.com/hairil2912/jkn-testing/discussions)
2. Buka issue dengan label `question`
3. Hubungi maintainer melalui GitHub

## Recognition

Semua kontributor akan:
- Dicantumkan di README (jika diinginkan)
- Diberikan credit di release notes
- Diundang untuk menjadi maintainer (untuk kontributor aktif)

**Terima kasih telah berkontribusi! 🙏**
