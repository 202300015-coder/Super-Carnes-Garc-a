-- ⚠️ SOLUCIÓN DEFINITIVA: Deshabilitar RLS para desarrollo
-- Esto permite a usuarios autenticados modificar productos sin restricciones RLS

-- Ver estado actual de RLS
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'productos';

-- DESHABILITAR RLS completamente
ALTER TABLE productos DISABLE ROW LEVEL SECURITY;

-- Verificar que RLS está deshabilitado
SELECT 
  tablename, 
  rowsecurity AS "RLS_habilitado_debe_ser_false"
FROM pg_tables 
WHERE tablename = 'productos';

-- Probar UPDATE nuevamente
UPDATE productos
SET activo = false
WHERE id = 5
RETURNING id, nombre, activo;

-- ========================================================================
-- NOTA: Si más adelante quieres rehabilitar RLS, ejecuta:
-- ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
-- Y asegúrate de tener políticas correctas para SELECT, INSERT, UPDATE, DELETE
-- ========================================================================
