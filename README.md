# RBAC Frontend

A modern, minimal Next.js frontend for role-based access control dashboard.

## Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Features

- **JWT Authentication** - Secure token-based auth with refresh token support
- **Role-Based Access Control** - UI components protected by user roles and permissions
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Smooth Animations** - Framer Motion for polished interactions
- **Form Validation** - React Hook Form with Zod validation
- **API Integration** - Axios client with automatic auth interceptors

## Project Structure

```
src/
├── app/              # Next.js pages and layouts
├── components/       # Reusable UI components
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
# rbac-system-frontend
