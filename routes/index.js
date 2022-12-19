import express from 'express';
import UserRoute from './UserRoute.js';
import GameRoute from './GameRoute.js';
import TransactionRoute from './TransactionRoute.js';

const router = express.Router();

const indexRoute = (app) => {
  app.use('/api', router);
  router.use('/user', UserRoute);
  router.use('/game', GameRoute);
  router.use('/transaction', TransactionRoute);
};

export default indexRoute;
