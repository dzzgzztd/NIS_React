import React, {useEffect, useState} from 'react';
import {ThemeProvider, CssBaseline, Container} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './Store/Store';
import {setProducts} from './Store/slices/ProductSlice.ts';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Sidebar from './components/NavigationBar/Sidebar';
import AppRoutes from './routes';
import theme from './theme/theme';
import {Product} from "./types/Product.ts";
import {Filters} from "./components/NavigationBar/Sidebar";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);

    // Фильтры и состояние боковой панели
    const [filters, setFilters] = useState<Filters>({
        name: '',
        onlyAvailable: false,
        category: '',
    });
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Получение списка уникальных категорий товаров
    const categories = Array.from(
        new Set(products.map((p) => (p.category ? p.category : "Без категории")))
    );


    // Фильтрация товаров
    useEffect(() => {
        console.log("Применяем фильтры:", filters);

        const categoryFilter = filters.category.trim().toLowerCase();
        const regex = new RegExp(filters.name.trim(), 'i');

        const filtered = products.filter((product) => {
            const productCategory = typeof product.category === "string"
                ? product.category.trim().toLowerCase()
                : "без категории";

            const matchesName = !filters.name || regex.test(product.name);
            const matchesAvailability = !filters.onlyAvailable || product.quantity > 0;
            const matchesCategory = !filters.category || productCategory === categoryFilter;

            return matchesName && matchesAvailability && matchesCategory;
        });

        setFilteredProducts(filtered);
    }, [filters, products]);


    // Загрузка товаров из файла
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/test_data.json');
            const data: Product[] = await response.json();
            dispatch(setProducts(data));
        };

        fetchProducts();
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {/* Навигационная панель */}
            <NavigationBar toggleSidebar={toggleSidebar}/>

            {/* Боковая панель */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
                onFilter={setFilters} // Передаём функцию изменения фильтров
                categories={categories}
            />

            {/* Основное содержимое */}
            <Container sx={{marginTop: '64px'}}>
                <AppRoutes filteredProducts={filteredProducts}/>
            </Container>
        </ThemeProvider>
    );
};

export default App;
