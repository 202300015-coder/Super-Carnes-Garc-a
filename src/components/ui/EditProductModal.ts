export function EditProductModal() {
  return `
    <!-- Edit Product Modal -->
    <div id="editProductModal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 items-center justify-center p-4 animate-fade-in">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 scale-in">
        <!-- Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Editar Producto</h2>
          </div>
          <button id="closeEditProduct" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form id="editProductForm" class="p-6 space-y-6">
          <!-- Hidden field for product ID -->
          <input type="hidden" id="editProductId" name="productId">

          <!-- ========== SECCIÓN DE IMÁGENES - HASTA ARRIBA ========== -->
          
          <!-- Cambiar Imagen - ICONO DE GALERÍA -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📸 Cambiar Imagen
            </label>
            <div id="editDropZone" class="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
              <!-- Input file invisible pero funcional -->
              <input 
                type="file" 
                id="editImageInput" 
                accept="image/*" 
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              >
              
              <!-- Default Content - Icono de Galería -->
              <div id="editDropZoneContent" class="pointer-events-none">
                <svg class="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Click aquí o arrastra una imagen
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  PNG, JPG, WEBP hasta 5MB
                </p>
              </div>

              <!-- Preview -->
              <div id="editImagePreview" class="hidden relative pointer-events-none">
                <img id="editPreviewImage" src="" alt="Preview" class="max-h-40 mx-auto rounded">
                <button type="button" id="editRemoveImage" class="pointer-events-auto absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Imagen Actual - JUSTO DEBAJO DEL ICONO -->
          <div id="editCurrentImageContainer" class="hidden">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🖼️ Imagen Actual
            </label>
            <div class="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
              <img id="editCurrentImage" src="" alt="Imagen actual" class="w-full h-full object-cover">
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
              💡 Si no seleccionas una nueva imagen, se mantendrá esta
            </p>
          </div>

          <!-- ========== FIN SECCIÓN DE IMÁGENES ========== -->

          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              id="editNombre"
              name="nombre"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Ej: Corte Ribeye Premium"
            >
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              id="editDescripcion"
              name="descripcion"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe el producto..."
            ></textarea>
          </div>

          <!-- Categoría -->
          <div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoría *
              </label>
              <select
                id="editCategoria"
                name="categoria"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Seleccionar...</option>
                <option value="carnes">Carnes</option>
                <option value="productos">Productos</option>
              </select>
            </div>
          </div>

          <!-- Subcategoría -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subcategorías *
            </label>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
              ✨ Puedes seleccionar múltiples subcategorías para este producto
            </p>
            
            <!-- Subcategorías de Carnes -->
            <div id="editSubcategoriaCarnes" class="space-y-2 mb-4 hidden">
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">🥩 Carnes</p>
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <input type="checkbox" name="subcategorias" value="Premium" class="w-5 h-5 cursor-pointer accent-red-600">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Premium</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <input type="checkbox" name="subcategorias" value="Res" class="w-5 h-5 cursor-pointer accent-red-600">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Res</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <input type="checkbox" name="subcategorias" value="Cerdo" class="w-5 h-5 cursor-pointer accent-red-600">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Cerdo</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <input type="checkbox" name="subcategorias" value="Pollo" class="w-5 h-5 cursor-pointer accent-red-600">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Pollo</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <input type="checkbox" name="subcategorias" value="Cortes Especiales" class="w-5 h-5 cursor-pointer accent-red-600">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Cortes Especiales</span>
                </label>
              </div>
            </div>

            <!-- Subcategorías de Productos -->
            <div id="editSubcategoriaProductos" class="space-y-2 hidden">
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">🛒 Productos</p>
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <input type="checkbox" name="subcategorias" value="Abarrotes" class="w-5 h-5 cursor-pointer accent-red-600">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Abarrotes</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <input type="checkbox" name="subcategorias" value="Lácteos" class="w-5 h-5 cursor-pointer accent-red-600">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Lácteos</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <input type="checkbox" name="subcategorias" value="Embutidos" class="w-5 h-5 cursor-pointer accent-red-600">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Embutidos</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <input type="checkbox" name="subcategorias" value="Condimentos" class="w-5 h-5 cursor-pointer accent-red-600">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Condimentos</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Descuento % -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descuento (%)
            </label>
            <input
              type="number"
              id="editDescuento"
              name="descuento"
              min="0"
              max="100"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="0"
            >
          </div>

          <!-- Precio -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              💰 Precio ($)
            </label>
            <input
              type="number"
              id="editPrecio"
              name="precio"
              min="0"
              step="0.01"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
            >
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              💡 El precio se mostrará en la sección de Ofertas junto con el descuento
            </p>
            
            <!-- Vista previa de precio con descuento -->
            <div id="pricePreview" class="hidden mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">📊 Vista previa:</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Precio original:</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white" id="previewOriginalPrice">$0.00</span>
              </div>
              <div class="flex items-center justify-between mt-1">
                <span class="text-sm text-gray-600 dark:text-gray-400">Con descuento (<span id="previewDiscountPercent">0</span>%):</span>
                <span class="text-lg font-bold text-green-600 dark:text-green-400" id="previewFinalPrice">$0.00</span>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
              <!-- Botón Inactivar -->
              <button
                type="button"
                id="deleteProductBtn"
                class="w-full sm:w-auto px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <span>Inactivar</span>
              </button>

              <!-- Botones Cancelar y Guardar -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  id="cancelEditProduct"
                  class="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-md"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
}
