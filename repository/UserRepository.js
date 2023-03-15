import User from "../model/User.js";
import { findAllAdmin } from "./Queries/AdminQueries.js"

class UserRepository {
        static findAllAdmin = () => {
            const query = findAllAdmin();
            return User.aggregate(query)
        }

        static findAdminByEmail = async (email) => {
            return await User.findOne({email:email})
        }

        static registerNewAdmin = async (payload) => {
            await User.create(payload)
        }
}

export default UserRepository
