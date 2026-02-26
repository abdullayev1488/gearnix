import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slice/uiSlice';
import filterReducer from './slice/filterSlice';
import basketReducer from './slice/basketSlice';
import wishlistReducer from './slice/wishlistSlice';
import compareReducer from './slice/compareSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    filter: filterReducer,
    basket: basketReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
  },
});
