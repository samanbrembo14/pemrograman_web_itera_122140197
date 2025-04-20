// src/pages/Stats/Stats.js

import React, { useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

export default function Stats() {
  const { books } = useContext(BookContext);
  const stats = useBookStats(books);

  return (
    <div className="stats-container">
      <h1 className="stats-header">Statistik Buku</h1>
      <div className="stats-card-container">
        <div className="stats-card">
          <div className="label">Milik</div>
          <div className="count">{stats.milik}</div>
        </div>
        <div className="stats-card">
          <div className="label">Sedang Baca</div>
          <div className="count">{stats.baca}</div>
        </div>
        <div className="stats-card">
          <div className="label">Ingin Dibeli</div>
          <div className="count">{stats.beli}</div>
        </div>
      </div>
    </div>
  );
}
