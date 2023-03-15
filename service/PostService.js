import { ObjectId } from "mongodb"
import PostRepository from "../repository/PostRepository.js"
import jwt from 'jsonwebtoken'
const { findAllPost, findPostById, attachComment, addPost} = PostRepository
class PostService {
    static getAllPost = async () => {
        const data = await findAllPost()
        console.log(data)
        return findAllPost()
    }

    static getPostById = async (id) => {
        return findPostById(id);
    }

    static attachCommentToPost = async (commentId,postId) => {
        return attachComment(commentId,postId)
    }

    static createPost = async (payload) => {
        const {payload:{userId}} = jwt.decode(payload.token, {complete:true})

        const finalPayload = {
            ...payload,
            author: ObjectId(userId)
        }

        delete finalPayload.token
        return addPost(finalPayload)
    }
}

export default PostService