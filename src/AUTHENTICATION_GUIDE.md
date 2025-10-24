# Wassel Authentication Guide

## ✅ Supabase Connection Status

**Your Supabase backend is now CONNECTED and ACTIVE!**

- **Project ID**: ncbwummxjmsfcreagnmz
- **Status**: Connected ✓
- **Authentication**: Enabled
- **Database**: Production-ready schema deployed

## 🔐 Authentication Features

### Sign Up
Users can create accounts with:
- Email (required)
- Password (minimum 6 characters)
- First Name & Last Name (required)
- Phone Number (optional)

**Process:**
1. User fills the signup form
2. Supabase creates authentication user
3. Profile record is created in `profiles` table
4. Email verification sent (if email confirmation enabled)
5. User can log in immediately or wait for email verification

### Sign In
Users can log in with:
- Email
- Password

**Process:**
1. User enters credentials
2. Supabase validates credentials
3. Session created and stored in localStorage
4. User profile loaded from database
5. User redirected to dashboard

### Sign Out
- Clears session
- Removes localStorage data
- Redirects to landing page

## 📊 User Profile Data

When a user signs up, the following profile is created:

```typescript
{
  id: string (UUID from auth.users)
  email: string
  phone: string | null
  full_name: string
  avatar_url: null
  bio: null
  date_of_birth: null
  gender: null
  city: null
  country: 'UAE' (default)
  phone_verified: false
  email_verified: false
  is_verified: false
  verification_level: 0
  total_trips: 0
  trips_as_driver: 0
  trips_as_passenger: 0
  rating_as_driver: 0.0
  rating_as_passenger: 0.0
  wallet_balance: 0.0
  language: 'en'
  currency: 'AED'
  ... (and more fields)
}
```

## 🔧 How It Works

### 1. Client Configuration (`/utils/supabase/client.ts`)
- Imports credentials from `/utils/supabase/info.tsx`
- Builds Supabase URL: `https://ncbwummxjmsfcreagnmz.supabase.co`
- Creates authenticated client with PKCE flow
- Enables session persistence in localStorage

### 2. Auth Context (`/contexts/AuthContext.tsx`)
- Manages authentication state
- Provides `signUp`, `signIn`, `signOut` functions
- Listens for auth state changes
- Fetches and caches user profile
- Exposes `user`, `profile`, `session`, `loading`, and `isBackendConnected`

### 3. Auth Page (`/components/AuthPage.tsx`)
- Two tabs: Sign Up and Log In
- Form validation
- Error handling with user-friendly messages
- Shows backend connection status
- Supports both Demo Mode and Real Backend

### 4. App (`/App.tsx`)
- Wraps app with `AuthProvider`
- Auto-navigates based on auth state
- Shows loading state during authentication check

## 🎯 Usage Examples

### Accessing Auth in Components

```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, profile, signOut, isBackendConnected } = useAuth();
  
  if (!user) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <p>Welcome, {profile?.full_name}!</p>
      <p>Email: {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Checking Backend Status

```typescript
const { isBackendConnected } = useAuth();

if (isBackendConnected) {
  // Real backend - make API calls
} else {
  // Demo mode - use mock data
}
```

## 🔒 Security Features

### Row Level Security (RLS)
The database has RLS policies that ensure:
- Users can only update their own profiles
- Users can only see their own bookings
- Published trips are visible to everyone
- Private data is protected

### Password Requirements
- Minimum 6 characters (Supabase default)
- Can be customized in Supabase dashboard

### Session Management
- PKCE flow for enhanced security
- Automatic token refresh
- Secure localStorage persistence
- Session expires after inactivity

## 🐛 Error Handling

All Supabase errors are translated to user-friendly messages:

| Supabase Error | User-Friendly Message |
|----------------|----------------------|
| Invalid login credentials | Invalid email or password. Please try again. |
| Email not confirmed | Please verify your email address before logging in. |
| User already registered | An account with this email already exists. |

## 🚀 Testing Authentication

### Sign Up Flow
1. Go to landing page
2. Click "Get Started" or "Sign Up"
3. Fill in the form:
   - First Name: `Ahmed`
   - Last Name: `Hassan`
   - Email: `test@example.com`
   - Phone: `+971501234567`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Create Account"
5. You should see: "Account created successfully!"
6. User is logged in automatically

### Sign In Flow
1. Go to landing page
2. Click "Log In"
3. Enter credentials:
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Sign In"
5. You should see: "Signed in successfully!"
6. Redirected to dashboard

## 📝 Next Steps

1. **Email Verification**: Configure email templates in Supabase dashboard
2. **Password Reset**: Implement forgot password flow
3. **Social Auth**: Add Google/Facebook OAuth (optional)
4. **Multi-factor Auth**: Enable MFA in Supabase (optional)
5. **Phone Verification**: Implement SMS verification with Twilio

## 🔗 Related Files

- `/utils/supabase/client.ts` - Supabase client configuration
- `/utils/supabase/info.tsx` - Supabase credentials (auto-generated)
- `/utils/supabase/database.types.ts` - TypeScript types
- `/contexts/AuthContext.tsx` - Authentication context provider
- `/components/AuthPage.tsx` - Authentication UI
- `/App.tsx` - Main app with auth integration
- `/supabase/schema.sql` - Database schema

## ✨ Status Indicators

You'll see status indicators in:
- **Browser Console**: Shows whether Supabase is connected
- **Auth Page**: Shows green banner when connected, blue when in demo mode
- **Throughout App**: Components can check `isBackendConnected`

---

**🎉 Your authentication system is fully functional and ready to use!**

Try creating an account and logging in. All data will be stored in your Supabase database.
