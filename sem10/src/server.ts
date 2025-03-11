import express, {Request, Response} from "express";
import passport from "passport";
import "./auth";
import {generateToken} from "./auth";

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.post("/login", (req: Request, res: Response, next) => {
    passport.authenticate("local", {session: false}, (err: any, user: any) => {
        if (err || !user) return res.status(401).json({message: "Login failed"});
        res.json({token: generateToken(user)});
    })(req, res, next);
});

app.get("/profile", passport.authenticate("jwt", {session: false}), (req: Request, res: Response) => {
    res.json({message: "Welcome to your profile!", user: req.user});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
