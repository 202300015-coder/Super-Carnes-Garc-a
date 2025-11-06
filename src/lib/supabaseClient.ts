import { createClient } from '@supabase/supabase-js'

// Usar variables de entorno (definidas en .env.local)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validar que las variables de entorno estén configuradas
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    '❌ Faltan las variables de entorno de Supabase.\n' +
    'Asegúrate de crear el archivo .env.local con:\n' +
    'VITE_SUPABASE_URL=tu-url\n' +
    'VITE_SUPABASE_ANON_KEY=tu-key'
  )
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)