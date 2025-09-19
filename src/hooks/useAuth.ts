import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    // İlk yüklemede mevcut kullanıcıyı kontrol et
    const initializeAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          
          // Kullanıcı profilini yükle
          const userProfile = await authService.getUserProfile(currentUser.id);
          setProfile(userProfile);
          
          // E-posta doğrulama durumunu kontrol et
          const emailVerified = authService.checkEmailVerification();
          setIsEmailVerified(emailVerified);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Auth state değişikliklerini dinle
    const unsubscribe = authService.onAuthStateChange(async (authUser) => {
      setUser(authUser);
      
      if (authUser) {
        // Kullanıcı profilini yükle
        const userProfile = await authService.getUserProfile(authUser.id);
        setProfile(userProfile);
        
        // E-posta doğrulama durumunu kontrol et
        const emailVerified = authService.checkEmailVerification();
        setIsEmailVerified(emailVerified);
      } else {
        setProfile(null);
        setIsEmailVerified(false);
      }
      
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const result = await authService.signUpWithEmail(email, password, name);
      return { error: result.error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.signInWithEmail(email, password);
      return { error: result.error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await authService.signInWithGoogle();
      return { error: result.error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const result = await authService.signOut();
      if (!result.error) {
        setUser(null);
        setProfile(null);
        setIsEmailVerified(false);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    return await authService.resetPassword(email);
  };

  const updatePassword = async (newPassword: string) => {
    return await authService.updatePassword(newPassword);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { error: 'Kullanıcı oturumu bulunamadı' };
    }

    const result = await authService.updateUserProfile(user.id, updates);
    
    if (!result.error && profile) {
      // Local state'i güncelle
      setProfile({ ...profile, ...updates });
    }
    
    return result;
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