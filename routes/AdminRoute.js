import express from 'express';
import { verifyToken } from '../Middleware/Verify.js';
import AdminController from '../controller/AdminController.js';

const {
  fetchAdmin, registerAdmin,
   doLogin, logOut, checkTokenValidity, fetchAllTransaction,
} = AdminController;

const AdminRoute = express.Router();

AdminRoute.get('/', fetchAdmin);
AdminRoute.post('/', registerAdmin);
AdminRoute.post('/sign-in', doLogin);
AdminRoute.get('/verify/:token', checkTokenValidity);

export default AdminRoute;
