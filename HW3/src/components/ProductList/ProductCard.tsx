import React from 'react';
import { Card, CardContent, CardMedia, Typography, Tooltip, Box } from '@mui/material';
import { Product } from '../../types/Product';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

// Интерфейс для пропсов карточки товара
interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <Tooltip title={product.description} placement="top" arrow>
            <Card
                onClick={() => onClick(product)} // Обработчик клика
                sx={{
                    width: '100%',
                    maxWidth: 300,
                    margin: 'auto',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)', // Анимация при наведении
                    },
                }}
            >
                {/* Изображение товара или заглушка */}
                {product.image ? (
                    <CardMedia
                        component="img"
                        height="270"
                        image={product.image}
                        alt={product.name}
                    />
                ) : (
                    <Box
                        sx={{
                            height: '270px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f0f0f0',
                        }}
                    >
                        <ImageNotSupportedIcon sx={{ fontSize: 60, color: '#bdbdbd' }} />
                    </Box>
                )}
                <CardContent>
                    {/* Название товара */}
                    <Typography
                        variant="h6"
                        component="div"
                        noWrap
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {product.name}
                    </Typography>
                    {/* Категория товара */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {product.category}
                    </Typography>
                    {/* Количество товара */}
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                        {product.quantity} {product.unit}
                    </Typography>
                </CardContent>
            </Card>
        </Tooltip>
    );
};

export default ProductCard;
