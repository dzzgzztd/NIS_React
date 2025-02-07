import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Store/Store';
import { Category, deleteCategory, setCategoriesFromProducts } from '../Store/slices/СategorуSlice.ts';
import { Button, Container, List, ListItem, ListItemText, IconButton, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCategoryModal from '../components/Modal/AddCategoryModal';
import EditCategoryModal from '../components/Modal/EditCategoryModal';

const CategoriesPage: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const products = useSelector((state: RootState) => state.products.products);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    useEffect(() => {
        dispatch(setCategoriesFromProducts(products));
    }, [dispatch, products]);

    const handleDelete = (categoryId: number) => {
        const categoryName = categories.find(cat => cat.id === categoryId)?.name;
        if (products.some(product => product.category === categoryName)) {
            alert(`Невозможно удалить категорию "${categoryName}", так как в ней есть товары.`);
            return;
        }

        dispatch(deleteCategory(categoryId));
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 15}}>
                <Typography variant="h4">Категории</Typography>
                <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
                    Добавить категорию
                </Button>
            </Box>

            <List>
                {categories.map((category) => (
                    <ListItem key={category.id} sx={{ borderBottom: '1px solid #ddd' }}>
                        <ListItemText primary={category.name} />
                        <IconButton color="primary" onClick={() => setEditCategory(category)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(category.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            {/* Модальное окно добавления категории */}
            {isAddModalOpen && <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />}

            {/* Модальное окно редактирования категории */}
            {editCategory && <EditCategoryModal category={editCategory} isOpen={!!editCategory} onClose={() => setEditCategory(null)} />}
        </Container>
    );
};

export default CategoriesPage;
