import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: null,
};

const categoryFilterSlice = createSlice({
  name: 'categoryFilter',
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCategoryFilter } = categoryFilterSlice.actions;
export default categoryFilterSlice.reducer;
