/**
 * Skenario pengujian leaderboardsSlice reducer:
 *
 * - should return initial state when given unknown action
 * - should handle asyncPopulateLeaderboards.pending action
 * - should handle asyncPopulateLeaderboards.fulfilled action
 * - should handle asyncPopulateLeaderboards.rejected action
 */

import { describe, it, expect } from 'vitest';
import leaderboardsReducer, { asyncPopulateLeaderboards } from './leaderboardsSlice';

describe('leaderboardsSlice reducer', () => {
  const initialState = {
    leaderboards: [],
    isLoading: false,
    error: null,
  };

  it('should return initial state when given unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = leaderboardsReducer(undefined, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle asyncPopulateLeaderboards.pending action', () => {
    const action = { type: asyncPopulateLeaderboards.pending.type };
    const nextState = leaderboardsReducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle asyncPopulateLeaderboards.fulfilled action', () => {
    const fakeLeaderboards = [
      { user: { id: 'user-1', name: 'User 1' }, score: 100 },
      { user: { id: 'user-2', name: 'User 2' }, score: 80 },
    ];
    const action = { type: asyncPopulateLeaderboards.fulfilled.type, payload: fakeLeaderboards };
    const nextState = leaderboardsReducer({ ...initialState, isLoading: true }, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.leaderboards).toEqual(fakeLeaderboards);
  });

  it('should handle asyncPopulateLeaderboards.rejected action', () => {
    const action = {
      type: asyncPopulateLeaderboards.rejected.type,
      error: { message: 'Failed to fetch' },
    };
    const nextState = leaderboardsReducer({ ...initialState, isLoading: true }, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Failed to fetch');
  });
});
