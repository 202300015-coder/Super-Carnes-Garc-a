import { supabase } from '../../lib/supabaseClient'

let selectedFile: File | null = null
let currentProductId: number | null = null
let isInitialized = false // Flag para prevenir inicialización múltiple

export function setupEditProductModal() {
  // Prevenir inicialización múltiple
  if (isInitialized) {
    console.log('⚠️ setupEditProductModal ya está inicializado, saltando...')
    return
  }
  
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

  console.log('🔍 Elementos encontrados:', {
    modal: !!modal,
    form: !!form,
    dropZone: !!dropZone,
    imageInput: !!imageInput,
    dropZoneContent: !!dropZoneContent
  })

  if (!modal || !form || !dropZone || !imageInput) {
    console.error('❌ Elementos NO encontrados, abortando setup')
    return
  }
  
  // Marcar como inicializado
  isInitialized = true
  console.log('✅ setupEditProductModal inicializado')

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
        (document.getElementById('editSubcategoria') as HTMLSelectElement).value = data.subcategoria || '';
        (document.getElementById('editDescuento') as HTMLInputElement).value = data.descuento?.toString() || '';
        (document.getElementById('editPrecio') as HTMLInputElement).value = data.precio?.toString() || '';

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

  // El input file ahora está posicionado encima del dropZone, no necesitamos click handler
  // Solo manejamos drag & drop events

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.stopPropagation()
    dropZone.classList.add('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900')
  })

  dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault()
    e.stopPropagation()
    dropZone.classList.remove('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900')
  })

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()
    dropZone.classList.remove('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900')
    const files = e.dataTransfer?.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  })

  imageInput.addEventListener('change', (e) => {
    console.log('📁 Archivo seleccionado desde input')
    e.stopPropagation()
    const files = (e.target as HTMLInputElement).files
    if (files && files[0]) {
      console.log('📄 Archivo:', files[0].name, files[0].type, files[0].size)
      handleFileSelect(files[0])
    }
  })

  function handleFileSelect(file: File) {
    console.log('🔍 Validando archivo:', file.name)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      console.log('❌ Tipo de archivo inválido:', file.type)
      alert('Por favor selecciona una imagen válida (JPG, PNG o WEBP)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      console.log('❌ Archivo muy grande:', file.size)
      alert('La imagen no debe superar 5MB')
      return
    }

    console.log('✅ Archivo válido, guardando...')
    selectedFile = file

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      console.log('🖼️ Mostrando preview de imagen')
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

    const confirmed = confirm('¿Estás seguro de que deseas INACTIVAR este producto?\n\nEl producto quedará oculto para usuarios normales pero seguirá visible para administradores con efecto fantasma.')
    if (!confirmed) return

    try {
      // 🔍 DIAGNÓSTICO: Verificar sesión antes del UPDATE
      const { data: { session } } = await supabase.auth.getSession()
      console.log('🔑 Sesión activa al eliminar:', session ? '✅ SÍ' : '❌ NO')
      console.log('📧 Usuario:', session?.user?.email)
      console.log('🆔 User ID:', session?.user?.id)
      
      if (!session) {
        alert('❌ Error: No hay sesión activa. Por favor, vuelve a iniciar sesión.')
        return
      }

      // Eliminación lógica: marcar como inactivo
      const { error, data } = await supabase
        .from('productos')
        .update({ activo: false })
        .eq('id', currentProductId)
        .select()

      console.log('📊 Respuesta UPDATE:', { data, error })

      if (error) throw error

      alert('✅ Producto inactivado correctamente')
      closeModal()

      // Reload products
      reloadProducts()

    } catch (error) {
      console.error('❌ Error deleting product:', error)
      alert('❌ Error al inactivar el producto')
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
    const subcategoria = formData.get('subcategoria') as string || null
    const descuento = parseInt(formData.get('descuento') as string) || 0
    const precio = parseFloat(formData.get('precio') as string) || 0

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
        subcategoria,
        descuento,
        precio,
      }

      // Upload new image if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${categoria}/${fileName}`

        console.log('📤 Subiendo nueva imagen:', filePath)

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('productos-imagenes')
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          console.error('❌ Error subiendo imagen:', uploadError)
          throw uploadError
        }

        console.log('✅ Nueva imagen subida:', uploadData)

        const { data: urlData } = supabase.storage
          .from('productos-imagenes')
          .getPublicUrl(filePath)

        updateData.imagen_url = urlData.publicUrl
        console.log('🔗 Nueva URL pública:', updateData.imagen_url)
      }

      console.log('📝 Datos a actualizar:', updateData)

      // Update product
      const { error: updateError } = await supabase
        .from('productos')
        .update(updateData)
        .eq('id', currentProductId)

      if (updateError) throw updateError

      alert('✅ Producto actualizado exitosamente')
      
      // Restaurar botón ANTES de cerrar modal
      submitBtn.disabled = false
      submitBtn.innerHTML = originalText
      isSubmitting = false
      
      closeModal()

      // Reload products
      reloadProducts()

    } catch (error: any) {
      console.error('❌ Error updating product:', error)
      console.error('❌ Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
      
      let errorMessage = '❌ Error al actualizar el producto.'
      if (error.code === 'PGRST301') {
        errorMessage += '\n\nNo tienes permisos para actualizar este producto.'
      } else if (error.message) {
        errorMessage += '\n\n' + error.message
      }
      
      alert(errorMessage)
      
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
  const offersGrid = document.getElementById('offersGrid')
  
  if (meatsGrid) {
    import('../../pages/loadProducts').then(module => {
      module.renderProductsInGrid('meatsGrid', 'carnes', false, false)
    })
  }
  
  if (productsGrid) {
    import('../../pages/loadProducts').then(module => {
      module.renderProductsInGrid('productsGrid', 'productos', true, false) // Excluir carnes
    })
  }
  
  if (offersGrid) {
    import('../../pages/loadProducts').then(module => {
      module.renderProductsInGrid('offersGrid', undefined, false, true) // Solo ofertas
    })
  }
}

// Declare global function
declare global {
  interface Window {
    openEditProductModal: (productId: number) => void
  }
}
