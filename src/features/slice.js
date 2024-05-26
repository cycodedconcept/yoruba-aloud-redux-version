// src/features/exampleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'example',
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = slice.actions;
export default slice.reducer;
