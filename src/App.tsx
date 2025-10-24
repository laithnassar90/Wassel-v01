import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPage";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { FindRide } from "./components/FindRide";
import { OfferRide } from "./components/OfferRide";
import { MyTrips } from "./components/MyTrips";
import { Messages } from "./components/Messages";
import { Payments } from "./components/Payments";
import { Settings } from "./components/Settings";
import { UserProfile } from "./components/UserProfile";
import { NotificationCenter } from "./components/NotificationCenter";
import { SafetyCenter } from "./components/SafetyCenter";
import { TripAnalytics } from "./components/TripAnalytics";
import { RecurringTrips } from "./components/RecurringTrips";
import { VerificationCenter } from "./components/VerificationCenter";
import { Toaster } from "./components/Toaster"; // ✅ fixed import
import { AuthProvider, useAuth } from "./contexts/AuthContext";

type AppFlow = "landing" | "auth" | "app";

function AppContent() {
  const { user, loading, isBackendConnected } = useAuth();
  const [appFlow, setAppFlow] = useState<AppFlow>("landing");
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Show backend status banner (only in development)
  useEffect(() => {
    const isDev = typeof import.meta !== "undefined" && import.meta.env?.DEV;
    if (!loading && isDev) {
      if (isBackendConnected) {
        console.info(
          "%c✅ Supabase Connected",
          "color: #10b981; font-size: 14px; font-weight: bold",
          "\n🚀 Real backend active. Authentication and data persistence enabled."
        );
      } else {
        console.info(
          "%c✨ Demo Mode Active",
          "color: #008080; font-size: 12px; font-weight: bold",
          "\n📝 Using mock data. To enable real backend, see /GET_STARTED.md"
        );
      }
    }
  }, [loading, isBackendConnected]);

  // Auto-navigate based on auth state
  useEffect(() => {
    if (!loading) {
      if (user) {
        setAppFlow("app");
      } else if (appFlow === "app") {
        setAppFlow("landing");
      }
    }
  }, [user, loading, appFlow]);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      case "find-ride":
        return <FindRide />;
      case "offer-ride":
        return <OfferRide />;
      case "my-trips":
        return <MyTrips />;
      case "messages":
        return <Messages />;
      case "payments":
        return <Payments />;
      case "settings":
        return <Settings />;
      case "profile":
        return <UserProfile />;
      case "notifications":
        return <NotificationCenter />;
      case "safety":
        return <SafetyCenter />;
      case "analytics":
        return <TripAnalytics />;
      case "recurring":
        return <RecurringTrips />;
      case "verification":
        return <VerificationCenter />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  // Landing Page Flow
  if (appFlow === "landing") {
    return (
      <LandingPage
        onGetStarted={() => {
          setAuthMode("signup");
          setAppFlow("auth");
        }}
        onLogin={() => {
          setAuthMode("login");
          setAppFlow("auth");
        }}
      />
    );
  }

  // Authentication Flow
  if (appFlow === "auth") {
    return (
      <AuthPage
        initialTab={authMode}
        onSuccess={() => setAppFlow("app")}
        onBack={() => setAppFlow("landing")}
      />
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="size-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Wassel...</p>
        </div>
      </div>
    );
  }

  // Main Application
  return (
    <>
      <div className="size-full flex bg-gray-50">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onMenuClick={() => setIsSidebarOpen(true)}
            onNavigate={setCurrentPage}
          />
          <main className="flex-1 overflow-auto p-6 lg:p-8">
            {renderPage()}
          </main>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { FindRide } from './components/FindRide';
import { OfferRide } from './components/OfferRide';
import { MyTrips } from './components/MyTrips';
import { Messages } from './components/Messages';
import { Payments } from './components/Payments';
import { Settings } from './components/Settings';
import { UserProfile } from './components/UserProfile';
import { NotificationCenter } from './components/NotificationCenter';
import { SafetyCenter } from './components/SafetyCenter';
import { TripAnalytics } from './components/TripAnalytics';
import { RecurringTrips } from './components/RecurringTrips';
import { VerificationCenter } from './components/VerificationCenter';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type AppFlow = 'landing' | 'auth' | 'app';

function AppContent() {
  const { user, loading, isBackendConnected } = useAuth();
  const [appFlow, setAppFlow] = useState<AppFlow>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Show backend status banner (only in development)
  useEffect(() => {
    const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
    if (!loading && isDev) {
      if (isBackendConnected) {
        console.info(
          '%c✅ Supabase Connected',
          'color: #10b981; font-size: 14px; font-weight: bold',
          '\n🚀 Real backend active. Authentication and data persistence enabled.'
        );
      } else {
        console.info(
          '%c✨ Demo Mode Active',
          'color: #008080; font-size: 12px; font-weight: bold',
          '\n📝 Using mock data. To enable real backend, see /GET_STARTED.md'
        );
      }
    }
  }, [loading, isBackendConnected]);

  // Auto-navigate based on auth state
  useEffect(() => {
    if (!loading) {
      if (user) {
        setAppFlow('app');
      } else if (appFlow === 'app') {
        setAppFlow('landing');
      }
    }
  }, [user, loading, appFlow]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'find-ride':
        return <FindRide />;
      case 'offer-ride':
        return <OfferRide />;
      case 'my-trips':
        return <MyTrips />;
      case 'messages':
        return <Messages />;
      case 'payments':
        return <Payments />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <UserProfile />;
      case 'notifications':
        return <NotificationCenter />;
      case 'safety':
        return <SafetyCenter />;
      case 'analytics':
        return <TripAnalytics />;
      case 'recurring':
        return <RecurringTrips />;
      case 'verification':
        return <VerificationCenter />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  // Landing Page Flow
  if (appFlow === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => {
          setAuthMode('signup');
          setAppFlow('auth');
        }}
        onLogin={() => {
          setAuthMode('login');
          setAppFlow('auth');
        }}
      />
    );
  }

  // Authentication Flow
  if (appFlow === 'auth') {
    return (
      <AuthPage
        initialTab={authMode}
        onSuccess={() => setAppFlow('app')}
        onBack={() => setAppFlow('landing')}
      />
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="size-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Wassel...</p>
        </div>
      </div>
    );
  }

  // Main Application
  return (
    <>
      <div className="size-full flex bg-gray-50">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuClick={() => setIsSidebarOpen(true)} onNavigate={setCurrentPage} />
          <main className="flex-1 overflow-auto p-6 lg:p-8">
            {renderPage()}
          </main>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
