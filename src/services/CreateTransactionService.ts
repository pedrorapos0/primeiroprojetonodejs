import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    if (type === 'outcome') {
      const sumIncome = this.transactionsRepository
        .all()
        .reduce((sum, trans) => {
          if (trans.type === 'income') {
            sum += trans.value;
          }
          return sum;
        }, 0);

      const sumOutcome = this.transactionsRepository
        .all()
        .reduce((sum, trans) => {
          if (trans.type === 'outcome') {
            sum += trans.value;
          }
          return sum;
        }, 0);

      if (value > sumIncome - sumOutcome) {
        throw Error('value greater than income');
      }
    }
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return transaction;
    // TODO
  }
}

export default CreateTransactionService;
