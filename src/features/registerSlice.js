import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  spinItem: false,
  error: null,
  success: false,
  data: []
};

export const submitForm = createAsyncThunk(
  'register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://accosmart.com.ng/yorubalearning/api/register_admin', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const formRegisterSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegisterFormData: (state, action) => {
      state[action.payload.field] = action.payload.value;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(submitForm.pending, (state) => {
        state.spinItem = true;
        state.error = null;
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
  },
});

export const { setRegisterFormData } = formRegisterSlice.actions;
export default formRegisterSlice.reducer;
