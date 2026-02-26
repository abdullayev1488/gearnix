import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    items: JSON.parse(localStorage.getItem('basket')) || [],
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { product, quantity = 1 } = action.payload;
            const existingItem = state.items.find(item => item._id === product._id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ ...product, quantity });
            }

            localStorage.setItem('basket', JSON.stringify(state.items));
            toast.success(`"${product.name}" added to basket!`);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            localStorage.setItem('basket', JSON.stringify(state.items));
            toast.error('Item removed from basket');
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                state.items = state.items.filter(item => item._id !== id);
                localStorage.setItem('basket', JSON.stringify(state.items));
                toast.error('Item removed from basket');
                return;
            }

            const item = state.items.find(item => item._id === id);
            if (item) {
                item.quantity = quantity;
                localStorage.setItem('basket', JSON.stringify(state.items));
            }
        },
        clearBasket: (state) => {
            state.items = [];
            localStorage.removeItem('basket');
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
