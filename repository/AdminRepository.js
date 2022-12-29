import Admin from "../model/Admin.js";
import { findAllAdmin } from "./Queries/AdminQueries.js"

class AdminRepository {
        static findAllAdmin = () => {
            const query = findAllAdmin();
            return Admin.aggregate(query)
        }

        static findAdminByEmail = async (email) => {
            return await Admin.findOne({email:email})
        }
        
        static registerNewAdmin = async (payload) => {
            console.log(payload)
               await  Admin.create(payload)
        }
}

export default AdminRepository