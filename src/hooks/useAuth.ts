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
  const [loading, setLoading] = useState(true); // Starts true for initial app load
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const isInitialAuthCheckComplete = useRef(false); // To ensure initial loading is handled once

  useEffect(() => {
    console.log('useAuth: useEffect triggered.');
    const unsubscribe = authService.onAuthStateChange(async (authUserFromService) => {
      console.log('useAuth: onAuthStateChange triggered. authUserFromService:', authUserFromService ? authUserFromService.uid : 'null');
      
      if (isInitialAuthCheckComplete.current) {
        setLoading(true); 
        console.log('useAuth: Setting loading to true (subsequent auth change).');
      } else {
        console.log('useAuth: Initial auth check. Loading already true from useState.');
      }
      
      setUser(authUserFromService);
      
      try { 
        if (authUserFromService) {
          console.log('useAuth: AuthUser present. Attempting to fetch user profile for UID:', authUserFromService.uid);
          const userProfile = await authService.getUserProfile(authUserFromService.uid);
          setProfile(userProfile);
          console.log('useAuth: User profile fetched. Profile data:', userProfile ? 'present' : 'null');
          const emailVerified = authService.checkEmailVerification();
          setIsEmailVerified(emailVerified);
        } else {
          console.log('useAuth: No authUserFromService. Setting profile to null.');
          setProfile(null);
          setIsEmailVerified(false);
        }
      } catch (error) {
        console.error('useAuth: Error fetching user profile in onAuthStateChange:', error);
        setProfile(null); 
        setIsEmailVerified(false);
      } finally {
        setLoading(false); 
        console.log('useAuth: Setting loading to false. Final loading state:', false);
        isInitialAuthCheckComplete.current = true; // Mark initial check as complete
      }
    });

    return () => {
      console.log('useAuth: Cleaning up onAuthStateChange subscription.');
      unsubscribe();
    };
  }, []);

  // Helper to set loading state for auth actions
  const setAuthActionLoading = () => {
    setLoading(true);
    console.log('useAuth: Auth action started. Setting loading to true.');
  };

  const signUp = async (email: string, password: string, name: string) => {
    setAuthActionLoading();
    try {
      const result = await authService.signUpWithEmail(email, password, name);
      if (result.error) console.error('useAuth: SignUp error:', result.error);
      return { error: result.error };
    } finally {
      // setLoading(false) will be handled by onAuthStateChange
    }
  };

  const signIn = async (email: string, password: string) => {
    setAuthActionLoading();
    try {
      const result = await authService.signInWithEmail(email, password);
      if (result.error) console.error('useAuth: SignIn error:', result.error);
      return { error: result.error };
    } finally {
      // setLoading(false) will be handled by onAuthStateChange
    }
  };

  const signInWithGoogle = async () => {
    setAuthActionLoading();
    try {
      const result = await authService.signInWithGoogle();
      if (result.error) console.error('useAuth: SignInWithGoogle error:', result.error);
      return { error: result.error };
    } finally {
      // setLoading(false) will be handled by onAuthStateChange
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
      }
      if (result.error) console.error('useAuth: SignOut error:', result.error);
      return result;
    } finally {
      // setLoading(false) will be handled by onAuthStateChange
    }
  };

  const resetPassword = async (email: string) => {
    const result = await authService.resetPassword(email);
    if (result.error) console.error('useAuth: ResetPassword error:', result.error);
    return result;
  };

  const updatePassword = async (newPassword: string) => {
    setAuthActionLoading();
    try {
      const result = await authService.updatePassword(newPassword);
      if (result.error) console.error('useAuth: UpdatePassword error:', result.error);
      return { error: result.error };
    } finally {
      // setLoading(false) will be handled by onAuthStateChange
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      console.error('useAuth: UpdateProfile failed, no user session.');
      return { error: 'Kullanıcı oturumu bulunamadı' };
    }
    setAuthActionLoading();
    try {
      const result = await authService.updateUserProfile(user.id, updates);
      
      if (!result.error && profile) {
        setProfile({ ...profile, ...updates });
        console.log('useAuth: Profile updated locally.');
      }
      if (result.error) console.error('useAuth: UpdateProfile error:', result.error);
      return result;
    } finally {
      // setLoading(false) will be handled by onAuthStateChange
    }
  };

  const resendEmailVerification = async () => {
    const result = await authService.resendEmailVerification();
    if (result.error) console.error('useAuth: ResendEmailVerification error:', result.error);
    return result;
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