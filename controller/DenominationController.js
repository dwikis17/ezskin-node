import DenominationService from "../service/DenominationService.js"

const {getAllDenomination} = DenominationService

class DenominationController {
 static fetchDenomination = async (req, res, next) => {
    try{
        const denominationList = await getAllDenomination()
        res.status(200).send(denominationList)
    } catch (error){
        next(error)
    }
 
 }
}

export default DenominationController;