import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  transactionForm = {
    transactionReference: '',
    fromAccountId: '',
    toAccountId: '',
    transactionType: 'DEPOSIT',
    amount: 0,
    fee: 0,
    description: ''
  };

  searchReference: string = '';
  searchAccountId: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadAllTransactions();
  }

  createTransaction(): void {
    this.loading = true;
    this.clearMessages();

    const payload = {
      transactionReference: this.transactionForm.transactionReference,
      fromAccountId: parseInt(this.transactionForm.fromAccountId),
      toAccountId: this.transactionForm.toAccountId ? parseInt(this.transactionForm.toAccountId) : null,
      transactionType: this.transactionForm.transactionType,
      amount: parseFloat(this.transactionForm.amount.toString()),
      fee: parseFloat(this.transactionForm.fee.toString()),
      description: this.transactionForm.description
    };

    this.transactionService.createTransaction(payload).subscribe({
      next: (transaction) => {
        this.successMessage = 'Transaction created successfully!';
        this.transactions.push(transaction);
        this.resetForm();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to create transaction';
        this.loading = false;
      }
    });
  }

  loadAllTransactions(): void {
    this.loading = true;
    this.clearMessages();

    this.transactionService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.successMessage = 'Transactions loaded successfully!';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch transactions';
        this.loading = false;
      }
    });
  }

  searchByReference(): void {
    if (!this.searchReference) return;

    this.loading = true;
    this.clearMessages();

    this.transactionService.getTransactionByReference(this.searchReference).subscribe({
      next: (transaction) => {
        this.transactions = [transaction];
        this.successMessage = 'Transaction found!';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Transaction not found';
        this.loading = false;
      }
    });
  }

  searchByAccountId(): void {
    if (!this.searchAccountId) return;

    this.loading = true;
    this.clearMessages();

    this.transactionService.getTransactionsByAccountId(parseInt(this.searchAccountId)).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.successMessage = 'Transactions found!';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Transactions not found';
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.transactionForm = {
      transactionReference: '',
      fromAccountId: '',
      toAccountId: '',
      transactionType: 'DEPOSIT',
      amount: 0,
      fee: 0,
      description: ''
    };
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
