import express from "express";
import {
  getPosts,
  createPost,
  updataPost,
  deletePost,
} from "../controllers/post-controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:pid", updataPost);
router.delete("/:pid", deletePost);

export default router;
