// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import formRegisterReducer from '../features/registerSlice';
import formLoginReducer from '../features/loginSlice';
import apiReducer from '../features/dashboardSlice';
import catReducer from '../features/categorySlice'

const store = configureStore({
  reducer: {
    register: formRegisterReducer,
    login: formLoginReducer,
    api: apiReducer,
    cat: catReducer
  },
});

export default store;
