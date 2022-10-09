import express from 'express';
import UserController from "../controller/UserController.js";
import { verifyToken } from "../Middleware/Verify.js"
const { fetchAdmin, userRegistration, doLogin, logOut } = UserController
import { refreshToken} from "../controller/RefreshToken.js";

const UserRoute = express.Router();

UserRoute.get('/', verifyToken, fetchAdmin)
UserRoute.post('/register', userRegistration)
UserRoute.post('/sign-in', doLogin)
UserRoute.get('/token', refreshToken)
UserRoute.delete('/sign-out', logOut)
export default UserRoute;