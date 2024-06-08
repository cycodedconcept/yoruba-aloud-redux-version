// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import formRegisterReducer from '../features/registerSlice';
import formLoginReducer from '../features/loginSlice';
import apiReducer from '../features/dashboardSlice';

const store = configureStore({
  reducer: {
    register: formRegisterReducer,
    login: formLoginReducer,
    api: apiReducer
  },
});

export default store;
