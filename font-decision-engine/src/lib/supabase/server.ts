import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side operations.
 * Uses Next.js cookies for session management.
 */
export async function createSupabaseServer(): Promise<SupabaseClient> {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('CRITICAL: Supabase environment variables are missing.')
    throw new Error('Supabase configuration is incomplete')
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // Server Component context - ignore cookie set errors
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // Server Component context - ignore cookie remove errors
          }
        },
      },
    }
  )
}