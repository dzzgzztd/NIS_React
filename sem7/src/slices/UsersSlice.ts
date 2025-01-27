import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

// Интерфейс пользователя
interface User {
    id: number;
    name: string;
}

// Тип для состояния списка пользователей
type UsersState = User[];

// Начальное состояние (массив пользователей)
const initialState: UsersState = [
    { id: 1, name: "Яна" },
    { id: 2, name: "Ульяна" },
    { id: 3, name: "Сергей" },
    { id: 4, name: "Татьяна" },
    { id: 5, name: "Алина" },
    { id: 6, name: "Леонид" },
    { id: 7, name: "Анастасия" }
];

// Создаем slice для управления состоянием пользователей
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // Редьюсер для обновления имени пользователя
        updateUserName: (state, action: PayloadAction<{ id: number; name: string }>) => {
            const {id, name} = action.payload;
            const user = state.find((user) => user.id === id); // Ищем пользователя по id
            if (user) {
                user.name = name; // Обновляем имя
            }
        },
    },
});

// Экспортируем действие для обновления имени
export const {updateUserName} = usersSlice.actions;

// Селекторы для получения данных из состояния
export const selectUsers = (state: { users: UsersState }) => state.users;
export const selectUserById = (state: { users: UsersState }, id: number) =>
    state.users.find((user) => user.id === id);

export default usersSlice.reducer;