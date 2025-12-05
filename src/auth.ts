import { supabase } from './lib/supabaseClient'

export async function signUp(email: string, password: string, fullName?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || email.split('@')[0] // Guardar nombre o usar parte del email
      }
    }
  })
  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function resetPassword(email: string) {
  // Detectar si estamos en producción o desarrollo
  const isProduction = window.location.hostname.includes('github.io')
  
  // NO agregamos #reset-password porque Supabase ya agrega #access_token=...
  // y causaría un doble hash: #reset-password#access_token=...
  const redirectTo = isProduction
    ? 'https://202300015-coder.github.io/Super-Carnes-Garc-a/'
    : `${window.location.origin}/Super-Carnes-Garc-a/`
  
  console.log('📧 Enviando email de recuperación a:', email)
  console.log('🔗 Redirect URL:', redirectTo)
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo
  })
  if (error) throw error
}

export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })
  if (error) throw error
  return data
}

// Verificar sesión actual
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Escuchar cambios en la autenticación
export function onAuthStateChange(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })
}