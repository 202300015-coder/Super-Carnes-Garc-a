import { signIn, signUp, resetPassword, getCurrentUser } from '../../auth'
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePasswordMatch,
  showFieldError,
  clearFieldError,
  showAlert,
  clearAlerts,
  getLoginAttempts,
  incrementLoginAttempts,
  resetLoginAttempts,
  isLoginLocked,
  setRememberMe,
  setupPasswordToggle,
  setButtonLoading,
  getAuthErrorMessage
} from './authHelpers'

export function setupAuth() {
  console.log('🔐 Configurando sistema de autenticación mejorado...')
  
  // ============================================
  // ABRIR/CERRAR MODALES
  // ============================================
  
  // Abrir modal de login
  document.getElementById('loginButton')?.addEventListener('click', () => {
    clearAlerts()
    clearAllFieldErrors()
    const modal = document.getElementById('loginModal')
    modal?.classList.remove('hidden')
    modal?.classList.add('flex')
  })

  // Cerrar modal de login
  document.getElementById('closeLoginModal')?.addEventListener('click', () => {
    const modal = document.getElementById('loginModal')
    modal?.classList.add('hidden')
    modal?.classList.remove('flex')
    clearAlerts()
    clearAllFieldErrors()
  })
  
  // Abrir modal de recuperación
  document.getElementById('forgotPassword')?.addEventListener('click', () => {
    const loginModal = document.getElementById('loginModal')
    const forgotModal = document.getElementById('forgotPasswordModal')
    
    loginModal?.classList.add('hidden')
    loginModal?.classList.remove('flex')
    
    clearAlerts()
    forgotModal?.classList.remove('hidden')
    forgotModal?.classList.add('flex')
    
    // Pre-llenar el email si existe
    const emailInput = document.getElementById('email') as HTMLInputElement
    const forgotEmailInput = document.getElementById('forgotEmail') as HTMLInputElement
    if (emailInput?.value && forgotEmailInput) {
      forgotEmailInput.value = emailInput.value
    }
  })
  
  // Cerrar modal de recuperación
  document.getElementById('closeForgotPasswordModal')?.addEventListener('click', () => {
    const modal = document.getElementById('forgotPasswordModal')
    modal?.classList.add('hidden')
    modal?.classList.remove('flex')
    clearAlerts()
  })

  // ============================================
  // TOGGLES DE VISIBILIDAD DE CONTRASEÑA
  // ============================================
  
  setupPasswordToggle('togglePassword', 'password', 'passwordIconShow', 'passwordIconHide')
  setupPasswordToggle('toggleRegisterPassword', 'registerPassword', 'registerPasswordIconShow', 'registerPasswordIconHide')
  setupPasswordToggle('toggleConfirmPassword', 'confirmPassword', 'confirmPasswordIconShow', 'confirmPasswordIconHide')

  // ============================================
  // SWITCH ENTRE LOGIN Y REGISTRO
  // ============================================
  
  document.getElementById('switchToRegister')?.addEventListener('click', () => {
    document.getElementById('loginForm')?.classList.add('hidden')
    document.getElementById('registerForm')?.classList.remove('hidden')
    document.getElementById('loginModalTitle')!.textContent = 'Crear Cuenta'
    clearAlerts()
    clearAllFieldErrors()
  })

  document.getElementById('switchToLogin')?.addEventListener('click', () => {
    document.getElementById('registerForm')?.classList.add('hidden')
    document.getElementById('loginForm')?.classList.remove('hidden')
    document.getElementById('loginModalTitle')!.textContent = 'Iniciar Sesión'
    clearAlerts()
    clearAllFieldErrors()
  })

  // ============================================
  // VALIDACIONES EN TIEMPO REAL
  // ============================================
  
  // Login - Email
  document.getElementById('email')?.addEventListener('blur', (e) => {
    const input = e.target as HTMLInputElement
    const validation = validateEmail(input.value)
    
    if (!validation.valid) {
      showFieldError('email', validation.error)
    } else {
      clearFieldError('email')
    }
  })
  
  // Login - Password
  document.getElementById('password')?.addEventListener('blur', (e) => {
    const input = e.target as HTMLInputElement
    const validation = validatePassword(input.value)
    
    if (!validation.valid) {
      showFieldError('password', validation.error)
    } else {
      clearFieldError('password')
    }
  })
  
  // Register - Username
  document.getElementById('registerUsername')?.addEventListener('blur', (e) => {
    const input = e.target as HTMLInputElement
    const validation = validateUsername(input.value)
    
    if (!validation.valid) {
      showFieldError('registerUsername', validation.error)
    } else {
      clearFieldError('registerUsername')
    }
  })
  
  // Register - Email
  document.getElementById('registerEmail')?.addEventListener('blur', (e) => {
    const input = e.target as HTMLInputElement
    const validation = validateEmail(input.value)
    
    if (!validation.valid) {
      showFieldError('registerEmail', validation.error)
    } else {
      clearFieldError('registerEmail')
    }
  })
  
  // Register - Password
  document.getElementById('registerPassword')?.addEventListener('blur', (e) => {
    const input = e.target as HTMLInputElement
    const validation = validatePassword(input.value)
    
    if (!validation.valid) {
      showFieldError('registerPassword', validation.error)
    } else {
      clearFieldError('registerPassword')
    }
  })
  
  // Register - Confirm Password
  document.getElementById('confirmPassword')?.addEventListener('blur', (e) => {
    const input = e.target as HTMLInputElement
    const passwordInput = document.getElementById('registerPassword') as HTMLInputElement
    const validation = validatePasswordMatch(passwordInput?.value || '', input.value)
    
    if (!validation.valid) {
      showFieldError('confirmPassword', validation.error)
    } else {
      clearFieldError('confirmPassword')
    }
  })
  
  // Forgot Password - Email
  document.getElementById('forgotEmail')?.addEventListener('blur', (e) => {
    const input = e.target as HTMLInputElement
    const validation = validateEmail(input.value)
    
    if (!validation.valid) {
      showFieldError('forgotEmail', validation.error)
    } else {
      clearFieldError('forgotEmail')
    }
  })

  // ============================================
  // SUBMIT - LOGIN
  // ============================================
  
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    // Limpiar errores y alerts previos
    clearAlerts()
    clearAllFieldErrors()
    
    // Verificar límite de intentos
    const lockStatus = isLoginLocked()
    if (lockStatus.locked) {
      showAlert('authAlert', `Demasiados intentos fallidos. Inténtalo de nuevo en ${lockStatus.remainingTime} minutos.`, 'error')
      return
    }
    
    // Obtener valores
    const emailInput = document.getElementById('email') as HTMLInputElement
    const passwordInput = document.getElementById('password') as HTMLInputElement
    const rememberMeCheckbox = document.getElementById('rememberMe') as HTMLInputElement
    
    const email = emailInput.value.trim()
    const password = passwordInput.value
    const rememberMe = rememberMeCheckbox.checked
    
    // Validar campos
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)
    
    let hasErrors = false
    
    if (!emailValidation.valid) {
      showFieldError('email', emailValidation.error)
      hasErrors = true
    }
    
    if (!passwordValidation.valid) {
      showFieldError('password', passwordValidation.error)
      hasErrors = true
    }
    
    if (hasErrors) return
    
    // Mostrar loading
    setButtonLoading('loginSubmit', 'loginBtnText', 'loginSpinner', true)
    
    try {
      const data = await signIn(email, password)
      console.log('✅ Usuario logueado:', data)
      
      // Login exitoso - resetear intentos
      resetLoginAttempts()
      
      // Guardar preferencia de "recordarme"
      setRememberMe(rememberMe)
      
      // Solicitar permiso para notificaciones
      if ('Notification' in window && Notification.permission === 'default') {
        await requestNotificationPermission()
      }
      
      // Cerrar modal y recargar
      const modal = document.getElementById('loginModal')
      modal?.classList.add('hidden')
      modal?.classList.remove('flex')
      
      showAlert('authAlert', '¡Bienvenido! Iniciando sesión...', 'success')
      
      setTimeout(() => {
        window.location.reload()
      }, 500)
      
    } catch (error: any) {
      console.error('❌ Error en login:', error)
      
      // Incrementar contador de intentos fallidos
      incrementLoginAttempts()
      
      const attempts = getLoginAttempts()
      const remainingAttempts = Math.max(0, 5 - attempts.count)
      
      const errorMessage = getAuthErrorMessage(error)
      
      if (remainingAttempts > 0 && remainingAttempts < 3) {
        showAlert('authAlert', `${errorMessage}. Te quedan ${remainingAttempts} intentos.`, 'error')
      } else {
        showAlert('authAlert', errorMessage, 'error')
      }
      
      setButtonLoading('loginSubmit', 'loginBtnText', 'loginSpinner', false)
    }
  })

  // ============================================
  // SUBMIT - REGISTRO
  // ============================================
  
  document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    clearAlerts()
    clearAllFieldErrors()
    
    // Obtener valores
    const usernameInput = document.getElementById('registerUsername') as HTMLInputElement
    const emailInput = document.getElementById('registerEmail') as HTMLInputElement
    const passwordInput = document.getElementById('registerPassword') as HTMLInputElement
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement
    
    const username = usernameInput.value.trim()
    const email = emailInput.value.trim()
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value
    
    // Validar todos los campos
    const usernameValidation = validateUsername(username)
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)
    const confirmValidation = validatePasswordMatch(password, confirmPassword)
    
    let hasErrors = false
    
    if (!usernameValidation.valid) {
      showFieldError('registerUsername', usernameValidation.error)
      hasErrors = true
    }
    
    if (!emailValidation.valid) {
      showFieldError('registerEmail', emailValidation.error)
      hasErrors = true
    }
    
    if (!passwordValidation.valid) {
      showFieldError('registerPassword', passwordValidation.error)
      hasErrors = true
    }
    
    if (!confirmValidation.valid) {
      showFieldError('confirmPassword', confirmValidation.error)
      hasErrors = true
    }
    
    if (hasErrors) return
    
    // Mostrar loading
    setButtonLoading('registerSubmit', 'registerBtnText', 'registerSpinner', true)
    
    try {
      // Guardar username en metadata del usuario
      const data = await signUp(email, password, username)
      console.log('✅ Usuario registrado:', data)
      
      // Solicitar permiso para notificaciones inmediatamente
      if ('Notification' in window && Notification.permission === 'default') {
        await requestNotificationPermission()
      }
      
      showAlert('authAlert', '¡Cuenta creada! Revisa tu correo para confirmar tu cuenta.', 'success')
      
      // Limpiar formulario
      usernameInput.value = ''
      emailInput.value = ''
      passwordInput.value = ''
      confirmPasswordInput.value = ''
      
      setButtonLoading('registerSubmit', 'registerBtnText', 'registerSpinner', false)
      
      // Volver al login después de 3 segundos
      setTimeout(() => {
        document.getElementById('switchToLogin')?.click()
      }, 3000)
      
    } catch (error: any) {
      console.error('❌ Error en registro:', error)
      
      const errorMessage = getAuthErrorMessage(error)
      showAlert('authAlert', errorMessage, 'error')
      
      setButtonLoading('registerSubmit', 'registerBtnText', 'registerSpinner', false)
    }
  })

  // ============================================
  // SUBMIT - RECUPERACIÓN DE CONTRASEÑA
  // ============================================
  
  document.getElementById('forgotPasswordForm')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    clearAlerts()
    clearFieldError('forgotEmail')
    
    const emailInput = document.getElementById('forgotEmail') as HTMLInputElement
    const email = emailInput.value.trim()
    
    // Validar email
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      showFieldError('forgotEmail', emailValidation.error)
      return
    }
    
    // Mostrar loading
    setButtonLoading('forgotPasswordSubmit', 'forgotBtnText', 'forgotSpinner', true)
    
    try {
      await resetPassword(email)
      
      showAlert(
        'forgotPasswordAlert',
        'Si este correo existe, te enviamos un enlace para restablecer tu contraseña.',
        'success'
      )
      
      // Limpiar input
      emailInput.value = ''
      
      setButtonLoading('forgotPasswordSubmit', 'forgotBtnText', 'forgotSpinner', false)
      
      // Volver al login después de 4 segundos
      setTimeout(() => {
        const forgotModal = document.getElementById('forgotPasswordModal')
        const loginModal = document.getElementById('loginModal')
        
        forgotModal?.classList.add('hidden')
        forgotModal?.classList.remove('flex')
        
        loginModal?.classList.remove('hidden')
        loginModal?.classList.add('flex')
      }, 4000)
      
    } catch (error: any) {
      console.error('❌ Error en recuperación:', error)
      
      // Por seguridad, siempre mostrar el mismo mensaje
      showAlert(
        'forgotPasswordAlert',
        'Si este correo existe, te enviamos un enlace para restablecer tu contraseña.',
        'info'
      )
      
      setButtonLoading('forgotPasswordSubmit', 'forgotBtnText', 'forgotSpinner', false)
    }
  })

  // ============================================
  // VERIFICAR SESIÓN ACTUAL
  // ============================================
  
  getCurrentUser().then(user => {
    if (user) {
      console.log('👤 Usuario autenticado:', user.email)
    }
  })
}

// ============================================
// FUNCIÓN AUXILIAR PARA LIMPIAR TODOS LOS ERRORES
// ============================================

function clearAllFieldErrors() {
  const errorFields = [
    'email',
    'password',
    'registerUsername',
    'registerEmail',
    'registerPassword',
    'confirmPassword',
    'forgotEmail'
  ]
  
  errorFields.forEach(field => clearFieldError(field))
}

// ============================================
// SISTEMA DE NOTIFICACIONES PUSH
// ============================================

async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('❌ Este navegador no soporta notificaciones')
    return false
  }
  
  try {
    const permission = await Notification.requestPermission()
    
    if (permission === 'granted') {
      console.log('✅ Permiso de notificaciones concedido')
      
      // Guardar token de notificación (si usas Firebase Cloud Messaging)
      // TODO: Implementar registro de token con FCM si se requiere
      
      // Mostrar notificación de bienvenida
      new Notification('¡Bienvenido a Super Carnes García!', {
        body: 'Ahora recibirás notificaciones sobre ofertas y nuevos productos.',
        icon: '/images/logo.png',
        badge: '/images/badge.png',
        tag: 'welcome',
        requireInteraction: false
      })
      
      return true
    } else {
      console.log('⚠️ Permiso de notificaciones denegado')
      return false
    }
  } catch (error) {
    console.error('❌ Error solicitando permiso de notificaciones:', error)
    return false
  }
}

// Función global para enviar notificaciones (usar desde consola o admin)
export function sendNotification(title: string, body: string, tag?: string) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/images/logo.png',
      badge: '/images/badge.png',
      tag: tag || 'promo',
      requireInteraction: false
    })
  } else {
    console.log('⚠️ No se pueden enviar notificaciones (permiso no concedido)')
  }
}

// Exponer función globalmente para testing
;(window as any).sendNotification = sendNotification