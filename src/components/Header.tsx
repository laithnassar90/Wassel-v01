import { useEffect, useState } from 'react';
import { Bell, Menu, User } from 'lucide-react';
import { Badge } from './ui/badge';
import { Logo } from './Logo';
import { notificationService } from '../services/notificationService';

interface HeaderProps {
  onMenuClick: () => void;
  onNavigate?: (page: string) => void;
}

export function Header({ onMenuClick, onNavigate }: HeaderProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notifications) => {
      const count = notifications.filter(n => !n.read).length;
      setUnreadCount(count);
    });

    return unsubscribe;
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo size="xs" showText={false} className="lg:hidden" />
          <div className="hidden sm:block">
            <h1 className="text-gray-900">Wassel</h1>
            <p className="text-sm text-gray-500">واصل</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button 
            className="relative p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => onNavigate?.('notifications')}
          >
            <Bell className="w-5 h-5 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 size-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* User Avatar */}
          <button 
            className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
            onClick={() => onNavigate?.('profile')}
          >
            <User className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </header>
  );
}
