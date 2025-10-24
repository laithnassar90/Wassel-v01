import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase/client';
import type { Database } from '../utils/supabase/database.types';

type Trip = Database['public']['Tables']['trips']['Row'];
type TripInsert = Database['public']['Tables']['trips']['Insert'];
type TripUpdate = Database['public']['Tables']['trips']['Update'];

export function useTrips(filters?: {
  status?: string[];
  driverId?: string;
  fromDate?: string;
}) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('trips')
        .select(`
          *,
          driver:profiles!driver_id(
            id,
            full_name,
            avatar_url,
            rating_as_driver
          ),
          vehicle:vehicles(
            make,
            model,
            color,
            year
          ),
          stops:trip_stops(*)
        `)
        .order('departure_date', { ascending: true })
        .order('departure_time', { ascending: true });

      // Apply filters
      if (filters?.status && filters.status.length > 0) {
        query = query.in('status', filters.status);
      }

      if (filters?.driverId) {
        query = query.eq('driver_id', filters.driverId);
      }

      if (filters?.fromDate) {
        query = query.gte('departure_date', filters.fromDate);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setTrips(data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching trips:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const createTrip = async (tripData: TripInsert) => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .insert(tripData)
        .select()
        .single();

      if (error) throw error;

      // Refresh trips list
      await fetchTrips();

      return { data, error: null };
    } catch (err: any) {
      console.error('Error creating trip:', err);
      return { data: null, error: err.message };
    }
  };

  const updateTrip = async (tripId: string, updates: TripUpdate) => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .update(updates)
        .eq('id', tripId)
        .select()
        .single();

      if (error) throw error;

      // Refresh trips list
      await fetchTrips();

      return { data, error: null };
    } catch (err: any) {
      console.error('Error updating trip:', err);
      return { data: null, error: err.message };
    }
  };

  const deleteTrip = async (tripId: string) => {
    try {
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', tripId);

      if (error) throw error;

      // Refresh trips list
      await fetchTrips();

      return { error: null };
    } catch (err: any) {
      console.error('Error deleting trip:', err);
      return { error: err.message };
    }
  };

  const publishTrip = async (tripId: string) => {
    return updateTrip(tripId, {
      status: 'published',
      published_at: new Date().toISOString(),
    });
  };

  return {
    trips,
    loading,
    error,
    refresh: fetchTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    publishTrip,
  };
}

// Hook for searching trips
export function useSearchTrips(searchParams: {
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  departureDate?: string;
  maxDistance?: number;
}) {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTrips = async () => {
    try {
      setLoading(true);
      
      const { data, error: searchError } = await supabase.rpc('search_nearby_trips', {
        from_lat: searchParams.fromLat,
        from_lng: searchParams.fromLng,
        to_lat: searchParams.toLat,
        to_lng: searchParams.toLng,
        max_distance_km: searchParams.maxDistance || 10,
        departure_date: searchParams.departureDate || new Date().toISOString().split('T')[0],
      });

      if (searchError) throw searchError;

      setTrips(data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error searching trips:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    trips,
    loading,
    error,
    searchTrips,
  };
}

// Hook for a single trip with real-time updates
export function useTrip(tripId: string | null) {
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrip = useCallback(async () => {
    if (!tripId) return;

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('trips')
        .select(`
          *,
          driver:profiles!driver_id(*),
          vehicle:vehicles(*),
          stops:trip_stops(*),
          bookings(
            *,
            passenger:profiles!passenger_id(*)
          )
        `)
        .eq('id', tripId)
        .single();

      if (fetchError) throw fetchError;

      setTrip(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching trip:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (!tripId) {
      setLoading(false);
      return;
    }

    fetchTrip();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel(`trip:${tripId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trips',
          filter: `id=eq.${tripId}`,
        },
        (payload) => {
          console.log('Trip updated:', payload);
          if (payload.eventType === 'DELETE') {
            setTrip(null);
          } else {
            fetchTrip();
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [tripId, fetchTrip]);

  return {
    trip,
    loading,
    error,
    refresh: fetchTrip,
  };
}
