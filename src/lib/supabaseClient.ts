import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://oiqfkymlohsgaatrvzic.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pcWZreW1sb2hzZ2FhdHJ2emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MjI0MDYsImV4cCI6MjA3NzI5ODQwNn0.H7MCCblHQ5mGnv-bSFrTnWpvmiqyPXRweDEp98wvEno'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)