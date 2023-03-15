import express from 'express';
import CommentController from '../controller/CommentController.js';


const {addComment, fetchCommentById} = CommentController
const CommentRoute = express.Router();

CommentRoute.get('/:id', fetchCommentById );
CommentRoute.post('/', addComment );


export default CommentRoute;
