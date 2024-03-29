import jwt from 'jsonwebtoken'
import AdminService from "../service/AdminService.js";

const { fetchAllAdmin, registerAdmin, doLogin } = AdminService;

class AdminController {
    static fetchAdmin = async (req, res, next) => {
        try{
            const adminList = await fetchAllAdmin();
            res.status(200).send(adminList)
        }catch(error){
            next(error)
        }
    }

    static registerAdmin = async (req, res, next) => {
        try {
            await registerAdmin(req.body)
            res.status(201).json({message:'Register Success !'})
        } catch (error) {
            next(error)
        }
    }

    static doLogin = async (req, res, next) => {
        try {
            const accessToken = await doLogin(req.body, next)
            res.json({accessToken})
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
                req.email = decodedToken.email
                res.status(200).json({decodedToken})
            })
        } catch(error) {
            next(error)
        }
    }
}
export default AdminController;
