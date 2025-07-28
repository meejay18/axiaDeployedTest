import mongoose from 'mongoose';

const kycSchema = new mongoose.Schema(
 {
  displayPic: {
   type: String,
   required: true,
  },
  nationalId: {
   type: String,
   required: true,
  },
  frontPic: {
   type: String,
   required: true,
  },
  backPic: {
   type: String,
   required: true,
  },
  user: {
   type: mongoose.Types.ObjectId,
   required: true,
   unique: true,
   ref: 'user',
  },
 },
 { timestamps: true }
);

const kycModel = mongoose.model('kyc', kycSchema);
export default kycModel;
