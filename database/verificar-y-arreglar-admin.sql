-- ⚠️ DIAGNÓSTICO Y SOLUCIÓN: Verificar y crear usuario admin en user_profiles
-- Ejecutar en el SQL Editor de Supabase

-- PASO 1: Ver el usuario autenticado actual
SELECT 
  id,
  email,
  created_at
FROM auth.users
WHERE email = 'tu-email@ejemplo.com';  -- ⚠️ CAMBIA ESTO POR TU EMAIL REAL

-- PASO 2: Ver si existe en user_profiles
SELECT 
  id,
  email,
  role,
  created_at
FROM user_profiles
WHERE email = 'tu-email@ejemplo.com';  -- ⚠️ CAMBIA ESTO POR TU EMAIL REAL

-- PASO 3: Si NO aparece en user_profiles, crearlo como admin
-- ⚠️ REEMPLAZA 'UUID-DEL-PASO-1' con el id que obtuviste en el PASO 1
INSERT INTO user_profiles (id, email, role)
VALUES (
  'UUID-DEL-PASO-1',  -- ⚠️ CAMBIA ESTO
  'tu-email@ejemplo.com',  -- ⚠️ CAMBIA ESTO
  'admin'
)
ON CONFLICT (id) 
DO UPDATE SET role = 'admin';

-- PASO 4: Verificar que ahora sí existe como admin
SELECT 
  id,
  email,
  role,
  created_at
FROM user_profiles
WHERE role = 'admin';

-- PASO 5: Probar que la política RLS funciona
-- Esto debería devolver TRUE si eres admin
SELECT EXISTS (
  SELECT 1 FROM user_profiles
  WHERE user_profiles.id = auth.uid()
  AND user_profiles.role = 'admin'
) AS "soy_admin";
