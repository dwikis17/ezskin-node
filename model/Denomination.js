import mongoose from "mongoose";

const denominationSchema = mongoose.Schema({
    nominal:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

export default mongoose.model('denomination', denominationSchema, 'denomination')
