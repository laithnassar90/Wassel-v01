import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Shield, 
  CheckCircle, 
  Upload, 
  Phone, 
  Mail, 
  CreditCard,
  Camera,
  FileText,
  AlertCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

type VerificationStatus = 'not_started' | 'pending' | 'approved' | 'rejected';

interface VerificationItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: any;
  status: VerificationStatus;
  required: boolean;
  rejectionReason?: string;
}

export function VerificationCenter() {
  const [verifications, setVerifications] = useState<VerificationItem[]>([
    {
      id: 'phone',
      name: 'Phone Number',
      nameAr: 'رقم الهاتف',
      description: 'Verify your phone number via SMS',
      descriptionAr: 'تحقق من رقم هاتفك عبر الرسائل القصيرة',
      icon: Phone,
      status: 'approved',
      required: true
    },
    {
      id: 'email',
      name: 'Email Address',
      nameAr: 'البريد الإلكتروني',
      description: 'Verify your email address',
      descriptionAr: 'تحقق من عنوان بريدك الإلكتروني',
      icon: Mail,
      status: 'approved',
      required: true
    },
    {
      id: 'national_id',
      name: 'National ID / Emirates ID',
      nameAr: 'بطاقة الهوية الوطنية / هوية الإمارات',
      description: 'Upload a photo of your government-issued ID',
      descriptionAr: 'قم بتحميل صورة من بطاقة الهوية الحكومية',
      icon: CreditCard,
      status: 'pending',
      required: true
    },
    {
      id: 'drivers_license',
      name: "Driver's License",
      nameAr: 'رخصة القيادة',
      description: 'Required to offer rides as a driver',
      descriptionAr: 'مطلوب لتقديم الرحلات كسائق',
      icon: FileText,
      status: 'not_started',
      required: false
    },
    {
      id: 'selfie',
      name: 'Selfie Verification',
      nameAr: 'التحقق بالصورة الشخصية',
      description: 'Take a selfie to verify your identity',
      descriptionAr: 'التقط صورة شخصية للتحقق من هويتك',
      icon: Camera,
      status: 'rejected',
      required: true,
      rejectionReason: 'Image quality too low. Please retake in good lighting.'
    }
  ]);

  const [uploadProgress, setUploadProgress] = useState(0);

  const completedCount = verifications.filter(v => v.status === 'approved').length;
  const completionPercentage = (completedCount / verifications.length) * 100;

  const handleVerify = (id: string) => {
    const verification = verifications.find(v => v.id === id);
    if (!verification) return;

    if (id === 'phone' || id === 'email') {
      toast.success(`${verification.name} verification sent!`);
    } else {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setVerifications(verifications.map(v => 
              v.id === id ? { ...v, status: 'pending' } : v
            ));
            toast.success('Document uploaded! Verification in progress.');
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600 text-white gap-1"><CheckCircle className="size-3" /> Verified</Badge>;
      case 'pending':
        return <Badge variant="outline" className="gap-1"><Clock className="size-3" /> Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="gap-1"><XCircle className="size-3" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'pending':
        return 'text-amber-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shield className="size-8 text-primary" />
        <div>
          <h1>Verification Center</h1>
          <p className="text-muted-foreground">Complete your profile verification to unlock all features</p>
          <p className="text-muted-foreground text-sm" dir="rtl">أكمل التحقق من ملفك الشخصي لفتح جميع الميزات</p>
        </div>
      </div>

      {/* Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3>Verification Progress</h3>
            <p className="text-sm text-muted-foreground">{completedCount} of {verifications.length} completed</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-primary">{Math.round(completionPercentage)}%</div>
            <p className="text-sm text-muted-foreground">Complete</p>
          </div>
        </div>
        <Progress value={completionPercentage} className="h-3" />
      </Card>

      {/* Verification Items */}
      <div className="space-y-4">
        {verifications.map(v => {
          const Icon = v.icon;
          const statusColor = getStatusColor(v.status);

          return (
            <Card key={v.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className={`size-14 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${statusColor}`}>
                  <Icon className="size-7" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3>{v.name}</h3>
                      {v.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                      {getStatusBadge(v.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{v.description}</p>
                    <p className="text-sm text-muted-foreground" dir="rtl">{v.descriptionAr}</p>
                  </div>

                  {v.status === 'rejected' && v.rejectionReason && (
                    <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <AlertCircle className="size-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-destructive">Verification Rejected</p>
                        <p className="text-sm text-muted-foreground">{v.rejectionReason}</p>
                      </div>
                    </div>
                  )}

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {(v.status === 'not_started' || v.status === 'rejected') && (
                      <Button onClick={() => handleVerify(v.id)}>
                        <Upload className="size-4 mr-2" />
                        {v.status === 'not_started' ? 'Start Verification' : 'Retry Verification'}
                      </Button>
                    )}
                    {v.status === 'pending' && (
                      <Button variant="outline" disabled>
                        <Clock className="size-4 mr-2" />
                        Under Review (1-2 days)
                      </Button>
                    )}
                    {v.status === 'approved' && (
                      <Button variant="outline" disabled>
                        <CheckCircle className="size-4 mr-2" />
                        Verified
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
