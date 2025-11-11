export function renderHome() {
  return `
    <section class="relative bg-primary-600 dark:bg-gray-800 rounded-lg overflow-hidden mb-12">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 dark:from-gray-800 dark:to-gray-900 opacity-90"></div>
      <div class="relative z-10 px-8 py-16 text-white">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Bienvenidos a Super Carnes García</h1>
        <p class="text-xl mb-8">La mejor calidad en carnes para su mesa</p>
        <a href="#productos" class="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
          Ver Productos
        </a>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Sobre Nosotros</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-lg">
            Con más de 30 años de experiencia, Super Carnes García se ha convertido en 
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
    
    <!-- Tarjeta 1 -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <img src="images/carnes-frescas.jpeg" alt="Carnes Frescas" class="w-full h-56 object-cover">
      <div class="p-6 text-center">
        <h3 class="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Carnes Frescas</h3>
        <p class="text-gray-600 dark:text-gray-300">La mejor selección de cortes frescos para tu mesa.</p>
      </div>
    </div>

    <!-- Tarjeta 2 -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <img src="images/especialidades.jpg" alt="Especialidades" class="w-full h-56 object-cover">
      <div class="p-6 text-center">
        <h3 class="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Especialidades</h3>
        <p class="text-gray-600 dark:text-gray-300">Cortes especiales y preparados exclusivos.</p>
      </div>
    </div>

    <!-- Tarjeta 3 -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <img src="images/ofertas.jpeg" alt="Ofertas" class="w-full h-56 object-cover">
      <div class="p-6 text-center">
        <h3 class="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Ofertas</h3>
        <p class="text-gray-600 dark:text-gray-300">Descuentos especiales de la semana.</p>
      </div>
    </div>

  </div>
</section>

  `
}