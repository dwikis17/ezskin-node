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
    nominalVoucher: {
        type: String
    },
    priceAmount: {
        type: String
    },
    orderId: {
        type: String
    },
    paymentStatus: {
        type: String
    }
})

export default mongoose.model('transaction', transactionSchema, 'Transaction')