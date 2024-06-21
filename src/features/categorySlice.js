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

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async ({ id, token, customHeaders }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://accosmart.com.ng/yorubalearning/api/admin/delete_category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...customHeaders,
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ formData, category_id, token, customHeaders }, { rejectWithValue }) => {
    try {
      // Add category_id to formData
      formData.append('category_id', category_id);
      const response = await axios.post(
        `https://accosmart.com.ng/yorubalearning/api/admin/update_category`, 
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


const catSlice = createSlice({
  name: 'cat',
  initialState: {
    name: '',
    image: '',
    categoryData: {},
    getCategoryData: [],
    categoryStatus: 'idle',
    getCategoryStatus: 'idle',
    deleteCategoryStatus: 'idle',
    updateCategoryStatus: 'idle',
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
      })
      .addCase(deleteCategory.pending, (state) => {
        state.deleteCategoryStatus = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteCategoryStatus = 'succeeded';
        state.getCategoryData = state.getCategoryData.filter(category => category.id !== action.meta.arg.id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteCategoryStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.updateCategoryStatus = 'loading';
        state.spinItem = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updateCategoryStatus = 'succeeded';
        const updatedCategory = action.payload;
        state.getCategoryData = state.getCategoryData.map(category => 
          category.id === updatedCategory.id ? updatedCategory : category
        );
        state.spinItem = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.updateCategoryStatus = 'failed';
        state.error = action.error.message;
        state.spinItem = false;
      });
  },
});

export default catSlice.reducer;
