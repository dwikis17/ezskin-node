import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    game:{
        type: String,
        required : true
    },
    inGameName: {
        type:String
    },
    tagLine: {
        type:String
    },
    email: {
        type: String
    },
    nominal: {
        type: String
    },
    price: {
        type: String
    },
    orderId: {
        type: String
    },
    status: {
        type: String
    },
    transactionToken: {
        type:String
    },
    transactionDate: {
        type:Date
    }
})

export default mongoose.model('transaction', transactionSchema, 'Transaction')