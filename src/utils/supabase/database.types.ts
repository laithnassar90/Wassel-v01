// TypeScript types generated from Supabase schema
// This file is auto-generated - do not edit manually

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          phone: string | null
          full_name: string
          full_name_ar: string | null
          avatar_url: string | null
          bio: string | null
          bio_ar: string | null
          date_of_birth: string | null
          gender: string | null
          city: string | null
          country: string
          phone_verified: boolean
          email_verified: boolean
          is_verified: boolean
          verification_level: number
          total_trips: number
          trips_as_driver: number
          trips_as_passenger: number
          rating_as_driver: number
          rating_as_passenger: number
          total_ratings_received: number
          smoking_allowed: boolean
          pets_allowed: boolean
          music_allowed: boolean
          conversation_level: string | null
          preferred_temperature: string | null
          language: string
          currency: string
          notification_enabled: boolean
          location_sharing_enabled: boolean
          wallet_balance: number
          total_earned: number
          total_spent: number
          created_at: string
          updated_at: string
          last_active_at: string
          deleted_at: string | null
        }
        Insert: {
          id: string
          email: string
          phone?: string | null
          full_name: string
          full_name_ar?: string | null
          avatar_url?: string | null
          bio?: string | null
          bio_ar?: string | null
          date_of_birth?: string | null
          gender?: string | null
          city?: string | null
          country?: string
          phone_verified?: boolean
          email_verified?: boolean
          is_verified?: boolean
          verification_level?: number
          total_trips?: number
          trips_as_driver?: number
          trips_as_passenger?: number
          rating_as_driver?: number
          rating_as_passenger?: number
          total_ratings_received?: number
          smoking_allowed?: boolean
          pets_allowed?: boolean
          music_allowed?: boolean
          conversation_level?: string | null
          preferred_temperature?: string | null
          language?: string
          currency?: string
          notification_enabled?: boolean
          location_sharing_enabled?: boolean
          wallet_balance?: number
          total_earned?: number
          total_spent?: number
          created_at?: string
          updated_at?: string
          last_active_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          full_name?: string
          full_name_ar?: string | null
          avatar_url?: string | null
          bio?: string | null
          bio_ar?: string | null
          date_of_birth?: string | null
          gender?: string | null
          city?: string | null
          country?: string
          phone_verified?: boolean
          email_verified?: boolean
          is_verified?: boolean
          verification_level?: number
          total_trips?: number
          trips_as_driver?: number
          trips_as_passenger?: number
          rating_as_driver?: number
          rating_as_passenger?: number
          total_ratings_received?: number
          smoking_allowed?: boolean
          pets_allowed?: boolean
          music_allowed?: boolean
          conversation_level?: string | null
          preferred_temperature?: string | null
          language?: string
          currency?: string
          notification_enabled?: boolean
          location_sharing_enabled?: boolean
          wallet_balance?: number
          total_earned?: number
          total_spent?: number
          created_at?: string
          updated_at?: string
          last_active_at?: string
          deleted_at?: string | null
        }
      }
      trips: {
        Row: {
          id: string
          driver_id: string
          vehicle_id: string | null
          trip_type: 'wasel' | 'raje3'
          status: 'draft' | 'published' | 'active' | 'completed' | 'cancelled'
          from_location: string
          from_lat: number
          from_lng: number
          to_location: string
          to_lat: number
          to_lng: number
          departure_date: string
          departure_time: string
          estimated_arrival_time: string | null
          actual_departure_time: string | null
          actual_arrival_time: string | null
          available_seats: number
          seats_booked: number
          price_per_seat: number
          notes: string | null
          luggage_allowed: boolean
          instant_booking: boolean
          recurring_trip_id: string | null
          created_at: string
          updated_at: string
          published_at: string | null
          cancelled_at: string | null
          cancellation_reason: string | null
        }
        Insert: {
          id?: string
          driver_id: string
          vehicle_id?: string | null
          trip_type: 'wasel' | 'raje3'
          status?: 'draft' | 'published' | 'active' | 'completed' | 'cancelled'
          from_location: string
          from_lat: number
          from_lng: number
          to_location: string
          to_lat: number
          to_lng: number
          departure_date: string
          departure_time: string
          estimated_arrival_time?: string | null
          actual_departure_time?: string | null
          actual_arrival_time?: string | null
          available_seats: number
          seats_booked?: number
          price_per_seat: number
          notes?: string | null
          luggage_allowed?: boolean
          instant_booking?: boolean
          recurring_trip_id?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
          cancelled_at?: string | null
          cancellation_reason?: string | null
        }
        Update: {
          id?: string
          driver_id?: string
          vehicle_id?: string | null
          trip_type?: 'wasel' | 'raje3'
          status?: 'draft' | 'published' | 'active' | 'completed' | 'cancelled'
          from_location?: string
          from_lat?: number
          from_lng?: number
          to_location?: string
          to_lat?: number
          to_lng?: number
          departure_date?: string
          departure_time?: string
          estimated_arrival_time?: string | null
          actual_departure_time?: string | null
          actual_arrival_time?: string | null
          available_seats?: number
          seats_booked?: number
          price_per_seat?: number
          notes?: string | null
          luggage_allowed?: boolean
          instant_booking?: boolean
          recurring_trip_id?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
          cancelled_at?: string | null
          cancellation_reason?: string | null
        }
      }
      bookings: {
        Row: {
          id: string
          trip_id: string
          passenger_id: string
          status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed'
          seats_requested: number
          pickup_location: string | null
          pickup_lat: number | null
          pickup_lng: number | null
          dropoff_location: string | null
          dropoff_lat: number | null
          dropoff_lng: number | null
          total_price: number
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method: 'cash' | 'card' | 'wallet' | 'bank_transfer' | null
          notes: string | null
          has_luggage: boolean
          created_at: string
          accepted_at: string | null
          rejected_at: string | null
          cancelled_at: string | null
          completed_at: string | null
          cancelled_by: string | null
          cancellation_reason: string | null
        }
        Insert: {
          id?: string
          trip_id: string
          passenger_id: string
          status?: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed'
          seats_requested?: number
          pickup_location?: string | null
          pickup_lat?: number | null
          pickup_lng?: number | null
          dropoff_location?: string | null
          dropoff_lat?: number | null
          dropoff_lng?: number | null
          total_price: number
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method?: 'cash' | 'card' | 'wallet' | 'bank_transfer' | null
          notes?: string | null
          has_luggage?: boolean
          created_at?: string
          accepted_at?: string | null
          rejected_at?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
          cancelled_by?: string | null
          cancellation_reason?: string | null
        }
        Update: {
          id?: string
          trip_id?: string
          passenger_id?: string
          status?: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed'
          seats_requested?: number
          pickup_location?: string | null
          pickup_lat?: number | null
          pickup_lng?: number | null
          dropoff_location?: string | null
          dropoff_lat?: number | null
          dropoff_lng?: number | null
          total_price?: number
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method?: 'cash' | 'card' | 'wallet' | 'bank_transfer' | null
          notes?: string | null
          has_luggage?: boolean
          created_at?: string
          accepted_at?: string | null
          rejected_at?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
          cancelled_by?: string | null
          cancellation_reason?: string | null
        }
      }
      // Add other table types as needed
      [key: string]: any
    }
    Views: {
      active_trips_view: {
        Row: {
          id: string
          driver_name: string
          driver_avatar: string | null
          rating_as_driver: number
          vehicle_make: string | null
          vehicle_model: string | null
          remaining_seats: number
          // ... other trip fields
        }
      }
    }
    Functions: {
      search_nearby_trips: {
        Args: {
          from_lat: number
          from_lng: number
          to_lat: number
          to_lng: number
          max_distance_km?: number
          departure_date?: string
        }
        Returns: {
          trip_id: string
          driver_name: string
          distance_from_km: number
          distance_to_km: number
        }[]
      }
      get_user_stats: {
        Args: {
          user_uuid: string
        }
        Returns: {
          total_trips_count: number
          as_driver: number
          as_passenger: number
          total_distance_km: number
          carbon_saved_kg: number
        }[]
      }
    }
    Enums: {
      trip_type: 'wasel' | 'raje3'
      trip_status: 'draft' | 'published' | 'active' | 'completed' | 'cancelled'
      booking_status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      // ... other enums
    }
  }
}
