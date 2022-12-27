import midtransClient from 'midtrans-client'
import lodash from 'lodash';
import Transaction from "../model/Transaction.js";
import { sendEmail } from '../service/SendEmail.js';


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

    static makePayment = async (req, res, next) => {
        let core = new midtransClient.CoreApi({
            isProduction : false,
            serverKey : 'SB-Mid-server-yeZuLmWfa0KrTZyTcA_WqEAj',
            clientKey : 'SB-Mid-client-s1EB6d85LvXf3pKj'
        });
     
    let parameter = {
        "payment_type": "gopay",
        "transaction_details": {
            "gross_amount": 666,
            "order_id": "test-transaction-ssffsf",
        },
        "gopay": {
            "enable_callback": true,                // optional
            "callback_url": "someapps://callback"   // optional
        }
    };
     
    // charge transaction
    core.charge(parameter)
        .then((chargeResponse)=>{
            res.send(chargeResponse)
            
        });
    }

    static makeSnapUIPayment = async (req, res, next) => {
        console.log(req.query)
       const {inGameName, tagLine, price, game, nominal, email} = req.query
       const orderId = `${inGameName}-${Date.now()}`
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : 'SB-Mid-server-yeZuLmWfa0KrTZyTcA_WqEAj'
        });

      
    //    await sendEmail(email, orderId)
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
                'game order' : game,
            }
        };

        snap.createTransaction(parameter)
            .then((transaction)=>{
                // transaction token
                let transactionToken = transaction.token;
                Transaction.create({...req.query, orderId, paymentStatus: 'Pending', transactionToken});
                res.json(transactionToken)
            })
}

static notifyPayment = async (req, res , next) => {
// Create Core API / Snap instance (both have shared `transactions` methods)
    let apiClient = new midtransClient.Snap({
        isProduction : false,
        serverKey : 'SB-Mid-server-yeZuLmWfa0KrTZyTcA_WqEAj',
        clientKey : 'SB-Mid-client-s1EB6d85LvXf3pKj'
    });

    apiClient.transaction.notification(req.body)
        .then(async (statusResponse)=>{
            let orderId = statusResponse.order_id;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;

            console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

            // Sample transactionStatus handling logic

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

export default TransactionController;