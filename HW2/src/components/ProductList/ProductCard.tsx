import React from 'react';
import '../../styles/ProductCard.css'
import { Product } from '../../types/Product';


interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <div className="product-card" onClick={() => onClick(product)}>
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">
                {product.description.length > 100 ? `${product.description.substring(0, 97)}...` : product.description}
            </p>
            <p className="product-category">{product.category}</p>
            <p className="product-quantity">
                {product.quantity} {product.unit}
            </p>
            {product.image ? (
                <img src={product.image} alt={product.name} className="product-image" />
            ) : (
                <p className="no-image">Нет изображения</p>
            )}
        </div>
    );
};

export default ProductCard;
