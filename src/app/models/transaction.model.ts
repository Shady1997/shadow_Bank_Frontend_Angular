export interface Transaction {
  id?: number;
  transactionReference: string;
  fromAccountId: number;
  toAccountId?: number;
  amount: number;
  transactionType: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'PAYMENT';
  status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  description?: string;
  fee?: number;
  fromAccount?: any;
  toAccount?: any;
  createdAt?: string;
  processedAt?: string;
}