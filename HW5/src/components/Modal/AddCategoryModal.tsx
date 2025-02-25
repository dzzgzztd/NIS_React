import React, { useState } from 'react';
import { AppDispatch } from '../../Store/Store.ts'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../Store/slices/CategorySlice.ts';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSave = async () => {
        if (!name.trim()) {
            setError('Название категории обязательно');
            return;
        }
        try {
            await dispatch(createCategory({ name })).unwrap();
            onClose();
            setName('');
        } catch (err) {
            console.error('Ошибка при создании категории', err);
            setError('Ошибка при создании категории');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Добавить категорию</DialogTitle>
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
                <Button onClick={handleSave} color="primary">Добавить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCategoryModal;
