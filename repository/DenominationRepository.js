import Denomination from "../model/Denomination.js";
import mongodb from 'mongodb'

const {ObjectId} = mongodb
class DenominationRepository {
 static getDenomination = () => {
    return Denomination.find({})
 }

 static createDenomination = (payload) => {
   return Denomination.create(payload)
 }

 static findDenominationByNominal = (nominal) => {
   return Denomination.findOne({nominal})
 }

 static deleteDenominationById = (id) => {
  return Denomination.deleteOne({_id:ObjectId(id)})
 }
}

export default DenominationRepository;
