import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./slices/UsersSlice";

// Настроим store с редьюсером для пользователей
const store = configureStore({
    reducer: {
        users: usersReducer, // Связываем редьюсер с состоянием users
    },
});

export default store;