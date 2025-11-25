export function LoginModal() {
  return `
    <!-- Login/Register Modal -->
    <div id="loginModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white" id="loginModalTitle">
              Iniciar Sesión
            </h3>
            <button id="closeLoginModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Alert Container -->
        <div id="authAlert" class="hidden mx-6 mt-4"></div>

        <!-- Body -->
        <div class="p-6">
          <!-- LOGIN FORM -->
          <form id="loginForm" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                placeholder="tu@email.com"
                autocomplete="email"
              >
              <p id="emailError" class="mt-1.5 text-sm text-red-600 dark:text-red-400 hidden"></p>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contraseña
              </label>
              <div class="relative">
                <input
                  type="password"
                  id="password"
                  class="w-full px-4 py-2.5 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="••••••••"
                  autocomplete="current-password"
                >
                <button
                  type="button"
                  id="togglePassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg id="passwordIconShow" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg id="passwordIconHide" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p id="passwordError" class="mt-1.5 text-sm text-red-600 dark:text-red-400 hidden"></p>
            </div>

            <div class="flex items-center justify-between pt-2">
              <div class="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors"
                >
                <label for="rememberMe" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Recordarme
                </label>
              </div>

              <button
                type="button"
                id="forgotPassword"
                class="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              id="loginSubmit"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span id="loginBtnText">Iniciar Sesión</span>
              <svg id="loginSpinner" class="hidden ml-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>

            <div class="text-center pt-2">
              <button
                type="button"
                id="switchToRegister"
                class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                ¿No tienes cuenta? <span class="text-primary-600 dark:text-primary-400">Regístrate</span>
              </button>
            </div>
          </form>

          <!-- REGISTER FORM -->
          <form id="registerForm" class="space-y-4 hidden">
            <div>
              <label for="registerUsername" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="registerUsername"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                placeholder="juanperez"
                autocomplete="username"
              >
              <p id="usernameError" class="mt-1.5 text-sm text-red-600 dark:text-red-400 hidden"></p>
            </div>

            <div>
              <label for="registerEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="registerEmail"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                placeholder="tu@email.com"
                autocomplete="email"
              >
              <p id="registerEmailError" class="mt-1.5 text-sm text-red-600 dark:text-red-400 hidden"></p>
            </div>

            <div>
              <label for="registerPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contraseña
              </label>
              <div class="relative">
                <input
                  type="password"
                  id="registerPassword"
                  class="w-full px-4 py-2.5 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="••••••••"
                  autocomplete="new-password"
                >
                <button
                  type="button"
                  id="toggleRegisterPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg id="registerPasswordIconShow" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg id="registerPasswordIconHide" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p id="registerPasswordError" class="mt-1.5 text-sm text-red-600 dark:text-red-400 hidden"></p>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirmar Contraseña
              </label>
              <div class="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  class="w-full px-4 py-2.5 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="••••••••"
                  autocomplete="new-password"
                >
                <button
                  type="button"
                  id="toggleConfirmPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg id="confirmPasswordIconShow" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg id="confirmPasswordIconHide" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p id="confirmPasswordError" class="mt-1.5 text-sm text-red-600 dark:text-red-400 hidden"></p>
            </div>

            <button
              type="submit"
              id="registerSubmit"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span id="registerBtnText">Crear Cuenta</span>
              <svg id="registerSpinner" class="hidden ml-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>

            <div class="text-center pt-2">
              <button
                type="button"
                id="switchToLogin"
                class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                ¿Ya tienes cuenta? <span class="text-primary-600 dark:text-primary-400">Inicia sesión</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div id="forgotPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-xl overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              Recuperar Contraseña
            </h3>
            <button id="closeForgotPasswordModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div id="forgotPasswordAlert" class="hidden mx-6 mt-4"></div>

        <div class="p-6">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>
          
          <form id="forgotPasswordForm" class="space-y-4">
            <div>
              <label for="forgotEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="forgotEmail"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                placeholder="tu@email.com"
                autocomplete="email"
              >
              <p id="forgotEmailError" class="mt-1.5 text-sm text-red-600 dark:text-red-400 hidden"></p>
            </div>

            <button
              type="submit"
              id="forgotPasswordSubmit"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span id="forgotBtnText">Enviar enlace</span>
              <svg id="forgotSpinner" class="hidden ml-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  `
}