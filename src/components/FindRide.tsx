import { useState } from 'react';
import { MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { TripDetailsDialog } from './TripDetailsDialog';
import { toast, Toaster } from 'sonner'; // ✅ fixed import

export function FindRide() {
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [selectedTrip, setSelectedTrip] = useState<typeof availableRides[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (ride: typeof availableRides[0]) => {
    setSelectedTrip(ride);
    setDialogOpen(true);
  };

  const handleBookTrip = (tripId: number) => {
    toast.success('✅ Trip booked successfully! Check "My Trips" for details.');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Toast Notification Handler */}
      <Toaster position="top-center" richColors />

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Find a Ride</CardTitle>
          <CardDescription>Search for available rides across the Middle East</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>From</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Starting location"
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>To</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Destination"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Passengers</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="number"
                  min="1"
                  max="8"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Button className="w-full md:w-auto mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
            Search Rides
          </Button>
        </CardContent>
      </Card>

      {/* Available Rides */}
      <div className="space-y-4">
        <h2>Available Rides</h2>
        <div className="space-y-4">
          {availableRides.map((ride) => (
            <Card key={ride.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Driver Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span>{ride.driver.initials}</span>
                    </div>
                    <div>
                      <p className="font-medium">{ride.driver.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{ride.driver.rating}</span>
                        <span>•</span>
                        <span>{ride.driver.trips} trips</span>
                      </div>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{ride.from}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{ride.to}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{ride.date}</span>
                        <span>•</span>
                        <span>{ride.time}</span>
                        <span>•</span>
                        <span>{ride.seats} seats left</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl text-primary">${ride.price}</div>
                      <p className="text-sm text-gray-500">per seat</p>
                    </div>
                    {ride.tripType && (
                      <Badge variant={ride.tripType === 'wasel' ? 'default' : 'secondary'}>
                        {ride.tripType === 'wasel' ? 'Wasel (واصل)' : 'Raje3 (راجع)'}
                      </Badge>
                    )}
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => handleViewDetails(ride)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trip Details Dialog with Map */}
      <TripDetailsDialog
        trip={selectedTrip}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onBook={handleBookTrip}
      />
    </div>
  );
}

const availableRides = [
  {
    id: 1,
    driver: {
      name: 'Ahmed Hassan',
      initials: 'AH',
      rating: 4.8,
      trips: 127,
      phone: '+971 50 123 4567',
    },
    from: 'Dubai',
    to: 'Abu Dhabi',
    stops: [
      { label: 'Dubai Mall', lat: 25.1972, lng: 55.2744 },
      { label: 'Dubai Marina', lat: 25.0805, lng: 55.1396 },
      { label: 'Jebel Ali', lat: 24.9857, lng: 55.0272 },
      { label: 'Abu Dhabi Downtown', lat: 24.4539, lng: 54.3773 },
    ],
    date: 'Oct 3, 2025',
    time: '08:00 AM',
    seats: 3,
    price: 45,
    tripType: 'wasel' as const,
    vehicleModel: 'Toyota Camry 2023',
    notes: 'Air-conditioned vehicle. Please be on time.',
  },
  {
    id: 2,
    driver: {
      name: 'Sarah Mohammed',
      initials: 'SM',
      rating: 4.9,
      trips: 234,
      phone: '+966 50 987 6543',
    },
    from: 'Riyadh',
    to: 'Jeddah',
    stops: [
      { label: 'Riyadh City Center', lat: 24.7136, lng: 46.6753 },
      { label: 'Al Qassim', lat: 26.326, lng: 43.975 },
      { label: 'Medina', lat: 24.5247, lng: 39.5692 },
      { label: 'Jeddah Corniche', lat: 21.5433, lng: 39.1728 },
    ],
    date: 'Oct 5, 2025',
    time: '06:00 AM',
    seats: 2,
    price: 120,
    tripType: 'raje3' as const,
    vehicleModel: 'Honda Accord 2024',
    notes: 'Return trip on Oct 7. Family-friendly ride.',
  },
  {
    id: 3,
    driver: {
      name: 'Omar Abdullah',
      initials: 'OA',
      rating: 4.7,
      trips: 98,
      phone: '+20 10 1234 5678',
    },
    from: 'Cairo',
    to: 'Alexandria',
    stops: [
      { label: 'Cairo Downtown', lat: 30.0444, lng: 31.2357 },
      { label: 'Giza Pyramids', lat: 29.9792, lng: 31.1342 },
      { label: 'Wadi El Natrun', lat: 30.3833, lng: 30.35 },
      { label: 'Alexandria Corniche', lat: 31.2001, lng: 29.9187 },
    ],
    date: 'Oct 4, 2025',
    time: '10:00 AM',
    seats: 4,
    price: 35,
    tripType: 'wasel' as const,
    vehicleModel: 'Hyundai Elantra 2023',
    notes: 'Comfortable ride with refreshments included.',
  },
  {
    id: 4,
    driver: {
      name: 'Fatima Ali',
      initials: 'FA',
      rating: 5.0,
      trips: 156,
      phone: '+974 5555 1234',
    },
    from: 'Doha',
    to: 'Al Khor',
    stops: [
      { label: 'Doha Souq', lat: 25.2867, lng: 51.531 },
      { label: 'Lusail City', lat: 25.4295, lng: 51.4932 },
      { label: 'Al Khor Mall', lat: 25.681, lng: 51.4969 },
    ],
    date: 'Oct 3, 2025',
    time: '02:00 PM',
    seats: 3,
    price: 25,
    tripType: 'wasel' as const,
    vehicleModel: 'Nissan Altima 2024',
    notes: 'Women and families only. Quiet and safe ride.',
  },
];
