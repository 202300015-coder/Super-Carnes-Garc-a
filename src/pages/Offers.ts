export function renderOffers() {
  // Iniciar carga de productos con ofertas (descuento > 0)
  setTimeout(() => {
    import('./loadProducts').then(module => {
      module.renderProductsInGrid('offersGrid', undefined, false, true) // true = solo ofertas
    })
  }, 0)
  
  return `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Ofertas Especiales</h1>
        
        <!-- Add Product Button (admin only) -->
        <button 
          onclick="window.openAddProductModal()" 
          class="admin-only px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors hidden items-center space-x-2"
          title="Añadir producto"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          <span>Añadir</span>
        </button>
      </div>

      <!-- Banner de Ofertas -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 rounded-lg p-6 mb-8 text-white">
        <h2 class="text-2xl font-bold mb-2">¡Grandes Descuentos!</h2>
        <p class="text-primary-100 dark:text-primary-200">Aprovecha nuestras ofertas especiales. Solo productos con descuento activo.</p>
      </div>

      <!-- Offers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="offersGrid">
        <!-- Los productos con ofertas se cargarán dinámicamente -->
      </div>

      <!-- Pagination -->
      <div class="flex justify-center space-x-2 mt-8">
        <button class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Anterior
        </button>
        <button class="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
          1
        </button>
        <button class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          2
        </button>
        <button class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Siguiente
        </button>
      </div>
    </div>
  `
}