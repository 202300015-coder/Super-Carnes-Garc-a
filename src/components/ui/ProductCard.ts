interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  discount?: number;
  activo?: boolean;
  precio?: number;
  showPrice?: boolean;
}

export function ProductCard(product: Product) {
  const hasDiscount = typeof product.discount !== 'undefined' && product.discount > 0;
  const isInactive = product.activo === false;
  
  const precioOriginal = product.precio || 0;
  const precioConDescuento = hasDiscount && precioOriginal > 0 
    ? precioOriginal - (precioOriginal * (product.discount || 0) / 100)
    : precioOriginal;
  
  return `
    <div class="product-card group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700 ${isInactive ? 'opacity-60 order-last grayscale' : ''}" data-product-id="${product.id}" data-activo="${product.activo !== false}">
      
      <!-- Badge de Descuento -->
      ${hasDiscount ? `
        <div class="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1.5 rounded-full shadow-lg z-10 font-bold text-sm animate-pulse">
          -${product.discount}%
        </div>
      ` : ''}
      
      <!-- Badge de Inactivo -->
      ${isInactive ? `
        <div class="absolute top-3 right-3 bg-gray-600 dark:bg-gray-500 text-white px-4 py-1.5 rounded-full shadow-lg z-10 font-semibold text-xs uppercase tracking-wide">
          Inactivo
        </div>
      ` : ''}
      
      <!-- Controles de Administrador -->
      ${isInactive ? `
        <div class="admin-only absolute inset-0 flex items-center justify-center transition-all duration-300 z-20">
          <button 
            onclick="window.activateProduct(${product.id})" 
            class="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-xl hover:from-green-600 hover:to-green-700 hover:scale-105 active:scale-95 transition-all font-bold text-base inline-flex items-center gap-2"
            title="Activar producto"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Activar Producto
          </button>
        </div>
      ` : `
        <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 transform group-hover:scale-110">
          <button 
            onclick="window.openEditProductModal(${product.id})" 
            class="admin-only p-2.5 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-50 dark:hover:bg-gray-600 transition-all backdrop-blur-sm border border-gray-200 dark:border-gray-600"
            title="Editar producto"
          >
            <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      `}

      <!-- Imagen del Producto -->
      <div class="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img 
          src="${product.image}" 
          alt="${product.name}"
          class="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onerror="this.src='/images/placeholder.jpg'; this.onerror=null;"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <!-- Contenido de la Tarjeta -->
      <div class="p-5">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          ${product.name}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          ${product.description}
        </p>
        
        <!-- Precio -->
        ${product.showPrice && precioOriginal > 0 ? `
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2 flex-wrap">
              ${hasDiscount ? `
                <span class="text-gray-500 dark:text-gray-400 line-through text-base font-medium">
                  $${precioOriginal.toFixed(2)}
                </span>
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
                <span class="text-2xl font-bold text-green-600 dark:text-green-400">
                  $${precioConDescuento.toFixed(2)}
                </span>
              ` : `
                <span class="text-2xl font-bold text-gray-900 dark:text-white">
                  $${precioOriginal.toFixed(2)}
                </span>
              `}
            </div>
            ${hasDiscount ? `
              <div class="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-xs font-semibold text-green-700 dark:text-green-300">
                  Ahorras $${(precioOriginal - precioConDescuento).toFixed(2)}
                </span>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    </div>
  `
}