import React from 'react';
import PropTypes from 'prop-types';

/**
 * Komponen untuk filter dan pencarian buku.
 *
 * Props:
 * - filter: objek { status, searchTerm }
 * - onFilterChange: callback ketika status berubah (dikirim dengan nilai status baru)
 * - onSearchChange: callback ketika kata kunci pencarian berubah (dikirim dengan teks baru)
 */
function BookFilter({ filter, onFilterChange, onSearchChange }) {
  const { status, searchTerm } = filter;

  // Ketika dropdown status berubah, panggil callback dengan status baru
  const handleStatusChange = e => {
    onFilterChange(e.target.value);
  };

  // Ketika input pencarian berubah, panggil callback dengan teks baru
  const handleSearchChange = e => {
    onSearchChange(e.target.value);
  };

  return (
    <div>
      {/* Pilih status buku: Semua / Milik / Sedang Baca / Ingin Beli */}
      <div>
        <label htmlFor="statusFilter">Filter Status:</label>
        <select
          id="statusFilter"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="all">Semua</option>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      {/* Input teks untuk mencari berdasarkan judul atau penulis */}
      <div>
        <label htmlFor="searchInput">Cari Buku:</label>
        <input
          id="searchInput"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Judul atau penulis..."
        />
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  filter: PropTypes.shape({
    status: PropTypes.string.isRequired,
    searchTerm: PropTypes.string.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default BookFilter;
