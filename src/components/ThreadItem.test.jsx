/**
 * Skenario pengujian ThreadItem component:
 *
 * - should render thread title correctly
 * - should render thread category correctly
 * - should render thread body content
 * - should render owner name and avatar when user is found
 * - should render vote counts correctly
 * - should render total comments count
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from './ThreadItem';

vi.mock('react-redux-loading-bar', () => ({
  showLoading: () => ({ type: 'loading-bar/SHOW' }),
  hideLoading: () => ({ type: 'loading-bar/HIDE' }),
  loadingBarReducer: (state = {}) => state,
}));

const fakeThread = {
  id: 'thread-1',
  title: 'Judul Thread Pertama',
  body: '<p>Ini adalah isi dari thread pertama</p>',
  category: 'general',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: ['user-2'],
  downVotesBy: ['user-3'],
  totalComments: 5,
};

const fakeUsers = [
  { id: 'user-1', name: 'John Doe', email: 'john@test.com', avatar: 'https://via.placeholder.com/40' },
];

function renderWithProviders(ui) {
  const store = configureStore({
    reducer: {
      auth: () => ({ user: null, isLoading: false, error: null }),
      loadingBar: (state = {}) => state,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
}

describe('ThreadItem component', () => {
  it('should render thread title correctly', () => {
    renderWithProviders(<ThreadItem thread={fakeThread} users={fakeUsers} />);
    expect(screen.getByText('Judul Thread Pertama')).toBeInTheDocument();
  });

  it('should render thread category correctly', () => {
    renderWithProviders(<ThreadItem thread={fakeThread} users={fakeUsers} />);
    expect(screen.getByText('#general')).toBeInTheDocument();
  });

  it('should render thread body content', () => {
    renderWithProviders(<ThreadItem thread={fakeThread} users={fakeUsers} />);
    expect(screen.getByText('Ini adalah isi dari thread pertama')).toBeInTheDocument();
  });

  it('should render owner name when user is found', () => {
    renderWithProviders(<ThreadItem thread={fakeThread} users={fakeUsers} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render upVote and downVote counts correctly', () => {
    renderWithProviders(<ThreadItem thread={fakeThread} users={fakeUsers} />);
    expect(screen.getByText(/↑ 1/)).toBeInTheDocument();
    expect(screen.getByText(/↓ 1/)).toBeInTheDocument();
  });

  it('should render total comments count', () => {
    renderWithProviders(<ThreadItem thread={fakeThread} users={fakeUsers} />);
    expect(screen.getByText(/💬 5/)).toBeInTheDocument();
  });
});
