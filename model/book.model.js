import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
 {
  title: {
   type: String,
   required: true,
  },
  url: {
   type: String,
   required: true,
  },
  authors: [
   {
    type: mongoose.Types.ObjectId,
    ref: 'user',
   },
  ],
 },
 { timestamps: true }
);

const bookModel = mongoose.model('book', bookSchema);
export default bookModel;
