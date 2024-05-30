// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import formRegisterReducer from '../features/registerSlice';

const store = configureStore({
  reducer: {
    form: formRegisterReducer,
  },
});

export default store;
