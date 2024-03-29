import Transaction from "../model/Transaction.js";
import TransactionService from '../service/TransactionService.js';

const {
    createTransactionToken,
    getPaymentNotification,
    getAllTransaction,
    updateTransactionStatusById,
    fetchTransactionForChart
} = TransactionService;

class TransactionController {
    static fetchTransactionByOrderId = async (req, res, next) => {
        try{
            const {orderId} = req.params
            const data =  await Transaction.findOne({orderId})
            res.json(data)
        }catch(error) {
            next(error)
        }
    }

    static fetchAllTransaction = async (req, res, next) => {
        const {sorter, filterInfo} = req.query
        try{
            const transaction = await getAllTransaction(sorter, filterInfo)
            res.status(200).send(transaction)
        } catch(error) {
            next(error)
        }
    }

    static makeSnapUIPayment = async (req, res, next) => {
        try{
            const transactionToken = await createTransactionToken(req.query);
            res.json(transactionToken)
        } catch(error) {
            next(error)
        }

    }

    static notifyPayment = async (req, res , next) => {
        await getPaymentNotification(req.body);
    }

    static updateTransactionById = async (req, res, next) => {
        try{
           const data = await updateTransactionStatusById(req.params.orderId)
            res.status(200).send(data)
        } catch(error) {
            next(error)
        }
    }

    static getTransactionForChart = async (req, res, next) => {
        try {
            const {month, year} = req.query
            const data = await fetchTransactionForChart(month, year)
            res.status(200).send(data)
        } catch(error) {
            next(error)
        }
    }
}

export default TransactionController;
