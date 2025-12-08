export function renderHome() {
  return `
    <!-- Banner Principal con Imagen de la Tienda -->
    <section class="relative bg-gradient-to-br from-primary-700 to-primary-900 dark:from-gray-900 dark:to-gray-800 rounded-2xl overflow-hidden mb-16 min-h-[450px] md:min-h-[500px] flex items-center shadow-2xl">
      <!-- Imagen de fondo de la tienda -->
      <div class="absolute inset-0">
        <img src="images/imagen de la tienda.jpg" alt="Super Carnes García" class="w-full h-full object-cover" loading="eager">
        <!-- Overlay con gradiente mejorado -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      </div>
      
      <!-- Contenido del banner -->
      <div class="relative z-10 px-6 sm:px-8 md:px-12 py-20 text-white w-full">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl leading-tight slide-up">
            Bienvenidos a <span class="text-red-400">Super Carnes García</span>
          </h1>
          <p class="text-xl sm:text-2xl mb-10 drop-shadow-lg text-gray-100 leading-relaxed fade-in">
            La mejor calidad en carnes para su mesa
          </p>
          <a href="#" data-page="meats" class="nav-link inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-105 active:scale-95">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
            Ver Cortes
          </a>
        </div>
      </div>
    </section>

    <!-- Sección Sobre Nosotros -->
    <section class="mb-16">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
        Sobre Nosotros
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Texto descriptivo -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Desde <strong class="text-primary-600 dark:text-primary-400">1988</strong>, Super Carnes García se ha convertido en 
            sinónimo de calidad y excelencia en el mercado de carnes. Nos especializamos 
            en ofrecer los mejores cortes, seleccionados cuidadosamente para garantizar 
            la mejor experiencia culinaria para nuestros clientes.
          </p>
          <ul class="space-y-3">
            <li class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <svg class="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Carnes de primera calidad</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <svg class="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Cortes especializados</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <svg class="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Atención personalizada</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <svg class="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Higiene y seguridad garantizada</span>
            </li>
          </ul>
        </div>
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
            <div class="text-4xl sm:text-5xl font-bold text-gray-700 dark:text-gray-300 mb-2">30+</div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 mb-1">Años</h3>
            <p class="text-sm text-gray-500 dark:text-gray-500">De experiencia</p>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
            <div class="text-4xl sm:text-5xl font-bold text-gray-700 dark:text-gray-300 mb-2">100%</div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 mb-1">Calidad</h3>
            <p class="text-sm text-gray-500 dark:text-gray-500">Certificada</p>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
            <div class="text-4xl sm:text-5xl font-bold text-gray-700 dark:text-gray-300 mb-2">24/7</div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 mb-1">Servicio</h3>
            <p class="text-sm text-gray-500 dark:text-gray-500">Atención continua</p>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
            <div class="text-4xl sm:text-5xl font-bold text-gray-700 dark:text-gray-300 mb-2">200+</div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 mb-1">Variedad</h3>
            <p class="text-sm text-gray-500 dark:text-gray-500">De productos</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categorías Destacadas -->
    <section class="mb-16">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
        Categorías Destacadas
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Tarjeta 1 - Carnes -->
        <a href="#" data-page="meats" class="nav-link group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="relative overflow-hidden">
            <img src="images/carnes-frescas.jpeg" alt="Carnes Frescas" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div class="p-6 text-center">
            <h3 class="text-2xl font-bold text-red-700 dark:text-red-400 mb-3 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors">🥩 Carnes Frescas</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">La mejor selección de cortes frescos para tu mesa.</p>
          </div>
        </a>

        <!-- Tarjeta 2 - Productos -->
        <a href="#" data-page="products" class="nav-link group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="relative overflow-hidden">
            <img src="images/abarrotes.webp" alt="Abarrotes" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div class="p-6 text-center">
            <h3 class="text-2xl font-bold text-red-700 dark:text-red-400 mb-3 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors">🛒 Productos Increíbles</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">Todo tipo de abarrotes de primera calidad.</p>
          </div>
        </a>

        <!-- Tarjeta 3 - Ofertas -->
        <a href="#" data-page="offers" class="nav-link group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="relative overflow-hidden">
            <img src="images/ofertas2.jpg" alt="Ofertas" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <!-- Badge de Oferta -->
            <div class="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
              ¡OFERTAS!
            </div>
          </div>
          <div class="p-6 text-center">
            <h3 class="text-2xl font-bold text-red-700 dark:text-red-400 mb-3 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors">🔥 Grandes Ofertas</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">Descuentos especiales de la semana.</p>
          </div>
        </a>

      </div>
    </section>

  `
}