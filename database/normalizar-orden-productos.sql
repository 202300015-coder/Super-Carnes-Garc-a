-- Script para normalizar el campo 'orden' en la tabla productos
-- Esto asegura que cada producto tenga un orden único basado en su ID

-- Paso 1: Actualizar todos los productos para que tengan un orden único
-- basado en su ID (orden temporal)
UPDATE productos 
SET orden = id 
WHERE orden IS NULL OR orden IN (
  SELECT orden 
  FROM productos 
  GROUP BY orden 
  HAVING COUNT(*) > 1
);

-- Paso 2: Verificar que todos los productos tengan órdenes únicos
SELECT id, nombre, categoria, orden, COUNT(*) OVER (PARTITION BY orden) as duplicados
FROM productos
ORDER BY orden, id;

-- Si todo está bien, deberías ver duplicados = 1 en todos los registros

-- Paso 3 (OPCIONAL): Si quieres ordenar por categoría primero
-- Descomenta las siguientes líneas:

/*
WITH ranked_productos AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (ORDER BY categoria, nombre) as new_orden
  FROM productos
)
UPDATE productos p
SET orden = rp.new_orden
FROM ranked_productos rp
WHERE p.id = rp.id;
*/
