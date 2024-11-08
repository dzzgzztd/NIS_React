import React from 'react';
import '../../styles/Sidebar.css'

// Интерфейс для пропсов компонента Sidebar
interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <input type="text" placeholder="Поиск по товарам" />
        <div className="checkbox-container">
            <input type="checkbox" id="availableOnly"/>
            <label htmlFor="availableOnly">Только доступные товары</label>
        </div>
        <select>
            <option value="">Выберите категорию</option>
            <option value="category1">Категория 1</option>
            <option value="category2">Категория 2</option>
        </select>
    </aside>
);

export default Sidebar;
