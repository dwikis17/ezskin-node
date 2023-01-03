import express from 'express';
import TransactionController from '../controller/TransactionController.js';
import { verifyToken } from '../Middleware/Verify.js';
const {fetchAllTransaction,
     makeSnapUIPayment, 
     notifyPayment,
    updateTransactionById, 
    fetchTransactionByOrderId
} = TransactionController

const TransactionRoute = express.Router();

TransactionRoute.get('/', makeSnapUIPayment );
TransactionRoute.get('/transaction', verifyToken, fetchAllTransaction );
TransactionRoute.get('/get-transaction/:orderId', fetchTransactionByOrderId );
TransactionRoute.post('/notification', notifyPayment);
TransactionRoute.put('/update/:orderId',verifyToken, updateTransactionById);
export default TransactionRoute;