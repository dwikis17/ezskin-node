import Transaction from "../model/Transaction.js";
import lodash from 'lodash'
import { fetchAllTransaction,fetchForChart } from "./Queries/TransactionQueries.js";

const {first} = lodash
class TransactionRepository{
    static createTransaction = (payload) => {
        return Transaction.create(payload)
    }

    static updateTransaction = (orderId) => {
        return Transaction.updateOne({orderId}, {$set:{status:'Accepted'}})
    }

    static getAllTransactionList = (sorter,filter) => {
        const query = fetchAllTransaction(sorter,filter)
        return Transaction.aggregate(query)
    }

    static updateTransactionById = (orderId) => {
        return Transaction.updateOne({orderId}, {$set:{status:'Done'}})
    }

    static getAllTransactionForChart = async (month, year) => {

        const query = fetchForChart(Number(month), Number(year))
        return first(await Transaction.aggregate(query))
    }
}

export default TransactionRepository;