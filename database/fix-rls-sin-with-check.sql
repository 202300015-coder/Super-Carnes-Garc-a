-- ⚠️ SOLUCIÓN ALTERNATIVA: Política UPDATE sin WITH CHECK
-- El problema es que WITH CHECK valida la fila DESPUÉS del update
-- Para admins, no necesitamos validar nada después del update

-- Eliminar política actual
DROP POLICY IF EXISTS "admins_can_update_productos" ON productos;

-- Crear política UPDATE SOLO con USING (sin WITH CHECK)
-- Esto permite al admin actualizar cualquier campo a cualquier valor
CREATE POLICY "admins_update_productos_sin_restriccion"
ON productos
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);
-- ⚠️ NOTA: Al no poner WITH CHECK, Postgres permite actualizar a cualquier valor

-- Verificar la política
SELECT 
  policyname,
  cmd,
  qual AS "condicion_USING",
  with_check AS "condicion_WITH_CHECK"
FROM pg_policies
WHERE tablename = 'productos'
AND cmd = 'UPDATE';
