// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import formRegisterReducer from '../features/registerSlice';
import formLoginReducer from '../features/loginSlice'

const store = configureStore({
  reducer: {
    register: formRegisterReducer,
    login: formLoginReducer
  },
});

export default store;
