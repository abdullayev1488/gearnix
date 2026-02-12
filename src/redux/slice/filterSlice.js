import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: {
        category: null,
        priceRange: [0, 500],
        brands: [],
        rating: null,
        colors: [],
    },
    sortBy: 'default',
    viewType: 'grid-3', // 'grid-3', 'grid-2' or 'list'
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.filters.category = action.payload;
        },
        setPriceRange: (state, action) => {
            state.filters.priceRange = action.payload;
        },
        toggleBrand: (state, action) => {
            const brand = action.payload;
            if (state.filters.brands.includes(brand)) {
                state.filters.brands = state.filters.brands.filter(b => b !== brand);
            } else {
                state.filters.brands.push(brand);
            }
        },
        setRating: (state, action) => {
            state.filters.rating = action.payload;
        },
        toggleColor: (state, action) => {
            const color = action.payload;
            if (state.filters.colors.includes(color)) {
                state.filters.colors = state.filters.colors.filter(c => c !== color);
            } else {
                state.filters.colors.push(color);
            }
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setViewType: (state, action) => {
            state.viewType = action.payload;
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
    },
});

export const {
    setCategory,
    setPriceRange,
    toggleBrand,
    setRating,
    toggleColor,
    setSortBy,
    setViewType,
    resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
