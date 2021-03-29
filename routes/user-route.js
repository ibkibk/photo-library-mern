import express from "express";
import { getUsers, signup, login } from "../controllers/user-controller.js";
import fileUpload from "../middlewares/file-upload.js";
import validator from "express-validator";
const { check } = validator;

const router = express.Router();

router.get("/", getUsers);
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty().isLength({ min: 6 }),
  ],
  signup
);
router.post("/signin", login);

export default router;
