/**
 * Skenario pengujian threadsSlice reducer:
 *
 * - should return initial state when given unknown action
 * - should handle asyncPopulateThreads.pending action
 * - should handle asyncPopulateThreads.fulfilled action
 * - should handle asyncPopulateThreads.rejected action
 * - should handle asyncCreateThread.fulfilled action (unshift new thread)
 * - should handle asyncUpVoteThread.pending action (optimistic update)
 * - should handle asyncDownVoteThread.pending action (optimistic update)
 * - should handle asyncNeutralVoteThread.pending action (remove user from both vote arrays)
 */

import { describe, it, expect } from 'vitest';
import threadsReducer, {
  asyncPopulateThreads,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from './threadsSlice';

describe('threadsSlice reducer', () => {
  const initialState = {
    threads: [],
    isLoading: false,
    error: null,
  };

  it('should return initial state when given unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = threadsReducer(undefined, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle asyncPopulateThreads.pending action', () => {
    const action = { type: asyncPopulateThreads.pending.type };
    const nextState = threadsReducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle asyncPopulateThreads.fulfilled action', () => {
    const fakeThreads = [
      { id: 'thread-1', title: 'Thread 1', body: 'Body 1', category: 'general', upVotesBy: [], downVotesBy: [] },
      { id: 'thread-2', title: 'Thread 2', body: 'Body 2', category: 'react', upVotesBy: [], downVotesBy: [] },
    ];
    const action = { type: asyncPopulateThreads.fulfilled.type, payload: fakeThreads };
    const nextState = threadsReducer({ ...initialState, isLoading: true }, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.threads).toEqual(fakeThreads);
  });

  it('should handle asyncPopulateThreads.rejected action', () => {
    const action = {
      type: asyncPopulateThreads.rejected.type,
      error: { message: 'Network Error' },
    };
    const nextState = threadsReducer({ ...initialState, isLoading: true }, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Network Error');
  });

  it('should handle asyncCreateThread.fulfilled action', () => {
    const existingThread = { id: 'thread-1', title: 'Old Thread' };
    const newThread = { id: 'thread-2', title: 'New Thread' };
    const stateWithThread = { ...initialState, threads: [existingThread] };
    const action = { type: asyncCreateThread.fulfilled.type, payload: newThread };
    const nextState = threadsReducer(stateWithThread, action);
    expect(nextState.threads).toHaveLength(2);
    expect(nextState.threads[0]).toEqual(newThread);
  });

  it('should handle asyncUpVoteThread.pending action (optimistic update)', () => {
    const thread = { id: 'thread-1', upVotesBy: [], downVotesBy: ['user-1'] };
    const stateWithThread = { ...initialState, threads: [thread] };
    const action = {
      type: asyncUpVoteThread.pending.type,
      meta: { arg: { threadId: 'thread-1', userId: 'user-1' } },
    };
    const nextState = threadsReducer(stateWithThread, action);
    expect(nextState.threads[0].upVotesBy).toContain('user-1');
    expect(nextState.threads[0].downVotesBy).not.toContain('user-1');
  });

  it('should handle asyncDownVoteThread.pending action (optimistic update)', () => {
    const thread = { id: 'thread-1', upVotesBy: ['user-1'], downVotesBy: [] };
    const stateWithThread = { ...initialState, threads: [thread] };
    const action = {
      type: asyncDownVoteThread.pending.type,
      meta: { arg: { threadId: 'thread-1', userId: 'user-1' } },
    };
    const nextState = threadsReducer(stateWithThread, action);
    expect(nextState.threads[0].downVotesBy).toContain('user-1');
    expect(nextState.threads[0].upVotesBy).not.toContain('user-1');
  });

  it('should handle asyncNeutralVoteThread.pending action', () => {
    const thread = { id: 'thread-1', upVotesBy: ['user-1'], downVotesBy: [] };
    const stateWithThread = { ...initialState, threads: [thread] };
    const action = {
      type: asyncNeutralVoteThread.pending.type,
      meta: { arg: { threadId: 'thread-1', userId: 'user-1' } },
    };
    const nextState = threadsReducer(stateWithThread, action);
    expect(nextState.threads[0].upVotesBy).not.toContain('user-1');
    expect(nextState.threads[0].downVotesBy).not.toContain('user-1');
  });
});
