import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Repeat, 
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RecurringTrip {
  id: string;
  name: string;
  from: string;
  to: string;
  days: string[];
  time: string;
  price: number;
  active: boolean;
  nextOccurrence: Date;
  totalBookings: number;
}

export function RecurringTrips() {
  const [recurringTrips, setRecurringTrips] = useState<RecurringTrip[]>([
    {
      id: '1',
      name: 'Morning Commute to Work',
      from: 'Dubai Marina',
      to: 'Business Bay',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      time: '08:00',
      price: 35,
      active: true,
      nextOccurrence: new Date(Date.now() + 86400000),
      totalBookings: 24
    },
    {
      id: '2',
      name: 'Weekend Abu Dhabi Trip',
      from: 'Dubai',
      to: 'Abu Dhabi',
      days: ['Sat'],
      time: '10:00',
      price: 120,
      active: true,
      nextOccurrence: new Date(Date.now() + 2 * 86400000),
      totalBookings: 8
    },
    {
      id: '3',
      name: 'Evening Return Home',
      from: 'Business Bay',
      to: 'Dubai Marina',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      time: '18:00',
      price: 35,
      active: false,
      nextOccurrence: new Date(Date.now() + 86400000),
      totalBookings: 20
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({
    name: '',
    from: '',
    to: '',
    days: [] as string[],
    time: '',
    price: 0
  });

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleToggleActive = (id: string) => {
    setRecurringTrips(trips => 
      trips.map(trip => 
        trip.id === id ? { ...trip, active: !trip.active } : trip
      )
    );
    toast.success('Recurring trip updated');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this recurring trip?')) {
      setRecurringTrips(trips => trips.filter(t => t.id !== id));
      toast.success('Recurring trip deleted');
    }
  };

  const handleDayToggle = (day: string) => {
    setNewTrip(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleCreateTrip = () => {
    if (!newTrip.name || !newTrip.from || !newTrip.to || newTrip.days.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const trip: RecurringTrip = {
      id: Date.now().toString(),
      ...newTrip,
      active: true,
      nextOccurrence: new Date(Date.now() + 86400000),
      totalBookings: 0
    };

    setRecurringTrips([...recurringTrips, trip]);
    setDialogOpen(false);
    setNewTrip({ name: '', from: '', to: '', days: [], time: '', price: 0 });
    toast.success('Recurring trip created!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Repeat className="size-8 text-primary" />
          <div>
            <h1>Recurring Trips</h1>
            <p className="text-muted-foreground">Manage your scheduled commutes and regular trips</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              New Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Recurring Trip</DialogTitle>
              <DialogDescription>
                Set up a schedule for regular commutes or trips
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Trip Name</Label>
                <Input
                  placeholder="e.g., Morning Commute to Work"
                  value={newTrip.name}
                  onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From</Label>
                  <Input
                    placeholder="Starting location"
                    value={newTrip.from}
                    onChange={(e) => setNewTrip({ ...newTrip, from: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>To</Label>
                  <Input
                    placeholder="Destination"
                    value={newTrip.to}
                    onChange={(e) => setNewTrip({ ...newTrip, to: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Repeat on</Label>
                <div className="flex gap-2 flex-wrap">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        newTrip.days.includes(day)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/70'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Departure Time</Label>
                  <Input
                    type="time"
                    value={newTrip.time}
                    onChange={(e) => setNewTrip({ ...newTrip, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price per Trip (AED)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newTrip.price || ''}
                    onChange={(e) => setNewTrip({ ...newTrip, price: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTrip}>
                  Create Schedule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Repeat className="size-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-semibold">{recurringTrips.length}</div>
              <p className="text-sm text-muted-foreground">Active Schedules</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <Calendar className="size-5 text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {recurringTrips.reduce((sum, t) => sum + t.totalBookings, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-accent/10 flex items-center justify-center">
              <DollarSign className="size-5 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {recurringTrips.reduce((sum, t) => sum + (t.totalBookings * t.price), 0)} AED
              </div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recurring Trips List */}
      <div className="space-y-4">
        {recurringTrips.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <Repeat className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-muted-foreground mb-2">No recurring trips yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a schedule for your regular commutes to save time
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="size-4 mr-2" />
                Create Your First Schedule
              </Button>
            </div>
          </Card>
        ) : (
          recurringTrips.map(trip => (
            <Card key={trip.id} className={`p-6 ${!trip.active ? 'opacity-60' : ''}`}>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Main Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3>{trip.name}</h3>
                        <Badge variant={trip.active ? 'default' : 'outline'}>
                          {trip.active ? 'Active' : 'Paused'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          <span>{trip.from} → {trip.to}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          <span>{trip.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="size-4" />
                          <span>{trip.price} AED</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Days */}
                  <div className="flex gap-2 flex-wrap">
                    {daysOfWeek.map(day => (
                      <div
                        key={day}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          trip.days.includes(day)
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Next Trip</p>
                      <p className="text-sm font-semibold">
                        {trip.nextOccurrence.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Bookings</p>
                      <p className="text-sm font-semibold">{trip.totalBookings}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Earned</p>
                      <p className="text-sm font-semibold">{trip.totalBookings * trip.price} AED</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleActive(trip.id)}
                  >
                    {trip.active ? (
                      <>
                        <Pause className="size-4 md:mr-2" />
                        <span className="hidden md:inline">Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="size-4 md:mr-2" />
                        <span className="hidden md:inline">Resume</span>
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="size-4 md:mr-2" />
                    <span className="hidden md:inline">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(trip.id)}
                  >
                    <Trash2 className="size-4 md:mr-2" />
                    <span className="hidden md:inline">Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Tips */}
      <Card className="p-6 bg-muted/50">
        <h3 className="mb-3">Tips for Recurring Trips</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <Calendar className="size-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Set up recurring trips for your daily commute to save time on booking</span>
          </li>
          <li className="flex items-start gap-2">
            <DollarSign className="size-4 text-secondary mt-0.5 flex-shrink-0" />
            <span>Offer subscription-based pricing for regular passengers</span>
          </li>
          <li className="flex items-start gap-2">
            <Repeat className="size-4 text-accent mt-0.5 flex-shrink-0" />
            <span>You can pause or modify schedules anytime without canceling</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
