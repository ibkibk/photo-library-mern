import express from "express";
import { getUsers, signup, login } from "../controllers/user-controller.js";
import fileUpload from "../middlewares/file-upload.js";
const router = express.Router();

router.get("/", getUsers);
router.post("/signup", fileUpload.single("image"), signup);
router.post("/signin", login);

export default router;
