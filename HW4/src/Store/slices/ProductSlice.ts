import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../types/Product.ts';

interface ProductsState {
    products: Product[];
}

const initialState: ProductsState = {
    products: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        editProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(p => p.id !== action.payload);
        },
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        updateProductsCategory: (state, action: PayloadAction<{ oldName: string; newName: string }>) => {
            state.products = state.products.map(product =>
                product.category === action.payload.oldName
                    ? {...product, category: action.payload.newName}
                    : product
            );
        },
    },
});

export const {addProduct, editProduct, deleteProduct, setProducts, updateProductsCategory} = productsSlice.actions;
export default productsSlice.reducer;
