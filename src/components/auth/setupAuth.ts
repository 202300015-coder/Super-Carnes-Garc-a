import { signIn, signUp, resetPassword, getCurrentUser } from '../../auth'

export function setupAuth() {
  // Event Listeners para el modal de login
  document.getElementById('loginButton')?.addEventListener('click', () => {
    document.getElementById('loginModal')?.classList.remove('hidden')
  })

  document.getElementById('closeLoginModal')?.addEventListener('click', () => {
    document.getElementById('loginModal')?.classList.add('hidden')
  })

  // 👁️ Toggle password visibility - Login
  document.getElementById('togglePassword')?.addEventListener('click', () => {
    const passwordInput = document.getElementById('password') as HTMLInputElement
    const passwordIcon = document.getElementById('passwordIcon')!
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
      passwordIcon.textContent = '👁️‍🗨️'
    } else {
      passwordInput.type = 'password'
      passwordIcon.textContent = '👁️'
    }
  })

  // 👁️ Toggle password visibility - Register Password
  document.getElementById('toggleRegisterPassword')?.addEventListener('click', () => {
    const passwordInput = document.getElementById('registerPassword') as HTMLInputElement
    const passwordIcon = document.getElementById('registerPasswordIcon')!
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
      passwordIcon.textContent = '👁️‍🗨️'
    } else {
      passwordInput.type = 'password'
      passwordIcon.textContent = '👁️'
    }
  })

  // 👁️ Toggle password visibility - Confirm Password
  document.getElementById('toggleConfirmPassword')?.addEventListener('click', () => {
    const passwordInput = document.getElementById('confirmPassword') as HTMLInputElement
    const passwordIcon = document.getElementById('confirmPasswordIcon')!
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
      passwordIcon.textContent = '👁️‍🗨️'
    } else {
      passwordInput.type = 'password'
      passwordIcon.textContent = '👁️'
    }
  })

  // Switch entre formularios
  document.getElementById('switchToRegister')?.addEventListener('click', () => {
    document.getElementById('loginForm')?.classList.add('hidden')
    document.getElementById('registerForm')?.classList.remove('hidden')
    document.getElementById('loginModalTitle')!.textContent = 'Registro'
  })

  document.getElementById('switchToLogin')?.addEventListener('click', () => {
    document.getElementById('registerForm')?.classList.add('hidden')
    document.getElementById('loginForm')?.classList.remove('hidden')
    document.getElementById('loginModalTitle')!.textContent = 'Iniciar Sesión'
  })

  // Login Submit
  document.getElementById('loginSubmit')?.addEventListener('click', async (e) => {
    e.preventDefault()
    const email = (document.getElementById('email') as HTMLInputElement).value
    const password = (document.getElementById('password') as HTMLInputElement).value

    try {
      const data = await signIn(email, password)
      console.log('✅ Usuario logueado:', data)
      document.getElementById('loginModal')?.classList.add('hidden')
      window.location.reload()
    } catch (error: any) {
      console.error('❌ Error:', error.message)
      alert('Error al iniciar sesión: ' + error.message)
    }
  })

  // Register Submit
  document.getElementById('registerSubmit')?.addEventListener('click', async (e) => {
    e.preventDefault()
    const email = (document.getElementById('registerEmail') as HTMLInputElement).value
    const password = (document.getElementById('registerPassword') as HTMLInputElement).value
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    try {
      const data = await signUp(email, password)
      console.log('✅ Usuario registrado:', data)
      document.getElementById('loginModal')?.classList.add('hidden')
      alert('Revisa tu correo para confirmar tu cuenta')
    } catch (error: any) {
      console.error('❌ Error:', error.message)
      alert('Error al registrar: ' + error.message)
    }
  })

  // Forgot Password
  document.getElementById('forgotPassword')?.addEventListener('click', async () => {
    const email = (document.getElementById('email') as HTMLInputElement).value
    if (!email) {
      alert('Por favor, ingresa tu correo electrónico')
      return
    }

    try {
      await resetPassword(email)
      alert('Revisa tu correo para restablecer tu contraseña')
    } catch (error: any) {
      console.error('❌ Error:', error.message)
      alert('Error al enviar el correo: ' + error.message)
    }
  })

  // Check current session
  getCurrentUser().then(user => {
    if (user) {
      console.log('Usuario actual:', user)
      document.body.classList.add('user-logged-in')
      // Mostrar elementos para usuarios autenticados
      document.querySelectorAll('.admin-only').forEach(el => {
        el.classList.remove('hidden')
      })
    }
  })
}