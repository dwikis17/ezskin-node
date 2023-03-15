import express from 'express';
import UserController from '../controller/UserController.js';

const {
    fetchAdmin,
    registerUser: registerAdmin,
    doLogin,
    checkTokenValidity
} = UserController;

const UserRoute = express.Router();

UserRoute.get('/', fetchAdmin);
UserRoute.post('/', registerAdmin);
UserRoute.post('/sign-in', doLogin);
UserRoute.get('/verify/:token', checkTokenValidity);

export default UserRoute;
