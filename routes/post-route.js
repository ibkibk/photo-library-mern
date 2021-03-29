import express from "express";
import {
  getPosts,
  createPost,
  updataPost,
  deletePost,
} from "../controllers/post-controller.js";
import fileUpload from "../middlewares/file-upload.js";
import validator from "express-validator";
import auth from "../middlewares/auth.js";
const { check } = validator;
const router = express.Router();

router.get("/", getPosts);

router.use(auth);
router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty().isLength({ min: 5 }),
    check("image").not().isEmpty(),
  ],
  createPost
);
router.patch(
  "/:pid",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty().isLength({ min: 5 }),
    check("image").not().isEmpty(),
  ],
  updataPost
);
router.delete("/:pid", deletePost);

export default router;
