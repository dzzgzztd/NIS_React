import React, {useState} from "react";
import {CssBaseline, ThemeProvider, createTheme} from "@mui/material";
import ArticleList from "./components/ArticleList";
import ThemeSwitcher from "./components/ThemeSwitcher";

const App: React.FC = () => {
    const [isDark, setIsDark] = useState(false);

    const theme = createTheme({
        palette: {
            mode: isDark ? "dark" : "light",  // Используем состояние для темной и светлой темы
        },
        typography: {
            fontFamily: "'Roboto', sans-serif",
        },
    });

    // Функция для переключения темы
    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    const articles = [
        {title: "Article 1", content: "This is the content of article 1."},
        {title: "Article 2", content: "This is the content of article 2."},
        {title: "Article 3", content: "This is the content of article 3."},
        {title: "Article 4", content: "This is the content of article 4."},
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                <ThemeSwitcher toggleTheme={toggleTheme}/>
                <ArticleList articles={articles} spacing={2}/>
            </div>
        </ThemeProvider>
    );
};

export default App;
