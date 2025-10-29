import { ProductCard } from '../components/ui/ProductCard.ts'

const mockOffers = [
  {
    id: 1,
    name: 'Ribeye Premium',
    description: 'Corte jugoso y tierno con excelente marmoleo',
    image: '/images/carnes/ribeye.jpg',
    category: 'Premium',
    discount: 20
  },
  {
    id: 2,
    name: 'Paquete Parrillada',
    description: 'Selección especial para tu parrillada',
    image: '/images/carnes/parrillada.jpg',
    category: 'Paquetes',
    discount: 15
  },
  // Más ofertas aquí...
]

export function renderOffers() {
  return `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Ofertas Especiales</h1>
      </div>

      <!-- Banner de Ofertas -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 mb-8 text-white">
        <h2 class="text-2xl font-bold mb-2">¡Grandes Descuentos!</h2>
        <p class="text-primary-100">Aprovecha nuestras ofertas especiales por tiempo limitado.</p>
      </div>

      <!-- Offers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="offersGrid">
        ${mockOffers.map(offer => ProductCard(offer)).join('')}
      </div>

      <!-- Pagination -->
      <div class="flex justify-center space-x-2 mt-8">
        <button class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Anterior
        </button>
        <button class="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
          1
        </button>
        <button class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          2
        </button>
        <button class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Siguiente
        </button>
      </div>
    </div>
  `
}