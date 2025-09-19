import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import type { UseAuthReturn } from '../../hooks/useAuth';

interface AuthPageProps {
  signUp: UseAuthReturn['signUp'];
  signIn: UseAuthReturn['signIn'];
  signInWithGoogle: UseAuthReturn['signInWithGoogle'];
  onAuthSuccess: () => void;
  onForgotPassword: () => void; // Yeni eklendi
}

export default function AuthPage({ signUp, signIn, signInWithGoogle, onAuthSuccess, onForgotPassword }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // const [showForgotPassword, setShowForgotPassword] = useState(false); // Artık App.tsx tarafından yönetiliyor
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'İsim gerekli';
    }
    
    if (!formData.email) {
      newErrors.email = 'E-posta gerekli';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçersiz e-posta formatı';
    }
    
    if (!formData.password) {
      newErrors.password = 'Şifre gerekli';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalı';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');
    
    try {
      let result;
      
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password, formData.name);
      }
      
      if (result.error) {
        setErrors({ general: result.error });
      } else {
        if (isLogin) {
          onAuthSuccess();
        } else {
          setSuccessMessage('Kayıt başarılı! E-posta adresinizi doğrulamak için gelen kutunuzu kontrol edin.');
        }
      }
    } catch (error) {
      setErrors({ general: 'Beklenmeyen bir hata oluştu' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Şifre sıfırlama formu artık AuthPage içinde değil, App.tsx tarafından yönetilen ResetPasswordPage'de
  // const handleForgotPasswordSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!formData.email) {
  //     setErrors({ email: 'E-posta gerekli' });
  //     return;
  //   }
    
  //   setIsSubmitting(true);
  //   // Geçici olarak başarılı reset simülasyonu
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     setSuccessMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
  //   }, 1000);
  // };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await signInWithGoogle();
      
      if (result.error) {
        setErrors({ general: result.error });
      } else {
        onAuthSuccess();
      }
    } catch (error) {
      setErrors({ general: 'Google ile giriş başarısız oldu' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  // Şifre sıfırlama sayfası artık ayrı bir bileşen
  // if (showForgotPassword) {
  //   return (
  //     <div className="relative flex min-h-screen flex-col bg-slate-900 dark justify-between">
  //       <div className="flex-grow">
  //         <header className="flex items-center p-4">
  //           <button 
  //             onClick={() => setShowForgotPassword(false)}
  //             className="text-white"
  //           >
  //             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
  //               <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
  //             </svg>
  //           </button>
  //           <h1 className="text-white text-xl font-bold flex-1 text-center pr-8">Forgot Your Password?</h1>
  //         </header>
  //         <main className="px-6 py-8 text-center">
  //           <p className="text-slate-400 mb-8">
  //             No worries! Enter the email address you used to register and we'll send you a link to reset your password.
  //           </p>
            
  //           {successMessage && (
  //             <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-3">
  //               <CheckCircle className="w-5 h-5 text-green-400" />
  //               <p className="text-green-200 text-sm">{successMessage}</p>
  //             </div>
  //           )}
            
  //           <form onSubmit={handleForgotPasswordSubmit}>
  //             <div className="relative">
  //               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
  //               <input
  //                 type="email"
  //                 value={formData.email}
  //                 onChange={(e) => handleInputChange('email', e.target.value)}
  //                 className="w-full resize-none overflow-hidden rounded-xl text-white bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 h-14 placeholder:text-slate-400 pl-12 pr-4 text-base"
  //                 placeholder="Email Address"
  //                 required
  //               />
  //             </div>
  //             {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
  //             <button
  //               type="submit"
  //               disabled={isSubmitting}
  //               className="w-full mt-8 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-blue-500 text-white text-lg font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  //             >
  //               {isSubmitting ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
  //             </button>
  //           </form>
  //         </main>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-900 justify-center items-center">
      <div className="p-8 w-full max-w-md">
        <div className="mb-6">
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 rounded-md text-sm font-medium transition-colors ${
                isLogin ? 'bg-slate-700 text-slate-50' : 'text-slate-400'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 rounded-md text-sm font-medium transition-colors ${
                !isLogin ? 'bg-slate-700 text-slate-50' : 'text-slate-400'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-slate-50 text-3xl font-bold tracking-tight">
            {isLogin ? 'Telyna AI' : 'Create an Account'}
          </h1>
          <p className="text-slate-400 mt-2">
            {isLogin ? 'Welcome back! Please enter your details.' : 'Start your journey with Telyna AI.'}
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-200 text-sm">{successMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full resize-none overflow-hidden rounded-md text-slate-50 bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 h-14 placeholder:text-slate-400 pl-12 p-4 text-base"
                placeholder="İsim"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full resize-none overflow-hidden rounded-md text-slate-50 bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 h-14 placeholder:text-slate-400 pl-12 p-4 text-base"
              placeholder="E-posta"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full resize-none overflow-hidden rounded-md text-slate-50 bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 h-14 placeholder:text-slate-400 pl-12 pr-12 p-4 text-base"
              placeholder="Şifre"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-50"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                onClick={onForgotPassword} // App.tsx'ten gelen prop'u kullan
                className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
              >
                Şifremi Unuttum?
              </button>
            </div>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center w-full rounded-md h-12 px-5 bg-blue-500 text-slate-50 text-base font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'İşleniyor...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="flex items-center justify-center w-full rounded-md h-12 px-5 bg-slate-50 text-gray-800 gap-2 font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google ile Devam Et
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-blue-400 hover:text-blue-300 hover:underline ml-1"
            >
              {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}