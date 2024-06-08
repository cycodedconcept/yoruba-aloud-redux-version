import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDashboardData = createAsyncThunk(
  'api/fetchDashboardData',
  async ({ token, customHeaders }) => {
    const response = await axios.get('https://accosmart.com.ng/yorubalearning/api/admin/admin_dashboardapi', {
      headers: {
        Authorization: `Bearer ${token}`,
        ...customHeaders,
      },
    });
    return response.data;
  }
);

// Second API call
export const fetchTopThreeData = createAsyncThunk(
  'api/fetchTopThreeData',
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

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    dashboardData: {},
    topThreeData: [],
    dashboardStatus: 'idle',
    topThreeStatus: 'idle',
    mode: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.dashboardStatus = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.dashboardStatus = 'succeeded';
        state.dashboardData = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.dashboardStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTopThreeData.pending, (state) => {
        state.topThreeStatus = 'loading';
        state.mode = false;
      })
      .addCase(fetchTopThreeData.fulfilled, (state, action) => {
        state.topThreeStatus = 'succeeded';
        state.topThreeData = action.payload;
        state.mode = false;
      })
      .addCase(fetchTopThreeData.rejected, (state, action) => {
        state.topThreeStatus = 'failed';
        state.error = action.error.message;
        state.mode = false;
      });
  },
});

export default apiSlice.reducer;
