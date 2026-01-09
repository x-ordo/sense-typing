// src/lib/supabase/auth.ts
// Supabase Auth helper functions

import { createBrowserClient } from '@supabase/ssr'
import type { User, Session, AuthError } from '@supabase/supabase-js'

/**
 * Create a Supabase browser client with auth enabled
 */
export function createAuthClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  )
}

/**
 * User profile from our custom table
 */
export interface UserProfile {
  id: string
  email: string | null
  display_name: string | null
  avatar_url: string | null
  user_type: 'customer' | 'expert' | 'admin'
  subscription_plan: 'free' | 'personal' | 'team' | 'enterprise'
  subscription_status: 'active' | 'cancelled' | 'past_due' | 'trialing'
  created_at: string
  updated_at: string
}

/**
 * Auth result type
 */
export interface AuthResult {
  user: User | null
  session: Session | null
  error: AuthError | null
}

/**
 * Sign up with email and password
 */
export async function signUp(
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResult> {
  const supabase = createAuthClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName || email.split('@')[0],
      },
    },
  })

  return {
    user: data.user,
    session: data.session,
    error,
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(
  email: string,
  password: string
): Promise<AuthResult> {
  const supabase = createAuthClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return {
    user: data.user,
    session: data.session,
    error,
  }
}

/**
 * Sign in with OAuth provider (Google, Kakao, etc.)
 */
export async function signInWithOAuth(
  provider: 'google' | 'kakao' | 'github'
): Promise<{ error: AuthError | null }> {
  const supabase = createAuthClient()

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  return { error }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  const supabase = createAuthClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Get the current session
 */
export async function getSession(): Promise<Session | null> {
  const supabase = createAuthClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/**
 * Get the current user
 */
export async function getUser(): Promise<User | null> {
  const supabase = createAuthClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Get user profile from our custom table
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createAuthClient()

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error.message)
    return null
  }

  return data as UserProfile
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<UserProfile, 'display_name' | 'avatar_url'>>
): Promise<{ error: Error | null }> {
  const supabase = createAuthClient()

  const { error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  return { error: error ? new Error(error.message) : null }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  const supabase = createAuthClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })

  return { error }
}

/**
 * Update password (after reset or when logged in)
 */
export async function updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
  const supabase = createAuthClient()

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  return { error }
}
