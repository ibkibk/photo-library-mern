import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "no-photo.jpg",
  },
  likes: {
    type: [String],
    default: 0,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const PostedImage = mongoose.model("PostedImage", ImageSchema);

export default PostedImage;
