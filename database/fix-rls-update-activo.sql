-- Arreglar políticas RLS para permitir UPDATE del campo activo
-- Ejecutar en el SQL Editor de Supabase

-- Primero, eliminar TODAS las políticas UPDATE existentes
DROP POLICY IF EXISTS "Admin can update productos" ON productos;
DROP POLICY IF EXISTS "Solo admins pueden actualizar productos" ON productos;

-- Crear política UPDATE simplificada y permisiva para admins
CREATE POLICY "Admin full update productos"
ON productos
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
)
WITH CHECK (true);  -- Permitir cualquier valor en el UPDATE si es admin

-- Verificar que la política se creó correctamente
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'productos'
AND cmd = 'UPDATE';
