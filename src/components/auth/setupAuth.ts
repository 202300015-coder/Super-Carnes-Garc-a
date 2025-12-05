import { signIn, signUp, resetPassword, updatePassword, getCurrentUser } from '../../auth'
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

  // Cerrar modal de reseteo
  document.getElementById('closeResetPasswordModal')?.addEventListener('click', () => {
    const modal = document.getElementById('resetPasswordModal')
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
  setupPasswordToggle('toggleNewPassword', 'newPassword', 'newPasswordIconShow', 'newPasswordIconHide')
  setupPasswordToggle('toggleConfirmNewPassword', 'confirmNewPassword', 'confirmNewPasswordIconShow', 'confirmNewPasswordIconHide')

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

  // ============================================
  // DETECTAR SI VIENE DESDE EMAIL DE RECUPERACIÓN
  // ============================================
  
  checkPasswordRecoveryHash()

  // ============================================
  // SUBMIT - RESETEO DE CONTRASEÑA
  // ============================================

  document.getElementById('resetPasswordForm')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    clearAlerts()
    clearFieldError('newPassword')
    clearFieldError('confirmNewPassword')
    
    const newPasswordInput = document.getElementById('newPassword') as HTMLInputElement
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword') as HTMLInputElement
    
    const newPassword = newPasswordInput.value
    const confirmNewPassword = confirmNewPasswordInput.value
    
    // Validar campos
    const passwordValidation = validatePassword(newPassword)
    const confirmValidation = validatePasswordMatch(newPassword, confirmNewPassword)
    
    let hasErrors = false
    
    if (!passwordValidation.valid) {
      showFieldError('newPassword', passwordValidation.error)
      hasErrors = true
    }
    
    if (!confirmValidation.valid) {
      showFieldError('confirmNewPassword', confirmValidation.error)
      hasErrors = true
    }
    
    if (hasErrors) return
    
    // Mostrar loading
    setButtonLoading('resetPasswordSubmit', 'resetBtnText', 'resetSpinner', true)
    
    try {
      // NO verificamos sesión aquí porque:
      // 1. El código ya fue intercambiado por exchangeCodeForSession() cuando se cargó la página
      // 2. Si el intercambio falló, el modal ni siquiera se habría abierto
      // 3. Supabase automáticamente usa la sesión temporal del token de recuperación
      
      console.log('🔐 Actualizando contraseña...')
      
      await updatePassword(newPassword)
      
      console.log('✅ Contraseña actualizada exitosamente')
      
      showAlert(
        'resetPasswordAlert',
        '¡Contraseña actualizada exitosamente!',
        'success'
      )
      
      // Limpiar inputs
      newPasswordInput.value = ''
      confirmNewPasswordInput.value = ''
      
      setButtonLoading('resetPasswordSubmit', 'resetBtnText', 'resetSpinner', false)
      
      // Cerrar modal y recargar después de 2 segundos
      setTimeout(() => {
        const modal = document.getElementById('resetPasswordModal')
        modal?.classList.add('hidden')
        modal?.classList.remove('flex')
        
        window.location.reload()
      }, 2000)
      
    } catch (error: any) {
      console.error('❌ Error actualizando contraseña:', error)
      
      // Si hay error de sesión, dar instrucciones claras
      let errorMessage = error.message || getAuthErrorMessage(error)
      
      if (errorMessage.includes('session') || errorMessage.includes('Auth session missing')) {
        errorMessage = 'El enlace ha expirado o ya fue usado. Por favor, solicita un nuevo enlace de recuperación.'
      }
      
      showAlert('resetPasswordAlert', errorMessage, 'error')
      
      setButtonLoading('resetPasswordSubmit', 'resetBtnText', 'resetSpinner', false)
    }
  })

  // Validaciones en tiempo real para reseteo
  document.getElementById('newPassword')?.addEventListener('blur', (e) => {
    const input = e.target as HTMLInputElement
    const validation = validatePassword(input.value)
    
    if (!validation.valid) {
      showFieldError('newPassword', validation.error)
    } else {
      clearFieldError('newPassword')
    }
  })

  document.getElementById('confirmNewPassword')?.addEventListener('blur', (e) => {
    const input = e.target as HTMLInputElement
    const newPasswordInput = document.getElementById('newPassword') as HTMLInputElement
    const validation = validatePasswordMatch(newPasswordInput?.value || '', input.value)
    
    if (!validation.valid) {
      showFieldError('confirmNewPassword', validation.error)
    } else {
      clearFieldError('confirmNewPassword')
    }
  })
}

// ============================================
// FUNCIÓN PARA VERIFICAR SI VIENE DESDE RECUPERACIÓN
// ============================================

async function checkPasswordRecoveryHash() {
  const hash = window.location.hash
  const search = window.location.search
  const fullUrl = window.location.href
  
  console.log('🔍 Verificando URL de recuperación...')
  console.log('🔍 Hash:', hash)
  console.log('🔍 Search:', search)
  console.log('🔍 Full URL:', fullUrl)
  
  // Supabase puede enviar el código de dos formas:
  // 1. Como parámetro de búsqueda: ?code=ABC123
  // 2. En el hash: #access_token=...&type=recovery
  // 3. A veces en el hash como parámetros: #code=ABC123
  
  // Intentar obtener el código de múltiples lugares
  let code = null
  
  // Primero intentar desde search params (?code=...)
  const searchParams = new URLSearchParams(search)
  code = searchParams.get('code')
  
  // Si no está en search, intentar en el hash (#code=... o #?code=...)
  if (!code && hash) {
    // Limpiar el # inicial
    const hashContent = hash.startsWith('#') ? hash.substring(1) : hash
    // Si el hash tiene un ?, quitarlo también
    const hashParams = hashContent.startsWith('?') ? hashContent.substring(1) : hashContent
    const hashUrlParams = new URLSearchParams(hashParams)
    code = hashUrlParams.get('code')
  }
  
  console.log('🔍 Código detectado:', code ? 'SÍ (' + code.substring(0, 10) + '...)' : 'NO')
  
  // MÉTODO NUEVO: Usando código (PKCE flow)
  if (code) {
    console.log('🔑 Detectado código de recuperación de contraseña (PKCE)')
    
    try {
      console.log('🔄 Intercambiando código por sesión...')
      
      const { supabase } = await import('../../lib/supabaseClient')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('❌ Error intercambiando código:', error)
        showAlert('resetPasswordAlert', 'Error al validar el enlace. Por favor, solicita uno nuevo.', 'error')
        // Limpiar la URL
        window.history.replaceState({}, document.title, window.location.pathname)
        return
      }
      
      if (!data.session) {
        console.error('❌ No se obtuvo sesión del código')
        showAlert('resetPasswordAlert', 'Error al validar el enlace. Por favor, solicita uno nuevo.', 'error')
        window.history.replaceState({}, document.title, window.location.pathname)
        return
      }
      
      console.log('✅ Sesión establecida correctamente:', data.session.user.email)
      console.log('✅ Sesión verificada y lista para cambiar contraseña')
      
      // Abrir el modal de reseteo inmediatamente
      const modal = document.getElementById('resetPasswordModal')
      modal?.classList.remove('hidden')
      modal?.classList.add('flex')
      
      // Limpiar la URL
      window.history.replaceState({}, document.title, window.location.pathname)
      
      return
    } catch (error) {
      console.error('❌ Error procesando código de recuperación:', error)
      showAlert('resetPasswordAlert', 'Error al procesar el enlace. Por favor, inténtalo de nuevo.', 'error')
      window.history.replaceState({}, document.title, window.location.pathname)
      return
    }
  }
  
  // MÉTODO ANTIGUO: Usando access_token directo (por compatibilidad)
  if (hash.includes('access_token') || hash.includes('type=recovery')) {
    console.log('🔑 Detectado enlace de recuperación de contraseña (método antiguo)')
    
    try {
      // El hash puede tener múltiples # por nuestra redirección
      // Ejemplo: #reset-password#access_token=...
      // Necesitamos extraer solo la parte después del último #
      let hashParams = hash
      
      // Si hay múltiples #, tomar la parte que contiene access_token
      if (hash.includes('#access_token')) {
        hashParams = hash.substring(hash.indexOf('#access_token') + 1)
      } else {
        // Si no, simplemente quitar el primer #
        hashParams = hash.substring(1)
      }
      
      console.log('🔍 Hash procesado:', hashParams.substring(0, 100) + '...')
      
      // Extraer los parámetros del hash limpio
      const params = new URLSearchParams(hashParams)
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')
      const type = params.get('type')
      
      console.log('🔍 Type:', type)
      console.log('🔍 Access Token:', accessToken ? 'SÍ (presente)' : 'NO')
      
      if (type === 'recovery' && accessToken) {
        console.log('🔄 Estableciendo sesión de recuperación...')
        
        // Establecer la sesión usando los tokens del email
        const { supabase } = await import('../../lib/supabaseClient')
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ''
        })
        
        if (error) {
          console.error('❌ Error estableciendo sesión:', error)
          showAlert('resetPasswordAlert', 'Error al validar el enlace. Por favor, solicita uno nuevo.', 'error')
          return
        }
        
        console.log('✅ Sesión establecida correctamente:', data.session?.user?.email)
        
        // Esperar solo 100ms para que la sesión se propague
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Verificar que la sesión esté activa
        const { data: sessionData } = await supabase.auth.getSession()
        if (!sessionData.session) {
          console.error('❌ No se pudo establecer la sesión')
          showAlert('resetPasswordAlert', 'Error al validar el enlace. Por favor, solicita uno nuevo.', 'error')
          return
        }
        
        console.log('✅ Sesión verificada y lista para cambiar contraseña')
      }
    } catch (error) {
      console.error('❌ Error procesando enlace de recuperación:', error)
      showAlert('resetPasswordAlert', 'Error al procesar el enlace. Por favor, inténtalo de nuevo.', 'error')
      return
    }
    
    // Abrir el modal de reseteo inmediatamente
    const resetModal = document.getElementById('resetPasswordModal')
    resetModal?.classList.remove('hidden')
    resetModal?.classList.add('flex')
    
    // Limpiar el hash de la URL
    history.replaceState(null, '', window.location.pathname)
  }
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
    'forgotEmail',
    'newPassword',
    'confirmNewPassword'
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