import Denomination from "../model/Denomination.js";

class DenominationRepository {
 static getDenomination = () => {
    return Denomination.find({})
 }
}

export default DenominationRepository;
