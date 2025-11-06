import { supabase } from '../../lib/supabaseClient'

let selectedFile: File | null = null

export function setupAddProductModal() {
  const modal = document.getElementById('addProductModal')
  const form = document.getElementById('addProductForm') as HTMLFormElement
  const closeBtn = document.getElementById('closeAddProduct')
  const cancelBtn = document.getElementById('cancelAddProduct')
  const dropZone = document.getElementById('dropZone')
  const imageInput = document.getElementById('imageInput') as HTMLInputElement
  const dropZoneContent = document.getElementById('dropZoneContent')
  const imagePreview = document.getElementById('imagePreview')
  const previewImage = document.getElementById('previewImage') as HTMLImageElement
  const removeImageBtn = document.getElementById('removeImage')

  if (!modal || !form || !dropZone || !imageInput) return

  // Open modal function (called from pages)
  window.openAddProductModal = () => {
    modal?.classList.remove('hidden')
    modal?.classList.add('flex')
  }

  // Close modal
  const closeModal = () => {
    modal?.classList.add('hidden')
    modal?.classList.remove('flex')
    form?.reset()
    selectedFile = null
    dropZoneContent?.classList.remove('hidden')
    imagePreview?.classList.add('hidden')
  }

  closeBtn?.addEventListener('click', closeModal)
  cancelBtn?.addEventListener('click', closeModal)

  // Click outside to close
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })

  // Drag & Drop handlers
  dropZone.addEventListener('click', () => imageInput.click())

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
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Por favor selecciona una imagen válida (JPG, PNG o WEBP)')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar 5MB')
      return
    }

    selectedFile = file

    // Show preview
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

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

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
      // Show loading state
      submitBtn.disabled = true
      submitBtn.innerHTML = '<span class="animate-spin">⏳</span> Guardando...'

      let imagen_url = ''

      // Upload image if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${categoria}/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('productos-imagenes')
          .upload(filePath, selectedFile)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('productos-imagenes')
          .getPublicUrl(filePath)

        imagen_url = urlData.publicUrl
      }

      // Get max orden for the category
      const { data: maxOrdenData } = await supabase
        .from('productos')
        .select('orden')
        .eq('categoria', categoria)
        .order('orden', { ascending: false })
        .limit(1)

      const nextOrden = (maxOrdenData && maxOrdenData[0]?.orden || 0) + 1

      // Insert product
      const { error: insertError } = await supabase
        .from('productos')
        .insert({
          nombre,
          descripcion,
          imagen_url,
          categoria,
          precio,
          descuento,
          orden: nextOrden,
          activo: true
        })

      if (insertError) throw insertError

      alert('✅ Producto añadido exitosamente')
      closeModal()

      // Reload page to show new product
      window.location.reload()

    } catch (error) {
      console.error('Error adding product:', error)
      alert('❌ Error al añadir el producto. Verifica tu conexión y permisos.')
      
      // Restore button
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
      submitBtn.disabled = false
      submitBtn.innerHTML = originalText
    }
  })
}

// Declare global function for opening modal
declare global {
  interface Window {
    openAddProductModal: () => void
  }
}
