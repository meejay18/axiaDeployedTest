import express from 'express';
import { createBook, getOneBook } from '../controller/book.controller.js';
const route = express.Router();
import { authentication } from '../middlewares/auth.middleware.js';

route.post('/book/createBook', authentication, createBook);
route.get('/book/getOneBook/:bookId', getOneBook);

export default route;
