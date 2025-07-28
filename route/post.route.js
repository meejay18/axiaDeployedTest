import express from 'express'
import multer from 'multer'
import { createPost, deletePost, getSinglePost, getUserPosts } from '../controller/post.controller.js'
const route = express.Router()
import { authentication } from '../middlewares/auth.middleware.js'
import { upload } from '../utils/multer.js'

const postUpload = upload.fields([
  { name: 'previewPic', maxCount: 3 },
  { name: 'detailedPix', maxCount: 3 },
])

route.post('/post/createpost', postUpload, authentication, createPost)
route.delete('/post/deletepost/:postId', authentication, deletePost)
route.get('/post/updatepost/:postId/:userId', getUserPosts)
route.get('/post/getSinglepost/:postId', getSinglePost)

export default route
