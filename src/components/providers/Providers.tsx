import { cookies } from 'next/headers'
import ClientProviders from './ClientProviders'

interface ProvidersProps {
  children: React.ReactNode
}

export default async function Providers({ children }: ProvidersProps) {
  const cookieStore = await cookies()
  const language = cookieStore.get('language')?.value || 'en'

  return (
    <ClientProviders initialLanguage={language}>
      {children}
    </ClientProviders>
  )
}