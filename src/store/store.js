// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from '../features/slice'

const store = configureStore({
  reducer: {
    example: sliceReducer,
  },
});

export default store;
