import jwt from 'jsonwebtoken';

export const authentication = async (req, res, next) => {
 const { token } = req.cookies;

 if (!token) {
  console.log('Login to your account');
 }

 jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
  if (err) {
   console.log('Error with token');
  }
  req.user = { id: payload.id, admin: payload.isAdmin };
 });
 next();
};
