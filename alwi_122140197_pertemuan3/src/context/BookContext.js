// src/context/BookContext.js

import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

/**
 * BookContext: menyimpan daftar buku dan fungsi setBooks
 */
export const BookContext = createContext();

/**
 * Provider untuk membungkus seluruh aplikasi,
 * agar semua komponen bisa akses `books` dan `setBooks`.
 */
export function BookProvider({ children }) {
  // Gunakan custom hook untuk persist state ke localStorage
  const [books, setBooks] = useLocalStorage('myBooks', []);
  
  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
}
