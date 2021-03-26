import express from "express";
import { getUsers, signup, login } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signup);
router.post("/signin", login);

export default router;
