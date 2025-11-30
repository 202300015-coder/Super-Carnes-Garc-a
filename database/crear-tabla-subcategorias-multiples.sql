-- ==========================================
-- SISTEMA DE MÚLTIPLES SUBCATEGORÍAS
-- ==========================================
-- Este script crea la tabla para permitir que un producto
-- pertenezca a múltiples subcategorías simultáneamente

-- Paso 1: Crear tabla de relación producto-subcategorías
CREATE TABLE IF NOT EXISTS producto_subcategorias (
  id BIGSERIAL PRIMARY KEY,
  producto_id BIGINT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  subcategoria TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Evitar duplicados: un producto no puede tener la misma subcategoría dos veces
  UNIQUE(producto_id, subcategoria)
);

-- Paso 2: Crear índices para mejorar rendimiento
CREATE INDEX idx_producto_subcategorias_producto_id ON producto_subcategorias(producto_id);
CREATE INDEX idx_producto_subcategorias_subcategoria ON producto_subcategorias(subcategoria);

-- Paso 3: Migrar datos existentes de la columna 'subcategoria' a la nueva tabla
-- Esto copia todas las subcategorías actuales de los productos
INSERT INTO producto_subcategorias (producto_id, subcategoria)
SELECT id, subcategoria
FROM productos
WHERE subcategoria IS NOT NULL AND subcategoria != '';

-- Paso 4 (OPCIONAL): Eliminar la columna antigua 'subcategoria' después de migrar
-- ⚠️ EJECUTAR SOLO DESPUÉS DE VERIFICAR QUE LA MIGRACIÓN FUE EXITOSA
-- ALTER TABLE productos DROP COLUMN subcategoria;

-- Paso 5: Configurar políticas RLS (Row Level Security)
ALTER TABLE producto_subcategorias ENABLE ROW LEVEL SECURITY;

-- Política de lectura: todos pueden leer
CREATE POLICY "Permitir lectura pública de subcategorías"
ON producto_subcategorias FOR SELECT
TO public
USING (true);

-- Política de inserción: solo admins
CREATE POLICY "Solo admins pueden insertar subcategorías"
ON producto_subcategorias FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Política de actualización: solo admins
CREATE POLICY "Solo admins pueden actualizar subcategorías"
ON producto_subcategorias FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Política de eliminación: solo admins
CREATE POLICY "Solo admins pueden eliminar subcategorías"
ON producto_subcategorias FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- ==========================================
-- CONSULTAS DE VERIFICACIÓN
-- ==========================================

-- Verificar que la tabla se creó correctamente
SELECT * FROM producto_subcategorias LIMIT 5;

-- Contar cuántas subcategorías se migraron
SELECT COUNT(*) as total_subcategorias FROM producto_subcategorias;

-- Ver productos con sus subcategorías (nueva estructura)
SELECT 
  p.id,
  p.nombre,
  ARRAY_AGG(ps.subcategoria) as subcategorias
FROM productos p
LEFT JOIN producto_subcategorias ps ON p.id = ps.producto_id
GROUP BY p.id, p.nombre
ORDER BY p.id
LIMIT 10;

-- ==========================================
-- EJEMPLO DE USO
-- ==========================================

-- Agregar múltiples subcategorías a un producto
-- Ejemplo: Ribeye en "Premium" y "Cortes Especiales"
/*
INSERT INTO producto_subcategorias (producto_id, subcategoria)
VALUES 
  (1, 'Premium'),
  (1, 'Cortes Especiales');
*/

-- Consultar productos de una subcategoría específica
/*
SELECT DISTINCT p.*
FROM productos p
INNER JOIN producto_subcategorias ps ON p.id = ps.producto_id
WHERE ps.subcategoria = 'Premium'
AND p.activo = true;
*/

-- Eliminar todas las subcategorías de un producto
/*
DELETE FROM producto_subcategorias WHERE producto_id = 1;
*/
