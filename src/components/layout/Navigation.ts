export function Navigation() {
  return `
    <header class="bg-primary-600 dark:bg-primary-900 text-white">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <a href="#" class="text-2xl font-bold">Super Carnes García</a>
          </div>
          
          <div class="hidden md:flex space-x-8">
            <a href="#" class="nav-link active" data-page="home">Inicio</a>
            <a href="#" class="nav-link" data-page="meats">Carnes</a>
            <a href="#" class="nav-link" data-page="products">Productos</a>
            <a href="#" class="nav-link" data-page="offers">Ofertas</a>
          </div>

          <div class="flex items-center space-x-4">
            <button id="searchButton" class="p-2 hover:bg-primary-500 rounded-full">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button id="darkModeToggle" class="p-2 hover:bg-primary-500 rounded-full">
              <svg class="w-6 h-6 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            <button id="loginButton" class="hidden md:block px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
              Iniciar Sesión
            </button>
            <button id="menuButton" class="md:hidden p-2 hover:bg-primary-500 rounded-full">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div id="mobileMenu" class="hidden md:hidden mt-4 pb-4">
          <div class="flex flex-col space-y-4">
            <a href="#" class="nav-link" data-page="home">Inicio</a>
            <a href="#" class="nav-link" data-page="meats">Carnes</a>
            <a href="#" class="nav-link" data-page="products">Productos</a>
            <a href="#" class="nav-link" data-page="offers">Ofertas</a>
            <button class="w-full px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </nav>
    </header>
  `
}