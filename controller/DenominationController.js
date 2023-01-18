import DenominationService from "../service/DenominationService.js"

const { getAllDenomination, createNewDenomination } = DenominationService

class DenominationController {
 static fetchDenomination = async (req, res, next) => {
    try{
        const denominationList = await getAllDenomination()
        res.status(200).send(denominationList)
    } catch (error){
        next(error)
    }
 }

 static createDenomination = async (req, res, next) => {
    try {
        const createdDenomination = await createNewDenomination(req.body)
        res.status(201).send(createdDenomination)
    } catch(error) {
        next(error)
    }
 }
}

export default DenominationController;
