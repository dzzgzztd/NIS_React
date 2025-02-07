import React from 'react';
import ProductList from '../components/ProductList/ProductList';
import { Container, Box, Typography } from '@mui/material';
import { Product } from "../types/Product.ts";

const ProductListPage: React.FC<{ products: Product[] }> = ({ products }) => {
    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                <Typography variant="h4">Товары</Typography>
            </Box>

            <ProductList products={products} onCardClick={() => {}} />
        </Container>
    );
};

export default ProductListPage;
