-- ==========================================
-- DIAGNÓSTICO COMPLETO DEL PROBLEMA
-- ==========================================
-- Ejecuta este script en Supabase SQL Editor y copia TODOS los resultados

-- 1. Ver si la tabla existe y su estructura
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'producto_subcategorias'
ORDER BY ordinal_position;

-- 2. Ver TODAS las subcategorías actuales (ver si hay duplicados)
SELECT producto_id, subcategoria, COUNT(*) as cantidad
FROM producto_subcategorias
GROUP BY producto_id, subcategoria
HAVING COUNT(*) > 1
ORDER BY producto_id;

-- 3. Ver políticas RLS actuales
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'producto_subcategorias';

-- 4. Verificar si RLS está habilitado
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'producto_subcategorias';

-- 5. Ver ejemplo de datos (primeros 20 registros)
SELECT *
FROM producto_subcategorias
ORDER BY producto_id
LIMIT 20;

-- 6. Contar total de registros
SELECT COUNT(*) as total_registros
FROM producto_subcategorias;

-- ==========================================
-- DESPUÉS DE VER LOS RESULTADOS, EJECUTA ESTO:
-- ==========================================

-- SOLUCIÓN TEMPORAL: Deshabilitar RLS completamente
ALTER TABLE producto_subcategorias DISABLE ROW LEVEL SECURITY;

-- Eliminar TODAS las políticas
DROP POLICY IF EXISTS "Permitir lectura pública de subcategorías" ON producto_subcategorias;
DROP POLICY IF EXISTS "Permitir inserción a usuarios autenticados" ON producto_subcategorias;
DROP POLICY IF EXISTS "Permitir actualización a usuarios autenticados" ON producto_subcategorias;
DROP POLICY IF EXISTS "Permitir eliminación a usuarios autenticados" ON producto_subcategorias;

-- Verificar que se eliminaron
SELECT COUNT(*) as politicas_restantes
FROM pg_policies
WHERE tablename = 'producto_subcategorias';
