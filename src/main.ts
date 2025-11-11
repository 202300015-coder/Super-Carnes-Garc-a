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
import { setupAuth } from './components/auth/setupAuth'
import { setupAddProductModal } from './components/ui/setupAddProductModal'

// Inicializar el modo oscuro
const isDarkMode = localStorage.getItem('darkMode') === 'true'
if (isDarkMode) {
  document.documentElement.classList.add('dark')
}

// Estado de autenticación
let userRole: string | null = null

// Initialize state
let currentPage = 'home'

// Check authentication status
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    // SIEMPRE obtener el rol fresco de la BD (no cachear)
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
    
    if (error) {
      console.error('❌ Error obteniendo perfil:', error)
      userRole = 'user' // Default a user si hay error
    } else {
      userRole = profile?.role || 'user'
    }
    
    console.log('🔐 Usuario autenticado:', { 
      email: session.user.email, 
      role: userRole,
      profile_data: profile 
    })
    return true
  }
  
  userRole = null
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
      ${LoginModal()}
      ${AddProductModal()}
    </div>
  `

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
    
    // Show/hide admin elements based on role
    const adminElements = document.querySelectorAll('.admin-only')
    console.log('📊 Elementos admin encontrados:', adminElements.length)
    
    if (userRole === 'admin') {
      console.log('✅ Usuario es ADMIN - mostrando botones')
      adminElements.forEach(el => {
        (el as HTMLElement).style.display = 'flex'
      })
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
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const page = link.dataset.page
      if (page) {
        currentPage = page
        // re-render page content only
        const pageContent = document.getElementById('pageContent')
        if (pageContent) pageContent.innerHTML = renderPage(currentPage)
        // re-attach UI for new content (pero NO para la navegación)
        attachUIForContent()
      }
    })
  })

  // Initialize auth handlers
  try {
    setupAuth()
    setupAddProductModal()
    
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
