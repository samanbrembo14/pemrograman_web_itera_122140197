import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

describe('BookForm Component', () => {
  test('renders form fields and submits correct data', () => {
    const handleSubmit = jest.fn();
    render(<BookForm onSubmit={handleSubmit} initialData={null} />);

    // Dapatkan elemen form berdasarkan label
    const titleInput = screen.getByLabelText(/judul:/i);
    const authorInput = screen.getByLabelText(/penulis:/i);
    const statusSelect = screen.getByLabelText(/status:/i);
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });

    // Simulasikan input data
    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Tester' } });
    fireEvent.change(statusSelect, { target: { value: 'beli' } });

    // Submit form
    fireEvent.click(submitButton);

    // Harus memanggil onSubmit dengan data yang sesuai
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Test Book',
      author: 'Tester',
      status: 'beli',
    });
  });

  test('preloads initialData when editing', () => {
    const initialData = { id: '1', title: 'Init Title', author: 'Init Author', status: 'baca' };
    const handleSubmit = jest.fn();
    render(<BookForm onSubmit={handleSubmit} initialData={initialData} />);

    // Pastikan value input sesuai initialData
    expect(screen.getByLabelText(/judul:/i).value).toBe('Init Title');
    expect(screen.getByLabelText(/penulis:/i).value).toBe('Init Author');
    expect(screen.getByLabelText(/status:/i).value).toBe('baca');
  });
});
