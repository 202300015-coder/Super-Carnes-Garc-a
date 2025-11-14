-- ⚠️ SOLUCIÓN DEFINITIVA: Eliminar TODAS las políticas UPDATE y crear una nueva permisiva
-- Ejecutar en el SQL Editor de Supabase

-- PASO 1: Ver todas las políticas UPDATE actuales
SELECT policyname FROM pg_policies 
WHERE tablename = 'productos' AND cmd = 'UPDATE';

-- PASO 2: Eliminar TODAS las políticas UPDATE (ajustar nombres según resultado anterior)
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'productos' 
        AND schemaname = 'public'
        AND cmd = 'UPDATE'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON productos', pol.policyname);
        RAISE NOTICE 'Política eliminada: %', pol.policyname;
    END LOOP;
END $$;

-- PASO 3: Crear política UPDATE nueva y permisiva
CREATE POLICY "admins_can_update_productos"
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
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- PASO 4: Verificar que solo existe la nueva política
SELECT 
  policyname,
  cmd,
  qual AS "condicion_USING",
  with_check AS "condicion_WITH_CHECK"
FROM pg_policies
WHERE tablename = 'productos'
AND cmd = 'UPDATE';
