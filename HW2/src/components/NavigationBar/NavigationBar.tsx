import React from 'react';
import '../../styles/NavigationBar.css'

// Интерфейс для пропсов компонента NavigationBar
interface NavigationBarProps {
    toggleSidebar: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ toggleSidebar }) => (
    <nav className="navigation-bar">
        <button onClick={toggleSidebar}>☰</button>
        <button>Товары</button>
        <button>Склады</button>
        <button>О системе</button>
        <button>Личная страница</button>
    </nav>
);

export default NavigationBar;
