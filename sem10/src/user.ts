import bcrypt from "bcrypt";

export interface User {
    id: number;
    username: string;
    passwordHash: string;
}

// Тестовый пользователь с хэшированным паролем
const user: User = {
    id: 1,
    username: "testuser",
    passwordHash: bcrypt.hashSync("password123", 10),
};

// Функция для поиска пользователя по имени
export const findUser = async (username: string): Promise<User | null> =>
    username === user.username ? user : null;

// Функция для проверки пароля
export const validatePassword = async (password: string, hash: string): Promise<boolean> =>
    bcrypt.compare(password, hash);
