import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    items: JSON.parse(localStorage.getItem('wishlist')) || [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action) => {
            const product = action.payload;
            const index = state.items.findIndex(item => item._id === product._id);

            if (index >= 0) {
                state.items.splice(index, 1);
                toast.error(`"${product.name}" removed from wishlist`);
            } else {
                state.items.push(product);
                toast.success(`"${product.name}" added to wishlist!`);
            }

            localStorage.setItem('wishlist', JSON.stringify(state.items));
        },
    },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
