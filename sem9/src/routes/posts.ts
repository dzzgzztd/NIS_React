import { Router } from "express";
import { getAllPosts, getPostById } from "../controllers/postsController";

const router = Router();

router.get("/", getAllPosts); // GET /api/posts - получить все посты
router.get("/:id", getPostById); // GET /api/posts/:id - получить один пост

export default router;
