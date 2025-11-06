import './input.css'
import { Navigation } from './components/layout/Navigation'
import { renderHome } from './pages/Home'
import { renderMeats } from './pages/Meats'
import { renderProducts } from './pages/Products'
import { renderOffers } from './pages/Offers'
import { LoginModal } from './components/ui/LoginModal'
import { AddProductModal } from './components/ui/AddProductModal'
import { setupAuth } from './components/auth/setupAuth'
import { setupAddProductModal } from './components/ui/setupAddProductModal'

// Inicializar el modo oscuro
const isDarkMode = localStorage.getItem('darkMode') === 'true'
if (isDarkMode) {
  document.documentElement.classList.add('dark')
}

// Initialize state
let currentPage = 'home'

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
        // re-attach UI for new content
        attachUI()
      }
    })
  })

  // Initialize auth handlers
  try {
    setupAuth()
    setupAddProductModal()
  } catch (e) {
    // setupAuth may rely on DOM elements; ignore if not ready
    // console.warn('setupAuth error', e)
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

// Initial render
renderApp()
