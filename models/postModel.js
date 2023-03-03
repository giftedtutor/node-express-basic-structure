import mongoose from 'mongoose';
import moment from 'moment';

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
