# Sistema de Múltiples Subcategorías

## 📋 Descripción General

Sistema que permite que un producto pertenezca a **múltiples subcategorías simultáneamente**, mejorando la flexibilidad de categorización y visualización de productos.

### Ejemplo de Uso
Un **Ribeye** puede aparecer en:
- ✅ Premium
- ✅ Cortes Especiales
- ✅ Ofertas (si tiene descuento)

## 🗄️ Estructura de Base de Datos

### Tabla: `producto_subcategorias`

```sql
CREATE TABLE producto_subcategorias (
  id BIGSERIAL PRIMARY KEY,
  producto_id BIGINT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  subcategoria TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(producto_id, subcategoria)
);
```

### Relación con Tabla Productos

- **Antes**: Columna `subcategoria` en tabla `productos` (1 subcategoría por producto)
- **Ahora**: Tabla `producto_subcategorias` con relación many-to-many (N subcategorías por producto)

### Índices Creados

```sql
-- Búsqueda rápida por producto
CREATE INDEX idx_producto_subcategorias_producto_id ON producto_subcategorias(producto_id);

-- Filtrado rápido por subcategoría
CREATE INDEX idx_producto_subcategorias_subcategoria ON producto_subcategorias(subcategoria);
```

## 🔐 Políticas de Seguridad (RLS)

| Operación | Permiso | Condición |
|-----------|---------|-----------|
| SELECT | Público | Todos pueden leer |
| INSERT | Admin | Solo usuarios con role='admin' |
| UPDATE | Admin | Solo usuarios con role='admin' |
| DELETE | Admin | Solo usuarios con role='admin' |

## 🎨 Interfaz de Usuario

### Modal de Edición de Producto

**Antes:**
```html
<select id="editSubcategoria">
  <option value="Premium">Premium</option>
  <option value="Económica">Económica</option>
  <!-- Solo 1 opción seleccionable -->
</select>
```

**Ahora:**
```html
<div id="editSubcategoriasGroup">
  <label>
    <input type="checkbox" name="subcategorias" value="Premium">
    Premium
  </label>
  <label>
    <input type="checkbox" name="subcategorias" value="Económica">
    Económica
  </label>
  <!-- Múltiples opciones seleccionables -->
</div>
```

### Subcategorías por Categoría

#### Carnes
- Premium
- Económica
- Cerdo
- Pollo
- Cortes Especiales

#### Productos (No Cárnicos)
- Abarrotes
- Lácteos
- Embutidos
- Condimentos

## 💻 Implementación Frontend

### 1. Cargar Subcategorías de un Producto

```typescript
// Obtener todas las subcategorías de un producto
const { data, error } = await supabase
  .from('producto_subcategorias')
  .select('subcategoria')
  .eq('producto_id', productId);

const subcategorias = data?.map(item => item.subcategoria) || [];
```

### 2. Guardar Múltiples Subcategorías

```typescript
// Obtener subcategorías seleccionadas del formulario
const checkboxes = document.querySelectorAll('input[name="subcategorias"]:checked');
const selectedSubcategorias = Array.from(checkboxes).map(cb => cb.value);

// 1. Eliminar subcategorías antiguas
await supabase
  .from('producto_subcategorias')
  .delete()
  .eq('producto_id', productId);

// 2. Insertar nuevas subcategorías
if (selectedSubcategorias.length > 0) {
  const insertData = selectedSubcategorias.map(sub => ({
    producto_id: productId,
    subcategoria: sub
  }));
  
  await supabase
    .from('producto_subcategorias')
    .insert(insertData);
}
```

### 3. Filtrar Productos por Subcategoría

```typescript
// Query para obtener productos con subcategoría específica
const { data, error } = await supabase
  .from('productos')
  .select(`
    *,
    producto_subcategorias!inner(subcategoria)
  `)
  .eq('producto_subcategorias.subcategoria', 'Premium')
  .eq('activo', true);
```

### 4. Renderizar Checkboxes según Categoría

```typescript
function renderSubcategoryCheckboxes(categoria: string, selectedSubcategorias: string[]) {
  const subcategoriasPorCategoria = {
    'Carnes': ['Premium', 'Económica', 'Cerdo', 'Pollo', 'Cortes Especiales'],
    'Productos': ['Abarrotes', 'Lácteos', 'Embutidos', 'Condimentos']
  };
  
  const options = subcategoriasPorCategoria[categoria] || [];
  
  return options.map(sub => `
    <label class="flex items-center space-x-2 cursor-pointer">
      <input 
        type="checkbox" 
        name="subcategorias" 
        value="${sub}"
        ${selectedSubcategorias.includes(sub) ? 'checked' : ''}
        class="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
      >
      <span class="text-sm text-gray-700 dark:text-gray-300">${sub}</span>
    </label>
  `).join('');
}
```

## 🔄 Migración de Datos

### Script de Migración

```sql
-- Copiar subcategorías existentes a nueva tabla
INSERT INTO producto_subcategorias (producto_id, subcategoria)
SELECT id, subcategoria
FROM productos
WHERE subcategoria IS NOT NULL AND subcategoria != '';
```

### Verificación Post-Migración

```sql
-- Verificar que todos los productos se migraron
SELECT 
  COUNT(DISTINCT p.id) as productos_originales,
  COUNT(DISTINCT ps.producto_id) as productos_migrados
FROM productos p
LEFT JOIN producto_subcategorias ps ON p.id = ps.producto_id
WHERE p.subcategoria IS NOT NULL;
```

## 📊 Consultas Útiles

### Productos con Todas sus Subcategorías

```sql
SELECT 
  p.id,
  p.nombre,
  p.categoria,
  ARRAY_AGG(ps.subcategoria) as subcategorias
FROM productos p
LEFT JOIN producto_subcategorias ps ON p.id = ps.producto_id
WHERE p.activo = true
GROUP BY p.id, p.nombre, p.categoria
ORDER BY p.nombre;
```

### Productos en Múltiples Subcategorías

```sql
SELECT 
  p.nombre,
  COUNT(ps.subcategoria) as num_subcategorias,
  ARRAY_AGG(ps.subcategoria) as subcategorias
FROM productos p
INNER JOIN producto_subcategorias ps ON p.id = ps.producto_id
GROUP BY p.id, p.nombre
HAVING COUNT(ps.subcategoria) > 1
ORDER BY num_subcategorias DESC;
```

### Productos por Subcategoría (con conteo)

```sql
SELECT 
  ps.subcategoria,
  COUNT(*) as total_productos,
  ARRAY_AGG(p.nombre) as productos
FROM producto_subcategorias ps
INNER JOIN productos p ON ps.producto_id = p.id
WHERE p.activo = true
GROUP BY ps.subcategoria
ORDER BY total_productos DESC;
```

## 🎯 Ventajas del Sistema

1. **Mayor Flexibilidad**: Un producto puede estar en múltiples categorías
2. **Mejor SEO**: Productos aparecen en más búsquedas y filtros
3. **Organización Mejorada**: Clasificación más precisa de productos
4. **Escalabilidad**: Fácil agregar/quitar subcategorías sin afectar la estructura
5. **Performance**: Índices optimizados para consultas rápidas

## ⚠️ Consideraciones

1. **Consistencia**: Validar que las subcategorías seleccionadas correspondan a la categoría del producto
2. **UI/UX**: Mostrar claramente cuántas subcategorías tiene un producto
3. **Validación**: Un producto debe tener al menos 1 subcategoría
4. **Limpieza**: Al eliminar un producto, las subcategorías se eliminan automáticamente (CASCADE)

## 🚀 Próximos Pasos

- [x] Crear tabla `producto_subcategorias`
- [x] Configurar políticas RLS
- [x] Crear índices de rendimiento
- [ ] Modificar modal de edición para usar checkboxes
- [ ] Modificar modal de creación para usar checkboxes
- [ ] Actualizar funciones de filtrado en páginas (Ofertas, Productos, Carnes)
- [ ] Actualizar función de paginación
- [ ] Migrar datos existentes
- [ ] Pruebas de funcionalidad completa
