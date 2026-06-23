import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from './authSlice';
import threadsReducer from './threadsSlice';
import threadDetailReducer from './threadDetailSlice';
import leaderboardsReducer from './leaderboardsSlice';
import usersReducer from './usersSlice';
import categoryFilterReducer from './categoryFilterSlice';
import isPreloadReducer from './isPreloadSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    users: usersReducer,
    categoryFilter: categoryFilterReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
