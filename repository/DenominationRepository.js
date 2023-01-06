import Denomination from "../model/Denomination.js";

class DenominationReposistory {
 static getDenomination = () => {
    return Denomination.find({})
 }
}

export default DenominationReposistory;