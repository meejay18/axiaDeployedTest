import kycModel from '../model/kyc.model.js';
import userModel from '../model/user.model.js';

export const createKyc = async (req, res) => {
 const data = req.body;
 const { id } = req.user;

 const checkKyc = await kycModel.findOne({ user: id });
 if (checkKyc) {
  return res.send('Kyc already exists');
 }

 try {
  const kyc = new kycModel({ user: id, ...data });
  const savedKyc = await kyc.save();

  await userModel.findByIdAndUpdate(id, { kyc: savedKyc.id }, { new: true });

  return res.status(201).json({
   message: 'Kyc created successfully',
   data: savedKyc,
  });
 } catch (error) {
  return res.ststus(500).json({
   message: 'Error creating kyc',
   error: error.message,
  });
 }
};
