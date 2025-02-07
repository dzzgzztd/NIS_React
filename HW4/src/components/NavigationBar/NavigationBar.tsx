import React from 'react';
import {AppBar, Toolbar, Typography, Button, Box, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useLocation} from 'react-router-dom';

// Интерфейс для пропсов компонента NavigationBar
interface NavigationBarProps {
    toggleSidebar: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({toggleSidebar}) => {
    const location = useLocation();

    // Определяем заголовок страницы в зависимости от пути
    const getPageTitle = (path: string) => {
        if (path.startsWith('/products/')) return 'Детали товара';
        if (path.startsWith('/categories')) return 'Категории';
        if (path.startsWith('/profile')) return 'Личный кабинет';
        return 'Товары'; // По умолчанию
    };

    return (
        <AppBar position="fixed" sx={{backgroundColor: '#333'}}>
            <Toolbar>
                {/* Кнопка для открытия боковой панели */}
                <IconButton
                    edge="start"
                    aria-label="menu"
                    onClick={toggleSidebar}
                    sx={{color: '#fff', marginRight: 2}}
                >
                    <MenuIcon/>
                </IconButton>

                {/* Динамическое название страницы */}
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    {getPageTitle(location.pathname)}
                </Typography>

                {/* Кнопки навигации */}
                <Box>
                    <Button color="inherit" component={Link} to="/">Товары</Button>
                    <Button color="inherit" component={Link} to="/categories">Категории</Button>
                    <Button color="inherit" component={Link} to="/profile">Личная страница</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
