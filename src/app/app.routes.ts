import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'transactions', component: TransactionsComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];