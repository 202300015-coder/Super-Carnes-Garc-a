// ============================================
// HELPER FUNCTIONS PARA AUTENTICACIÓN
// ============================================

// Validar email
export function validateEmail(email: string): { valid: boolean; error: string } {
  if (!email) {
    return { valid: false, error: 'Este campo es obligatorio' }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'El correo no es válido' }
  }
  
  return { valid: true, error: '' }
}

// Validar contraseña
export function validatePassword(password: string): { valid: boolean; error: string } {
  if (!password) {
    return { valid: false, error: 'Este campo es obligatorio' }
  }
  
  if (password.length < 6) {
    return { valid: false, error: 'La contraseña es demasiado corta (mínimo 6 caracteres)' }
  }
  
  return { valid: true, error: '' }
}

// Validar nombre de usuario
export function validateUsername(username: string): { valid: boolean; error: string } {
  if (!username) {
    return { valid: false, error: 'Este campo es obligatorio' }
  }
  
  if (username.length < 3) {
    return { valid: false, error: 'El nombre de usuario es demasiado corto (mínimo 3 caracteres)' }
  }
  
  if (username.length > 20) {
    return { valid: false, error: 'El nombre de usuario es demasiado largo (máximo 20 caracteres)' }
  }
  
  // Solo letras, números y guiones bajos
  const usernameRegex = /^[a-zA-Z0-9_]+$/
  if (!usernameRegex.test(username)) {
    return { valid: false, error: 'Solo se permiten letras, números y guiones bajos' }
  }
  
  return { valid: true, error: '' }
}

// Validar confirmación de contraseña
export function validatePasswordMatch(password: string, confirmPassword: string): { valid: boolean; error: string } {
  if (!confirmPassword) {
    return { valid: false, error: 'Falta confirmar la contraseña' }
  }
  
  if (password !== confirmPassword) {
    return { valid: false, error: 'Las contraseñas no coinciden' }
  }
  
  return { valid: true, error: '' }
}

// Mostrar error en un campo
export function showFieldError(fieldId: string, errorMessage: string) {
  const errorElement = document.getElementById(`${fieldId}Error`)
  const inputElement = document.getElementById(fieldId) as HTMLInputElement
  
  if (errorElement && inputElement) {
    errorElement.textContent = errorMessage
    errorElement.classList.remove('hidden')
    inputElement.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500')
    inputElement.classList.remove('border-gray-300', 'dark:border-gray-600')
  }
}

// Limpiar error de un campo
export function clearFieldError(fieldId: string) {
  const errorElement = document.getElementById(`${fieldId}Error`)
  const inputElement = document.getElementById(fieldId) as HTMLInputElement
  
  if (errorElement && inputElement) {
    errorElement.classList.add('hidden')
    errorElement.textContent = ''
    inputElement.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500')
    inputElement.classList.add('border-gray-300', 'dark:border-gray-600')
  }
}

// Mostrar alert en el modal
export function showAlert(containerId: string, message: string, type: 'success' | 'error' | 'info') {
  const alertContainer = document.getElementById(containerId)
  
  if (!alertContainer) return
  
  const colors = {
    success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-500',
    error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-500',
    info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-500'
  }
  
  const icons = {
    success: `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`,
    error: `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>`,
    info: `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>`
  }
  
  alertContainer.innerHTML = `
    <div class="flex items-center px-4 py-3 rounded-lg border-l-4 ${colors[type]}">
      ${icons[type]}
      <span class="text-sm font-medium">${message}</span>
    </div>
  `
  alertContainer.classList.remove('hidden')
  
  // Auto-ocultar después de 5 segundos
  setTimeout(() => {
    alertContainer.classList.add('hidden')
  }, 5000)
}

// Limpiar todos los alerts
export function clearAlerts() {
  const alerts = ['authAlert', 'forgotPasswordAlert']
  alerts.forEach(alertId => {
    const alert = document.getElementById(alertId)
    if (alert) {
      alert.classList.add('hidden')
      alert.innerHTML = ''
    }
  })
}

// ============================================
// SISTEMA DE LÍMITE DE INTENTOS
// ============================================

interface LoginAttempt {
  count: number
  lockedUntil: number | null
}

const LOGIN_ATTEMPTS_KEY = 'loginAttempts'
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 3 * 60 * 1000 // 3 minutos en milisegundos

export function getLoginAttempts(): LoginAttempt {
  const stored = localStorage.getItem(LOGIN_ATTEMPTS_KEY)
  if (!stored) {
    return { count: 0, lockedUntil: null }
  }
  return JSON.parse(stored)
}

export function incrementLoginAttempts(): void {
  const attempts = getLoginAttempts()
  attempts.count += 1
  
  if (attempts.count >= MAX_ATTEMPTS) {
    attempts.lockedUntil = Date.now() + LOCKOUT_DURATION
  }
  
  localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts))
}

export function resetLoginAttempts(): void {
  localStorage.removeItem(LOGIN_ATTEMPTS_KEY)
}

export function isLoginLocked(): { locked: boolean; remainingTime?: number } {
  const attempts = getLoginAttempts()
  
  if (!attempts.lockedUntil) {
    return { locked: false }
  }
  
  const now = Date.now()
  if (now < attempts.lockedUntil) {
    const remainingMs = attempts.lockedUntil - now
    const remainingMinutes = Math.ceil(remainingMs / 60000)
    return { locked: true, remainingTime: remainingMinutes }
  }
  
  // El bloqueo expiró, resetear
  resetLoginAttempts()
  return { locked: false }
}

// ============================================
// SISTEMA DE "RECORDARME"
// ============================================

const REMEMBER_ME_KEY = 'rememberMe'

export function setRememberMe(remember: boolean): void {
  localStorage.setItem(REMEMBER_ME_KEY, remember.toString())
}

export function getRememberMe(): boolean {
  return localStorage.getItem(REMEMBER_ME_KEY) === 'true'
}

export function clearRememberMe(): void {
  localStorage.removeItem(REMEMBER_ME_KEY)
}

// ============================================
// TOGGLE PASSWORD VISIBILITY
// ============================================

export function setupPasswordToggle(
  toggleBtnId: string,
  inputId: string,
  showIconId: string,
  hideIconId: string
) {
  const toggleBtn = document.getElementById(toggleBtnId)
  const input = document.getElementById(inputId) as HTMLInputElement
  const showIcon = document.getElementById(showIconId)
  const hideIcon = document.getElementById(hideIconId)
  
  if (!toggleBtn || !input || !showIcon || !hideIcon) return
  
  toggleBtn.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text'
      showIcon.classList.add('hidden')
      hideIcon.classList.remove('hidden')
    } else {
      input.type = 'password'
      showIcon.classList.remove('hidden')
      hideIcon.classList.add('hidden')
    }
  })
}

// ============================================
// SPINNER DE LOADING
// ============================================

export function setButtonLoading(buttonId: string, textId: string, spinnerId: string, loading: boolean) {
  const button = document.getElementById(buttonId) as HTMLButtonElement
  const text = document.getElementById(textId)
  const spinner = document.getElementById(spinnerId)
  
  if (!button || !text || !spinner) return
  
  button.disabled = loading
  
  if (loading) {
    text.classList.add('opacity-0')
    spinner.classList.remove('hidden')
  } else {
    text.classList.remove('opacity-0')
    spinner.classList.add('hidden')
  }
}

// ============================================
// MAPEO DE ERRORES DE SUPABASE
// ============================================

export function getAuthErrorMessage(error: any): string {
  const errorCode = error?.code || error?.message || ''
  
  // Errores comunes de Supabase
  if (errorCode.includes('Invalid login credentials') || errorCode.includes('invalid_credentials')) {
    return 'Correo o contraseña incorrectos'
  }
  
  if (errorCode.includes('Email not confirmed')) {
    return 'Tu cuenta no está verificada. Revisa tu correo.'
  }
  
  if (errorCode.includes('User already registered')) {
    return 'El correo ya está registrado'
  }
  
  if (errorCode.includes('Email rate limit exceeded')) {
    return 'Demasiados intentos. Intenta más tarde.'
  }
  
  if (errorCode.includes('User not found')) {
    return 'El usuario no existe'
  }
  
  if (errorCode.includes('Password')) {
    return 'La contraseña no cumple los requisitos'
  }
  
  // Error genérico
  return 'Ocurrió un error. Intenta nuevamente.'
}
