import DenominationReposistory from "../repository/DenominationRepository.js";

const {getDenomination} = DenominationReposistory

class DenominationService {
    static getAllDenomination = async () => {
        return getDenomination();
    }
}

export default DenominationService