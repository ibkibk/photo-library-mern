import PostedImage from "../models/PhotoModel.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await PostedImage.find();
    if (!allPosts) {
      res.status(200).json({ message: "no post have been found" });
      console.log("no post have been found");
      return next();
    }
    res.status(200).json(posts);
    next();
  } catch (error) {
    res.status(404).json(error);
    next();
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { image, title } = req.body;
    const createdPost = await new PostedImage({
      title,
      image,
    });
    console.log(createdPost);
    createdPost.save();
    res.status(200).json(createdPost);
    next();
  } catch (error) {
    res.status(404).json(error);
    next();
  }
};

export const updataPost = async (req, res, next) => {
  try {
    const { title } = req.body;
    const postId = req.params.pid;

    const updatedPost = await PostedImage.findById(postId);
    updatedPost.title = title;
    console.log(updatedPost);
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

    await PostedImage.findByIdAndDelete(postId);
    res.status(200).json({ message: "post has been deleted" });
    next();
  } catch (error) {
    res.status(404).json(error);
    next();
  }
};
