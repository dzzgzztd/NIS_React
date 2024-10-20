// Компонент списка товаров
const ProductList = () => {
    // Создаем список товаров, для каждого товара добавим изображение-плейсхолдер
    const products = [
        { id: 1, name: 'Товар 1', imageUrl: 'https://via.placeholder.com/200' },
        { id: 2, name: 'Товар 2', imageUrl: 'https://via.placeholder.com/200' },
        { id: 3, name: 'Товар 3', imageUrl: 'https://via.placeholder.com/200' },
        { id: 4, name: 'Товар 4', imageUrl: 'https://via.placeholder.com/200' },
        { id: 5, name: 'Товар 5', imageUrl: 'https://via.placeholder.com/200' },
    ];

    // Возвращаем ненумерованный список
    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                    <h3 className="product-name">{product.name}</h3>
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
