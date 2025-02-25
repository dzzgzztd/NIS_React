"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsController_1 = require("../controllers/postsController");
const router = (0, express_1.Router)();
router.get("/", postsController_1.getAllPosts);
router.get("/:id", postsController_1.getPostById);
exports.default = router;
