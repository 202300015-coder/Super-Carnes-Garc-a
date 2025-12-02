export function Navigation() {
  return `
    <header class="bg-primary-600 dark:bg-primary-900 text-white">
      <nav class="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div class="flex items-center justify-between gap-2 sm:gap-4">
          <!-- Logo - flexible, puede comprimirse -->
          <div class="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink">
            <a href="#" id="adminSecretAccess" class="text-base sm:text-xl md:text-2xl font-bold whitespace-nowrap truncate max-w-[180px] sm:max-w-none" title="Doble click para acceso admin">Super Carnes García</a>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex space-x-8">
            <a href="#" class="nav-link active" data-page="home">Inicio</a>
            <a href="#" class="nav-link" data-page="meats">Carnes</a>
            <a href="#" class="nav-link" data-page="products">Productos</a>
            <a href="#" class="nav-link" data-page="offers">Ofertas</a>
          </div>

          <!-- Right side controls - ancho fijo para prevenir desbordamiento -->
          <div class="flex items-center space-x-1 sm:space-x-2 md:space-x-4 flex-shrink-0">
            <!-- Dark mode toggle -->
            <button id="darkModeToggle" class="p-1.5 sm:p-2 hover:bg-primary-500 rounded-full flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg class="w-5 h-5 sm:w-6 sm:h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            
            <!-- Botones de Login/Registro (cuando NO hay sesión) - DESHABILITADOS -->
            <!-- <div id="authButtons" class="hidden items-center space-x-2 flex-shrink-0">
              <button id="navLoginButton" class="px-4 py-2 text-sm font-medium bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors border border-white border-opacity-30">
                Iniciar Sesión
              </button>
              <button id="navRegisterButton" class="px-4 py-2 text-sm font-medium bg-white text-primary-600 hover:bg-opacity-90 rounded-lg transition-colors shadow-md">
                Crear Cuenta
              </button>
            </div> -->
            
            <!-- User Menu - Solo cuando HAY sesión -->
            <div class="relative hidden md:block flex-shrink-0" id="userMenuContainer">
              <button id="userMenuButton" class="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors min-w-0">
                <svg class="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span id="userName" class="text-xs lg:text-sm font-medium max-w-[100px] lg:max-w-[150px] truncate"></span>
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div id="userDropdown" class="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                <!-- Opciones cuando NO hay sesión -->
                <div id="dropdownAuthButtons" class="hidden">
                  <button id="dropdownLoginButton" class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                    </svg>
                    <span>Iniciar Sesión</span>
                  </button>
                </div>
                
                <!-- Info de usuario cuando HAY sesión -->
                <div id="dropdownUserInfo" class="hidden">
                  <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate" id="dropdownEmail"></p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 admin-only hidden">Administrador</p>
                  </div>
                  <button id="logoutButton" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Mobile menu button - siempre visible, ancho fijo -->
            <button id="menuButton" class="md:hidden p-2 hover:bg-primary-500 rounded-full flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div id="mobileMenu" class="hidden md:hidden mt-4 pb-4">
          <div class="flex flex-col space-y-4">
            <!-- Botones de autenticación en mobile (cuando NO hay sesión) -->
            <div id="mobileAuthButtons" class="hidden border-t border-primary-500 pt-4 space-y-2">
              <button id="mobileNavLoginButton" class="w-full px-4 py-2 text-sm font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors">
                Iniciar Sesión
              </button>
              <button id="mobileNavRegisterButton" class="w-full px-4 py-2 text-sm font-medium bg-white text-primary-600 hover:bg-opacity-90 rounded-lg transition-colors">
                Crear Cuenta
              </button>
            </div>
            
            <!-- User info en mobile cuando está logueado -->
            <div id="mobileUserInfo" class="hidden border-t border-primary-500 pt-4">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3 min-w-0 flex-1">
                  <svg class="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium truncate" id="mobileUserName"></p>
                    <p class="text-xs text-primary-200 admin-only hidden">Administrador</p>
                  </div>
                </div>
                <button id="mobileLogoutButton" class="flex-shrink-0 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded-lg">
                  Salir
                </button>
              </div>
            </div>
            
            <a href="#" class="nav-link" data-page="home">Inicio</a>
            <a href="#" class="nav-link" data-page="meats">Carnes</a>
            <a href="#" class="nav-link" data-page="products">Productos</a>
            <a href="#" class="nav-link" data-page="offers">Ofertas</a>
          </div>
        </div>
      </nav>
    </header>
  `
}