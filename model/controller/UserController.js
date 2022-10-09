import User from "../User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class UserController {
    static fetchAdmin = async (req,res,next) => {
        try{
            const user = await User.find({})
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
            console.log(error,'slafdjk')
            res.status(400).send({success: false, error: {message: error}})
            next(error)
        }
    }
}
export default UserController