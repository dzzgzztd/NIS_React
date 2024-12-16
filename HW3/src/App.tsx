import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ProductList from './components/ProductList/ProductList';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Sidebar, { Filters } from './components/NavigationBar/Sidebar';
import Modal from './components/Modal/Modal';
import { Product } from './types/Product';
import theme from './theme/theme';

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); // Все товары
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Выбранный товар
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Отфильтрованные товары
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Состояние боковой панели

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const openModal = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    // Получение списка уникальных категорий товаров
    const categories = Array.from(new Set(products.map((p) => p.category)));

    // Загрузка товаров из файла
    const fetchProducts = async () => {
        const response = await fetch('/test_data.json');
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
    };

    // Применение фильтров
    const applyFilters = (filters: Filters) => {
        const regex = new RegExp(filters.name, 'i');
        const filtered = products.filter((product) => {
            return (
                (!filters.name || regex.test(product.name)) &&
                (!filters.onlyAvailable || product.quantity > 0) &&
                (!filters.category || product.category === filters.category)
            );
        });
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Навигационная панель */}
            <NavigationBar toggleSidebar={toggleSidebar} />
            {/* Боковая панель */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
                onFilter={applyFilters}
                categories={categories}
            />
            {/* Основное содержимое */}
            <main>
                <ProductList products={filteredProducts} onCardClick={openModal} />
            </main>
            {/* Модальное окно */}
            <Modal product={selectedProduct} isOpen={!!selectedProduct} onClose={closeModal} />
        </ThemeProvider>
    );
};

export default App;
