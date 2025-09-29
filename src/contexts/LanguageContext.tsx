'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentLanguage, setLanguage, translate } from '../languages/translate';

interface LanguageContextType {
  currentLanguage: string;
  t: (key: string) => string;
  changeLanguage: (langCode: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: string;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, initialLanguage = 'en' }) => {
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);

  useEffect(() => {
    setCurrentLanguage(getCurrentLanguage());
    
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  const changeLanguage = (langCode: string) => {
    setLanguage(langCode);
    setCurrentLanguage(langCode);
  };

  const t = (key: string) => translate(key, currentLanguage);

  const value: LanguageContextType = {
    currentLanguage,
    t,
    changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageProvider;