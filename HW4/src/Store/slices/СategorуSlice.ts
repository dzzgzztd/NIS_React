import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../types/Product.ts';

export interface Category {
    id: number;
    name: string;
}

interface CategoriesState {
    categories: Category[];
}

const initialState: CategoriesState = {
    categories: [],
};

const ategorSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        },
        editCategory: (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex(cat => cat.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        deleteCategory: (state, action: PayloadAction<number>) => {
            state.categories = state.categories.filter(cat => cat.id !== action.payload);
        },
        // Экшен, который извлекает уникальные категории из товаров
        setCategoriesFromProducts: (state, action: PayloadAction<Product[]>) => {
            const uniqueCategories = Array.from(
                new Set(
                    action.payload.map(product => product.category || "Без категории")
                )
            ).map((name, index) => ({id: index + 1, name: name as string}));

            state.categories = uniqueCategories;
        },

    },
});

export const {addCategory, editCategory, deleteCategory, setCategoriesFromProducts} = ategorSlice.actions;
export default ategorSlice.reducer;
