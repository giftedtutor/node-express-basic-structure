import mongoose from 'mongoose';
import moment from 'moment';

const categorySchema = new mongoose.Schema(
  {
    admin_id: {
        type: String,
        required: false,
      },
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
    image: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: moment().format('DD/MM/YYYY')
    },

  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
