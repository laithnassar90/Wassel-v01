# 🚀 Get Started with Wassel Backend - 30 Minute Setup

## Welcome! 👋

You're about to set up a **production-grade backend** that rivals billion-dollar companies.

**Time Required:** 30 minutes  
**Difficulty:** Easy (follow step-by-step)  
**Cost:** $0 (Free tier handles 50K users!)

---

## ⚡ Super Quick Start (For the Impatient)

```bash
# 1. Install dependencies (2 min)
npm install @supabase/supabase-js

# 2. Create environment file (1 min)
cp .env.example .env
# Add your Supabase URL and Key to .env

# 3. Run database migrations (3 min)
# Go to Supabase Dashboard → SQL Editor
# Copy/paste /supabase/schema.sql and run

# 4. Start developing! (1 min)
npm run dev
```

**Done! Your backend is live.** ✅

---

## 📋 Detailed Setup (Step-by-Step)

### Step 1: Create Supabase Project (5 minutes)

1. **Go to** [supabase.com](https://supabase.com)
2. **Click** "Start your project"
3. **Sign in** with GitHub (recommended)
4. **Click** "New Project"
5. **Fill in:**
   - Organization: Create new or select existing
   - Name: `wassel`
   - Database Password: (generate strong password - SAVE IT!)
   - Region: Choose closest to UAE (Singapore or Frankfurt)
   - Pricing Plan: Free (perfect to start!)
6. **Click** "Create new project"
7. **Wait** 2-3 minutes for provisioning

---

### Step 2: Get Your API Keys (1 minute)

1. In Supabase Dashboard, click **Settings** (⚙️)
2. Click **API** in sidebar
3. **Copy these values:**
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbGci... (long string)
   ```
4. **Keep these safe!** You'll need them next.

---

### Step 3: Configure Environment (2 minutes)

1. **In your project folder**, create `.env` file:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your credentials:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGci...
   ```

3. **Save the file**

---

### Step 4: Install Dependencies (2 minutes)

```bash
npm install @supabase/supabase-js
```

That's it! The Supabase client is the only new dependency.

---

### Step 5: Run Database Migrations (10 minutes)

This creates all your tables, security rules, and functions.

1. **Open Supabase Dashboard**
2. **Click** "SQL Editor" in sidebar
3. **Click** "+ New query"
4. **Open** `/supabase/schema.sql` in your code editor
5. **Copy ALL contents** (Ctrl+A, Ctrl+C)
6. **Paste** into Supabase SQL Editor
7. **Click** "Run" (or press Cmd/Ctrl + Enter)
8. **Wait** ~15 seconds for execution
9. **Check** for success message: "Success. No rows returned"

**What just happened?**
- ✅ Created 14 tables (users, trips, bookings, etc.)
- ✅ Added 30+ security policies
- ✅ Created 20+ performance indexes
- ✅ Set up 8 automatic triggers
- ✅ Installed 5 database functions
- ✅ Enabled geospatial search with PostGIS

---

### Step 6: Verify Setup (5 minutes)

Let's make sure everything works!

#### Test 1: Check Tables Created
1. In Supabase Dashboard, click **Table Editor**
2. You should see: profiles, trips, bookings, messages, etc.
3. ✅ If you see tables, great! If not, re-run migrations.

#### Test 2: Check Authentication
1. Click **Authentication** → **Users**
2. Click **Add user** (for testing)
3. Email: `test@example.com`
4. Password: `Test123!@#`
5. Click **Create user**
6. ✅ User created successfully!

#### Test 3: Test the App
1. **Start dev server:**
   ```bash
   npm run dev
   ```
2. **Open** http://localhost:5173
3. **Try to sign up/login**
4. ✅ If authentication works, you're golden!

---

### Step 7: Enable Real-time (Optional, 3 minutes)

For live updates across users:

1. **In Supabase Dashboard**, go to **Database** → **Replication**
2. **Find these tables** and click the toggle to enable:
   - trips
   - bookings
   - messages
   - notifications

Or run this SQL (faster):
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE trips;
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
```

---

### Step 8: Create Storage Buckets (Optional, 2 minutes)

For file uploads (avatars, verification documents):

**In Supabase Dashboard:**
1. Go to **Storage**
2. Click **New bucket**
3. Create these buckets:
   - `avatars` (Public)
   - `verifications` (Private)
   - `vehicles` (Public)

Or run SQL:
```sql
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('avatars', 'avatars', true),
  ('verifications', 'verifications', false),
  ('vehicles', 'vehicles', true);
```

---

## ✅ You're Done! 🎉

**Your backend now has:**
- ✅ Authentication (email/password)
- ✅ 14 database tables
- ✅ Row-level security
- ✅ Real-time subscriptions
- ✅ File storage
- ✅ Automatic backups
- ✅ Global CDN
- ✅ 50K user capacity

---

## 🧪 Test Your Backend

### Test Authentication:

```typescript
// In browser console or your code
import { supabase } from './utils/supabase/client';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'SecurePass123!',
});
console.log({ data, error });
```

### Create Your First Trip:

```typescript
const { data, error } = await supabase.from('trips').insert({
  driver_id: 'your-user-id',
  trip_type: 'wasel',
  from_location: 'Dubai Marina',
  from_lat: 25.0805,
  from_lng: 55.1396,
  to_location: 'Downtown Dubai',
  to_lat: 25.1972,
  to_lng: 55.2744,
  departure_date: '2025-10-20',
  departure_time: '14:00',
  available_seats: 3,
  price_per_seat: 35,
  status: 'published',
});
console.log({ data, error });
```

### Search Nearby Trips:

```typescript
const { data, error } = await supabase.rpc('search_nearby_trips', {
  from_lat: 25.0805,
  from_lng: 55.1396,
  to_lat: 25.1972,
  to_lng: 55.2744,
  max_distance_km: 10,
});
console.log('Nearby trips:', data);
```

---

## 📚 What to Read Next

### Immediate Next Steps:
1. **Quick Reference** - `/QUICK_REFERENCE.md`  
   → Learn common operations and patterns

2. **Integration Guide** - `/BACKEND_FILE_INDEX.md`  
   → Understand file organization

### Deep Dives:
3. **Setup Guide** - `/BACKEND_SETUP_GUIDE.md`  
   → Detailed configuration options

4. **Feature Overview** - `/PRODUCTION_BACKEND_SUMMARY.md`  
   → See everything you can do

### Development:
5. **Database Schema** - `/supabase/schema.sql`  
   → Study table structures

6. **Custom Hooks** - `/hooks/`  
   → See real code examples

---

## 🎯 Your First Feature

Let's add authentication to your app!

### 1. Wrap App with AuthProvider

**Edit `/App.tsx`:**

```typescript
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      {/* Your existing app */}
    </AuthProvider>
  );
}
```

### 2. Use Auth in Component

```typescript
import { useAuth } from './contexts/AuthContext';

function YourComponent() {
  const { user, signIn, signOut } = useAuth();

  if (user) {
    return <div>Welcome, {user.email}!</div>;
  }

  return <button onClick={() => signIn(email, password)}>Login</button>;
}
```

### 3. Fetch Real Data

```typescript
import { useTrips } from './hooks/useTrips';

function TripList() {
  const { trips, loading } = useTrips({ status: ['published'] });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {trips.map(trip => (
        <div key={trip.id}>{trip.from_location} → {trip.to_location}</div>
      ))}
    </div>
  );
}
```

**That's it!** You're using production data now. 🎉

---

## 🐛 Troubleshooting

### "Missing environment variables"
**Fix:** Create `.env` file with your Supabase credentials

### "relation does not exist"
**Fix:** Run the migrations in SQL Editor

### "Row level security policy violation"
**Fix:** Check that user is logged in before querying

### "Cannot find module '@supabase/supabase-js'"
**Fix:** Run `npm install @supabase/supabase-js`

### Still stuck?
1. Check `/INSTALLATION_INSTRUCTIONS.md`
2. Review `/BACKEND_SETUP_GUIDE.md`
3. Join [Supabase Discord](https://discord.supabase.com)

---

## 💡 Pro Tips

### Tip 1: Use TypeScript
You get full autocomplete for database queries!

### Tip 2: Trust RLS
Don't add security checks in your code - the database handles it.

### Tip 3: Real-time is Easy
Just subscribe to table changes - updates are automatic.

### Tip 4: Test Locally
Use the free tier to develop - upgrade when ready to launch.

### Tip 5: Read the Docs
Each service has detailed comments explaining what it does.

---

## 📊 What You Built

### In 30 Minutes, You Created:

| Feature | Status | Industry Comparison |
|---------|--------|-------------------|
| **Authentication** | ✅ | Same as Uber |
| **Database** | ✅ | Same as Lyft |
| **Real-time** | ✅ | Same as BlaBlaCar |
| **Geospatial Search** | ✅ | Better than most! |
| **Security (RLS)** | ✅ | Enterprise-grade |
| **Type Safety** | ✅ | Better than most! |
| **Scalability** | ✅ | 50K users included |
| **Cost** | ✅ | **FREE!** |

---

## 🚀 Ready to Launch?

### Development Checklist:
- [x] Backend setup complete
- [x] Authentication working
- [x] Database connected
- [ ] Replace mock data with real data
- [ ] Test all user flows
- [ ] Add payment integration
- [ ] Security audit
- [ ] Performance testing

### When Ready for Production:
1. Review `/BACKEND_SETUP_GUIDE.md` deployment section
2. Configure production environment variables
3. Enable email verification
4. Set up monitoring alerts
5. Configure backup schedule
6. Add custom domain
7. Launch! 🚀

---

## 🎉 Congratulations!

You now have a **production-grade backend** that:
- Handles thousands of users
- Costs $0-25/month to operate
- Scales automatically
- Is more secure than most startups
- Took 30 minutes to set up

**What billion-dollar companies spent months building, you have in 30 minutes.**

---

## 📞 Need Help?

### Documentation:
1. `/QUICK_REFERENCE.md` - Common operations
2. `/INSTALLATION_INSTRUCTIONS.md` - Setup help
3. `/BACKEND_SETUP_GUIDE.md` - Detailed guide
4. `/PRODUCTION_BACKEND_SUMMARY.md` - Feature overview

### Community:
- [Supabase Discord](https://discord.supabase.com)
- [Supabase Docs](https://supabase.com/docs)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

---

## 🎓 Keep Learning

### Beginner Path:
1. ✅ Complete this guide
2. → Read `/QUICK_REFERENCE.md`
3. → Build first feature
4. → Explore hooks in `/hooks/`

### Intermediate Path:
1. → Study `/supabase/schema.sql`
2. → Learn about RLS policies
3. → Add real-time features
4. → Optimize queries

### Advanced Path:
1. → Create custom database functions
2. → Build Edge Functions
3. → Implement caching strategies
4. → Scale to production

---

**Now go build something amazing! 🚀**

**Wassel (واصل) - Connecting the Middle East** 🌍
