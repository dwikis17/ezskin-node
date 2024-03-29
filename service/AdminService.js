import AdminRepository from "../repository/AdminRepository.js";
import bcrypt from 'bcrypt';
import lodash from 'lodash'
import jwt from 'jsonwebtoken'

const { isEmpty } = lodash;

const { findAllAdmin, findAdminByEmail, registerNewAdmin } = AdminRepository;
class AdminService {
    static fetchAllAdmin = async (req, res, next) => {
        return await findAllAdmin();
    }

    static  checkIsEmailDuplicate = async (email) => {
        return !isEmpty(await findAdminByEmail(email))
    }

    static registerAdmin = async (payload) => {
        const { name, email, password, key } = payload
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)

        if ( key !== process.env.REGISTER_KEY) {
           const error = new Error('Incorrect Register Key !')
           error.status = 500;
           throw error;
        }

       const isEmailDuplicate = await this.checkIsEmailDuplicate(email);
        if(isEmailDuplicate){
            const error = new Error('Email already taken !')
            error.status = 409;
            throw error;
        }

        const finalPayload = {
            name, email, password: hashPassword
        }

        return registerNewAdmin(finalPayload)
    }

    static doLogin = async (payload, next) => {
        const {email, password} = payload;
        const foundedAdmin = await findAdminByEmail(email)
        const isPasswordMatch = await bcrypt.compare(password, foundedAdmin.password)

        if(!isPasswordMatch) {
            const error = new Error();
            error.status = 401;
            error.message = "password did not match!"
            throw error
        }

        const userId = foundedAdmin._id;
        const name = foundedAdmin.name;

        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : '24h'
        })

        return accessToken;
    }
}

export default AdminService;
