import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/ProductSlice';
import categoriesReducer from './slices/CategorySlice.ts';
import userReducer from "./slices/UserSlice";
import loggerMiddleware from './LoggerMiddleware';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
