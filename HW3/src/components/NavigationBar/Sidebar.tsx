import React, { useState } from 'react';
import {
    Drawer,
    TextField,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    Button,
    Stack,
    IconButton,
    SelectChangeEvent,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onFilter: (filters: Filters) => void;
    categories: string[];
}

export interface Filters {
    name: string;
    onlyAvailable: boolean;
    category: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onFilter, categories }) => {
    const [filters, setFilters] = useState<Filters>({
        name: '',
        onlyAvailable: false,
        category: '',
    });

    // Обновление фильтра по названию товара
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, name: e.target.value });
    };

    // Обновление фильтра по категории
    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
        setFilters({ ...filters, category: e.target.value });
    };

    // Обновление фильтра для доступных товаров
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, onlyAvailable: e.target.checked });
    };

    // Сброс всех значений фильтров
    const resetFilters = () => {
        setFilters({ name: '', onlyAvailable: false, category: '' });
    };

    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={onClose}
            variant="persistent"
            sx={{
                '& .MuiDrawer-paper': {
                    marginTop: '64px', // Высота NavigationBar
                    height: 'calc(100% - 64px)', // Высота за вычетом NavigationBar
                },
            }}
        >
            <Stack spacing={2} sx={{ width: 300, padding: 2 }}>
                {/* Поле ввода для названия товара */}
                <TextField
                    label="Название товара"
                    value={filters.name}
                    onChange={handleInputChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => setFilters({ ...filters, name: '' })}>
                                <ClearIcon />
                            </IconButton>
                        ),
                    }}
                />

                {/* Чекбокс для фильтра доступности */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.onlyAvailable}
                            onChange={handleCheckboxChange}
                        />
                    }
                    label="Только доступные товары"
                />

                {/* Выпадающее меню для выбора категории */}
                <Select
                    value={filters.category}
                    onChange={handleCategoryChange}
                    displayEmpty
                    renderValue={(value) => (value ? value : 'Выберите категорию')}
                >
                    <MenuItem value="">
                        <em>Выберите категорию</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>

                {/* Кнопки "Применить" и "Сбросить" */}
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            onFilter(filters);
                            onClose();
                        }}
                    >
                        Применить
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={resetFilters}>
                        Сбросить
                    </Button>
                </Stack>
            </Stack>
        </Drawer>
    );
};

export default Sidebar;
