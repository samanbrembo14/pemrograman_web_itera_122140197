import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Form untuk tambah / edit buku.
 * Props:
 *  - onSubmit: fungsi yang dipanggil dengan data buku saat form disubmit
 *  - initialData: objek buku (id, title, author, status) saat edit; null untuk tambah baru
 */
function BookForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('milik');

  // Preload data jika mode edit
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setStatus(initialData.status);
    }
  }, [initialData]);

  // Handler perubahan setiap field
  const handleTitleChange = e => setTitle(e.target.value);
  const handleAuthorChange = e => setAuthor(e.target.value);
  const handleStatusChange = e => setStatus(e.target.value);

  // Saat form disubmit
  const handleSubmit = e => {
    e.preventDefault();
    // Validasi input wajib diisi
    if (!title.trim() || !author.trim()) {
      alert('Judul dan penulis tidak boleh kosong!');
      return;
    }

    // Panggil callback onSubmit
    onSubmit({
      ...(initialData && { id: initialData.id }),
      title: title.trim(),
      author: author.trim(),
      status,
    });

    // Reset form (mode tambah)
    setTitle('');
    setAuthor('');
    setStatus('milik');
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <div className="field">
        <label htmlFor="title">Judul:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Masukkan judul buku"
        />
      </div>

      <div className="field">
        <label htmlFor="author">Penulis:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={handleAuthorChange}
          placeholder="Masukkan nama penulis"
        />
      </div>

      <div className="field">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      {/* Tombol submit dengan styling modern */}
      <button type="submit" className="btn-primary">
        {initialData ? 'Update Buku' : 'Tambah Buku'}
      </button>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
  }),
};

BookForm.defaultProps = {
  initialData: null,
};

export default BookForm;
