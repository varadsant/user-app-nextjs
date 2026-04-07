This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev


## User Management App (Next.js + Node.js + TypeScript + JWT + MySQL)

This is a full-stack user management application built with Next.js (App Router), React, TypeScript, MySQL, and JWT authentication.

It demonstrates:

User registration & login
Password hashing using bcrypt
JWT authentication and protected API routes
Client-side token storage & protected frontend pages
API route middleware for token verification
TypeScript types for safer code

## Features Implemented APIs

Authentication Flow
**User Registration (POST /api/register)**
Saves user in database
Password is hashed using bcrypt
**User Login (POST /api/login)**
Verifies email & hashed password
Returns JWT token
**JWT Middleware (lib/authMiddleware.ts)**
Protects API routes
Verifies token before allowing access
**Protected API Route (GET /api/protected)**
Requires valid JWT
Returns user info
**Frontend Token Handling**
Stores JWT in localStorage
Checks token before rendering protected page /welcome
**Logout**
Removes token from localStorage
Redirects to login page

```
