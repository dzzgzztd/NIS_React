import { Request, Response } from "express";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Контроллер для получения всех постов
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};

// Контроллер для получения конкретного поста по ID
export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch post" });
    }
};
