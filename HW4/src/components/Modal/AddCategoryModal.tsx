import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {addCategory} from '../../Store/slices/СategorуSlice.ts';
import {v4 as uuidv4} from 'uuid';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const generateNumericId = () => {
    return parseInt(uuidv4().replace(/\D/g, '').slice(0, 12), 10);
};

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({isOpen, onClose}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!name.trim()) {
            setError('Название категории обязательно');
            return;
        }

        dispatch(addCategory({id: generateNumericId(), name}));
        onClose();
        setName('');
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
