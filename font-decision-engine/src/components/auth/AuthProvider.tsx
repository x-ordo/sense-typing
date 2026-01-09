'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import {
  createAuthClient,
  getUserProfile,
  signIn as authSignIn,
  signUp as authSignUp,
  signOut as authSignOut,
  signInWithOAuth as authSignInWithOAuth,
  type UserProfile,
} from '@/lib/supabase/auth'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  signInWithOAuth: (provider: 'google' | 'kakao' | 'github') => Promise<{ error: Error | null }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user profile
  const fetchProfile = useCallback(async (userId: string) => {
    const userProfile = await getUserProfile(userId)
    setProfile(userProfile)
  }, [])

  // Refresh profile
  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }, [user, fetchProfile])

  // Initialize auth state
  useEffect(() => {
    const supabase = createAuthClient()

    // Get initial session
    const initAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession()

        if (initialSession) {
          setSession(initialSession)
          setUser(initialSession.user)
          await fetchProfile(initialSession.user.id)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)

        if (newSession?.user) {
          await fetchProfile(newSession.user.id)
        } else {
          setProfile(null)
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  // Sign in handler
  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await authSignIn(email, password)
    return { error: error ? new Error(error.message) : null }
  }, [])

  // Sign up handler
  const signUp = useCallback(async (email: string, password: string, displayName?: string) => {
    const { error } = await authSignUp(email, password, displayName)
    return { error: error ? new Error(error.message) : null }
  }, [])

  // Sign out handler
  const signOut = useCallback(async () => {
    await authSignOut()
    setUser(null)
    setProfile(null)
    setSession(null)
  }, [])

  // OAuth sign in handler
  const signInWithOAuth = useCallback(async (provider: 'google' | 'kakao' | 'github') => {
    const { error } = await authSignInWithOAuth(provider)
    return { error: error ? new Error(error.message) : null }
  }, [])

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    signInWithOAuth,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthContext }
