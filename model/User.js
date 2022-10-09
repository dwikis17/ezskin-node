import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    refresh_token:{
        type:String
    }
}, {timestamps: true});

export default mongoose.model('admin', userSchema, 'userAdmin')