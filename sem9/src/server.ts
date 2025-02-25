import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import postsRouter from "./routes/posts";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/posts", postsRouter);

// Вебсокет для чата
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("message", (msg) => {
        console.log(`Received a message from ${socket.id}: ${msg}`);
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
