# Mobile Banking Dashboard - Angular Frontend

A comprehensive banking management system built with Angular 17 and Spring Boot, featuring user management, account management, and transaction handling.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Angular CLI**: v17.x
- **Java**: JDK 17 or higher (for backend)
- **Spring Boot API**: Running on port 8083

## Technology Stack

- **Frontend**: Angular 17 (Standalone Components)
- **Styling**: Tailwind CSS
- **Backend**: Spring Boot REST API
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router

## Project Structure

```
banking-frontend-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── accounts/
│   │   │   └── transactions/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── account.service.ts
│   │   │   └── transaction.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   ├── account.model.ts
│   │   │   └── transaction.model.ts
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── styles.css
│   ├── main.ts
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── tailwind.config.js
```

## Installation & Setup

### Step 1: Clone or Download the Project

```bash
cd banking-frontend-angular
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure API URL

The application is configured to connect to the Spring Boot API on **port 8083**.

Verify the API URLs in the service files:

- `src/app/services/user.service.ts`
- `src/app/services/account.service.ts`
- `src/app/services/transaction.service.ts`

All should point to:
```typescript
private apiUrl = 'http://localhost:8083/api/[resource]';
```

### Step 4: Start the Backend API

Ensure your Spring Boot application is running on port **8083**:

```bash
# In your Spring Boot project directory
mvn spring-boot:run

# Or with Gradle
./gradlew bootRun
```

Verify the backend is running by visiting:
```
http://localhost:8083/api/users
```

### Step 5: Configure CORS (Backend)

Ensure your Spring Boot `CorsConfig.java` allows requests from Angular:

```java
corsConfiguration.setAllowedOrigins(Arrays.asList(
    "http://localhost:4200"  // Angular development server
));
```

### Step 6: Start the Angular Application

```bash
ng serve
```

The application will start on:
```
http://localhost:4200
```

## Running the Application

1. **Start Spring Boot Backend** (Port 8083)
   ```bash
   mvn spring-boot:run
   ```

2. **Start Angular Frontend** (Port 4200)
   ```bash
   ng serve
   ```

3. **Access the Application**
   
   Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

## Login Credentials

Use the following credentials to access the dashboard:

```
Username: shady1997
Password: shady1997
```

## Features

### 1. Authentication
- Secure login page
- Protected routes with Auth Guard
- Session management
- Logout functionality

### 2. User Management
- Create new users
- View all users
- Search users by username
- Delete users
- Form validation (username min 3 chars, password min 8 chars)

### 3. Account Management
- Create bank accounts (Savings, Checking, Credit)
- View all accounts
- Search accounts by account number
- Search accounts by user ID
- Set credit limits
- Delete accounts
- View account status and balance

### 4. Transaction Management
- Create transactions (Deposit, Withdrawal, Transfer, Payment)
- View all transactions
- Search by transaction reference
- Search by account ID
- View transaction status and fees
- Color-coded transaction types

## API Endpoints Used

### Users API
- `POST /api/users` - Create user
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/username/{username}` - Get user by username
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Accounts API
- `POST /api/accounts` - Create account
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/{id}` - Get account by ID
- `GET /api/accounts/user/{userId}` - Get accounts by user ID
- `GET /api/accounts/number/{accountNumber}` - Get account by number
- `DELETE /api/accounts/{id}` - Delete account

### Transactions API
- `POST /api/transactions` - Create transaction
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/{id}` - Get transaction by ID
- `GET /api/transactions/account/{accountId}` - Get transactions by account
- `GET /api/transactions/reference/{reference}` - Get transaction by reference

## Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Troubleshooting

### CORS Errors
If you encounter CORS errors, ensure:
1. Spring Boot CORS configuration includes `http://localhost:4200`
2. Backend is running on port 8083
3. Restart both frontend and backend

### Port Already in Use
If port 4200 is already in use:
```bash
ng serve --port 4201
```

Update CORS configuration accordingly.

### API Connection Failed
1. Verify backend is running: `http://localhost:8083/api/users`
2. Check console for error messages
3. Verify API URLs in service files match your backend port

### Compilation Errors
If you get TypeScript errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Development Commands

```bash
# Start development server
ng serve

# Build project
ng build

# Run tests
ng test

# Generate component
ng generate component component-name

# Generate service
ng generate service service-name
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Project Information

- **Author**: Shady Ahmed
- **LinkedIn**: [https://www.linkedin.com/in/shady-ahmed97/](https://www.linkedin.com/in/shady-ahmed97/)
- **Date**: 2025-10-03
- **Angular Version**: 17.3.12
- **Node Version**: 18+

## License

This project is for educational and demonstration purposes.

---

For any issues or questions, please contact the development team.