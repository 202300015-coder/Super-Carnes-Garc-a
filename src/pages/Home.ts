export function renderHome() {
  return `
    <section class="relative bg-primary-600 dark:bg-gray-800 rounded-lg overflow-hidden mb-12 min-h-[400px] flex items-center">
      <!-- Imagen de fondo de la tienda -->
      <div class="absolute inset-0">
        <img src="images/imagen de la tienda.jpg" alt="Super Carnes García" class="w-full h-full object-cover">
        <!-- Overlay oscuro para mejorar legibilidad del texto -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>
      
      <!-- Contenido del banner -->
      <div class="relative z-10 px-8 py-16 text-white w-full">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Bienvenidos a Super Carnes García</h1>
        <p class="text-xl mb-8 drop-shadow-md">La mejor calidad en carnes para su mesa</p>
        <a href="#" data-page="meats" class="nav-link inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-xl">
          Ver Carnes
        </a>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Sobre Nosotros</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-lg">
            Desde 1988, Super Carnes García se ha convertido en 
            sinónimo de calidad y excelencia en el mercado de carnes. Nos especializamos 
            en ofrecer los mejores cortes, seleccionados cuidadosamente para garantizar 
            la mejor experiencia culinaria para nuestros clientes.
          </p>
          <ul class="mt-4">
            <li>Carnes de primera calidad</li>
            <li>Cortes especializados</li>
            <li>Atención personalizada</li>
            <li>Higiene y seguridad garantizada</li>
          </ul>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-primary-600 mb-2">Experiencia</h3>
            <p class="text-gray-600 dark:text-gray-300">30+ años sirviendo a nuestros clientes</p>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-primary-600 mb-2">Calidad</h3>
            <p class="text-gray-600 dark:text-gray-300">Productos certificados de primera</p>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-primary-600 mb-2">Servicio</h3>
            <p class="text-gray-600 dark:text-gray-300">Atención personalizada</p>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-primary-600 mb-2">Variedad</h3>
            <p class="text-gray-600 dark:text-gray-300">Amplia selección de cortes</p>
          </div>
        </div>
      </div>
    </section>



    <section class="mb-12 px-4">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Categorías Destacadas
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Tarjeta 1 - Carnes -->
        <a href="#" data-page="meats" class="nav-link bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
          <img src="images/carnes-frescas.jpeg" alt="Carnes Frescas" class="w-full h-56 object-cover">
          <div class="p-6 text-center">
            <h3 class="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Carnes Frescas</h3>
            <p class="text-gray-600 dark:text-gray-300">La mejor selección de cortes frescos para tu mesa.</p>
          </div>
        </a>

        <!-- Tarjeta 2 - Productos -->
        <a href="#" data-page="products" class="nav-link bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
          <img src="images/abarrotes.webp" alt="Abarrotes" class="w-full h-56 object-cover">
          <div class="p-6 text-center">
            <h3 class="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Productos Increíbles</h3>
            <p class="text-gray-600 dark:text-gray-300">Todo tipo de abarrotes.</p>
          </div>
        </a>

        <!-- Tarjeta 3 - Ofertas -->
        <a href="#" data-page="offers" class="nav-link bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
          <img src="images/ofertas2.jpg" alt="Ofertas" class="w-full h-56 object-cover">
          <div class="p-6 text-center">
            <h3 class="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Grandes Ofertas</h3>
            <p class="text-gray-600 dark:text-gray-300">Descuentos especiales de la semana.</p>
          </div>
        </a>

      </div>
    </section>

  `
}