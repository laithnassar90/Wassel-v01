import { useState } from 'react';
import { MapPin, Calendar, Clock, Users, DollarSign, Car, Plus, X, Navigation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { MapComponent } from './MapComponent';
import { toast } from 'sonner@2.0.3';

interface Stop {
  label: string;
  lat: number;
  lng: number;
}

export function OfferRide() {
  const [tripType, setTripType] = useState('wasel');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [stops, setStops] = useState<Stop[]>([]);
  const [newStopLabel, setNewStopLabel] = useState('');
  const [showRoutePreview, setShowRoutePreview] = useState(false);

  // Mock geocoding - In production, use a real geocoding service
  const geocodeLocation = (location: string): { lat: number; lng: number } => {
    const mockCoordinates: Record<string, { lat: number; lng: number }> = {
      'dubai': { lat: 25.2048, lng: 55.2708 },
      'abu dhabi': { lat: 24.4539, lng: 54.3773 },
      'riyadh': { lat: 24.7136, lng: 46.6753 },
      'jeddah': { lat: 21.5433, lng: 39.1728 },
      'cairo': { lat: 30.0444, lng: 31.2357 },
      'alexandria': { lat: 31.2001, lng: 29.9187 },
      'doha': { lat: 25.2867, lng: 51.5310 },
    };
    
    const key = location.toLowerCase();
    return mockCoordinates[key] || { lat: 25.2048, lng: 55.2708 };
  };

  const addStop = () => {
    if (newStopLabel.trim()) {
      const coords = geocodeLocation(newStopLabel);
      setStops([...stops, { label: newStopLabel, ...coords }]);
      setNewStopLabel('');
    }
  };

  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (!from || !to) {
      toast.error('Please enter starting location and destination');
      return;
    }
    toast.success('Ride published successfully!');
  };

  // Prepare map locations for preview
  const getMapLocations = () => {
    if (!from && !to && stops.length === 0) return [];
    
    const locations = [];
    
    if (from) {
      const coords = geocodeLocation(from);
      locations.push({ ...coords, label: from, type: 'start' as const });
    }
    
    stops.forEach(stop => {
      locations.push({ ...stop, type: 'stop' as const });
    });
    
    if (to) {
      const coords = geocodeLocation(to);
      locations.push({ ...coords, label: to, type: 'destination' as const });
    }
    
    return locations;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1>Offer a Ride</h1>
        <p className="text-gray-600">Share your journey and help others reach their destination</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
          <CardDescription>Provide information about your journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Trip Type */}
          <div className="space-y-3">
            <Label>Trip Type</Label>
            <RadioGroup value={tripType} onValueChange={setTripType} className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <RadioGroupItem value="wasel" id="wasel" className="peer sr-only" />
                <Label
                  htmlFor="wasel"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                >
                  <div className="text-center space-y-2">
                    <div className="text-4xl">→</div>
                    <p className="font-medium">Wasel (واصل)</p>
                    <p className="text-sm text-gray-500">One-way trip</p>
                  </div>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="raje3" id="raje3" className="peer sr-only" />
                <Label
                  htmlFor="raje3"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                >
                  <div className="text-center space-y-2">
                    <div className="text-4xl">↔</div>
                    <p className="font-medium">Raje3 (راجع)</p>
                    <p className="text-sm text-gray-500">Return trip</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Route */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Starting location" 
                    className="pl-10"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Destination" 
                    className="pl-10"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Add Stops */}
            <div className="space-y-3">
              <Label>Stops Along the Way (Optional)</Label>
              
              {stops.length > 0 && (
                <div className="space-y-2">
                  {stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span className="flex-1">{stop.label}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeStop(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Add a stop (e.g., Dubai Marina)"
                    className="pl-10"
                    value={newStopLabel}
                    onChange={(e) => setNewStopLabel(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addStop()}
                  />
                </div>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={addStop}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Stop
                </Button>
              </div>
            </div>

            {/* Route Preview */}
            {(from || to || stops.length > 0) && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Route Preview</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowRoutePreview(!showRoutePreview)}
                    className="gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    {showRoutePreview ? 'Hide Map' : 'Show Map'}
                  </Button>
                </div>
                
                {showRoutePreview && (
                  <MapComponent
                    locations={getMapLocations()}
                    showRoute={true}
                    height="300px"
                  />
                )}
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Departure Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="date" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Departure Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="time" className="pl-10" />
              </div>
            </div>
          </div>

          {/* Return Trip (if Raje3) */}
          {tripType === 'raje3' && (
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-secondary/5 rounded-lg">
              <div className="space-y-2">
                <Label>Return Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input type="date" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Return Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input type="time" className="pl-10" />
                </div>
              </div>
            </div>
          )}

          {/* Vehicle & Seats */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Vehicle Model</Label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="e.g., Toyota Camry" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Available Seats</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="number" min="1" max="8" placeholder="1-8 seats" className="pl-10" />
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label>Price per Seat (USD)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input type="number" min="0" step="0.01" placeholder="Enter price" className="pl-10" />
            </div>
            <p className="text-sm text-gray-500">Set a fair price based on distance and fuel costs</p>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label>Additional Notes (Optional)</Label>
            <Textarea 
              placeholder="Any special instructions or requirements for riders..."
              className="min-h-24"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handlePublish}
            >
              Publish Ride
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Tips for a Great Ride</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ Be punctual and communicate any delays</li>
            <li>✓ Keep your vehicle clean and comfortable</li>
            <li>✓ Set fair prices based on distance and fuel costs</li>
            <li>✓ Be respectful and maintain good conversation</li>
            <li>✓ Follow safety guidelines and traffic rules</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
