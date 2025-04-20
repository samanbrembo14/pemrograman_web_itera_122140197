// src/hooks/useBookStats.js

import { useMemo } from 'react';

/**
 * Custom hook untuk menghitung statistik buku.
 * Menerima array `books` dan mengembalikan jumlah buku per status.
 *
 * @param {Array} books - Daftar buku, masing‑masing memiliki properti `status`
 * @returns {{milik: number, baca: number, beli: number}} stats
 */
function useBookStats(books) {
  return useMemo(() => {
    // Inisialisasi object statistik dengan nilai awal 0
    const stats = {
      milik: 0,
      baca: 0,
      beli: 0,
    };

    // Iterasi setiap elemen di array `books`
    books.forEach(book => {
      // Cek jika status valid (milik/baca/beli), lalu tambahkan hitungan
      if (stats[book.status] !== undefined) {
        stats[book.status] += 1;
      }
    });

    // Kembalikan object statistik
    return stats;
  }, [books]); 
  // useMemo: hanya menghitung ulang kalau `books` berubah,
  // jadi performanya lebih optimal
}

export default useBookStats;
