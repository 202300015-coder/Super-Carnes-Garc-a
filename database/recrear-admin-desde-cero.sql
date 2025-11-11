-- ============================================
-- RECREAR ADMIN DESDE CERO
-- ============================================
-- Este script elimina completamente el admin actual
-- y lo vuelve a crear correctamente

-- PASO 1: Eliminar el perfil del admin
DELETE FROM public.user_profiles 
WHERE email = 'admin@supercarnes.com';

-- PASO 2: Eliminar el usuario de auth
DELETE FROM auth.users 
WHERE email = 'admin@supercarnes.com';

-- ============================================
-- AHORA VE AL DASHBOARD Y CREA EL ADMIN:
-- ============================================
-- 1. Authentication → Users
-- 2. Click "Add user" → "Create new user"
-- 3. Email: admin@supercarnes.com
-- 4. Password: Admin2025$uper
-- 5. ✅ Auto Confirm User: ACTIVADO
-- 6. Click "Create user"

-- ============================================
-- DESPUÉS DE CREAR, EJECUTA ESTO:
-- ============================================

-- Actualizar el rol a admin
UPDATE public.user_profiles 
SET role = 'admin'
WHERE email = 'admin@supercarnes.com';

-- Verificar que todo está correcto
SELECT 
    up.id,
    up.email,
    up.role,
    au.email_confirmed_at,
    au.created_at
FROM public.user_profiles up
JOIN auth.users au ON up.id = au.id
WHERE up.email = 'admin@supercarnes.com';

-- Debería mostrar:
-- email: admin@supercarnes.com
-- role: admin
-- email_confirmed_at: (una fecha)
