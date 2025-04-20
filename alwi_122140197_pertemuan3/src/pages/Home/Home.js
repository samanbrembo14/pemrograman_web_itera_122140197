import React, { useContext, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import './Home.css';

export default function Home() {
  const { books, setBooks } = useContext(BookContext);
  const [filter, setFilter] = useState({ status: 'all', searchTerm: '' });
  const [editingBook, setEditingBook] = useState(null);

  const handleFilterChange = newStatus =>
    setFilter(prev => ({ ...prev, status: newStatus }));
  const handleSearchChange = term =>
    setFilter(prev => ({ ...prev, searchTerm: term }));

  const handleFormSubmit = data => {
    if (data.id) {
      setBooks(books.map(b => (b.id === data.id ? data : b)));
    } else {
      setBooks([...books, { ...data, id: Date.now().toString() }]);
    }
    setEditingBook(null);
  };

  const handleEdit = book => setEditingBook(book);
  const handleDelete = id => {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  const filteredBooks = books.filter(book => {
    if (filter.status !== 'all' && book.status !== filter.status) return false;
    const term = filter.searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
  });

  return (
    <div className="home-container">
      <h1 className="home-header">Aplikasi Manajemen Buku Pribadi</h1>

      <section className="card filter-section">
        <BookFilter
          filter={filter}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </section>

      <section className="card form-section">
        <BookForm onSubmit={handleFormSubmit} initialData={editingBook} />
      </section>

      <section className="list-section">
        <BookList
          books={filteredBooks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}
