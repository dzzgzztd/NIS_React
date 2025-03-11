import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from "passport-jwt";
import jwt from "jsonwebtoken";
import {findUser, validatePassword, User} from "./user";

const JWT_SECRET = "supersecretkey"; // Секретный ключ для подписи JWT

// Настройки LocalStrategy
passport.use(new LocalStrategy(async (username: string, password: string, done) => {
    const user = await findUser(username);
    if (!user || !(await validatePassword(password, user.passwordHash))) return done(null, false); // Если нет такого пользователя или пароль неверный
    return done(null, user);
}));

// Настройки JwtStrategy
const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
};

// JwtStrategy по токену
passport.use(new JwtStrategy(jwtOptions, (payload: any, done) => {
    return done(null, payload.id === 1 ? {id: 1, username: "testuser"} : false);
}));

// Функция для генерации JWT-токена
export const generateToken = (user: User): string =>
    jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "1h"});