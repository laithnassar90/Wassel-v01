import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { X } from 'lucide-react';

interface AdvancedFiltersProps {
  filters: {
    priceRange: number[];
    minRating: number;
    verifiedOnly: boolean;
    instantBook: boolean;
    preferences: {
      noSmoking: boolean;
      petsAllowed: boolean;
      musicOk: boolean;
      quietRide: boolean;
    };
  };
  onFiltersChange: (filters: any) => void;
  onClear: () => void;
}

export function AdvancedFilters({ filters, onFiltersChange, onClear }: AdvancedFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>Advanced Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="size-4 mr-2" />
          Clear All
        </Button>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label>Price Range (AED)</Label>
        <div className="px-2">
          <Slider
            min={0}
            max={200}
            step={5}
            value={filters.priceRange}
            onValueChange={(value) => 
              onFiltersChange({ ...filters, priceRange: value })
            }
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{filters.priceRange[0]} AED</span>
          <span>{filters.priceRange[1]} AED</span>
        </div>
      </div>

      <Separator />

      {/* Minimum Rating */}
      <div className="space-y-3">
        <Label>Minimum Rating</Label>
        <div className="px-2">
          <Slider
            min={0}
            max={5}
            step={0.5}
            value={[filters.minRating]}
            onValueChange={(value) => 
              onFiltersChange({ ...filters, minRating: value[0] })
            }
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filters.minRating.toFixed(1)} stars and above
        </div>
      </div>

      <Separator />

      {/* Quick Filters */}
      <div className="space-y-3">
        <Label>Quick Filters</Label>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Verified Drivers Only</span>
            <Switch
              checked={filters.verifiedOnly}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, verifiedOnly: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Instant Book Available</span>
            <Switch
              checked={filters.instantBook}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, instantBook: checked })
              }
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Preferences */}
      <div className="space-y-3">
        <Label>Ride Preferences</Label>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">No Smoking</span>
            <Switch
              checked={filters.preferences.noSmoking}
              onCheckedChange={(checked) => 
                onFiltersChange({ 
                  ...filters, 
                  preferences: { ...filters.preferences, noSmoking: checked }
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Pets Allowed</span>
            <Switch
              checked={filters.preferences.petsAllowed}
              onCheckedChange={(checked) => 
                onFiltersChange({ 
                  ...filters, 
                  preferences: { ...filters.preferences, petsAllowed: checked }
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Music OK</span>
            <Switch
              checked={filters.preferences.musicOk}
              onCheckedChange={(checked) => 
                onFiltersChange({ 
                  ...filters, 
                  preferences: { ...filters.preferences, musicOk: checked }
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Quiet Ride</span>
            <Switch
              checked={filters.preferences.quietRide}
              onCheckedChange={(checked) => 
                onFiltersChange({ 
                  ...filters, 
                  preferences: { ...filters.preferences, quietRide: checked }
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
