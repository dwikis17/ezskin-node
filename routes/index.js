import express from 'express';
import UserRoute from './UserRoute.js';
import DenominationRoute from './DenominationRoute.js';
import GameRoute from './GameRoute.js';
import TransactionRoute from './TransactionRoute.js';
import BannerRoute from './BannerRoute.js';
import PostRoute from './PostRoute.js';
import CommentRoute from './CommentRoute.js';

const router = express.Router();

const indexRoute = (app) => {
  app.use('/api', router);
  router.use('/game', GameRoute);
  router.use('/banner', BannerRoute);
  router.use('/user', UserRoute);
  router.use('/denomination', DenominationRoute);
  router.use('/transaction', TransactionRoute);
  router.use('/post', PostRoute)
  router.use('/comment', CommentRoute)
};

export default indexRoute;
