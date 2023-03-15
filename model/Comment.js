import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const comentSchema = mongoose.Schema({
    author:{
        type: ObjectId,
        required: true
    },
   comment: {
    type:String,
    required:true
   },
   postId: {
    type: ObjectId,
    required:true
   }
})

export default mongoose.model('comments', comentSchema, 'comments')
