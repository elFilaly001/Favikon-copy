import { useState, useEffect } from 'react';
import enTranslations from './en.json';
import arTranslations from './ar.json';
import frTranslations from './fr.json';

// Types
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Translations {
  common: Record<string, string>;
  validation: Record<string, string>;
  pages: Record<string, any>;
}

// Available languages
export const LANGUAGES: Record<string, Language> = {
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
};

// Translation data
const translations: Record<string, Translations> = {
  en: enTranslations,
  ar: arTranslations,
  fr: frTranslations
};

// Default language
export const DEFAULT_LANGUAGE = 'en';

// Get current language from localStorage or default
export const getCurrentLanguage = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || DEFAULT_LANGUAGE;
  }
  return DEFAULT_LANGUAGE;
};

// Set language in localStorage
export const setLanguage = (languageCode: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', languageCode);
    // Trigger a custom event for language change
    window.dispatchEvent(new CustomEvent('languageChange', { detail: languageCode }));
  }
};

// Get translation for a specific key
export const translate = (key: string, language: string | null = null): string => {
  const currentLang = language || getCurrentLanguage();
  
  if (!translations[currentLang]) {
    console.warn(`Language ${currentLang} not found, falling back to ${DEFAULT_LANGUAGE}`);
    return getNestedValue(translations[DEFAULT_LANGUAGE], key) || key;
  }
  
  return getNestedValue(translations[currentLang], key) || key;
};

// Helper function to get nested object values using dot notation
const getNestedValue = (obj: any, key: string): string | undefined => {
  return key.split('.').reduce((curr, prop) => curr && curr[prop], obj);
};

// Hook for getting translation function with current language
export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);
  
  const t = (key: string) => translate(key, currentLanguage);
  
  return { t, currentLanguage, setLanguage };
};

// Simple translation function for use in components
export const t = translate;

export default translate;