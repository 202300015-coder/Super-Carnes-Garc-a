import { loadProductsFromDB } from './loadProducts'
import { ProductCard } from '../components/ui/ProductCard'

const PRODUCTS_PER_PAGE = 16

// Función genérica para paginar productos
export async function setupPagination(
  gridId: string,
  paginationId: string,
  categoria?: string,
  excludeCarnes: boolean = false,
  onlyOffers: boolean = false
) {
  let currentPage = 1

  async function loadPage(page: number) {
    const grid = document.getElementById(gridId)
    const pagination = document.getElementById(paginationId)
    
    if (!grid || !pagination) return

    const userRole = (window as any).userRole || 'user'
    const allProducts = await loadProductsFromDB(categoria, excludeCarnes, onlyOffers, userRole)
    
    const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE)
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE
    const productsToShow = allProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

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
          activo: producto.activo,
          precio: producto.precio,
          showPrice: true // Siempre mostrar precios si están disponibles
        })
      ).join('')
    } else {
      grid.innerHTML = '<p class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">No hay productos disponibles</p>'
    }

    // Renderizar paginación
    renderPagination(pagination, page, totalPages, loadPage)

    // Actualizar botones admin
    setTimeout(() => {
      if (typeof window.updateAdminButtons === 'function') {
        window.updateAdminButtons()
      }
      
      //  NUEVO: Configurar drag & drop después de renderizar
      if (typeof window.setupDragAndDrop === 'function') {
        window.setupDragAndDrop()
      }
    }, 100)
  }

  // Cargar página inicial
  await loadPage(currentPage)
}

function renderPagination(
  container: HTMLElement,
  currentPage: number,
  totalPages: number,
  onChange: (page: number) => void
) {
  if (totalPages <= 1) {
    container.innerHTML = ''
    return
  }

  let html = ''

  // Botón Anterior
  html += `
    <button 
      class="px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'} transition-colors"
      ${currentPage === 1 ? 'disabled' : ''}
    >
      ← Anterior
    </button>
  `

  // Números de página
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `
        <button 
          class="px-4 py-2 rounded-lg ${i === currentPage ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'} transition-colors font-medium"
        >
          ${i}
        </button>
      `
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += '<span class="px-2 text-gray-500">...</span>'
    }
  }

  // Botón Siguiente
  html += `
    <button 
      class="px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'} transition-colors"
      ${currentPage === totalPages ? 'disabled' : ''}
    >
      Siguiente →
    </button>
  `

  container.innerHTML = html

  // Agregar event listeners
  const buttons = container.querySelectorAll('button')
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return
      
      let newPage = currentPage
      if (index === 0) newPage = currentPage - 1 // Anterior
      else if (index === buttons.length - 1) newPage = currentPage + 1 // Siguiente
      else newPage = parseInt(btn.textContent || '1') // Número específico
      
      window.scrollTo({ top: 0, behavior: 'smooth' })
      onChange(newPage)
    })
  })
}
