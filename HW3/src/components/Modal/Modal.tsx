import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Product } from '../../types/Product';

// Интерфейс для пропсов модального окна
interface ModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ product, isOpen, onClose }) => {
    // Если товар не передан, не рендерим модальное окно
    if (!product) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{product.name}</DialogTitle> {/* Заголовок с названием товара */}
            <DialogContent dividers>
                {/* Изображение товара (если доступно) */}
                {product.image && (
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', marginBottom: '20px' }}
                    />
                )}
                {/* Описание товара */}
                <Typography variant="body1" gutterBottom>
                    {product.description}
                </Typography>
                {/* Категория товара */}
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Категория: {product.category}
                </Typography>
                {/* Количество товара */}
                <Typography variant="body1">
                    Количество: {product.quantity} {product.unit}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
