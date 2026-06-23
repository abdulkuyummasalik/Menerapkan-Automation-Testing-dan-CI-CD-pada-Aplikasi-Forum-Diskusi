import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDetailThread, createComment, upVoteThread, downVoteThread, neutralVoteThread, upVoteComment, downVoteComment, neutralVoteComment } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const initialState = {
  detailThread: null,
  isLoading: false,
  error: null,
};

export const asyncPopulateDetailThread = createAsyncThunk(
  'threadDetail/populateDetailThread',
  async (threadId, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { data } = await getDetailThread(threadId);
      return data.detailThread;
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncCreateComment = createAsyncThunk(
  'threadDetail/createComment',
  async ({ threadId, content }, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { data } = await createComment({ threadId, content });
      return data.comment;
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncUpVoteThreadDetail = createAsyncThunk(
  'threadDetail/upVoteThread',
  async ({ threadId, userId }, { rejectWithValue }) => {
    try {
      await upVoteThread(threadId);
      return { threadId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDownVoteThreadDetail = createAsyncThunk(
  'threadDetail/downVoteThread',
  async ({ threadId, userId }, { rejectWithValue }) => {
    try {
      await downVoteThread(threadId);
      return { threadId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncNeutralVoteThreadDetail = createAsyncThunk(
  'threadDetail/neutralVoteThread',
  async ({ threadId, userId }, { rejectWithValue }) => {
    try {
      await neutralVoteThread(threadId);
      return { threadId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpVoteCommentDetail = createAsyncThunk(
  'threadDetail/upVoteComment',
  async ({ threadId, commentId, userId }, { rejectWithValue }) => {
    try {
      await upVoteComment({ threadId, commentId });
      return { commentId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDownVoteCommentDetail = createAsyncThunk(
  'threadDetail/downVoteComment',
  async ({ threadId, commentId, userId }, { rejectWithValue }) => {
    try {
      await downVoteComment({ threadId, commentId });
      return { commentId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncNeutralVoteCommentDetail = createAsyncThunk(
  'threadDetail/neutralVoteComment',
  async ({ threadId, commentId, userId }, { rejectWithValue }) => {
    try {
      await neutralVoteComment({ threadId, commentId });
      return { commentId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    clearDetailThread: (state) => {
      state.detailThread = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncPopulateDetailThread.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncPopulateDetailThread.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailThread = action.payload;
      })
      .addCase(asyncPopulateDetailThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(asyncCreateComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncCreateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.detailThread) {
          state.detailThread.comments.unshift(action.payload);
        }
      })
      .addCase(asyncCreateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(asyncUpVoteThreadDetail.pending, (state, action) => {
        if (state.detailThread) {
          const userId = action.meta.arg.userId;
          if (!state.detailThread.upVotesBy.includes(userId)) {
            state.detailThread.upVotesBy.push(userId);
          }
          state.detailThread.downVotesBy = state.detailThread.downVotesBy.filter((id) => id !== userId);
        }
      })
      .addCase(asyncDownVoteThreadDetail.pending, (state, action) => {
        if (state.detailThread) {
          const userId = action.meta.arg.userId;
          if (!state.detailThread.downVotesBy.includes(userId)) {
            state.detailThread.downVotesBy.push(userId);
          }
          state.detailThread.upVotesBy = state.detailThread.upVotesBy.filter((id) => id !== userId);
        }
      })
      .addCase(asyncNeutralVoteThreadDetail.pending, (state, action) => {
        if (state.detailThread) {
          const userId = action.meta.arg.userId;
          state.detailThread.upVotesBy = state.detailThread.upVotesBy.filter((id) => id !== userId);
          state.detailThread.downVotesBy = state.detailThread.downVotesBy.filter((id) => id !== userId);
        }
      })
      .addCase(asyncUpVoteCommentDetail.pending, (state, action) => {
        if (state.detailThread) {
          const comment = state.detailThread.comments.find((c) => c.id === action.meta.arg.commentId);
          if (comment) {
            const userId = action.meta.arg.userId;
            if (!comment.upVotesBy.includes(userId)) {
              comment.upVotesBy.push(userId);
            }
            comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
          }
        }
      })
      .addCase(asyncDownVoteCommentDetail.pending, (state, action) => {
        if (state.detailThread) {
          const comment = state.detailThread.comments.find((c) => c.id === action.meta.arg.commentId);
          if (comment) {
            const userId = action.meta.arg.userId;
            if (!comment.downVotesBy.includes(userId)) {
              comment.downVotesBy.push(userId);
            }
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          }
        }
      })
      .addCase(asyncNeutralVoteCommentDetail.pending, (state, action) => {
        if (state.detailThread) {
          const comment = state.detailThread.comments.find((c) => c.id === action.meta.arg.commentId);
          if (comment) {
            const userId = action.meta.arg.userId;
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
            comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
          }
        }
      });
  },
});

export const { clearDetailThread } = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
