// Подключаем все созданные компоненты
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';

function App() {
    return (
        <div>
            <Header />
            <ProductList />
            <Footer />
        </div>
    );
}

export default App;
