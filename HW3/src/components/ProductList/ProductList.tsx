import React, { useState } from 'react';
import { Product } from '../../types/Product';
import ProductCard from './ProductCard';
import { Pagination } from '@mui/material';
import { styled } from '@mui/system';

// Стилизованный контейнер для карточек
const GridContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
    width: 100%;
    margin: 64px auto 0; /* Отступ сверху для учёта NavigationBar */
    max-width: 1200px;
`;

const PaginationContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

// Интерфейс пропсов для списка товаров
interface ProductListProps {
    products: Product[];
    onCardClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onCardClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Обновление текущей страницы
    const handlePageChange = (_: unknown, page: number) => {
        setCurrentPage(page);
    };

    // Отображаемые товары на текущей странице
    const displayedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            {/* Сетка карточек товаров */}
            <GridContainer>
                {displayedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={onCardClick}
                    />
                ))}
            </GridContainer>
            {/* Пагинация */}
            <PaginationContainer>
                <Pagination
                    count={Math.ceil(products.length / itemsPerPage)} // Количество страниц
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </PaginationContainer>
        </>
    );
};

export default ProductList;
