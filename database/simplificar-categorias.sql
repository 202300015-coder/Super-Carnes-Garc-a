-- ======================================
-- Simplificar Categorías a Solo 2
-- ======================================
-- Este script simplifica las categorías a solo "carnes" y "productos"
-- y actualiza todos los productos existentes

-- 1. Eliminar el constraint actual
ALTER TABLE public.productos 
DROP CONSTRAINT IF EXISTS productos_categoria_check;

-- 2. Crear el nuevo constraint con solo 2 categorías
ALTER TABLE public.productos 
ADD CONSTRAINT productos_categoria_check 
CHECK (categoria IN ('carnes', 'productos'));

-- 3. Actualizar productos existentes que tengan categorías antiguas
-- Mapear categorías antiguas a las nuevas:
-- - 'Premium', 'Res', 'Cerdo', 'Pollo' → 'carnes'
-- - 'Especialidades', 'ofertas' → 'productos'

UPDATE public.productos
SET categoria = 'carnes'
WHERE categoria IN ('Premium', 'Res', 'Cerdo', 'Pollo', 'Carnes');

UPDATE public.productos
SET categoria = 'productos'
WHERE categoria IN ('Especialidades', 'ofertas', 'Ofertas');

-- 4. Verificar que todos los productos tengan categorías válidas
SELECT 
  categoria,
  COUNT(*) as total_productos
FROM public.productos
WHERE activo = true
GROUP BY categoria
ORDER BY categoria;

-- 5. Verificar el constraint
SELECT 
  con.conname AS constraint_name,
  pg_get_constraintdef(con.oid) AS constraint_definition
FROM pg_constraint con
JOIN pg_class rel ON rel.oid = con.conrelid
WHERE rel.relname = 'productos' 
  AND con.conname = 'productos_categoria_check';
