import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './Store/Store';
import { fetchProducts } from './Store/slices/ProductSlice';
import { fetchCategories } from './Store/slices/CategorySlice';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Sidebar, { Filters } from './components/NavigationBar/Sidebar';
import AppRoutes from './routes';
import theme from './theme/theme';
import { Product } from "./types/Product";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);
    const { categories } = useSelector((state: RootState) => state.categories);

    const [filters, setFilters] = useState<Filters>({
        name: '',
        onlyAvailable: false,
        category: '',
    });
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const categoryFilter = filters.category.trim().toLowerCase();
        const regex = new RegExp(filters.name.trim(), 'i');

        const filtered = products.filter((product) => {
            const productCategory = product.category ? product.category.trim().toLowerCase() : "без категории";
            return (!filters.name || regex.test(product.name)) &&
                (!filters.onlyAvailable || product.quantity > 0) &&
                (!filters.category || productCategory === categoryFilter);
        });

        setFilteredProducts(filtered);
    }, [filters, products]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavigationBar toggleSidebar={toggleSidebar} />
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
                onFilter={setFilters}
                categories={categories.map(cat => cat.name)}
            />
            <Container sx={{ marginTop: '64px' }}>
                <AppRoutes filteredProducts={filteredProducts} />
            </Container>
        </ThemeProvider>
    );
};

export default App;
