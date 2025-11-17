// Offers.ts
import { setupPagination } from './pagination'
import { supabase } from '../lib/supabaseClient'
import { ProductCard } from '../components/ui/ProductCard'

// Función para configurar los filtros de subcategoría (incluyendo todas las subcategorías)
function setupCategoryFilters() {
  const filterButtons = document.querySelectorAll('.category-filter')
  
  filterButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const subcategory = button.getAttribute('data-category')
      
      // Actualizar estilos de botones
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-primary-600', 'text-white')
        btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300')
      })
      button.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300')
      button.classList.add('bg-primary-600', 'text-white')
      
      // Filtrar productos
      const userRole = (window as any).userRole || 'user'
      let query = supabase
        .from('productos')
        .select('*')
        .gt('descuento', 0) // Solo ofertas
        .order('orden', { ascending: true })
      
      // Filtrar por activo si no es admin
      if (userRole !== 'admin') {
        query = query.eq('activo', true)
      }
      
      // Filtrar por subcategoría si no es "Todos"
      if (subcategory && subcategory !== 'Todos') {
        query = query.eq('subcategoria', subcategory)
      }
      
      const { data: products } = await query
      
      // Renderizar productos filtrados
      const grid = document.getElementById('offersGrid')
      if (grid && products) {
        grid.innerHTML = products.map(producto => 
          ProductCard({
            id: producto.id,
            name: producto.nombre,
            description: producto.descripcion || '',
            image: producto.imagen_url || '/images/placeholder.jpg',
            category: producto.categoria,
            discount: producto.descuento,
            activo: producto.activo
          })
        ).join('')
        
        // Actualizar botones admin
        if (typeof window.updateAdminButtons === 'function') {
          window.updateAdminButtons()
        }
        
        // Configurar drag & drop
        if (typeof window.setupDragAndDrop === 'function') {
          setTimeout(() => {
            window.setupDragAndDrop()
          }, 100)
        }
      }
    })
  })
}

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
    
    // 🆕 Configurar filtros de subcategoría
    setupCategoryFilters()
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

      <!-- Filtros de Subcategoría -->
      <div class="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-primary-600 text-white transition-colors whitespace-nowrap flex-shrink-0" data-category="Todos">
          Todos
        </button>
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Premium">
          Premium
        </button>
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Res">
          Res
        </button>
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Cerdo">
          Cerdo
        </button>
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Pollo">
          Pollo
        </button>
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Cortes Especiales">
          Cortes Esp.
        </button>
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Abarrotes">
          Abarrotes
        </button>
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Lácteos">
          Lácteos
        </button>
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Embutidos">
          Embutidos
        </button>
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Condimentos">
          Condimentos
        </button>
        <button class="category-filter px-3 py-1.5 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="General">
          General
        </button>
      </div>

      <!-- Offers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="offersGrid"></div>

      <!-- Pagination dinámica -->
      <div id="offersPagination" class="flex justify-center space-x-2 mt-8"></div>

    </div>
  `
}
