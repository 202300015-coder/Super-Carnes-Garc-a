// Offers.ts
import { setupPagination } from './pagination'

export function renderOffers() {
  // Iniciar carga de productos con ofertas (descuento > 0)
  setTimeout(() => {
    import('./loadProducts').then(module => {
      module.renderProductsInGrid('offersGrid', undefined, false, true) // true = solo ofertas
    })
    
    // Configurar búsqueda en ofertas (ambos tipos: carnes y productos)
    import('./searchProducts').then(module => {
      module.setupSearch({
        inputId: 'searchOffers',
        resultsId: 'searchOffersResults',
        gridId: 'offersGrid',
        onlyOffers: true
      })
    })
  }, 0)

  // 👉 AGREGADO: inicialización de paginación (después del render)
  requestAnimationFrame(() => {
    setTimeout(() => {
      setupPagination('offersGrid', 'offersPagination', undefined, false, true)
      // último parámetro: onlyOffers = true
    }, 100)
  })
  
  return `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Ofertas Especiales</h1>
        
        <div class="flex items-center space-x-4">
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

          <!-- Search Bar -->
          <div class="relative w-64">
            <input
              type="text"
              id="searchOffers"
              class="w-full px-4 py-2 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Buscar ofertas..."
            >
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <!-- Search Results Dropdown -->
            <div id="searchOffersResults" class="hidden absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto"></div>
          </div>
        </div>
      </div>

      <!-- Banner de Ofertas -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 rounded-lg p-6 mb-8 text-white">
        <h2 class="text-2xl font-bold mb-2">¡Grandes Descuentos!</h2>
        <p class="text-primary-100 dark:text-primary-200">Aprovecha nuestras ofertas especiales. Solo productos con descuento activo.</p>
      </div>

      <!-- Offers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="offersGrid"></div>

      <!-- Pagination dinámica -->
      <div id="offersPagination" class="flex justify-center space-x-2 mt-8"></div>

    </div>
  `
}
