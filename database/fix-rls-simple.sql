-- ============================================
-- ARREGLAR RECURSIÓN INFINITA EN RLS
-- ============================================

-- PASO 1: Eliminar TODAS las políticas de user_profiles
DROP POLICY IF EXISTS "Users can read their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;

-- PASO 2: Crear UNA SOLA política simple para SELECT
-- Todos los usuarios autenticados pueden leer SU PROPIO perfil
CREATE POLICY "allow_select_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- PASO 3: Política para INSERT (trigger automático)
CREATE POLICY "allow_insert_own_profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- PASO 4: Asegurar que RLS está habilitado
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- PASO 5: Verificar políticas
SELECT 
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'user_profiles';
