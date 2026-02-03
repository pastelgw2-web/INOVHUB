
import { createClient } from '@supabase/supabase-js';

// Access environment variables directly from process.env
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// Only initialize if the URL is provided to prevent "supabaseUrl is required" error
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

export async function getInnovations() {
  if (!supabase) {
    console.warn("Supabase client not initialized. Check SUPABASE_URL and SUPABASE_ANON_KEY.");
    return [];
  }
  const { data, error } = await supabase
    .from('innovations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createInnovation(innovation: any) {
  if (!supabase) {
    throw new Error("Supabase client not initialized. Please configure environment variables.");
  }
  const { data, error } = await supabase
    .from('innovations')
    .insert([innovation])
    .select();
    
  if (error) throw error;
  return data[0];
}
