import DenominationRepository from "../repository/DenominationRepository.js";

const { getDenomination } = DenominationRepository

class DenominationService {
    static getAllDenomination = async () => {
        return getDenomination();
    }
}

export default DenominationService
