-- ============================================
-- CONFIGURACIÓN DE STORAGE PARA IMÁGENES DE PRODUCTOS
-- ============================================
-- Ejecuta este script en el SQL Editor de Supabase DESPUÉS de crear el bucket
-- Dashboard → Storage → Create bucket → nombre: "productos-imagenes" → público: NO

-- 1. CREAR POLÍTICAS DE STORAGE
-- ============================================

-- Permitir lectura pública de imágenes
CREATE POLICY "Lectura pública de imágenes de productos"
ON storage.objects FOR SELECT
USING (bucket_id = 'productos-imagenes');

-- Solo usuarios autenticados pueden subir imágenes
CREATE POLICY "Usuarios autenticados pueden subir imágenes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'productos-imagenes');

-- Solo usuarios autenticados pueden actualizar sus imágenes
CREATE POLICY "Usuarios autenticados pueden actualizar imágenes"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'productos-imagenes');

-- Solo usuarios autenticados pueden eliminar imágenes
CREATE POLICY "Usuarios autenticados pueden eliminar imágenes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'productos-imagenes');

-- ============================================
-- INSTRUCCIONES PARA CREAR EL BUCKET MANUALMENTE:
-- ============================================
-- 1. Ve a Dashboard → Storage
-- 2. Click en "New bucket"
-- 3. Nombre: productos-imagenes
-- 4. Público: NO (desactivado) - usaremos políticas RLS
-- 5. File size limit: 5 MB (ajusta según necesites)
-- 6. Allowed MIME types: image/jpeg, image/jpg, image/png, image/webp
-- 7. Click "Create bucket"
-- 8. Ejecuta este script SQL para agregar las políticas

-- Verifica que las políticas se crearon:
SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%productos-imagenes%';
