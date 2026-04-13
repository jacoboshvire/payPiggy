<!-- @format -->

# PayPiggy Frontend

A Next.js frontend for the PayPiggy banking application. Built with React, Next.js App Router, and Tailwind CSS.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages](#pages)
- [Architecture](#architecture)
- [Authentication Flow](#authentication-flow)
- [State Management](#state-management)

---

## Features

- User registration and login with JWT authentication
- Multi-channel OTP verification (Email, SMS, Push Notification)
- OTP channel selection before verification
- Forgot password with OTP verification flow
- Dashboard with account balance and transaction history
- Money transfers using account number, sort code and name
- Age-restricted transfer OTP verification (under 18, £500+)
- Vault — lock money for a set period with early withdrawal OTP
- Deposit money to main account
- Transfer money between main account and vault
- Infinite scroll transaction history
- Copy account details to clipboard
- Personal details page (address, date of birth, phone)
- Account details page (account number, sort code)
- Welcome onboarding flow for new users
- Automatic token expiry redirect to landing page
- Protected routes via Next.js middleware

---

## Tech Stack

| Layer     | Technology                             |
| --------- | -------------------------------------- |
| Framework | Next.js 14 (App Router)                |
| Language  | JavaScript / TypeScript                |
| Styling   | CSS Modules                            |
| Auth      | JWT stored in cookies and localStorage |
| HTTP      | Fetch API via custom api utility       |
| Cookies   | js-cookie                              |
| Images    | Next.js Image component                |

---

## Project Structure

```
paypiggy-frontend/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.jsx          # Login page
│   │   ├── register/
│   │   │   └── page.jsx          # Register page
│   │   ├── verification/
│   │   │   └── page.jsx          # OTP verification (shared for login + reset)
│   │   ├── otp-options/
│   │   │   └── page.jsx          # OTP channel selection
│   │   ├── forgot-password/
│   │   │   └── page.jsx          # Forgot password — enter email
│   │   ├── reset-password/
│   │   │   └── page.jsx          # Reset password — enter new password
│   │   └── welcome/
│   │       ├── layout.jsx        # Welcome layout
│   │       ├── page.jsx          # Welcome page
│   │       └── component/
│   │           ├── account.jsx   # Update first/last name form
│   │           └── profile.jsx   # Update address and DOB form
│   ├── dashboard/
│   │   ├── layout.jsx            # Dashboard layout with parallel routes
│   │   ├── page.jsx
│   │   ├── @Home/
│   │   │   └── page.jsx          # Home tab
│   │   ├── @Payment/
│   │   │   └── page.jsx          # Transfer money tab
│   │   ├── @Wallet/
│   │   │   └── page.jsx          # Wallet/vault tab
│   │   ├── @Account/
│   │   │   └── page.jsx          # Account tab
│   │   ├── @Add/
│   │   │   └── page.jsx          # Add money modal
│   │   ├── @AddToVault/
│   │   │   └── page.jsx          # Transfer to vault modal
│   │   ├── @WithdrawFromVault/
│   │   │   └── page.jsx          # Withdraw from vault modal
│   │   └── @AccountDetails/
│   │       └── page.jsx          # Account details modal
│   └── page.jsx                  # Landing page
├── lib/
│   ├── api.ts                    # Fetch wrapper with auth headers
│   └── auth.ts                   # Token save/remove/get helpers
├── middleware.ts                  # Route protection + token expiry
├── .env.local                    # Environment variables
└── public/                       # Static assets
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- PayPiggy backend running on `http://localhost:3000`

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/paypiggy-frontend.git
cd paypiggy-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

The app will run on `http://localhost:3001` by default.

---

## Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Pages

### Auth

| Page            | Path                    | Description                                     |
| --------------- | ----------------------- | ----------------------------------------------- |
| Login           | `/auth/login`           | Email and password login                        |
| Register        | `/auth/register`        | Create new account                              |
| OTP Options     | `/auth/otp-options`     | Choose OTP channel (email, SMS, push)           |
| Verification    | `/auth/verification`    | Enter OTP — shared for login and password reset |
| Forgot Password | `/auth/forgot-password` | Enter email to receive reset OTP                |
| Reset Password  | `/auth/reset-password`  | Enter new password after OTP verified           |
| Welcome         | `/auth/welcome`         | Onboarding for new users — set name and address |

### Dashboard

| Page             | Path                                            | Description                                 |
| ---------------- | ----------------------------------------------- | ------------------------------------------- |
| Home             | `/dashboard?home=true`                          | Balance, recent transactions, quick actions |
| Payment          | `/dashboard?payment=true`                       | Transfer money to another account           |
| Wallet           | `/dashboard?wallet=true`                        | Vault balance and management                |
| Account          | `/dashboard?account=true`                       | Account settings and details                |
| Add Money        | `/dashboard?add=true`                           | Deposit money to main account               |
| Add to Vault     | `/dashboard?vault=true`                         | Transfer from main account to vault         |
| Withdraw Vault   | `/dashboard?withdraw-vault=true`                | Withdraw from vault                         |
| Account Details  | `/dashboard?account=true&account_details=true`  | Account number, sort code                   |
| Personal Details | `/dashboard?account=true&personal_details=true` | Name, email, phone, address, DOB            |

---

## Architecture

### Parallel Routes

The dashboard uses Next.js parallel routes to render multiple slots simultaneously without full page navigation:

```
app/dashboard/
  layout.jsx          ← receives all slots as props
  @Home/              ← rendered when ?home=true
  @Payment/           ← rendered when ?payment=true
  @Wallet/            ← rendered when ?wallet=true
  @Account/           ← rendered when ?account=true
  @Add/               ← rendered when ?add=true
  @AddToVault/        ← rendered when ?vault=true
  @WithdrawFromVault/ ← rendered when ?withdraw-vault=true
  @AccountDetails/    ← rendered when ?account_details=true
```

Each slot component conditionally renders based on `useSearchParams()` and `usePathname()`.

### API Utility

All API calls go through `lib/api.ts` which automatically attaches the JWT token from localStorage:

```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = {
  get: async (endpoint: string) => { ... },
  post: async (endpoint: string, body: Record<string, unknown>) => { ... },
  put: async (endpoint: string, body: Record<string, unknown>) => { ... },
  delete: async (endpoint: string) => { ... },
};
```

### Middleware

`middleware.ts` protects routes and handles token expiry:

- Protected routes redirect to `/auth/login` if no token
- Expired tokens redirect to `/` (landing page) and clear the cookie
- Auth routes redirect to `/dashboard` if already logged in
- Welcome page only accessible with `isNewUser` cookie
- Verification page only accessible with `userId` cookie

---

## Authentication Flow

### Login

```
/auth/login
    ↓
POST /api/auth/login → returns userId
    ↓
userId saved to cookie
    ↓
/auth/otp-options → user picks channel
    ↓
OTP sent
    ↓
/auth/verification → user enters OTP
    ↓
POST /api/auth/verify-otp → returns JWT
    ↓
JWT saved to cookie + localStorage
accountId saved to localStorage
    ↓
/dashboard
```

### Register

```
/auth/register
    ↓
POST /api/auth/register → returns userId
    ↓
userId + isNewUser cookies saved
    ↓
/auth/otp-options → user picks channel
    ↓
OTP sent
    ↓
/auth/verification → user enters OTP
    ↓
JWT saved
    ↓
/auth/welcome → user enters name + address
    ↓
/dashboard
```

### Forgot Password

```
/auth/forgot-password → user enters email
    ↓
POST /api/auth/forgot-password → OTP sent
    ↓
userId + isReset cookies saved
    ↓
/auth/otp-options → user picks channel
    ↓
/auth/verification → user enters OTP
    ↓
POST /api/auth/verify-forgot-otp → returns resetToken
    ↓
resetToken saved to cookie
    ↓
/auth/reset-password → user enters new password
    ↓
POST /api/auth/reset-password
    ↓
/auth/login
```

---

## State Management

There is no global state library. State is managed through:

- **Cookies** (`js-cookie`) — `token`, `userId`, `isNewUser`, `isReset`, `resetToken`, `otpChannel`
- **localStorage** — `token`, `accountId`
- **React state** (`useState`) — component-level UI state
- **URL search params** (`useSearchParams`) — controls which dashboard panel is visible

### Cookie Reference

| Cookie       | Purpose                                 | Cleared when               |
| ------------ | --------------------------------------- | -------------------------- |
| `token`      | JWT auth token                          | Logout or expiry           |
| `userId`     | Temporary user ID during OTP flow       | After OTP verified         |
| `isNewUser`  | Flags new user for welcome page         | After welcome page visited |
| `isReset`    | Flags password reset OTP flow           | After OTP verified         |
| `resetToken` | Token for password reset                | After password reset       |
| `otpChannel` | Remembers chosen OTP channel for resend | After OTP verified         |

---

## License

MIT - PayPiggy
