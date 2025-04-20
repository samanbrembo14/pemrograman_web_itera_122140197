import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

const KEY = 'testKey';

/**
 * Test component untuk hook useLocalStorage
 * - Menampilkan state value
 * - Tombol untuk mengubah state
 */
function TestComp({ defaultValue }) {
  const [value, setValue] = useLocalStorage(KEY, defaultValue);
  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => setValue('updated')}>Update</button>
    </div>
  );
}

describe('useLocalStorage Hook via TestComp', () => {
  beforeEach(() => {
    // Bersihkan localStorage sebelum setiap test
    localStorage.clear();
  });

  test('initializes with default value and saves to localStorage', () => {
    render(<TestComp defaultValue="default" />);
    expect(screen.getByTestId('value').textContent).toBe('default');
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify('default'));
  });

  test('initializes from localStorage if already present', () => {
    localStorage.setItem(KEY, JSON.stringify('saved'));
    render(<TestComp defaultValue="default" />);
    expect(screen.getByTestId('value').textContent).toBe('saved');
  });

  test('updates state and localStorage on button click', () => {
    render(<TestComp defaultValue="init" />);
    fireEvent.click(screen.getByText('Update'));  
    expect(screen.getByTestId('value').textContent).toBe('updated');
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify('updated'));
  });
});
