import { supabase } from '../lib/supabaseClient'
import { ProductCard } from '../components/ui/ProductCard'

export interface Product {
  id: number
  nombre: string
  descripcion: string
  imagen_url: string
  categoria: string
  precio?: number
  descuento?: number
  activo: boolean
}

/**
 * Carga productos desde la base de datos
 * @param categoria - Filtro opcional por categoría
 * @param excludeCarnes - Si es true, excluye productos de categoría 'carnes'
 * @param onlyOffers - Si es true, solo muestra productos con descuento > 0
 * @param userRole - Rol del usuario actual ('admin' o 'user')
 * @returns Array de productos
 */
export async function loadProductsFromDB(
  categoria?: string, 
  excludeCarnes: boolean = false, 
  onlyOffers: boolean = false,
  userRole: string = 'user'
): Promise<Product[]> {
  try {
    let query = supabase
      .from('productos')
      .select('*')

    // Solo filtrar productos activos si NO es admin
    if (userRole !== 'admin') {
      query = query.eq('activo', true)
    }
    
    query = query.order('orden', { ascending: true})

    // Aplicar filtro de categoría si existe
    if (categoria && categoria !== 'Todos') {
      query = query.eq('categoria', categoria)
    }
    
    // Excluir carnes si se solicita
    if (excludeCarnes) {
      query = query.neq('categoria', 'carnes')
    }
    
    // Solo productos con descuento si se solicita
    if (onlyOffers) {
      query = query.gt('descuento', 0)
    }

    const { data, error } = await query

    if (error) {
      console.error('❌ Error cargando productos:', error)
      return []
    }

    const condicion = onlyOffers ? ' (solo ofertas)' : excludeCarnes ? ' (sin carnes)' : categoria ? ` - categoría: ${categoria}` : ''
    console.log(`✅ Productos cargados: ${data?.length || 0}${condicion}`)
    return data || []
  } catch (error) {
    console.error('❌ Error inesperado:', error)
    return []
  }
}

/**
 * Renderiza productos en el grid
 * @param containerId - ID del contenedor donde insertar las tarjetas
 * @param categoria - Categoría a filtrar (opcional)
 * @param excludeCarnes - Si es true, excluye productos de categoría 'carnes'
 * @param onlyOffers - Si es true, solo muestra productos con descuento > 0
 * @param showPrices - Si es true, muestra los precios en las tarjetas
 */
export async function renderProductsInGrid(containerId: string, categoria?: string, excludeCarnes: boolean = false, onlyOffers: boolean = false, showPrices: boolean = false) {
  const container = document.getElementById(containerId)
  if (!container) {
    console.error(`❌ No se encontró el contenedor: ${containerId}`)
    return
  }

  // Obtener rol del usuario desde window
  const userRole = (window as any).userRole || 'user'

  // Mostrar loading
  container.innerHTML = `
    <div class="col-span-full flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-400">Cargando productos...</span>
    </div>
  `

  // Cargar productos pasando el rol del usuario
  const productos = await loadProductsFromDB(categoria, excludeCarnes, onlyOffers, userRole)

  // Si no hay productos
  if (productos.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay productos</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          ${categoria ? `No hay productos en la categoría "${categoria}"` : 'Aún no se han agregado productos'}
        </p>
      </div>
    `
    return
  }

  // Renderizar productos
  container.innerHTML = productos.map(producto => 
    ProductCard({
      id: producto.id,
      name: producto.nombre,
      description: producto.descripcion || '',
      image: producto.imagen_url || '/images/placeholder.jpg',
      category: producto.categoria,
      discount: producto.descuento,
      activo: producto.activo,
      precio: producto.precio,
      showPrice: showPrices // Mostrar precios según el parámetro
    })
  ).join('')
  
  // Re-aplicar visibilidad de botones admin después de renderizar
  setTimeout(() => {
    if (typeof window.updateAdminButtons === 'function') {
      window.updateAdminButtons()
    }
  }, 100)
}
