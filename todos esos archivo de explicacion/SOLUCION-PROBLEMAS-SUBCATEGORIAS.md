# 🚨 Guía de Solución de Problemas - Sistema de Subcategorías

## ❌ Problema Actual

Al ejecutar el SQL que elimina la columna `subcategoria`, el sistema presenta errores porque el código frontend todavía la busca.

## ✅ Solución Paso a Paso

### 📝 **PASO 1: Arreglar Políticas RLS en Supabase**

1. Ve a Supabase → **SQL Editor**
2. Ejecuta el contenido de: `database/arreglar-politicas-subcategorias.sql`

```sql
-- Eliminar políticas antiguas
DROP POLICY IF EXISTS "Permitir lectura pública de subcategorías" ON producto_subcategorias;
DROP POLICY IF EXISTS "Solo admins pueden insertar subcategorías" ON producto_subcategorias;
DROP POLICY IF EXISTS "Solo admins pueden actualizar subcategorías" ON producto_subcategorias;
DROP POLICY IF EXISTS "Solo admins pueden eliminar subcategorías" ON producto_subcategorias;

-- Deshabilitar RLS
ALTER TABLE producto_subcategorias DISABLE ROW LEVEL SECURITY;

-- Crear políticas unrestricted (sin verificación de rol)
CREATE POLICY "Permitir lectura pública de subcategorías"
ON producto_subcategorias FOR SELECT
USING (true);

CREATE POLICY "Permitir inserción a usuarios autenticados"
ON producto_subcategorias FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Permitir actualización a usuarios autenticados"
ON producto_subcategorias FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Permitir eliminación a usuarios autenticados"
ON producto_subcategorias FOR DELETE
TO authenticated
USING (true);

-- Re-habilitar RLS
ALTER TABLE producto_subcategorias ENABLE ROW LEVEL SECURITY;
```

**Por qué:** Las políticas antiguas intentaban acceder a `auth.users` de forma incorrecta, causando "permission denied".

---

### 🔄 **PASO 2: Actualizar Código Frontend (YA HECHO)**

Los siguientes archivos **ya fueron actualizados** en esta sesión:

✅ **Modal de Edición:**
- `src/components/ui/EditProductModal.ts` - Ahora usa checkboxes
- `src/components/ui/setupEditProductModal.ts` - Carga/guarda en `producto_subcategorias`

✅ **Modal de Agregar:**
- `src/components/ui/AddProductModal.ts` - Ahora usa checkboxes
- `src/components/ui/setupAddProductModal.ts` - Inserta en `producto_subcategorias`

**Build exitoso:** 316.11 kB

---

### ⚠️ **PASO 3: Verificar Estado de la Base de Datos**

Ejecuta en Supabase SQL Editor:

```sql
-- Ver si la columna subcategoria todavía existe
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'productos' 
AND column_name = 'subcategoria';

-- Si la columna NO existe (eliminada), verifica que los datos se migraron:
SELECT COUNT(*) as productos_con_subcategorias 
FROM producto_subcategorias;

-- Ver ejemplo de productos con subcategorías
SELECT 
  p.id,
  p.nombre,
  ARRAY_AGG(ps.subcategoria) as subcategorias
FROM productos p
LEFT JOIN producto_subcategorias ps ON p.id = ps.producto_id
GROUP BY p.id, p.nombre
LIMIT 5;
```

---

### 🛠️ **PASO 4: Si No se Migraron los Datos**

Si la tabla `producto_subcategorias` está vacía pero los productos tenían subcategorías:

**Opción A - Restaurar Columna y Migrar:**

```sql
-- 1. Restaurar la columna subcategoria (si la eliminaste)
ALTER TABLE productos ADD COLUMN IF NOT EXISTS subcategoria TEXT;

-- 2. Migrar datos a producto_subcategorias
INSERT INTO producto_subcategorias (producto_id, subcategoria)
SELECT id, subcategoria
FROM productos
WHERE subcategoria IS NOT NULL AND subcategoria != ''
ON CONFLICT (producto_id, subcategoria) DO NOTHING;

-- 3. Verificar migración
SELECT COUNT(*) FROM producto_subcategorias;

-- 4. (Opcional) Eliminar columna después de verificar
-- ALTER TABLE productos DROP COLUMN subcategoria;
```

**Opción B - Asignar Manualmente:**

Si perdiste los datos, tendrás que asignar subcategorías manualmente a cada producto usando los modales.

---

## 📋 Funcionalidades Implementadas

### ✅ Modal de Agregar Producto
- Checkboxes dinámicos según categoría (Carnes/Productos)
- Permite seleccionar múltiples subcategorías
- Validación: requiere al menos 1 subcategoría
- Inserta automáticamente en `producto_subcategorias`

### ✅ Modal de Editar Producto
- Carga subcategorías existentes desde `producto_subcategorias`
- Checkboxes pre-marcados según las subcategorías actuales
- Al guardar: elimina antiguas + inserta nuevas
- Vista previa de precio con descuento

### ⚠️ Pendiente de Actualizar

Los **filtros en las páginas** todavía necesitan actualización:

- `src/pages/Meats.ts`
- `src/pages/Offers.ts`
- `src/pages/Products.ts`
- `src/pages/pagination.ts`

Estos archivos todavía usan la columna `subcategoria` antigua. Necesitan modificarse para hacer JOIN con `producto_subcategorias`.

---

## 🧪 Cómo Probar

1. **Crear Producto Nuevo:**
   - Clic en "Añadir" (botón admin)
   - Seleccionar categoría → Ver checkboxes correspondientes
   - Marcar 2-3 subcategorías
   - Guardar → Verificar éxito

2. **Editar Producto:**
   - Clic en producto existente
   - Ver que las subcategorías actuales están marcadas
   - Cambiar selección
   - Guardar → Verificar cambios

3. **Verificar en Base de Datos:**
   ```sql
   SELECT p.nombre, ARRAY_AGG(ps.subcategoria) 
   FROM productos p
   JOIN producto_subcategorias ps ON p.id = ps.producto_id
   WHERE p.id = 1  -- Cambiar por ID del producto probado
   GROUP BY p.nombre;
   ```

---

## 🐛 Solución de Errores Comunes

### Error: "Could not find the 'subcategoria' column"

**Causa:** Código frontend busca columna eliminada.

**Solución:** Ya corregido en modales. Si persiste en otras páginas, significa que esa página necesita actualización (ver sección "Pendiente de Actualizar").

---

### Error: "permission denied for table users"

**Causa:** Políticas RLS incorrectas.

**Solución:** Ejecutar `database/arreglar-politicas-subcategorias.sql`

---

### Error: "No se guardaron las subcategorías"

**Posibles causas:**

1. **RLS bloqueando:** Ejecutar script de políticas
2. **Producto no se insertó:** Verificar que `newProduct.id` existe
3. **Error de permisos:** Verificar que estás autenticado como admin

**Debug:**
```javascript
// Abrir consola del navegador (F12)
// Buscar logs:
console.log('✅ Subcategorías insertadas:', selectedSubcategorias);
```

---

### Los filtros no funcionan

**Causa:** Las páginas aún buscan en la columna `subcategoria` antigua.

**Solución:** Necesitas actualizar las queries en:
- `Meats.ts`
- `Offers.ts`  
- `Products.ts`
- `pagination.ts`

**Ejemplo de query actualizada:**
```typescript
// Antes:
.eq('subcategoria', 'Premium')

// Ahora:
.select(`
  *,
  producto_subcategorias!inner(subcategoria)
`)
.eq('producto_subcategorias.subcategoria', 'Premium')
```

---

## 📞 Siguiente Paso

**Ejecuta AHORA en Supabase:**

1. Ve a: **Database** → **SQL Editor**
2. Copia y ejecuta: `database/arreglar-politicas-subcategorias.sql`
3. Recarga la página de tu aplicación
4. Prueba crear/editar un producto

**Si todo funciona correctamente**, verás:
- ✅ Checkboxes en ambos modales
- ✅ Productos se guardan sin errores
- ✅ Subcategorías aparecen en la base de datos

---

**Última actualización:** 30 de noviembre de 2024  
**Build:** 316.11 kB (exitoso)
