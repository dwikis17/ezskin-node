import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    author:{
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required:true
    },
    comments : [{type: mongoose.Schema.Types.ObjectId, ref:'comments'}]
})

export default mongoose.model('post', postSchema, 'post')
