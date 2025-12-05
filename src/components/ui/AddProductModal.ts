export function AddProductModal() {
  return `
    <div id="addProductModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden items-center justify-center p-4 animate-fade-in">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 scale-in">
        <!-- Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-white dark:from-gray-800 dark:to-gray-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Añadir Producto</h3>
          </div>
          <button id="closeAddProduct" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form id="addProductForm" class="p-6 space-y-6">
          <!-- Drag & Drop Image Area -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              📸 Imagen del Producto
            </label>
            <div id="dropZone" class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all cursor-pointer bg-gray-50 dark:bg-gray-700/50 backdrop-blur-sm">
              <div id="dropZoneContent">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="mt-4">
                  <label for="imageInput" class="cursor-pointer">
                    <span class="text-primary-600 dark:text-primary-400 hover:text-primary-700">Selecciona un archivo</span>
                    <span class="text-gray-600 dark:text-gray-400"> o arrastra y suelta</span>
                  </label>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PNG, JPG, WEBP hasta 5MB
                  </p>
                </div>
              </div>
              <!-- Preview Area (hidden by default) -->
              <div id="imagePreview" class="hidden">
                <img id="previewImage" src="" alt="Preview" class="mx-auto max-h-48 rounded-lg">
                <button type="button" id="removeImage" class="mt-2 text-sm text-red-600 hover:text-red-700">
                  Eliminar imagen
                </button>
              </div>
            </div>
            <input type="file" id="imageInput" name="image" accept="image/jpeg,image/jpg,image/png,image/webp" class="hidden">
          </div>

          <!-- Nombre -->
          <div>
            <label for="productName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre del Producto *
            </label>
            <input 
              type="text" 
              id="productName" 
              name="nombre"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Ej: Ribeye Premium"
            >
          </div>

          <!-- Descripción -->
          <div>
            <label for="productDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción
            </label>
            <textarea 
              id="productDescription" 
              name="descripcion"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe las características del producto..."
            ></textarea>
          </div>

          <!-- Categoría -->
          <div>
            <label for="productCategory" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categoría *
            </label>
            <select 
              id="productCategory" 
              name="categoria"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Selecciona una categoría</option>
              <option value="carnes">Carnes</option>
              <option value="productos">Productos</option>
            </select>
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
            <div id="addSubcategoriaCarnes" class="space-y-2 mb-4 hidden">
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
            <div id="addSubcategoriaProductos" class="space-y-2 hidden">
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

          <!-- Descuento -->
          <div>
            <label for="productDiscount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descuento (%)
            </label>
            <input 
              type="number" 
              id="productDiscount" 
              name="descuento"
              min="0"
              max="100"
              value="0"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            >
          </div>

          <!-- Precio -->
          <div>
            <label for="productPrice" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              💰 Precio ($)
            </label>
            <input
              type="number"
              id="productPrice"
              name="precio"
              min="0"
              step="0.01"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
            >
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              💡 El precio se mostrará en la sección de Ofertas junto con el descuento
            </p>
            
            <!-- Vista previa de precio con descuento -->
            <div id="addPricePreview" class="hidden mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">📊 Vista previa:</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Precio original:</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white" id="addPreviewOriginalPrice">$0.00</span>
              </div>
              <div class="flex items-center justify-between mt-1">
                <span class="text-sm text-gray-600 dark:text-gray-400">Con descuento (<span id="addPreviewDiscountPercent">0</span>%):</span>
                <span class="text-lg font-bold text-green-600 dark:text-green-400" id="addPreviewFinalPrice">$0.00</span>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              type="button" 
              id="cancelAddProduct"
              class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Guardar Producto</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `
}
