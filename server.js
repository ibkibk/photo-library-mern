import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoute from "./routes/post-route.js";
import userRoute from "./routes/user-route.js";
import HttpError from "./middlewares/httpError.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "./config.env" });

app.use(cors({ origin: true }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/posts", postRoute);
app.use("/users", userRoute);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
});

const port = process.env.PORT || 3009;

const DB = process.env.MongoDB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connection successful");
  })
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`hello from server on POST ${port}`);
});
