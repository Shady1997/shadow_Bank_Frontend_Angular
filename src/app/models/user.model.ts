export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  fullName: string;
  phoneNumber: string;
  createdAt?: string;
  updatedAt?: string;
}