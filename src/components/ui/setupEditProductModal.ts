import { supabase } from '../../lib/supabaseClient'

let selectedFile: File | null = null
let currentProductId: number | null = null

export function setupEditProductModal() {
  const modal = document.getElementById('editProductModal')
  const form = document.getElementById('editProductForm') as HTMLFormElement
  const closeBtn = document.getElementById('closeEditProduct')
  const cancelBtn = document.getElementById('cancelEditProduct')
  const deleteBtn = document.getElementById('deleteProductBtn')
  const dropZone = document.getElementById('editDropZone')
  const imageInput = document.getElementById('editImageInput') as HTMLInputElement
  const dropZoneContent = document.getElementById('editDropZoneContent')
  const imagePreview = document.getElementById('editImagePreview')
  const previewImage = document.getElementById('editPreviewImage') as HTMLImageElement
  const removeImageBtn = document.getElementById('editRemoveImage')

  if (!modal || !form || !dropZone || !imageInput) return

  // Open modal function (called globally)
  window.openEditProductModal = async (productId: number) => {
    currentProductId = productId
    await loadProductData(productId)
    modal?.classList.remove('hidden')
    modal?.classList.add('flex')
  }

  // Load product data
  async function loadProductData(productId: number) {
    try {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('id', productId)
        .single()

      if (error) throw error

      if (data) {
        // Populate form fields
        (document.getElementById('editProductId') as HTMLInputElement).value = data.id.toString();
        (document.getElementById('editNombre') as HTMLInputElement).value = data.nombre || '';
        (document.getElementById('editDescripcion') as HTMLTextAreaElement).value = data.descripcion || '';
        (document.getElementById('editCategoria') as HTMLSelectElement).value = data.categoria || '';
        (document.getElementById('editPrecio') as HTMLInputElement).value = data.precio?.toString() || '';
        (document.getElementById('editDescuento') as HTMLInputElement).value = data.descuento?.toString() || ''

        // Show current image if exists
        const currentImageContainer = document.getElementById('editCurrentImageContainer')
        const currentImage = document.getElementById('editCurrentImage') as HTMLImageElement
        if (data.imagen_url) {
          currentImage.src = data.imagen_url
          currentImageContainer?.classList.remove('hidden')
        } else {
          currentImageContainer?.classList.add('hidden')
        }
      }
    } catch (error) {
      console.error('Error loading product:', error)
      alert('❌ Error al cargar los datos del producto')
    }
  }

  // Close modal
  const closeModal = () => {
    modal?.classList.add('hidden')
    modal?.classList.remove('flex')
    form?.reset()
    selectedFile = null
    currentProductId = null
    dropZoneContent?.classList.remove('hidden')
    imagePreview?.classList.add('hidden')
    document.getElementById('editCurrentImageContainer')?.classList.add('hidden')
  }

  closeBtn?.addEventListener('click', closeModal)
  cancelBtn?.addEventListener('click', closeModal)

  // Click outside to close
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })

  // Drag & Drop handlers
  dropZone.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('#editRemoveImage')) return
    imageInput.click()
  })

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropZone.classList.add('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900')
  })

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900')
  })

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault()
    dropZone.classList.remove('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900')
    const files = e.dataTransfer?.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  })

  imageInput.addEventListener('change', (e) => {
    const files = (e.target as HTMLInputElement).files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  })

  function handleFileSelect(file: File) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Por favor selecciona una imagen válida (JPG, PNG o WEBP)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar 5MB')
      return
    }

    selectedFile = file

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.src = e.target?.result as string
      dropZoneContent?.classList.add('hidden')
      imagePreview?.classList.remove('hidden')
    }
    reader.readAsDataURL(file)
  }

  removeImageBtn?.addEventListener('click', (e) => {
    e.stopPropagation()
    selectedFile = null
    dropZoneContent?.classList.remove('hidden')
    imagePreview?.classList.add('hidden')
    imageInput.value = ''
  })

  // Delete button handler
  deleteBtn?.addEventListener('click', async () => {
    if (!currentProductId) return

    const confirmed = confirm('¿Estás seguro de que deseas eliminar este producto?\n\nEsta acción es reversible (eliminación lógica).')
    if (!confirmed) return

    try {
      // Eliminación lógica: marcar como inactivo
      const { error } = await supabase
        .from('productos')
        .update({ activo: false })
        .eq('id', currentProductId)

      if (error) throw error

      alert('✅ Producto eliminado correctamente')
      closeModal()

      // Reload products
      reloadProducts()

    } catch (error) {
      console.error('Error deleting product:', error)
      alert('❌ Error al eliminar el producto')
    }
  })

  // Form submit
  let isSubmitting = false

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (isSubmitting) {
      console.log('⚠️ Ya hay un envío en proceso, ignorando...')
      return
    }

    if (!currentProductId) {
      alert('Error: No se encontró el ID del producto')
      return
    }

    const formData = new FormData(form)
    const nombre = formData.get('nombre') as string
    const descripcion = formData.get('descripcion') as string
    const categoria = formData.get('categoria') as string
    const precio = parseFloat(formData.get('precio') as string) || 0
    const descuento = parseInt(formData.get('descuento') as string) || 0

    if (!nombre || !categoria) {
      alert('Por favor completa los campos obligatorios')
      return
    }

    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
    const originalText = submitBtn.innerHTML

    try {
      isSubmitting = true
      submitBtn.disabled = true
      submitBtn.innerHTML = '<span class="animate-spin">⏳</span> Guardando...'

      // Prepare update data
      const updateData: any = {
        nombre,
        descripcion,
        categoria,
        precio,
        descuento
      }

      // Upload new image if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${categoria}/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('productos-imagenes')
          .upload(filePath, selectedFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('productos-imagenes')
          .getPublicUrl(filePath)

        updateData.imagen_url = urlData.publicUrl
      }

      // Update product
      const { error: updateError } = await supabase
        .from('productos')
        .update(updateData)
        .eq('id', currentProductId)

      if (updateError) throw updateError

      alert('✅ Producto actualizado exitosamente')
      
      isSubmitting = false
      closeModal()

      // Reload products
      reloadProducts()

    } catch (error) {
      console.error('Error updating product:', error)
      alert('❌ Error al actualizar el producto. Verifica tu conexión y permisos.')
      
      isSubmitting = false
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
      submitBtn.disabled = false
      submitBtn.innerHTML = originalText
    }
  })
}

// Helper function to reload products
function reloadProducts() {
  const meatsGrid = document.getElementById('meatsGrid')
  const productsGrid = document.getElementById('productsGrid')
  
  if (meatsGrid) {
    import('../../pages/loadProducts').then(module => {
      module.renderProductsInGrid('meatsGrid', 'Carnes')
    })
  }
  
  if (productsGrid) {
    import('../../pages/loadProducts').then(module => {
      module.renderProductsInGrid('productsGrid')
    })
  }
}

// Declare global function
declare global {
  interface Window {
    openEditProductModal: (productId: number) => void
  }
}
