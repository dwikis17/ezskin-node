import express from 'express';
import UserRoute from './UserRoute.js';
import GameRoute from './GameRoute.js';
import PaymentRoute from './PaymentRoute.js';

const router = express.Router();

const indexRoute = (app) => {
  app.use('/api', router);
  router.use('/user', UserRoute);
  router.use('/game', GameRoute);
  router.use('/payment', PaymentRoute);
};

export default indexRoute;
