import lodash from 'lodash'
const {isEmpty} = lodash
import DenominationRepository from "../repository/DenominationRepository.js";

const { getDenomination, createDenomination, findDenominationByNominal } = DenominationRepository

class DenominationService {
    static getAllDenomination = async () => {
        return getDenomination();
    }

    static checkExistingDenomination = async  (payload) => {
        const denomination =  await findDenominationByNominal(payload)
        return !isEmpty(denomination)
    }

    static createNewDenomination = async (payload) => {
        const isDenominationDuplicated = await this.checkExistingDenomination(payload.nominal)
        if(isDenominationDuplicated){
            const error = new Error
            error.status = 505
            error.message = 'Duplicated denomination !'
            throw error
        }
        return createDenomination(payload)
    }
}

export default DenominationService
