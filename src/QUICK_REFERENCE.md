# Wassel Backend - Quick Reference Card 🚀

## 🔑 Most Common Operations

### Authentication

```typescript
import { useAuth } from './contexts/AuthContext';

// Get current user
const { user, profile } = useAuth();

// Sign up
const { error } = await signUp(email, password, fullName);

// Sign in
const { error } = await signIn(email, password);

// Sign out
await signOut();

// Update profile
await updateProfile({ bio: 'New bio' });
```

### Trips

```typescript
import { useTrips } from './hooks/useTrips';

// Get all published trips
const { trips, loading } = useTrips({ status: ['published'] });

// Create trip
const { data, error } = await createTrip({
  trip_type: 'wasel',
  from_location: 'Dubai',
  from_lat: 25.2048,
  from_lng: 55.2708,
  to_location: 'Abu Dhabi',
  to_lat: 24.4539,
  to_lng: 54.3773,
  departure_date: '2025-10-15',
  departure_time: '14:00',
  available_seats: 3,
  price_per_seat: 50,
});

// Publish trip
await publishTrip(tripId);

// Search nearby trips
const { trips, searchTrips } = useSearchTrips({
  fromLat: 25.2048,
  fromLng: 55.2708,
  toLat: 24.4539,
  toLng: 54.3773,
  maxDistance: 10,
});
await searchTrips();
```

### Bookings

```typescript
import { useBookings } from './hooks/useBookings';

// Get my bookings
const { bookings } = useMyBookings();

// Create booking
await createBooking({
  trip_id: tripId,
  passenger_id: user.id,
  seats_requested: 2,
  total_price: 100,
});

// Accept booking (driver)
await acceptBooking(bookingId);

// Cancel booking
await cancelBooking(bookingId, 'Changed plans');
```

### Notifications

```typescript
import { useNotifications } from './hooks/useNotifications';

// Get notifications
const { notifications, unreadCount } = useNotifications();

// Mark as read
await markAsRead(notificationId);

// Mark all as read
await markAllAsRead();
```

---

## 📦 Database Quick Reference

### Main Tables

```sql
-- Users
profiles (id, full_name, email, rating_as_driver, wallet_balance, ...)

-- Rides
trips (id, driver_id, from_location, to_location, departure_date, price_per_seat, ...)
trip_stops (id, trip_id, location, lat, lng, stop_order)

-- Bookings
bookings (id, trip_id, passenger_id, status, total_price, ...)

-- Social
reviews (id, trip_id, reviewer_id, reviewee_id, overall_rating, ...)
messages (id, conversation_id, sender_id, content, ...)

-- Payments
transactions (id, from_user_id, to_user_id, amount, payment_status, ...)

-- Safety
emergency_contacts (id, user_id, name, phone, ...)
verifications (id, user_id, verification_type, status, ...)
```

### Common Queries

```typescript
// Get trip with driver info
const { data } = await supabase
  .from('trips')
  .select(`
    *,
    driver:profiles!driver_id(*),
    vehicle:vehicles(*),
    stops:trip_stops(*)
  `)
  .eq('id', tripId)
  .single();

// Get my trips as driver
const { data } = await supabase
  .from('trips')
  .select('*')
  .eq('driver_id', userId)
  .order('departure_date', { ascending: false });

// Get bookings for a trip
const { data } = await supabase
  .from('bookings')
  .select(`
    *,
    passenger:profiles!passenger_id(*)
  `)
  .eq('trip_id', tripId);

// Search trips by location (text)
const { data } = await supabase
  .from('trips')
  .select('*')
  .textSearch('from_location', searchQuery)
  .eq('status', 'published');

// Nearby trips (geospatial)
const { data } = await supabase.rpc('search_nearby_trips', {
  from_lat: 25.2048,
  from_lng: 55.2708,
  to_lat: 24.4539,
  to_lng: 54.3773,
  max_distance_km: 10,
});
```

---

## 🔒 Security Patterns

### RLS is Automatic

```typescript
// ✅ This is safe - RLS automatically filters
const { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId);

// User can only see their own data
// No need for additional security checks!
```

### File Upload

```typescript
// Upload avatar
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.jpg`, file);

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/avatar.jpg`);
```

---

## ⚡ Real-time Patterns

### Subscribe to Trip Updates

```typescript
useEffect(() => {
  const subscription = supabase
    .channel(`trip:${tripId}`)
    .on(
      'postgres_changes',
      {
        event: '*',  // INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'trips',
        filter: `id=eq.${tripId}`,
      },
      (payload) => {
        console.log('Trip updated!', payload);
        refreshTrip();
      }
    )
    .subscribe();

  return () => subscription.unsubscribe();
}, [tripId]);
```

### Subscribe to New Messages

```typescript
const subscription = supabase
  .channel(`chat:${tripId}`)
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${tripId}`,
    },
    (payload) => {
      setMessages(prev => [...prev, payload.new]);
    }
  )
  .subscribe();
```

---

## 🐛 Debugging

### Check Auth Status

```typescript
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);

const { data: { user } } = await supabase.auth.getUser();
console.log('User:', user);
```

### Test Query

```typescript
const { data, error } = await supabase
  .from('trips')
  .select('*')
  .limit(1);

console.log('Query result:', { data, error });
```

### Enable Debug Logging

```typescript
localStorage.setItem('supabase.debug', 'true');
```

---

## 🚀 Deployment Commands

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Run migrations (in Supabase SQL Editor)
# Copy/paste /supabase/schema.sql

# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📊 Environment Variables

```env
# Required
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...

# Optional (Production)
VITE_TELR_STORE_ID=12345
VITE_TELR_AUTH_KEY=xxxxx
```

---

## 💡 Pro Tips

### 1. Always Use Hooks
```typescript
// ✅ Good
const { trips } = useTrips();

// ❌ Avoid
const [trips, setTrips] = useState([]);
useEffect(() => { /* fetch trips */ }, []);
```

### 2. Leverage TypeScript
```typescript
// Types are auto-generated!
const trip: Database['public']['Tables']['trips']['Row'] = data;
```

### 3. Use RLS, Not Application Logic
```typescript
// ✅ Good - Let database handle security
const { data } = await supabase
  .from('trips')
  .select('*')
  .eq('driver_id', userId);

// ❌ Avoid - Filtering in app
const trips = allTrips.filter(t => t.driver_id === userId);
```

### 4. Batch Operations
```typescript
// ✅ Good - Single query
const { data } = await supabase
  .from('trips')
  .select('*, driver:profiles(*), vehicle:vehicles(*)')
  .eq('status', 'published');

// ❌ Avoid - Multiple queries
const trips = await getTrips();
for (const trip of trips) {
  trip.driver = await getDriver(trip.driver_id);
}
```

### 5. Use Realtime Sparingly
```typescript
// ✅ Good - Only for active screens
useEffect(() => {
  const sub = supabase.channel('live-trip').subscribe();
  return () => sub.unsubscribe();  // Cleanup!
}, []);

// ❌ Avoid - Global subscriptions
// Don't subscribe to everything all the time
```

---

## 🎯 Common Patterns

### Protected Route
```typescript
function ProtectedPage() {
  const { user, loading } = useAuth();
  
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/auth" />;
  
  return <YourComponent />;
}
```

### Optimistic Updates
```typescript
// Update UI immediately, rollback on error
const optimisticUpdate = async (tripId, updates) => {
  const oldTrip = trip;
  setTrip({ ...trip, ...updates });  // Immediate
  
  const { error } = await updateTrip(tripId, updates);
  
  if (error) {
    setTrip(oldTrip);  // Rollback
    toast.error('Failed to update');
  }
};
```

### Infinite Scroll
```typescript
const [page, setPage] = useState(0);
const [hasMore, setHasMore] = useState(true);

const loadMore = async () => {
  const { data } = await supabase
    .from('trips')
    .select('*')
    .range(page * 10, (page + 1) * 10 - 1);
  
  if (data.length < 10) setHasMore(false);
  setTrips(prev => [...prev, ...data]);
  setPage(prev => prev + 1);
};
```

---

## 📞 Need Help?

1. Check `/BACKEND_SETUP_GUIDE.md`
2. Review `/supabase/schema.sql`
3. Browse `/hooks/` examples
4. [Supabase Docs](https://supabase.com/docs)
5. [Supabase Discord](https://discord.supabase.com)

---

**Happy Coding! 🎉**
