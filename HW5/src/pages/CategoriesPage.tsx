import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Store/Store';
import { Category } from '../types/Category';
import { deleteCategory, fetchCategories } from '../Store/slices/CategorySlice';
import { Button, Container, List, ListItem, ListItemText, IconButton, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCategoryModal from '../components/Modal/AddCategoryModal';
import EditCategoryModal from '../components/Modal/EditCategoryModal';

const CategoriesPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: RootState) => state.categories);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [editCategoryItem, setEditCategoryItem] = useState<Category | null>(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = async (categoryId: string) => {
        try {
            await dispatch(deleteCategory(categoryId)).unwrap();
        } catch (_err) {
            alert(`Невозможно удалить категорию`);
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                <Typography variant="h4">Категории</Typography>
                <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
                    Добавить категорию
                </Button>
            </Box>
            <List>
                {categories.map((category) => (
                    <ListItem key={category.id} sx={{ borderBottom: '1px solid #ddd' }}>
                        <ListItemText primary={category.name} />
                        <IconButton color="primary" onClick={() => setEditCategoryItem(category)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(category.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            {isAddModalOpen && (
                <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
            )}
            {editCategoryItem && (
                <EditCategoryModal category={editCategoryItem} isOpen={true} onClose={() => setEditCategoryItem(null)} />
            )}
        </Container>
    );
};

export default CategoriesPage;
