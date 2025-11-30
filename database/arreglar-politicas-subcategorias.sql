-- ==========================================
-- ARREGLAR POLÍTICAS RLS DE producto_subcategorias
-- ==========================================
-- Este script corrige las políticas RLS que causan el error
-- "permission denied for table users"

-- Paso 1: Eliminar políticas antiguas (si existen)
DROP POLICY IF EXISTS "Permitir lectura pública de subcategorías" ON producto_subcategorias;
DROP POLICY IF EXISTS "Solo admins pueden insertar subcategorías" ON producto_subcategorias;
DROP POLICY IF EXISTS "Solo admins pueden actualizar subcategorías" ON producto_subcategorias;
DROP POLICY IF EXISTS "Solo admins pueden eliminar subcategorías" ON producto_subcategorias;

-- Paso 2: Deshabilitar RLS temporalmente para configurar
ALTER TABLE producto_subcategorias DISABLE ROW LEVEL SECURITY;

-- Paso 3: Crear políticas sin restricción (unrestricted) para admins
-- Política de lectura: todos pueden leer
CREATE POLICY "Permitir lectura pública de subcategorías"
ON producto_subcategorias FOR SELECT
USING (true);

-- Política de inserción: autenticados pueden insertar
CREATE POLICY "Permitir inserción a usuarios autenticados"
ON producto_subcategorias FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política de actualización: autenticados pueden actualizar
CREATE POLICY "Permitir actualización a usuarios autenticados"
ON producto_subcategorias FOR UPDATE
TO authenticated
USING (true);

-- Política de eliminación: autenticados pueden eliminar
CREATE POLICY "Permitir eliminación a usuarios autenticados"
ON producto_subcategorias FOR DELETE
TO authenticated
USING (true);

-- Paso 4: Re-habilitar RLS
ALTER TABLE producto_subcategorias ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- VERIFICACIÓN
-- ==========================================

-- Ver todas las políticas de la tabla
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'producto_subcategorias';

-- Probar inserción (reemplaza 1 con un producto_id válido)
-- INSERT INTO producto_subcategorias (producto_id, subcategoria) 
-- VALUES (1, 'Premium');
