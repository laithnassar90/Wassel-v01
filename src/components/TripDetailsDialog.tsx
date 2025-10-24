import { useState } from 'react';
import { X, MapPin, Calendar, Clock, Users, DollarSign, Star, Phone, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { MapComponent } from './MapComponent';
import { Avatar, AvatarFallback } from './ui/avatar';

interface TripStop {
  label: string;
  lat: number;
  lng: number;
}

interface TripDetails {
  id: number;
  driver: {
    name: string;
    initials: string;
    rating: number;
    trips: number;
    phone?: string;
  };
  from: string;
  to: string;
  stops?: TripStop[];
  date: string;
  time: string;
  seats: number;
  price: number;
  tripType: 'wasel' | 'raje3';
  vehicleModel?: string;
  notes?: string;
}

interface TripDetailsDialogProps {
  trip: TripDetails | null;
  open: boolean;
  onClose: () => void;
  onBook?: (tripId: number) => void;
}

export function TripDetailsDialog({ trip, open, onClose, onBook }: TripDetailsDialogProps) {
  const [selectedSeats, setSelectedSeats] = useState(1);

  if (!trip) return null;

  // Prepare map locations
  const mapLocations = [
    {
      lat: trip.stops?.[0]?.lat || 25.2048, // Dubai default
      lng: trip.stops?.[0]?.lng || 55.2708,
      label: trip.from,
      type: 'start' as const
    },
    ...(trip.stops?.slice(1, -1).map((stop, index) => ({
      lat: stop.lat,
      lng: stop.lng,
      label: stop.label,
      type: 'stop' as const
    })) || []),
    {
      lat: trip.stops?.[trip.stops.length - 1]?.lat || 24.4539, // Abu Dhabi default
      lng: trip.stops?.[trip.stops.length - 1]?.lng || 54.3773,
      label: trip.to,
      type: 'destination' as const
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Trip Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Driver Info */}
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {trip.driver.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3>{trip.driver.name}</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{trip.driver.rating}</span>
                </div>
                <span>•</span>
                <span>{trip.driver.trips} trips completed</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Button>
              </div>
            </div>
            <Badge variant={trip.tripType === 'wasel' ? 'default' : 'secondary'}>
              {trip.tripType === 'wasel' ? 'Wasel (واصل)' : 'Raje3 (راجع)'}
            </Badge>
          </div>

          <Separator />

          {/* Route Map */}
          <div className="space-y-3">
            <h3>Route & Stops</h3>
            <MapComponent 
              locations={mapLocations}
              showRoute={true}
              height="350px"
            />
          </div>

          {/* Trip Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3>Trip Information</h3>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Route</p>
                  <p>{trip.from} → {trip.to}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{trip.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Departure Time</p>
                  <p>{trip.time}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3>Booking Details</h3>
              
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Available Seats</p>
                  <p>{trip.seats} seats left</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Price per Seat</p>
                  <p className="text-2xl text-primary">${trip.price}</p>
                </div>
              </div>

              {trip.vehicleModel && (
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    🚗
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p>{trip.vehicleModel}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stops List */}
          {trip.stops && trip.stops.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3>Stops Along the Way</h3>
                <div className="space-y-2">
                  {trip.stops.map((stop, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs
                        ${index === 0 ? 'bg-primary text-primary-foreground' : 
                          index === trip.stops!.length - 1 ? 'bg-accent text-accent-foreground' : 
                          'bg-secondary text-secondary-foreground'}
                      `}>
                        {index === 0 ? 'A' : index === trip.stops!.length - 1 ? 'B' : index}
                      </div>
                      <p>{stop.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Additional Notes */}
          {trip.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3>Additional Notes</h3>
                <p className="text-sm text-muted-foreground">{trip.notes}</p>
              </div>
            </>
          )}

          {/* Booking Section */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Number of Seats</p>
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedSeats(Math.max(1, selectedSeats - 1))}
                    disabled={selectedSeats <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{selectedSeats}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedSeats(Math.min(trip.seats, selectedSeats + 1))}
                    disabled={selectedSeats >= trip.seats}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-2xl text-primary">${trip.price * selectedSeats}</p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                if (onBook) onBook(trip.id);
                onClose();
              }}
            >
              Book {selectedSeats} Seat{selectedSeats > 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
