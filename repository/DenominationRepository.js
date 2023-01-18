import Denomination from "../model/Denomination.js";

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
}

export default DenominationRepository;
