# Aplikasi Manajemen Buku Pribadi

Aplikasi sederhana untuk mencatat dan mengelola koleksi buku pribadi, mulai dari yang sudah dimiliki, sedang dibaca, hingga yang ingin dibeli.

## Fitur Utama
- **Tambah** buku baru dengan judul, penulis, dan status (Milik, Sedang Baca, Ingin Dibeli)
- **Edit** dan **Hapus** data buku
- **Filter** buku berdasarkan status
- **Pencarian** buku berdasarkan judul atau penulis
- **Statistik** jumlah buku per status
- **Persistensi** data menggunakan LocalStorage agar data tidak hilang saat refresh

## Teknologi
- React (Create React App)
- React Router v6 untuk navigasi multi-halaman
- Context API untuk global state
- Custom Hooks (`useLocalStorage`, `useBookStats`)
- PropTypes untuk validasi tipe data props
- React Testing Library untuk unit test

## Instalasi & Menjalankan
1. Clone repository:
   ```bash
   git clone <https://github.com/samanbrembo14/pemrograman_web_itera_122140197> alwi_122140197_pertemuan3
   cd alwi_122140197_pertemuan3
   ```
2. Buat project React di direktori ini (jika belum):
   ```bash
   npx create-react-app .
   ```
3. Instalasi dependencies:
   ```bash
   npm install react-router-dom prop-types
   ```
4. Jalankan development server:
   ```bash
   npm start
   ```
5. Buka di browser: `http://localhost:3000`

## Struktur Folder
```
src/
├── components/
│   ├── BookForm/         # Form tambah/edit buku
│   ├── BookList/         # Menampilkan daftar buku
│   └── BookFilter/       # Filter & pencarian
├── context/
│   └── BookContext.js    # Provider & Context global
├── hooks/
│   ├── useLocalStorage.js  # Hook persist state di LocalStorage
│   └── useBookStats.js     # Hook hitung statistik buku
├── pages/
│   ├── Home/             # Halaman utama (daftar & form)
│   └── Stats/            # Halaman statistik buku
└── App.js                # Router & Provider setup
```

## Penjelasan Fitur React
- **Hooks**: `useState`, `useEffect`, `useContext`, `useMemo` untuk state dan side-effects.
- **React Router**: `BrowserRouter`, `Routes`, `Route`, `Link` untuk navigasi Home & Stats.
- **Context API**: `BookContext` & `BookProvider` menyediakan `books` dan `setBooks` ke seluruh komponen.
- **Custom Hooks**:
  - `useLocalStorage`: menyimpan dan memuat state dari LocalStorage.
  - `useBookStats`: menghitung jumlah buku per status dengan `useMemo`.

## Komentar Kode
- **BookContext.js**: Menggunakan `useLocalStorage` agar state `books` otomatis tersimpan ke LocalStorage.
- **useLocalStorage.js**: Lazy initializer memuat data awal; `useEffect` untuk sinkronisasi perubahan.
- **useBookStats.js**: Optimasi perhitungan statistik dengan `useMemo` guna mencegah komputasi ulang yang tidak perlu.

## Testing
Unit test dibuat dengan React Testing Library minimal 5 kasus:
1. **BookForm.test.js**: Render form dan submit memanggil `onSubmit`.
2. **useLocalStorage.test.js**: Hook memuat & menyimpan ke LocalStorage.
3. **BookList.test.js**: Render daftar, cek tombol Edit & Hapus.
4. **BookFilter.test.js**: Cek perubahan filter dan pencarian.
5. **Home.test.js**: Integrasi tambah buku dan tampil di list.

### Menjalankan Test
```bash
npm test
```

### Screenshot Hasil Test
![Hasil Test](/alwi_122140197_pertemuan3/src/assets/test.png)

### Catatan Hasil Test
Beberapa tes gagal memuat modul `react-router-dom` di lingkungan Jest meskipun paket sudah terinstal. Saya tidak tau gimana caranya agar terdeteksi padahal saat saya lihat memakai `npm ls react-router-dom` terdeteksi, saya nyerah.

---

## Screenshot Aplikasi
- **Home**
  ![Home](/alwi_122140197_pertemuan3/src/assets/home1.png)

  ![Home2](/alwi_122140197_pertemuan3/src/assets/home2.png)

- **Stats**
  ![Stats](/alwi_122140197_pertemuan3/src/assets/stats.png)

---

*Dokumentasi dibuat sesuai instruksi tugas praktikum Pemweb ITERA.*

