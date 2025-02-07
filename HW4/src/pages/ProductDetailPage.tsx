    import React, {useState} from 'react';
    import {useParams, useNavigate} from 'react-router-dom';
    import {useSelector, useDispatch} from 'react-redux';
    import {RootState} from '../Store/Store';
    import {deleteProduct} from '../Store/slices/ProductSlice.ts';
    import {Button, Typography, Container, Box, Grid, Paper} from '@mui/material';
    import EditProductModal from '../components/Modal/EditProductModal';
    import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

    const ProductDetailPage: React.FC = () => {
        const {id} = useParams<{ id: string }>();
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const [isEditModalOpen, setEditModalOpen] = useState(false);

        const product = useSelector((state: RootState) =>
            state.products.products.find((p) => p.id === Number(id))
        );

        if (!product) return <Typography>Товар не найден</Typography>;

        const handleDelete = () => {
            dispatch(deleteProduct(product.id));
            navigate('/');
        };

        return (
            <Container
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh', marginTop: 4}}>
                <Paper elevation={4} sx={{padding: 4, width: '100%', maxWidth: 1000}}>
                    <Grid container spacing={6} alignItems="center">
                        {/* Изображение товара */}
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: product.image ? 'transparent' : '#f0f0f0',
                                    borderRadius: 2,
                                }}
                            >
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '100%',
                                            maxHeight: '500px',
                                            objectFit: 'contain',
                                            borderRadius: 10,
                                        }}
                                    />
                                ) : (
                                    <ImageNotSupportedIcon sx={{fontSize: 120, color: '#bdbdbd'}}/>
                                )}
                            </Box>
                        </Grid>

                        {/* Правая колонка - информация о товаре */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" sx={{fontWeight: 'bold', marginBottom: 2}}>
                                {product.name}
                            </Typography>
                            <Typography variant="h6" sx={{marginBottom: 2}}>
                                {product.description}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{marginBottom: 2}}>
                                <strong>Категория:</strong> {product.category || "Без категории"}
                            </Typography>
                            <Typography variant="h5" sx={{fontWeight: 'bold', marginBottom: 2}}>
                                <strong>Количество:</strong> {product.quantity} {product.unit}
                            </Typography>
                            <Typography variant="h4" sx={{color: 'green', fontWeight: 'bold', marginBottom: 3}}>
                                {product.price} ₽
                            </Typography>

                            {/* Кнопки */}
                            <Box sx={{display: 'flex', gap: 2}}>
                                <Button variant="contained" color="primary" onClick={() => setEditModalOpen(true)}>
                                    Редактировать
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={handleDelete}>
                                    Удалить
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Модальное окно редактирования */}
                    <EditProductModal
                        product={product}
                        isOpen={isEditModalOpen}
                        onClose={() => setEditModalOpen(false)}
                    />
                </Paper>
            </Container>
        );
    };

    export default ProductDetailPage;
