interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  discount?: number;
}

export function ProductCard(product: Product) {
  const hasDiscount = typeof product.discount !== 'undefined';
  
  return `
    <div class="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      ${hasDiscount ? `
        <div class="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 rounded-br-lg z-10">
          -${product.discount}%
        </div>
      ` : ''}
      
      <!-- Admin Controls (hidden by default) -->
      <div class="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <button class="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors admin-only hidden">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>

      <div class="relative aspect-w-4 aspect-h-3">
        <img 
          src="${product.image}" 
          alt="${product.name}"
          class="w-full h-48 object-cover"
          loading="lazy"
        >
      </div>

      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          ${product.name}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          ${product.description}
        </p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm font-medium text-primary-600 dark:text-primary-400">
            ${product.category}
          </span>
        </div>
      </div>
    </div>
  `
}