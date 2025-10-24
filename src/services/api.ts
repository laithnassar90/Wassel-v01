import { projectId, publicAnonKey } from '../utils/supabase/info';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-cdfdab65`;

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Store auth token in memory
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

// ============ AUTH API ============

export const authAPI = {
  async signUp(email: string, password: string, firstName: string, lastName: string, phone: string) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({ email, password, firstName, lastName, phone })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    return await response.json();
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (data.session) {
      setAuthToken(data.session.access_token);
    }
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setAuthToken(null);
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (data.session) {
      setAuthToken(data.session.access_token);
    }
    return data;
  },

  async getProfile() {
    const token = authToken;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return await response.json();
  }
};

// ============ TRIPS API ============

export const tripsAPI = {
  async createTrip(tripData: any) {
    const token = authToken;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(tripData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create trip');
    }

    return await response.json();
  },

  async searchTrips(from?: string, to?: string, date?: string) {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    if (date) params.append('date', date);

    const response = await fetch(`${API_URL}/trips/search?${params}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to search trips');
    }

    return await response.json();
  },

  async getTripById(tripId: string) {
    const response = await fetch(`${API_URL}/trips/${tripId}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trip');
    }

    return await response.json();
  },

  async getDriverTrips() {
    const token = authToken;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/trips/driver`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch driver trips');
    }

    return await response.json();
  }
};

// ============ BOOKINGS API ============

export const bookingsAPI = {
  async createBooking(tripId: string, seatsBooked: number) {
    const token = authToken;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ tripId, seatsBooked })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create booking');
    }

    return await response.json();
  },

  async getUserBookings() {
    const token = authToken;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/bookings/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    return await response.json();
  }
};

// ============ MESSAGES API ============

export const messagesAPI = {
  async sendMessage(recipientId: string, tripId: string, message: string) {
    const token = authToken;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ recipientId, tripId, message })
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return await response.json();
  },

  async getConversations() {
    const token = authToken;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/messages/conversations`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch conversations');
    }

    return await response.json();
  }
};

// ============ WALLET API ============

export const walletAPI = {
  async getWallet() {
    const token = authToken;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/wallet`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch wallet');
    }

    return await response.json();
  },

  async addFunds(amount: number) {
    const token = authToken;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/wallet/add-funds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ amount })
    });

    if (!response.ok) {
      throw new Error('Failed to add funds');
    }

    return await response.json();
  }
};
