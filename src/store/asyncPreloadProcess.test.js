/**
 * Skenario pengujian asyncPreloadProcess thunk:
 *
 * - should dispatch setAuthUser with user data when getOwnProfile succeeds
 * - should dispatch setAuthUser with null when getOwnProfile fails
 * - should set isPreload to false after process completes
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import isPreloadReducer, { asyncPreloadProcess } from './isPreloadSlice';
import authReducer from './authSlice';
import * as api from '../utils/api';

vi.mock('react-redux-loading-bar', () => ({
  showLoading: () => ({ type: 'loading-bar/SHOW' }),
  hideLoading: () => ({ type: 'loading-bar/HIDE' }),
  loadingBarReducer: (state = {}) => state,
}));

vi.mock('../utils/api', () => ({
  login: vi.fn(),
  register: vi.fn(),
  getOwnProfile: vi.fn(),
  putAccessToken: vi.fn(),
  getAccessToken: vi.fn(),
}));

describe('asyncPreloadProcess thunk', () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        isPreload: isPreloadReducer,
        auth: authReducer,
        loadingBar: (state = {}) => state,
      },
    });
  });

  it('should dispatch setAuthUser with user data when profile is available', async () => {
    const fakeUser = { id: 'user-1', name: 'John Doe', email: 'john@test.com', avatar: 'avatar.png' };
    api.getOwnProfile.mockResolvedValue({ error: false, data: { user: fakeUser } });

    await store.dispatch(asyncPreloadProcess());

    const state = store.getState();
    expect(state.auth.user).toEqual(fakeUser);
    expect(state.isPreload.isPreload).toBe(false);
  });

  it('should dispatch setAuthUser with null when profile fetch fails', async () => {
    api.getOwnProfile.mockResolvedValue({ error: true, data: null });

    await store.dispatch(asyncPreloadProcess());

    const state = store.getState();
    expect(state.auth.user).toBeNull();
    expect(state.isPreload.isPreload).toBe(false);
  });

  it('should set isPreload to false when getOwnProfile throws an error', async () => {
    api.getOwnProfile.mockRejectedValue(new Error('Network Error'));

    await store.dispatch(asyncPreloadProcess());

    const state = store.getState();
    expect(state.auth.user).toBeNull();
    expect(state.isPreload.isPreload).toBe(false);
  });
});
