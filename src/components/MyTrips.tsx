import { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, ArrowRight, Navigation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { LiveTripMap } from './LiveTripMap';

export function MyTrips() {
  const [selectedTripForTracking, setSelectedTripForTracking] = useState<any>(null);
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false);

  const handleTrackTrip = (trip: any) => {
    setSelectedTripForTracking(trip);
    setTrackingDialogOpen(true);
  };

  const handleLocationShare = (location: { lat: number; lng: number }) => {
    console.log('Location shared:', location);
    // In production, send to backend/other riders
  };
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1>My Trips</h1>
        <p className="text-gray-600">Manage your upcoming and past journeys</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="as-driver">As Driver</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingTrips.map((trip) => (
            <Card key={trip.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Trip Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={trip.type === 'wasel' ? 'default' : 'secondary'}>
                        {trip.type === 'wasel' ? 'Wasel (واصل)' : 'Raje3 (راجع)'}
                      </Badge>
                      <Badge variant="outline">{trip.status}</Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{trip.from}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{trip.to}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{trip.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{trip.seats} seats booked</span>
                      </div>
                    </div>

                    {/* Driver Info */}
                    <div className="flex items-center gap-3 pt-3 border-t">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm">{trip.driver.initials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{trip.driver.name}</p>
                        <p className="text-sm text-gray-500">{trip.driver.vehicle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex lg:flex-col items-end justify-between lg:justify-start gap-4">
                    <div className="text-right">
                      <div className="text-2xl text-primary">${trip.totalPrice}</div>
                      <p className="text-sm text-gray-500">Total price</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTrackTrip(trip)}
                        className="gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        Track Live
                      </Button>
                      <Button variant="outline" size="sm">Contact Driver</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="as-driver" className="space-y-4">
          {driverTrips.map((trip) => (
            <Card key={trip.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={trip.type === 'wasel' ? 'default' : 'secondary'}>
                        {trip.type === 'wasel' ? 'Wasel (واصل)' : 'Raje3 (راجع)'}
                      </Badge>
                      <Badge variant="outline">{trip.booked}/{trip.totalSeats} seats booked</Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{trip.from}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{trip.to}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{trip.date} at {trip.time}</span>
                    </div>

                    {trip.passengers.length > 0 && (
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium mb-2">Passengers:</p>
                        <div className="space-y-2">
                          {trip.passengers.map((passenger, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-xs">{passenger.initials}</span>
                              </div>
                              <span>{passenger.name}</span>
                              <span className="text-gray-500">• {passenger.seats} seat(s)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col items-end justify-between lg:justify-start gap-4">
                    <div className="text-right">
                      <div className="text-2xl text-primary">${trip.earnings}</div>
                      <p className="text-sm text-gray-500">Est. earnings</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Cancel Trip
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedTrips.map((trip) => (
            <Card key={trip.id} className="opacity-75">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Completed
                      </Badge>
                      <Badge variant={trip.type === 'wasel' ? 'default' : 'secondary'}>
                        {trip.type === 'wasel' ? 'Wasel' : 'Raje3'}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{trip.from}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{trip.to}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">{trip.date}</p>
                  </div>

                  <div className="flex lg:flex-col items-end justify-between lg:justify-start gap-4">
                    <div className="text-right">
                      <div className="text-2xl">${trip.price}</div>
                    </div>
                    <Button variant="outline" size="sm">Rate Driver</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Live Tracking Dialog */}
      {selectedTripForTracking && (
        <Dialog open={trackingDialogOpen} onOpenChange={setTrackingDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Live Trip Tracking</DialogTitle>
            </DialogHeader>
            <LiveTripMap
              tripId={selectedTripForTracking.id.toString()}
              route={selectedTripForTracking.route || []}
              isDriver={false}
              allowLocationSharing={true}
              onShareLocation={handleLocationShare}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

const upcomingTrips = [
  {
    id: 1,
    type: 'wasel',
    status: 'Confirmed',
    from: 'Dubai',
    to: 'Abu Dhabi',
    date: 'Oct 3, 2025',
    time: '08:00 AM',
    seats: 2,
    totalPrice: 90,
    driver: {
      name: 'Ahmed Hassan',
      initials: 'AH',
      vehicle: 'Toyota Camry • White'
    },
    route: [
      { label: 'Dubai Mall', lat: 25.1972, lng: 55.2744 },
      { label: 'Dubai Marina', lat: 25.0805, lng: 55.1396 },
      { label: 'Jebel Ali', lat: 24.9857, lng: 55.0272 },
      { label: 'Abu Dhabi Downtown', lat: 24.4539, lng: 54.3773 }
    ]
  },
  {
    id: 2,
    type: 'raje3',
    status: 'Pending',
    from: 'Riyadh',
    to: 'Jeddah',
    date: 'Oct 5, 2025',
    time: '06:00 AM',
    seats: 1,
    totalPrice: 120,
    driver: {
      name: 'Sarah Mohammed',
      initials: 'SM',
      vehicle: 'Honda Accord • Silver'
    },
    route: [
      { label: 'Riyadh City Center', lat: 24.7136, lng: 46.6753 },
      { label: 'Al Qassim', lat: 26.3260, lng: 43.9750 },
      { label: 'Medina', lat: 24.5247, lng: 39.5692 },
      { label: 'Jeddah Corniche', lat: 21.5433, lng: 39.1728 }
    ]
  }
];

const driverTrips = [
  {
    id: 1,
    type: 'wasel',
    from: 'Cairo',
    to: 'Alexandria',
    date: 'Oct 4, 2025',
    time: '10:00 AM',
    totalSeats: 4,
    booked: 2,
    pricePerSeat: 35,
    earnings: 70,
    passengers: [
      { name: 'Mohamed Ali', initials: 'MA', seats: 1 },
      { name: 'Layla Ahmed', initials: 'LA', seats: 1 }
    ],
    route: [
      { label: 'Cairo Downtown', lat: 30.0444, lng: 31.2357 },
      { label: 'Giza Pyramids', lat: 29.9792, lng: 31.1342 },
      { label: 'Wadi El Natrun', lat: 30.3833, lng: 30.3500 },
      { label: 'Alexandria Corniche', lat: 31.2001, lng: 29.9187 }
    ]
  }
];

const completedTrips = [
  {
    id: 1,
    type: 'wasel',
    from: 'Amman',
    to: 'Aqaba',
    date: 'Sep 28, 2025',
    price: 65
  },
  {
    id: 2,
    type: 'raje3',
    from: 'Manama',
    to: 'Muharraq',
    date: 'Sep 25, 2025',
    price: 20
  }
];
