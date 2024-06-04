import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    error: null,
    success: 'idle',
    data: {}
};



export const dashboardItem = createAsyncThunk(
    'dashboard',
    async ({ token, customHeaders, rejectWithValue }) => {
        try {
            const response = await axios.get('https://accosmart.com.ng/yorubalearning/api/admin/admin_dashboardapi', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ...customHeaders,
                },
            });
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboard: (state, action) => {
            state[action.payload.field] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(dashboardItem.pending, (state) => {
            state.error = null
        })
        .addCase(dashboardItem.fulfilled, (state, action) => {
            state.success = 'succeeded';
            state.data = action.payload;
        })
        .addCase(dashboardItem.rejected, (state, action) => {
            state.success = 'failed';
            state.error = action.payload;
        });
    }
})

export const { setDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;