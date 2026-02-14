import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zuwllknrvjgpfnxxuucu.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1d2xsa25ydmpncGZueHh1dWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTA0OTcsImV4cCI6MjA4NjY2NjQ5N30.cHjNFLUaS4_ue5ho1iECXa5bPxMKQ3Jnff3jFwM1HPk'

let supabase

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} catch (error) {
  console.error('Failed to initialize Supabase:', error)
  // Create a dummy client that won't break the app
  supabase = null
}

export { supabase }
