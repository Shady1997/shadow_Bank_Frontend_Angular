import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'isAuthenticated';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'shady1997' && password === 'shady1997') {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }
}
