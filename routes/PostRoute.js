import express from 'express';
import { verifyToken } from '../Middleware/Verify.js';
import PostController from '../controller/PostController.js'

const {fetchPost, fetchPostById, createNewPost} = PostController
const PostRoute = express.Router();


PostRoute.get('/', fetchPost );
PostRoute.get('/:id', fetchPostById);
PostRoute.post('/', createNewPost);

export default PostRoute;
