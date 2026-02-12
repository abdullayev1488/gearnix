import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slice/uiSlice';
import filterReducer from './slice/filterSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    filter: filterReducer,
  },
});
