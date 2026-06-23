/**
 * Skenario pengujian CommentItem component:
 *
 * - should render owner name correctly
 * - should render comment content correctly (HTML parsed)
 * - should render upVote and downVote buttons
 * - should render vote counts correctly
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CommentItem from './CommentItem';

vi.mock('react-redux-loading-bar', () => ({
  showLoading: () => ({ type: 'loading-bar/SHOW' }),
  hideLoading: () => ({ type: 'loading-bar/HIDE' }),
  loadingBarReducer: (state = {}) => state,
}));

const fakeComment = {
  id: 'comment-1',
  content: '<p>Ini komentar dari user</p>',
  createdAt: '2021-06-21T08:00:00.000Z',
  owner: {
    id: 'user-1',
    name: 'Jane Doe',
    avatar: 'https://via.placeholder.com/40',
  },
  upVotesBy: ['user-2'],
  downVotesBy: [],
};

function renderWithProviders(ui) {
  const store = configureStore({
    reducer: {
      auth: () => ({ user: null, isLoading: false, error: null }),
      loadingBar: (state = {}) => state,
    },
  });

  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
}

describe('CommentItem component', () => {
  it('should render owner name correctly', () => {
    renderWithProviders(<CommentItem comment={fakeComment} threadId="thread-1" />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('should render comment content correctly (HTML parsed)', () => {
    renderWithProviders(<CommentItem comment={fakeComment} threadId="thread-1" />);
    expect(screen.getByText('Ini komentar dari user')).toBeInTheDocument();
  });

  it('should render upVote and downVote buttons', () => {
    renderWithProviders(<CommentItem comment={fakeComment} threadId="thread-1" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('should render vote counts correctly', () => {
    renderWithProviders(<CommentItem comment={fakeComment} threadId="thread-1" />);
    expect(screen.getByText(/↑ 1/)).toBeInTheDocument();
    expect(screen.getByText(/↓ 0/)).toBeInTheDocument();
  });
});
