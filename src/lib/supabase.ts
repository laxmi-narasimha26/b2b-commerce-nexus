
import { createClient } from '@supabase/supabase-js';

// Check if environment variables are available and provide fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate that we have the required configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and anon key are required. Please check your environment variables.');
}

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

