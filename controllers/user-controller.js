import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });

export const getUsers = async (req, res, next) => {
  const userS = await User.find({}, "-password");
  if (!userS) {
    return next("Could not find any user");
  }
  res.status(200).json({ users: userS });
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, image, confimPassword } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(404).json({ error: "User already exists" });
    }
    if (password !== confimPassword) {
      return res.status(404).json({ error: "Passwords does not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
      posts: [],
    });

    const token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User Signed up",
      name: createdUser.name,
      userId: createdUser._id,
      posts: createdUser.posts,
      email: createdUser.email,
      token,
      image: createdUser.image,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
    next();
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isUser = await User.findOne({ email });

    if (!isUser) {
      res.status(404).json({ error: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, isUser.password);

    if (!isPasswordValid) {
      return res.status(404).json({ error: "Passwords do not match" });
    }

    const token = jwt.sign(
      { userId: isUser._id, email: isUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User logged in",
      userId: isUser._id,
      email: isUser.email,
      token,
      posts: isUser.posts,
      name: isUser.name,
      image: isUser.image,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
    next();
  }
};
