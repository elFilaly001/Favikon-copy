'use client';

import { useState, useEffect } from 'react';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import GoogleButton from '../Buttons/GoogleButton';
import LanguageSelector from '../LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';
import Link from 'next/link';

export default function LoginForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  const [isClient, setIsClient] = useState(false);

  // Ensure component is hydrated before showing validation
  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateEmail = (email: string) => {
    if (!email) return t('validation.required');
    
    // Check for @ symbol
    if (!email.includes('@')) {
      return t('validation.invalidEmail');
    }
    
    // Enhanced email regex for better validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return t('validation.invalidEmail');
    }
    
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return t('validation.required');
    
    if (password.length < 8) {
      return t('validation.passwordTooShort');
    }
    
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    
    // Check for at least one number
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    
    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (touched[name as keyof typeof touched]) {
      if (name === 'email') {
        setErrors(prev => ({
          ...prev,
          email: validateEmail(value)
        }));
      } else if (name === 'password') {
        setErrors(prev => ({
          ...prev,
          password: validatePassword(value)
        }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(value)
      }));
    } else if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(value)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    setErrors({
      email: emailError,
      password: passwordError
    });
    
    setTouched({
      email: true,
      password: true
    });
    
    // If no errors, proceed with login
    if (!emailError && !passwordError) {
      console.log('Login attempt:', formData);
      alert(`Login attempt with email: ${formData.email}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-3">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('pages.login.title')}</h2>
            <p className="mt-2 text-sm text-gray-600">{t('pages.login.subtitle')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <EmailInput
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder={t('common.email')}
              error={isClient && touched.email ? errors.email : ''}
              required={false}
            />
            
            <PasswordInput
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder={t('common.password')}
              error={isClient && touched.password ? errors.password : ''}
              required={false}
            />
            
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                  {t('common.forgotPassword')}
                </a>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
            >
              {t('common.login')}
            </button>
          </form>
          
          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6">
              <GoogleButton />
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t('common.dontHaveAccount')}{" "}
              <Link 
                href="/register" 
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                {t('common.register')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
