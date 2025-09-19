import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth'; // Firebase kimlik doğrulama hook'unu etkinleştiriyoruz
import OnboardingPage from './components/pages/OnboardingPage';
import AuthPage from './components/pages/AuthPage';
import ProfileSetupPage from './components/pages/ProfileSetupPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import WelcomePage from './components/pages/WelcomePage';
import OptimizationScreen from './components/ui/OptimizationScreen';
import ChatPage from './components/pages/ChatPage';
import ProfilePage from './components/pages/ProfilePage';
import EditProfilePage from './components/pages/EditProfilePage';
import PrivacySettingsPage from './components/pages/PrivacySettingsPage';
import NotificationSettingsPage from './components/pages/NotificationSettingsPage';
import HelpSupportPage from './components/pages/HelpSupportPage';
import LanguageSettingsPage from './components/pages/LanguageSettingsPage';
import AboutPage from './components/pages/AboutPage';
import PremiumAdPage from './components/pages/PremiumAdPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Chat, Purpose, User } from './types';

type AppState = 
  | 'onboarding'
  | 'auth' 
  | 'profile-setup' 
  | 'premium-ad'
  | 'reset-password'
  | 'home' 
  | 'optimizing' 
  | 'chat' 
  | 'profile'
  | 'edit-profile'
  | 'privacy-settings'
  | 'notification-settings'
  | 'help-support'
  | 'language-settings'
  | 'about';

function App() {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [hasSeenOnboarding, setHasSeenOnboarding] = useLocalStorage<boolean>('hasSeenOnboarding', false);
  const [pastChats, setPastChats] = useLocalStorage<Chat[]>('pastChats', []);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [pendingChat, setPendingChat] = useState<{ country: string; purpose: Purpose } | null>(null);
  
  // Firebase authentication
  const { user: authUser, profile, loading, signUp, signIn, signInWithGoogle, signOut, updateProfile, resetPassword, updatePassword } = useAuth();
  
  // Temporary mock authentication for demo - KALDIRILDI
  // const [authUser, setAuthUser] = useState<any>(null);
  // const [profile, setProfile] = useState<any>(null);
  // const [loading, setLoading] = useState(false);
  
  // const signUp = async (email: string, password: string, name: string) => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     const mockUser = { id: '1', email, name };
  //     setAuthUser(mockUser);
  //     setLoading(false);
  //   }, 1000);
  //   return { error: null };
  // };
  
  // const signIn = async (email: string, password: string) => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     const mockUser = { id: '1', email, name: 'Demo User' };
  //     setAuthUser(mockUser);
  //     setLoading(false);
  //   }, 1000);
  //   return { error: null };
  // };
  
  // const signInWithGoogle = async () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     const mockUser = { id: '1', email: 'demo@gmail.com', name: 'Google User' };
  //     setAuthUser(mockUser);
  //     setLoading(false);
  //   }, 1000);
  //   return { error: null };
  // };
  
  // const signOut = async () => {
  //   setAuthUser(null);
  //   setProfile(null);
  //   return { error: null };
  // };
  
  // const updateProfile = async (updates: any) => {
  //   setProfile(prev => ({ ...prev, ...updates }));
  //   return { error: null };
  // };

  // Check authentication status on app load
  useEffect(() => {
    // First check if user has seen onboarding
    if (!hasSeenOnboarding) {
      setAppState('onboarding');
      return;
    }

    if (authUser) {
      if (!profile?.isProfileComplete) {
        setAppState('profile-setup');
      } else {
        setAppState('home');
      }
    } else {
      setAppState('auth');
    }
  }, [authUser, profile, hasSeenOnboarding]);

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
    if (authUser) {
      if (!profile?.isProfileComplete) {
        setAppState('profile-setup');
      } else {
        setAppState('home');
      }
    } else {
      setAppState('auth');
    }
  };
  
  const handleAuthSuccess = async () => {
    // Auth success is handled by useAuth hook
    // State will be updated automatically
  };

  const handleResetPassword = (newPassword: string, confirmPassword: string) => {
    // Password reset is handled in ResetPasswordPage
    setAppState('auth');
  };

  const handleProfileSetupComplete = async (profileData: any) => {
    if (authUser) {
      const result = await updateProfile({
        ...profileData,
        isProfileComplete: true
      });
      
      if (!result.error) {
        setAppState('premium-ad');
      } else {
        alert('Profil güncellenirken hata oluştu: ' + result.error);
      }
    }
  };

  const handleStartChat = (country: string, purpose: Purpose) => {
    setPendingChat({ country, purpose });
    setAppState('optimizing');
  };

  const handleOptimizationComplete = () => {
    if (pendingChat) {
      const newChat: Chat = {
        id: Date.now().toString(),
        country: pendingChat.country,
        purpose: pendingChat.purpose,
        date: new Date().toLocaleString(),
        messages: []
      };
      
      // Add to localStorage
      setPastChats(prev => [newChat, ...prev]);
      
      setCurrentChat(newChat);
      setPendingChat(null);
      setAppState('chat');
    }
  };

  const handleOpenChat = (chat: Chat) => {
    setCurrentChat(chat);
    setAppState('chat');
  };

  const handleBackToHome = () => {
    setCurrentChat(null);
    setAppState('home');
  };

  const handleUpdateChat = (updatedChat: Chat) => {
    setCurrentChat(updatedChat);
  };

  const handleOpenProfile = () => {
    setAppState('profile');
  };

  const handleEditProfile = () => {
    setAppState('edit-profile');
  };

  const handlePrivacySettings = () => {
    setAppState('privacy-settings');
  };

  const handleNotificationSettings = () => {
    setAppState('notification-settings');
  };

  const handleHelpSupport = () => {
    setAppState('help-support');
  };

  const handleLanguageSettings = () => {
    setAppState('language-settings');
  };

  const handleAbout = () => {
    setAppState('about');
  };

  const handleUpdateProfile = async (updatedData: any) => {
    if (authUser) {
      const result = await updateProfile(updatedData);
      if (!result.error) {
        setAppState('profile');
      } else {
        alert('Profil güncellenirken hata oluştu: ' + result.error);
      }
    }
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentChat(null);
    setPendingChat(null);
  };

  const handleBackToProfile = () => {
    setAppState('profile');
  };

  const handleBackToAuth = () => {
    setAppState('auth');
  };

  const handlePremiumAdContinue = () => {
    // Premium subscription logic would go here
    setAppState('home');
  };

  const handlePremiumAdSkip = () => {
    setAppState('home');
  };

  // Convert profile to User type for compatibility
  const user: User | null = profile && authUser ? {
    id: profile.auth_id,
    name: profile.name,
    email: profile.email,
    gender: profile.gender,
    ageRange: profile.ageRange,
    country: profile.country,
    role: profile.role,
    industry: profile.industry,
    isProfileComplete: profile.isProfileComplete
  } : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-slate-500 border-t-blue-500" />
          <span className="text-lg">Yükleniyor...</span>
        </div>
      </div>
    );
  }
  // Render based on current state
  switch (appState) {
    case 'onboarding':
      return (
        <OnboardingPage
          onComplete={handleOnboardingComplete}
        />
      );

    case 'auth':
      return (
        <AuthPage
          signUp={signUp}
          signIn={signIn}
          signInWithGoogle={signInWithGoogle}
          onAuthSuccess={handleAuthSuccess}
          onForgotPassword={() => setAppState('reset-password')} // Şifre sıfırlama sayfasına yönlendirme
        />
      );

    case 'reset-password':
      return (
        <ResetPasswordPage
          onResetPassword={resetPassword} // useAuth'tan gelen resetPassword fonksiyonunu kullan
          onBack={handleBackToAuth}
          updatePassword={updatePassword} // useAuth'tan gelen updatePassword fonksiyonunu kullan
        />
      );

    case 'profile-setup':
      return (
        <ProfileSetupPage
          onComplete={handleProfileSetupComplete}
        />
      );

    case 'premium-ad':
      return (
        <PremiumAdPage
          onContinue={handlePremiumAdContinue}
          onSkip={handlePremiumAdSkip}
        />
      );

    case 'home':
      return (
        <WelcomePage
          user={user}
          onStartChat={handleStartChat}
          onOpenChat={handleOpenChat}
          onOpenProfile={handleOpenProfile}
        />
      );

    case 'optimizing':
      if (!pendingChat) return null;
      return (
        <OptimizationScreen
          country={pendingChat.country}
          purpose={pendingChat.purpose}
          onComplete={handleOptimizationComplete}
        />
      );

    case 'chat':
      if (!currentChat) return null;
      return (
        <ChatPage
          chat={currentChat}
          user={user}
          onBack={handleBackToHome}
          onUpdateChat={handleUpdateChat}
        />
      );

    case 'profile':
      if (!user) return null;
      return (
        <ProfilePage
          user={user}
          onEditProfile={handleEditProfile}
          onChangePassword={() => setAppState('reset-password')}
          onNotificationSettings={handleNotificationSettings}
          onPrivacySettings={handlePrivacySettings}
          onHelpSupport={handleHelpSupport}
          onLanguageSettings={handleLanguageSettings}
          onAbout={handleAbout}
          onLogout={handleLogout}
          onBack={handleBackToHome}
        />
      );

    case 'edit-profile':
      if (!user) return null;
      return (
        <EditProfilePage
          user={user}
          onSave={handleUpdateProfile}
          onBack={handleBackToProfile}
        />
      );

    case 'privacy-settings':
      return (
        <PrivacySettingsPage
          onBack={handleBackToProfile}
        />
      );

    case 'notification-settings':
      return (
        <NotificationSettingsPage
          onBack={handleBackToProfile}
        />
      );

    case 'help-support':
      return (
        <HelpSupportPage
          onBack={handleBackToProfile}
        />
      );

    case 'language-settings':
      return (
        <LanguageSettingsPage
          onBack={handleBackToProfile}
        />
      );

    case 'about':
      return (
        <AboutPage
          onBack={handleBackToProfile}
        />
      );

    default:
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      );
  }
  
}

export default App;