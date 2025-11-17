export function AddProductModal() {
  return `
    <div id="addProductModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Añadir Producto</h3>
          <button id="closeAddProduct" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form id="addProductForm" class="p-6 space-y-6">
          <!-- Drag & Drop Image Area -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Imagen del Producto
            </label>
            <div id="dropZone" class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-700">
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

          <!-- Descuento -->
          <div>
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
