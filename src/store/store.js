// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import formRegisterReducer from '../features/registerSlice';
import formLoginReducer from '../features/loginSlice';
import dashboardReducer from '../features/dashboardSlice';

const store = configureStore({
  reducer: {
    register: formRegisterReducer,
    login: formLoginReducer,
    dashboard: dashboardReducer
  },
});

export default store;
