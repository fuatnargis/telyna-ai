export interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  ageRange: string;
  country: string;
  role: string;
  industry: string;
  isProfileComplete: boolean;
  isPremium?: boolean;
  subscriptionType?: 'free' | 'premium' | 'pro';
  subscriptionExpiry?: Date;
}

export type Purpose = 
  | 'Business Meeting'
  | 'Tourism'
  | 'Daily Life'
  | 'Emergency'
  | 'Education'
  | 'Healthcare'
  | 'Shopping'
  | 'Transportation'
  | 'Accommodation';

export interface Chat {
  id: string;
  country: string;
  purpose: Purpose; // Tipini string'den Purpose'a güncelledim
  date: string;
  messages: Message[];
}

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Country {
  name: string;
  code: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  needsProfileSetup: boolean;
}