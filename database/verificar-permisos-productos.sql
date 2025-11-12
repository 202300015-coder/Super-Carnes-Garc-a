-- Verificar políticas actuales en la tabla productos
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
WHERE tablename = 'productos';

-- Verificar si RLS está habilitado
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'productos';

-- Si RLS está habilitado, necesitamos crear políticas para permitir al admin editar
-- Deshabilitar RLS temporalmente (solo para desarrollo)
-- ALTER TABLE public.productos DISABLE ROW LEVEL SECURITY;

-- O crear políticas apropiadas:

-- 1. Permitir a todos los usuarios autenticados LEER productos activos
DROP POLICY IF EXISTS "Todos pueden ver productos activos" ON public.productos;
CREATE POLICY "Todos pueden ver productos activos"
ON public.productos
FOR SELECT
TO authenticated
USING (activo = true);

-- 2. Solo admins pueden INSERTAR productos
DROP POLICY IF EXISTS "Solo admins pueden crear productos" ON public.productos;
CREATE POLICY "Solo admins pueden crear productos"
ON public.productos
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- 3. Solo admins pueden ACTUALIZAR productos
DROP POLICY IF EXISTS "Solo admins pueden actualizar productos" ON public.productos;
CREATE POLICY "Solo admins pueden actualizar productos"
ON public.productos
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- 4. Solo admins pueden ELIMINAR productos
DROP POLICY IF EXISTS "Solo admins pueden eliminar productos" ON public.productos;
CREATE POLICY "Solo admins pueden eliminar productos"
ON public.productos
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- Verificar las nuevas políticas
SELECT 
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE tablename = 'productos';
