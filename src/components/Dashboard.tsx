import { Search, Plus, Calendar, MessageCircle, Wallet, MapPin, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { WorkflowGuide } from './WorkflowGuide';
import wasselLogo from 'figma:asset/1ccf434105a811706fd618a3b652ae052ecf47e1.png';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-8 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-3 shadow-lg">
              <img src={wasselLogo} alt="Wassel" className="h-12 w-auto" />
            </div>
            <div>
              <h1 className="text-white">
                Welcome back, Ahmed! <span className="opacity-90">أهلاً وسهلاً</span>
              </h1>
              <p className="text-primary-foreground/80">Ready for your next journey with Wassel?</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-primary-foreground/80">Your Impact</p>
              <p className="text-2xl">12 Trips</p>
              <p className="text-sm text-primary-foreground/80">320 kg CO₂ saved</p>
            </div>
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-secondary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-white to-primary/5" onClick={() => onNavigate('find-ride')}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="flex items-center gap-2">
                  Find a Ride
                  <Badge variant="secondary" className="bg-primary/10 text-primary">Popular</Badge>
                </CardTitle>
                <CardDescription>Search for available rides across cities</CardDescription>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/90 rounded-xl flex items-center justify-center shadow-lg">
                <Search className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>500+ routes available today</span>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Search Now</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-secondary/30 bg-gradient-to-br from-white to-secondary/5" onClick={() => onNavigate('offer-ride')}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="flex items-center gap-2">
                  Offer a Ride
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary">Earn</Badge>
                </CardTitle>
                <CardDescription>Share your journey and earn money</CardDescription>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/90 rounded-xl flex items-center justify-center shadow-lg">
                <Plus className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Help 3-4 travelers save money</span>
            </div>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">Create Trip</Button>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Guide */}
      <WorkflowGuide steps={workflowSteps} />

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Upcoming Trips</CardTitle>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-3xl">2</div>
              <p className="text-sm text-gray-500">Active bookings</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Messages</CardTitle>
              <MessageCircle className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-3xl">1</div>
              <p className="text-sm text-gray-500">Unread messages</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Wallet Balance</CardTitle>
              <Wallet className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-3xl">$250</div>
              <p className="text-sm text-gray-500">Available funds</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest trips and bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'wasel' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                  }`}>
                    {activity.type === 'wasel' ? '→' : '↔'}
                  </div>
                  <div>
                    <p className="text-gray-900">{activity.route}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">${activity.price}</p>
                  <p className="text-sm text-gray-500">{activity.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const workflowSteps = [
  {
    id: 'profile',
    title: 'Complete Your Profile',
    description: 'Add your photo and verify your phone number',
    completed: true,
    current: false
  },
  {
    id: 'search',
    title: 'Find Your First Ride',
    description: 'Search for available trips in your area',
    completed: false,
    current: true
  },
  {
    id: 'book',
    title: 'Book & Connect',
    description: 'Reserve seats and chat with your driver',
    completed: false,
    current: false
  },
  {
    id: 'travel',
    title: 'Enjoy Your Journey',
    description: 'Meet at pickup point and travel safely',
    completed: false,
    current: false
  },
  {
    id: 'rate',
    title: 'Rate Your Experience',
    description: 'Help build trust in the community',
    completed: false,
    current: false
  }
];

const recentActivities = [
  {
    type: 'wasel',
    route: 'Dubai → Abu Dhabi',
    date: 'Oct 3, 2025',
    price: 45,
    status: 'Confirmed'
  },
  {
    type: 'raje3',
    route: 'Riyadh → Jeddah (Return)',
    date: 'Oct 5, 2025',
    price: 120,
    status: 'Pending'
  },
  {
    type: 'wasel',
    route: 'Cairo → Alexandria',
    date: 'Sep 28, 2025',
    price: 35,
    status: 'Completed'
  }
];
