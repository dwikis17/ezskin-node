import UserRepository from "../repository/UserRepository.js";
import bcrypt from 'bcrypt';
import lodash from 'lodash'
import jwt from 'jsonwebtoken'

const { isEmpty } = lodash;

const { findAllAdmin, findAdminByEmail, registerNewAdmin } = UserRepository;
class UserService {
    static fetchAllAdmin = async (req, res, next) => {
        return await findAllAdmin();
    }

    static  checkIsEmailDuplicate = async (email) => {
        return !isEmpty(await findAdminByEmail(email))
    }

    static registerUser = async (payload) => {
        const { name, email, password, key } = payload
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)
        console.log(payload,'pay')
        // if ( key !== process.env.REGISTER_KEY) {
        //    const error = new Error('Incorrect Register Key !')
        //    error.status = 500;
        //    throw error;
        // }

       const isEmailDuplicate = await this.checkIsEmailDuplicate(email);
        if(isEmailDuplicate){
            const error = new Error('Email already taken !')
            error.status = 409;
            throw error;
        }

        const finalPayload = {
            name, email, password: hashPassword, isAdmin: false
        }

        return registerNewAdmin(finalPayload)
    }

    static doLogin = async (payload, next) => {
        const {email, password} = payload;
        const foundedAdmin = await findAdminByEmail(email)
        const isPasswordMatch = await bcrypt.compare(password, foundedAdmin.password)
        console.log(foundedAdmin,'founded')
        if(!isPasswordMatch) {
            const error = new Error();
            error.status = 401;
            error.message = "password did not match!"
            throw error
        }

        const userId = foundedAdmin._id;
        const name = foundedAdmin.name;
        const isAdmin = foundedAdmin.isAdmin
        console.log(isAdmin,'isadmin')
        const accessToken = jwt.sign({userId, name, email, isAdmin}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : '24h'
        })

        return {accessToken, isAdmin:foundedAdmin.isAdmin};
    }
}

export default UserService;
