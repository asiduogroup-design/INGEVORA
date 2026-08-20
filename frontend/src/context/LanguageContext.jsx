import { createContext, useContext, useMemo, useState } from 'react'
import enCommon from '../i18n/en/common'
import enHome from '../i18n/en/home'
import enSoftware from '../i18n/en/software'
import enElectrical from '../i18n/en/electrical'
import enAbout from '../i18n/en/about'
import enAi from '../i18n/en/ai'
import enPricing from '../i18n/en/pricing'
import enContact from '../i18n/en/contact'
import enServiceRequest from '../i18n/en/serviceRequest'
import enAuth from '../i18n/en/auth'
import enProfile from '../i18n/en/profile'
import enServices from '../i18n/en/services'
import enNotFound from '../i18n/en/notFound'
import enMyRequests from '../i18n/en/myRequests'
import itCommon from '../i18n/it/common'
import itHome from '../i18n/it/home'
import itSoftware from '../i18n/it/software'
import itElectrical from '../i18n/it/electrical'
import itAbout from '../i18n/it/about'
import itAi from '../i18n/it/ai'
import itPricing from '../i18n/it/pricing'
import itContact from '../i18n/it/contact'
import itServiceRequest from '../i18n/it/serviceRequest'
import itAuth from '../i18n/it/auth'
import itProfile from '../i18n/it/profile'
import itServices from '../i18n/it/services'
import itNotFound from '../i18n/it/notFound'
import itMyRequests from '../i18n/it/myRequests'

const dictionaries = {
  en: {
    common: enCommon,
    home: enHome,
    software: enSoftware,
    electrical: enElectrical,
    about: enAbout,
    ai: enAi,
    pricing: enPricing,
    contact: enContact,
    serviceRequest: enServiceRequest,
    auth: enAuth,
    profile: enProfile,
    services: enServices,
    notFound: enNotFound,
    myRequests: enMyRequests,
  },
  it: {
    common: itCommon,
    home: itHome,
    software: itSoftware,
    electrical: itElectrical,
    about: itAbout,
    ai: itAi,
    pricing: itPricing,
    contact: itContact,
    serviceRequest: itServiceRequest,
    auth: itAuth,
    profile: itProfile,
    services: itServices,
    notFound: itNotFound,
    myRequests: itMyRequests,
  },
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
