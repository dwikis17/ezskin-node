import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    description: {
        type:String
    },
    altName: {
        type: String
    },
    denomination: {
        type: Array
    }
})

export default mongoose.model('game', gameSchema, 'Games')