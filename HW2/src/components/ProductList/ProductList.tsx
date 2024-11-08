import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types/Product';
import '../../styles/ProductList.css'

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const handleCardClick = (product: Product) => {
        console.log('Вы кликнули на товар:', product.name);
    };

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={handleCardClick}
                />
            ))}
        </div>
    );
};

export default ProductList;
