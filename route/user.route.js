import express from 'express';
import {
 createUser,
 deleteUser,
 getAllUsers,
 getOneUser,
 loginUser,
 updateUser,
 statusCode,
 singleFile,
 arrayFile,
 multipleFiles,
} from '../controller/user.controller.js';
const route = express.Router();

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const moreField = upload.fields([
 { name: 'previewPic', maxCount: 1 },
 { name: 'detailedPix', maxCount: 1 },
 { name: 'video', maxCount: 1 },
]);

route.post('/createuser', createUser);
route.get('/getallusers', getAllUsers);
route.get('/getoneuser/:id', getOneUser);
route.put('/updateuser/:id', updateUser);
route.post('/loginuser', loginUser);
route.delete('/deleteuser/:id', deleteUser);
route.post('/statuscode', statusCode);
route.post('/single', upload.single('dp'), singleFile);
route.post('/array', upload.array('dp', 3), arrayFile);
route.post('/multiple', moreField, multipleFiles);

export default route;
