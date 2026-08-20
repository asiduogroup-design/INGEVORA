import { createContext, useContext, useMemo, useState } from 'react'
import enCommon from '../i18n/en/common'
import enHome from '../i18n/en/home'
import itCommon from '../i18n/it/common'
import itHome from '../i18n/it/home'

const dictionaries = {
  en: { common: enCommon, home: enHome },
  it: { common: itCommon, home: itHome },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === 'en' ? 'it' : 'en')),
      t: dictionaries[language],
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
