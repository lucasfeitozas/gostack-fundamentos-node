import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.filterTotalTransactionByType('income');
    const outcome = this.filterTotalTransactionByType('outcome');
    const total = income - outcome;

    return { income, outcome, total };
  }

  private filterTotalTransactionByType(type: string): number {
    const transactionFiltered = this.transactions.filter(
      transaction => transaction.type === type,
    );

    if (transactionFiltered.length === 0) return 0;
    const result = transactionFiltered
      .map(cv => cv.value)
      .reduce((a, b) => a + b);

    return result;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
