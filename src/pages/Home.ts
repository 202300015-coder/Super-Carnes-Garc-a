import { renderProductsInGrid } from './loadProducts'

// Estado de paginación
let currentHomePage = 1
const productsPerPage = 12

export function renderHome() {
  // Renderizar productos después de que el HTML esté en el DOM
  setTimeout(() => {
    loadHomePage(1)
  }, 0)

  return `
    <section class="relative bg-primary-600 dark:bg-gray-800 rounded-lg overflow-hidden mb-12">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 dark:from-gray-800 dark:to-gray-900 opacity-90"></div>
      <div class="relative z-10 px-8 py-16 text-white">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Bienvenidos a Super Carnes García</h1>
        <p class="text-xl mb-8">La mejor calidad en carnes para su mesa</p>
        <a href="#" data-page="products" class="nav-link inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
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

    <!-- Sección de Productos Destacados con Paginación -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Nuestros Productos
      </h2>
      
      <!-- Grid de productos -->
      <div id="homeProductsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <!-- Productos se cargarán aquí -->
      </div>

      <!-- Paginación -->
      <div id="homePagination" class="flex justify-center items-center space-x-2">
        <!-- Botones de paginación se generarán aquí -->
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

// Función para cargar página específica de productos
async function loadHomePage(page: number) {
  currentHomePage = page
  const { loadProductsFromDB } = await import('./loadProducts')
  const { ProductCard } = await import('../components/ui/ProductCard')
  
  const grid = document.getElementById('homeProductsGrid')
  const pagination = document.getElementById('homePagination')
  
  if (!grid || !pagination) return

  // Obtener rol del usuario
  const userRole = (window as any).userRole || 'user'

  // Cargar todos los productos
  const allProducts = await loadProductsFromDB(undefined, false, false, userRole)
  
  // Calcular paginación
  const totalProducts = allProducts.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  const startIndex = (page - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const productsToShow = allProducts.slice(startIndex, endIndex)

  // Renderizar productos
  if (productsToShow.length > 0) {
    grid.innerHTML = productsToShow.map(producto => 
      ProductCard({
        id: producto.id,
        name: producto.nombre,
        description: producto.descripcion || '',
        image: producto.imagen_url || '/images/placeholder.jpg',
        category: producto.categoria,
        discount: producto.descuento,
        price: producto.precio,
        activo: producto.activo
      })
    ).join('')
  } else {
    grid.innerHTML = '<p class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">No hay productos disponibles</p>'
  }

  // Renderizar paginación
  renderPagination(pagination, page, totalPages)

  // Actualizar botones admin
  setTimeout(() => {
    if (typeof window.updateAdminButtons === 'function') {
      window.updateAdminButtons()
    }
  }, 100)
}

// Función para renderizar botones de paginación
function renderPagination(container: HTMLElement, currentPage: number, totalPages: number) {
  if (totalPages <= 1) {
    container.innerHTML = ''
    return
  }

  let paginationHTML = ''

  // Botón Anterior
  paginationHTML += `
    <button 
      onclick="window.goToHomePage(${currentPage - 1})"
      ${currentPage === 1 ? 'disabled' : ''}
      class="px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'} transition-colors"
    >
      ← Anterior
    </button>
  `

  // Números de página
  for (let i = 1; i <= totalPages; i++) {
    // Mostrar solo páginas cercanas (máximo 5 botones numéricos)
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      paginationHTML += `
        <button 
          onclick="window.goToHomePage(${i})"
          class="px-4 py-2 rounded-lg ${i === currentPage ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'} transition-colors font-medium"
        >
          ${i}
        </button>
      `
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationHTML += '<span class="px-2 text-gray-500">...</span>'
    }
  }

  // Botón Siguiente
  paginationHTML += `
    <button 
      onclick="window.goToHomePage(${currentPage + 1})"
      ${currentPage === totalPages ? 'disabled' : ''}
      class="px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'} transition-colors"
    >
      Siguiente →
    </button>
  `

  container.innerHTML = paginationHTML
}

// Exponer función de navegación globalmente
;(window as any).goToHomePage = (page: number) => {
  window.scrollTo({ top: 600, behavior: 'smooth' }) // Scroll a la sección de productos
  loadHomePage(page)
}