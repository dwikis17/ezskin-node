import DenominationService from "../service/DenominationService.js"

const { getAllDenomination, createNewDenomination, deleteById } = DenominationService

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

 static deleteDenomination = async (req, res, next) => {
    const {id} = req.params
    try{
        await deleteById(id)
        res.status(202).json({message:'Denomination deleted successfully'})
    }catch(error){
        next(error)
    }
 }
}

export default DenominationController;
