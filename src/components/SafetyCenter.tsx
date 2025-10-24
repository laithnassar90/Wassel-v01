import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  Shield, 
  AlertTriangle, 
  Phone, 
  Users, 
  Share2, 
  MapPin,
  PhoneCall,
  MessageSquare,
  CheckCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export function SafetyCenter() {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Sarah Ahmed',
      phone: '+971 50 123 4567',
      relationship: 'Sister'
    },
    {
      id: '2',
      name: 'Mohammed Ali',
      phone: '+971 55 987 6543',
      relationship: 'Brother'
    }
  ]);

  const [settings, setSettings] = useState({
    autoShareLocation: true,
    emergencyAlerts: true,
    nightModeAlert: true,
    tripSharing: true
  });

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact
    };

    setEmergencyContacts([...emergencyContacts, contact]);
    setNewContact({ name: '', phone: '', relationship: '' });
    toast.success('Emergency contact added');
  };

  const handleRemoveContact = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter(c => c.id !== id));
    toast.success('Contact removed');
  };

  const handleSOS = () => {
    // In a real app, this would trigger emergency protocols
    toast.error('Emergency SOS activated! Alerting your emergency contacts and sharing your location.', {
      duration: 5000
    });
    
    // Simulate sending alerts
    console.log('Sending SOS to:', emergencyContacts);
    console.log('Sharing location:', { lat: 25.2048, lng: 55.2708 }); // Dubai coords
  };

  const handleShareTrip = () => {
    const shareLink = `https://wassel.app/track/trip-${Date.now()}`;
    navigator.clipboard.writeText(shareLink);
    toast.success('Trip link copied! Share it with trusted contacts.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shield className="size-8 text-primary" />
        <div>
          <h1>Safety Center</h1>
          <p className="text-muted-foreground">Manage your safety features and emergency contacts</p>
        </div>
      </div>

      {/* Emergency SOS */}
      <Card className="p-6 border-destructive bg-destructive/5">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="size-6 text-destructive" />
              <h3 className="text-destructive">Emergency SOS</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              In case of emergency, press this button to immediately alert your emergency contacts and share your live location.
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground w-full md:w-auto"
            onClick={handleSOS}
          >
            <AlertTriangle className="size-5 mr-2" />
            Activate SOS
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={handleShareTrip}>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Share2 className="size-6 text-primary" />
            </div>
            <h4>Share Trip</h4>
            <p className="text-sm text-muted-foreground">Share your live trip with trusted contacts</p>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="size-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <PhoneCall className="size-6 text-secondary" />
            </div>
            <h4>Emergency Call</h4>
            <p className="text-sm text-muted-foreground">Quick dial emergency services</p>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center">
              <MessageSquare className="size-6 text-accent" />
            </div>
            <h4>Safety Tips</h4>
            <p className="text-sm text-muted-foreground">View safety guidelines and tips</p>
          </div>
        </Card>
      </div>

      {/* Emergency Contacts */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="size-5 text-primary" />
          <h3>Emergency Contacts</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          These contacts will be notified in case of emergency
        </p>

        <div className="space-y-3 mb-4">
          {emergencyContacts.map(contact => (
            <div key={contact.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="size-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {contact.relationship}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveContact(contact.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          <h4>Add New Contact</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                placeholder="Contact name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone *</Label>
              <Input
                placeholder="+971 50 123 4567"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Relationship</Label>
              <Input
                placeholder="e.g., Family, Friend"
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleAddContact}>
            <Plus className="size-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </Card>

      {/* Safety Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="size-5 text-primary" />
          <h3>Safety Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Auto Share Location</p>
              <p className="text-sm text-muted-foreground">
                Automatically share your location when trip starts
              </p>
            </div>
            <Switch
              checked={settings.autoShareLocation}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, autoShareLocation: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Emergency Alerts</p>
              <p className="text-sm text-muted-foreground">
                Receive alerts for unusual trip patterns
              </p>
            </div>
            <Switch
              checked={settings.emergencyAlerts}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, emergencyAlerts: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Night Mode Alert</p>
              <p className="text-sm text-muted-foreground">
                Extra safety checks for late-night trips
              </p>
            </div>
            <Switch
              checked={settings.nightModeAlert}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, nightModeAlert: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Trip Sharing Enabled</p>
              <p className="text-sm text-muted-foreground">
                Allow sharing trip details with others
              </p>
            </div>
            <Switch
              checked={settings.tripSharing}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, tripSharing: checked })
              }
            />
          </div>
        </div>
      </Card>

      {/* Emergency Services */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <PhoneCall className="size-5 text-primary" />
          <h3>Emergency Services</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start">
            <Phone className="size-4 mr-2" />
            Police: 999
          </Button>
          <Button variant="outline" className="justify-start">
            <Phone className="size-4 mr-2" />
            Ambulance: 998
          </Button>
          <Button variant="outline" className="justify-start">
            <Phone className="size-4 mr-2" />
            Fire: 997
          </Button>
          <Button variant="outline" className="justify-start">
            <Phone className="size-4 mr-2" />
            Wassel Support: 800-WASSEL
          </Button>
        </div>
      </Card>

      {/* Safety Tips */}
      <Card className="p-6 bg-muted/50">
        <h3 className="mb-3">Safety Tips</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle className="size-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Always verify driver/passenger details before starting the trip</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="size-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Share your trip details with family or friends</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="size-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Sit in the back seat and wear your seatbelt</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="size-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Trust your instincts - if something feels wrong, speak up</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="size-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Keep your phone charged and accessible during trips</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
