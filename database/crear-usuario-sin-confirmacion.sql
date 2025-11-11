-- ============================================
-- CREAR USUARIO SIN CONFIRMACIÓN DE EMAIL
-- ============================================
-- Este script crea usuarios directamente confirmados

-- OPCIÓN 1: Usar el Dashboard (RECOMENDADO)
-- 1. Ve a Authentication → Users
-- 2. Click "Add user" → "Create new user"
-- 3. Completa:
--    Email: test@gmail.com
--    Password: 123456
--    Auto Confirm User: ✅ ACTIVADO ← IMPORTANTE
-- 4. Click "Create user"

-- OPCIÓN 2: Actualizar usuario existente para confirmarlo
UPDATE auth.users 
SET email_confirmed_at = NOW(),
    confirmed_at = NOW()
WHERE email = 'test@gmail.com';

-- Luego crear su perfil:
INSERT INTO public.user_profiles (id, email, full_name, role)
SELECT 
    id, 
    email, 
    'Usuario Test', 
    'user'
FROM auth.users 
WHERE email = 'test@gmail.com'
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- VERIFICAR QUE FUNCIONÓ
-- ============================================

-- Ver usuario confirmado:
SELECT 
    id,
    email,
    email_confirmed_at,
    confirmed_at,
    created_at
FROM auth.users 
WHERE email = 'test@gmail.com';

-- Ver perfil creado:
SELECT * FROM public.user_profiles 
WHERE email = 'test@gmail.com';

-- ============================================
-- PARA CREAR MÁS USUARIOS DE PRUEBA
-- ============================================

-- Usuario 1: test@gmail.com (ya creado arriba)

-- Usuario 2: usuario@example.com
-- (Ejecutar desde Dashboard con "Auto Confirm User" activado)
