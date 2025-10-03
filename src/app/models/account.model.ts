export interface Account {
  id?: number;
  accountNumber: string;
  accountType: 'SAVINGS' | 'CHECKING' | 'CREDIT';
  balance: number;
  creditLimit?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'FROZEN' | 'CLOSED';
  userId?: number;
  user?: any;
  createdAt?: string;
  updatedAt?: string;
}