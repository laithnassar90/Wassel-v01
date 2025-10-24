import { 
  LayoutDashboard, 
  Search, 
  PlusCircle, 
  Calendar, 
  MessageCircle, 
  CreditCard, 
  Settings, 
  X,
  User,
  Bell,
  Shield,
  TrendingUp,
  Repeat,
  CheckCircle
} from 'lucide-react';
import { Logo } from './Logo';
import { Separator } from './ui/separator';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const mainMenuItems = [
  { id: 'dashboard', label: 'Dashboard', labelAr: 'لوحة التحكم', icon: LayoutDashboard },
  { id: 'find-ride', label: 'Find a Ride', labelAr: 'ابحث عن رحلة', icon: Search },
  { id: 'offer-ride', label: 'Offer a Ride', labelAr: 'اعرض رحلة', icon: PlusCircle },
  { id: 'my-trips', label: 'My Trips', labelAr: 'رحلاتي', icon: Calendar },
  { id: 'recurring', label: 'Recurring Trips', labelAr: 'رحلات متكررة', icon: Repeat },
  { id: 'messages', label: 'Messages', labelAr: 'الرسائل', icon: MessageCircle },
];

const accountMenuItems = [
  { id: 'profile', label: 'My Profile', labelAr: 'ملفي الشخصي', icon: User },
  { id: 'analytics', label: 'Analytics', labelAr: 'التحليلات', icon: TrendingUp },
  { id: 'payments', label: 'Payments', labelAr: 'المدفوعات', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', labelAr: 'الإشعارات', icon: Bell },
  { id: 'verification', label: 'Verification', labelAr: 'التحقق', icon: CheckCircle },
  { id: 'safety', label: 'Safety Center', labelAr: 'مركز الأمان', icon: Shield },
  { id: 'settings', label: 'Settings', labelAr: 'الإعدادات', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <Logo size="sm" />
            <button 
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="space-y-1">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-colors
                      ${isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <Separator className="my-4" />

            <div className="space-y-1">
              <p className="px-4 text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Account
              </p>
              {accountMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-colors
                      ${isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
