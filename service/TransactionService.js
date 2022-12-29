import { sendEmail } from "./SendEmail.js";
import midtransClient from 'midtrans-client'
import TransactionRepository from "../repository/TransactionRepository.js";

const { createTransaction } = TransactionRepository;
class TransactionService {

    static createTransaction = async (payload) => {
        return createTransaction(payload)
    }
    
    static createTransactionToken = async (payload) => {
        const { inGameName, tagLine, price, game, nominal, email } = payload;
        const orderId = `${inGameName}-${Date.now()}`
         let snap = new midtransClient.Snap({
             isProduction : false,
             serverKey : process.env.MIDTRANS_SERVER_KEY
         });

             await sendEmail(email, orderId);

             let parameter = {
                "transaction_details": {
                    "order_id": orderId,
                    "gross_amount": price
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "in game name": inGameName,
                    "tagLine": tagLine,
                    "email" :email,
                    'game order' : game,
                }
            };

          const token = await snap.createTransaction(parameter)
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
                    await ClientController.updateTransactionStatus(orderId)
                    // TODO set transaction status on your database to 'success'
                }
            } else if (transactionStatus == 'settlement'){
                console.log('duit masuk');
                await ClientController.updateTransactionStatus(orderId)
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
                
            } else if (transactionStatus == 'cancel' ||
                transactionStatus == 'deny' ||
                transactionStatus == 'expire'){
                // TODO set transaction status on your database to 'failure'
                // and response with 200 OK
            } else if (transactionStatus == 'pending'){
                // TODO set transaction status on your database to 'pending' / waiting payment
                console.log('masuk pending')
            }
        });
 }

 

}

export default TransactionService;