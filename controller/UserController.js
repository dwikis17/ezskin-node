import User from "../model/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Transaction from "../model/Transaction.js";

class UserController {
    static fetchAdmin = async (req,res,next) => {
        try{
            const user = await User.aggregate([{$project:{
                    name:1,
                    email:1
                }}])
            res.status(200).send(user)
        }catch(error){
            next(error)
        }
    }

    static userRegistration = async (req, res, next) => {
        const {name, email, password, key} = req.body

        console.log(req.body)

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)

        try {
            if ( key !== process.env.REGISTER_KEY) throw ("Incorrect Key !")
          await  User.create({
                name: name,
                email:email,
                password:hashPassword
            })
            res.json({msg: "Registered !"})
        } catch (error) {
            res.status(400).send({success: false, error: {message: error}})
            next(error)
        }
    }

    static doLogin = async (req, res, next) => {
        try {
            const user = await User.find({email: req.body.email})
            console.log(req.body)
            console.log(user[0])
            const match = await bcrypt.compare(req.body.password, user[0].password)
            console.log(match);
            if(!match) return  res.status(404).json({msg: "email or password doesnt match!"})

            const userId = user[0]._id;
            const name = user[0].name;
            const email = user[0].email;
        
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn : '24h'
            })

                
            res.json({accessToken})
        } catch (error){
            next(error)
             res.status(500).json({msg: "email or password doesnt match!"})
        }
    }

    static logOut = async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);

        const user = await User.find({
            refresh_token : refreshToken
        });

        if(!user[0]) return res.sendStatus(204);
        const userId = user[0]._id;

        await User.updateOne({_id: userId}, {$set: {refresh_token: null}})

        res.clearCookie('refreshToken');

        return res.sendStatus(200)
    }

    static checkToken = async(req,res,next) => {
        const {token} = req.params
        if(token === null) return res.sendStatus(401);
    
        try{
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
                if(err) return res.status(403).json({message: 'Token not valid'})
                req.email = decodedToken.email
                res.status(200).json({decodedToken})
            })
        }catch(error){
            console.log(error)
        }
        
    }

    static fetchAllTransaction = async (req, res, next) => {
        console.log('ss')
        try{
            const transaction = await Transaction.find()
            res.status(200).send(transaction)
        }catch(error){
            next(error)
        }
    }
}
export default UserController