import express from 'express';
import AdminController from '../controller/AdminController.js';

const {
    fetchAdmin,
    registerAdmin,
    doLogin,
    checkTokenValidity
} = AdminController;

const AdminRoute = express.Router();

AdminRoute.get('/', fetchAdmin);
AdminRoute.post('/', registerAdmin);
AdminRoute.post('/sign-in', doLogin);
AdminRoute.get('/verify/:token', checkTokenValidity);

export default AdminRoute;
