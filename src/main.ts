import './input.css'

// Inicializar el modo oscuro
const isDarkMode = localStorage.getItem('darkMode') === 'true'
if (isDarkMode) {
  document.documentElement.classList.add('dark')
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Header -->
    <header class="bg-primary-600 dark:bg-primary-900 text-white">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <a href="#" class="text-2xl font-bold">Super Carnes García</a>
          </div>
          
          <div class="hidden md:flex space-x-8">
            <a href="#" class="hover:text-primary-200 transition-colors">Inicio</a>
            <a href="#carnes" class="hover:text-primary-200 transition-colors">Carnes</a>
            <a href="#productos" class="hover:text-primary-200 transition-colors">Productos</a>
            <a href="#ofertas" class="hover:text-primary-200 transition-colors">Ofertas</a>
          </div>

          <div class="flex items-center space-x-4">
            <button id="searchButton" class="p-2 hover:bg-primary-500 rounded-full">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button id="darkModeToggle" class="p-2 hover:bg-primary-500 rounded-full">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
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
            <a href="#" class="hover:text-primary-200 transition-colors">Inicio</a>
            <a href="#carnes" class="hover:text-primary-200 transition-colors">Carnes</a>
            <a href="#productos" class="hover:text-primary-200 transition-colors">Productos</a>
            <a href="#ofertas" class="hover:text-primary-200 transition-colors">Ofertas</a>
          </div>
        </div>
      </nav>
    </header>

    <!-- Search Modal -->
    <div id="searchModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50">
      <div class="container mx-auto px-4 h-full flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-lg shadow-lg">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Buscar</h3>
            <button id="closeSearch" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-4">
            <input type="text" 
                   id="searchInput" 
                   class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" 
                   placeholder="Buscar productos...">
            <div id="searchResults" class="mt-4 space-y-2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <section class="relative bg-primary-600 rounded-lg overflow-hidden mb-12">
        <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 opacity-90"></div>
        <div class="relative z-10 px-8 py-16 text-white">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Bienvenidos a Super Carnes García</h1>
          <p class="text-xl mb-8">La mejor calidad en carnes para su mesa</p>
          <a href="#productos" class="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            Ver Productos
          </a>
        </div>
      </section>

      <!-- Featured Categories -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img src="/images/carnes-frescas.jpeg" alt="Carnes Frescas" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">Carnes Frescas</h3>
            <p class="text-gray-600 dark:text-gray-300">La mejor selección de cortes frescos para tu mesa.</p>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img src="/images/especialidades.jpg" alt="Especialidades" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">Especialidades</h3>
            <p class="text-gray-600 dark:text-gray-300">Cortes especiales y preparados exclusivos.</p>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img src="/images/ofertas.jpeg" alt="Ofertas" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">Ofertas</h3>
            <p class="text-gray-600 dark:text-gray-300">Descuentos especiales de la semana.</p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 class="text-xl font-semibold mb-4">Super Carnes García</h4>
            <p class="text-gray-400">La mejor calidad en carnes desde 1990.</p>
          </div>
          <div>
            <h4 class="text-xl font-semibold mb-4">Contacto</h4>
            <p class="text-gray-400">Dirección: Calle Principal #123</p>
            <p class="text-gray-400">Teléfono: (123) 456-7890</p>
            <p class="text-gray-400">Email: info@supercarnesgarcia.com</p>
          </div>
          <div>
            <h4 class="text-xl font-semibold mb-4">Horario</h4>
            <p class="text-gray-400">Lunes a Sábado: 8:00 AM - 8:00 PM</p>
            <p class="text-gray-400">Domingo: 9:00 AM - 2:00 PM</p>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; ${new Date().getFullYear()} Super Carnes García. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
`

// Event Listeners
document.getElementById('menuButton')?.addEventListener('click', () => {
  const mobileMenu = document.getElementById('mobileMenu')
  mobileMenu?.classList.toggle('hidden')
})

document.getElementById('darkModeToggle')?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark')
  const isDark = document.documentElement.classList.contains('dark')
  localStorage.setItem('darkMode', isDark.toString())
})

document.getElementById('searchButton')?.addEventListener('click', () => {
  document.getElementById('searchModal')?.classList.remove('hidden')
})

document.getElementById('closeSearch')?.addEventListener('click', () => {
  document.getElementById('searchModal')?.classList.add('hidden')
})

// Cerrar modal con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('searchModal')?.classList.add('hidden')
  }
})

// Búsqueda predictiva
const searchInput = document.getElementById('searchInput') as HTMLInputElement
const searchResults = document.getElementById('searchResults')

searchInput?.addEventListener('input', (e) => {
  const query = (e.target as HTMLInputElement).value.toLowerCase()
  if (query.length < 2) {
    if (searchResults) searchResults.innerHTML = ''
    return
  }
  
  // Simular resultados de búsqueda
  const results = [
    'Ribeye',
    'T-Bone',
    'Picaña',
    'Arrachera',
    'Chorizo',
    'Costillas'
  ].filter(item => item.toLowerCase().includes(query))
  
  if (searchResults) {
    searchResults.innerHTML = results
      .map(result => `
        <div class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
          ${result}
        </div>
      `)
      .join('')
  }
})
