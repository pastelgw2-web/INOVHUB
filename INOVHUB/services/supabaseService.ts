import { createClient } from '@supabase/supabase-client';

// Mengambil URL dan KEY dari Environment Variables Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase Environment Variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
