import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth'; // useAuth artık App.tsx'ten prop olarak geliyor

interface ResetPasswordPageProps {
  onResetPassword: (email: string) => Promise<{ error: string | null }>; // E-posta ile şifre sıfırlama
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>; // Oturum açmış kullanıcının şifresini güncelleme
  onBack: () => void;
}

export default function ResetPasswordPage({ onResetPassword, updatePassword, onBack }: ResetPasswordPageProps) {
  // const { updatePassword } = useAuth(); // Artık prop olarak geliyor
  const [formData, setFormData] = useState({
    email: '', // Şifre sıfırlama bağlantısı göndermek için e-posta
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false); // Şifre sıfırlama e-postası gönderildi mi?

  const validateForm = (isSendingEmail: boolean) => {
    const newErrors: {[key: string]: string} = {};
    
    if (isSendingEmail) {
      if (!formData.email) {
        newErrors.email = 'E-posta gerekli';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Geçersiz e-posta formatı';
      }
    } else {
      if (!formData.newPassword) {
        newErrors.newPassword = 'Yeni şifre gerekli';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Şifre en az 6 karakter olmalı';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Lütfen şifrenizi onaylayın';
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Şifreler eşleşmiyor';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(true)) return;

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const result = await onResetPassword(formData.email);
      if (result.error) {
        setErrors({ general: result.error });
      } else {
        setSuccessMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
        setIsEmailSent(true);
      }
    } catch (error) {
      setErrors({ general: 'Şifre sıfırlama bağlantısı gönderilirken hata oluştu' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(false)) return;
    
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');
    
    try {
      const result = await updatePassword(formData.newPassword);
      
      if (result.error) {
        setErrors({ general: result.error });
      } else {
        setSuccessMessage('Şifre başarıyla güncellendi!');
        setTimeout(() => onBack(), 2000); // Başarılı olursa 2 saniye sonra geri dön
      }
    } catch (error) {
      setErrors({ general: 'Şifre güncellenirken hata oluştu' });
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

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-900 dark justify-between">
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between p-4 shrink-0">
          <button 
            onClick={onBack}
            className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h1 className="text-white text-xl font-bold tracking-tight flex-1 text-center pr-10">
            {isEmailSent ? 'Şifreyi Güncelle' : 'Şifrenizi Sıfırlayın'}
          </h1>
        </header>
        
        <main className="flex-grow px-6 pt-12 flex flex-col gap-8">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-3">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              <p className="text-green-200 text-sm">{successMessage}</p>
            </div>
          )}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3">
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              <p className="text-red-200 text-sm">{errors.general}</p>
            </div>
          )}

          {!isEmailSent ? (
            <form onSubmit={handleSendResetLink} className="space-y-8">
              <p className="text-slate-400 mb-8 text-center">
                Endişelenmeyin! Kayıt olurken kullandığınız e-posta adresini girin, size şifrenizi sıfırlamanız için bir bağlantı göndereceğiz.
              </p>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-blue-500 border border-white/20 bg-white/5 h-14 placeholder:text-gray-400 p-4 pl-12 text-base"
                  placeholder="E-posta Adresi"
                />
                {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-blue-500 text-white text-lg font-bold hover:bg-blue-600 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleUpdatePasswordSubmit} className="space-y-8">
              <p className="text-slate-400 mb-8 text-center">
                E-posta adresinize gönderilen bağlantıdaki talimatları takip ederek şifrenizi sıfırlayabilirsiniz. Eğer zaten bir bağlantıya tıkladıysanız, yeni şifrenizi aşağıya girin.
              </p>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className="w-full resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-blue-500 border border-white/20 bg-white/5 h-14 placeholder:text-gray-400 p-4 text-base"
                  placeholder="Yeni Şifre"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.newPassword && <p className="text-red-400 text-sm mt-2">{errors.newPassword}</p>}
              </div>
              
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-blue-500 border border-white/20 bg-white/5 h-14 placeholder:text-gray-400 p-4 text-base"
                  placeholder="Yeni Şifreyi Onayla"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-blue-500 text-white text-lg font-bold hover:bg-blue-600 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}