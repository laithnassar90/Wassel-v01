# Wassel Authentication Testing Checklist

## ✅ Pre-Testing Verification

- [x] Supabase project connected (ncbwummxjmsfcreagnmz)
- [x] Database schema deployed
- [x] Auth client configured
- [x] AuthContext properly set up
- [x] AuthPage connected to AuthContext

## 🧪 Test Cases

### 1. Sign Up - Happy Path ✓
**Steps:**
1. Open the app
2. Click "Get Started" on landing page
3. Fill in the signup form:
   - First Name: `Ahmed`
   - Last Name: `Al-Mansoori`
   - Email: `ahmed.test@example.com`
   - Phone: `+971501234567`
   - Password: `SecurePass123`
   - Confirm Password: `SecurePass123`
   - Check "I agree to terms"
4. Click "Create Account"

**Expected Result:**
- Toast notification: "Account created successfully! Please check your email for verification."
- User is automatically logged in
- Redirected to dashboard
- Profile created in Supabase `profiles` table

### 2. Sign Up - Password Mismatch ✓
**Steps:**
1. Fill signup form
2. Password: `password123`
3. Confirm Password: `password456`
4. Click "Create Account"

**Expected Result:**
- Toast error: "Passwords do not match"
- Form not submitted
- User stays on signup page

### 3. Sign Up - Password Too Short ✓
**Steps:**
1. Fill signup form
2. Password: `12345` (5 characters)
3. Confirm Password: `12345`
4. Click "Create Account"

**Expected Result:**
- Toast error: "Password must be at least 6 characters long"
- Form not submitted

### 4. Sign Up - Duplicate Email ✓
**Steps:**
1. Try to sign up with email that already exists
2. Click "Create Account"

**Expected Result:**
- Toast error: "An account with this email already exists."
- User stays on signup page

### 5. Sign In - Happy Path ✓
**Steps:**
1. Open the app
2. Click "Log In" on landing page
3. Enter credentials:
   - Email: `ahmed.test@example.com`
   - Password: `SecurePass123`
4. Click "Sign In"

**Expected Result:**
- Toast notification: "Signed in successfully!"
- User profile loaded
- Redirected to dashboard
- Session stored in localStorage

### 6. Sign In - Wrong Password ✓
**Steps:**
1. Go to login page
2. Email: `ahmed.test@example.com`
3. Password: `WrongPassword`
4. Click "Sign In"

**Expected Result:**
- Toast error: "Invalid email or password. Please try again."
- User stays on login page
- No session created

### 7. Sign In - Non-existent Email ✓
**Steps:**
1. Go to login page
2. Email: `nonexistent@example.com`
3. Password: `password123`
4. Click "Sign In"

**Expected Result:**
- Toast error: "Invalid email or password. Please try again."
- User stays on login page

### 8. Sign Out ✓
**Steps:**
1. Log in successfully
2. From dashboard or header, find user menu
3. Click "Sign Out" or "Logout"

**Expected Result:**
- Session cleared
- localStorage cleared
- Redirected to landing page
- User menu no longer shows user info

### 9. Session Persistence ✓
**Steps:**
1. Sign in successfully
2. Close browser tab
3. Open app in new tab

**Expected Result:**
- User still logged in
- Dashboard shown immediately
- Profile data loaded

### 10. Backend Status Indicator ✓
**Steps:**
1. Open auth page
2. Check for status banner

**Expected Result:**
- Green banner shown: "✓ Connected: Supabase backend is active. Real authentication enabled."

### 11. Browser Console Check ✓
**Steps:**
1. Open browser DevTools
2. Check console

**Expected Result:**
- Should see: "✅ Supabase Connected - Real backend active. Authentication and data persistence enabled."

## 🔍 Database Verification

After successful signup, check Supabase dashboard:

1. Go to Supabase Dashboard → Authentication → Users
   - Should see new user with correct email
   
2. Go to Table Editor → profiles
   - Should see new profile record with:
     - Matching user ID
     - Full name: "Ahmed Al-Mansoori"
     - Email: "ahmed.test@example.com"
     - Phone: "+971501234567"
     - All default values set correctly

## 🐛 Known Issues / Edge Cases

### Email Verification
- If email confirmation is enabled in Supabase, users must verify email before logging in
- Check Supabase → Authentication → Settings → Email Auth
- For testing, you might want to disable "Enable email confirmations"

### Password Reset
- Not yet implemented
- Users cannot reset forgotten passwords
- **TODO**: Implement password reset flow

### Social Auth
- Google/Facebook login buttons are UI-only
- Not yet connected to Supabase OAuth
- **TODO**: Implement OAuth providers

## 📊 Success Criteria

All tests should pass with:
- ✅ Proper error messages displayed
- ✅ Successful auth operations complete without errors
- ✅ Database records created correctly
- ✅ Sessions persist across page refreshes
- ✅ User experience is smooth and intuitive

## 🎯 Next Steps After Testing

1. **If all tests pass**: 
   - Authentication system is production-ready
   - Can proceed to implement other features
   
2. **If tests fail**:
   - Check browser console for errors
   - Verify Supabase dashboard settings
   - Check database RLS policies
   - Review error messages for clues

## 📞 Troubleshooting

### Issue: "Backend not configured" error
**Solution:** 
- Verify `/utils/supabase/info.tsx` has correct credentials
- Check that projectId and publicAnonKey are not empty

### Issue: Database insert fails
**Solution:**
- Check RLS policies in Supabase
- Ensure profiles table exists
- Verify user has permission to insert

### Issue: Session not persisting
**Solution:**
- Check browser's localStorage
- Ensure cookies are enabled
- Verify PKCE flow is working

---

**Ready to test? Start with Test Case #1 (Sign Up - Happy Path)!**
