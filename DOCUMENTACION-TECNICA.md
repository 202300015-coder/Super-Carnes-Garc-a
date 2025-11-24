# 📚 Documentación Técnica - Super Carnes García

## 📋 Índice

1. [Introducción](#introducción)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Programas y Componentes Principales](#programas-y-componentes-principales)
4. [Conexión a la Base de Datos](#conexión-a-la-base-de-datos)
5. [Implementaciones Realizadas](#implementaciones-realizadas)
6. [Problemas y Soluciones](#problemas-y-soluciones)
7. [Guía de Uso](#guía-de-uso)

---

## 🎯 Introducción

**Super Carnes Garcíaaaaaaaa** es una aplicación web moderna para gestionar y mostrar productos de una carnicería. Está construida con TypeScript, Vite, Tailwind CSS y Supabase como base de datos.

### Características Principales
- ✨ Catálogo de productos con imágenes
- 🏷️ Sistema de descuentos y ofertas
- 🔐 Sistema de autenticación (admin/usuario)
- 📱 Diseño responsivo (móvil, tablet, escritorio)
- 🌙 Modo oscuro/claro
- 🔍 Búsqueda de productos
- 📂 Filtros por subcategorías
- 🖱️ Drag & Drop para ordenar productos (admin)

---

## 🏗️ Arquitectura del Proyecto

```
Super-Carnes-García/
│
├── src/                          # Código fuente
│   ├── main.ts                   # Punto de entrada principal
│   ├── auth.ts                   # Sistema de autenticación
│   │
│   ├── components/               # Componentes reutilizables
│   │   ├── ui/                   # Componentes de interfaz
│   │   │   ├── ProductCard.ts    # Tarjeta de producto
│   │   │   ├── AddProductModal.ts      # Modal para añadir
│   │   │   ├── EditProductModal.ts     # Modal para editar
│   │   │   ├── setupAddProductModal.ts # Lógica de añadir
│   │   │   └── setupEditProductModal.ts # Lógica de editar
│   │   │
│   │   └── layout/               # Componentes de layout
│   │       └── Navigation.ts     # Barra de navegación
│   │
│   ├── pages/                    # Páginas de la aplicación
│   │   ├── Home.ts              # Página de inicio
│   │   ├── Meats.ts             # Página de carnes
│   │   ├── Products.ts          # Página de productos
│   │   ├── Offers.ts            # Página de ofertas
│   │   ├── loadProducts.ts      # Carga productos de BD
│   │   ├── searchProducts.ts    # Sistema de búsqueda
│   │   └── pagination.ts        # Sistema de paginación
│   │
│   └── lib/                     # Librerías y utilidades
│       └── supabaseClient.ts    # Cliente de Supabase
│
├── database/                     # Scripts SQL
│   ├── setup.sql                # Configuración inicial
│   ├── agregar-subcategoria.sql # Añadir subcategorías
│   └── ...                      # Otros scripts
│
└── public/                      # Archivos estáticos
    └── images/                  # Imágenes
```

---

## 🔧 Programas y Componentes Principales

### 1️⃣ **main.ts** - El Cerebro de la Aplicación

**¿Qué hace?**
Es el archivo principal que inicia toda la aplicación. Piensa en él como el director de una orquesta que coordina todo.

**Funciones principales:**

```typescript
// 1. Maneja la navegación entre páginas
function navigate(page: string) {
  // Cambia entre Home, Carnes, Productos, Ofertas
  // Actualiza la URL sin recargar la página
  // Guarda en localStorage la página actual
}

// 2. Sistema de Drag & Drop para ordenar productos
let draggedId: number | null = null
let draggedElement: HTMLElement | null = null

// Cuando empiezas a arrastrar un producto
dragstart event → Guarda el ID del producto arrastrado

// Cuando sueltas el producto en nueva posición
drop event → Actualiza el orden en la base de datos
```

**Características especiales:**
- 🔄 **Auto-actualización**: Cuando activas/desactivas un producto, la página se actualiza automáticamente
- 🎨 **Feedback visual**: Los productos brillan cuando los arrastras
- ✅ **Confirmación**: Pregunta antes de reordenar
- 📱 **Persistencia**: Recuerda en qué página estabas

---

### 2️⃣ **Meats.ts** - Página de Carnes

**¿Qué hace?**
Muestra todos los productos de la categoría "carnes" con filtros por subcategoría.

**Estructura:**

```typescript
export function renderMeats() {
  // Renderiza el HTML de la página
  return `
    <div class="container">
      <h1>Nuestras Carnes</h1>
      
      <!-- Filtros de subcategoría -->
      <div class="filtros">
        <button data-category="Todos">Todos</button>
        <button data-category="Premium">Premium</button>
        <button data-category="Res">Res</button>
        <button data-category="Cerdo">Cerdo</button>
        <button data-category="Pollo">Pollo</button>
        <button data-category="Cortes Especiales">Cortes Especiales</button>
      </div>
      
      <!-- Grid de productos -->
      <div id="meatsGrid"></div>
    </div>
  `
}
```

**Sistema de filtros:**

```typescript
function setupCategoryFilters() {
  // Para cada botón de filtro
  filterButtons.forEach(button => {
    button.addEventListener('click', async () => {
      // 1. Obtener la subcategoría seleccionada
      const subcategory = button.getAttribute('data-category')
      
      // 2. Cambiar el estilo del botón activo
      // El botón seleccionado → rojo
      // Los demás botones → gris
      
      // 3. Hacer consulta a Supabase
      let query = supabase
        .from('productos')
        .select('*')
        .eq('categoria', 'carnes')  // Solo carnes
        .order('orden')
      
      // 4. Si no es "Todos", filtrar por subcategoría
      if (subcategory !== 'Todos') {
        query = query.eq('subcategoria', subcategory)
      }
      
      // 5. Renderizar productos filtrados
      // 6. Actualizar botones admin
      // 7. Configurar drag & drop
    })
  })
}
```

**Flujo de funcionamiento:**
1. Usuario entra a la página → Carga todos los productos de carnes
2. Usuario hace clic en "Premium" → Filtra solo carnes Premium
3. Usuario hace clic en "Todos" → Muestra todas las carnes otra vez

---

### 3️⃣ **Products.ts** - Página de Productos

**¿Qué hace?**
Muestra todos los productos que NO son carnes (abarrotes, lácteos, etc.)

**Diferencia con Meats.ts:**

```typescript
// En la consulta, excluye carnes
let query = supabase
  .from('productos')
  .select('*')
  .neq('categoria', 'carnes')  // ← Esto es clave: neq = "no igual"
```

**Subcategorías disponibles:**
- Abarrotes
- Lácteos  
- Embutidos
- Condimentos
- General

---

### 4️⃣ **Offers.ts** - Página de Ofertas

**¿Qué hace?**
Muestra SOLO productos con descuento mayor a 0%, sin importar si son carnes o productos.

**Consulta especial:**

```typescript
let query = supabase
  .from('productos')
  .select('*')
  .gt('descuento', 0)  // gt = "greater than" (mayor que)
```

**Filtros únicos:**
Muestra TODAS las subcategorías (tanto de carnes como de productos) porque las ofertas pueden ser de cualquier tipo.

---

### 5️⃣ **ProductCard.ts** - Tarjeta de Producto

**¿Qué hace?**
Crea la tarjeta visual de cada producto con su información.

**Estructura:**

```typescript
export function ProductCard(product: ProductCardProps) {
  return `
    <div class="product-card" data-id="${product.id}">
      
      <!-- Badge de descuento (si tiene) -->
      ${product.discount > 0 ? 
        `<span class="badge-descuento">${product.discount}% OFF</span>` 
        : ''}
      
      <!-- Imagen del producto -->
      <img src="${product.image}" alt="${product.name}">
      
      <!-- Nombre del producto -->
      <h3>${product.name}</h3>
      
      <!-- Descripción -->
      <p>${product.description}</p>
      
      <!-- Botones de admin (solo si eres admin) -->
      <div class="admin-only">
        <button class="btn-edit">✏️ Editar</button>
        <button class="btn-toggle-active">👁️ Activar/Desactivar</button>
        <button class="btn-delete">🗑️ Eliminar</button>
      </div>
    </div>
  `
}
```

**Características:**
- 🏷️ Muestra descuento en badge rojo
- 🖼️ Imagen con lazy loading
- 👁️ Productos inactivos se ven semi-transparentes
- 🎯 Botones de admin solo visibles para administradores

---

### 6️⃣ **loadProducts.ts** - Cargador de Productos

**¿Qué hace?**
Se encarga de traer los productos desde Supabase y mostrarlos en pantalla.

**Función principal:**

```typescript
export async function loadProductsFromDB(
  categoria?: string,        // 'carnes' o 'productos' o undefined
  excludeCarnes = false,     // true = no mostrar carnes
  onlyOffers = false,        // true = solo con descuento
  userRole = 'user'          // 'admin' o 'user'
): Promise<Product[]> {
  
  // 1. Crear consulta base
  let query = supabase
    .from('productos')
    .select('*')
  
  // 2. Si NO eres admin, solo ver productos activos
  if (userRole !== 'admin') {
    query = query.eq('activo', true)
  }
  
  // 3. Ordenar por número de orden
  query = query.order('orden', { ascending: true })
  
  // 4. Aplicar filtros según parámetros
  if (categoria) {
    query = query.eq('categoria', categoria)
  }
  
  if (excludeCarnes) {
    query = query.neq('categoria', 'carnes')
  }
  
  if (onlyOffers) {
    query = query.gt('descuento', 0)
  }
  
  // 5. Ejecutar consulta
  const { data, error } = await query
  
  // 6. Manejar errores
  if (error) {
    console.error('Error:', error)
    return []
  }
  
  return data || []
}
```

**Renderización:**

```typescript
export async function renderProductsInGrid(
  containerId: string,  // ID del div donde poner productos
  categoria?: string,
  excludeCarnes = false,
  onlyOffers = false
) {
  // 1. Obtener el contenedor
  const container = document.getElementById(containerId)
  
  // 2. Mostrar loading
  container.innerHTML = '<div class="spinner">Cargando...</div>'
  
  // 3. Cargar productos
  const productos = await loadProductsFromDB(...)
  
  // 4. Si no hay productos
  if (productos.length === 0) {
    container.innerHTML = '<p>No hay productos</p>'
    return
  }
  
  // 5. Renderizar cada producto
  container.innerHTML = productos.map(producto => 
    ProductCard({
      id: producto.id,
      name: producto.nombre,
      description: producto.descripcion,
      image: producto.imagen_url,
      category: producto.categoria,
      discount: producto.descuento,
      activo: producto.activo
    })
  ).join('')
}
```

---

### 7️⃣ **searchProducts.ts** - Sistema de Búsqueda

**¿Qué hace?**
Busca productos en tiempo real mientras escribes.

**Funcionamiento:**

```typescript
export function setupSearch(options: SearchOptions) {
  const input = document.getElementById(options.inputId)
  
  // Cuando escribes en el input
  input.addEventListener('input', async (e) => {
    const searchTerm = e.target.value.trim()
    
    // Si está vacío, restaurar vista normal
    if (searchTerm === '') {
      restoreOriginalView()
      return
    }
    
    // Si tiene menos de 2 caracteres, no buscar
    if (searchTerm.length < 2) return
    
    // Buscar en Supabase
    let query = supabase
      .from('productos')
      .select('*')
      .ilike('nombre', `%${searchTerm}%`)  // ilike = búsqueda sin case-sensitive
    
    // Aplicar filtros según la página
    if (options.categoria === 'carnes') {
      query = query.eq('categoria', 'carnes')
    }
    
    if (options.excludeCarnes) {
      query = query.neq('categoria', 'carnes')
    }
    
    if (options.onlyOffers) {
      query = query.gt('descuento', 0)
    }
    
    // Obtener resultados
    const { data: results } = await query
    
    // Mostrar en dropdown
    showResults(results)
  })
}
```

**Características especiales:**
- 🔍 Búsqueda en tiempo real (mientras escribes)
- 💨 Debounce automático (no busca en cada tecla)
- 📋 Dropdown con resultados
- ✅ Click en resultado → muestra solo ese producto
- ❌ Limpiar búsqueda → restaura todos los productos

---

### 8️⃣ **setupAddProductModal.ts** - Añadir Productos

**¿Qué hace?**
Maneja todo el proceso de añadir un nuevo producto.

**Flujo completo:**

```typescript
// 1. SELECCIÓN DE IMAGEN
function handleFileSelect(file: File) {
  // Validar tipo (solo JPG, PNG, WEBP)
  // Validar tamaño (máximo 5MB)
  // Mostrar preview
  // Guardar en variable selectedFile
}

// 2. DRAG & DROP DE IMAGEN
dropZone.addEventListener('drop', (e) => {
  const files = e.dataTransfer?.files
  handleFileSelect(files[0])
})

// 3. ENVÍO DEL FORMULARIO
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  // Paso 1: Subir imagen a Supabase Storage
  if (selectedFile) {
    const fileName = `${Date.now()}-${random}.${ext}`
    const filePath = `${categoria}/${fileName}`
    
    await supabase.storage
      .from('productos-imagenes')
      .upload(filePath, selectedFile)
    
    // Obtener URL pública
    imagen_url = supabase.storage
      .from('productos-imagenes')
      .getPublicUrl(filePath)
  }
  
  // Paso 2: Obtener el siguiente número de orden
  const maxOrden = await getMaxOrden(categoria)
  const nextOrden = maxOrden + 1
  
  // Paso 3: Insertar producto en base de datos
  await supabase
    .from('productos')
    .insert({
      nombre,
      descripcion,
      imagen_url,
      categoria,
      subcategoria,
      descuento,
      orden: nextOrden,
      activo: true
    })
  
  // Paso 4: Recargar productos en la vista
  // Paso 5: Cerrar modal
})
```

**Validaciones:**
- ✅ Nombre y categoría obligatorios
- ✅ Imagen máximo 5MB
- ✅ Solo formatos JPG, PNG, WEBP
- ✅ Descuento entre 0-100%
- ✅ Previene doble envío

---

### 9️⃣ **setupEditProductModal.ts** - Editar Productos

**¿Qué hace?**
Permite editar un producto existente.

**Flujo:**

```typescript
// 1. CARGAR DATOS DEL PRODUCTO
async function loadProductData(productId: number) {
  const { data: product } = await supabase
    .from('productos')
    .select('*')
    .eq('id', productId)
    .single()
  
  // Rellenar formulario con datos actuales
  nombreInput.value = product.nombre
  descripcionInput.value = product.descripcion
  categoriaSelect.value = product.categoria
  subcategoriaSelect.value = product.subcategoria
  descuentoInput.value = product.descuento
  
  // Mostrar imagen actual
  currentImage.src = product.imagen_url
}

// 2. ACTUALIZAR PRODUCTO
form.addEventListener('submit', async (e) => {
  // Si hay nueva imagen, subirla
  if (selectedFile) {
    // Eliminar imagen anterior
    await deleteOldImage(oldImageUrl)
    
    // Subir nueva imagen
    imagen_url = await uploadNewImage(selectedFile)
  }
  
  // Actualizar en base de datos
  await supabase
    .from('productos')
    .update({
      nombre,
      descripcion,
      imagen_url,
      categoria,
      subcategoria,
      descuento
    })
    .eq('id', productId)
})
```

**Características:**
- 🔄 Precarga datos del producto
- 🖼️ Muestra imagen actual
- ♻️ Elimina imagen antigua al cambiar
- ✏️ Actualiza solo los campos modificados

---

### 🔟 **pagination.ts** - Sistema de Paginación

**¿Qué hace?**
Divide los productos en páginas de 12 productos cada una.

**Funcionamiento:**

```typescript
export function setupPagination(
  gridId: string,
  paginationId: string,
  categoria?: string,
  excludeCarnes = false,
  onlyOffers = false
) {
  const ITEMS_PER_PAGE = 12
  let currentPage = 1
  
  // Renderizar página específica
  async function renderPage(page: number) {
    // Cargar todos los productos
    const allProducts = await loadProductsFromDB(...)
    
    // Calcular índices
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    
    // Obtener productos de esta página
    const pageProducts = allProducts.slice(startIndex, endIndex)
    
    // Renderizar
    grid.innerHTML = pageProducts.map(p => ProductCard(p)).join('')
    
    // Actualizar botones de paginación
    renderPaginationButtons()
  }
  
  // Crear botones de paginación
  function renderPaginationButtons() {
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
    
    paginationContainer.innerHTML = `
      <button onclick="goToPage(${currentPage - 1})">← Anterior</button>
      <span>Página ${currentPage} de ${totalPages}</span>
      <button onclick="goToPage(${currentPage + 1})">Siguiente →</button>
    `
  }
}
```

**Características:**
- 📄 12 productos por página
- ⬅️➡️ Botones Anterior/Siguiente
- 🔢 Indicador de página actual
- 🚫 Deshabilita botones en primera/última página

---

## 🗄️ Conexión a la Base de Datos

### Configuración de Supabase

**Archivo: `src/lib/supabaseClient.ts`**

```typescript
import { createClient } from '@supabase/supabase-js'

// URL del proyecto Supabase
const supabaseUrl = 'https://mlohsgaatrvzic.supabase.co'

// Clave pública (anon key)
const supabaseKey = 'tu-clave-publica-aqui'

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)
```

### ¿Qué es Supabase?

Supabase es como un "Google Sheets con superpoderes". Es una base de datos PostgreSQL en la nube con:
- 🗄️ Base de datos SQL
- 🔐 Autenticación integrada
- 📦 Almacenamiento de archivos
- 🔄 Actualizaciones en tiempo real

### Estructura de la Tabla `productos`

```sql
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,              -- ID único autoincremental
  nombre VARCHAR(255) NOT NULL,       -- Nombre del producto
  descripcion TEXT,                   -- Descripción detallada
  imagen_url TEXT,                    -- URL de la imagen
  categoria VARCHAR(50),              -- 'carnes' o 'productos'
  subcategoria VARCHAR(50),           -- Premium, Res, Cerdo, etc.
  descuento INTEGER DEFAULT 0,        -- Porcentaje de descuento (0-100)
  orden INTEGER,                      -- Orden de visualización
  activo BOOLEAN DEFAULT true,        -- Si está visible o no
  created_at TIMESTAMPTZ DEFAULT NOW() -- Fecha de creación
);
```

### Operaciones Básicas

**1. Consultar productos:**
```typescript
const { data, error } = await supabase
  .from('productos')
  .select('*')
  .eq('categoria', 'carnes')
  .order('orden')
```

**2. Insertar producto:**
```typescript
const { error } = await supabase
  .from('productos')
  .insert({
    nombre: 'Arrachera Premium',
    categoria: 'carnes',
    descuento: 20
  })
```

**3. Actualizar producto:**
```typescript
const { error } = await supabase
  .from('productos')
  .update({ descuento: 30 })
  .eq('id', 5)
```

**4. Eliminar producto:**
```typescript
const { error } = await supabase
  .from('productos')
  .delete()
  .eq('id', 5)
```

### Almacenamiento de Imágenes

**Bucket: `productos-imagenes`**

```typescript
// Subir imagen
const { data, error } = await supabase.storage
  .from('productos-imagenes')
  .upload('carnes/imagen.jpg', file)

// Obtener URL pública
const { data } = supabase.storage
  .from('productos-imagenes')
  .getPublicUrl('carnes/imagen.jpg')
```

**Estructura de carpetas:**
```
productos-imagenes/
├── carnes/
│   ├── 1234567-abc123.jpg
│   └── 7654321-xyz789.jpg
└── productos/
    ├── 9876543-def456.jpg
    └── 1357924-ghi789.jpg
```

---

## 🚀 Implementaciones Realizadas

### 1. Sistema de Autenticación

**¿Qué se hizo?**
Creamos un sistema para que solo los administradores puedan editar productos.

**Cómo funciona:**
```typescript
// 1. Login con email y contraseña
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@supercarnes.com',
  password: 'tu-contraseña'
})

// 2. Obtener rol del usuario
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single()

// 3. Guardar en variable global
window.userRole = profile.role  // 'admin' o 'user'

// 4. Mostrar/ocultar botones admin
if (userRole === 'admin') {
  adminButtons.classList.remove('hidden')
}
```

**Resultado:**
- ✅ Solo admins ven botones de editar/eliminar
- ✅ Solo admins ven productos inactivos
- ✅ Usuarios normales solo ven productos activos

---

### 2. Sistema de Subcategorías

**¿Qué se hizo?**
Añadimos una columna `subcategoria` para filtrar productos más específicamente.

**Script SQL ejecutado:**
```sql
-- Agregar columna
ALTER TABLE productos 
ADD COLUMN subcategoria VARCHAR(50);

-- Asignar valores por defecto
UPDATE productos 
SET subcategoria = 'Premium'
WHERE descuento >= 50;

UPDATE productos 
SET subcategoria = 'Res'
WHERE categoria = 'carnes' AND subcategoria IS NULL;
```

**Subcategorías definidas:**
- **Carnes:** Premium, Res, Cerdo, Pollo, Cortes Especiales
- **Productos:** Abarrotes, Lácteos, Embutidos, Condimentos, General

**Implementación en modales:**
```typescript
// En AddProductModal.ts
<select id="productSubcategory" name="subcategoria">
  <optgroup label="Carnes">
    <option value="Premium">Premium</option>
    <option value="Res">Res</option>
    <option value="Cerdo">Cerdo</option>
    <option value="Pollo">Pollo</option>
    <option value="Cortes Especiales">Cortes Especiales</option>
  </optgroup>
  <optgroup label="Productos">
    <option value="Abarrotes">Abarrotes</option>
    <option value="Lácteos">Lácteos</option>
    <option value="Embutidos">Embutidos</option>
    <option value="Condimentos">Condimentos</option>
    <option value="General">General</option>
  </optgroup>
</select>
```

**Resultado:**
- ✅ Filtros funcionales en todas las páginas
- ✅ Mejor organización de productos
- ✅ Experiencia de usuario mejorada

---

### 3. Sistema de Drag & Drop

**¿Qué se hizo?**
Implementamos arrastrar y soltar para reordenar productos.

**Características:**
```typescript
// 1. Hacer elementos arrastrables
productCard.draggable = true
productCard.style.cursor = 'grab'

// 2. Al empezar a arrastrar
dragstart → 
  - Guardar ID del producto
  - Aplicar efecto visual (ring-4, scale-105)
  - Cambiar cursor a 'grabbing'

// 3. Al soltar
drop → 
  - Calcular nueva posición
  - Confirmar con el usuario
  - Actualizar orden en base de datos
  - Recargar productos
  - Limpiar variables
```

**Actualización de orden:**
```typescript
// Si arrastras ID:5 sobre ID:3
// Producto 5 toma el orden del producto 3
// Todos los productos entre 3 y 5 se ajustan

UPDATE productos 
SET orden = orden + 1 
WHERE orden >= 3 AND orden < 5;

UPDATE productos 
SET orden = 3 
WHERE id = 5;
```

**Resultado:**
- ✅ Reordenamiento visual intuitivo
- ✅ Confirmación antes de cambiar
- ✅ Actualización automática en BD
- ✅ Feedback visual claro

---

### 4. Eliminación del Sistema de Precios

**¿Qué se hizo?**
Removimos completamente los precios porque el sitio es solo informativo.

**Archivos modificados:**
1. ❌ `ProductCard.ts` - Eliminado campo precio
2. ❌ `AddProductModal.ts` - Eliminado input de precio
3. ❌ `EditProductModal.ts` - Eliminado input de precio
4. ❌ `setupAddProductModal.ts` - Eliminado del INSERT
5. ❌ `setupEditProductModal.ts` - Eliminado del UPDATE
6. ❌ `loadProducts.ts` - Eliminado de la interfaz
7. ❌ `searchProducts.ts` - Eliminado del renderizado
8. ❌ `pagination.ts` - Eliminado del renderizado

**Script SQL:**
```sql
ALTER TABLE productos 
DROP COLUMN precio;
```

**Resultado:**
- ✅ Solo se muestran descuentos informativos
- ✅ Código más limpio y simple
- ✅ Enfoque en promociones, no en precios

---

### 5. Sistema de Búsqueda Mejorado

**¿Qué se hizo?**
Búsqueda en tiempo real con restauración de vista.

**Características:**
```typescript
// 1. Búsqueda mientras escribes (debounced)
input.addEventListener('input', async (e) => {
  const term = e.target.value
  
  if (term.length < 2) return
  
  // Buscar en BD
  const results = await searchInDB(term)
  
  // Mostrar en dropdown
  showDropdown(results)
})

// 2. Click en resultado
resultItem.addEventListener('click', () => {
  // Mostrar SOLO ese producto en grande
  grid.innerHTML = ProductCard(clickedProduct)
})

// 3. Limpiar búsqueda
clearButton.addEventListener('click', () => {
  // Restaurar paginación completa
  setupPagination(...)
})
```

**Resultado:**
- ✅ Búsqueda instantánea
- ✅ Dropdown con resultados
- ✅ Click muestra producto individual
- ✅ Limpiar restaura vista original

---

### 6. Modo Oscuro

**¿Qué se hizo?**
Implementamos tema oscuro con Tailwind CSS.

**Implementación:**
```typescript
// Detectar preferencia del sistema
const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

// Toggle manual
toggleButton.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
})

// Persistencia
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark')
}
```

**Clases de Tailwind:**
```html
<!-- Fondo blanco en modo claro, gris oscuro en modo oscuro -->
<div class="bg-white dark:bg-gray-800">

<!-- Texto negro en modo claro, blanco en modo oscuro -->
<p class="text-gray-900 dark:text-white">
```

**Resultado:**
- ✅ Cambio automático según preferencia del sistema
- ✅ Toggle manual en navegación
- ✅ Preferencia guardada en localStorage

---

### 7. Sistema de Paginación Dinámica

**¿Qué se hizo?**
Implementamos paginación que se adapta a filtros y búsquedas.

**Características:**
- 📄 12 productos por página
- 🔢 Cálculo automático de páginas totales
- ⬅️➡️ Navegación entre páginas
- 🔄 Integración con filtros
- 💾 Persistencia de página actual

**Resultado:**
- ✅ Carga rápida (solo 12 productos a la vez)
- ✅ Navegación fluida
- ✅ Funciona con filtros y búsquedas

---

## 🐛 Problemas y Soluciones

### Problema 1: Búsqueda no restauraba productos

**❌ Síntoma:**
Cuando limpias la búsqueda, la página quedaba vacía.

**🔍 Causa:**
Llamábamos a `renderProductsInGrid()` en lugar de `setupPagination()`.

**✅ Solución:**
```typescript
// ANTES (incorrecto)
clearButton.addEventListener('click', () => {
  renderProductsInGrid(gridId, categoria)  // ❌ No restaura paginación
})

// DESPUÉS (correcto)
clearButton.addEventListener('click', () => {
  setupPagination(gridId, paginationId, categoria)  // ✅ Restaura todo
})
```

**Lección aprendida:**
Siempre usar `setupPagination()` para vistas completas, `renderProductsInGrid()` solo para casos especiales.

---

### Problema 2: Auto-actualización no funcionaba

**❌ Síntoma:**
Al activar/desactivar un producto, la página no se actualizaba.

**🔍 Causa:**
Comparábamos nombres de página incorrectos:
```typescript
if (currentPage === 'carnes') { }  // ❌ localStorage guardaba 'meats'
```

**✅ Solución:**
```typescript
// Usar nombres en inglés consistentemente
if (currentPage === 'meats') { }   // ✅ Coincide con localStorage
if (currentPage === 'products') { }
if (currentPage === 'offers') { }
```

**Archivos modificados:**
- `main.ts` líneas 195-220

**Lección aprendida:**
Mantener nombres de página consistentes en todo el código.

---

### Problema 3: Drag & Drop no funcionaba

**❌ Síntoma:**
Al arrastrar productos, `draggedId` siempre era `null` en el evento `drop`.

**🔍 Causa:**
El evento `dragend` se disparaba ANTES que `drop` y limpiaba las variables:

```typescript
// ORDEN INCORRECTO
dragstart → draggedId = 5
dragend   → draggedId = null   // ❌ Se limpia muy pronto
drop      → draggedId es null  // ❌ Ya no tenemos el ID
```

**✅ Solución:**
Mover la limpieza al FINAL del evento `drop`:

```typescript
// Evento dragend (NO limpiar aquí)
dragend → Solo quitar efectos visuales

// Evento drop (limpiar AQUÍ)
drop → 
  1. Usar draggedId
  2. Actualizar BD
  3. Recargar productos
  4. AHORA SÍ limpiar: draggedId = null  // ✅ Al final
```

**Código corregido:**
```typescript
// dragend - Solo efectos visuales
productCard.addEventListener('dragend', () => {
  card.classList.remove('ring-4', 'scale-105')  // ✅ Solo visual
  // NO limpiar draggedId aquí
})

// drop - Lógica completa
dropZone.addEventListener('drop', async () => {
  // 1. Usar draggedId
  const dragged = productos.find(p => Number(p.id) === Number(draggedId))
  
  // 2-3. Actualizar y recargar
  await updateOrden(...)
  await reloadProducts()
  
  // 4. Limpiar AL FINAL
  draggedId = null
  draggedElement = null
})
```

**Lección aprendida:**
Entender el orden de eventos del navegador es crucial. El ciclo de vida del drag es: `dragstart` → `dragend` → `drop`.

---

### Problema 4: IDs no coincidían en drag & drop

**❌ Síntoma:**
A veces el producto arrastrado no se encontraba.

**🔍 Causa:**
Comparación de tipos diferentes (string vs number):
```typescript
if (p.id === draggedId) { }  // ❌ '5' !== 5
```

**✅ Solución:**
Convertir ambos a número:
```typescript
if (Number(p.id) === Number(draggedId)) { }  // ✅ 5 === 5
```

**Lección aprendida:**
Siempre usar conversión explícita de tipos en comparaciones.

---

### Problema 5: Valores de orden duplicados

**❌ Síntoma:**
Múltiples productos tenían el mismo valor en la columna `orden`.

**🔍 Causa:**
No se normalizaron los valores al crear productos.

**✅ Solución:**
Script SQL para normalizar:
```sql
-- Asignar orden único basado en created_at
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as new_orden
  FROM productos
)
UPDATE productos 
SET orden = numbered.new_orden
FROM numbered
WHERE productos.id = numbered.id;
```

**Lección aprendida:**
Siempre validar integridad de datos antes de implementar funcionalidades que dependen de ellos.

---

### Problema 6: Precios mostrándose cuando no debían

**❌ Síntoma:**
Los precios aparecían en las tarjetas aunque el sitio es solo informativo.

**🔍 Causa:**
Campo `precio` existía en:
- Base de datos
- Interfaz TypeScript
- Componentes
- Modales
- Funciones de carga

**✅ Solución:**
Eliminación completa en 3 pasos:

**Paso 1: Componentes UI**
```typescript
// ProductCard.ts - Eliminar sección de precio
// AddProductModal.ts - Eliminar input de precio
// EditProductModal.ts - Eliminar input de precio
```

**Paso 2: Lógica de datos**
```typescript
// setupAddProductModal.ts
const precio = formData.get('precio')  // ❌ ELIMINAR

// setupEditProductModal.ts
updateData.precio = ...  // ❌ ELIMINAR
```

**Paso 3: Base de datos**
```sql
ALTER TABLE productos DROP COLUMN precio;
```

**Lección aprendida:**
Para eliminar una funcionalidad completamente, buscar en: UI → lógica → base de datos.

---

### Problema 7: Subcategoría no se guardaba

**❌ Síntoma:**
Al añadir productos, el campo `subcategoria` no se guardaba.

**🔍 Causa:**
Variable declarada pero no incluida en el INSERT:
```typescript
const subcategoria = formData.get('subcategoria')  // ✅ Obtenida
await supabase.insert({
  nombre,
  categoria,
  // subcategoria falta aquí  ❌
})
```

**✅ Solución:**
```typescript
await supabase.insert({
  nombre,
  categoria,
  subcategoria,  // ✅ Añadida
  descuento,
  orden
})
```

**Lección aprendida:**
Verificar que TODAS las variables del formulario se incluyan en la operación de BD.

---

### Problema 8: Filtros en Products.ts no funcionaban

**❌ Síntoma:**
Página de productos vacía al usar filtros.

**🔍 Causa:**
Filtrábamos por `categoria: 'productos'` pero esa categoría no existe en BD:
```typescript
.eq('categoria', 'productos')  // ❌ No existe esta categoría
```

**🔍 Descubrimiento:**
Al revisar la BD, vimos que hay productos con categoría 'productos', pero la lógica original usaba `excludeCarnes`.

**✅ Solución:**
```typescript
.neq('categoria', 'carnes')  // ✅ Excluye carnes, incluye todo lo demás
```

**Lección aprendida:**
Siempre revisar los datos reales en la BD antes de asumir su estructura.

---

## 📖 Guía de Uso

### Para Desarrolladores

**1. Instalación:**
```bash
# Clonar repositorio
git clone https://github.com/tu-repo/super-carnes-garcia.git

# Instalar dependencias
npm install

# Configurar Supabase
# Editar src/lib/supabaseClient.ts con tus credenciales
```

**2. Desarrollo:**
```bash
# Modo desarrollo con hot reload
npm run dev

# Abrir en: http://localhost:5173
```

**3. Build de producción:**
```bash
# Compilar para producción
npm run build

# Preview del build
npm run preview
```

### Para Administradores

**1. Login:**
- Ir a la página de inicio
- Click en botón de usuario (esquina superior derecha)
- Ingresar credenciales de admin

**2. Añadir producto:**
- Click en botón "➕ Añadir"
- Llenar formulario
- Arrastrar imagen o hacer click para seleccionar
- Click en "Guardar"

**3. Editar producto:**
- Click en "✏️ Editar" en la tarjeta del producto
- Modificar campos necesarios
- Click en "Guardar cambios"

**4. Reordenar productos:**
- Arrastrar tarjeta de producto
- Soltar en nueva posición
- Confirmar cambio

**5. Activar/Desactivar:**
- Click en "👁️" para ocultar/mostrar producto
- Los productos inactivos solo los ve el admin

### Para Usuarios

**1. Navegar:**
- **Inicio:** Bienvenida y destacados
- **Carnes:** Todos los cortes de carne
- **Productos:** Abarrotes, lácteos, etc.
- **Ofertas:** Solo productos con descuento

**2. Filtrar:**
- Click en botones de categoría (Premium, Res, etc.)
- Click en "Todos" para ver sin filtro

**3. Buscar:**
- Escribir en barra de búsqueda
- Click en resultado para ver detalles
- Click en ❌ para limpiar

**4. Modo oscuro:**
- Click en ☀️/🌙 para cambiar tema

---

## 🔧 Mantenimiento

### Actualizar productos masivamente

```sql
-- Cambiar todos los productos de una categoría
UPDATE productos 
SET subcategoria = 'Premium'
WHERE categoria = 'carnes' AND descuento >= 50;

-- Activar todos los productos
UPDATE productos 
SET activo = true;

-- Cambiar orden de categoría completa
UPDATE productos 
SET orden = orden + 10
WHERE categoria = 'productos';
```

### Backup de imágenes

```typescript
// Listar todas las imágenes
const { data: files } = await supabase.storage
  .from('productos-imagenes')
  .list('carnes')

// Descargar cada imagen
for (const file of files) {
  const { data } = await supabase.storage
    .from('productos-imagenes')
    .download(`carnes/${file.name}`)
}
```

### Limpiar productos inactivos antiguos

```sql
-- Eliminar productos inactivos por más de 6 meses
DELETE FROM productos
WHERE activo = false 
AND created_at < NOW() - INTERVAL '6 months';
```

---

## 📝 Notas Finales

### Buenas Prácticas Implementadas

- ✅ **TypeScript:** Tipado fuerte para prevenir errores
- ✅ **Modularidad:** Código dividido en archivos pequeños y específicos
- ✅ **Validaciones:** En frontend y backend
- ✅ **Manejo de errores:** Try-catch en todas las operaciones async
- ✅ **Feedback visual:** Loading, confirmaciones, mensajes de error
- ✅ **Responsive:** Funciona en móvil, tablet y escritorio
- ✅ **Accesibilidad:** Botones con labels, imágenes con alt
- ✅ **Performance:** Paginación, lazy loading de imágenes

### Próximas Mejoras Sugeridas

- 🔄 Caché de productos para carga más rápida
- 🔔 Notificaciones en tiempo real con Supabase Realtime
- 📊 Panel de estadísticas para admin
- 🛒 Sistema de pedidos (si se requiere)
- 📱 App móvil nativa con React Native
- 🌍 Multi-idioma (español/inglés)
- 📧 Notificaciones por email de nuevos productos

---

**Fecha de última actualización:** 18 de noviembre de 2025
**Versión:** 1.0.0
**Autor:** Super Carnes García Development Team
