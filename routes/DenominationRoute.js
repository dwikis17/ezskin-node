import express from 'express';
import { verifyToken } from '../Middleware/Verify.js';
import DenominationController from '../controller/DenominationController.js';

const DenominationRoute = express.Router();

const { fetchDenomination } = DenominationController

DenominationRoute.get('/', verifyToken, fetchDenomination);

export default DenominationRoute;
