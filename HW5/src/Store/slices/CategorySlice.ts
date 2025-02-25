import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types/Category';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Ошибка при загрузке категорий');
        return (await response.json()) as Category[];
    }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (newCategory: Omit<Category, 'id'>) => {
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCategory)
        });
        if (!response.ok) throw new Error('Ошибка при создании категории');
        return (await response.json()) as Category;
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async (updatedCategory: Category) => {
        const response = await fetch(`/api/categories/${updatedCategory.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCategory)
        });
        if (!response.ok) throw new Error('Ошибка при обновлении категории');
        return (await response.json()) as Category;
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id: string) => {
        const response = await fetch(`/api/categories/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Ошибка при удалении категории');
        return id;
    }
);

interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error?: string;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        });
        builder.addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex(c => c.id === action.payload.id);
            if (index !== -1) state.categories[index] = action.payload;
        });
        builder.addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter(c => c.id !== action.payload);
        });
    }
});

export default categoriesSlice.reducer;
