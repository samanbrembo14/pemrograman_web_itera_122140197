// src/App.test.js
/* eslint-disable import/first */

// Mock react-router-dom sebelum mengimpor App
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <>{children}</>,
  Routes: ({ children }) => <>{children}</>,
  Route: () => null,
  Link: ({ children }) => <>{children}</>,
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Stats/i)).toBeInTheDocument();
});
