import { sendEmail } from "./SendEmail.js";
import midtransClient from 'midtrans-client'
import TransactionRepository from "../repository/TransactionRepository.js";
import { getPaymentParameters } from "../constant/Constant.js";
import Transaction from "../model/Transaction.js";

const { createTransaction, updateTransaction, getAllTransactionList, updateTransactionById,
    getAllTransactionForChart } = TransactionRepository;
class TransactionService {

    static createTransaction = async (payload) => {
        return createTransaction(payload)
    }

    static getAllTransaction = async (sorter,filter) => {
        return getAllTransactionList(sorter,filter);
    }

    static updateTransactionStatusById = async (orderId) => {
        return updateTransactionById(orderId)
    }
    
    static createTransactionToken = async (payload) => {
        const { inGameName, tagLine, price, game, nominal, email } = payload;
        const orderId = `${inGameName}-${Date.now()}`
         let snap = new midtransClient.Snap({
             isProduction : false,
             serverKey : process.env.MIDTRANS_SERVER_KEY
         });

        await sendEmail(email, orderId);
        const getParamsPayload = {...payload, orderId}

          const token = await snap.createTransaction(getPaymentParameters(getParamsPayload))
          const finalPayload = {
            ...payload,
            orderId,
            status: 'Pending',
            transactionToken: token.token,
            transactionDate : new Date()
        }
        await this.createTransaction(finalPayload)
        return token;
 }

 static updateTransactionStatus = async (orderId) => {
    await updateTransaction(orderId)
}

static fetchTransactionForChart = async () => {
    return getAllTransactionForChart()
}

 static getPaymentNotification = (payload) => {
    let apiClient = new midtransClient.Snap({
        isProduction : false,
        serverKey : process.env.MIDTRANS_SERVER_KEY,
        clientKey : process.env.MIDTRANS_CLIENT_KEY
    });

    apiClient.transaction.notification(payload)
        .then(async (statusResponse)=>{
            let orderId = statusResponse.order_id;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;

            console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

            if (transactionStatus == 'capture'){
                if (fraudStatus == 'challenge'){
                    // TODO set transaction status on your database to 'challenge'
                    // and response with 200 OK
                } else if (fraudStatus == 'accept'){
                    await this.updateTransactionStatus(orderId)
                }
            } else if (transactionStatus == 'settlement'){
                await this.updateTransactionStatus(orderId)
            }
        });
 }

 

}

export default TransactionService;