# Sistem Manajemen Perpustakaan

## Deskripsi
Proyek ini merupakan implementasi sistem manajemen perpustakaan sederhana menggunakan konsep Object-Oriented Programming (OOP) di Python. Sistem ini dibuat sebagai tugas praktikum pemrograman web dengan fokus pada implementasi konsep class, inheritance, encapsulation, dan polymorphism.

## Fitur
Sistem manajemen perpustakaan ini memiliki fitur-fitur berikut:
1. Menambahkan item baru ke perpustakaan (buku atau majalah)
2. Menampilkan daftar semua item yang ada di perpustakaan
3. Menampilkan daftar item yang tersedia (tidak sedang dipinjam)
4. Mencari item berdasarkan ID
5. Mencari item berdasarkan judul atau kata kunci
6. Meminjam item dari perpustakaan
7. Mengembalikan item ke perpustakaan

## Struktur Program
Program ini terdiri dari beberapa class yang menerapkan konsep OOP:

### 1. `LibraryItem` (Abstract Class)
- Menjadi dasar untuk semua jenis item perpustakaan
- Menerapkan encapsulation dengan penggunaan atribut protected
- Menyediakan abstract method yang harus diimplementasikan oleh subclass
- Menyediakan property getters untuk akses aman ke atribut

### 2. `Book` (Subclass dari `LibraryItem`)
- Mewarisi property dan method dari `LibraryItem`
- Menambahkan atribut khusus untuk buku: penulis dan genre
- Mengimplementasikan method abstract `display_info()`
- Menerapkan encapsulation dengan penggunaan atribut private

### 3. `Magazine` (Subclass dari `LibraryItem`)
- Mewarisi property dan method dari `LibraryItem`
- Menambahkan atribut khusus untuk majalah: nomor edisi dan penerbit
- Mengimplementasikan method abstract `display_info()`
- Menerapkan encapsulation dengan penggunaan atribut private

### 4. `Library`
- Menyimpan dan mengelola koleksi item perpustakaan
- Menyediakan method untuk menambah item, mencari item, dan mengelola peminjaman

## Implementasi Konsep OOP

### 1. Inheritance (Pewarisan)
- Class `Book` dan `Magazine` mewarisi atribut dan method dari abstract class `LibraryItem`
- Implementasi inheritance memungkinkan penanganan berbagai jenis item dengan cara yang seragam

### 2. Encapsulation (Enkapsulasi)
- Penggunaan atribut protected (awalan `_`) dan private (awalan `__`)
- Implementasi property decorator untuk mengontrol akses ke atribut
- Metode untuk modifikasi atribut yang terkontrol

### 3. Abstraction (Abstraksi)
- Penggunaan abstract class `LibraryItem` sebagai blueprint
- Implementasi abstract method `display_info()` yang harus didefinisikan ulang oleh subclass

### 4. Polymorphism (Polimorfisme)
- Method `display_info()` diimplementasikan secara berbeda di setiap subclass
- Setiap jenis item memiliki format tampilan informasi yang spesifik
- Library class dapat bekerja dengan berbagai jenis item melalui interface yang sama

## Cara Penggunaan
Program ini menggunakan menu interaktif berbasis konsol untuk berinteraksi dengan sistem. Untuk menjalankan program:

```bash
python manajemen_perpustakaan.py
```

Setelah dijalankan, ikuti petunjuk menu yang ditampilkan:
- Pilih 1 untuk menambahkan item baru
- Pilih 2 untuk menampilkan semua item
- Pilih 3 untuk menampilkan item yang tersedia
- Pilih 4 untuk mencari item berdasarkan ID
- Pilih 5 untuk mencari item berdasarkan judul
- Pilih 6 untuk meminjam item
- Pilih 7 untuk mengembalikan item
- Pilih 0 untuk keluar dari program

## Persyaratan Sistem
- Python 3.6 atau lebih tinggi
- Tidak memerlukan library tambahan

## Contoh Penggunaan

### Menambahkan Buku
```
-- TAMBAH ITEM --
Jenis item (1: Buku, 2: Majalah): 1
ID: B001
Judul: Python Programming
Tahun terbit: 2022
Penulis: John Smith
Genre: Komputer
Buku 'Python Programming' berhasil ditambahkan
```

### Mencari Berdasarkan Judul
```
-- CARI BERDASARKAN JUDUL --
Masukkan judul atau kata kunci: Python
BUKU: Python Programming oleh John Smith | ID: B001 | Tahun: 2022 | Genre: Komputer | Status: Tersedia
```

## Kesimpulan
Proyek ini mendemonstrasikan penerapan prinsip-prinsip OOP dalam pengembangan sistem manajemen perpustakaan sederhana. Melalui penggunaan inheritance, encapsulation, abstraction, dan polymorphism, sistem ini mampu mengelola berbagai jenis item perpustakaan dengan kode yang terstruktur, dapat diperluas, dan mudah dipelihara.