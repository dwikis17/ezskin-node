import { ObjectId } from "mongodb"
import Post from "../model/Post.js"
import { findAll, findById, attachNewComment } from "./Queries/PostQueries.js"

class PostRepository {
    static findAllPost = async () => {
        const query = findAll()
        return Post.aggregate(query)
    }

    static findPostById = async (id) => {
        const query = findById(id)
        return Post.aggregate(query)
    }

    static attachComment = async (commentId,postId) => {
        return Post.updateOne(
            { _id: ObjectId(postId) },
            { $push: { comments: ObjectId(commentId)} }
        )
    }

    static addPost = (payload) => {
        return Post.create(payload)
    }
}

export default PostRepository