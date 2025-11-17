-- Script para agregar columna 'subcategoria' a la tabla productos
-- Esta columna permitirá filtrar productos por tipo específico

-- Paso 1: Agregar la columna subcategoria
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS subcategoria VARCHAR(50);

-- Paso 2: Actualizar productos existentes con subcategorías por defecto
-- Asignar 'Premium' a productos con descuento mayor a 50%
UPDATE productos 
SET subcategoria = 'Premium'
WHERE descuento >= 50 AND subcategoria IS NULL;

-- Asignar 'Res' a productos de carnes sin subcategoría
UPDATE productos 
SET subcategoria = 'Res'
WHERE categoria = 'carnes' AND subcategoria IS NULL;

-- Asignar 'General' a productos sin subcategoría
UPDATE productos 
SET subcategoria = 'General'
WHERE subcategoria IS NULL;

-- Paso 3: Verificar la estructura
SELECT id, nombre, categoria, subcategoria, descuento
FROM productos
ORDER BY categoria, subcategoria, nombre
LIMIT 20;

-- Valores sugeridos para subcategoria:
-- Para carnes: 'Premium', 'Res', 'Cerdo', 'Pollo', 'Cortes Especiales'
-- Para productos: 'Abarrotes', 'Lácteos', 'Embutidos', 'Condimentos', 'General'
