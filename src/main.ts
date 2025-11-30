import './input.css'
import { supabase } from './lib/supabaseClient'
import { Navigation } from './components/layout/Navigation'
import { renderHome } from './pages/Home'
import { renderMeats } from './pages/Meats'
import { renderProducts } from './pages/Products'
import { renderOffers } from './pages/Offers'
import { renderAuthPage } from './pages/AuthPage'
import { setupAuthPage } from './pages/setupAuthPage'
import { LoginModal } from './components/ui/LoginModal'
import { AddProductModal } from './components/ui/AddProductModal'
import { EditProductModal } from './components/ui/EditProductModal'
import { setupAuth } from './components/auth/setupAuth'
import { setupAddProductModal } from './components/ui/setupAddProductModal'
import { setupEditProductModal } from './components/ui/setupEditProductModal'

// Inicializar el modo oscuro
const isDarkMode = localStorage.getItem('darkMode') === 'true'
if (isDarkMode) {
  document.documentElement.classList.add('dark')
}

// Estado de autenticación
let userRole: string | null = null
let isReloading: boolean = false // 🆕 Bandera para evitar recargas duplicadas

// Initialize state - recuperar de localStorage si existe
let currentPage = localStorage.getItem('currentPage') || 'home'

// Función global para actualizar visibilidad de botones admin
function updateAdminButtons() {
  const adminElements = document.querySelectorAll('.admin-only')
  console.log('🔄 updateAdminButtons - Elementos encontrados:', adminElements.length, 'Role:', userRole)
  
  if (userRole === 'admin') {
    adminElements.forEach(el => {
      (el as HTMLElement).style.display = 'flex'
    })
  } else {
    adminElements.forEach(el => {
      (el as HTMLElement).style.display = 'none'
    })
  }
}

// Función global para actualizar el orden de productos
async function updateProductOrder(productId: number, newOrder: number) {
  try {
    console.log('🔄 Actualizando orden:', productId, '→', newOrder)
    
    const { data, error } = await supabase
      .from('productos')
      .update({ orden: newOrder })
      .eq('id', productId)
      .select()
    
    if (error) {
      console.error('❌ Error en UPDATE:', error)
      throw error
    }
    
    console.log('✅ Orden actualizado exitosamente:', data)
    return true
  } catch (error) {
    console.error('❌ Error actualizando orden:', error)
    return false
  }
}

// Función global para configurar drag & drop (solo admin)
function setupDragAndDrop() {
  if (userRole !== 'admin') {
    console.log('⚠️ Drag & drop solo disponible para admin')
    return
  }
  
  console.log('🎯 Configurando drag & drop para admin')
  
  const productCards = document.querySelectorAll('.product-card')
  let draggedElement: HTMLElement | null = null
  let draggedId: number | null = null
  const pageNavigationArrows: HTMLElement[] = [] // Flechas de navegación entre páginas
  
  // 🆕 Funciones para manejar flechas de navegación entre páginas
  const showPageNavigationArrows = () => {
    // Limpiar flechas anteriores si existen
    hidePageNavigationArrows()
    
    const container = document.querySelector('.container') as HTMLElement
    if (!container) return
    
    // 🔴 FRANJA ROJA IZQUIERDA (página anterior)
    const leftStripe = document.createElement('div')
    leftStripe.id = 'leftPageStripe'
    leftStripe.className = 'fixed left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-red-600 to-transparent opacity-70 z-40 pointer-events-auto'
    leftStripe.style.transition = 'opacity 0.3s ease'
    
    // Flecha izquierda centrada en la franja
    const leftArrow = document.createElement('div')
    leftArrow.id = 'pageNavLeft'
    leftArrow.className = 'fixed left-8 top-1/2 transform -translate-y-1/2 z-50 text-white animate-pulse pointer-events-none drop-shadow-lg'
    leftArrow.innerHTML = `
      <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/>
      </svg>
    `
    
    // 🔴 FRANJA ROJA DERECHA (página siguiente)
    const rightStripe = document.createElement('div')
    rightStripe.id = 'rightPageStripe'
    rightStripe.className = 'fixed right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-red-600 to-transparent opacity-70 z-40 pointer-events-auto'
    rightStripe.style.transition = 'opacity 0.3s ease'
    
    // Flecha derecha centrada en la franja
    const rightArrow = document.createElement('div')
    rightArrow.id = 'pageNavRight'
    rightArrow.className = 'fixed right-8 top-1/2 transform -translate-y-1/2 z-50 text-white animate-pulse pointer-events-none drop-shadow-lg'
    rightArrow.innerHTML = `
      <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/>
      </svg>
    `
    
    // Eventos de drag sobre la FRANJA izquierda
    leftStripe.addEventListener('dragenter', (e) => {
      e.preventDefault()
      leftStripe.style.opacity = '1'
      leftArrow.classList.add('scale-110')
    })
    
    leftStripe.addEventListener('dragover', (e) => {
      e.preventDefault()
    })
    
    leftStripe.addEventListener('dragleave', (e) => {
      // Solo ocultar si realmente salimos de la franja
      const rect = leftStripe.getBoundingClientRect()
      if (e.clientX > rect.right) {
        leftStripe.style.opacity = '0.7'
        leftArrow.classList.remove('scale-110')
      }
    })
    
    leftStripe.addEventListener('drop', async (e) => {
      e.preventDefault()
      leftStripe.style.opacity = '0.7'
      leftArrow.classList.remove('scale-110')
      await moveProductToPreviousPage()
    })
    
    // Eventos de drag sobre la FRANJA derecha
    rightStripe.addEventListener('dragenter', (e) => {
      e.preventDefault()
      rightStripe.style.opacity = '1'
      rightArrow.classList.add('scale-110')
    })
    
    rightStripe.addEventListener('dragover', (e) => {
      e.preventDefault()
    })
    
    rightStripe.addEventListener('dragleave', (e) => {
      // Solo ocultar si realmente salimos de la franja
      const rect = rightStripe.getBoundingClientRect()
      if (e.clientX < rect.left) {
        rightStripe.style.opacity = '0.7'
        rightArrow.classList.remove('scale-110')
      }
    })
    
    rightStripe.addEventListener('drop', async (e) => {
      e.preventDefault()
      rightStripe.style.opacity = '0.7'
      rightArrow.classList.remove('scale-110')
      await moveProductToNextPage()
    })
    
    // Agregar al DOM
    document.body.appendChild(leftStripe)
    document.body.appendChild(leftArrow)
    document.body.appendChild(rightStripe)
    document.body.appendChild(rightArrow)
    
    pageNavigationArrows.push(leftStripe, leftArrow, rightStripe, rightArrow)
  }
  
  const hidePageNavigationArrows = () => {
    pageNavigationArrows.forEach(arrow => {
      if (arrow && arrow.parentNode) {
        arrow.parentNode.removeChild(arrow)
      }
    })
    pageNavigationArrows.length = 0
  }
  
  const moveProductToPreviousPage = async () => {
    if (!draggedId) {
      console.error('❌ No hay producto arrastrado')
      return
    }
    
    console.log('📄 Intentando mover producto', draggedId, 'a página anterior')
    
    const confirmed = confirm('¿Mover este producto a la página anterior?')
    if (!confirmed) {
      console.log('❌ Usuario canceló el movimiento')
      hidePageNavigationArrows()
      if (draggedElement) {
        draggedElement.classList.remove('opacity-40', 'scale-95')
        draggedElement.style.cursor = 'grab'
      }
      draggedElement = null
      draggedId = null
      return
    }
    
    await moveProductBetweenPages(draggedId, 'previous')
    hidePageNavigationArrows()
    if (draggedElement) {
      draggedElement.classList.remove('opacity-40', 'scale-95')
      draggedElement.style.cursor = 'grab'
    }
    draggedElement = null
    draggedId = null
  }
  
  const moveProductToNextPage = async () => {
    if (!draggedId) {
      console.error('❌ No hay producto arrastrado')
      return
    }
    
    console.log('📄 Intentando mover producto', draggedId, 'a página siguiente')
    
    const confirmed = confirm('¿Mover este producto a la página siguiente?')
    if (!confirmed) {
      console.log('❌ Usuario canceló el movimiento')
      hidePageNavigationArrows()
      if (draggedElement) {
        draggedElement.classList.remove('opacity-40', 'scale-95')
        draggedElement.style.cursor = 'grab'
      }
      draggedElement = null
      draggedId = null
      return
    }
    
    await moveProductBetweenPages(draggedId, 'next')
    hidePageNavigationArrows()
    if (draggedElement) {
      draggedElement.classList.remove('opacity-40', 'scale-95')
      draggedElement.style.cursor = 'grab'
    }
    draggedElement = null
    draggedId = null
  }
  
  const moveProductBetweenPages = async (productId: number, direction: 'previous' | 'next') => {
    console.log(`📄 Moviendo producto ${productId} a la página ${direction === 'next' ? 'siguiente' : 'anterior'}`)
    
    const PRODUCTS_PER_PAGE = 16
    let allProducts: any[] = []
    
    // 🔧 CRÍTICO: Obtener productos aplicando los MISMOS filtros que la paginación
    // Esto asegura que estamos trabajando con el mismo conjunto de datos visible
    
    // Obtener los productos según la página actual
    if (currentPage === 'meats') {
      // Para carnes, filtrar por categoría
      let query = supabase
        .from('productos')
        .select('id, orden')
        .eq('categoria', 'carnes')
      
      // 🆕 IMPORTANTE: Filtrar por activo si NO es admin (igual que la paginación)
      if (userRole !== 'admin') {
        query = query.eq('activo', true)
      }
      
      query = query.order('orden', { ascending: true })
      
      const { data } = await query
      allProducts = data || []
    } else if (currentPage === 'products') {
      // Para productos, excluir carnes
      let query = supabase
        .from('productos')
        .select('id, orden')
        .neq('categoria', 'carnes')
      
      // 🆕 IMPORTANTE: Filtrar por activo si NO es admin
      if (userRole !== 'admin') {
        query = query.eq('activo', true)
      }
      
      query = query.order('orden', { ascending: true })
      
      const { data } = await query
      allProducts = data || []
    } else if (currentPage === 'offers') {
      // Para ofertas, filtrar por descuento > 0
      let query = supabase
        .from('productos')
        .select('id, orden')
        .gt('descuento', 0)
      
      // 🆕 IMPORTANTE: Filtrar por activo si NO es admin
      if (userRole !== 'admin') {
        query = query.eq('activo', true)
      }
      
      query = query.order('orden', { ascending: true })
      
      const { data } = await query
      allProducts = data || []
    } else {
      console.error('❌ Página actual no soportada para mover productos:', currentPage)
      return
    }
    
    if (!allProducts || allProducts.length === 0) {
      console.error('❌ No se obtuvieron productos')
      return
    }
    
    console.log('📊 Productos obtenidos para movimiento:', {
      total: allProducts.length,
      userRole,
      currentPage,
      productIds: allProducts.map(p => p.id)
    })
    
    // Encontrar el índice del producto actual en el array filtrado
    const currentIndex = allProducts.findIndex(p => p.id === productId)
    if (currentIndex === -1) {
      console.error('❌ No se encontró el producto en la lista')
      alert('❌ Error: El producto no se encuentra en la lista actual')
      return
    }
    
    // 🆕 NUEVA LÓGICA: Calcular página actual y determinar si existe página destino
    const currentPageNum = Math.floor(currentIndex / PRODUCTS_PER_PAGE) + 1
    const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE)
    
    let targetPageNum: number
    let targetIndex: number
    
    if (direction === 'next') {
      targetPageNum = currentPageNum + 1
      // Validar que existe la página siguiente
      if (targetPageNum > totalPages) {
        alert('No hay página siguiente')
        console.log('⚠️ No existe página siguiente. Página actual:', currentPageNum, 'Total páginas:', totalPages)
        return
      }
      // Mover al PRIMER producto de la página siguiente
      targetIndex = (targetPageNum - 1) * PRODUCTS_PER_PAGE
    } else {
      targetPageNum = currentPageNum - 1
      // Validar que existe la página anterior
      if (targetPageNum < 1) {
        alert('No hay página anterior')
        console.log('⚠️ No existe página anterior. Página actual:', currentPageNum)
        return
      }
      // Mover al ÚLTIMO producto de la página anterior
      const endOfPrevPage = Math.min(targetPageNum * PRODUCTS_PER_PAGE - 1, allProducts.length - 1)
      targetIndex = endOfPrevPage
    }
    
    console.log('📊 Debug movimiento:', {
      currentIndex,
      currentPageNum,
      targetPageNum,
      targetIndex,
      totalProducts: allProducts.length,
      totalPages,
      direction,
      currentProductId: productId
    })
    
    // Validar que el índice objetivo existe (doble verificación)
    if (targetIndex < 0 || targetIndex >= allProducts.length) {
      alert('No hay página ' + (direction === 'next' ? 'siguiente' : 'anterior'))
      console.log('⚠️ Índice objetivo fuera de rango:', targetIndex, '(total productos:', allProducts.length, ')')
      return
    }
    
    // Obtener los productos a intercambiar
    const currentProduct = allProducts[currentIndex]
    const targetProduct = allProducts[targetIndex]
    
    console.log('🔄 Intercambiando orden:', {
      currentId: currentProduct.id,
      currentOrder: currentProduct.orden,
      targetId: targetProduct.id,
      targetOrder: targetProduct.orden,
      movingFrom: `Página ${currentPageNum}, índice ${currentIndex}`,
      movingTo: `Página ${targetPageNum}, índice ${targetIndex}`
    })
    
    // Intercambiar órdenes
    await updateProductOrder(currentProduct.id, targetProduct.orden)
    await updateProductOrder(targetProduct.id, currentProduct.orden)
    
    // Recargar la página actual
    await reloadCurrentPage()
  }
  
  const reloadCurrentPage = async () => {
    if (isReloading) {
      console.log('⚠️ Ya hay una recarga en proceso, saltando...')
      return
    }
    
    isReloading = true
    console.log('🔄 Recargando página actual:', currentPage)
    const pageContent = document.getElementById('pageContent')
    
    if (!pageContent || !currentPage) {
      console.error('❌ No se puede recargar: pageContent o currentPage no disponible')
      isReloading = false
      return
    }
    
    // Limpiar el contenido primero
    pageContent.innerHTML = ''
    
    // Renderizar el contenido nuevo
    if (currentPage === 'meats') {
      pageContent.innerHTML = renderMeats()
    } else if (currentPage === 'products') {
      pageContent.innerHTML = renderProducts()
    } else if (currentPage === 'offers') {
      pageContent.innerHTML = renderOffers()
    }
    
    // Esperar a que el DOM se actualice antes de adjuntar eventos
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Adjuntar eventos y funcionalidad
    attachUIForContent()
    
    // Importar y configurar paginación
    const { setupPagination } = await import('./pages/pagination')
    
    if (currentPage === 'meats') {
      await setupPagination('meatsGrid', 'meatsPagination', 'carnes')
    } else if (currentPage === 'products') {
      await setupPagination('productsGrid', 'productsPagination', 'productos', true)
    } else if (currentPage === 'offers') {
      await setupPagination('offersGrid', 'offersPagination', undefined, false, true)
    }
    
    console.log('✅ Página recargada exitosamente')
    isReloading = false
    alert('✅ Producto movido correctamente')
  }
  
  productCards.forEach((card) => {
    const element = card as HTMLElement
    
    // Hacer draggable solo si es admin
    element.setAttribute('draggable', 'true')
    element.style.cursor = 'grab'
    
    // Evento: inicio del drag
    element.addEventListener('dragstart', (_e) => {
      draggedElement = element
      draggedId = parseInt(element.getAttribute('data-product-id') || '0')
      element.style.cursor = 'grabbing'
      element.classList.add('opacity-40', 'scale-95')
      element.style.transition = 'all 0.2s ease'
      console.log('🎯 Arrastrando producto:', draggedId)
      
      // 🆕 Mostrar flechas de navegación entre páginas
      showPageNavigationArrows()
    })
    
    // Evento: fin del drag
    element.addEventListener('dragend', () => {
      element.classList.remove('opacity-40', 'scale-95')
      element.style.cursor = 'grab'
      
      // 🆕 Ocultar flechas de navegación
      hidePageNavigationArrows()
    })
    
    // Evento: cuando otro elemento pasa por encima
    element.addEventListener('dragover', (e) => {
      e.preventDefault()
      if (draggedElement && draggedElement !== element) {
        element.classList.add('ring-4', 'ring-primary-500', 'ring-offset-2', 'scale-105')
        element.style.transition = 'all 0.2s ease'
      }
    })
    
    // Evento: cuando sale de encima
    element.addEventListener('dragleave', () => {
      element.classList.remove('ring-4', 'ring-primary-500', 'ring-offset-2', 'scale-105')
    })
    
    // Evento: cuando se suelta encima
    element.addEventListener('drop', async (e) => {
      e.preventDefault()
      element.classList.remove('ring-4', 'ring-primary-500', 'ring-offset-2', 'scale-105')
      
      if (!draggedElement || draggedElement === element) return
      
      const targetId = parseInt(element.getAttribute('data-product-id') || '0')
      
      if (!draggedId || !targetId) return
      
      // Confirmación antes de reordenar
      const confirmed = confirm('¿Intercambiar el orden de estos productos?')
      if (!confirmed) {
        if (draggedElement) {
          draggedElement.classList.remove('opacity-40', 'scale-95')
        }
        return
      }
      
      console.log('📦 Intercambiando orden:', draggedId, '↔', targetId)
      console.log('📍 Página actual:', currentPage) // 🆕 Debug
      
      // Obtener órdenes actuales
      const { data: products } = await supabase
        .from('productos')
        .select('id, orden')
        .in('id', [draggedId, targetId])
      
      console.log('📊 Productos obtenidos:', products)
      
      if (!products || products.length !== 2) {
        console.error('❌ Error: No se obtuvieron 2 productos. Recibidos:', products?.length)
        return
      }
      
      // 🔧 CORREGIDO: Comparar IDs convirtiendo a número
      const draggedProduct = products.find(p => Number(p.id) === Number(draggedId))
      const targetProduct = products.find(p => Number(p.id) === Number(targetId))
      
      console.log('🔍 Productos encontrados:', { draggedProduct, targetProduct }) // 🆕 Debug
      
      if (!draggedProduct || !targetProduct) {
        console.error('❌ Error: No se encontraron productos en la respuesta')
        console.error('❌ Buscando IDs:', { draggedId, targetId })
        console.error('❌ IDs en respuesta:', products.map(p => ({ id: p.id, tipo: typeof p.id })))
        return
      }
      
      console.log('🔄 Actualizando órdenes en BD...')
      
      // 🔧 MEJORADO: Usar órdenes únicas basadas en ID si los órdenes son iguales
      let newDraggedOrder = targetProduct.orden
      let newTargetOrder = draggedProduct.orden
      
      // Si ambos tienen el mismo orden, usar los IDs como orden temporal
      if (draggedProduct.orden === targetProduct.orden) {
        console.log('⚠️ Advertencia: Ambos productos tienen el mismo orden, usando IDs como base')
        newDraggedOrder = targetId
        newTargetOrder = draggedId
      }
      
      // Intercambiar órdenes
      const result1 = await updateProductOrder(draggedId, newDraggedOrder)
      const result2 = await updateProductOrder(targetId, newTargetOrder)
      
      console.log('✅ Resultado actualizaciones:', { result1, result2 })
      
      if (!result1 || !result2) {
        console.error('❌ Error al actualizar órdenes en BD')
        alert('❌ Error al reordenar productos. Verifica la consola.')
        return
      }
      
      // Recargar página actual con animación
      console.log('🔄 Recargando vista después de intercambio...')
      console.log('📍 currentPage:', currentPage)
      
      if (isReloading) {
        console.log('⚠️ Ya hay una recarga en proceso, saltando...')
        draggedElement = null
        draggedId = null
        return
      }
      
      isReloading = true
      const pageContent = document.getElementById('pageContent')
      
      if (pageContent && currentPage) {
        // Limpiar contenido
        pageContent.innerHTML = ''
        
        // Renderizar de nuevo
        if (currentPage === 'meats') {
          pageContent.innerHTML = renderMeats()
        } else if (currentPage === 'products') {
          pageContent.innerHTML = renderProducts()
        } else if (currentPage === 'offers') {
          pageContent.innerHTML = renderOffers()
        }
        
        // Esperar un momento antes de adjuntar eventos
        await new Promise(resolve => setTimeout(resolve, 100))
        
        attachUIForContent()
        
        // Reinicializar paginación
        const { setupPagination } = await import('./pages/pagination')
        
        if (currentPage === 'meats') {
          await setupPagination('meatsGrid', 'meatsPagination', 'carnes')
        } else if (currentPage === 'products') {
          await setupPagination('productsGrid', 'productsPagination', 'productos', true)
        } else if (currentPage === 'offers') {
          await setupPagination('offersGrid', 'offersPagination', undefined, false, true)
        }
        
        console.log('✅ Vista actualizada con nuevo orden')
        isReloading = false
      } else {
        isReloading = false
      }
      
      // 🔧 IMPORTANTE: Resetear draggedElement y draggedId DESPUÉS de usarlos
      draggedElement = null
      draggedId = null
    })
  })
}

// Función global para activar productos inactivos
async function activateProduct(productId: number) {
  try {
    console.log('🟢 Activando producto:', productId)
    
    const { error } = await supabase
      .from('productos')
      .update({ activo: true })
      .eq('id', productId)
    
    if (error) throw error
    
    console.log('✅ Producto activado exitosamente')
    console.log('📍 Página actual:', currentPage)
    
    // Obtener referencia a pageContent ANTES del setTimeout
    const pageContent = document.getElementById('pageContent')
    
    if (!pageContent) {
      console.error('❌ No se encontró pageContent')
      alert('✅ Producto activado correctamente')
      return
    }
    
    console.log('🔄 Iniciando recarga de página:', currentPage)
    
    // Recargar INMEDIATAMENTE sin setTimeout
    if (currentPage === 'home') {
      console.log('🏠 Recargando Home...')
      pageContent.innerHTML = renderHome()
    } else if (currentPage === 'meats') {
      console.log('🥩 Recargando Carnes...')
      pageContent.innerHTML = renderMeats()
    } else if (currentPage === 'products') {
      console.log('📦 Recargando Productos...')
      pageContent.innerHTML = renderProducts()
    } else if (currentPage === 'offers') {
      console.log('🏷️ Recargando Ofertas...')
      pageContent.innerHTML = renderOffers()
    }
    
    console.log('✅ HTML actualizado, re-adjuntando eventos...')
    
    // Re-adjuntar eventos DESPUÉS de renderizar
    attachUIForContent()
    
    // ✨ NUEVO: Reinicializar paginación según la página actual
    const { setupPagination } = await import('./pages/pagination')
    
    if (currentPage === 'meats') {
      await setupPagination('meatsGrid', 'meatsPagination', 'carnes')
    } else if (currentPage === 'products') {
      await setupPagination('productsGrid', 'productsPagination', 'productos', true)
    } else if (currentPage === 'offers') {
      await setupPagination('offersGrid', 'offersPagination', undefined, false, true)
    }
    
    console.log('✅ Paginación reinicializada')
    console.log('✅ Eventos re-adjuntados')
    
    // Mostrar mensaje DESPUÉS de todo
    setTimeout(() => {
      alert('✅ Producto activado correctamente')
    }, 200)
    
  } catch (error) {
    console.error('❌ Error activando producto:', error)
    alert('❌ Error al activar el producto')
  }
}

// Exponer funciones globalmente
window.updateAdminButtons = updateAdminButtons
window.activateProduct = activateProduct
window.setupDragAndDrop = setupDragAndDrop
window.updateProductOrder = updateProductOrder

// Check authentication status
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    console.log('🔑 Sesión encontrada, obteniendo rol desde BD...')
    
    // SIEMPRE obtener el rol DIRECTAMENTE de la base de datos
    // NO confiar en el JWT porque puede estar desactualizado
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
    
    if (error) {
      console.error('❌ Error obteniendo perfil:', error)
      console.error('❌ Detalles:', { userId: session.user.id, email: session.user.email })
      userRole = 'user' // Default a user si hay error
      window.userRole = 'user'
    } else if (!profile) {
      console.error('❌ No se encontró perfil para el usuario')
      userRole = 'user'
      window.userRole = 'user'
    } else {
      userRole = profile.role || 'user'
      window.userRole = userRole
      console.log('✅ Rol obtenido de BD:', userRole)
    }
    
    console.log('🔐 Usuario autenticado:', { 
      email: session.user.email, 
      userId: session.user.id,
      roleBD: userRole,
      profileData: profile
    })
    return true
  }
  
  userRole = null
  window.userRole = null
  console.log('❌ No hay sesión activa')
  return false
}

// Router function
function renderPage(page: string) {
  switch(page) {
    case 'home':
      return renderHome()
    case 'meats':
      return renderMeats()
    case 'products':
      return renderProducts()
    case 'offers':
      return renderOffers()
    default:
      return renderHome()
  }
}

// Render initial state
function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      ${Navigation()}
      <main id="pageContent">
        ${renderPage(currentPage)}
      </main>
    </div>
  `

  // Renderizar modales directamente en el body (solo una vez)
  if (!document.getElementById('loginModal')) {
    console.log('✨ Renderizando loginModal por primera vez')
    document.body.insertAdjacentHTML('beforeend', LoginModal())
  } else {
    console.log('⚠️ loginModal ya existe, saltando...')
  }
  if (!document.getElementById('addProductModal')) {
    console.log('✨ Renderizando addProductModal por primera vez')
    document.body.insertAdjacentHTML('beforeend', AddProductModal())
  } else {
    console.log('⚠️ addProductModal ya existe, saltando...')
  }
  if (!document.getElementById('editProductModal')) {
    console.log('✨ Renderizando editProductModal por primera vez')
    document.body.insertAdjacentHTML('beforeend', EditProductModal())
  } else {
    console.log('⚠️ editProductModal ya existe, saltando...')
  }

  // After render, attach UI event handlers
  attachUI()
}

// Render auth page
function renderAuthPageView() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = renderAuthPage()
  setupAuthPage()
}

// Attach UI handlers solo para contenido dinámico (sin duplicar event listeners de la nav)
function attachUIForContent() {
  console.log('🔧 attachUIForContent - userRole:', userRole)
  
  // Initialize auth handlers
  try {
    setupAuth()
    setupAddProductModal()
    setupEditProductModal()
    
    // Show/hide admin elements based on role
    const adminElements = document.querySelectorAll('.admin-only')
    console.log('📊 Elementos admin encontrados:', adminElements.length)
    
    if (userRole === 'admin') {
      console.log('✅ Usuario es ADMIN - mostrando botones')
      adminElements.forEach(el => {
        (el as HTMLElement).style.display = 'flex'
      })
      
      // Nota: setupDragAndDrop() se llama automáticamente desde pagination.ts
      // después de renderizar productos, así que no es necesario llamarlo aquí
    } else {
      console.log('❌ Usuario NO es admin - ocultando botones (role:', userRole, ')')
      adminElements.forEach(el => {
        (el as HTMLElement).style.display = 'none'
      })
    }
  } catch (e) {
    console.error('❌ Error en attachUIForContent:', e)
  }
}

function attachUI() {
  // Mobile menu
  document.getElementById('menuButton')?.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobileMenu')
    mobileMenu?.classList.toggle('hidden')
  })

  // Dark mode toggle
  document.getElementById('darkModeToggle')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark')
    const isDark = document.documentElement.classList.contains('dark')
    localStorage.setItem('darkMode', isDark.toString())
  })

  // User menu dropdown
  const userMenuButton = document.getElementById('userMenuButton')
  const userDropdown = document.getElementById('userDropdown')
  
  userMenuButton?.addEventListener('click', () => {
    userDropdown?.classList.toggle('hidden')
  })

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (userDropdown && !userMenuButton?.contains(e.target as Node) && !userDropdown.contains(e.target as Node)) {
      userDropdown.classList.add('hidden')
    }
  })

  // Logout button
  document.getElementById('logoutButton')?.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      console.log('✅ Sesión cerrada')
      window.location.reload()
    } else {
      console.error('❌ Error al cerrar sesión:', error)
    }
  })

  // Mobile logout button
  document.getElementById('mobileLogoutButton')?.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      console.log('✅ Sesión cerrada')
      window.location.reload()
    } else {
      console.error('❌ Error al cerrar sesión:', error)
    }
  })

  // Show user email in nav
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      const userEmail = document.getElementById('userEmail')
      const dropdownEmail = document.getElementById('dropdownEmail')
      const mobileUserEmail = document.getElementById('mobileUserEmail')
      const mobileUserInfo = document.getElementById('mobileUserInfo')
      const email = session.user.email || ''
      const shortEmail = email.length > 20 ? email.substring(0, 17) + '...' : email
      
      // Desktop
      if (userEmail) userEmail.textContent = shortEmail
      if (dropdownEmail) dropdownEmail.textContent = email
      userMenuButton?.classList.remove('hidden')
      userMenuButton?.classList.add('flex')
      
      // Mobile
      if (mobileUserEmail) mobileUserEmail.textContent = email
      mobileUserInfo?.classList.remove('hidden')
    }
  })

  // Search modal
  document.getElementById('searchButton')?.addEventListener('click', () => {
    document.getElementById('searchModal')?.classList.remove('hidden')
  })
  document.getElementById('closeSearch')?.addEventListener('click', () => {
    document.getElementById('searchModal')?.classList.add('hidden')
  })

  // Close modal with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('searchModal')?.classList.add('hidden')
    }
  })

  // Función para registrar event listeners de navegación
  function setupNavigationListeners() {
    document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault()
        const page = link.dataset.page
        if (page) {
          currentPage = page
          localStorage.setItem('currentPage', page) // Guardar en localStorage
          
          // Scroll suave al inicio al cambiar de sección
          window.scrollTo({ top: 0, behavior: 'smooth' })
          
          // re-render page content only
          const pageContent = document.getElementById('pageContent')
          if (pageContent) pageContent.innerHTML = renderPage(currentPage)
          
          // re-attach UI for new content (pero NO para la navegación)
          attachUIForContent()
          
          // ✨ Volver a registrar listeners de navegación para el nuevo contenido
          setupNavigationListeners()
          
          // ✨ NUEVO: Reinicializar paginación después de cambiar sección
          const { setupPagination } = await import('./pages/pagination')
          
          if (currentPage === 'meats') {
            await setupPagination('meatsGrid', 'meatsPagination', 'carnes')
          } else if (currentPage === 'products') {
            await setupPagination('productsGrid', 'productsPagination', 'productos', true)
          } else if (currentPage === 'offers') {
            await setupPagination('offersGrid', 'offersPagination', undefined, false, true)
          }
        }
      })
    })
  }

  // Navigation links (router) - Llamar la función al inicio
  setupNavigationListeners()

  // Initialize auth handlers
  try {
    setupAuth()
    
    // Dar tiempo al DOM para renderizar los modales antes de hacer setup
    setTimeout(() => {
      setupAddProductModal()
      setupEditProductModal()
    }, 100)
    
    // Show/hide admin elements based on role
    const adminElements = document.querySelectorAll('.admin-only')
    console.log('📊 [attachUI] Elementos admin encontrados:', adminElements.length, 'Role:', userRole)
    
    if (userRole === 'admin') {
      console.log('✅ [attachUI] Usuario es ADMIN - mostrando botones')
      adminElements.forEach(el => {
        (el as HTMLElement).style.display = 'flex'
      })
    } else {
      console.log('❌ [attachUI] Usuario NO es admin - ocultando botones')
      adminElements.forEach(el => {
        (el as HTMLElement).style.display = 'none'
      })
    }
  } catch (e) {
    console.error('❌ Error en attachUI:', e)
  }

  // Predictive search (global simple implementation)
  const searchInput = document.getElementById('searchInput') as HTMLInputElement | null
  const searchResults = document.getElementById('searchResults')
  searchInput?.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase()
    if (query.length < 2) {
      if (searchResults) searchResults.innerHTML = ''
      return
    }
    const results = [
      'Ribeye', 'T-Bone', 'Picaña', 'Arrachera', 'Chorizo', 'Costillas'
    ].filter(item => item.toLowerCase().includes(query))
    if (searchResults) {
      searchResults.innerHTML = results.map(r => `\n        <div class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">${r}</div>\n      `).join('')
    }
  })
}

// Initial render - NO requiere auth para visitantes
async function init() {
  // Por defecto, renderizar app como visitante
  renderApp()
  
  // Intentar verificar si hay sesión de admin
  const authenticated = await checkAuth()
  
  if (authenticated) {
    console.log('✅ Admin autenticado')
    updateAdminButtons()
  } else {
    console.log('👤 Visitante (sin login)')
  }
  
  // 🆕 Configurar acceso secreto para admin (doble click en el logo)
  setTimeout(() => {
    const logo = document.getElementById('adminSecretAccess')
    if (logo) {
      let clickCount = 0
      let clickTimer: NodeJS.Timeout | null = null
      
      logo.addEventListener('click', (e) => {
        e.preventDefault()
        clickCount++
        
        if (clickCount === 1) {
          clickTimer = setTimeout(() => {
            clickCount = 0
          }, 500) // Reset después de 500ms
        } else if (clickCount === 2) {
          if (clickTimer) clearTimeout(clickTimer)
          clickCount = 0
          
          // Abrir modal de login para admin
          const loginModal = document.getElementById('loginModal')
          if (loginModal) {
            loginModal.classList.remove('hidden')
            loginModal.classList.add('flex')
          } else {
            // Si no existe el modal, navegar a página de auth
            renderAuthPageView()
          }
        }
      })
    }
  }, 500)
  
  // 🆕 Inicializar paginación si estamos en una página con productos
  const { setupPagination } = await import('./pages/pagination')
  
  if (currentPage === 'meats') {
    await setupPagination('meatsGrid', 'meatsPagination', 'carnes')
  } else if (currentPage === 'products') {
    await setupPagination('productsGrid', 'productsPagination', 'productos', true)
  } else if (currentPage === 'offers') {
    await setupPagination('offersGrid', 'offersPagination', undefined, false, true)
  }
  
  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('🔄 Auth state changed:', event)
    if (event === 'SIGNED_IN' && session) {
      window.location.reload()
    } else if (event === 'SIGNED_OUT') {
      userRole = null
      updateAdminButtons()
    }
  })
}

// Start app
init()

// Declaraciones globales para TypeScript
declare global {
  interface Window {
    updateAdminButtons: () => void
  }
}
