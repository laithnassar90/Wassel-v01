# Wassel - Installation & Setup Instructions

## 📦 Required Dependencies

Add these to your `package.json` or install via npm/yarn:

```bash
# Supabase Client
npm install @supabase/supabase-js

# Additional type definitions
npm install -D @types/node
```

### package.json Dependencies

Add to your existing `package.json`:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "vite": "^5.0.8"
  }
}
```

---

## 🚀 Step-by-Step Setup

### 1. Install Supabase Package

```bash
npm install @supabase/supabase-js
```

### 2. Create Environment File

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Run Database Migrations

1. Log in to [Supabase Dashboard](https://app.supabase.com)
2. Open your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy entire contents of `/supabase/schema.sql`
6. Paste and click **Run**

### 4. Enable Real-time (Optional)

In Supabase Dashboard:
1. Go to **Database** → **Replication**
2. Enable for: trips, bookings, messages, notifications

Or run SQL:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE trips;
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
```

### 5. Start Development Server

```bash
npm run dev
```

---

## ✅ Verification

Test that everything works:

```typescript
// In browser console
import { supabase } from './utils/supabase/client';

// Test connection
const { data, error } = await supabase.from('profiles').select('count');
console.log('Connected:', !error);
```

---

## 🎯 Quick Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

---

## 📱 Framework-Specific Notes

### Vite (Current Setup)
Already configured! Environment variables work with `VITE_` prefix.

### Next.js
If migrating to Next.js:
```bash
# Install
npm install @supabase/ssr @supabase/supabase-js

# Use NEXT_PUBLIC_ prefix
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Create React App
```bash
# Use REACT_APP_ prefix
REACT_APP_SUPABASE_URL=...
REACT_APP_SUPABASE_ANON_KEY=...
```

---

## 🔧 TypeScript Configuration

Ensure `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 🐛 Troubleshooting

### Error: "Missing environment variables"
**Solution:** Create `.env` file with Supabase credentials

### Error: "relation does not exist"
**Solution:** Run `/supabase/schema.sql` in SQL Editor

### Error: "CORS policy error"
**Solution:** Add your localhost to Supabase CORS settings

### Error: "JWT expired"
**Solution:** Token refresh is automatic, check auth context

### Import errors for hooks
**Solution:** Ensure all hook files are in `/hooks/` directory

---

## 📚 Next Steps

1. ✅ Complete setup above
2. ✅ Read `/BACKEND_SETUP_GUIDE.md` for details
3. ✅ Review `/QUICK_REFERENCE.md` for common patterns
4. ✅ Check `/PRODUCTION_BACKEND_SUMMARY.md` for features
5. ✅ Start building! 🚀

---

**Need Help?**
- Check documentation in `/BACKEND_SETUP_GUIDE.md`
- Join [Supabase Discord](https://discord.supabase.com)
- Review [Supabase Docs](https://supabase.com/docs)
