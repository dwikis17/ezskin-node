import express from 'express';
import { verifyToken } from '../Middleware/Verify.js';
import DenominationController from '../controller/DenominationController.js';

const DenominationRoute = express.Router();

const { fetchDenomination, createDenomination } = DenominationController

DenominationRoute.get('/', verifyToken, fetchDenomination);
DenominationRoute.post('/', verifyToken, createDenomination);

export default DenominationRoute;
