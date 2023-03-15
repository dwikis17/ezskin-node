import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import CommentRepository from '../repository/CommentRepository.js'
import PostService from './PostService.js'

const {addComment , findCommentById} = CommentRepository

const {attachCommentToPost} = PostService

class CommentService {
    static addNewComment = async (comment) => {
        const {payload:{userId}} = jwt.decode(comment.token, {complete:true})
        console.log(userId)

        const finalPayload = {
            comment: comment.comment,
            author: ObjectId(userId),
            postId: ObjectId(comment.postId)
        }
        console.log(comment)

        return addComment(finalPayload)
    }

    static fetchComment = async (id) => {
        console.log(id)
        return findCommentById(id)
    }
}

export default CommentService