import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {addProduct} from '../../Store/slices/ProductSlice.ts';
import {Product} from '../../types/Product';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({isOpen, onClose}) => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) =>
        Array.from(new Set(state.products.products.map((p) => p.category)))
    );

    const [newProduct, setNewProduct] = useState<Product>({
        id: Date.now(), // Генерация уникального ID
        name: '',
        description: '',
        category: '',
        quantity: 0,
        unit: 'шт', // По умолчанию единица измерения
        price: 0,
        image: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!newProduct.name) newErrors.name = 'Название обязательно';
        if (!newProduct.description) newErrors.description = 'Описание обязательно';
        if (!newProduct.category) newErrors.category = 'Категория обязательна';
        if (newProduct.quantity <= 0) newErrors.quantity = 'Количество должно быть больше 0';
        if (newProduct.price <= 0) newErrors.price = 'Цена должна быть больше 0';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({...newProduct, [e.target.name]: e.target.value});
    };

    const handleSave = () => {
        if (!validate()) return;
        dispatch(addProduct(newProduct));
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Добавить новый товар</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Название"
                    name="name"
                    value={newProduct.name}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    fullWidth
                    label="Описание"
                    name="description"
                    value={newProduct.description}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    fullWidth
                    select
                    label="Категория"
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.category}
                    helperText={errors.category}
                >
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    label="Количество"
                    type="number"
                    name="quantity"
                    value={newProduct.quantity}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.quantity}
                    helperText={errors.quantity}
                />
                <TextField
                    fullWidth
                    label="Цена"
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.price}
                    helperText={errors.price}
                />
                <TextField
                    fullWidth
                    label="Ссылка на изображение"
                    name="image"
                    value={newProduct.image}
                    onChange={handleChange}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Отмена</Button>
                <Button onClick={handleSave} color="primary">Добавить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductModal;
