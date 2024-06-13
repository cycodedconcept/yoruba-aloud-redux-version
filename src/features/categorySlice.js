import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const catForm = createAsyncThunk(
  'category/postCategoryData',
  async ({ formData, token, customHeaders }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://accosmart.com.ng/yorubalearning/api/admin/create_category',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...customHeaders,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCatData = createAsyncThunk(
  'category/getCategoryData',
  async ({ token, customHeaders }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://accosmart.com.ng/yorubalearning/api/admin/category_list',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...customHeaders,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const catSlice = createSlice({
  name: 'cat',
  initialState: {
    name: '',
    image: '',
    categoryData: {},
    getCategoryData: [],
    categoryStatus: 'idle',
    getCategoryStatus: 'idle',
    spinItem: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(catForm.pending, (state) => {
        state.categoryStatus = 'loading';
        state.spinItem = true;
      })
      .addCase(catForm.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.categoryData = action.payload;
        state.spinItem = false;
      })
      .addCase(catForm.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
        state.spinItem = false;
      })
      .addCase(getCatData.pending, (state) => {
        state.getCategoryStatus = 'loading';
      })
      .addCase(getCatData.fulfilled, (state, action) => {
        state.getCategoryStatus = 'succeeded';
        state.getCategoryData = action.payload;
      })
      .addCase(getCatData.rejected, (state, action) => {
        state.getCategoryStatus = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export default catSlice.reducer;
