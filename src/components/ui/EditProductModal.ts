export function EditProductModal() {
  return `
    <!-- Edit Product Modal -->
    <div id="editProductModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Editar Producto</h2>
          <button id="closeEditProduct" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form id="editProductForm" class="p-6 space-y-6">
          <!-- Hidden field for product ID -->
          <input type="hidden" id="editProductId" name="productId">

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

          <!-- Categoría y Precio -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Precio
              </label>
              <input
                type="number"
                id="editPrecio"
                name="precio"
                step="0.01"
                min="0"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
              >
            </div>
          </div>

          <!-- Descuento -->
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

          <!-- Imagen Actual -->
          <div id="editCurrentImageContainer" class="hidden">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Imagen Actual
            </label>
            <div class="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              <img id="editCurrentImage" src="" alt="Imagen actual" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Nueva Imagen (Drag & Drop) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cambiar Imagen
            </label>
            <div id="editDropZone" class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
              <input type="file" id="editImageInput" accept="image/*" class="hidden">
              
              <!-- Default Content -->
              <div id="editDropZoneContent">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Arrastra una imagen o haz click para seleccionar
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  PNG, JPG, WEBP hasta 5MB
                </p>
              </div>

              <!-- Preview -->
              <div id="editImagePreview" class="hidden relative">
                <img id="editPreviewImage" src="" alt="Preview" class="max-h-48 mx-auto rounded">
                <button type="button" id="editRemoveImage" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <!-- Delete Button (Left) -->
            <button
              type="button"
              id="deleteProductBtn"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Eliminar</span>
            </button>

            <!-- Save/Cancel Buttons (Right) -->
            <div class="flex space-x-3">
              <button
                type="button"
                id="cancelEditProduct"
                class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
}
