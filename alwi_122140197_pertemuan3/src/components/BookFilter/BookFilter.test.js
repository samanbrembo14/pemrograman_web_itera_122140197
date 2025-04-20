import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from './BookFilter';

describe('BookFilter Component', () => {
  const filter = { status: 'all', searchTerm: '' };
  const mockOnFilterChange = jest.fn();
  const mockOnSearchChange = jest.fn();

  test('renders status dropdown and search input', () => {
    // Panggil render di dalam test, bukan beforeEach
    render(
      <BookFilter
        filter={filter}
        onFilterChange={mockOnFilterChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    // Verifikasi elemen ada di dokumen
    expect(screen.getByLabelText(/filter status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cari buku/i)).toBeInTheDocument();
  });

  test('calls onFilterChange when status changes', () => {
    render(
      <BookFilter
        filter={filter}
        onFilterChange={mockOnFilterChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    const select = screen.getByLabelText(/filter status/i);
    fireEvent.change(select, { target: { value: 'baca' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith('baca');
  });

  test('calls onSearchChange when search term changes', () => {
    render(
      <BookFilter
        filter={filter}
        onFilterChange={mockOnFilterChange}
        onSearchChange={mockOnSearchChange}
      />
    );

    const input = screen.getByLabelText(/cari buku/i);
    fireEvent.change(input, { target: { value: 'Harry' } });
    expect(mockOnSearchChange).toHaveBeenCalledWith('Harry');
  });
});
