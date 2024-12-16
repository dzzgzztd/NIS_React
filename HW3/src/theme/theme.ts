import { createTheme } from '@mui/material/styles';

// Создаем кастомную тему
const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        secondary: {
            main: '#ff2040',
        },
        background: {
            default: '#e9e9e9',
        }
    },
});

export default theme;
