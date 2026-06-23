import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const asyncPopulateUsers = createAsyncThunk(
  'users/populateUsers',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { data } = await getAllUsers();
      return data.users;
    } finally {
      dispatch(hideLoading());
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncPopulateUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncPopulateUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(asyncPopulateUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
