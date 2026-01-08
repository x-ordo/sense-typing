import { createBrowserClient } from '@supabase/ssr';

// Browser client for client-side fetching
// This is safe to import in both client and server components,
// but the server functions should be in a separate file or handled carefully.
export const createSupabaseBrowser = () => 
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );