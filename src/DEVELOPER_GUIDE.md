# Wassel Platform - Developer Quick Reference

## 🗂️ Project Structure

```
/
├── components/
│   ├── ui/                          # Shadcn UI components (50+ components)
│   ├── AdvancedFilters.tsx          # ✨ NEW: Filter UI for ride search
│   ├── AuthPage.tsx                 # User authentication
│   ├── Dashboard.tsx                # Main dashboard
│   ├── FindRide.tsx                 # 🔄 ENHANCED: With advanced filters
│   ├── Header.tsx                   # 🔄 ENHANCED: With notification badge
│   ├── LandingPage.tsx              # Landing page
│   ├── LiveTripMap.tsx              # Real-time trip tracking map
│   ├── Logo.tsx                     # Wassel logo component
│   ├── MapComponent.tsx             # Leaflet map integration
│   ├── Messages.tsx                 # 🔄 ENHANCED: Real-time messaging
│   ├── MyTrips.tsx                  # Trip management
│   ├── NotificationCenter.tsx       # ✨ NEW: Notification hub
│   ├── OfferRide.tsx                # Create ride offers
│   ├── Payments.tsx                 # 🔄 ENHANCED: Payment gateway ready
│   ├── PopularRoutes.tsx            # Popular routes display
│   ├── RatingDialog.tsx             # ✨ NEW: Post-trip rating
│   ├── RecurringTrips.tsx           # ✨ NEW: Scheduled trips
│   ├── SafetyCenter.tsx             # ✨ NEW: Safety & emergency features
│   ├── Settings.tsx                 # User settings
│   ├── Sidebar.tsx                  # 🔄 ENHANCED: Extended navigation
│   ├── TripAnalytics.tsx            # ✨ NEW: Analytics dashboard
│   ├── TripDetailsDialog.tsx        # Trip detail modal with map
│   ├── UserProfile.tsx              # ✨ NEW: User profile pages
│   ├── VerificationCenter.tsx       # ✨ NEW: Identity verification
│   └── WorkflowGuide.tsx            # Workflow documentation
│
├── services/
│   ├── api.ts                       # API client
│   ├── analyticsService.ts          # ✨ NEW: Analytics calculations
│   ├── matchingService.ts           # ✨ NEW: AI trip matching
│   └── notificationService.ts       # ✨ NEW: Notification management
│
├── styles/
│   └── globals.css                  # Tailwind v4 + Custom CSS variables
│
├── utils/
│   └── supabase/                    # Supabase utilities
│
├── App.tsx                          # 🔄 ENHANCED: All new routes
├── ENHANCEMENTS_SUMMARY.md          # Complete feature documentation
├── DEVELOPER_GUIDE.md               # This file
└── [Other docs]
```

---

## 🎨 Color Palette

```css
/* Primary - Teal (60% usage) */
--primary: #008080

/* Secondary - Olive Green (30% usage) */
--secondary: #607D4B

/* Accent - Burgundy (10% usage) */
--accent: #880044
```

### Usage Guidelines:
- **Primary:** Buttons, links, primary actions, brand elements
- **Secondary:** Supporting elements, backgrounds, secondary CTAs
- **Accent:** Important highlights, urgent actions, alerts

---

## 🧩 Key Components

### 1. UserProfile
```tsx
import { UserProfile } from './components/UserProfile';

<UserProfile 
  userId="user-id"           // Optional: defaults to current user
  isOwnProfile={true}        // Show edit controls
/>
```

**Features:** Tabs (Overview, Reviews, Vehicle, Preferences), Rating display, Verification badges

---

### 2. NotificationCenter
```tsx
import { NotificationCenter } from './components/NotificationCenter';

<NotificationCenter />
```

**Auto-subscribes to:** `notificationService` for real-time updates

---

### 3. RatingDialog
```tsx
import { RatingDialog } from './components/RatingDialog';

<RatingDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  trip={{
    id: 'trip-123',
    driverName: 'Ahmed',
    route: 'Dubai → Abu Dhabi',
    date: '2025-10-14',
    role: 'passenger'
  }}
/>
```

**Returns:** Rating data (overall, categories, tags, comment)

---

### 4. SafetyCenter
```tsx
import { SafetyCenter } from './components/SafetyCenter';

<SafetyCenter />
```

**Features:** SOS button, emergency contacts, safety settings, quick dial

---

### 5. TripAnalytics
```tsx
import { TripAnalytics } from './components/TripAnalytics';

<TripAnalytics />
```

**Uses:** `analyticsService` for calculations, Recharts for visualizations

---

### 6. RecurringTrips
```tsx
import { RecurringTrips } from './components/RecurringTrips';

<RecurringTrips />
```

**Manages:** Schedule CRUD, activation/pause, earnings tracking

---

### 7. VerificationCenter
```tsx
import { VerificationCenter } from './components/VerificationCenter';

<VerificationCenter />
```

**Handles:** Phone, email, ID, license, selfie verification workflows

---

### 8. AdvancedFilters
```tsx
import { AdvancedFilters } from './components/AdvancedFilters';

<AdvancedFilters
  filters={filters}
  onFiltersChange={setFilters}
  onClear={handleClear}
/>
```

**Filter Options:** Price range, rating, verified only, preferences

---

## 📡 Services

### matchingService

```typescript
import { matchTrips } from '../services/matchingService';

const matches = matchTrips(
  userRoute,          // { from, to }
  userPreferences,    // { smoking, music, pets, conversation, temperature }
  maxPrice,           // number
  minRating,          // number
  availableTrips      // array of trips
);

// Returns: TripMatch[] sorted by compatibility score
```

**Compatibility Weights:**
- Route: 40%
- Preferences: 25%
- Rating: 20%
- Price: 15%

---

### notificationService

```typescript
import { notificationService } from '../services/notificationService';

// Subscribe to updates
const unsubscribe = notificationService.subscribe((notifications) => {
  console.log(notifications);
});

// Add notification
notificationService.addNotification({
  type: 'trip_request',
  title: 'New Trip Request',
  message: 'Sarah wants to join your trip',
  priority: 'high',
  actionUrl: '/my-trips'
});

// Mark as read
notificationService.markAsRead(notificationId);

// Get unread count
const count = notificationService.getUnreadCount();

// Clean up
unsubscribe();
```

---

### analyticsService

```typescript
import { analyticsService } from '../services/analyticsService';

// Get mock data
const tripHistory = analyticsService.getMockTripHistory();

// Calculate analytics
const analytics = analyticsService.calculateAnalytics(tripHistory);
// Returns: TripAnalytics object

// Generate expense report
const report = analyticsService.generateExpenseReport(
  tripHistory,
  startDate,
  endDate
);
```

---

## 🎯 Navigation

### Adding New Pages

1. **Create component** in `/components/YourComponent.tsx`

2. **Import in App.tsx:**
```tsx
import { YourComponent } from './components/YourComponent';
```

3. **Add to renderPage():**
```tsx
case 'your-page':
  return <YourComponent />;
```

4. **Add to Sidebar.tsx:**
```tsx
const mainMenuItems = [
  // ...
  { id: 'your-page', label: 'Your Page', labelAr: 'صفحتك', icon: YourIcon }
];
```

---

## 🎨 Styling Guidelines

### Using Color Tokens
```tsx
// ✅ Good
<div className="bg-primary text-primary-foreground">
<Button variant="default">Primary Action</Button>

// ❌ Avoid
<div className="bg-teal-600 text-white">
<Button className="bg-[#008080]">Button</Button>
```

### Typography
```tsx
// ✅ Good - Uses global styles
<h1>Title</h1>
<p>Paragraph</p>

// ❌ Avoid - Unless specifically needed
<h1 className="text-2xl font-bold">Title</h1>
```

### Responsive Design
```tsx
// Mobile-first approach
<div className="
  flex flex-col           // Mobile: stack
  md:flex-row            // Tablet: row
  lg:gap-6               // Desktop: larger gap
">
```

---

## 🔒 Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  verified: boolean;
  rating: number;
  totalTrips: number;
  photo?: string;
  bio?: string;
  preferences: UserPreferences;
  vehicle?: Vehicle;
}
```

### Trip
```typescript
interface Trip {
  id: string;
  type: 'wasel' | 'raje3';
  driverId: string;
  from: RoutePoint;
  to: RoutePoint;
  stops?: RoutePoint[];
  date: Date;
  time: string;
  price: number;
  availableSeats: number;
  passengers: string[];
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}
```

### Notification
```typescript
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  data?: any;
}
```

---

## 🚀 Quick Start Tasks

### Task 1: Add New Notification Type

1. **Update notificationService.ts:**
```typescript
export type NotificationType = 
  | 'existing_types'
  | 'your_new_type';  // Add this
```

2. **Add icon in NotificationCenter.tsx:**
```typescript
const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    // ...
    case 'your_new_type':
      return YourIcon;
  }
};
```

3. **Trigger notification:**
```typescript
notificationService.addNotification({
  type: 'your_new_type',
  title: 'Title',
  message: 'Message',
  priority: 'medium'
});
```

---

### Task 2: Add New Analytics Metric

1. **Update TripAnalytics interface:**
```typescript
export interface TripAnalytics {
  // existing metrics
  yourNewMetric: number;
}
```

2. **Calculate in analyticsService:**
```typescript
calculateAnalytics(trips) {
  // ...
  const yourNewMetric = trips.reduce(...);
  
  return {
    // ...
    yourNewMetric
  };
}
```

3. **Display in TripAnalytics.tsx:**
```tsx
<Card className="p-6">
  <div className="text-2xl font-semibold">
    {analytics.yourNewMetric}
  </div>
  <p className="text-sm text-muted-foreground">Your New Metric</p>
</Card>
```

---

### Task 3: Add New Filter to FindRide

1. **Update filters state in FindRide.tsx:**
```typescript
const [filters, setFilters] = useState({
  // existing filters
  yourNewFilter: false
});
```

2. **Add UI in AdvancedFilters.tsx:**
```tsx
<div className="flex items-center justify-between">
  <span className="text-sm">Your Filter</span>
  <Switch
    checked={filters.yourNewFilter}
    onCheckedChange={(checked) => 
      onFiltersChange({ ...filters, yourNewFilter: checked })
    }
  />
</div>
```

3. **Apply filter logic:**
```typescript
const filteredRides = availableRides.filter(ride => {
  // existing filters
  if (filters.yourNewFilter && !ride.meetsCondition) return false;
  return true;
});
```

---

## 🧪 Testing

### Testing Components
```tsx
// Mock data available in each service
import { analyticsService } from '../services/analyticsService';
const mockTrips = analyticsService.getMockTripHistory();

import { notificationService } from '../services/notificationService';
// Has built-in mock notifications
```

### Testing Notifications
```tsx
// Trigger test notification
notificationService.addNotification({
  type: 'trip_request',
  title: 'Test Notification',
  message: 'This is a test',
  priority: 'high'
});
```

### Testing Analytics
```tsx
// Use mock trip history
const trips = analyticsService.getMockTripHistory();
const analytics = analyticsService.calculateAnalytics(trips);
console.log(analytics);
```

---

## 📚 Library Reference

### Core Libraries
- **React:** UI framework
- **Tailwind v4:** Styling
- **Shadcn/ui:** Component library
- **Recharts:** Analytics charts
- **Leaflet:** Maps
- **Lucide React:** Icons
- **Sonner:** Toast notifications

### Import Examples
```tsx
import { Button } from './components/ui/button';
import { Car, User, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
```

---

## 🐛 Common Issues & Solutions

### Issue: Notifications not updating
**Solution:** Ensure you're subscribed to notificationService and cleaning up
```tsx
useEffect(() => {
  const unsubscribe = notificationService.subscribe(setNotifications);
  return unsubscribe; // Important!
}, []);
```

### Issue: Map not displaying
**Solution:** Check that Leaflet CSS is loaded via CDN (in index.html)
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

### Issue: Analytics charts not rendering
**Solution:** Ensure ResponsiveContainer has explicit height
```tsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    {/* ... */}
  </BarChart>
</ResponsiveContainer>
```

---

## 🎓 Best Practices

### 1. State Management
- Use local state for UI-only state
- Use services for shared state (notifications, etc.)
- Clean up subscriptions in useEffect

### 2. Component Organization
- One component per file
- Co-locate related components
- Use TypeScript interfaces

### 3. Styling
- Use Tailwind utility classes
- Follow mobile-first approach
- Use color tokens (--primary, --secondary, --accent)
- Don't override typography unless needed

### 4. Accessibility
- Add aria-labels to icon buttons
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios

### 5. Performance
- Lazy load heavy components
- Memoize expensive calculations
- Use keys in lists
- Avoid unnecessary re-renders

---

## 🔗 Quick Links

### Components
- [Shadcn UI Docs](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Recharts Docs](https://recharts.org/)
- [Leaflet Docs](https://leafletjs.com/)

### Styling
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind v4 Docs](https://tailwindcss.com/docs/v4-beta)

### Services
- [Supabase Docs](https://supabase.com/docs)

---

## 💡 Tips

1. **Use the existing patterns:** Look at similar components for consistency
2. **Check the services:** Don't re-implement logic that exists in services
3. **Follow the color palette:** Stick to primary/secondary/accent
4. **Test responsively:** Always check mobile, tablet, and desktop
5. **Add bilingual support:** Include Arabic translations for user-facing text
6. **Consider safety:** Use SafetyCenter patterns for sensitive features
7. **Track analytics:** Integrate with analyticsService for user actions
8. **Notify users:** Use notificationService for important events

---

## 🚀 Next Steps

1. **Connect to Supabase:** Set up database, auth, and real-time features
2. **Integrate Payment Gateways:** Add Telr/PayTabs/Hyperpay
3. **Add SMS/Email Services:** For verification
4. **Implement Real-time Chat:** Using Supabase Realtime
5. **Add Location Services:** GPS tracking for active trips
6. **Deploy:** Vercel, Netlify, or your preferred platform

---

Happy coding! 🎉
