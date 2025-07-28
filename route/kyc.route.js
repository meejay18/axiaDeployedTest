import express from 'express';
import { createKyc } from '../controller/kyc.controller.js';
import { authentication } from '../middlewares/auth.middleware.js';
const route = express.Router();

route.post('/kyc/createkyc', authentication, createKyc);

export default route;
