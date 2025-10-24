import { useState, useEffect } from 'react';
import { MapPin, Navigation, Share2, AlertCircle } from 'lucide-react';
import { MapComponent } from './MapComponent';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';

interface TripLocation {
  lat: number;
  lng: number;
  label: string;
  type: 'start' | 'stop' | 'destination' | 'current';
}

interface LiveTripMapProps {
  tripId: string;
  route: Omit<TripLocation, 'type' | 'current'>[];
  isDriver?: boolean;
  allowLocationSharing?: boolean;
  onShareLocation?: (location: { lat: number; lng: number }) => void;
}

export function LiveTripMap({ 
  tripId, 
  route, 
  isDriver = false, 
  allowLocationSharing = true,
  onShareLocation 
}: LiveTripMapProps) {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  // Request location permission and start tracking
  const startLocationSharing = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setLocationError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    // Watch position for continuous updates
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(location);
        setIsSharing(true);
        
        // Callback to share location with other riders
        if (onShareLocation) {
          onShareLocation(location);
        }
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setIsSharing(false);
      },
      options
    );

    setWatchId(id);
  };

  // Stop location sharing
  const stopLocationSharing = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsSharing(false);
    setCurrentLocation(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  // Prepare map locations
  const mapLocations: TripLocation[] = route.map((loc, index) => ({
    ...loc,
    type: index === 0 ? 'start' : index === route.length - 1 ? 'destination' : 'stop'
  }));

  // Add current location if available
  if (currentLocation && isSharing) {
    mapLocations.push({
      lat: currentLocation.lat,
      lng: currentLocation.lng,
      label: isDriver ? 'Your Location (Driver)' : 'Your Location',
      type: 'current'
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Live Trip Map
          </CardTitle>
          {isSharing && (
            <Badge variant="default" className="bg-primary">
              <Navigation className="w-3 h-3 mr-1" />
              Tracking Active
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Location Permission Alert */}
        {locationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
        )}

        {/* Location Sharing Controls */}
        {allowLocationSharing && (
          <div className="flex gap-2">
            {!isSharing ? (
              <Button
                onClick={startLocationSharing}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share My Location
              </Button>
            ) : (
              <Button
                onClick={stopLocationSharing}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                Stop Sharing
              </Button>
            )}
            
            {isSharing && (
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm">Location shared with {isDriver ? 'passengers' : 'driver'}</span>
              </div>
            )}
          </div>
        )}

        {/* Map */}
        <MapComponent 
          locations={mapLocations}
          showRoute={true}
          height="500px"
        />

        {/* Route Details */}
        <div className="space-y-2">
          <h3 className="text-sm">Route Details</h3>
          <div className="space-y-2">
            {route.map((location, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs
                  ${index === 0 ? 'bg-primary text-primary-foreground' : 
                    index === route.length - 1 ? 'bg-accent text-accent-foreground' : 
                    'bg-secondary text-secondary-foreground'}
                `}>
                  {index === 0 ? 'A' : index === route.length - 1 ? 'B' : index}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{location.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {index === 0 ? 'Starting Point' : 
                     index === route.length - 1 ? 'Final Destination' : 
                     `Stop ${index}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
