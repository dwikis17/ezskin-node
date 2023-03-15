import PostService from "../service/PostService.js"


const {getAllPost, getPostById, createPost} = PostService

class PostController {
    static fetchPost = async  (req,res,next) => {
        try {
            const postList = await getAllPost()
            res.send(postList)
        } catch (error) {
            next(error)
        }
    }

    static fetchPostById = async  (req,res,next) => {
        const {id} = req.params
        try {
            const post = await getPostById(id)
            console.log(post)
            res.send(post)
        } catch (error) {
            next(error)
        }
    }

    static createNewPost = async (req, res, next) => {
        try {
            const post = await createPost(req.body)
            res.send(post)
        } catch (error) {
            next(error)
        }
    }
}

export default PostController