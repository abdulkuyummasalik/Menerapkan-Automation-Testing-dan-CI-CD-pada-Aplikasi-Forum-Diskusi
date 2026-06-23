import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllThreads, createThread, upVoteThread, downVoteThread, neutralVoteThread } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const initialState = {
  threads: [],
  isLoading: false,
  error: null,
};

export const asyncPopulateThreads = createAsyncThunk(
  'threads/populateThreads',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { data } = await getAllThreads();
      return data.threads;
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncCreateThread = createAsyncThunk(
  'threads/createThread',
  async ({ title, body, category }, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { data } = await createThread({ title, body, category });
      return data.thread;
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncUpVoteThread = createAsyncThunk(
  'threads/upVoteThread',
  async ({ threadId, userId }, { rejectWithValue }) => {
    try {
      await upVoteThread(threadId);
      return { threadId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDownVoteThread = createAsyncThunk(
  'threads/downVoteThread',
  async ({ threadId, userId }, { rejectWithValue }) => {
    try {
      await downVoteThread(threadId);
      return { threadId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncNeutralVoteThread = createAsyncThunk(
  'threads/neutralVoteThread',
  async ({ threadId, userId }, { rejectWithValue }) => {
    try {
      await neutralVoteThread(threadId);
      return { threadId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncPopulateThreads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncPopulateThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads = action.payload;
      })
      .addCase(asyncPopulateThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(asyncCreateThread.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncCreateThread.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads.unshift(action.payload);
      })
      .addCase(asyncCreateThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(asyncUpVoteThread.pending, (state, action) => {
        const thread = state.threads.find((t) => t.id === action.meta.arg.threadId);
        if (thread) {
          const userId = action.meta.arg.userId;
          if (!thread.upVotesBy.includes(userId)) {
            thread.upVotesBy.push(userId);
          }
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }
      })
      .addCase(asyncUpVoteThread.rejected, (state, action) => {
        const thread = state.threads.find((t) => t.id === action.meta.arg.threadId);
        if (thread) {
          const userId = action.meta.arg.userId;
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        }
      })
      .addCase(asyncDownVoteThread.pending, (state, action) => {
        const thread = state.threads.find((t) => t.id === action.meta.arg.threadId);
        if (thread) {
          const userId = action.meta.arg.userId;
          if (!thread.downVotesBy.includes(userId)) {
            thread.downVotesBy.push(userId);
          }
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        }
      })
      .addCase(asyncDownVoteThread.rejected, (state, action) => {
        const thread = state.threads.find((t) => t.id === action.meta.arg.threadId);
        if (thread) {
          const userId = action.meta.arg.userId;
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }
      })
      .addCase(asyncNeutralVoteThread.pending, (state, action) => {
        const thread = state.threads.find((t) => t.id === action.meta.arg.threadId);
        if (thread) {
          const userId = action.meta.arg.userId;
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }
      });
  },
});

export default threadsSlice.reducer;
