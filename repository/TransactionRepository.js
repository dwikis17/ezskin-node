import Transaction from "../model/Transaction.js";

class TransactionRepository{

    static createTransaction = (payload) => {
        return Transaction.create(payload)
    }
}

export default TransactionRepository;