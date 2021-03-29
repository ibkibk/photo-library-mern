import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import HttpError from "../middlewares/httpError.js";

dotenv.config({ path: "../config.env" });
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    console.log(err);
    return next(error);
  }
};

export default auth;
