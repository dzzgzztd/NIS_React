import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../Store/Store';
import { updateProduct } from '../../Store/slices/ProductSlice';
import { Product } from '../../types/Product';

interface EditProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, isOpen, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) =>
        Array.from(new Set(state.products.products.map((p) => p.category)))
    );

    const [editedProduct, setEditedProduct] = useState(product);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await dispatch(updateProduct(editedProduct)).unwrap();
            onClose();
        } catch (err) {
            console.error('Ошибка при обновлении товара', err);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Редактирование товара</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Название"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Описание"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                />
                <TextField
                    fullWidth
                    label="Количество"
                    type="number"
                    name="quantity"
                    value={editedProduct.quantity}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Цена"
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    select
                    label="Категория"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleChange}
                    margin="normal"
                >
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    label="Ссылка на изображение"
                    name="image"
                    value={editedProduct.image || ''}
                    onChange={handleChange}
                    margin="normal"
                />
                {editedProduct.image && (
                    <img
                        src={editedProduct.image}
                        alt="Предпросмотр"
                        style={{ width: '100%', maxHeight: 250, objectFit: 'contain', marginTop: 10 }}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Отмена</Button>
                <Button onClick={handleSave} color="primary">Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductModal;
