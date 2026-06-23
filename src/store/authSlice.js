import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, register as registerApi, getOwnProfile, putAccessToken } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const asyncSetAuthUser = createAsyncThunk(
  'auth/setAuthUser',
  async ({ email, password }, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { error, data } = await loginApi({ email, password });
      if (!error) {
        putAccessToken(data.token);
        const { data: profileData } = await getOwnProfile();
        return profileData.user;
      }
      throw new Error('Login failed');
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncRegisterUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { dispatch }) => {
    dispatch(showLoading());
    try {
      const { error } = await registerApi({ name, email, password });
      if (!error) {
        return dispatch(asyncSetAuthUser({ email, password }));
      }
      throw new Error('Registration failed');
    } finally {
      dispatch(hideLoading());
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    unsetAuthUser: (state) => {
      state.user = null;
      putAccessToken('');
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetAuthUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncSetAuthUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(asyncSetAuthUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(asyncRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncRegisterUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { unsetAuthUser, setAuthUser } = authSlice.actions;
export default authSlice.reducer;
