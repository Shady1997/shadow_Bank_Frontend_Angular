import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8083/api/transactions';

  constructor(private http: HttpClient) {}

  createTransaction(transaction: any): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/account/${accountId}`);
  }

  getTransactionByReference(reference: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/reference/${reference}`);
  }
}