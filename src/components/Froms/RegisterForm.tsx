"use client";

import { useState } from 'react';
import TextInput from '../inputs/TextInput';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import PhoneInput from '../inputs/PhoneInput';
import CountrySelect from '../inputs/CountrySelect';
import LanguageSelect from '../inputs/LanguageSelect';
import SubmitButton from '../Buttons/SubmitButton';
import GoogleButton from '../Buttons/GoogleButton';
import { useLanguage } from '../../contexts/LanguageContext';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  company: string;
  country: string;
  language: string;
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  company?: string;
  country?: string;
  language?: string;
  acceptTerms?: string;
  subscribeNewsletter?: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
    country: '',
    language: 'en',
    acceptTerms: false,
    subscribeNewsletter: false,
  });

  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    dialCode: '+33'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const { t } = useLanguage();

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing (only if they've attempted to submit)
    if (hasAttemptedSubmit && errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('validation.firstNameRequired');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('validation.lastNameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('validation.emailRequired');
    } else {
      // Email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = t('validation.invalidEmail');
      }
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = t('validation.required');
    } else if (formData.password.length < 8) {
      newErrors.password = t('validation.passwordTooShort');
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = t('validation.required');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordsDoNotMatch');
    }

    if (!formData.country) {
      newErrors.country = t('validation.countryRequired');
    }

    if (!formData.language) {
      newErrors.language = t('validation.languageRequired');
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t('validation.termsRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark that user has attempted to submit
    setHasAttemptedSubmit(true);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', {
        ...formData,
        selectedCountry
      });
      
      // Handle successful submission
      alert(t('messages.accountCreatedSuccess'));
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('messages.submissionError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
    // Implement Google OAuth logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-3">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('pages.register.title')}</h2>
            <p className="mt-2 text-sm text-gray-600">{t('pages.register.subtitle')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3">
          <TextInput
            id="firstName"
            name="firstName"
            label={t('common.firstName')}
            placeholder={t('common.firstNamePlaceholder')}
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            required
            error={hasAttemptedSubmit ? errors.firstName : undefined}
          />
          <TextInput
            id="lastName"
            name="lastName"
            label={t('common.lastName')}
            placeholder={t('common.lastNamePlaceholder')}
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            required
            error={hasAttemptedSubmit ? errors.lastName : undefined}
          />
        </div>

        {/* Email */}
        <EmailInput
          id="email"
          name="email"
          label={t('common.email')}
          placeholder={t('common.emailPlaceholder')}
          value={formData.email}
          onChange={handleInputChange('email')}
          required
          error={hasAttemptedSubmit ? errors.email : undefined}
        />

        {/* Password Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <PasswordInput
            id="password"
            name="password"
            label={t('common.password')}
            placeholder={t('common.password')}
            value={formData.password}
            onChange={handleInputChange('password')}
            required
            error={hasAttemptedSubmit ? errors.password : undefined}
          />
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label={t('common.confirmPassword')}
            placeholder={t('common.confirmPassword')}
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            required
            error={hasAttemptedSubmit ? errors.confirmPassword : undefined}
          />
        </div>

        {/* Phone Number */}
        <PhoneInput
          id="phone"
          name="phone"
          label={t('common.phone')}
          placeholder={t('common.phonePlaceholder')}
          value={formData.phone}
          onChange={handleInputChange('phone')}
          onCountryChange={handleCountryChange}
          selectedCountry={selectedCountry}
          error={hasAttemptedSubmit ? errors.phone : undefined}
        />

        {/* Company */}
        <TextInput
          id="company"
          name="company"
          label={t('common.company')}
          placeholder={t('common.companyPlaceholder')}
          value={formData.company}
          onChange={handleInputChange('company')}
          error={hasAttemptedSubmit ? errors.company : undefined}
        />

        {/* Country and Language */}
        <div className="grid grid-cols-2 gap-3">
          <CountrySelect
            id="country"
            name="country"
            label={t('common.country')}
            placeholder={t('common.countryPlaceholder')}
            value={formData.country}
            onChange={handleInputChange('country')}
            required
            error={hasAttemptedSubmit ? errors.country : undefined}
          />
          <LanguageSelect
            id="language"
            name="language"
            label={t('common.language')}
            placeholder={t('common.languagePlaceholder')}
            value={formData.language}
            onChange={handleInputChange('language')}
            required
            error={hasAttemptedSubmit ? errors.language : undefined}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-2">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange('acceptTerms')}
              className="mt-1 h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
              {t('common.acceptTerms')}{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-500 underline">
                {t('common.termsAndConditions')}
              </a>
            </label>
          </div>
          {hasAttemptedSubmit && errors.acceptTerms && (
            <p className="text-sm text-red-600">{errors.acceptTerms}</p>
          )}

        </div>

        {/* Submit Button */}
        <SubmitButton
          loading={isSubmitting}
          variant="emerald"
        >
          {t('common.createAccountFree')}
        </SubmitButton>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{t('common.or')}</span>
          </div>
        </div>

        {/* Google Button */}
        <GoogleButton
        //   onClick={handleGoogleSignup}
          className="w-full"
        />

        {/* Sign In Link */}
        <div className="text-center text-sm text-gray-600">
          {t('common.alreadyHaveAccount')}{' '}
          <a href="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">
            {t('common.login')}
          </a>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
}
