import midtransClient from 'midtrans-client'
class ClientController {
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
       const {gameName, tagLine, selectedVoucher, game} = req.query
       const orderId = `${gameName}-${Date.now()}`
       console.log(orderId)
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : 'SB-Mid-server-yeZuLmWfa0KrTZyTcA_WqEAj'
        });
     
        let parameter = {
            "transaction_details": {
                "order_id": orderId,
                "gross_amount": selectedVoucher
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "in game name": gameName,
                "tagLine": tagLine,
                'game order' : game,
            }
        };
         
        snap.createTransaction(parameter)
            .then((transaction)=>{
                // transaction token
                let transactionToken = transaction.token;
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
        .then((statusResponse)=>{
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
                    // TODO set transaction status on your database to 'success'

                }
            } else if (transactionStatus == 'settlement'){
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
                console.log(statusResponse)
            } else if (transactionStatus == 'cancel' ||
                transactionStatus == 'deny' ||
                transactionStatus == 'expire'){
                // TODO set transaction status on your database to 'failure'
                // and response with 200 OK
            } else if (transactionStatus == 'pending'){
                // TODO set transaction status on your database to 'pending' / waiting payment
                // and response with 200 OK
            }
        });
}
}

export default ClientController;