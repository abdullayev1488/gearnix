import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    items: JSON.parse(localStorage.getItem('compare')) || [],
};

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        toggleCompare: (state, action) => {
            const product = action.payload;
            const index = state.items.findIndex(item => item._id === product._id);

            if (index >= 0) {
                state.items.splice(index, 1);
                toast.error(`"${product.name}" removed from comparison`);
            } else {
                if (state.items.length >= 4) {
                    toast.error('You can only compare up to 4 items.');
                    return;
                }
                state.items.push(product);
                toast.success(`"${product.name}" added to comparison!`);
            }

            localStorage.setItem('compare', JSON.stringify(state.items));
        },
        clearCompare: (state) => {
            state.items = [];
            localStorage.removeItem('compare');
        },
    },
});

export const { toggleCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
