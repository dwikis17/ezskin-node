import lodash from 'lodash';
import Transaction from "../model/Transaction.js";
import { sendEmail } from '../service/SendEmail.js';
import TransactionService from '../service/TransactionService.js';

const {createTransactionToken , getPaymentNotification} = TransactionService;
class TransactionController {
    static updateTransactionStatus = async (orderId) => {
        await Transaction.updateOne({orderId:orderId}, {$set:{paymentStatus:'Accepted'}})
    }

    static fetchTransactionByOrderId = async (req,res,next) => {
        try{
            const {orderId} = req.params
            const data =  await Transaction.findOne({orderId})
            res.json(data)
        }catch(error) {
            next(error)
        }
    }

    static makeSnapUIPayment = async (req, res, next) => {
        try{
            const transactionToken = await  createTransactionToken(req.query);
            res.json(transactionToken)
        } catch(error){
            next(error)
        }
      
    }

static notifyPayment = async (req, res , next) => {

    await getPaymentNotification(req.body);
  

    
}
}

export default TransactionController;