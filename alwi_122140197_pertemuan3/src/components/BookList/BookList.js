import React from 'react';
import PropTypes from 'prop-types';

/**
 * Komponen untuk menampilkan daftar buku dalam bentuk tabel.
 *
 * Props:
 * - books: Array buku, masing-masing objek { id, title, author, status }
 * - onEdit: Callback saat tombol Edit diklik, menerima objek buku
 * - onDelete: Callback saat tombol Hapus diklik, menerima id buku
 */
function BookList({ books, onEdit, onDelete }) {
  // Mapping nilai status ke label yang akan ditampilkan
  const STATUS_LABELS = {
    milik: 'Dimiliki',
    baca: 'Sedang Dibaca',
    beli: 'Ingin Dibeli',
  };

  // Jika tidak ada buku, tampilkan pesan kosong
  if (books.length === 0) {
    return <p>Belum ada buku untuk ditampilkan.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Judul</th>
          <th>Penulis</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          // Gunakan id sebagai key unik setiap baris
          <tr key={book.id}>
            {/* Tampilkan judul buku */}
            <td>{book.title}</td>

            {/* Tampilkan nama penulis */}
            <td>{book.author}</td>

            {/* Tampilkan label status berdasarkan mapping */}
            <td>{STATUS_LABELS[book.status] || book.status}</td>

            {/* Tombol Edit & Hapus */}
            <td>
            <button
                className="btn-edit"
                onClick={() => onEdit(book)}
            >
                Edit
            </button>
            <button
                className="btn-delete"
                onClick={() => onDelete(book.id)}
            >
                Hapus
            </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Validasi prop types
BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
