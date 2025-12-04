import { supabase } from '../lib/supabaseClient'

// Tipos para la configuración de búsqueda
interface SearchConfig {
  inputId: string
  resultsId: string
  gridId: string
  categoria?: string // 'carnes', 'productos', o undefined para ambos
  excludeCarnes?: boolean
  onlyOffers?: boolean
}

/**
 * Normaliza texto eliminando acentos y convirtiendo a minúsculas
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .trim()
}

/**
 * Calcula similitud entre dos textos (mejorado para mayor tolerancia)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const norm1 = normalizeText(str1)
  const norm2 = normalizeText(str2)
  
  // Si coincide exactamente, máxima puntuación
  if (norm1 === norm2) return 100
  
  // Si uno contiene al otro, alta puntuación
  if (norm1.includes(norm2)) return 90
  if (norm2.includes(norm1)) return 85
  
  // Buscar palabras individuales (muy importante para flexibilidad)
  const words1 = norm1.split(/\s+/)
  const words2 = norm2.split(/\s+/)
  
  let matches = 0
  let partialMatches = 0
  
  words2.forEach(searchWord => {
    // Coincidencia exacta de palabra
    if (words1.some(w => w === searchWord)) {
      matches += 2
    }
    // Coincidencia parcial (palabra contiene o está contenida)
    else if (words1.some(w => w.includes(searchWord) || searchWord.includes(w))) {
      matches += 1
      partialMatches += 0.5
    }
    // Coincidencia muy parcial (primeras letras)
    else if (words1.some(w => w.startsWith(searchWord.slice(0, 3)) || searchWord.startsWith(w.slice(0, 3)))) {
      partialMatches += 0.3
    }
  })
  
  const totalScore = ((matches + partialMatches) / words2.length) * 70
  return Math.min(totalScore, 100)
}

/**
 * Buscar productos en Supabase con filtros mejorados y búsqueda permisiva
 */
export async function searchProductsInDB(
  searchTerm: string,
  categoria?: string,
  excludeCarnes: boolean = false,
  onlyOffers: boolean = false
) {
  try {
    console.log('🔍 Buscando:', searchTerm, 'Categoría:', categoria)

    // Obtener rol del usuario
    const userRole = (window as any).userRole || 'user'

    // Construir query base - traer TODOS los productos relevantes
    let query = supabase
      .from('productos')
      .select(`
        *,
        producto_subcategorias(subcategoria)
      `)
      .order('orden', { ascending: true })

    // Solo filtrar activos si NO es admin
    if (userRole !== 'admin') {
      query = query.eq('activo', true)
    }

    // Filtrar por categoría si se especifica
    if (categoria) {
      query = query.eq('categoria', categoria)
    }

    // Excluir carnes si se solicita
    if (excludeCarnes) {
      query = query.neq('categoria', 'carnes')
    }

    // Solo ofertas (productos con descuento)
    if (onlyOffers) {
      query = query.gt('descuento', 0)
    }

    const { data, error } = await query

    if (error) throw error

    // Filtrado y puntuación en el cliente (más flexible que SQL)
    const scoredResults = (data || []).map(product => {
      let score = 0
      
      // Buscar en nombre (mayor peso)
      const nameScore = calculateSimilarity(product.nombre, searchTerm)
      score += nameScore * 3
      
      // Buscar en descripción
      if (product.descripcion) {
        const descScore = calculateSimilarity(product.descripcion, searchTerm)
        score += descScore
      }
      
      // Buscar en subcategorías
      if (product.producto_subcategorias && Array.isArray(product.producto_subcategorias)) {
        product.producto_subcategorias.forEach((sub: any) => {
          if (sub.subcategoria) {
            const subScore = calculateSimilarity(sub.subcategoria, searchTerm)
            score += subScore * 2
          }
        })
      }
      
      return { product, score }
    })
    
    // Filtrar resultados con puntuación > 0 y ordenar por puntuación
    const results = scoredResults
      .filter(item => item.score > 15) // Umbral más bajo para mayor permisividad
      .sort((a, b) => b.score - a.score)
      .map(item => item.product)

    console.log('✅ Resultados encontrados:', results.length)
    return results
  } catch (error) {
    console.error('❌ Error en búsqueda:', error)
    return []
  }
}

/**
 * Configurar búsqueda en tiempo real con resultados desplegables
 */
export function setupSearch(config: SearchConfig) {
  const input = document.getElementById(config.inputId) as HTMLInputElement
  const resultsContainer = document.getElementById(config.resultsId)
  const grid = document.getElementById(config.gridId)

  if (!input || !resultsContainer || !grid) {
    console.warn('⚠️ Elementos de búsqueda no encontrados:', config)
    return
  }

  console.log('✅ Búsqueda configurada para:', config.inputId)

  // Búsqueda en tiempo real
  input.addEventListener('input', async (e) => {
    const searchTerm = (e.target as HTMLInputElement).value.trim()

    // Si está vacío, restaurar todos los productos CON paginación
    if (searchTerm === '') {
      resultsContainer.classList.add('hidden')
      resultsContainer.innerHTML = ''
      
      // Reinicializar paginación según la sección actual
      const { setupPagination } = await import('./pagination')
      
      // Determinar IDs de paginación basado en el gridId
      let paginationId = ''
      if (config.gridId === 'meatsGrid') paginationId = 'meatsPagination'
      else if (config.gridId === 'productsGrid') paginationId = 'productsPagination'
      else if (config.gridId === 'offersGrid') paginationId = 'offersPagination'
      
      if (paginationId) {
        await setupPagination(
          config.gridId,
          paginationId,
          config.categoria,
          config.excludeCarnes,
          config.onlyOffers
        )
      }
      return
    }

    // Búsqueda mínima de 1 carácter (más permisiva)
    if (searchTerm.length < 1) {
      resultsContainer.classList.add('hidden')
      return
    }

    // Buscar en BD
    const results = await searchProductsInDB(
      searchTerm,
      config.categoria,
      config.excludeCarnes,
      config.onlyOffers
    )

    // Mostrar resultados en dropdown
    if (results.length > 0) {
      resultsContainer.innerHTML = results
        .map(
          (product) => `
          <div class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-0 search-result-item" data-id="${product.id}">
            <div class="flex items-center space-x-3">
              <img src="${product.imagen_url || '/placeholder.jpg'}" alt="${product.nombre}" class="w-12 h-12 object-cover rounded">
              <div>
                <p class="font-medium text-gray-900 dark:text-white">${product.nombre}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">${product.categoria}</p>
              </div>
              ${
                product.descuento > 0
                  ? `<span class="ml-auto bg-red-500 text-white px-2 py-1 rounded text-xs">-${product.descuento}%</span>`
                  : ''
              }
            </div>
          </div>
        `
        )
        .join('')
      resultsContainer.classList.remove('hidden')

      // Event listener para clicks en resultados
      resultsContainer.querySelectorAll('.search-result-item').forEach((item) => {
        item.addEventListener('click', async () => {
          const productId = item.getAttribute('data-id')
          console.log('🎯 Producto seleccionado:', productId)
          
          // Obtener el producto completo
          const product = results.find(p => p.id.toString() === productId)
          if (product) {
            // Renderizar SOLO ese producto en el grid
            const { ProductCard } = await import('../components/ui/ProductCard')
            grid.innerHTML = ProductCard({
              id: product.id,
              name: product.nombre,
              description: product.descripcion || '',
              image: product.imagen_url || '/images/placeholder.jpg',
              category: product.categoria,
              discount: product.descuento,
              activo: product.activo,
              precio: product.precio,
              showPrice: true
            })
            
            // Actualizar botones admin
            if (typeof window.updateAdminButtons === 'function') {
              window.updateAdminButtons()
            }
            
            // Scroll suave al producto
            setTimeout(() => {
              grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
          }
          
          // Limpiar input y dropdown
          input.value = ''
          resultsContainer.classList.add('hidden')
          resultsContainer.innerHTML = ''
        })
      })
    } else {
      resultsContainer.innerHTML = `
        <div class="p-4 text-center text-gray-500 dark:text-gray-400">
          No se encontraron resultados
        </div>
      `
      resultsContainer.classList.remove('hidden')
    }
  })

  // Búsqueda al presionar Enter - mostrar solo coincidencias
  input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const searchTerm = input.value.trim()

      if (searchTerm.length < 2) return

      resultsContainer.classList.add('hidden')

      // Buscar y renderizar solo coincidencias
      const results = await searchProductsInDB(
        searchTerm,
        config.categoria,
        config.excludeCarnes,
        config.onlyOffers
      )

      // Renderizar resultados en el grid (mapeando correctamente)
      const ProductCard = (await import('../components/ui/ProductCard')).ProductCard

      grid.innerHTML = results.length
        ? results.map((product) => ProductCard({
            id: product.id,
            name: product.nombre,
            description: product.descripcion || '',
            image: product.imagen_url || '/images/placeholder.jpg',
            category: product.categoria,
            discount: product.descuento,
            activo: product.activo,
            precio: product.precio,
            showPrice: true
          })).join('')
        : '<p class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">No se encontraron productos</p>'

      // Actualizar botones de admin después de renderizar
      if (typeof window.updateAdminButtons === 'function') {
        window.updateAdminButtons()
      }
      
      // Configurar drag & drop si es admin
      if (typeof window.setupDragAndDrop === 'function') {
        setTimeout(() => {
          window.setupDragAndDrop()
        }, 100)
      }
    }
  })

  // Cerrar dropdown al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target as Node) && !resultsContainer.contains(e.target as Node)) {
      resultsContainer.classList.add('hidden')
    }
  })
}
