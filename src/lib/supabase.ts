
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for the entire app
export const supabase = createClient(
  // Replace these with your Supabase project URL and anon key
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);
