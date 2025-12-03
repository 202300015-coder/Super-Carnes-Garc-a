# Sistema de Precios en Ofertas - Documentación

## 📋 Resumen de Cambios

Se implementó un sistema de visualización de precios **exclusivamente para la sección de Ofertas**, mostrando el precio original tachado y el precio con descuento aplicado.

---

## 🗄️ Paso 1: Ejecutar Script SQL

Debes ejecutar el siguiente script en Supabase para agregar la columna `precio` a la tabla `productos`:

**Ubicación:** `database/agregar-columna-precio.sql`

### Instrucciones:

1. Ve a Supabase Dashboard → SQL Editor
2. Abre el archivo `database/agregar-columna-precio.sql`
3. Copia y pega el contenido completo
4. Click en "Run" o presiona `Ctrl + Enter`
5. Verifica que aparezca el mensaje de éxito

### Lo que hace el script:

- ✅ Agrega columna `precio` (DECIMAL 10,2) a la tabla `productos`
- ✅ Establece valores de ejemplo para productos existentes
- ✅ Muestra productos con descuento para verificar

---

## 💻 Paso 2: Cambios en el Código (Ya implementados)

### Archivos modificados:

#### 1. `src/components/ui/ProductCard.ts`
- ✨ Agregado campo `precio?: number` a la interfaz `Product`
- ✨ Agregado campo `showPrice?: boolean` para controlar visibilidad
- ✨ Implementada lógica de cálculo de precio con descuento
- ✨ Diseño visual: precio original tachado → flecha → precio con descuento en verde

#### 2. `src/pages/pagination.ts`
- ✨ Pasando `precio: producto.precio` al ProductCard
- ✨ Pasando `showPrice: onlyOffers` (true solo en Ofertas)

#### 3. `src/pages/loadProducts.ts`
- ✅ Ya contenía el campo `precio` en la interfaz `Product`

---

## 🎨 Visualización de Precios

### Solo en la sección "Ofertas":

```
┌─────────────────────────────────┐
│  -78%                          │  ← Badge de descuento
│  ┌───────────────────────────┐ │
│  │                           │ │
│  │    [Imagen producto]      │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│  T-Bone                        │
│  Corte clásico americano       │
│  ─────────────────────────────  │
│  $1200  →  $840               │  ← Precio original tachado → Precio con descuento
│  (gris)    (verde grande)      │
└─────────────────────────────────┘
```

### En Carnes y Productos:

```
┌─────────────────────────────────┐
│  ┌───────────────────────────┐ │
│  │                           │ │
│  │    [Imagen producto]      │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│  Ribeye Premium                │
│  Corte de res de primera       │
│                                 │
│  (Sin precios)                 │  ← NO se muestran precios
└─────────────────────────────────┘
```

---

## 🔧 Cómo Funciona

### Lógica de precios:

```typescript
// Si showPrice=true Y precio > 0
if (product.showPrice && precioOriginal > 0) {
  
  // Si tiene descuento
  if (hasDiscount) {
    // Mostrar: $1200 → $840
    precioConDescuento = precio - (precio * descuento / 100)
  } else {
    // Mostrar solo: $1200
  }
}
```

### Control de visibilidad:

| Sección   | onlyOffers | showPrice | Muestra Precios |
|-----------|------------|-----------|-----------------|
| Carnes    | false      | false     | ❌ NO           |
| Productos | false      | false     | ❌ NO           |
| Ofertas   | true       | true      | ✅ SÍ           |

---

## 📝 Agregar Precios a Productos

### Opción 1: Desde Supabase Dashboard

1. Ve a Supabase → Table Editor → productos
2. Edita el producto deseado
3. Establece el campo `precio` (ejemplo: 1200.00)
4. Guarda los cambios

### Opción 2: Con SQL

```sql
-- Actualizar precio de un producto específico
UPDATE productos 
SET precio = 1200.00 
WHERE nombre = 'T-Bone';

-- Actualizar múltiples productos
UPDATE productos 
SET precio = CASE 
  WHEN nombre = 'Ribeye Premium' THEN 850.00
  WHEN nombre = 'Arrachera' THEN 650.00
  WHEN nombre = 'Picaña' THEN 750.00
  ELSE precio
END;
```

---

## ✅ Checklist de Verificación

Después de ejecutar el script SQL:

- [ ] La columna `precio` existe en la tabla `productos`
- [ ] Los productos de ejemplo tienen precios asignados
- [ ] La aplicación está compilada (`npm run build`)
- [ ] Al visitar la sección "Ofertas", se ven los precios
- [ ] Los precios originales están tachados
- [ ] Los precios con descuento están en verde
- [ ] En "Carnes" y "Productos" NO se ven precios

---

## 🎯 Ejemplo Real

### Producto con 30% de descuento:

**Base de datos:**
```
nombre: "T-Bone"
precio: 1200
descuento: 30
```

**Resultado en pantalla (Ofertas):**
```
$1200.00  →  $840.00
 (gris)      (verde)
```

**Cálculo:**
```
1200 - (1200 × 30 / 100) = 1200 - 360 = 840
```

---

## 🚀 Compilación

El proyecto ya está compilado. Si haces cambios adicionales:

```bash
npm run build
```

**Archivos generados:**
- `dist/assets/index-b17da11a.css` (52.74 KB)
- `dist/assets/index-7b18061e.js` (305.21 KB)

---

## 📞 Soporte

Si encuentras algún problema:

1. Verifica que el script SQL se ejecutó correctamente
2. Revisa que los productos tengan valores en el campo `precio`
3. Asegúrate de estar en la sección "Ofertas"
4. Verifica que los productos tengan `descuento > 0`

---

**Última actualización:** 30 de noviembre, 2025  
**Versión:** 1.0.0
