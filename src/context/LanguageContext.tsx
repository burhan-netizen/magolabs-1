import React, { createContext, useContext } from 'react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// The site is English only. This keeps the shared wording (menu labels, button
// text) in one place, src/utils/translations.ts.
const t = (key: string): string => TRANSLATIONS.en[key] || key;

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <LanguageContext.Provider value={{ language: 'en', t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
