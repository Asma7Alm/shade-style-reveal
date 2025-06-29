
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xmjnploheszeahamfgjw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhtam5wbG9oZXN6ZWFoYW1mZ2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMzk0NjcsImV4cCI6MjA2NTgxNTQ2N30.Sn5ldqP4R1bH-utOmql9IMFcUh83hfbe_Ut1U9U-XaU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: window.localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
