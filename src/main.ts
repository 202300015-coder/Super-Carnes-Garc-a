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

// Initialize state
let currentPage = 'home'

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
    
    const { error } = await supabase
      .from('productos')
      .update({ orden: newOrder })
      .eq('id', productId)
    
    if (error) throw error
    
    console.log('✅ Orden actualizado')
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
  
  productCards.forEach((card) => {
    const element = card as HTMLElement
    
    // Hacer draggable solo si es admin
    element.setAttribute('draggable', 'true')
    element.style.cursor = 'move'
    
    // Evento: inicio del drag
    element.addEventListener('dragstart', (_e) => {
      draggedElement = element
      draggedId = parseInt(element.getAttribute('data-product-id') || '0')
      element.classList.add('opacity-50')
      console.log('🎯 Arrastrando producto:', draggedId)
    })
    
    // Evento: fin del drag
    element.addEventListener('dragend', () => {
      element.classList.remove('opacity-50')
      draggedElement = null
      draggedId = null
    })
    
    // Evento: cuando otro elemento pasa por encima
    element.addEventListener('dragover', (e) => {
      e.preventDefault()
      if (draggedElement && draggedElement !== element) {
        element.classList.add('border-2', 'border-primary-500')
      }
    })
    
    // Evento: cuando sale de encima
    element.addEventListener('dragleave', () => {
      element.classList.remove('border-2', 'border-primary-500')
    })
    
    // Evento: cuando se suelta encima
    element.addEventListener('drop', async (e) => {
      e.preventDefault()
      element.classList.remove('border-2', 'border-primary-500')
      
      if (!draggedElement || draggedElement === element) return
      
      const targetId = parseInt(element.getAttribute('data-product-id') || '0')
      
      if (!draggedId || !targetId) return
      
      console.log('📦 Intercambiando orden:', draggedId, '↔', targetId)
      
      // Obtener órdenes actuales
      const { data: products } = await supabase
        .from('productos')
        .select('id, orden')
        .in('id', [draggedId, targetId])
      
      if (!products || products.length !== 2) return
      
      const draggedProduct = products.find(p => p.id === draggedId)
      const targetProduct = products.find(p => p.id === targetId)
      
      if (!draggedProduct || !targetProduct) return
      
      // Intercambiar órdenes
      await updateProductOrder(draggedId, targetProduct.orden)
      await updateProductOrder(targetId, draggedProduct.orden)
      
      // Recargar página actual con animación
      console.log('🔄 Recargando vista...')
      const pageContent = document.getElementById('pageContent')
      
      if (pageContent && currentPage) {
        if (currentPage === 'meats') {
          pageContent.innerHTML = renderMeats()
        } else if (currentPage === 'products') {
          pageContent.innerHTML = renderProducts()
        } else if (currentPage === 'offers') {
          pageContent.innerHTML = renderOffers()
        }
        
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
      }
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

  // Show user email in nav
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      const userEmail = document.getElementById('userEmail')
      const dropdownEmail = document.getElementById('dropdownEmail')
      const email = session.user.email || ''
      const shortEmail = email.length > 20 ? email.substring(0, 17) + '...' : email
      
      if (userEmail) userEmail.textContent = shortEmail
      if (dropdownEmail) dropdownEmail.textContent = email
      
      userMenuButton?.classList.remove('hidden')
      userMenuButton?.classList.add('flex')
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

  // Navigation links (router)
  document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault()
      const page = link.dataset.page
      if (page) {
        currentPage = page
        
        // Scroll suave al inicio al cambiar de sección
        window.scrollTo({ top: 0, behavior: 'smooth' })
        
        // re-render page content only
        const pageContent = document.getElementById('pageContent')
        if (pageContent) pageContent.innerHTML = renderPage(currentPage)
        
        // re-attach UI for new content (pero NO para la navegación)
        attachUIForContent()
        
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

// Initial render - check auth first
async function init() {
  const authenticated = await checkAuth()
  
  if (authenticated) {
    renderApp()
  } else {
    renderAuthPageView()
  }
  
  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('🔄 Auth state changed:', event)
    if (event === 'SIGNED_IN' && session) {
      window.location.reload()
    } else if (event === 'SIGNED_OUT') {
      renderAuthPageView()
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
