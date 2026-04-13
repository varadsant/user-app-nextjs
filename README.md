# User Management App

A full-stack user management app built with Next.js, React, TypeScript, MySQL, and JWT authentication.

## Overview

This project demonstrates:

- User registration and login
- Password hashing with `bcrypt`
- JWT-based authentication
- Protected API routes
- Client-side token storage using `localStorage`
- A protected welcome page after login

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- MySQL
- JWT (`jsonwebtoken`)
- `bcrypt`

## Project Structure

- `app/api/register/route.ts` - register a new user
- `app/api/login/route.ts` - authenticate a user and return a JWT
- `app/api/protected/route.ts` - protected route that returns authenticated user data
- `app/api/users/route.ts` - fetch or create users
- `app/welcome/page.tsx` - protected welcome page
- `lib/auth.ts` - JWT sign and verify helpers
- `lib/authMiddleware.ts` - token validation helper
- `lib/db.ts` - MySQL connection pool

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment Setup

Create a `.env` file with:

```env
JWT_SECRET=your_jwt_secret
```

## Database Setup

This app uses MySQL and expects a database named `next_js`.

The current database connection is configured in `lib/db.ts` with:

- host: `localhost`
- user: `root`
- password: empty string
- database: `next_js`

Make sure your MySQL server is running and create a `users` table similar to this:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NULL
);
```

## API Endpoints

### `POST /api/register`

Registers a new user and stores a hashed password.

Expected body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### `POST /api/login`

Authenticates the user and returns a JWT token.

Expected body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

### `GET /api/protected`

Requires an `Authorization` header:

```http
Authorization: Bearer <token>
```

Returns authenticated user information if the token is valid.

### `GET /api/users`

Returns all users.

### `POST /api/users`

Creates a user with `name` and `email`.

## Authentication Flow

1. A user registers through `/api/register`.
2. The password is hashed with `bcrypt` before saving.
3. The user logs in through `/api/login`.
4. The server returns a JWT token.
5. The token is stored in `localStorage`.
6. The `/welcome` page sends the token to `/api/protected`.
7. If the token is valid, the user can access protected content.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - build the app for production
- `npm run start` - start the production server
- `npm run lint` - run ESLint
