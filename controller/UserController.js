import jwt, { decode } from 'jsonwebtoken'
import UserService from "../service/UserService.js";

const { fetchAllAdmin, registerUser: registerAdmin, doLogin } = UserService;

class UserController {
    static fetchAdmin = async (req, res, next) => {
        try{
            const adminList = await fetchAllAdmin();
            res.status(200).send(adminList)
        }catch(error){
            next(error)
        }
    }

    static registerUser = async (req, res, next) => {
        try {
            await registerAdmin(req.body)
            res.status(201).json({message:'Register Success !'})
        } catch (error) {
            next(error)
        }
    }

    static doLogin = async (req, res, next) => {
        try {
            const data = await doLogin(req.body, next)
            res.json({accessToken:data.accessToken, isAdmin:data.isAdmin})
        } catch(error) {
            next(error)
        }
    }

    static checkTokenValidity = async(req, res, next) => {
        const {token} = req.params
        if (token === null) return res.sendStatus(401);
        try{
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
                if(err) return res.status(403).json({message: 'Token not valid'})
                console.log(decodedToken)
                req.email = decodedToken.email
                res.status(200).json({decodedToken})
            })
        } catch(error) {
            next(error)
        }
    }
}
export default UserController;
