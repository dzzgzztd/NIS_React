import React from 'react';
import {Card, CardContent, CardMedia, Typography, Tooltip, Box} from '@mui/material';
import {Product} from '../../types/Product';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {useNavigate} from 'react-router-dom';

// Интерфейс для пропсов карточки товара
interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const navigate = useNavigate();

    return (
        <Tooltip title={product.description} placement="top" arrow>
            <Card
                onClick={() => navigate(`/products/${product.id}`)}
                sx={{
                    width: '100%',
                    maxWidth: 300,
                    minHeight: 430,
                    margin: 'auto',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
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
                        <ImageNotSupportedIcon sx={{fontSize: 60, color: '#bdbdbd'}}/>
                    </Box>
                )}
                <CardContent>
                    <Typography variant="h5" noWrap>{product.name}</Typography>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}} noWrap>
                        {product.price} ₽
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>{product.category}</Typography>
                    <Typography variant="body1" sx={{marginTop: 1}}>
                        {product.quantity} {product.unit}
                    </Typography>
                </CardContent>
            </Card>
        </Tooltip>
    );
};

export default ProductCard;
