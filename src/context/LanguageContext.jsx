import { createContext, useContext, useState } from 'react';
import en from '../locales/en';
import ar from '../locales/ar';

const locales = { en, ar };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  function t(section, key) {
    const locale = locales[lang];
    if (key === undefined) return locale[section] ?? section;
    return locale[section]?.[key] ?? en[section]?.[key] ?? key;
  }

  function toggle() {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
