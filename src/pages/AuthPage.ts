export function renderAuthPage() {
  return `
    <div class="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
      <div class="max-w-md w-full">
        <!-- Logo y Título -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Super Carnes García</h1>
          <p class="text-primary-100">La mejor calidad en carnes</p>
        </div>

        <!-- Tabs de Login/Register -->
        <div class="bg-white rounded-t-lg shadow-xl">
          <div class="flex border-b border-gray-200">
            <button 
              id="loginTab" 
              class="flex-1 py-4 px-6 text-center font-semibold transition-colors border-b-2 border-primary-600 text-primary-600"
            >
              Iniciar Sesión
            </button>
            <button 
              id="registerTab" 
              class="flex-1 py-4 px-6 text-center font-semibold transition-colors border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            >
              Crear Cuenta
            </button>
          </div>

          <!-- Login Form -->
          <div id="loginForm" class="p-8">
            <form id="loginFormElement" class="space-y-6">
              <div>
                <label for="loginEmail" class="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input 
                  type="email" 
                  id="loginEmail" 
                  name="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="tu@email.com"
                >
              </div>

              <div>
                <label for="loginPassword" class="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input 
                  type="password" 
                  id="loginPassword" 
                  name="password"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                >
              </div>

              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                  <span class="ml-2 text-sm text-gray-600">Recordarme</span>
                </label>
                <button 
                  type="button" 
                  id="forgotPasswordBtn"
                  class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button 
                type="submit"
                class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                <span>Iniciar Sesión</span>
              </button>

              <div id="loginError" class="hidden p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"></div>
            </form>

            <!-- Demo Credentials -->
            <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p class="text-xs font-semibold text-blue-900 mb-2">🔑 Credenciales de prueba:</p>
              <div class="text-xs text-blue-800 space-y-1">
                <p><strong>Admin:</strong> admin@supercarnes.com</p>
                <p><strong>Pass:</strong> Admin2025$uper</p>
              </div>
            </div>
          </div>

          <!-- Register Form -->
          <div id="registerForm" class="p-8 hidden">
            <form id="registerFormElement" class="space-y-6">
              <div>
                <label for="registerName" class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input 
                  type="text" 
                  id="registerName" 
                  name="fullName"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Juan Pérez"
                >
              </div>

              <div>
                <label for="registerEmail" class="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input 
                  type="email" 
                  id="registerEmail" 
                  name="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="tu@email.com"
                >
              </div>

              <div>
                <label for="registerPassword" class="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input 
                  type="password" 
                  id="registerPassword" 
                  name="password"
                  required
                  minlength="6"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Mínimo 6 caracteres"
                >
                <p class="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
              </div>

              <div>
                <label for="registerPasswordConfirm" class="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <input 
                  type="password" 
                  id="registerPasswordConfirm" 
                  name="passwordConfirm"
                  required
                  minlength="6"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Repite tu contraseña"
                >
              </div>

              <label class="flex items-start">
                <input type="checkbox" required class="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                <span class="ml-2 text-sm text-gray-600">
                  Acepto los términos y condiciones y la política de privacidad
                </span>
              </label>

              <button 
                type="submit"
                class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                <span>Crear Cuenta</span>
              </button>

              <div id="registerError" class="hidden p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"></div>
              <div id="registerSuccess" class="hidden p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"></div>
            </form>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-8 text-primary-100 text-sm">
          <p>© 2025 Super Carnes García. Todos los derechos reservados.</p>
        </div>
      </div>

      <!-- Forgot Password Modal -->
      <div id="forgotPasswordModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900">Recuperar Contraseña</h3>
            <button id="closeForgotPassword" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form id="forgotPasswordForm" class="space-y-6">
            <div>
              <label for="forgotEmail" class="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input 
                type="email" 
                id="forgotEmail" 
                name="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="tu@email.com"
              >
              <p class="mt-2 text-sm text-gray-600">
                Te enviaremos un enlace para restablecer tu contraseña
              </p>
            </div>

            <button 
              type="submit"
              class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Enviar Enlace
            </button>

            <div id="forgotError" class="hidden p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"></div>
            <div id="forgotSuccess" class="hidden p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"></div>
          </form>
        </div>
      </div>
    </div>
  `
}
