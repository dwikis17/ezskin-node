import Transaction from "../model/Transaction.js";
import { fetchAllTransaction } from "./Queries/TransactionQueries.js";
class TransactionRepository{
    static createTransaction = (payload) => {
        return Transaction.create(payload)
    }

    static updateTransaction = (orderId) => {
        return Transaction.updateOne({orderId}, {$set:{status:'Accepted'}})
    }

    static getAllTransactionList = (sorter,filter) => {
        const query = fetchAllTransaction(sorter,filter)
        console.log(query)
        return Transaction.aggregate(query)
    }

    static updateTransactionById = (orderId) => {
        return Transaction.updateOne({orderId}, {$set:{status:'Done'}})
    }
}

export default TransactionRepository;