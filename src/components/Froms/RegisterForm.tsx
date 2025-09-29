"use client";

import { useState } from 'react';
import TextInput from '../inputs/TextInput';
import EmailInput from '../inputs/EmailInput';
import PhoneInput from '../inputs/PhoneInput';
import CountrySelect from '../inputs/CountrySelect';
import LanguageSelect from '../inputs/LanguageSelect';
import SubmitButton from '../Buttons/SubmitButton';
import GoogleButton from '../Buttons/GoogleButton';

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
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      // Email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    if (!formData.language) {
      newErrors.language = 'Please select a language';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
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
      alert('Account created successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
    // Implement Google OAuth logic here
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            required
            error={hasAttemptedSubmit ? errors.firstName : undefined}
          />
          <TextInput
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Last name"
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
          label="Email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleInputChange('email')}
          required
          error={hasAttemptedSubmit ? errors.email : undefined}
        />

        {/* Phone Number */}
        <PhoneInput
          id="phone"
          name="phone"
          label="Phone number"
          placeholder="123 45 67"
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
          label="Company"
          placeholder="Company name"
          value={formData.company}
          onChange={handleInputChange('company')}
          error={hasAttemptedSubmit ? errors.company : undefined}
        />

        {/* Country and Language */}
        <div className="grid grid-cols-2 gap-4">
          <CountrySelect
            id="country"
            name="country"
            label="Country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange('country')}
            required
            error={hasAttemptedSubmit ? errors.country : undefined}
          />
          <LanguageSelect
            id="language"
            name="language"
            label="Language"
            placeholder="English"
            value={formData.language}
            onChange={handleInputChange('language')}
            required
            error={hasAttemptedSubmit ? errors.language : undefined}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
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
              Accept our{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-500 underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          {hasAttemptedSubmit && errors.acceptTerms && (
            <p className="text-sm text-red-600">{errors.acceptTerms}</p>
          )}

          <div className="flex items-start">
            <input
              type="checkbox"
              id="subscribeNewsletter"
              name="subscribeNewsletter"
              checked={formData.subscribeNewsletter}
              onChange={handleInputChange('subscribeNewsletter')}
              className="mt-1 h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="subscribeNewsletter" className="ml-2 text-sm text-gray-600">
              Subscribe to our newsletter and commercial offers
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <SubmitButton
          loading={isSubmitting}
          variant="emerald"
        >
          Create account for Free
        </SubmitButton>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Google Button */}
        <GoogleButton
        //   onClick={handleGoogleSignup}
          className="w-full"
        />

        {/* Sign In Link */}
        <div className="text-center text-sm text-gray-600">
          You already have an account?{' '}
          <a href="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
}
