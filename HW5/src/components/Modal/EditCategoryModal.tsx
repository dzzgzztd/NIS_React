import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Store/Store.ts';
import { updateCategory } from '../../Store/slices/CategorySlice.ts';
import { fetchProducts } from '../../Store/slices/ProductSlice';

interface EditCategoryModalProps {
    category: { id: string; name: string };
    isOpen: boolean;
    onClose: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ category, isOpen, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState(category.name);
    const [error, setError] = useState('');

    const handleSave = async () => {
        if (!name.trim()) {
            setError('Название категории обязательно');
            return;
        }
        try {
            await dispatch(updateCategory({ id: category.id, name })).unwrap();
            dispatch(fetchProducts());
            onClose();
        } catch (err) {
            console.error('Ошибка при обновлении категории', err);
            setError('Ошибка при обновлении категории');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Редактировать категорию</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Название категории"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!error}
                    helperText={error}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Отмена</Button>
                <Button onClick={handleSave} color="primary">Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCategoryModal;
