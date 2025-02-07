import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './slices/ProductSlice.ts';
import categoriesReducer from './slices/СategorуSlice.ts';
import userReducer from "./slices/UserSlice.ts";
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
