-- Script para eliminar la columna 'precio' de la tabla productos
-- La aplicación ahora es solo informativa y no muestra precios
-- Solo se mantiene el campo 'descuento' para mostrar ofertas

-- Paso 1: Verificar que la columna existe
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'productos' AND column_name = 'precio';

-- Paso 2: Eliminar la columna precio
ALTER TABLE productos 
DROP COLUMN IF EXISTS precio;

-- Paso 3: Verificar que se eliminó correctamente
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'productos'
ORDER BY ordinal_position;

-- Resultado esperado: No debe aparecer la columna 'precio'
-- Solo deben estar: id, nombre, descripcion, imagen_url, categoria, descuento, orden, activo, created_at, updated_at
