/**
 * Skenario pengujian isPreloadSlice reducer:
 *
 * - should return initial state when given unknown action
 * - should handle asyncPreloadProcess.fulfilled action (set isPreload to false)
 * - should handle asyncPreloadProcess.rejected action (set isPreload to false)
 */

import { describe, it, expect, vi } from 'vitest';
import isPreloadReducer, { asyncPreloadProcess } from './isPreloadSlice';

vi.mock('../utils/api', () => ({
  getOwnProfile: vi.fn(),
  putAccessToken: vi.fn(),
}));

describe('isPreloadSlice reducer', () => {
  const initialState = {
    isPreload: true,
  };

  it('should return initial state when given unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = isPreloadReducer(undefined, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle asyncPreloadProcess.fulfilled action', () => {
    const action = { type: asyncPreloadProcess.fulfilled.type };
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState.isPreload).toBe(false);
  });

  it('should handle asyncPreloadProcess.rejected action', () => {
    const action = { type: asyncPreloadProcess.rejected.type };
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState.isPreload).toBe(false);
  });
});
