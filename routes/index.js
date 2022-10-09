import express from "express";
import UserRoute from "./UserRoute.js";
var router = express.Router();

const indexRoute = (app) => {
  app.use('/api',router);
  router.use('/user', UserRoute)
}

export default indexRoute;