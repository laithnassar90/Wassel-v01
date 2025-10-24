import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { projectId, publicAnonKey } from './info';

// Build Supabase URL from project ID
const supabaseUrl = projectId ? `https://${projectId}.supabase.co` : '';
const supabaseAnonKey = publicAnonKey || '';

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create Supabase client with TypeScript support (or null if not configured)
export const supabase = isSupabaseConfigured 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        flowType: 'pkce',
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any): string {
  if (error?.message) {
    // Translate common Supabase errors to user-friendly messages
    if (error.message.includes('Invalid login credentials')) {
      return 'Invalid email or password. Please try again.';
    }
    if (error.message.includes('Email not confirmed')) {
      return 'Please verify your email address before logging in.';
    }
    if (error.message.includes('User already registered')) {
      return 'An account with this email already exists.';
    }
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}

// Helper to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  if (!supabase) return false;
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

// Helper to get current user
export async function getCurrentUser() {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Helper to get user profile
export async function getUserProfile(userId?: string) {
  if (!supabase) return null;
  const uid = userId || (await getCurrentUser())?.id;
  if (!uid) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', uid)
    .single();
    
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data;
}
