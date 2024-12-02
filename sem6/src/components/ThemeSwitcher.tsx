import React, { useState } from "react";
import { Slider } from "@mui/material";

interface ThemeSwitcherProps {
    toggleTheme: () => void;
}

// Компонент переключателя тем
const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ toggleTheme }) => {
    const [sliderValue, setSliderValue] = useState<number>(0); // Состояние для отслеживания значения слайдера

    // Обрабатываем изменение положения слайдера
    const handleChange = (_event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
        toggleTheme();
    };

    // Inline стили для визуального отображения слайдера
    return (
        <div
            style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-40%)",
                width: 30,
                zIndex: 10,
            }}
        >
            <Slider
                value={sliderValue}
                defaultValue={0}
                min={0}
                max={1}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => (value === 0 ? "🌞" : "🌙")}
                onChange={handleChange}
                sx={{
                    height: 4,
                    width: "100%",
                    '& .MuiSlider-thumb': {
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: '#020202',
                        height: 16,
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: '#ccc',
                        height: 16,
                    },
                }}
            />
        </div>
    );
};

export default ThemeSwitcher;
