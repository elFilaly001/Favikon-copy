/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'

interface GoogleButtonProps {
  disabled?: boolean;
  className?: string;
}

export default function GoogleButton({
  disabled = false,
  className = ''
}: GoogleButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { t } = useLanguage()

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleCredentialResponse,
        })
      }
    }
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const handleCredentialResponse = async (response: any) => {
    setIsLoading(true)
    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]))
      
      const userData = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      }

      // For now, we'll just use a mock token since backend isn't ready
      const mockToken = `mock-jwt-token-${Date.now()}`
      
      // TODO: When backend is ready, replace the above with:
      // const backendResponse = await axios.post(`${API_URL}/auth/google`, {
      //   googleId: payload.sub,
      //   email: payload.email,
      //   name: payload.name,
      //   picture: payload.picture,
      //   googleToken: response.credential
      // });
      // const { user, token } = backendResponse.data;
      
      // Store in context and localStorage
      login(userData, mockToken)
      
      console.log('Google login successful (frontend-only):', userData)
      
      // Optional: Show success message
      alert(`Welcome ${userData.name}! Login successful.`)
      
    } catch (error) {
      console.error('Google login error:', error)
      
      // Handle specific error types
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Google sign-in was cancelled by user')
        // Don't show error for user cancellation
      } else {
        alert('Login failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    // Temporary mock for testing (remove when you have real Client ID)
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.includes('.apps.googleusercontent.com')) {
      console.log('Using mock Google login for testing...')
      
      // Mock user data for testing
      const mockUserData = {
        id: 'mock-user-123',
        email: 'test@example.com',
        name: 'Test User',
        picture: 'https://via.placeholder.com/150'
      }
      
      const mockToken = `mock-jwt-token-${Date.now()}`
      login(mockUserData, mockToken)
      alert(`Mock login successful! Welcome ${mockUserData.name}`)
      return
    }

    if (window.google && !isLoading) {
      setIsLoading(true)
      try {
        window.google.accounts.id.prompt()
      } catch (error) {
        console.error('Error opening Google sign-in:', error)
        setIsLoading(false)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={disabled || isLoading}
      className={`w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600 mr-3"></div>
          Signing in...
        </>
      ) : (
        <>
          <img 
            src="https://developers.google.com/identity/images/g-logo.png" 
            alt="Google" 
            className="w-5 h-5 mr-3"
          />
          {t('common.signInWithGoogle')}
        </>
      )}
    </button>
  );
}

// Type declarations for Google Sign-In
declare global {
  interface Window {
    google: any
  }
}
