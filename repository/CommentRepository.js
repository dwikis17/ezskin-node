import { ObjectId } from "mongodb"
import Comment from "../model/Comment.js"

const findCommentByPostId = (id) => {
    return [
        {$match:{
            postId:ObjectId(id)
        }},
        {
            $lookup:{
                from:'users',
                localField:'author',
                foreignField:'_id',
                as:'author'
            }
        },
        {
            $project:{
                author:{$arrayElemAt:['$author.name', 0]},
                comment:1
            }
        }
    ]
}
class CommentRepository {
    static addComment = (payload) => {
        return Comment.create(payload)
    }

    static findCommentById = (id) => {
        const query = findCommentByPostId(id)
        return Comment.aggregate(query)
    }
}

export default CommentRepository