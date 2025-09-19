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
    const unsubscribe = authService.onAuthStateChange(async (authUser) => {
      setLoading(true); // Auth state değiştiğinde veya ilk yüklendiğinde yükleniyor olarak işaretle
      setUser(authUser);
      
      if (authUser) {
        const userProfile = await authService.getUserProfile(authUser.id);
        setProfile(userProfile);
        const emailVerified = authService.checkEmailVerification();
        setIsEmailVerified(emailVerified);
      } else {
        setProfile(null);
        setIsEmailVerified(false);
      }
      
      setLoading(false); // Tüm veriler yüklendikten sonra loading'i false yap
    });

    return () => {
      unsubscribe();
    };
  }, []); // İlk render'da ve sadece bir kez çalışır

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const result = await authService.signUpWithEmail(email, password, name);
      return { error: result.error };
    } finally {
      // setLoading(false); // onAuthStateChange tarafından yönetilecek
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.signInWithEmail(email, password);
      return { error: result.error };
    } finally {
      // setLoading(false); // onAuthStateChange tarafından yönetilecek
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await authService.signInWithGoogle();
      return { error: result.error };
    } finally {
      // setLoading(false); // onAuthStateChange tarafından yönetilecek
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
      // setLoading(false); // onAuthStateChange tarafından yönetilecek
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