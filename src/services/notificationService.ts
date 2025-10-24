// Notification Service
export type NotificationType = 
  | 'trip_request' 
  | 'trip_accepted' 
  | 'trip_rejected'
  | 'trip_cancelled'
  | 'driver_arrived'
  | 'trip_started'
  | 'trip_completed'
  | 'payment_received'
  | 'payment_sent'
  | 'message'
  | 'rating_reminder'
  | 'verification_approved'
  | 'verification_rejected'
  | 'safety_alert';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
  data?: any;
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  constructor() {
    // Initialize with mock notifications
    this.notifications = this.getMockNotifications();
  }

  // Subscribe to notification updates
  subscribe(callback: (notifications: Notification[]) => void) {
    this.listeners.push(callback);
    callback(this.notifications);
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  // Add new notification
  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
      read: false
    };

    this.notifications.unshift(newNotification);
    this.notifyListeners();

    // Show browser notification if supported
    this.showBrowserNotification(newNotification);

    return newNotification;
  }

  // Mark notification as read
  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.notifyListeners();
    }
  }

  // Mark all as read
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.notifyListeners();
  }

  // Get unread count
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Get all notifications
  getNotifications(): Notification[] {
    return this.notifications;
  }

  // Clear all notifications
  clearAll() {
    this.notifications = [];
    this.notifyListeners();
  }

  // Delete specific notification
  deleteNotification(notificationId: string) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  private showBrowserNotification(notification: Notification) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/wassel-logo.png',
        badge: '/wassel-badge.png',
        tag: notification.id
      });
    }
  }

  // Request browser notification permission
  async requestPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Generate mock notifications for demo
  private getMockNotifications(): Notification[] {
    return [
      {
        id: '1',
        type: 'trip_request',
        title: 'New Trip Request',
        message: 'Sarah Ahmed wants to join your trip to Dubai Mall',
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
        priority: 'high',
        actionUrl: '/my-trips'
      },
      {
        id: '2',
        type: 'trip_accepted',
        title: 'Trip Request Accepted',
        message: 'Mohammed Ali accepted your request for tomorrow\'s trip',
        timestamp: new Date(Date.now() - 30 * 60000),
        read: false,
        priority: 'high',
        actionUrl: '/my-trips'
      },
      {
        id: '3',
        type: 'driver_arrived',
        title: 'Driver Arrived',
        message: 'Your driver is waiting at the pickup location',
        timestamp: new Date(Date.now() - 2 * 60 * 60000),
        read: true,
        priority: 'high'
      },
      {
        id: '4',
        type: 'payment_received',
        title: 'Payment Received',
        message: 'You received 45 AED for your trip to Abu Dhabi',
        timestamp: new Date(Date.now() - 4 * 60 * 60000),
        read: true,
        priority: 'medium',
        actionUrl: '/payments'
      },
      {
        id: '5',
        type: 'rating_reminder',
        title: 'Rate Your Trip',
        message: 'How was your trip with Ahmed Hassan?',
        timestamp: new Date(Date.now() - 6 * 60 * 60000),
        read: false,
        priority: 'low',
        actionUrl: '/my-trips'
      },
      {
        id: '6',
        type: 'verification_approved',
        title: 'Verification Approved',
        message: 'Your driver\'s license has been verified!',
        timestamp: new Date(Date.now() - 24 * 60 * 60000),
        read: true,
        priority: 'medium'
      }
    ];
  }
}

export const notificationService = new NotificationService();
