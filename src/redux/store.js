import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '@/redux/slice/uiSlice';
import filterReducer from '@/redux/slice/filterSlice';
import basketReducer from '@/redux/slice/basketSlice';
import wishlistReducer from '@/redux/slice/wishlistSlice';
import compareReducer from '@/redux/slice/compareSlice';
import authReducer from '@/redux/slice/authSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    filter: filterReducer,
    basket: basketReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    auth: authReducer,
  },
});
