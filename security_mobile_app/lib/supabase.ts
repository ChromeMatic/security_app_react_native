import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qavakjmoxncbxguohmss.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhdmFram1veG5jYnhndW9obXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwODM0OTMsImV4cCI6MjAyMjY1OTQ5M30.qffZwJ9du_sXbHzCjgIKGhiBPu26FpaZmxUYYI54Urk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})