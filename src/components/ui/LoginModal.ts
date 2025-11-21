export function LoginModal() {
  return `
    <div id="loginModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
      <div class="container mx-auto px-4 h-full flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-lg">
          <!-- Header -->
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white" id="loginModalTitle">
                Iniciar Sesión
              </h3>
              <button id="closeLoginModal" class="text-gray-400 hover:text-gray-500">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="p-6">
            <div id="loginForm" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                >
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contraseña
                </label>
                <div class="relative mt-1">
                  <input
                    type="password"
                    id="password"
                    class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white pr-10"
                    required
                  >
                  <button
                    type="button"
                    id="togglePassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <span id="passwordIcon">👁️</span>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  >
                  <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Recordarme
                  </label>
                </div>

                <button
                  type="button"
                  id="forgotPassword"
                  class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  id="loginSubmit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Iniciar Sesión
                </button>
              </div>

              <div class="text-center">
                <button
                  type="button"
                  id="switchToRegister"
                  class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>
            </div>

            <!-- Register Form (hidden by default) -->
            <div id="registerForm" class="space-y-6 hidden">
              <div>
                <label for="registerEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="registerEmail"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                >
              </div>

              <div>
                <label for="registerPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contraseña
                </label>
                <div class="relative mt-1">
                  <input
                    type="password"
                    id="registerPassword"
                    class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white pr-10"
                    required
                  >
                  <button
                    type="button"
                    id="toggleRegisterPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <span id="registerPasswordIcon">👁️</span>
                  </button>
                </div>
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirmar Contraseña
                </label>
                <div class="relative mt-1">
                  <input
                    type="password"
                    id="confirmPassword"
                    class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white pr-10"
                    required
                  >
                  <button
                    type="button"
                    id="toggleConfirmPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <span id="confirmPasswordIcon">👁️</span>
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  id="registerSubmit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Registrarse
                </button>
              </div>

              <div class="text-center">
                <button
                  type="button"
                  id="switchToLogin"
                  class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}