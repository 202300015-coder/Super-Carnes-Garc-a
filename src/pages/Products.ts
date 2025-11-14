// Products.ts
import { setupPagination } from './pagination'

export function renderProducts() {
  // Iniciar carga de productos después del render
  // Aquí NO mostramos carnes, solo otros productos
  setTimeout(() => {
    import('./loadProducts').then(module => {
      module.renderProductsInGrid('productsGrid', 'productos', true) // true = excluir carnes
    })
    
    // Configurar búsqueda específica para productos (excluyendo carnes)
    import('./searchProducts').then(module => {
      module.setupSearch({
        inputId: 'searchProducts',
        resultsId: 'searchProductsResults',
        gridId: 'productsGrid',
        categoria: 'productos',
        excludeCarnes: true
      })
    })
  }, 0)

  // 👉 AGREGADO: Inicializar paginación DESPUÉS de que el DOM existe
  requestAnimationFrame(() => {
    setTimeout(() => {
      setupPagination('productsGrid', 'productsPagination', 'productos', true) 
      // El último true = excluir carnes en la paginación también
    }, 100)
  })
  
  return `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Nuestros Productos</h1>
        
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
              id="searchProducts"
              class="w-full px-4 py-2 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Buscar productos..."
            >
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <!-- Search Results Dropdown -->
            <div id="searchProductsResults" class="hidden absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg"></div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="productsGrid"></div>

      <!-- Pagination (ahora dinámica) -->
      <div id="productsPagination" class="flex justify-center space-x-2 mt-8"></div>

    </div>
  `
}
