-- ============================================
-- VERIFICAR Y ARREGLAR EL SISTEMA COMPLETO
-- ============================================

-- PASO 1: Verificar que el trigger existe
SELECT 
    tgname as trigger_name,
    tgenabled as enabled
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

-- PASO 2: Verificar que la función existe
SELECT 
    proname as function_name,
    prosrc as function_code
FROM pg_proc 
WHERE proname = 'handle_new_user';

-- PASO 3: Ver todos los usuarios en auth.users
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users
ORDER BY created_at DESC;

-- PASO 4: Ver todos los perfiles
SELECT 
    id,
    email,
    role,
    created_at
FROM public.user_profiles
ORDER BY created_at DESC;

-- PASO 5: INSERTAR PERFIL MANUALMENTE PARA ADMIN
-- (Ejecutar solo si admin@supercarnes.com NO tiene perfil)

INSERT INTO public.user_profiles (id, email, full_name, role)
SELECT 
    id,
    email,
    'Administrador' as full_name,
    'admin' as role
FROM auth.users
WHERE email = 'admin@supercarnes.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';

-- PASO 6: VERIFICAR QUE QUEDÓ BIEN
SELECT 
    au.id,
    au.email,
    au.email_confirmed_at,
    up.role,
    up.full_name
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.id
WHERE au.email = 'admin@supercarnes.com';

-- Debe mostrar:
-- email: admin@supercarnes.com
-- role: admin
-- email_confirmed_at: (fecha)
