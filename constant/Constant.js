export const getPaymentParameters = (payload) => {
    const {orderId, price, inGameName, tagLine, email, game} = payload;
    return  {
        "transaction_details": {
            "order_id": orderId,
            "gross_amount": price,
            'Game' : game,
        },
        "credit_card":{
            "secure" : true
        },
        "customer_details": {
            "In Game Name": inGameName,
            "Tag Line": tagLine,
            "Email" :email,
        }
    };
}