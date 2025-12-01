import { supabase } from '../../lib/supabaseClient'

let selectedFile: File | null = null
let isInitialized = false // Flag para prevenir inicialización múltiple

export function setupAddProductModal() {
  // Prevenir inicialización múltiple
  if (isInitialized) {
    console.log('⚠️ setupAddProductModal ya está inicializado, saltando...')
    return
  }
  
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
  
  // Marcar como inicializado
  isInitialized = true
  console.log('✅ setupAddProductModal inicializado')

  // Function to toggle subcategory groups based on category
  const toggleSubcategoryGroup = (categoria: string) => {
    const carnesGroup = document.getElementById('addSubcategoriaCarnes');
    const productosGroup = document.getElementById('addSubcategoriaProductos');
    
    if (categoria === 'carnes') {
      carnesGroup?.classList.remove('hidden');
      productosGroup?.classList.add('hidden');
      // Desmarcar checkboxes de productos
      productosGroup?.querySelectorAll('input[type="checkbox"]').forEach((cb: any) => cb.checked = false);
    } else if (categoria === 'productos') {
      carnesGroup?.classList.add('hidden');
      productosGroup?.classList.remove('hidden');
      // Desmarcar checkboxes de carnes
      carnesGroup?.querySelectorAll('input[type="checkbox"]').forEach((cb: any) => cb.checked = false);
    } else {
      carnesGroup?.classList.add('hidden');
      productosGroup?.classList.add('hidden');
    }
  };

  // Listen to category changes
  const categoriaSelect = document.getElementById('productCategory') as HTMLSelectElement;
  categoriaSelect?.addEventListener('change', (e) => {
    const selectedCategory = (e.target as HTMLSelectElement).value;
    toggleSubcategoryGroup(selectedCategory);
  });

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
  // Solo permitir click en el dropZone, no en toda la zona
  dropZone.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Prevenir que el click se propague si viene del botón de remover o de la imagen preview
    const target = e.target as HTMLElement
    if (target.closest('#removeImage') || target.closest('#imagePreview')) return
    imageInput.click()
  })

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
    e.stopPropagation()
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

  // ========== VISTA PREVIA DE PRECIO ==========
  const precioInput = document.getElementById('productPrice') as HTMLInputElement
  const descuentoInput = document.getElementById('productDiscount') as HTMLInputElement
  const pricePreviewDiv = document.getElementById('addPricePreview')
  const previewOriginalPrice = document.getElementById('addPreviewOriginalPrice')
  const previewDiscountPercent = document.getElementById('addPreviewDiscountPercent')
  const previewFinalPrice = document.getElementById('addPreviewFinalPrice')

  function updatePricePreview() {
    const precio = parseFloat(precioInput?.value || '0')
    const descuento = parseFloat(descuentoInput?.value || '0')

    if (precio > 0 && descuento > 0) {
      const precioConDescuento = precio - (precio * descuento / 100)
      
      if (previewOriginalPrice) previewOriginalPrice.textContent = `$${precio.toFixed(2)}`
      if (previewDiscountPercent) previewDiscountPercent.textContent = descuento.toString()
      if (previewFinalPrice) previewFinalPrice.textContent = `$${precioConDescuento.toFixed(2)}`
      
      pricePreviewDiv?.classList.remove('hidden')
    } else {
      pricePreviewDiv?.classList.add('hidden')
    }
  }

  precioInput?.addEventListener('input', updatePricePreview)
  descuentoInput?.addEventListener('input', updatePricePreview)
  // ========== FIN VISTA PREVIA DE PRECIO ==========

  // Form submit
  let isSubmitting = false // Flag para prevenir doble envío
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Prevenir múltiples envíos
    if (isSubmitting) {
      console.log('⚠️ Ya hay un envío en proceso, ignorando...')
      return
    }

    const formData = new FormData(form)
    const nombre = formData.get('nombre') as string
    const descripcion = formData.get('descripcion') as string
    const categoria = formData.get('categoria') as string
    const descuento = parseInt(formData.get('descuento') as string) || 0
    const precio = parseFloat(formData.get('precio') as string) || null // Precio NO obligatorio

    // Obtener subcategorías seleccionadas (múltiples checkboxes)
    // IMPORTANTE: Solo del grupo VISIBLE (no hidden)
    const selectedSubcategorias: string[] = [];
    
    // Determinar qué grupo está visible
    const carnesGroup = document.getElementById('addSubcategoriaCarnes');
    const productosGroup = document.getElementById('addSubcategoriaProductos');
    
    let visibleGroup: HTMLElement | null = null;
    if (carnesGroup && !carnesGroup.classList.contains('hidden')) {
      visibleGroup = carnesGroup;
    } else if (productosGroup && !productosGroup.classList.contains('hidden')) {
      visibleGroup = productosGroup;
    }
    
    // Solo obtener checkboxes del grupo visible
    if (visibleGroup) {
      visibleGroup.querySelectorAll('input[name="subcategorias"]:checked').forEach((checkbox: any) => {
        if (!selectedSubcategorias.includes(checkbox.value)) { // Evitar duplicados
          selectedSubcategorias.push(checkbox.value);
        }
      });
    }
    
    console.log('🎯 Subcategorías seleccionadas (sin duplicados):', selectedSubcategorias);

    if (!nombre || !categoria) {
      alert('Por favor completa los campos obligatorios')
      return
    }

    if (selectedSubcategorias.length === 0) {
      alert('⚠️ Debes seleccionar al menos una subcategoría')
      return
    }

    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
    const originalText = submitBtn.innerHTML

    try {
      // Activar flag y deshabilitar botón
      isSubmitting = true
      submitBtn.disabled = true
      submitBtn.innerHTML = '<span class="animate-spin">⏳</span> Guardando...'

      let imagen_url = ''

      // Upload image if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${categoria}/${fileName}`

        console.log('📤 Subiendo imagen:', filePath)

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

        console.log('✅ Imagen subida:', uploadData)

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('productos-imagenes')
          .getPublicUrl(filePath)

        imagen_url = urlData.publicUrl
        console.log('🔗 URL pública:', imagen_url)
      }

      // Get max orden for the category
      const { data: maxOrdenData } = await supabase
        .from('productos')
        .select('orden')
        .eq('categoria', categoria)
        .order('orden', { ascending: false })
        .limit(1)

      const nextOrden = (maxOrdenData && maxOrdenData[0]?.orden || 0) + 1

      // Insert product (sin subcategoria)
      const { error: insertError, data: newProduct } = await supabase
        .from('productos')
        .insert({
          nombre,
          descripcion,
          imagen_url,
          categoria,
          descuento,
          precio, // Agregar precio (puede ser null)
          orden: nextOrden,
          activo: true
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Insertar subcategorías en la tabla producto_subcategorias
      if (newProduct && selectedSubcategorias.length > 0) {
        const subcategoriasToInsert = selectedSubcategorias.map(subcat => ({
          producto_id: newProduct.id,
          subcategoria: subcat
        }));

        const { error: insertSubcatError } = await supabase
          .from('producto_subcategorias')
          .insert(subcategoriasToInsert);

        if (insertSubcatError) {
          console.error('❌ Error insertando subcategorías:', insertSubcatError);
          throw insertSubcatError;
        }

        console.log('✅ Subcategorías insertadas:', selectedSubcategorias);
      }

      alert('✅ Producto añadido exitosamente')
      
      // Restaurar botón ANTES de cerrar modal
      submitBtn.disabled = false
      submitBtn.innerHTML = originalText
      isSubmitting = false
      
      closeModal()

      // Recargar productos sin recargar la página completa
      // Detectar qué grid está visible y recargarlo usando paginación
      const meatsGrid = document.getElementById('meatsGrid')
      const productsGrid = document.getElementById('productsGrid')
      const offersGrid = document.getElementById('offersGrid')
      
      if (meatsGrid) {
        import('../../pages/pagination').then(module => {
          module.setupPagination('meatsGrid', 'meatsPagination', 'carnes', false, false)
        })
      }
      
      if (productsGrid) {
        import('../../pages/pagination').then(module => {
          module.setupPagination('productsGrid', 'productsPagination', 'productos', true, false)
        })
      }
      
      if (offersGrid) {
        import('../../pages/pagination').then(module => {
          module.setupPagination('offersGrid', 'offersPagination', undefined, false, true)
        })
      }

    } catch (error: any) {
      console.error('❌ Error adding product:', error)
      console.error('❌ Error details:', {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint
      })
      
      let errorMessage = '❌ Error al añadir el producto.'
      if (error?.code === 'PGRST301') {
        errorMessage += '\n\nNo tienes permisos para crear productos.'
      } else if (error?.code === '23505') {
        errorMessage += '\n\nEste producto ya existe (duplicado).'
      } else if (error?.message) {
        errorMessage += '\n\n' + error.message
      }
      
      alert(errorMessage)
      
      // Restore button and flag
      isSubmitting = false
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

