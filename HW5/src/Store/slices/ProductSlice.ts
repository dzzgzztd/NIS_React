import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Ошибка при загрузке товаров');
        return (await response.json()) as Product[];
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (newProduct: Omit<Product, 'id'>) => {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });
        if (!response.ok) throw new Error('Ошибка при создании товара');
        return (await response.json()) as Product;
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (updatedProduct: Product) => {
        const response = await fetch(`/api/products/${updatedProduct.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        });
        if (!response.ok) throw new Error('Ошибка при обновлении товара');
        return (await response.json()) as Product;
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: string) => {
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Ошибка при удалении товара');
        return id;
    }
);

interface ProductsState {
    products: Product[];
    loading: boolean;
    error?: string;
}

const initialState: ProductsState = {
    products: [],
    loading: false
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        });
        builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) state.products[index] = action.payload;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(p => p.id !== action.payload);
        });
    }
});

export default productsSlice.reducer;
