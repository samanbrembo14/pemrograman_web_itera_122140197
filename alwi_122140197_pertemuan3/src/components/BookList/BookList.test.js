import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';

describe('BookList Component', () => {
  const books = [
    { id: '1', title: 'Book A', author: 'Author A', status: 'milik' },
    { id: '2', title: 'Book B', author: 'Author B', status: 'beli' },
  ];

  test('renders message when no books are provided', () => {
    render(<BookList books={[]} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/belum ada buku untuk ditampilkan/i)).toBeInTheDocument();
  });

  test('displays list of books with correct data and callbacks', () => {
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();

    render(
      <BookList
        books={books}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );

    // Check that book titles, authors, and status labels appear
    expect(screen.getByText('Book A')).toBeInTheDocument();
    expect(screen.getByText('Author A')).toBeInTheDocument();
    expect(screen.getByText('Dimiliki')).toBeInTheDocument();

    expect(screen.getByText('Book B')).toBeInTheDocument();
    expect(screen.getByText('Author B')).toBeInTheDocument();
    expect(screen.getByText('Ingin Dibeli')).toBeInTheDocument();

    // Click edit on first book
    const editButtons = screen.getAllByText(/edit/i);
    fireEvent.click(editButtons[0]);
    expect(handleEdit).toHaveBeenCalledWith(books[0]);

    // Click delete on second book
    const deleteButtons = screen.getAllByText(/hapus/i);
    fireEvent.click(deleteButtons[1]);
    expect(handleDelete).toHaveBeenCalledWith(books[1].id);
  });
});
