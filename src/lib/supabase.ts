
import { createClient } from '@supabase/supabase-js';

// Set Supabase URL and anon key
const supabaseUrl = "https://mwhegxjcaneqyhqudise.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13aGVneGpjYW5lcXlocXVkaXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NDYyNDgsImV4cCI6MjA2MTMyMjI0OH0.QnUYLgjUchmD8Gu93nRuovx9cU3v-1U-b5Gd16oi9Fs";

// Validate that we have the required configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and anon key are required. Please check your environment variables.');
}

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});

// Helper function to get role-specific dashboard route
export const getDashboardRoute = (role?: string) => {
  switch(role) {
    case 'admin': 
      return '/admin/dashboard';
    case 'business':
      return '/business/dashboard';
    default: 
      return '/customer/dashboard';
  }
};
