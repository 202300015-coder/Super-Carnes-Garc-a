-- ==========================================
-- SOLUCIÓN DEFINITIVA - DESHABILITAR RLS COMPLETAMENTE
-- ==========================================
-- Las políticas RLS están bloqueando la lectura de subcategorías
-- Este script desactiva RLS para que TODO funcione

-- 1. Deshabilitar RLS
ALTER TABLE producto_subcategorias DISABLE ROW LEVEL SECURITY;

-- 2. Eliminar TODAS las políticas existentes
DROP POLICY IF EXISTS "Permitir lectura pública de subcategorías" ON producto_subcategorias;
DROP POLICY IF EXISTS "Permitir inserción a usuarios autenticados" ON producto_subcategorias;
DROP POLICY IF EXISTS "Permitir actualización a usuarios autenticados" ON producto_subcategorias;
DROP POLICY IF EXISTS "Permitir eliminación a usuarios autenticados" ON producto_subcategorias;
DROP POLICY IF EXISTS "Solo admins pueden insertar subcategorías" ON producto_subcategorias;
DROP POLICY IF EXISTS "Solo admins pueden actualizar subcategorías" ON producto_subcategorias;
DROP POLICY IF EXISTS "Solo admins pueden eliminar subcategorías" ON producto_subcategorias;

-- 3. Verificar que no queden políticas
SELECT COUNT(*) as politicas_restantes
FROM pg_policies
WHERE tablename = 'producto_subcategorias';

-- Debe mostrar: 0

-- 4. Verificar que RLS está deshabilitado
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'producto_subcategorias';

-- Debe mostrar: rowsecurity = false

-- 5. PRUEBA: Ver TODAS las subcategorías (sin restricciones RLS)
SELECT producto_id, subcategoria
FROM producto_subcategorias
ORDER BY producto_id;

-- Deberías ver TODOS los registros que se insertaron
