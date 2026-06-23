/**
 * Skenario pengujian asyncPopulateThreads thunk:
 *
 * - should dispatch showLoading, getAllThreads, hideLoading and set threads on success
 * - should dispatch showLoading, hideLoading and set error on failure
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import threadsReducer, { asyncPopulateThreads } from './threadsSlice';
import * as api from '../utils/api';

vi.mock('react-redux-loading-bar', () => ({
  showLoading: () => ({ type: 'loading-bar/SHOW' }),
  hideLoading: () => ({ type: 'loading-bar/HIDE' }),
  loadingBarReducer: (state = {}) => state,
}));

vi.mock('../utils/api', () => ({
  getAllThreads: vi.fn(),
  createThread: vi.fn(),
  upVoteThread: vi.fn(),
  downVoteThread: vi.fn(),
  neutralVoteThread: vi.fn(),
}));

describe('asyncPopulateThreads thunk', () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        threads: threadsReducer,
        loadingBar: (state = {}) => state,
      },
    });
  });

  it('should dispatch actions correctly and populate threads on success', async () => {
    const fakeThreads = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini body thread pertama',
        category: 'general',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    api.getAllThreads.mockResolvedValue({ error: false, data: { threads: fakeThreads } });

    await store.dispatch(asyncPopulateThreads());

    const state = store.getState();
    expect(state.threads.threads).toEqual(fakeThreads);
    expect(state.threads.isLoading).toBe(false);
    expect(api.getAllThreads).toHaveBeenCalled();
  });

  it('should dispatch actions correctly and set error on failure', async () => {
    api.getAllThreads.mockRejectedValue(new Error('Network Error'));

    await store.dispatch(asyncPopulateThreads());

    const state = store.getState();
    expect(state.threads.threads).toEqual([]);
    expect(state.threads.isLoading).toBe(false);
    expect(state.threads.error).toBeTruthy();
  });
});
