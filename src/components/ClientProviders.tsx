'use client'

import { AuthProvider } from '../contexts/AuthContext'
import { LanguageProvider } from '../contexts/LanguageContext'

interface ClientProvidersProps {
  children: React.ReactNode
  initialLanguage: string
}

export default function ClientProviders({ children, initialLanguage }: ClientProvidersProps) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LanguageProvider>
  )
}