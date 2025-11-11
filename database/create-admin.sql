-- ============================================
-- CREAR USUARIO ADMINISTRADOR
-- ============================================
-- IMPORTANTE: Este script NO se ejecuta en SQL Editor
-- Sigue las instrucciones de creación manual abajo

-- ============================================
-- OPCIÓN 1: CREAR ADMIN DESDE SUPABASE DASHBOARD (RECOMENDADO)
-- ============================================

/*
1. Ve a Authentication → Users en el Dashboard
2. Click en "Add user" → "Create new user"
3. Configura:
   - Email: admin@supercarnes.com
   - Password: Admin2025$uper (guárdala en un lugar seguro)
   - Auto Confirm User: ✅ ACTIVADO (importante)
   - User Metadata: Agregar campo
     * Key: role
     * Value: admin
4. Click "Create user"
5. El trigger automáticamente creará el perfil con rol admin
*/

-- ============================================
-- OPCIÓN 2: ASIGNAR ROL ADMIN A USUARIO EXISTENTE
-- ============================================

-- Si ya tienes un usuario y quieres hacerlo admin:
-- 1. Ve a Authentication → Users
-- 2. Copia el UUID del usuario
-- 3. Ejecuta este query (reemplaza el UUID):

/*
UPDATE public.user_profiles 
SET role = 'admin'
WHERE email = 'TU_EMAIL_AQUI@example.com';
*/

-- ============================================
-- VERIFICAR USUARIOS ADMIN
-- ============================================

-- Ejecuta este query para ver todos los usuarios y sus roles:
SELECT 
    up.id,
    up.email,
    up.full_name,
    up.role,
    up.created_at,
    au.email_confirmed_at,
    au.last_sign_in_at
FROM public.user_profiles up
LEFT JOIN auth.users au ON up.id = au.id
ORDER BY up.created_at DESC;

-- Ver solo admins:
SELECT * FROM public.user_profiles WHERE role = 'admin';

-- ============================================
-- CREDENCIALES DEL ADMINISTRADOR
-- ============================================
/*
Email: admin@supercarnes.com
Password: Admin2025$uper

⚠️ IMPORTANTE: Cambia esta contraseña después del primer login
*/

-- ============================================
-- NOTAS DE SEGURIDAD
-- ============================================
/*
1. NO compartas estas credenciales
2. Usa un password manager
3. Cambia la contraseña regularmente
4. Habilita 2FA en Supabase Dashboard cuando sea posible
5. Nunca subas este archivo a un repositorio público
*/
