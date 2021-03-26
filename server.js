import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoute from "./routes/post-route.js";
import userRoute from "./routes/user-route.js";

import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "./config.env" });

app.use(cors({ origin: true }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRoute);
app.use("/users", userRoute);

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
