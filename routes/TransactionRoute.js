import express from 'express';
import TransactionController from '../controller/TransactionController.js';
const {makePayment, makeSnapUIPayment, notifyPayment, fetchTransactionByOrderId} = TransactionController

const TransactionRoute = express.Router();

TransactionRoute.get('/', makeSnapUIPayment );
TransactionRoute.get('/get-transaction/:orderId', fetchTransactionByOrderId );
TransactionRoute.post('/notification', notifyPayment);

export default TransactionRoute;