import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Интерфейс для пропсов компонента NavigationBar
interface NavigationBarProps {
    toggleSidebar: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ toggleSidebar }) => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
            <Toolbar>
                {/* Кнопка для открытия боковой панели */}
                <IconButton
                    edge="start"
                    aria-label="menu"
                    onClick={toggleSidebar}
                    sx={{ color: '#fff', marginRight: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Название страницы */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Товары
                </Typography>

                {/* Кнопки навигации */}
                <Box>
                    <Button color="inherit">Товары</Button>
                    <Button color="inherit">Склады</Button>
                    <Button color="inherit">О системе</Button>
                    <Button color="inherit">Личная страница</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
