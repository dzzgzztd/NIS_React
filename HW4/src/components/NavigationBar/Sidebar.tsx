import React, {useState} from 'react';
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

export interface Filters {
    name: string;
    onlyAvailable: boolean;
    category: string;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onFilter: (filters: Filters) => void;
    categories: string[];
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, onClose, onFilter, categories}) => {
    const [filters, setFilters] = useState<Filters>({
        name: '',
        onlyAvailable: false,
        category: '',
    });

    // Обновление фильтров
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({...prev, name: e.target.value}));
    };

    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
        setFilters((prev) => ({...prev, category: e.target.value || ""}));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({...prev, onlyAvailable: e.target.checked}));
    };

    const handleApplyFilters = () => {
        console.log("Отправляем фильтры:", filters);
        onFilter(filters);
        onClose();
    };

    // Функция сброса фильтров
    const resetFilters = () => {
        const defaultFilters = {name: '', onlyAvailable: false, category: ''};
        setFilters(defaultFilters);
        onFilter(defaultFilters);
    };

    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={onClose}
            variant="persistent"
            sx={{
                '& .MuiDrawer-paper': {
                    marginTop: '64px',
                    height: 'calc(100% - 64px)',
                },
            }}
        >
            <Stack spacing={2} sx={{width: 300, padding: 2}}>
                <TextField
                    label="Название товара"
                    value={filters.name}
                    onChange={handleInputChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => setFilters({...filters, name: ''})}>
                                <ClearIcon/>
                            </IconButton>
                        ),
                    }}
                />

                <FormControlLabel
                    control={<Checkbox checked={filters.onlyAvailable} onChange={handleCheckboxChange}/>}
                    label="Только доступные товары"
                />

                <Select value={filters.category} onChange={handleCategoryChange} displayEmpty>
                    <MenuItem value=""><em>Выберите категорию</em></MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                </Select>

                {/* Кнопки "Применить" и "Сбросить" */}
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Button variant="contained" color="primary" onClick={handleApplyFilters}>
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
