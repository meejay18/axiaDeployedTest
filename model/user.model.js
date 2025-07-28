import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
 {
  name: {
   type: String,
   required: true,
  },
  gender: {
   type: String,
   enum: ['male', 'female'],
   required: true,
  },
  email: {
   type: String,
   required: true,
   unique: true,
  },
  age: {
   type: Number,
   required: true,
  },
  password: {
   type: String,
   required: true,
  },
  isAdmin: {
   type: Boolean,
   default: false,
  },
  hobbies: {
   type: [String],
  },
  kyc: {
   type: mongoose.Types.ObjectId,
   ref: 'kyc',
  },
  posts: [
   {
    type: mongoose.Types.ObjectId,
    ref: 'post',
   },
  ],
  books: [
   {
    type: mongoose.Types.ObjectId,
    ref: 'book',
   },
  ],
 },
 { timestamps: true }
);

const userModel = mongoose.model('user', userSchema);
export default userModel;
