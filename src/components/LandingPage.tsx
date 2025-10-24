import { ArrowRight, Users, Shield, DollarSign, Leaf, Star, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Logo } from './Logo';
import wasselLogo from 'figma:asset/1ccf434105a811706fd618a3b652ae052ecf47e1.png';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onLogin}>
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={onGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
              Next-Generation Ride Sharing
            </div>
            <h1 className="text-5xl md:text-6xl leading-tight">
              Share Your Journey Across the Middle East
            </h1>
            <p className="text-xl text-gray-600">
              Connect with travelers, save money, and reduce your carbon footprint with Wassel's smart carpooling platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg h-14"
                onClick={onGetStarted}
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg h-14 border-primary text-primary hover:bg-primary/5"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl text-primary">50K+</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div>
                <p className="text-3xl text-primary">200K+</p>
                <p className="text-sm text-gray-600">Trips Completed</p>
              </div>
              <div>
                <p className="text-3xl text-primary">4.8★</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/80 to-primary rounded-3xl p-12 shadow-2xl flex items-center justify-center">
              <img src={wasselLogo} alt="Wassel Platform" className="w-64 h-auto" />
            </div>
            <div className="mt-6 text-center">
              <p className="text-xl text-gray-700">Connecting Travelers</p>
              <p className="text-lg text-gray-600">Across the Middle East</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Why Choose Wassel?</h2>
            <p className="text-xl text-gray-600">Built on values of convenience, trust, and affordability</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-2">Affordable Travel</h3>
                <p className="text-gray-600">Share costs and save up to 70% on your journey</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="mb-2">Smart Matching</h3>
                <p className="text-gray-600">AI-powered system finds the perfect ride for you</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="mb-2">Trust & Safety</h3>
                <p className="text-gray-600">Verified users and transparent ratings</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="mb-2">Eco-Friendly</h3>
                <p className="text-gray-600">Reduce emissions and help the environment</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Start your journey in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 text-xl">
                  1
                </div>
                <h3 className="mb-3">Create Your Profile</h3>
                <p className="text-gray-600">Sign up and verify your identity for a safe community</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 text-xl">
                  2
                </div>
                <h3 className="mb-3">Find or Offer a Ride</h3>
                <p className="text-gray-600">Search for available rides or share your own journey</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 text-xl">
                  3
                </div>
                <h3 className="mb-3">Travel Together</h3>
                <p className="text-gray-600">Connect, share costs, and enjoy your journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Flexible Trip Options</h2>
            <p className="text-xl text-gray-600">Choose the journey that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow border-2 border-primary/30 hover:border-primary/60">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4 text-primary">→</div>
                  <h2 className="mb-2 text-primary">Wasel (واصل)</h2>
                  <p className="text-gray-600 mb-4">One-way trips for single destinations</p>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>✓ Perfect for one-time travel</li>
                    <li>✓ Flexible scheduling</li>
                    <li>✓ Lower commitment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 border-secondary/30 hover:border-secondary/60">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4 text-secondary">↔</div>
                  <h2 className="mb-2 text-secondary">Raje3 (راجع)</h2>
                  <p className="text-gray-600 mb-4">Smart return trips with better value</p>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>✓ Round-trip convenience</li>
                    <li>✓ Cost-effective pricing</li>
                    <li>✓ Same driver comfort</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">What Our Community Says</h2>
            <p className="text-xl text-primary-foreground/80">Join thousands of satisfied travelers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white mb-4">"{testimonial.quote}"</p>
                  <p className="text-primary-foreground/90">{testimonial.author}</p>
                  <p className="text-sm text-primary-foreground/70">{testimonial.route}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/90 to-accent text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-accent-foreground/90 mb-8">
            Join Wassel today and experience smarter, more affordable travel
          </p>
          <Button 
            size="lg" 
            className="bg-white text-accent hover:bg-gray-100 text-lg h-14"
            onClick={onGetStarted}
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo size="sm" className="mb-4 [&_h3]:text-white [&_p]:text-gray-200" />
              <p className="text-sm">Connecting travelers across the Middle East</p>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>&copy; 2025 Wassel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const testimonials = [
  {
    quote: "Wassel saved me over 60% on my weekly commute from Dubai to Abu Dhabi. The drivers are professional and friendly!",
    author: "Ahmed K.",
    route: "Dubai → Abu Dhabi"
  },
  {
    quote: "I love the Raje3 feature! It makes planning return trips so much easier and more affordable.",
    author: "Sarah M.",
    route: "Riyadh → Jeddah"
  },
  {
    quote: "Safe, reliable, and eco-friendly. Wassel is exactly what the Middle East needed for modern travel.",
    author: "Omar A.",
    route: "Cairo → Alexandria"
  }
];
