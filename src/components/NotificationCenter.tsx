import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { notificationService, Notification, NotificationType } from '../services/notificationService';
import { 
  Bell, 
  BellOff, 
  Car, 
  MessageSquare, 
  CreditCard, 
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  X,
  Check
} from 'lucide-react';

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    // Subscribe to notification updates
    const unsubscribe = notificationService.subscribe(setNotifications);
    return unsubscribe;
  }, []);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'trip_request':
      case 'trip_accepted':
      case 'trip_rejected':
      case 'trip_cancelled':
      case 'driver_arrived':
      case 'trip_started':
      case 'trip_completed':
        return Car;
      case 'message':
        return MessageSquare;
      case 'payment_received':
      case 'payment_sent':
        return CreditCard;
      case 'rating_reminder':
        return Star;
      case 'verification_approved':
      case 'verification_rejected':
        return CheckCircle;
      case 'safety_alert':
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'trip_accepted':
      case 'verification_approved':
      case 'payment_received':
        return 'text-green-600';
      case 'trip_rejected':
      case 'trip_cancelled':
      case 'verification_rejected':
        return 'text-red-600';
      case 'safety_alert':
        return 'text-amber-600';
      default:
        return 'text-primary';
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    const variants = {
      high: 'destructive',
      medium: 'default',
      low: 'outline'
    } as const;
    
    return variants[priority];
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (notificationId: string) => {
    notificationService.markAsRead(notificationId);
  };

  const handleDelete = (notificationId: string) => {
    notificationService.deleteNotification(notificationId);
  };

  const handleMarkAllAsRead = () => {
    notificationService.markAllAsRead();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      notificationService.clearAll();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="size-6 text-primary" />
          <h1>Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-accent text-accent-foreground">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            <Check className="size-4 mr-2" />
            Mark all read
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearAll}>
            <X className="size-4 mr-2" />
            Clear all
          </Button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </Button>
        <Button 
          variant={filter === 'unread' ? 'default' : 'outline'}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </Button>
      </div>

      {/* Notifications List */}
      <Card>
        <ScrollArea className="h-[600px]">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <BellOff className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-muted-foreground">No notifications</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {filter === 'unread' ? "You're all caught up!" : "You don't have any notifications yet"}
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredNotifications.map(notification => {
                const Icon = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);

                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors ${
                      !notification.read ? 'bg-muted/30' : ''
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`size-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                        <Icon className="size-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold">{notification.title}</p>
                            {!notification.read && (
                              <div className="size-2 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <Badge variant={getPriorityBadge(notification.priority)} className="flex-shrink-0">
                            {notification.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            {formatTime(notification.timestamp)}
                          </div>

                          <div className="flex items-center gap-2">
                            {notification.actionUrl && (
                              <Button variant="link" size="sm" className="h-auto p-0">
                                View Details
                              </Button>
                            )}
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Check className="size-4 mr-1" />
                                Mark read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <X className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-muted-foreground" />
            <p className="text-sm">Enable browser notifications to stay updated</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => notificationService.requestPermission()}
          >
            Enable Notifications
          </Button>
        </div>
      </Card>
    </div>
  );
}
