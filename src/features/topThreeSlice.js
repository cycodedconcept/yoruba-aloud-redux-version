import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const topThree = createAsyncThunk(
  'topThree/fetchTopThree',
  async ({ token, customHeaders }) => {
    const response = await axios.get('https://accosmart.com.ng/yorubalearning/api/admin/top_three_students', {
      headers: {
        Authorization: `Bearer ${token}`,
        ...customHeaders,
      },
    });
    return response.data;
  }
);

const topThreeSlice = createSlice({
  name: 'topThree',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    show: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topThree.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(topThree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.show = true;
      })
      .addCase(topThree.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.show = false;
      });
  },
});

export default topThreeSlice.reducer;
