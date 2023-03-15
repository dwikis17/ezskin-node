
import CommentService from "../service/CommentService.js"

const {addNewComment, fetchComment} = CommentService
class CommentController {
 static addComment = async (req, res, next) => {
    const {token} = req.headers
    try {
        const add = await addNewComment(req.body, token)
        res.send(add)
    } catch(error){
        next(error)
    }
 }

 static fetchCommentById = async (req, res, next ) => {
    const {id} = req.params
    try {
     const fetchedComment = await fetchComment(id)
     console.log(fetchedComment)
     res.send(fetchedComment)
    } catch(error){
        next(error)
    }
 }
}

export default CommentController