import express from 'express';
import ClientController from '../controller/ClientController.js';
const {makePayment, makeSnapUIPayment, notifyPayment} = ClientController

const PaymentRoute = express.Router();

PaymentRoute.get('/', makeSnapUIPayment );
PaymentRoute.post('/notification', notifyPayment);

export default PaymentRoute;