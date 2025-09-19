import { useState, useEffect, useRef } from 'react';
import { authService, type AuthUser, type UserProfile } from '../services/authService';

export interface UseAuthReturn {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: string | null }>;
  isEmailVerified: boolean;
  resendEmailVerification: () => Promise<{ error: string | null }>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // Başlangıçta true, tüm yükleme bitene kadar
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const isInitialAuthCheckComplete = useRef(false); // İlk kimlik doğrulama ve profil kontrolünün tamamlandığını işaretler

  useEffect(() => {
    console.log('useAuth: useEffect started for auth state changes.');
    const unsubscribe = authService.onAuthStateChange(async (authUserFromService) => {
      console.log('useAuth: onAuthStateChange fired. authUserFromService:', authUserFromService ? authUserFromService.email : 'null');
      
      setUser(authUserFromService);
      
      if (authUserFromService) {
        console.log('useAuth: Authenticated user found. Fetching user profile for:', authUserFromService.id);
        try {
          const userProfile = await authService.getUserProfile(authUserFromService.id);
          setProfile(userProfile);
          console.log('useAuth: Profile fetched:', userProfile ? userProfile.name : 'null');
          const emailVerified = authService.checkEmailVerification();
          setIsEmailVerified(emailVerified);
          console.log('useAuth: Email verified:', emailVerified);
        } catch (error) {
          console.error('useAuth: Error fetching user profile:', error);
          setProfile(null); // Profil yüklenirken hata oluşursa null olarak ayarla
          setIsEmailVerified(false);
        } finally {
          // Profil yükleme denemesi bittiğinde loading'i false yap
          if (!isInitialAuthCheckComplete.current) {
            console.log('useAuth: Initial auth/profile check complete. Setting loading to false.');
            setLoading(false);
            isInitialAuthCheckComplete.current = true;
          }
        }
      } else {
        console.log('useAuth: No authenticated user. Clearing profile and setting loading to false.');
        setProfile(null);
        setIsEmailVerified(false);
        // Kullanıcı yoksa hemen loading'i false yap
        if (!isInitialAuthCheckComplete.current) {
          setLoading(false);
          isInitialAuthCheckComplete.current = true;
        }
      }
    });

    // Güvenlik zaman aşımı: Eğer 5 saniye içinde auth durumu çözümlenmezse loading'i false yap
    const timeoutId = setTimeout(() => {
      if (!isInitialAuthCheckComplete.current) {
        console.warn('useAuth: Auth state did not resolve within 5 seconds. Forcing loading to false.');
        setLoading(false);
        isInitialAuthCheckComplete.current = true;
      }
    }, 5000); // 5 saniye

    return () => {
      console.log('useAuth: useEffect cleanup.');
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  // Log current loading and user/profile status for debugging
  useEffect(() => {
    console.log(`useAuth: Current state - loading: ${loading}, user: ${user ? user.email : 'null'}, profile: ${profile ? profile.name : 'null'}`);
  }, [loading, user, profile]);

  // Helper to set loading state for auth actions
  const setAuthActionLoading = () => {
    setLoading(true);
    console.log('useAuth: Auth action started. Setting loading to true.');
  };

  const signUp = async (email: string, password: string, name: string) => {
    setAuthActionLoading();
    try {
      const result = await authService.signUpWithEmail(email, password, name);
      return { error: result.error };
    } finally {
      // onAuthStateChange will handle setLoading(false)
    }
  };

  const signIn = async (email: string, password: string) => {
    setAuthActionLoading();
    try {
      const result = await authService.signInWithEmail(email, password);
      return { error: result.error };
    } finally {
      // onAuthStateChange will handle setLoading(false)
    }
  };

  const signInWithGoogle = async () => {
    setAuthActionLoading();
    try {
      const result = await authService.signInWithGoogle();
      return { error: result.error };
    } finally {
      // onAuthStateChange will handle setLoading(false)
    }
  };

  const signOut = async () => {
    setAuthActionLoading();
    try {
      const result = await authService.signOut();
      if (!result.error) {
        setUser(null);
        setProfile(null);
        setIsEmailVerified(false);
        setLoading(false); // Çıkışta loading'i hemen false yap
        console.log('useAuth: Sign out successful. Setting loading to false.');
      }
      return result;
    } finally {
      // onAuthStateChange will handle setLoading(false) if signOut fails
    }
  };

  const resetPassword = async (email: string) => {
    return await authService.resetPassword(email);
  };

  const updatePassword = async (newPassword: string) => {
    setAuthActionLoading();
    try {
      const result = await authService.updatePassword(newPassword);
      return { error: result.error };
    } finally {
      // onAuthStateChange will handle setLoading(false)
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { error: 'Kullanıcı oturumu bulunamadı' };
    }
    setAuthActionLoading(); // Sets loading to true
    try {
      const result = await authService.updateUserProfile(user.id, updates);
      
      if (!result.error && profile) {
        setProfile({ ...profile, ...updates }); // Updates local profile state
      }
      
      return result;
    } finally {
      setLoading(false); // Explicitly set loading to false after profile update attempt
      console.log('useAuth: updateProfile finished. Setting loading to false.');
    }
  };

  const resendEmailVerification = async () => {
    return await authService.resendEmailVerification();
  };

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    isEmailVerified,
    resendEmailVerification
  };
}