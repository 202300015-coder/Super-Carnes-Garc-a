// Meats.ts
import { setupPagination } from './pagination'
import { supabase } from '../lib/supabaseClient'
import { ProductCard } from '../components/ui/ProductCard'

// Función para configurar los filtros de subcategoría
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
      
      let query
      
      // Si hay filtro de subcategoría, hacer JOIN
      if (subcategory && subcategory !== 'Todos') {
        query = supabase
          .from('productos')
          .select(`
            *,
            producto_subcategorias!inner(subcategoria)
          `)
          .eq('categoria', 'carnes')
          .eq('producto_subcategorias.subcategoria', subcategory)
          .order('orden', { ascending: true })
      } else {
        // Sin filtro, traer todos
        query = supabase
          .from('productos')
          .select('*')
          .eq('categoria', 'carnes')
          .order('orden', { ascending: true })
      }
      
      // Filtrar por activo si no es admin
      if (userRole !== 'admin') {
        query = query.eq('activo', true)
      }
      
      const { data: products } = await query
      
      // Renderizar productos filtrados
      const grid = document.getElementById('meatsGrid')
      if (grid && products) {
        grid.innerHTML = products.map(producto => 
          ProductCard({
            id: producto.id,
            name: producto.nombre,
            description: producto.descripcion || '',
            image: producto.imagen_url || '/images/placeholder.jpg',
            category: producto.categoria,
            discount: producto.descuento,
            activo: producto.activo,
            precio: producto.precio,
            showPrice: true // Mostrar precios en Carnes
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

export function renderMeats() {
  // Configurar funcionalidades después del render
  setTimeout(() => {
    // Configurar búsqueda específica para carnes
    import('./searchProducts').then(module => {
      module.setupSearch({
        inputId: 'searchMeats',
        resultsId: 'searchMeatsResults',
        gridId: 'meatsGrid',
        categoria: 'carnes' // Solo buscar en carnes
      })
    })
    
    // Configurar filtros de subcategoría
    setupCategoryFilters()
  }, 0)
  
  // Inicializar paginación (esto carga los productos automáticamente)
  requestAnimationFrame(() => {
    setTimeout(() => {
      setupPagination('meatsGrid', 'meatsPagination', 'carnes', false, false)
    }, 100)
  })

  return `
    <div class="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">

      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Nuestros Cortes</h1>
        
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">

          <!-- Add Product Button -->
          <button 
            onclick="window.openAddProductModal()" 
            class="admin-only px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors hidden items-center justify-center space-x-2"
            title="Añadir producto"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Añadir</span>
          </button>

          <!-- Search Bar -->
          <div class="relative w-full sm:w-64">
            <input
              type="text"
              id="searchMeats"
              class="w-full px-4 py-2 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Buscar cortes..."
            >
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <!-- Search Results Dropdown -->
            <div id="searchMeatsResults" class="hidden absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg"></div>
          </div>
        </div>
      </div>

      <!-- Filtros de Subcategoría -->
      <div class="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
        <button class="category-filter px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-primary-600 text-white transition-colors whitespace-nowrap flex-shrink-0" data-category="Todos">
          Todos
        </button>
        <button class="category-filter px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Premium">
          Premium
        </button>
        <button class="category-filter px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Res">
          Res
        </button>
        <button class="category-filter px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Cerdo">
          Cerdo
        </button>
        <button class="category-filter px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Pollo">
          Pollo
        </button>
        <button class="category-filter px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap flex-shrink-0" data-category="Cortes Especiales">
          Cortes Especiales
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="meatsGrid"></div>

      <!-- Pagination -->
      <div id="meatsPagination" class="flex justify-center space-x-2 mt-8"></div>

    </div>
  `
}
