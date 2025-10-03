import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8083/api/accounts';

  constructor(private http: HttpClient) {}

  createAccount(account: any): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  getAccountsByUserId(userId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/user/${userId}`);
  }

  getAccountByNumber(accountNumber: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/number/${accountNumber}`);
  }

  updateAccount(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, account);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}