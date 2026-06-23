/**
 * Skenario pengujian asyncCreateThread thunk:
 *
 * - should dispatch showLoading, createThread, hideLoading and add new thread on success
 * - should dispatch showLoading, hideLoading and set error on failure
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import threadsReducer, { asyncCreateThread } from './threadsSlice';
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

describe('asyncCreateThread thunk', () => {
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

  it('should dispatch actions correctly and add thread on success', async () => {
    const fakeThread = {
      id: 'thread-new',
      title: 'Thread Baru',
      body: 'Body thread baru',
      category: 'react',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    api.createThread.mockResolvedValue({ error: false, data: { thread: fakeThread } });

    await store.dispatch(asyncCreateThread({ title: 'Thread Baru', body: 'Body thread baru', category: 'react' }));

    const state = store.getState();
    expect(state.threads.threads).toHaveLength(1);
    expect(state.threads.threads[0]).toEqual(fakeThread);
    expect(api.createThread).toHaveBeenCalledWith({ title: 'Thread Baru', body: 'Body thread baru', category: 'react' });
  });

  it('should dispatch actions correctly and set error on failure', async () => {
    api.createThread.mockRejectedValue(new Error('Create failed'));

    await store.dispatch(asyncCreateThread({ title: 'Thread Baru', body: 'Body', category: 'react' }));

    const state = store.getState();
    expect(state.threads.threads).toEqual([]);
    expect(state.threads.error).toBeTruthy();
  });
});
