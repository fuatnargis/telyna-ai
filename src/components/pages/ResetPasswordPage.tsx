import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface ResetPasswordPageProps {
  onResetPassword: (newPassword: string, confirmPassword: string) => void;
  onBack: () => void;
}

export default function ResetPasswordPage({ onResetPassword, onBack }: ResetPasswordPageProps) {
  const { updatePassword } = useAuth();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await updatePassword(formData.newPassword);
      
      if (result.error) {
        setErrors({ general: result.error });
      } else {
        alert('Şifre başarıyla güncellendi!');
        onBack();
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
          <h1 className="text-white text-xl font-bold tracking-tight flex-1 text-center pr-10">Set New Password</h1>
        </header>
        
        <main className="flex-grow px-6 pt-12 flex flex-col gap-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                className="w-full resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-blue-500 border border-white/20 bg-white/5 h-14 placeholder:text-gray-400 p-4 text-base"
                placeholder="New Password"
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
                placeholder="Confirm New Password"
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
          </form>
        </main>
      </div>
      
      <footer className="p-6 pb-8">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-blue-500 text-white text-lg font-bold hover:bg-blue-600 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
        </button>
        {errors.general && (
          <p className="text-red-400 text-sm mt-4 text-center">{errors.general}</p>
        )}
      </footer>
    </div>
  );
}