/**
 * Skenario pengujian authSlice reducer:
 *
 * - should return initial state when given unknown action
 * - should handle setAuthUser action
 * - should handle unsetAuthUser action
 * - should handle asyncSetAuthUser.pending action
 * - should handle asyncSetAuthUser.fulfilled action
 * - should handle asyncSetAuthUser.rejected action
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import authReducer, { setAuthUser, unsetAuthUser, asyncSetAuthUser } from './authSlice';

// Mock putAccessToken agar tidak error localStorage
vi.mock('../utils/api', () => ({
  login: vi.fn(),
  register: vi.fn(),
  getOwnProfile: vi.fn(),
  putAccessToken: vi.fn(),
}));

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state when given unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = authReducer(undefined, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle setAuthUser action', () => {
    const fakeUser = { id: 'user-1', name: 'John', email: 'john@test.com', avatar: 'avatar.png' };
    const action = setAuthUser(fakeUser);
    const nextState = authReducer(initialState, action);
    expect(nextState.user).toEqual(fakeUser);
  });

  it('should handle unsetAuthUser action', () => {
    const stateWithUser = {
      ...initialState,
      user: { id: 'user-1', name: 'John' },
    };
    const action = unsetAuthUser();
    const nextState = authReducer(stateWithUser, action);
    expect(nextState.user).toBeNull();
  });

  it('should handle asyncSetAuthUser.pending action', () => {
    const action = { type: asyncSetAuthUser.pending.type };
    const nextState = authReducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle asyncSetAuthUser.fulfilled action', () => {
    const fakeUser = { id: 'user-1', name: 'John' };
    const action = { type: asyncSetAuthUser.fulfilled.type, payload: fakeUser };
    const nextState = authReducer({ ...initialState, isLoading: true }, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(fakeUser);
  });

  it('should handle asyncSetAuthUser.rejected action', () => {
    const action = {
      type: asyncSetAuthUser.rejected.type,
      error: { message: 'Login failed' },
    };
    const nextState = authReducer({ ...initialState, isLoading: true }, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Login failed');
  });
});
