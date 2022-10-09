import express from 'express';
import UserController from "../model/controller/UserController.js";
const { fetchAdmin, userRegistration } = UserController

const UserRoute = express.Router();

UserRoute.get('/', fetchAdmin)
UserRoute.post('/register', userRegistration)

export default UserRoute;