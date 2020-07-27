import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
    // TODO
  }

  public getBalance(): Balance {
    const sumIncome = this.transactions.reduce((sum, trans) =>  {
      if(trans.type === 'income'){
        sum += trans.value;
      }
      return sum;
    },0);

    const sumOutcome = this.transactions.reduce((sum, trans) =>  {
      if(trans.type === 'outcome'){
        sum += trans.value;
      }
      return sum;
    },0);


    return {income: sumIncome, outcome: sumOutcome, total: (sumIncome - sumOutcome)};
    // TODO
  }

  public create({title, value, type}: Omit<Transaction, 'id'>): Transaction {
   const transaction = new Transaction({title, type, value});
   this.transactions.push(transaction);
   return transaction;
    // TODO
  }
}

export default TransactionsRepository;
