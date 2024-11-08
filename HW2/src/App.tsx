import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList/ProductList';
import { Product } from './types/Product';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Sidebar from './components/NavigationBar/Sidebar';
import './styles/App.css'

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/test_data.json');
                if (!response.ok) {
                    throw new Error(`Ошибка при загрузке товаров: ${response.status}`);
                }
                const data: Product[] = await response.json();
                console.log('Fetched products:', data);
                setProducts(data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchProducts();
    }, []);


    return (
        <div className="app">
            <NavigationBar toggleSidebar={toggleSidebar} />

            <Sidebar isOpen={isSidebarOpen} />

            <main className="app-content"
                  style={{
                      marginLeft: isSidebarOpen ? '300px' : '0',
                  }}>
                <ProductList products={products} />
            </main>
        </div>
    );
};

export default App;
