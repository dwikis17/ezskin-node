import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    description: {
        type:String
    },
    image: {
        type:String
    },
    imageBanner: {
        type:String
    },
    imageOriginalName: {
        type:String
    },
    imageBannerOriginalName: {
        type:String
    },
     vouchers : [{type: mongoose.Schema.Types.ObjectId, ref:'denomination'}]
})

export default mongoose.model('games', gameSchema, 'games')