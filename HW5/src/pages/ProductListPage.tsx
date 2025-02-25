import React, { useState } from 'react';
import ProductList from '../components/ProductList/ProductList';
import { Container, Box, Typography, Button } from '@mui/material';
import AddProductModal from '../components/Modal/AddProductModal';
import { Product } from "../types/Product";

const ProductListPage: React.FC<{ products: Product[] }> = ({ products }) => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                <Typography variant="h4">Товары</Typography>
                <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
                    Добавить товар
                </Button>
            </Box>

            <ProductList products={products} onCardClick={() => {}} />

            {isAddModalOpen && (
                <AddProductModal
                    isOpen={isAddModalOpen}
                    onClose={() => setAddModalOpen(false)}
                />
            )}
        </Container>
    );
};

export default ProductListPage;
