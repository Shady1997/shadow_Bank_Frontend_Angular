import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  accountForm = {
    accountNumber: '',
    accountType: 'SAVINGS',
    balance: 0,
    creditLimit: 0,
    userId: ''
  };

  searchAccountNumber: string = '';
  searchUserId: string = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAllAccounts();
  }

  createAccount(): void {
    this.loading = true;
    this.clearMessages();

    const payload = {
      accountNumber: this.accountForm.accountNumber,
      accountType: this.accountForm.accountType,
      balance: parseFloat(this.accountForm.balance.toString()),
      creditLimit: parseFloat(this.accountForm.creditLimit.toString()),
      userId: parseInt(this.accountForm.userId)
    };

    this.accountService.createAccount(payload).subscribe({
      next: (account) => {
        this.successMessage = 'Account created successfully!';
        this.accounts.push(account);
        this.resetForm();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to create account';
        this.loading = false;
      }
    });
  }

  loadAllAccounts(): void {
    this.loading = true;
    this.clearMessages();

    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.successMessage = 'Accounts loaded successfully!';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch accounts';
        this.loading = false;
      }
    });
  }

  searchByAccountNumber(): void {
    if (!this.searchAccountNumber) return;

    this.loading = true;
    this.clearMessages();

    this.accountService.getAccountByNumber(this.searchAccountNumber).subscribe({
      next: (account) => {
        this.accounts = [account];
        this.successMessage = 'Account found!';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Account not found';
        this.loading = false;
      }
    });
  }

  searchByUserId(): void {
    if (!this.searchUserId) return;

    this.loading = true;
    this.clearMessages();

    this.accountService.getAccountsByUserId(parseInt(this.searchUserId)).subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.successMessage = 'Accounts found!';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Accounts not found';
        this.loading = false;
      }
    });
  }

  deleteAccount(id: number): void {
    if (!confirm('Are you sure you want to delete this account?')) return;

    this.loading = true;
    this.clearMessages();

    this.accountService.deleteAccount(id).subscribe({
      next: () => {
        this.accounts = this.accounts.filter(a => a.id !== id);
        this.successMessage = 'Account deleted successfully!';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete account';
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.accountForm = {
      accountNumber: '',
      accountType: 'SAVINGS',
      balance: 0,
      creditLimit: 0,
      userId: ''
    };
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}