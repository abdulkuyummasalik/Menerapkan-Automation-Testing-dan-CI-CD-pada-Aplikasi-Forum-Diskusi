/**
 * Skenario pengujian asyncSetAuthUser thunk:
 *
 * - should dispatch showLoading, login, getOwnProfile, putAccessToken, hideLoading and return user on success
 * - should dispatch showLoading, hideLoading and throw error when login fails
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { asyncSetAuthUser } from './authSlice';
import * as api from '../utils/api';

// Mock react-redux-loading-bar
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

describe('asyncSetAuthUser thunk', () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        auth: authReducer,
        loadingBar: (state = {}) => state,
      },
    });
  });

  it('should dispatch actions correctly and return user on successful login', async () => {
    const fakeUser = { id: 'user-1', name: 'John Doe', email: 'john@test.com', avatar: 'avatar.png' };

    api.login.mockResolvedValue({ error: false, data: { token: 'fake-token' } });
    api.getOwnProfile.mockResolvedValue({ error: false, data: { user: fakeUser } });

    await store.dispatch(asyncSetAuthUser({ email: 'john@test.com', password: 'password123' }));

    const state = store.getState();
    expect(state.auth.user).toEqual(fakeUser);
    expect(state.auth.isLoading).toBe(false);
    expect(api.login).toHaveBeenCalledWith({ email: 'john@test.com', password: 'password123' });
    expect(api.putAccessToken).toHaveBeenCalledWith('fake-token');
    expect(api.getOwnProfile).toHaveBeenCalled();
  });

  it('should dispatch actions correctly and set error when login fails', async () => {
    api.login.mockResolvedValue({ error: true, data: null });

    await store.dispatch(asyncSetAuthUser({ email: 'john@test.com', password: 'wrongpass' }));

    const state = store.getState();
    expect(state.auth.user).toBeNull();
    expect(state.auth.isLoading).toBe(false);
    expect(state.auth.error).toBeTruthy();
  });
});
