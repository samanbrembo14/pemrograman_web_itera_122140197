import { useState, useEffect } from 'react';

/**
 * Custom hook untuk menyimpan dan memuat state
 * sekaligus dari localStorage.
 * @param {string} key      Nama key di localStorage
 * @param {*}      defaultValue Nilai default jika belum ada di localStorage
 * @returns {[any, Function]}   [state, setState]
 */
function useLocalStorage(key, defaultValue) {
  // Inisialisasi state dari localStorage (atau default jika belum ada)
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    // Jika ada di localStorage, parse JSON-nya; kalau tidak, pakai defaultValue
    return storedValue !== null
      ? JSON.parse(storedValue)
      : defaultValue;
  });

  // Setiap kali `state` berubah, tulis kembali ke localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // Kembalikan state dan fungsi untuk mengubahnya
  return [state, setState];
}

export default useLocalStorage;
