import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookProvider } from '../../context/BookContext';
import Home from './Home';

// Mock react-router-dom to provide BrowserRouter for tests\.
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <>{children}</>,
}));

// Require the mocked BrowserRouter
const { BrowserRouter } = require('react-router-dom');

// Mock window.confirm to always return true during tests
beforeAll(() => {
  jest.spyOn(window, 'confirm').mockReturnValue(true);
});

/**
 * Helper to render Home component with necessary providers
 */
const renderWithProviders = () =>
  render(
    <BookProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </BookProvider>
  );

describe('Home Page Integration', () => {
  test('shows empty list initially and allows adding a book', () => {
    renderWithProviders();

    // Initially, no books are displayed
    expect(screen.getByText(/belum ada buku untuk ditampilkan/i)).toBeInTheDocument();

    // Fill out form to add a book
    fireEvent.change(screen.getByLabelText(/judul:/i), { target: { value: 'Test JS' } });
    fireEvent.change(screen.getByLabelText(/penulis:/i), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByLabelText(/status:/i), { target: { value: 'milik' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    // Now book should appear in the table
    expect(screen.getByText(/milik/i)).toBeInTheDocument();
    expect(screen.getByText('Test JS')).toBeInTheDocument();
    expect(screen.getByText('Tester')).toBeInTheDocument();
  });

  test('allows editing a book and updating its details', () => {
    renderWithProviders();

    // Add a book first
    fireEvent.change(screen.getByLabelText(/judul:/i), { target: { value: 'To Edit' } });
    fireEvent.change(screen.getByLabelText(/penulis:/i), { target: { value: 'Author' } });
    fireEvent.change(screen.getByLabelText(/status:/i), { target: { value: 'beli' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    // Enter edit mode
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Form should preload initial data
    expect(screen.getByLabelText(/judul:/i)).toHaveValue('To Edit');
    expect(screen.getByLabelText(/penulis:/i)).toHaveValue('Author');
    expect(screen.getByLabelText(/status:/i)).toHaveValue('beli');

    // Change title and submit update
    fireEvent.change(screen.getByLabelText(/judul:/i), { target: { value: 'Edited' } });
    fireEvent.click(screen.getByRole('button', { name: /update buku/i }));

    // Verify the table shows updated entry
    expect(screen.getByText('Edited')).toBeInTheDocument();
    expect(screen.queryByText('To Edit')).not.toBeInTheDocument();
  });

  test('allows deleting a book', () => {
    renderWithProviders();

    // Add a book
    fireEvent.change(screen.getByLabelText(/judul:/i), { target: { value: 'To Delete' } });
    fireEvent.change(screen.getByLabelText(/penulis:/i), { target: { value: 'Author' } });
    fireEvent.change(screen.getByLabelText(/status:/i), { target: { value: 'beli' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    // Confirm the book exists
    expect(screen.getByText('To Delete')).toBeInTheDocument();

    // Click delete button
    fireEvent.click(screen.getByRole('button', { name: /hapus/i }));

    // Verify the empty state message
    expect(screen.getByText(/belum ada buku untuk ditampilkan/i)).toBeInTheDocument();
  });
});
