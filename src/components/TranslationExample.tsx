'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './inputs/LanguageSelector';

/**
 * Example component demonstrating how to use the internationalization system
 * This component shows:
 * - How to use the useLanguage hook
 * - How to access translation function (t)
 * - How to get current language
 * - How to change language programmatically
 * - How to integrate the LanguageSelector component
 */
const TranslationExample: React.FC = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    // Note: In a real app, you might want to reload the page
    // window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Translation System Example
        </h2>
        <LanguageSelector />
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Current Language:</h3>
          <p className="text-lg">{currentLanguage}</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Common Translations:</h3>
          <ul className="space-y-2">
            <li><strong>Login:</strong> {t('common.login')}</li>
            <li><strong>Register:</strong> {t('common.register')}</li>
            <li><strong>Email:</strong> {t('common.email')}</li>
            <li><strong>Password:</strong> {t('common.password')}</li>
            <li><strong>Welcome:</strong> {t('common.welcome')}</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Page Translations:</h3>
          <ul className="space-y-2">
            <li><strong>Login Title:</strong> {t('pages.login.title')}</li>
            <li><strong>Login Subtitle:</strong> {t('pages.login.subtitle')}</li>
            <li><strong>Register Title:</strong> {t('pages.register.title')}</li>
          </ul>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Validation Messages:</h3>
          <ul className="space-y-2">
            <li><strong>Required:</strong> {t('validation.required')}</li>
            <li><strong>Invalid Email:</strong> {t('validation.invalidEmail')}</li>
            <li><strong>Password Too Short:</strong> {t('validation.passwordTooShort')}</li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Programmatic Language Change:</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-4 py-2 rounded ${
                currentLanguage === 'en' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('ar')}
              className={`px-4 py-2 rounded ${
                currentLanguage === 'ar' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`px-4 py-2 rounded ${
                currentLanguage === 'fr' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Français
            </button>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Usage Example:</h3>
          <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`import { useLanguage } from '../contexts/LanguageContext';

export default function MyComponent() {
  const { t, currentLanguage, changeLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('pages.home.title')}</h1>
      <p>{t('common.welcome')}</p>
      <button onClick={() => changeLanguage('fr')}>
        Switch to French
      </button>
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TranslationExample;