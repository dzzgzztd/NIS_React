"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const posts_1 = __importDefault(require("./routes/posts"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/posts", posts_1.default);
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("message", (msg) => {
        io.emit("message", { sender: socket.id, text: msg });
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
