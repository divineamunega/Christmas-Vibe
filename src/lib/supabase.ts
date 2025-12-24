import { createClient } from '@supabase/supabase-js';

import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using demo client.');
  supabaseUrl = 'https://example.supabase.co';
  supabaseAnonKey = 'example-anon-key';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
