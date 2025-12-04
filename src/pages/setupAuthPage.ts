import { supabase } from '../lib/supabaseClient'

export function setupAuthPage() {
  const loginTab = document.getElementById('loginTab')
  const registerTab = document.getElementById('registerTab')
  const loginForm = document.getElementById('loginForm')
  const registerForm = document.getElementById('registerForm')
  const loginFormElement = document.getElementById('loginFormElement') as HTMLFormElement
  const registerFormElement = document.getElementById('registerFormElement') as HTMLFormElement
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn')
  const forgotPasswordModal = document.getElementById('forgotPasswordModal')
  const closeForgotPassword = document.getElementById('closeForgotPassword')
  const forgotPasswordForm = document.getElementById('forgotPasswordForm') as HTMLFormElement

  if (!loginTab || !registerTab || !loginForm || !registerForm) return

  // Toggle password visibility
  const setupPasswordToggle = (toggleId: string, inputId: string, eyeOpenId: string, eyeClosedId: string) => {
    const toggle = document.getElementById(toggleId)
    const input = document.getElementById(inputId) as HTMLInputElement
    const eyeOpen = document.getElementById(eyeOpenId)
    const eyeClosed = document.getElementById(eyeClosedId)

    toggle?.addEventListener('click', () => {
      const isPassword = input.type === 'password'
      input.type = isPassword ? 'text' : 'password'
      eyeOpen?.classList.toggle('hidden')
      eyeClosed?.classList.toggle('hidden')
    })
  }

  setupPasswordToggle('toggleLoginPassword', 'loginPassword', 'loginEyeOpen', 'loginEyeClosed')
  setupPasswordToggle('toggleRegisterPassword', 'registerPassword', 'registerEyeOpen', 'registerEyeClosed')
  setupPasswordToggle('toggleRegisterPasswordConfirm', 'registerPasswordConfirm', 'registerConfirmEyeOpen', 'registerConfirmEyeClosed')

  // Switch tabs
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('border-primary-600', 'text-primary-600')
    loginTab.classList.remove('border-transparent', 'text-gray-500')
    registerTab.classList.remove('border-primary-600', 'text-primary-600')
    registerTab.classList.add('border-transparent', 'text-gray-500')
    loginForm.classList.remove('hidden')
    registerForm.classList.add('hidden')
  })

  registerTab.addEventListener('click', () => {
    registerTab.classList.add('border-primary-600', 'text-primary-600')
    registerTab.classList.remove('border-transparent', 'text-gray-500')
    loginTab.classList.remove('border-primary-600', 'text-primary-600')
    loginTab.classList.add('border-transparent', 'text-gray-500')
    registerForm.classList.remove('hidden')
    loginForm.classList.add('hidden')
  })

  // Login form submit
  loginFormElement?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(loginFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const errorDiv = document.getElementById('loginError')

    if (!errorDiv) return

    errorDiv.classList.add('hidden')

    try {
      const submitBtn = loginFormElement.querySelector('button[type="submit"]') as HTMLButtonElement
      submitBtn.disabled = true
      submitBtn.innerHTML = '<span class="animate-spin">⏳</span> Iniciando sesión...'

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      if (data.user) {
        // Get user profile to check role
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        console.log('✅ Login exitoso:', { email, role: profile?.role })
        
        // FORZAR recarga completa de la página para limpiar cache
        localStorage.setItem('force_role_refresh', 'true')
        window.location.href = window.location.origin + window.location.pathname
      }

    } catch (error: any) {
      console.error('❌ Error en login:', error)
      errorDiv.textContent = error.message === 'Invalid login credentials' 
        ? 'Email o contraseña incorrectos'
        : error.message
      errorDiv.classList.remove('hidden')
      
      const submitBtn = loginFormElement.querySelector('button[type="submit"]') as HTMLButtonElement
      submitBtn.disabled = false
      submitBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
        </svg>
        <span>Iniciar Sesión</span>
      `
    }
  })

  // Register form submit
  registerFormElement?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(registerFormElement)
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const passwordConfirm = formData.get('passwordConfirm') as string
    const errorDiv = document.getElementById('registerError')
    const successDiv = document.getElementById('registerSuccess')

    if (!errorDiv || !successDiv) return

    errorDiv.classList.add('hidden')
    successDiv.classList.add('hidden')

    // Validate passwords match
    if (password !== passwordConfirm) {
      errorDiv.textContent = 'Las contraseñas no coinciden'
      errorDiv.classList.remove('hidden')
      return
    }

    try {
      const submitBtn = registerFormElement.querySelector('button[type="submit"]') as HTMLButtonElement
      submitBtn.disabled = true
      submitBtn.innerHTML = '<span class="animate-spin">⏳</span> Creando cuenta...'

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'user' // Default role
          },
          emailRedirectTo: undefined // Desactivar confirmación por email
        }
      })

      if (error) throw error

      if (data.user) {
        console.log('✅ Usuario creado:', data.user.email)
        
        // Verificar si el usuario fue confirmado automáticamente
        if (!data.user.email_confirmed_at) {
          // Si no está confirmado, mostrar mensaje personalizado
          successDiv.textContent = '✅ Cuenta creada. Revisa tu email para confirmarla o contacta al administrador.'
        } else {
          successDiv.textContent = '✅ Cuenta creada exitosamente. Ya puedes iniciar sesión.'
        }
        
        successDiv.classList.remove('hidden')
        registerFormElement.reset()

        // Switch to login tab after 2 seconds
        setTimeout(() => {
          loginTab?.click()
        }, 2000)
      }

      submitBtn.disabled = false
      submitBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
        </svg>
        <span>Crear Cuenta</span>
      `

    } catch (error: any) {
      console.error('❌ Error en registro:', error)
      errorDiv.textContent = error.message === 'User already registered'
        ? 'Este email ya está registrado'
        : error.message
      errorDiv.classList.remove('hidden')

      const submitBtn = registerFormElement.querySelector('button[type="submit"]') as HTMLButtonElement
      submitBtn.disabled = false
      submitBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
        </svg>
        <span>Crear Cuenta</span>
      `
    }
  })

  // Forgot password modal
  forgotPasswordBtn?.addEventListener('click', () => {
    forgotPasswordModal?.classList.remove('hidden')
  })

  closeForgotPassword?.addEventListener('click', () => {
    forgotPasswordModal?.classList.add('hidden')
  })

  forgotPasswordModal?.addEventListener('click', (e) => {
    if (e.target === forgotPasswordModal) {
      forgotPasswordModal.classList.add('hidden')
    }
  })

  // Forgot password form submit
  forgotPasswordForm?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(forgotPasswordForm)
    const email = formData.get('email') as string
    const errorDiv = document.getElementById('forgotError')
    const successDiv = document.getElementById('forgotSuccess')

    if (!errorDiv || !successDiv) return

    errorDiv.classList.add('hidden')
    successDiv.classList.add('hidden')

    try {
      const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]') as HTMLButtonElement
      submitBtn.disabled = true
      submitBtn.textContent = 'Enviando...'

      // Usar la URL actual sin especificar redirectTo
      // Supabase redirigirá automáticamente a la URL del sitio
      const { error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) throw error

      successDiv.textContent = '✅ Se ha enviado un enlace de recuperación a tu email'
      successDiv.classList.remove('hidden')
      forgotPasswordForm.reset()

      submitBtn.disabled = false
      submitBtn.textContent = 'Enviar Enlace'

    } catch (error: any) {
      console.error('❌ Error en recuperación:', error)
      errorDiv.textContent = error.message
      errorDiv.classList.remove('hidden')

      const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]') as HTMLButtonElement
      submitBtn.disabled = false
      submitBtn.textContent = 'Enviar Enlace'
    }
  })
}
