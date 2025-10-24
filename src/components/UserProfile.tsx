import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar } from './ui/avatar';
import { 
  User, 
  Star, 
  Shield, 
  Car, 
  MapPin, 
  Calendar, 
  Award,
  Edit,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface UserProfileProps {
  userId?: string;
  isOwnProfile?: boolean;
}

export function UserProfile({ userId, isOwnProfile = true }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const user = {
    id: userId || '1',
    name: 'Ahmed Al-Mansoori',
    nameAr: 'أحمد المنصوري',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    verified: true,
    rating: 4.8,
    totalTrips: 127,
    memberSince: 'March 2024',
    bio: 'Regular commuter between Dubai and Abu Dhabi. Love meeting new people and sharing rides!',
    bioAr: 'أسافر بانتظام بين دبي وأبو ظبي. أحب مقابلة أشخاص جدد ومشاركة الرحلات!',
    badges: [
      { id: 1, name: 'Verified Driver', icon: Shield, color: 'text-primary' },
      { id: 2, name: 'Super Host', icon: Award, color: 'text-accent' },
      { id: 3, name: '100+ Trips', icon: TrendingUp, color: 'text-secondary' },
      { id: 4, name: 'On-Time', icon: Clock, color: 'text-primary' }
    ],
    verifications: {
      phoneVerified: true,
      emailVerified: true,
      licenseVerified: true,
      idVerified: true,
      profileComplete: 95
    },
    preferences: {
      smoking: false,
      music: true,
      pets: true,
      conversation: 'moderate' as const,
      temperature: 'moderate' as const
    },
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'Silver',
      plate: 'D-12345'
    },
    stats: {
      asDriver: 68,
      asPassenger: 59,
      rating: 4.8,
      responseRate: 95,
      acceptanceRate: 88,
      cancellationRate: 2
    },
    reviews: [
      {
        id: 1,
        reviewer: 'Fatima Hassan',
        rating: 5,
        comment: 'Excellent driver! Very punctual and friendly.',
        commentAr: 'سائق ممتاز! دقيق جداً وودود.',
        date: '2 days ago',
        trip: 'Dubai → Abu Dhabi'
      },
      {
        id: 2,
        reviewer: 'Mohammed Ali',
        rating: 4.5,
        comment: 'Great conversation and smooth ride. Highly recommended.',
        commentAr: 'محادثة رائعة ورحلة سلسة. أوصي به بشدة.',
        date: '1 week ago',
        trip: 'Sharjah → Dubai'
      },
      {
        id: 3,
        reviewer: 'Sara Abdullah',
        rating: 5,
        comment: 'Very professional and clean car. Will ride again!',
        commentAr: 'محترف جداً والسيارة نظيفة. سأركب معه مرة أخرى!',
        date: '2 weeks ago',
        trip: 'Dubai Marina → Downtown'
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="relative">
              <Avatar className="size-32">
                <img src={user.photo} alt={user.name} className="object-cover" />
              </Avatar>
              {user.verified && (
                <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-2">
                  <CheckCircle className="size-6" />
                </div>
              )}
            </div>
            {isOwnProfile && (
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                <Edit className="size-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1>{user.name}</h1>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="size-5 fill-current" />
                  <span className="font-semibold">{user.rating}</span>
                  <span className="text-muted-foreground">({user.totalTrips} trips)</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-1">{user.nameAr}</p>
              <p className="text-muted-foreground flex items-center gap-2 mt-2">
                <Calendar className="size-4" />
                Member since {user.memberSince}
              </p>
            </div>

            <p className="text-foreground">{user.bio}</p>
            <p className="text-foreground text-right" dir="rtl">{user.bioAr}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {user.badges.map(badge => (
                <Badge key={badge.id} variant="outline" className="gap-1">
                  <badge.icon className={`size-4 ${badge.color}`} />
                  {badge.name}
                </Badge>
              ))}
            </div>

            {/* Verification Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Profile Completeness</span>
                <span className="text-sm font-semibold">{user.verifications.profileComplete}%</span>
              </div>
              <Progress value={user.verifications.profileComplete} />
              <div className="flex flex-wrap gap-3 mt-2">
                <Badge variant={user.verifications.phoneVerified ? "default" : "outline"} className="gap-1">
                  {user.verifications.phoneVerified && <CheckCircle className="size-3" />}
                  Phone
                </Badge>
                <Badge variant={user.verifications.emailVerified ? "default" : "outline"} className="gap-1">
                  {user.verifications.emailVerified && <CheckCircle className="size-3" />}
                  Email
                </Badge>
                <Badge variant={user.verifications.licenseVerified ? "default" : "outline"} className="gap-1">
                  {user.verifications.licenseVerified && <CheckCircle className="size-3" />}
                  License
                </Badge>
                <Badge variant={user.verifications.idVerified ? "default" : "outline"} className="gap-1">
                  {user.verifications.idVerified && <CheckCircle className="size-3" />}
                  ID
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="mb-4">Trip Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <Car className="size-5" />
                    <span className="text-2xl font-semibold">{user.stats.asDriver}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">As Driver</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-secondary">
                    <User className="size-5" />
                    <span className="text-2xl font-semibold">{user.stats.asPassenger}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">As Passenger</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Reliability</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Response Rate</span>
                    <span className="text-sm font-semibold">{user.stats.responseRate}%</span>
                  </div>
                  <Progress value={user.stats.responseRate} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Acceptance Rate</span>
                    <span className="text-sm font-semibold">{user.stats.acceptanceRate}%</span>
                  </div>
                  <Progress value={user.stats.acceptanceRate} />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    Cancellation Rate: <span className="font-semibold text-foreground">{user.stats.cancellationRate}%</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-4xl font-semibold">{user.rating}</div>
                <div className="flex items-center justify-center gap-1 text-amber-500 mt-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{user.totalTrips} reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-12">{rating} stars</span>
                    <Progress value={rating === 5 ? 75 : rating === 4 ? 20 : 5} className="flex-1" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {user.reviews.map(review => (
                <div key={review.id} className="border-t pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.reviewer}</p>
                      <p className="text-sm text-muted-foreground">{review.trip}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="size-4 fill-current" />
                        <span>{review.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-foreground">{review.comment}</p>
                  <p className="text-foreground text-right mt-1" dir="rtl">{review.commentAr}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Vehicle Tab */}
        <TabsContent value="vehicle">
          <Card className="p-6">
            <h3 className="mb-4">Vehicle Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Car className="size-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Make & Model</p>
                    <p className="font-semibold">{user.vehicle.make} {user.vehicle.model}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="size-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-semibold">{user.vehicle.year}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-5 rounded-full bg-gray-400 border-2 border-foreground"></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-semibold">{user.vehicle.color}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">License Plate</p>
                    <p className="font-semibold">{user.vehicle.plate}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="p-6">
            <h3 className="mb-4">Ride Preferences</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Smoking</span>
                <Badge variant={user.preferences.smoking ? "destructive" : "default"}>
                  {user.preferences.smoking ? 'Allowed' : 'Not Allowed'}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Music</span>
                <Badge variant={user.preferences.music ? "default" : "outline"}>
                  {user.preferences.music ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Pets</span>
                <Badge variant={user.preferences.pets ? "default" : "outline"}>
                  {user.preferences.pets ? 'Allowed' : 'Not Allowed'}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Conversation Level</span>
                <Badge variant="outline">
                  {user.preferences.conversation.charAt(0).toUpperCase() + user.preferences.conversation.slice(1)}
                </Badge>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
