-- 🔍 DIAGNÓSTICO COMPLETO: Ver TODAS las políticas y permisos de productos

-- 1. Ver TODAS las políticas RLS de la tabla productos
SELECT 
  policyname,
  cmd,
  permissive,
  roles,
  qual AS "USING",
  with_check AS "WITH_CHECK"
FROM pg_policies
WHERE tablename = 'productos'
ORDER BY cmd, policyname;

-- 2. Ver si RLS está habilitado
SELECT 
  tablename,
  rowsecurity AS "RLS_habilitado"
FROM pg_tables
WHERE tablename = 'productos';

-- 3. Probar UPDATE directo como admin
-- Esto debería funcionar si eres admin
UPDATE productos
SET activo = false
WHERE id = 1
RETURNING id, nombre, activo;

-- 4. Ver permisos de la tabla
SELECT 
  grantee,
  privilege_type
FROM information_schema.table_privileges
WHERE table_name = 'productos';

-- 5. Verificar que auth.uid() devuelve tu ID correctamente
SELECT 
  auth.uid() AS "mi_user_id",
  (SELECT role FROM user_profiles WHERE id = auth.uid()) AS "mi_rol";
