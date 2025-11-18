import { createClient } from '@supabase/supabase-js';

// Client for the main application database (to get business names, etc.)
const mainSupabaseUrl = 'https://awllocybodoldzultfli.supabase.co'; // TODO: Add your Supabase URL
const mainSupabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3bGxvY3lib2RvbGR6dWx0ZmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NTc1OTcsImV4cCI6MjA3OTAzMzU5N30.t-oqKwHnFPVsizYPZrI32jUh6apGRyhxFr7HePbErTQ'; // TODO: Add your Supabase Anon Key

if (!mainSupabaseUrl || mainSupabaseUrl.includes('YOUR_')) {
  console.error('Main Supabase URL or Anon Key is missing! Please add them in services/supabaseClients.ts.');
}

export const mainClient = createClient(mainSupabaseUrl, mainSupabaseAnonKey);

// Client for the analytics database
const analyticsUrl = 'https://YOUR_ANALYTICS_SUPABASE_URL.supabase.co'; // TODO: Add your Analytics Supabase URL
const analyticsAnonKey = 'YOUR_ANALYTICS_SUPABASE_ANON_KEY'; // TODO: Add your Analytics Supabase Anon Key

if (!analyticsUrl || analyticsUrl.includes('YOUR_')) {
  console.error('Analytics Supabase URL or Anon Key is missing! Please add them in services/supabaseClients.ts.');
}

export const analyticsClient = createClient(analyticsUrl, analyticsAnonKey);