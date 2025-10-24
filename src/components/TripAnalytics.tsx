import { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Leaf, 
  Car, 
  User,
  Download,
  Calendar,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { analyticsService } from '../services/analyticsService';

export function TripAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');

  // Get trip history and calculate analytics
  const tripHistory = useMemo(() => analyticsService.getMockTripHistory(), []);
  const analytics = useMemo(() => analyticsService.calculateAnalytics(tripHistory), [tripHistory]);

  const handleDownloadReport = () => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const report = analyticsService.generateExpenseReport(tripHistory, startDate, new Date());
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wassel-expense-report.txt';
    a.click();
  };

  const COLORS = ['#008080', '#607D4B', '#880044', '#00a6a6'];

  const timeBreakdownData = [
    { name: 'Morning', value: analytics.categoryBreakdown.byTime.morning, fill: COLORS[0] },
    { name: 'Afternoon', value: analytics.categoryBreakdown.byTime.afternoon, fill: COLORS[1] },
    { name: 'Evening', value: analytics.categoryBreakdown.byTime.evening, fill: COLORS[2] },
    { name: 'Night', value: analytics.categoryBreakdown.byTime.night, fill: COLORS[3] }
  ];

  const typeBreakdownData = [
    { name: 'Wasel', value: analytics.categoryBreakdown.wasel, fill: COLORS[0] },
    { name: 'Raje3', value: analytics.categoryBreakdown.raje3, fill: COLORS[1] }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Trip Analytics</h1>
          <p className="text-muted-foreground">Track your riding patterns and expenses</p>
        </div>
        <Button onClick={handleDownloadReport}>
          <Download className="size-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="size-5 text-primary" />
            </div>
            <Badge variant="outline" className="gap-1">
              <ArrowUpRight className="size-3" />
              12%
            </Badge>
          </div>
          <div className="text-2xl font-semibold">{analytics.totalTrips}</div>
          <p className="text-sm text-muted-foreground">Total Trips</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="size-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <MapPin className="size-5 text-secondary" />
            </div>
            <Badge variant="outline" className="gap-1">
              <ArrowUpRight className="size-3" />
              8%
            </Badge>
          </div>
          <div className="text-2xl font-semibold">{analytics.totalDistance} km</div>
          <p className="text-sm text-muted-foreground">Distance Traveled</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="size-10 rounded-full bg-accent/10 flex items-center justify-center">
              <DollarSign className="size-5 text-accent" />
            </div>
            <Badge variant="outline" className="gap-1 text-green-600">
              <ArrowDownRight className="size-3" />
              5%
            </Badge>
          </div>
          <div className="text-2xl font-semibold">{analytics.totalSpent} AED</div>
          <p className="text-sm text-muted-foreground">Total Spent</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
              <Leaf className="size-5 text-green-600" />
            </div>
            <Badge variant="outline" className="gap-1 text-green-600">
              <ArrowUpRight className="size-3" />
              15%
            </Badge>
          </div>
          <div className="text-2xl font-semibold">{analytics.carbonSaved} kg</div>
          <p className="text-sm text-muted-foreground">CO₂ Saved</p>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Car className="size-5 text-primary" />
            <span className="text-sm text-muted-foreground">As Driver</span>
          </div>
          <div className="text-xl font-semibold">{analytics.totalDrives} trips</div>
          <p className="text-sm text-muted-foreground mt-1">
            Earned: <span className="font-semibold text-green-600">{analytics.totalEarned} AED</span>
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="size-5 text-secondary" />
            <span className="text-sm text-muted-foreground">As Passenger</span>
          </div>
          <div className="text-xl font-semibold">{analytics.totalRides} trips</div>
          <p className="text-sm text-muted-foreground mt-1">
            Spent: <span className="font-semibold text-accent">{analytics.totalSpent} AED</span>
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Star className="size-5 text-amber-500" />
            <span className="text-sm text-muted-foreground">Average Rating</span>
          </div>
          <div className="text-xl font-semibold">{analytics.averageRating} / 5.0</div>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Star 
                key={i} 
                className={`size-4 ${i <= Math.round(analytics.averageRating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="routes">Top Routes</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Monthly Activity</h3>
              <div className="flex gap-2">
                <Button 
                  variant={timeRange === 'month' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setTimeRange('month')}
                >
                  Month
                </Button>
                <Button 
                  variant={timeRange === 'quarter' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setTimeRange('quarter')}
                >
                  Quarter
                </Button>
                <Button 
                  variant={timeRange === 'year' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setTimeRange('year')}
                >
                  Year
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="trips" fill="#008080" name="Trips" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="mb-4">Spending & Earnings</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={analytics.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="spent" stroke="#880044" name="Spent (AED)" />
                  <Line type="monotone" dataKey="earned" stroke="#607D4B" name="Earned (AED)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Distance Traveled</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={analytics.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="distance" stroke="#008080" name="Distance (km)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="mb-4">Trips by Time of Day</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={timeBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {timeBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Trip Types</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Top Routes Tab */}
        <TabsContent value="routes">
          <Card className="p-6">
            <h3 className="mb-4">Most Frequent Routes</h3>
            <div className="space-y-3">
              {analytics.topRoutes.map((route, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{route.route}</p>
                    <p className="text-sm text-muted-foreground">
                      {route.count} trips · Avg {route.avgPrice} AED
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    Last: {route.lastUsed.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Breakdown Tab */}
        <TabsContent value="breakdown">
          <Card className="p-6">
            <h3 className="mb-4">Detailed Breakdown</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Net Balance</p>
                  <p className="text-2xl font-semibold text-green-600">
                    +{analytics.totalEarned - analytics.totalSpent} AED
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Earned {analytics.totalEarned} AED · Spent {analytics.totalSpent} AED
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Average per Trip</p>
                  <p className="text-2xl font-semibold">
                    {Math.round((analytics.totalSpent + analytics.totalEarned) / analytics.totalTrips)} AED
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 mb-1">Environmental Impact</p>
                  <p className="text-2xl font-semibold text-green-700">
                    {analytics.carbonSaved} kg CO₂
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Equivalent to planting {Math.round(analytics.carbonSaved / 20)} trees
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">Trip Distribution</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>As Driver</span>
                      <span className="font-semibold">
                        {Math.round((analytics.totalDrives / analytics.totalTrips) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>As Passenger</span>
                      <span className="font-semibold">
                        {Math.round((analytics.totalRides / analytics.totalTrips) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">Type Distribution</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Wasel (One-way)</span>
                      <span className="font-semibold">
                        {Math.round((analytics.categoryBreakdown.wasel / analytics.totalTrips) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Raje3 (Return)</span>
                      <span className="font-semibold">
                        {Math.round((analytics.categoryBreakdown.raje3 / analytics.totalTrips) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
