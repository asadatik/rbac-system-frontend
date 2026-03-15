# RBAC Frontend

A clean Next.js dashboard for role-based access control with JWT authentication.

## Quick Start

### Install & Run
```bash
npm install
cp .env.example .env.local
# Update NEXT_PUBLIC_API_URL to match your backend
npm run dev
```

Open `http://localhost:3000` in your browser.

## Features

- **JWT Authentication** - Login with email/password, auto token refresh
- **Protected Routes** - Auth guard for dashboard access
- **Role-Based UI** - Admin panel visibility based on user role
- **Responsive Design** - Mobile-first Tailwind CSS layout
- **Form Validation** - React Hook Form with Zod schemas
- **API Integration** - Axios with automatic auth headers

## Project Structure

```
src/
├── app/              # Pages and layouts
├── components/       # UI components (Navbar, ProtectedRoute, RoleGuard)
├── lib/              # API client and auth utilities
├── hooks/            # useAuth hook
└── types/            # TypeScript interfaces
```
├── lib/             # Utilities (API client, auth helpers)
├── hooks/           # Custom React hooks
└── types/           # TypeScript type definitions
```

## API Integration

The frontend connects to the RBAC backend API. Ensure the backend is running before starting the frontend.

### Authentication Flow

1. User logs in with credentials
2. Backend returns access and refresh tokens
3. Tokens stored in HTTP-only cookies (js-cookie)
4. Axios interceptor automatically adds auth header
5. Token refresh handled automatically on 401 response

### Role-Based UI

Use `RoleGuard` component to conditionally render UI based on roles:

```tsx
<RoleGuard user={user} requiredRole="admin">
  <AdminPanel />
</RoleGuard>
```

Or check permissions:

```tsx
<RoleGuard user={user} requiredPermission="users:write">
  <UserForm />
</RoleGuard>
```

## Dependencies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **js-cookie** - Cookie management
