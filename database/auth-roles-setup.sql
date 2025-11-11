-- ============================================
-- SISTEMA DE ROLES Y PERFILES DE USUARIO
-- ============================================
-- Ejecuta este script DESPUÉS de setup.sql
-- Dashboard → SQL Editor → New Query → Pega y Run

-- 1. CREAR TABLA DE PERFILES DE USUARIO
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. HABILITAR ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS DE SEGURIDAD
-- ============================================

-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Los usuarios pueden ver su propio perfil"
    ON public.user_profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Los usuarios pueden actualizar su propio perfil (excepto el role)
CREATE POLICY "Los usuarios pueden actualizar su perfil"
    ON public.user_profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id 
        AND role = (SELECT role FROM public.user_profiles WHERE id = auth.uid())
    );

-- Solo admins pueden ver todos los perfiles
CREATE POLICY "Los admins pueden ver todos los perfiles"
    ON public.user_profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 4. FUNCIÓN PARA CREAR PERFIL AUTOMÁTICAMENTE AL REGISTRARSE
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. TRIGGER PARA EJECUTAR LA FUNCIÓN
-- ============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- 6. FUNCIÓN PARA VERIFICAR SI UN USUARIO ES ADMIN
-- ============================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. ACTUALIZAR POLÍTICAS DE PRODUCTOS PARA USAR ROLES
-- ============================================

-- Eliminar políticas antiguas
DROP POLICY IF EXISTS "Usuarios autenticados pueden insertar productos" ON public.productos;
DROP POLICY IF EXISTS "Usuarios autenticados pueden actualizar productos" ON public.productos;
DROP POLICY IF EXISTS "Usuarios autenticados pueden eliminar productos" ON public.productos;

-- Nuevas políticas: solo admins pueden modificar
CREATE POLICY "Solo admins pueden insertar productos"
    ON public.productos
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Solo admins pueden actualizar productos"
    ON public.productos
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Solo admins pueden eliminar productos"
    ON public.productos
    FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- 8. ACTUALIZAR POLÍTICAS DE STORAGE
-- ============================================

-- Eliminar políticas antiguas
DROP POLICY IF EXISTS "Usuarios autenticados pueden subir imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Usuarios autenticados pueden actualizar imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Usuarios autenticados pueden eliminar imágenes" ON storage.objects;

-- Nuevas políticas: solo admins pueden subir/modificar imágenes
CREATE POLICY "Solo admins pueden subir imágenes"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'productos-imagenes' 
        AND public.is_admin()
    );

CREATE POLICY "Solo admins pueden actualizar imágenes"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'productos-imagenes' 
        AND public.is_admin()
    );

CREATE POLICY "Solo admins pueden eliminar imágenes"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'productos-imagenes' 
        AND public.is_admin()
    );

-- ============================================
-- CONFIGURACIÓN DE ROLES COMPLETADA ✓
-- ============================================

-- Verifica que todo se creó:
SELECT 
    'Tabla user_profiles creada' AS status,
    COUNT(*) AS total_profiles 
FROM public.user_profiles;

SELECT 
    'Función is_admin() creada' AS status,
    pg_get_functiondef('public.is_admin()'::regprocedure) IS NOT NULL AS exists;
