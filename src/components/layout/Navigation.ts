export function Navigation() {
  return `
    <header class="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 dark:from-primary-900 dark:via-primary-800 dark:to-primary-900 text-white shadow-lg sticky top-0 z-50">
      <nav class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between gap-3 sm:gap-4">
          <!-- Logo -->
          <div class="flex items-center space-x-3 min-w-0 flex-shrink">
            <a href="#" id="adminSecretAccess" class="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap truncate max-w-[180px] sm:max-w-none hover:text-primary-100 transition-colors duration-200" title="Doble click para acceso admin">
              Super Carnes García
            </a>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1 lg:space-x-2">
            <a href="#" class="nav-link px-4 py-2 rounded-lg font-medium text-sm lg:text-base hover:bg-white/10 transition-all duration-200 active:bg-white/20" data-page="home">Inicio</a>
            <a href="#" class="nav-link px-4 py-2 rounded-lg font-medium text-sm lg:text-base hover:bg-white/10 transition-all duration-200" data-page="meats">Carnes</a>
            <a href="#" class="nav-link px-4 py-2 rounded-lg font-medium text-sm lg:text-base hover:bg-white/10 transition-all duration-200" data-page="products">Productos</a>
            <a href="#" class="nav-link px-4 py-2 rounded-lg font-medium text-sm lg:text-base hover:bg-white/10 transition-all duration-200" data-page="offers">Ofertas</a>
          </div>

          <!-- Right Controls -->
          <div class="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <!-- Dark Mode Toggle -->
            <button id="darkModeToggle" class="p-2 sm:p-2.5 hover:bg-white/10 active:bg-white/20 rounded-lg transition-all duration-200 flex-shrink-0 group">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 dark:hidden group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg class="w-5 h-5 sm:w-6 sm:h-6 hidden dark:block group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            
            <!-- User Menu Desktop -->
            <div class="relative hidden md:block flex-shrink-0" id="userMenuContainer">
              <button id="userMenuButton" class="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg transition-all duration-200 min-w-0 backdrop-blur-sm">
                <svg class="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span id="userName" class="text-xs lg:text-sm font-medium max-w-[100px] lg:max-w-[150px] truncate"></span>
                <svg class="w-4 h-4 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div id="userDropdown" class="hidden absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 z-50 border border-gray-200 dark:border-gray-700 scale-in">
                <!-- No Auth Buttons -->
                <div id="dropdownAuthButtons" class="hidden">
                  <button id="dropdownLoginButton" class="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                    </svg>
                    <span>Iniciar Sesión</span>
                  </button>
                </div>
                
                <!-- User Info -->
                <div id="dropdownUserInfo" class="hidden">
                  <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white truncate" id="dropdownEmail"></p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 admin-only hidden font-medium">🔑 Administrador</p>
                  </div>
                  <button id="logoutButton" class="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-3 mt-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Mobile Menu Button -->
            <button id="menuButton" class="md:hidden p-2 hover:bg-white/10 active:bg-white/20 rounded-lg transition-all duration-200 flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden md:hidden mt-4 pb-2 slide-down">
          <div class="flex flex-col space-y-2">
            <!-- Mobile Auth Buttons -->
            <div id="mobileAuthButtons" class="hidden border-t border-white/20 pt-3 space-y-2">
              <button id="mobileNavLoginButton" class="w-full px-4 py-2.5 text-sm font-semibold bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg transition-all backdrop-blur-sm">
                Iniciar Sesión
              </button>
              <button id="mobileNavRegisterButton" class="w-full px-4 py-2.5 text-sm font-semibold bg-white text-primary-600 hover:bg-primary-50 active:bg-primary-100 rounded-lg transition-all shadow-md">
                Crear Cuenta
              </button>
            </div>
            
            <!-- Mobile User Info -->
            <div id="mobileUserInfo" class="hidden border-t border-white/20 pt-3">
              <div class="flex items-center justify-between mb-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div class="flex items-center space-x-3 min-w-0 flex-1">
                  <div class="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold truncate" id="mobileUserName"></p>
                    <p class="text-xs text-primary-200 admin-only hidden font-medium">🔑 Administrador</p>
                  </div>
                </div>
                <button id="mobileLogoutButton" class="flex-shrink-0 px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg transition-colors shadow-md">
                  Salir
                </button>
              </div>
            </div>
            
            <!-- Mobile Nav Links -->
            <a href="#" class="nav-link px-4 py-2.5 rounded-lg font-medium hover:bg-white/10 active:bg-white/20 transition-all" data-page="home">🏠 Inicio</a>
            <a href="#" class="nav-link px-4 py-2.5 rounded-lg font-medium hover:bg-white/10 active:bg-white/20 transition-all" data-page="meats">🥩 Carnes</a>
            <a href="#" class="nav-link px-4 py-2.5 rounded-lg font-medium hover:bg-white/10 active:bg-white/20 transition-all" data-page="products">🛒 Productos</a>
            <a href="#" class="nav-link px-4 py-2.5 rounded-lg font-medium hover:bg-white/10 active:bg-white/20 transition-all" data-page="offers">🔥 Ofertas</a>
          </div>
        </div>
      </nav>
    </header>
  `
}