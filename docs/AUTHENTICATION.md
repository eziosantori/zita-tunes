# Zitadel Authentication Setup

This project uses NextAuth.js with Zitadel as the authentication provider.

## Prerequisites

1. **Zitadel Instance**: You need a Zitadel instance (cloud or self-hosted)
2. **Project & Application**: Create a project and application in your Zitadel console

## Zitadel Configuration

### 1. Create a Project in Zitadel Console

1. Log into your Zitadel console
2. Navigate to **Projects** → **Create New Project**
3. Give your project a name (e.g., "zTunes")

### 2. Create an Application

1. In your project, click **New Application**
2. Choose **Web Application**
3. Select **Authorization Code** flow
4. Set the **Redirect URIs**:
   - Development: `http://localhost:3000/api/auth/callback/zitadel`
   - Production: `https://yourdomain.com/api/auth/callback/zitadel`
5. Set **Post Logout URIs**:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
6. Enable **Dev Mode** for local development
7. Save and note down:
   - **Client ID**
   - **Client Secret**
   - **Project ID**

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Zitadel configuration:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-key

ZITADEL_ISSUER=https://your-instance.zitadel.cloud
ZITADEL_CLIENT_ID=your-client-id
ZITADEL_CLIENT_SECRET=your-client-secret
```

#### Generate NEXTAUTH_SECRET

You can generate a secure secret using:

```bash
openssl rand -base64 32
```

Or visit: https://generate-secret.vercel.app/32

## Features

- ✅ Zitadel OAuth integration
- ✅ Email verification enforcement
- ✅ Custom sign-in and error pages
- ✅ Session management
- ✅ TypeScript support
- ✅ Route protection middleware (configurable)

## Usage

### Basic Authentication Check

```tsx
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, {user?.name}!</div>;
}
```

### Session Data

The session includes:

- `user.id` - User ID from Zitadel
- `user.name` - Display name
- `user.email` - Email address
- `user.emailVerified` - Email verification status
- `accessToken` - Access token for Zitadel API calls

### Protected Routes

Uncomment and modify the `matcher` in `middleware.ts` to protect specific routes:

```ts
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
```

## Troubleshooting

### Common Issues

1. **"Access Denied" Error**: Ensure email verification is enabled and working in Zitadel
2. **"Configuration Error"**: Check your environment variables
3. **Redirect URI Mismatch**: Ensure redirect URIs in Zitadel match your NEXTAUTH_URL

### Email Verification

The application enforces email verification by default. Users with unverified emails will be denied access. To change this behavior, modify the `signIn` callback in `app/api/auth/[...nextauth]/route.ts`.

## Additional Scopes

If you need additional Zitadel scopes or user information, modify the `authorization.params.scope` in the Zitadel provider configuration.

Available scopes:

- `openid` - Basic OpenID Connect
- `email` - Email address
- `profile` - Profile information
- `urn:zitadel:iam:org:project:id:{PROJECT_ID}:aud` - Project-specific audience
