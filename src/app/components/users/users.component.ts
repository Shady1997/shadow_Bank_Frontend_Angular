import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  userForm: User = {
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: ''
  };

  searchUsername: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAllUsers();
  }

  createUser(): void {
    this.loading = true;
    this.clearMessages();

    this.userService.createUser(this.userForm).subscribe({
      next: (user) => {
        this.successMessage = 'User created successfully!';
        this.users.push(user);
        this.resetForm();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to create user';
        this.loading = false;
      }
    });
  }

  loadAllUsers(): void {
    this.loading = true;
    this.clearMessages();

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.successMessage = 'Users loaded successfully!';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch users';
        this.loading = false;
      }
    });
  }

  searchByUsername(): void {
    if (!this.searchUsername) return;

    this.loading = true;
    this.clearMessages();

    this.userService.getUserByUsername(this.searchUsername).subscribe({
      next: (user) => {
        this.users = [user];
        this.successMessage = 'User found!';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'User not found';
        this.loading = false;
      }
    });
  }

  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.loading = true;
    this.clearMessages();

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        this.successMessage = 'User deleted successfully!';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete user';
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.userForm = {
      username: '',
      email: '',
      password: '',
      fullName: '',
      phoneNumber: ''
    };
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
