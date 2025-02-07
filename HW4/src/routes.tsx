import React from 'react';
import {Routes, Route} from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import UserProfilePage from './pages/UserProfilePage';
import {Product} from "./types/Product.ts";

const AppRoutes: React.FC<{ filteredProducts: Product[] }> = ({filteredProducts}) => {
    return (
        <Routes>
            <Route path="/" element={<ProductListPage products={filteredProducts}/>}/>
            <Route path="/products/:id" element={<ProductDetailPage/>}/>
            <Route path="/categories" element={<CategoriesPage/>}/>
            <Route path="/profile" element={<UserProfilePage/>}/>
        </Routes>
    );
};

export default AppRoutes;
