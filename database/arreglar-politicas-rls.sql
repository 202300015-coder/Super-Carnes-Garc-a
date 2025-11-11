-- ============================================
-- ARREGLAR POLÍTICAS RLS DE USER_PROFILES
-- ============================================
-- El problema: usuarios no pueden leer su propio perfil
-- Error 500 al hacer SELECT en user_profiles

-- PASO 1: Eliminar políticas existentes que puedan estar causando conflicto
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable read access for users" ON public.user_profiles;

-- PASO 2: Crear política correcta para LECTURA
CREATE POLICY "Users can read their own profile"
ON public.user_profiles
FOR SELECT
USING (auth.uid() = id);

-- PASO 3: Política para que admins puedan ver todos los perfiles
CREATE POLICY "Admins can read all profiles"
ON public.user_profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- PASO 4: Política para INSERT (cuando se crea el usuario)
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_profiles;
CREATE POLICY "Users can insert their own profile"
ON public.user_profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- PASO 5: Política para UPDATE (solo su propio perfil)
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update their own profile"
ON public.user_profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- PASO 6: Verificar que RLS está habilitado
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- PASO 7: Ver todas las políticas activas
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'user_profiles';

-- PASO 8: Probar que funciona (ejecutar como usuario admin)
SELECT * FROM public.user_profiles WHERE id = auth.uid();
