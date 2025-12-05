import './input.css'
import { supabase } from './lib/supabaseClient'
import { notificationService } from './lib/notificationService'
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

// Estado de autenticaci�n
let userRole: string | null = null
let isReloading: boolean = false // 🔄 Bandera para evitar recargas duplicadas

// Initialize state - recuperar de localStorage si existe
let currentPage = localStorage.getItem('currentPage') || 'home'

// Funci�n global para actualizar visibilidad de botones admin
function updateAdminButtons() {
  const adminElements = document.querySelectorAll('.admin-only')
  console.log('🔍 updateAdminButtons - Elementos encontrados:', adminElements.length, 'Role:', userRole)
  
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

// Funci�n global para actualizar el orden de productos
async function updateProductOrder(productId: number, newOrder: number) {
  try {
    console.log('🔍 Actualizando orden:', productId, '?', newOrder)
    
    const { data, error } = await supabase
      .from('productos')
      .update({ orden: newOrder })
      .eq('id', productId)
      .select()
    
    if (error) {
      console.error('? Error en UPDATE:', error)
      throw error
    }
    
    console.log('✅ Orden actualizado exitosamente:', data)
    return true
  } catch (error) {
    console.error('? Error actualizando orden:', error)
    return false
  }
}

// Función global para configurar drag & drop (solo admin)
function setupDragAndDrop() {
  if (userRole !== 'admin') {
    console.log('🔍 Drag & drop solo disponible para admin')
    return
  }
  
  console.log('🔍 Configurando drag & drop para admin')
  
  const productCards = document.querySelectorAll('.product-card')
  let draggedElement: HTMLElement | null = null
  let draggedId: number | null = null
  const pageNavigationArrows: HTMLElement[] = [] // Flechas de navegaci�n entre p�ginas
  
  // 🔄 Funciones para manejar flechas de navegaci�n entre p�ginas
  const showPageNavigationArrows = () => {
    // Limpiar flechas anteriores si existen
    hidePageNavigationArrows()
    
    const container = document.querySelector('.container') as HTMLElement
    if (!container) return
    
    // 🔄 FRANJA ROJA IZQUIERDA (p�gina anterior)
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
    
    // FRANJA ROJA DERECHA (página siguiente)
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
      console.error('? No hay producto arrastrado')
      return
    }
    
    console.log('🔍 Intentando mover producto', draggedId, 'a página anterior')
    
    const confirmed = confirm('¿Mover este producto a la página anterior?')
    if (!confirmed) {
      console.log('✅ Usuario canceló el movimiento')
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
      console.error('? No hay producto arrastrado')
      return
    }
    
    console.log('🔍 Intentando mover producto', draggedId, 'a p�gina siguiente')
    
    const confirmed = confirm('�Mover este producto a la p�gina siguiente?')
    if (!confirmed) {
      console.log('✅ Usuario cancel� el movimiento')
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
    console.log(`?? Moviendo producto ${productId} a la p�gina ${direction === 'next' ? 'siguiente' : 'anterior'}`)
    
    const PRODUCTS_PER_PAGE = 16
    let allProducts: any[] = []
    
    // 🔄 CR�TICO: Obtener productos aplicando los MISMOS filtros que la paginaci�n
    // Esto asegura que estamos trabajando con el mismo conjunto de datos visible
    
    // Obtener los productos seg�n la p�gina actual
    if (currentPage === 'meats') {
      // Para carnes, filtrar por categor�a
      let query = supabase
        .from('productos')
        .select('id, orden')
        .eq('categoria', 'carnes')
      
      // 🔄 IMPORTANTE: Filtrar por activo si NO es admin (igual que la paginaci�n)
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
      
      // 🔄 IMPORTANTE: Filtrar por activo si NO es admin
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
      
      // 🔄 IMPORTANTE: Filtrar por activo si NO es admin
      if (userRole !== 'admin') {
        query = query.eq('activo', true)
      }
      
      query = query.order('orden', { ascending: true })
      
      const { data } = await query
      allProducts = data || []
    } else {
      console.error('? P�gina actual no soportada para mover productos:', currentPage)
      return
    }
    
    if (!allProducts || allProducts.length === 0) {
      console.error('? No se obtuvieron productos')
      return
    }
    
    console.log('🔍 Productos obtenidos para movimiento:', {
      total: allProducts.length,
      userRole,
      currentPage,
      productIds: allProducts.map(p => p.id)
    })
    
    // Encontrar el �ndice del producto actual en el array filtrado
    const currentIndex = allProducts.findIndex(p => p.id === productId)
    if (currentIndex === -1) {
      console.error('? No se encontr� el producto en la lista')
      alert('? Error: El producto no se encuentra en la lista actual')
      return
    }
    
    // 🔄 NUEVA L�GICA: Calcular p�gina actual y determinar si existe p�gina destino
    const currentPageNum = Math.floor(currentIndex / PRODUCTS_PER_PAGE) + 1
    const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE)
    
    let targetPageNum: number
    let targetIndex: number
    
    if (direction === 'next') {
      targetPageNum = currentPageNum + 1
      // Validar que existe la p�gina siguiente
      if (targetPageNum > totalPages) {
        alert('No hay p�gina siguiente')
        console.log('🔍 No existe p�gina siguiente. P�gina actual:', currentPageNum, 'Total p�ginas:', totalPages)
        return
      }
      // Mover al PRIMER producto de la p�gina siguiente
      targetIndex = (targetPageNum - 1) * PRODUCTS_PER_PAGE
    } else {
      targetPageNum = currentPageNum - 1
      // Validar que existe la p�gina anterior
      if (targetPageNum < 1) {
        alert('No hay p�gina anterior')
        console.log('🔍 No existe p�gina anterior. P�gina actual:', currentPageNum)
        return
      }
      // Mover al �LTIMO producto de la p�gina anterior
      const endOfPrevPage = Math.min(targetPageNum * PRODUCTS_PER_PAGE - 1, allProducts.length - 1)
      targetIndex = endOfPrevPage
    }
    
    console.log('🔍 Debug movimiento:', {
      currentIndex,
      currentPageNum,
      targetPageNum,
      targetIndex,
      totalProducts: allProducts.length,
      totalPages,
      direction,
      currentProductId: productId
    })
    
    // Validar que el �ndice objetivo existe (doble verificaci�n)
    if (targetIndex < 0 || targetIndex >= allProducts.length) {
      alert('No hay p�gina ' + (direction === 'next' ? 'siguiente' : 'anterior'))
      console.log('🔍 �ndice objetivo fuera de rango:', targetIndex, '(total productos:', allProducts.length, ')')
      return
    }
    
    // Obtener los productos a intercambiar
    const currentProduct = allProducts[currentIndex]
    const targetProduct = allProducts[targetIndex]
    
    console.log('🔍 Intercambiando orden:', {
      currentId: currentProduct.id,
      currentOrder: currentProduct.orden,
      targetId: targetProduct.id,
      targetOrder: targetProduct.orden,
      movingFrom: `P�gina ${currentPageNum}, �ndice ${currentIndex}`,
      movingTo: `P�gina ${targetPageNum}, �ndice ${targetIndex}`
    })
    
    // Intercambiar �rdenes
    await updateProductOrder(currentProduct.id, targetProduct.orden)
    await updateProductOrder(targetProduct.id, currentProduct.orden)
    
    // Recargar la p�gina actual
    await reloadCurrentPage()
  }
  
  const reloadCurrentPage = async () => {
    if (isReloading) {
      console.log('🔍 Ya hay una recarga en proceso, saltando...')
      return
    }
    
    isReloading = true
    console.log('🔍 Recargando p�gina actual:', currentPage)
    const pageContent = document.getElementById('pageContent')
    
    if (!pageContent || !currentPage) {
      console.error('? No se puede recargar: pageContent o currentPage no disponible')
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
    
    // Importar y configurar paginaci�n
    const { setupPagination } = await import('./pages/pagination')
    
    if (currentPage === 'meats') {
      await setupPagination('meatsGrid', 'meatsPagination', 'carnes')
    } else if (currentPage === 'products') {
      await setupPagination('productsGrid', 'productsPagination', 'productos', true)
    } else if (currentPage === 'offers') {
      await setupPagination('offersGrid', 'offersPagination', undefined, false, true)
    }
    
    console.log('✅ P�gina recargada exitosamente')
    isReloading = false
    alert('? Producto movido correctamente')
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
      console.log('🔍 Arrastrando producto:', draggedId)
      
      // 🔄 Mostrar flechas de navegaci�n entre p�ginas
      showPageNavigationArrows()
    })
    
    // Evento: fin del drag
    element.addEventListener('dragend', () => {
      element.classList.remove('opacity-40', 'scale-95')
      element.style.cursor = 'grab'
      
      // 🔄 Ocultar flechas de navegaci�n
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
      
      // Confirmaci�n antes de reordenar
      const confirmed = confirm('�Intercambiar el orden de estos productos?')
      if (!confirmed) {
        if (draggedElement) {
          draggedElement.classList.remove('opacity-40', 'scale-95')
        }
        return
      }
      
      console.log('🔍 Intercambiando orden:', draggedId, '?', targetId)
      console.log('🔍 P�gina actual:', currentPage) // 🔄 Debug
      
      // Obtener �rdenes actuales
      const { data: products } = await supabase
        .from('productos')
        .select('id, orden')
        .in('id', [draggedId, targetId])
      
      console.log('🔍 Productos obtenidos:', products)
      
      if (!products || products.length !== 2) {
        console.error('? Error: No se obtuvieron 2 productos. Recibidos:', products?.length)
        return
      }
      
      // 🔄 CORREGIDO: Comparar IDs convirtiendo a n�mero
      const draggedProduct = products.find(p => Number(p.id) === Number(draggedId))
      const targetProduct = products.find(p => Number(p.id) === Number(targetId))
      
      console.log('🔍 Productos encontrados:', { draggedProduct, targetProduct }) // 🔄 Debug
      
      if (!draggedProduct || !targetProduct) {
        console.error('? Error: No se encontraron productos en la respuesta')
        console.error('? Buscando IDs:', { draggedId, targetId })
        console.error('? IDs en respuesta:', products.map(p => ({ id: p.id, tipo: typeof p.id })))
        return
      }
      
      console.log('🔍 Actualizando �rdenes en BD...')
      
      // 🔄 MEJORADO: Usar �rdenes �nicas basadas en ID si los �rdenes son iguales
      let newDraggedOrder = targetProduct.orden
      let newTargetOrder = draggedProduct.orden
      
      // Si ambos tienen el mismo orden, usar los IDs como orden temporal
      if (draggedProduct.orden === targetProduct.orden) {
        console.log('🔍 Advertencia: Ambos productos tienen el mismo orden, usando IDs como base')
        newDraggedOrder = targetId
        newTargetOrder = draggedId
      }
      
      // Intercambiar �rdenes
      const result1 = await updateProductOrder(draggedId, newDraggedOrder)
      const result2 = await updateProductOrder(targetId, newTargetOrder)
      
      console.log('✅ Resultado actualizaciones:', { result1, result2 })
      
      if (!result1 || !result2) {
        console.error('? Error al actualizar �rdenes en BD')
        alert('? Error al reordenar productos. Verifica la consola.')
        return
      }
      
      // Recargar p�gina actual con animaci�n
      console.log('🔍 Recargando vista despu�s de intercambio...')
      console.log('🔍 currentPage:', currentPage)
      
      if (isReloading) {
        console.log('🔍 Ya hay una recarga en proceso, saltando...')
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
        
        // Reinicializar paginaci�n
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
      
      // 🔄 IMPORTANTE: Resetear draggedElement y draggedId DESPU�S de usarlos
      draggedElement = null
      draggedId = null
    })
  })
}

// Funci�n global para activar productos inactivos
async function activateProduct(productId: number) {
  try {
    console.log('🔍 Activando producto:', productId)
    
    const { error } = await supabase
      .from('productos')
      .update({ activo: true })
      .eq('id', productId)
    
    if (error) throw error
    
    console.log('✅ Producto activado exitosamente')
    console.log('🔍 P�gina actual:', currentPage)
    
    // Obtener referencia a pageContent ANTES del setTimeout
    const pageContent = document.getElementById('pageContent')
    
    if (!pageContent) {
      console.error('? No se encontr� pageContent')
      alert('? Producto activado correctamente')
      return
    }
    
    console.log('🔍 Iniciando recarga de p�gina:', currentPage)
    
    // Recargar INMEDIATAMENTE sin setTimeout
    if (currentPage === 'home') {
      console.log('🔍 Recargando Home...')
      pageContent.innerHTML = renderHome()
    } else if (currentPage === 'meats') {
      console.log('🔍 Recargando Carnes...')
      pageContent.innerHTML = renderMeats()
    } else if (currentPage === 'products') {
      console.log('🔍 Recargando Productos...')
      pageContent.innerHTML = renderProducts()
    } else if (currentPage === 'offers') {
      console.log('🔍🔍 Recargando Ofertas...')
      pageContent.innerHTML = renderOffers()
    }
    
    console.log('✅ HTML actualizado, re-adjuntando eventos...')
    
    // Re-adjuntar eventos DESPU�S de renderizar
    attachUIForContent()
    
    // ? NUEVO: Reinicializar paginaci�n seg�n la p�gina actual
    const { setupPagination } = await import('./pages/pagination')
    
    if (currentPage === 'meats') {
      await setupPagination('meatsGrid', 'meatsPagination', 'carnes')
    } else if (currentPage === 'products') {
      await setupPagination('productsGrid', 'productsPagination', 'productos', true)
    } else if (currentPage === 'offers') {
      await setupPagination('offersGrid', 'offersPagination', undefined, false, true)
    }
    
    console.log('✅ Paginaci�n reinicializada')
    console.log('✅ Eventos re-adjuntados')
    
    // Mostrar mensaje DESPU�S de todo
    setTimeout(() => {
      alert('? Producto activado correctamente')
    }, 200)
    
  } catch (error) {
    console.error('? Error activando producto:', error)
    alert('? Error al activar el producto')
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
    console.log('🔍 Sesi�n encontrada, obteniendo rol desde BD...')
    
    // SIEMPRE obtener el rol DIRECTAMENTE de la base de datos
    // NO confiar en el JWT porque puede estar desactualizado
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
    
    if (error) {
      console.error('? Error obteniendo perfil:', error)
      console.error('? Detalles:', { userId: session.user.id, email: session.user.email })
      userRole = 'user' // Default a user si hay error
      window.userRole = 'user'
    } else if (!profile) {
      console.error('? No se encontr� perfil para el usuario')
      userRole = 'user'
      window.userRole = 'user'
    } else {
      userRole = profile.role || 'user'
      window.userRole = userRole
      console.log('✅ Rol obtenido de BD:', userRole)
    }
    
    console.log('🔍 Usuario autenticado:', { 
      email: session.user.email, 
      userId: session.user.id,
      roleBD: userRole,
      profileData: profile
    })
    return true
  }
  
  userRole = null
  window.userRole = null
  console.log('⚠️ No hay sesión activa')
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
    console.log('🎨 Renderizando loginModal por primera vez')
    document.body.insertAdjacentHTML('beforeend', LoginModal())
  } else {
    console.log('🔍 loginModal ya existe, saltando...')
  }
  if (!document.getElementById('addProductModal')) {
    console.log('🎨 Renderizando addProductModal por primera vez')
    document.body.insertAdjacentHTML('beforeend', AddProductModal())
  } else {
    console.log('🔍 addProductModal ya existe, saltando...')
  }
  if (!document.getElementById('editProductModal')) {
    console.log('🎨 Renderizando editProductModal por primera vez')
    document.body.insertAdjacentHTML('beforeend', EditProductModal())
  } else {
    console.log('🔍 editProductModal ya existe, saltando...')
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

// Attach UI handlers solo para contenido din�mico (sin duplicar event listeners de la nav)
function attachUIForContent() {
  console.log('🔍 attachUIForContent - userRole:', userRole)
  
  // Initialize auth handlers
  try {
    setupAuth()
    setupAddProductModal()
    setupEditProductModal()
    
    // Show/hide admin elements based on role
    const adminElements = document.querySelectorAll('.admin-only')
    console.log('🔍 Elementos admin encontrados:', adminElements.length)
    
    if (userRole === 'admin') {
      console.log('✅ Usuario es ADMIN - mostrando botones')
      adminElements.forEach(el => {
        (el as HTMLElement).style.display = 'flex'
      })
      
      // Nota: setupDragAndDrop() se llama autom�ticamente desde pagination.ts
      // despu�s de renderizar productos, as� que no es necesario llamarlo aqu�
    } else {
      console.log('✅ Usuario NO es admin - ocultando botones (role:', userRole, ')')
      adminElements.forEach(el => {
        (el as HTMLElement).style.display = 'none'
      })
    }
  } catch (e) {
    console.error('? Error en attachUIForContent:', e)
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
      console.log('✅ Sesi�n cerrada')
      window.location.reload()
    } else {
      console.error('? Error al cerrar sesi�n:', error)
    }
  })

  // Mobile logout button
  document.getElementById('mobileLogoutButton')?.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      console.log('✅ Sesi�n cerrada')
      window.location.reload()
    } else {
      console.error('? Error al cerrar sesi�n:', error)
    }
  })

  // Show user info in nav (nombre o email)
  supabase.auth.getSession().then(({ data: { session } }) => {
    const userMenuContainer = document.getElementById('userMenuContainer')
    const mobileUserInfo = document.getElementById('mobileUserInfo')
    const dropdownAuthButtons = document.getElementById('dropdownAuthButtons')
    const dropdownUserInfo = document.getElementById('dropdownUserInfo')
    
    if (session) {
      // Usuario autenticado
      const userName = document.getElementById('userName')
      const dropdownEmail = document.getElementById('dropdownEmail')
      const mobileUserName = document.getElementById('mobileUserName')
      
      const fullName = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Usuario'
      const email = session.user.email || ''
      
      // Desktop - mostrar nombre
      if (userName) {
        userName.textContent = fullName
        userName.classList.remove('hidden')
      }
      if (dropdownEmail) dropdownEmail.textContent = email
      
      // Mobile - mostrar nombre
      if (mobileUserName) mobileUserName.textContent = fullName
      
      // Mostrar men� de usuario siempre
      userMenuContainer?.classList.remove('hidden')
      mobileUserInfo?.classList.remove('hidden')
      // En el dropdown: mostrar info de usuario, ocultar botones auth
      dropdownUserInfo?.classList.remove('hidden')
      dropdownAuthButtons?.classList.add('hidden')
    } else {
      // Usuario NO autenticado
      // Usuario NO autenticado
      const userName = document.getElementById('userName')
      
      // Ocultar texto y span, mostrar solo icono cuando no hay sesión
      if (userName) {
        userName.textContent = ''
        userName.classList.add('hidden')
      }
      
      // Mostrar menú de usuario siempre (con dropdown de login)
      userMenuContainer?.classList.remove('hidden')
      // En el dropdown: mostrar botones auth, ocultar info de usuario
      dropdownAuthButtons?.classList.remove('hidden')
      dropdownUserInfo?.classList.add('hidden')
    }
  })
  
  // Event listeners para botones de Login/Registro en navegaci\u00f3n
  document.getElementById('navLoginButton')?.addEventListener('click', () => {
    document.getElementById('loginButton')?.click()
  })
  
  document.getElementById('navRegisterButton')?.addEventListener('click', () => {
    const modal = document.getElementById('loginModal')
    modal?.classList.remove('hidden')
    modal?.classList.add('flex')
    // Cambiar a formulario de registro
    document.getElementById('loginForm')?.classList.add('hidden')
    document.getElementById('registerForm')?.classList.remove('hidden')
    const title = document.getElementById('loginModalTitle')
    if (title) title.textContent = 'Crear Cuenta'
  })
  
  // Event listeners para botones dentro del dropdown
  document.getElementById('dropdownLoginButton')?.addEventListener('click', () => {
    const modal = document.getElementById('loginModal')
    modal?.classList.remove('hidden')
    modal?.classList.add('flex')
    // Asegurar que muestra formulario de login
    document.getElementById('loginForm')?.classList.remove('hidden')
    document.getElementById('registerForm')?.classList.add('hidden')
    const title = document.getElementById('loginModalTitle')
    if (title) title.textContent = 'Iniciar Sesión'
  })
  
  // Mobile
  document.getElementById('mobileNavLoginButton')?.addEventListener('click', () => {
    document.getElementById('menuButton')?.click() // Cerrar men\u00fa mobile
    document.getElementById('loginButton')?.click()
  })
  
  document.getElementById('mobileNavRegisterButton')?.addEventListener('click', () => {
    document.getElementById('menuButton')?.click() // Cerrar men\u00fa mobile
    document.getElementById('loginButton')?.click()
    setTimeout(() => {
      document.getElementById('switchToRegister')?.click()
    }, 100)
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

  // Funci�n para registrar event listeners de navegaci�n
  function setupNavigationListeners() {
    document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault()
        const page = link.dataset.page
        if (page) {
          currentPage = page
          localStorage.setItem('currentPage', page) // Guardar en localStorage
          
          // Scroll suave al inicio al cambiar de secci�n
          window.scrollTo({ top: 0, behavior: 'smooth' })
          
          // re-render page content only con transición
          const pageContent = document.getElementById('pageContent')
          if (pageContent) {
            // Transición de salida
            pageContent.classList.add('page-exit')
            
            setTimeout(() => {
              pageContent.innerHTML = renderPage(currentPage)
              
              // Transición de entrada
              pageContent.classList.remove('page-exit')
              pageContent.classList.add('page-enter')
              
              setTimeout(() => {
                pageContent.classList.remove('page-enter')
              }, 200)
              
              // re-attach UI for new content (pero NO para la navegaci�n)
              attachUIForContent()
              
              // ? Volver a registrar listeners de navegaci�n para el nuevo contenido
              setupNavigationListeners()
              
              // ? NUEVO: Reinicializar paginaci�n despu�s de cambiar secci�n
              import('./pages/pagination').then(({ setupPagination }) => {
                if (currentPage === 'meats') {
                  setupPagination('meatsGrid', 'meatsPagination', 'carnes')
                } else if (currentPage === 'products') {
                  setupPagination('productsGrid', 'productsPagination', 'productos', true)
                } else if (currentPage === 'offers') {
                  setupPagination('offersGrid', 'offersPagination', undefined, false, true)
                }
              })
            }, 200)
          }
        }
      })
    })
  }

  // Navigation links (router) - Llamar la funci�n al inicio
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
    console.log('🔍 [attachUI] Elementos admin encontrados:', adminElements.length, 'Role:', userRole)
    
    if (userRole === 'admin') {
      console.log('✅ [attachUI] Usuario es ADMIN - mostrando botones')
      adminElements.forEach(el => {
        (el as HTMLElement).style.display = 'flex'
      })
    } else {
      console.log('✅ [attachUI] Usuario NO es admin - ocultando botones')
      adminElements.forEach(el => {
        (el as HTMLElement).style.display = 'none'
      })
    }
  } catch (e) {
    console.error('? Error en attachUI:', e)
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
      'Ribeye', 'T-Bone', 'Pica�a', 'Arrachera', 'Chorizo', 'Costillas'
    ].filter(item => item.toLowerCase().includes(query))
    if (searchResults) {
      searchResults.innerHTML = results.map(r => `\n        <div class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">${r}</div>\n      `).join('')
    }
  })
}

// Initial render - NO requiere auth para visitantes
async function init() {
  // Verificar si hay token de reset password en la URL
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  hashParams.get('access_token') // Verificar si existe token
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
  
  // 🔒 Configurar acceso secreto para admin (doble click en el logo)
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
          }, 500) // Reset despu�s de 500ms
        } else if (clickCount === 2) {
          if (clickTimer) clearTimeout(clickTimer)
          clickCount = 0
          
          // Abrir modal de login para admin
          const loginModal = document.getElementById('loginModal')
          if (loginModal) {
            loginModal.classList.remove('hidden')
            loginModal.classList.add('flex')
          } else {
            // Si no existe el modal, navegar a p�gina de auth
            renderAuthPageView()
          }
        }
      })
    }
  }, 500)
  
  // 🔄 Inicializar paginaci�n si estamos en una p�gina con productos
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
    console.log('🔍 Auth state changed:', event)
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

// Exponer notificationService globalmente para que el admin lo use desde consola
;(window as any).notificationService = notificationService

// Declaraciones globales para TypeScript
declare global {
  interface Window {
    updateAdminButtons: () => void
    notificationService: typeof notificationService
  }
}
