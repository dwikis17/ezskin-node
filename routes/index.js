import express from 'express';
import AdminRoute from './AdminRoute.js';
import DenominationRoute from './DenominationRoute.js';
import GameRoute from './GameRoute.js';
import TransactionRoute from './TransactionRoute.js';

const router = express.Router();

const indexRoute = (app) => {
  app.use('/api', router);
  router.use('/game', GameRoute)
  router.use('/admin', AdminRoute);
  router.use('/denomination', DenominationRoute);
  router.use('/transaction', TransactionRoute);
};

export default indexRoute;
