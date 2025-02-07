# 4е домашнее задание
### Якушева Арина, БПИ228

Выполнены основные и дополнительные требования, реализованы функционал Redux и маршрутизация. Стилизация выполнена с 
использованием MUI, соблюдена файловая структура, реализованы CRUD-операции для товаров и категорий, добавлен функционал
профиля (возможность редактировать информацию о себе, добавлять фотографию). Использован middleware для логирования диспатчей.

### Содержимое файлов:
**Store:**

- **Store/Store.ts** – Redux-хранилище, объединяющее products, categories и user.
- **Store/slices/ProductSlice.ts** – слайс с редюсером для управления товарами (CRUD-операции).
- **Store/slices/CategorySlice.ts** – слайс с редюсером для категорий (CRUD-операции).
- **Store/slices/UserSlice.ts** – слайс с редюсером профиля пользователя (хранит имя, email, аватар, группу).
- **Store/LoggerMiddleware.ts** – middleware для логирования dispatch в консоли.

**pages:**

- **pages/ProductListPage.tsx** – главная страница, отображает список товаров с пагинацией.
- **pages/ProductDetailPage.tsx** – страница деталей товара (/products/:id).
- **pages/CategoriesPage.tsx** – управление категориями (/categories).
- **pages/UserProfilePage.tsx** – профиль пользователя (/profile).

**components:**

- **components/ProductList/ProductList.tsx** – отображает товары с пагинацией.
- **components/ProductList/ProductCard.tsx** – карточка товара с краткой информацией.
- **components/NavigationBar/NavigationBar.tsx** – верхняя панель навигации.
- **components/NavigationBar/Sidebar.tsx** – боковая панель с фильтрами.
- **components/modal/AddProductModal.tsx** – модальное окно для добавления товара.
- **components/modal/EditProductModal.tsx** – модальное окно для редактирования товара.
- **components/modal/AddCategoryModal.tsx** – модальное окно для добавления категории.
- **components/modal/EditCategoryModal.tsx** – модальное окно для редактирования категории.

**Главные файлы**

- **App.tsx** – основное приложение, подключает маршрутизацию и Redux.
- **routes.tsx** – маршруты приложения (/, /products/:id, /categories, /profile).
- **main.tsx** – точка входа, оборачивает приложение в Redux Provider и BrowserRouter.
- **types/Product.ts** – описывает интерфейс товара.