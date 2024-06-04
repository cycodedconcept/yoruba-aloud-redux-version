import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    email: '',
    password: '',
    spinItem: false,
    error: null,
    success: false,
    data: []
};

export const submitForm = createAsyncThunk(
    'login',
    async (formData, { rejectWithValue}) => {
        try {
            const response = await axios.post('https://accosmart.com.ng/yorubalearning/api/admin_login', formData);
            localStorage.setItem("key", response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const formLoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginFormData: (state, action) => {
          state[action.payload.field] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(submitForm.pending, (state) => {
            state.spinItem = true;
            state.error = null
        })
        .addCase(submitForm.fulfilled, (state, action) => {
            state.spinItem = false;
            state.success = true;
            state.data = action.payload
        })
        .addCase(submitForm.rejected, (state, action) => {
            state.spinItem = false;
            state.error = action.payload;
        });
    }
})

export const { setLoginFormData } = formLoginSlice.actions;
export default formLoginSlice.reducer;