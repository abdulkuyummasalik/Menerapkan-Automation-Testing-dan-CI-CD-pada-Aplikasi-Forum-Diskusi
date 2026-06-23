import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderboards } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const initialState = {
  leaderboards: [],
  isLoading: false,
  error: null,
};

export const asyncPopulateLeaderboards = createAsyncThunk(
  'leaderboards/populateLeaderboards',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { data } = await getLeaderboards();
      return data.leaderboards;
    } finally {
      dispatch(hideLoading());
    }
  },
);

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncPopulateLeaderboards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncPopulateLeaderboards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaderboards = action.payload;
      })
      .addCase(asyncPopulateLeaderboards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default leaderboardsSlice.reducer;
