-- ============================================
-- ARREGLAR ROL DE ADMINISTRADOR
-- ============================================
-- El usuario admin@supercarnes.com tiene role='user' 
-- cuando debería tener role='admin'

-- PASO 1: Ver el estado actual
SELECT 
    id,
    email,
    role,
    created_at
FROM public.user_profiles
WHERE email = 'admin@supercarnes.com';

-- PASO 2: Actualizar el rol a 'admin'
UPDATE public.user_profiles 
SET role = 'admin'
WHERE email = 'admin@supercarnes.com';

-- PASO 3: Verificar que se actualizó correctamente
SELECT 
    id,
    email,
    role,
    created_at
FROM public.user_profiles
WHERE email = 'admin@supercarnes.com';

-- Debería mostrar:
-- role = 'admin'

-- ============================================
-- DESPUÉS DE EJECUTAR ESTE SQL:
-- ============================================
-- 1. Cierra sesión en el sitio
-- 2. Inicia sesión de nuevo con admin@supercarnes.com
-- 3. Ahora DEBERÍAS ver los botones de "Añadir"
