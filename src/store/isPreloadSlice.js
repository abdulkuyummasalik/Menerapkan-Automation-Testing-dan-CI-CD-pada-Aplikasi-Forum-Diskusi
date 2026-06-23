import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getOwnProfile } from '../utils/api';
import { setAuthUser } from './authSlice';

const initialState = {
  isPreload: true,
};

export const asyncPreloadProcess = createAsyncThunk(
  'isPreload/asyncPreloadProcess',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { data, error } = await getOwnProfile();
      if (!error && data) {
        dispatch(setAuthUser(data.user));
      } else {
        dispatch(setAuthUser(null));
      }
    } catch {
      dispatch(setAuthUser(null));
    } finally {
      dispatch(hideLoading());
    }
  }
);

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncPreloadProcess.fulfilled, (state) => {
        state.isPreload = false;
      })
      .addCase(asyncPreloadProcess.rejected, (state) => {
        state.isPreload = false;
      });
  },
});

export default isPreloadSlice.reducer;
