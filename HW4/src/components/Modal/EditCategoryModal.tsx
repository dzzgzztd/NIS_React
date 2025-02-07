import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {editCategory} from '../../Store/slices/СategorуSlice.ts';
import {updateProductsCategory} from '../../Store/slices/ProductSlice.ts';

interface EditCategoryModalProps {
    category: { id: number; name: string };
    isOpen: boolean;
    onClose: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({category, isOpen, onClose}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(category.name);
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!name.trim()) {
            setError('Название категории обязательно');
            return;
        }

        dispatch(editCategory({id: category.id, name}));
        dispatch(updateProductsCategory({oldName: category.name, newName: name}));

        onClose();
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
