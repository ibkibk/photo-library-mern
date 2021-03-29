import PostedImage from "../models/PhotoModel.js";
import validator from "express-validator";
import HttpError from "../middlewares/httpError.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

const { validationResult } = validator;

export const getPosts = async (req, res, next) => {
  try {
    const posts = await PostedImage.find();
    if (!posts) {
      res.status(200).json({ message: "no post have been found" });
      console.log("no post have been found");
      return next();
    }
    res.status(200).json(posts);
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
    next();
  }
};

export const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("invalid inputs please check you data", 422));
  }
  try {
    const { title, creator } = req.body;
    const createdPost = new PostedImage({
      title,
      image: "http://localhost:3010/" + req.file.path,
      createdAt: new Date().toISOString(),
      creator,
    });

    let user = await User.findById(creator);
    if (!user) {
      const error = new HttpError("Could not find user for provided id", 404);
      console.log(error);
      return next(error);
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({ session: sess });
    user.posts.push(createdPost);
    await user.save({ session: sess });
    await sess.commitTransaction();
    res.status(200).json(createdPost);
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
    next();
  }
};

export const updataPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return next(new HttpError("invalid inputs please check you data", 422));
    }
    const { title } = req.body;
    const postId = req.params.pid;

    const updatedPost = await PostedImage.findById(postId);
    if (updatePost.creator.toString() !== req.userData.userId) {
      const error = new HttpError(
        "You are not allowed to edit this post.",
        401
      );
      return next(error);
    }
    updatedPost.title = title;
    await updatedPost.save();
    res.status(200).json(updatedPost);
    next();
  } catch (error) {
    res.status(404).json(error);
    next();
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.pid;

    let post = await PostedImage.findById(postId).populate("creator");
    if (!post) {
      return next(new HttpError("could not found a post with given id", 422));
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    post.creator.posts.pull(post);
    await post.creator.save({ session: sess });
    await sess.commitTransaction();
    res.status(200).json({ message: "post has been deleted" });
    next();
  } catch (error) {
    res.status(404).json(error);
    next();
  }
};
