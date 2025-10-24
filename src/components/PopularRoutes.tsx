import { ArrowRight, TrendingUp, Clock, DollarSign, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Route {
  from: string;
  fromAr: string;
  to: string;
  toAr: string;
  price: number;
  currency: string;
  availableRides: number;
  duration: string;
  passengers: number;
  trending?: boolean;
  discount?: number;
}

const popularRoutes: Route[] = [
  {
    from: 'Dubai',
    fromAr: 'دبي',
    to: 'Abu Dhabi',
    toAr: 'أبوظبي',
    price: 45,
    currency: 'AED',
    availableRides: 156,
    duration: '1h 30m',
    passengers: 3200,
    trending: true,
  },
  {
    from: 'Riyadh',
    fromAr: 'الرياض',
    to: 'Jeddah',
    toAr: 'جدة',
    price: 180,
    currency: 'SAR',
    availableRides: 124,
    duration: '8h 45m',
    passengers: 2800,
    trending: true,
    discount: 15,
  },
  {
    from: 'Cairo',
    fromAr: 'القاهرة',
    to: 'Alexandria',
    toAr: 'الإسكندرية',
    price: 95,
    currency: 'EGP',
    availableRides: 203,
    duration: '2h 30m',
    passengers: 4100,
    trending: true,
  },
  {
    from: 'Dubai',
    fromAr: 'دبي',
    to: 'Sharjah',
    toAr: 'الشارقة',
    price: 25,
    currency: 'AED',
    availableRides: 289,
    duration: '35m',
    passengers: 5600,
  },
  {
    from: 'Riyadh',
    fromAr: 'الرياض',
    to: 'Dammam',
    toAr: 'الدمام',
    price: 150,
    currency: 'SAR',
    availableRides: 98,
    duration: '4h 15m',
    passengers: 1900,
  },
  {
    from: 'Amman',
    fromAr: 'عمان',
    to: 'Aqaba',
    toAr: 'العقبة',
    price: 18,
    currency: 'JOD',
    availableRides: 76,
    duration: '4h 00m',
    passengers: 1500,
    discount: 20,
  },
  {
    from: 'Doha',
    fromAr: 'الدوحة',
    to: 'Al Khor',
    toAr: 'الخور',
    price: 35,
    currency: 'QAR',
    availableRides: 112,
    duration: '45m',
    passengers: 2100,
  },
  {
    from: 'Kuwait City',
    fromAr: 'مدينة الكويت',
    to: 'Al Ahmadi',
    toAr: 'الأحمدي',
    price: 8,
    currency: 'KWD',
    availableRides: 145,
    duration: '35m',
    passengers: 2600,
  },
  {
    from: 'Abu Dhabi',
    fromAr: 'أبوظبي',
    to: 'Al Ain',
    toAr: 'العين',
    price: 50,
    currency: 'AED',
    availableRides: 87,
    duration: '1h 45m',
    passengers: 1700,
  },
  {
    from: 'Muscat',
    fromAr: 'مسقط',
    to: 'Salalah',
    toAr: 'صلالة',
    price: 42,
    currency: 'OMR',
    availableRides: 54,
    duration: '10h 30m',
    passengers: 980,
  },
  {
    from: 'Manama',
    fromAr: 'المنامة',
    to: 'Riffa',
    toAr: 'الرفاع',
    price: 4,
    currency: 'BHD',
    availableRides: 167,
    duration: '25m',
    passengers: 3100,
  },
  {
    from: 'Jeddah',
    fromAr: 'جدة',
    to: 'Mecca',
    toAr: 'مكة',
    price: 65,
    currency: 'SAR',
    availableRides: 234,
    duration: '1h 15m',
    passengers: 4800,
  },
];

interface PopularRoutesProps {
  onGetStarted: () => void;
}

export function PopularRoutes({ onGetStarted }: PopularRoutesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-8 h-8 text-primary" />
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Most Popular
            </Badge>
          </div>
          <h2 className="mb-4">Hottest Routes Across the Middle East</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our best-selling routes connecting major cities. Join thousands of travelers saving money and reducing carbon emissions.
          </p>
          <p className="text-lg text-gray-500 mt-2">
            أشهر المسارات عبر الشرق الأوسط
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white border-primary/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl text-primary mb-2">12</div>
              <p className="text-sm text-gray-600">Countries Connected</p>
              <p className="text-xs text-gray-500">دولة متصلة</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-primary/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl text-primary mb-2">150+</div>
              <p className="text-sm text-gray-600">Active Routes Daily</p>
              <p className="text-xs text-gray-500">مسار نشط يومياً</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-primary/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl text-primary mb-2">50K+</div>
              <p className="text-sm text-gray-600">Monthly Travelers</p>
              <p className="text-xs text-gray-500">مسافر شهرياً</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-primary/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl text-primary mb-2">65%</div>
              <p className="text-sm text-gray-600">Average Savings</p>
              <p className="text-xs text-gray-500">متوسط التوفير</p>
            </CardContent>
          </Card>
        </div>

        {/* Popular Routes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {popularRoutes.map((route, index) => (
            <Card 
              key={index}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-gray-200 hover:border-primary/30 bg-white relative overflow-hidden"
            >
              {route.trending && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary/90 text-primary-foreground px-4 py-1 text-xs flex items-center gap-1 rounded-bl-lg">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
              )}
              
              {route.discount && (
                <div className="absolute top-0 left-0 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground px-4 py-1 text-xs rounded-br-lg">
                  {route.discount}% OFF
                </div>
              )}

              <CardContent className="p-6">
                {/* Route Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-gray-900 group-hover:text-primary transition-colors">
                        {route.from}
                      </h3>
                      <p className="text-sm text-gray-500">{route.fromAr}</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-primary mx-3 group-hover:translate-x-1 transition-transform" />
                    <div className="flex-1 text-right">
                      <h3 className="text-gray-900 group-hover:text-primary transition-colors">
                        {route.to}
                      </h3>
                      <p className="text-sm text-gray-500">{route.toAr}</p>
                    </div>
                  </div>
                </div>

                {/* Route Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span>Starting from</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {route.discount && (
                        <span className="text-gray-400 line-through text-xs">
                          {Math.round(route.price / (1 - route.discount / 100))}
                        </span>
                      )}
                      <span className="text-lg text-primary">
                        {route.price} {route.currency}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Duration</span>
                    </div>
                    <span className="text-gray-900">{route.duration}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-primary" />
                      <span>Available rides</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {route.availableRides}
                    </Badge>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    {route.passengers.toLocaleString()}+ travelers this month
                  </p>
                </div>

                {/* Hover CTA */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    onClick={onGetStarted}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="sm"
                  >
                    View Available Rides
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="mb-3 text-gray-900">Can't find your route?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We're adding new routes every day. Join Wassel and be the first to know when your route becomes available, or offer your own ride!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={onGetStarted}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  Browse All Routes
                </Button>
                <Button 
                  onClick={onGetStarted}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                  size="lg"
                >
                  Offer a Ride
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Route Comparison Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h4 className="mb-2">Best Prices Guaranteed</h4>
            <p className="text-sm text-gray-600">
              Compare prices across all routes and save up to 65% compared to traditional transport
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h4 className="mb-2">Real-Time Availability</h4>
            <p className="text-sm text-gray-600">
              Live updates on available rides with instant booking confirmation
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h4 className="mb-2">Verified Community</h4>
            <p className="text-sm text-gray-600">
              Travel with confidence - all drivers and passengers are verified members
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}