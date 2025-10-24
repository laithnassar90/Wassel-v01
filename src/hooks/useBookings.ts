import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../utils/supabase/database.types';

type Booking = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export function useBookings(filters?: {
  status?: string[];
  tripId?: string;
  passengerId?: string;
}) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      let query = supabase
        .from('bookings')
        .select(`
          *,
          trip:trips(*,
            driver:profiles!driver_id(*)
          ),
          passenger:profiles!passenger_id(*)
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.status && filters.status.length > 0) {
        query = query.in('status', filters.status);
      }

      if (filters?.tripId) {
        query = query.eq('trip_id', filters.tripId);
      }

      if (filters?.passengerId) {
        query = query.eq('passenger_id', filters.passengerId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setBookings(data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, filters]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user, fetchBookings]);

  const createBooking = async (bookingData: BookingInsert) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select(`
          *,
          trip:trips(*)
        `)
        .single();

      if (error) throw error;

      // Create notification for driver
      if (data.trip) {
        await supabase.from('notifications').insert({
          user_id: (data.trip as any).driver_id,
          type: 'trip_request',
          title: 'New Trip Request',
          message: `Someone wants to join your trip`,
          priority: 'high',
          booking_id: data.id,
          trip_id: data.trip_id,
        });
      }

      await fetchBookings();

      return { data, error: null };
    } catch (err: any) {
      console.error('Error creating booking:', err);
      return { data: null, error: err.message };
    }
  };

  const updateBooking = async (bookingId: string, updates: BookingUpdate) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;

      await fetchBookings();

      return { data, error: null };
    } catch (err: any) {
      console.error('Error updating booking:', err);
      return { data: null, error: err.message };
    }
  };

  const acceptBooking = async (bookingId: string) => {
    return updateBooking(bookingId, {
      status: 'accepted',
      accepted_at: new Date().toISOString(),
    });
  };

  const rejectBooking = async (bookingId: string, reason?: string) => {
    return updateBooking(bookingId, {
      status: 'rejected',
      rejected_at: new Date().toISOString(),
      cancellation_reason: reason,
    });
  };

  const cancelBooking = async (bookingId: string, reason?: string) => {
    if (!user) return { error: 'Not authenticated' };

    return updateBooking(bookingId, {
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      cancelled_by: user.id,
      cancellation_reason: reason,
    });
  };

  return {
    bookings,
    loading,
    error,
    refresh: fetchBookings,
    createBooking,
    updateBooking,
    acceptBooking,
    rejectBooking,
    cancelBooking,
  };
}

// Hook for my trips (as passenger)
export function useMyBookings() {
  const { user } = useAuth();
  return useBookings({ passengerId: user?.id });
}
