# Configuración de Supabase para Permitir Registro Sin Confirmación de Email

## ⚠️ PROBLEMA ACTUAL
El sistema rechaza emails válidos con el mensaje "Email address is invalid" porque Supabase requiere confirmación por email por defecto.

## ✅ SOLUCIÓN: Desactivar Confirmación de Email

### Opción 1: Desde el Dashboard de Supabase (RECOMENDADO)

1. **Ve a tu proyecto en Supabase**
   - URL: https://supabase.com/dashboard/project/oiqfkymlohsgaatrvzic

2. **Navega a Authentication → Settings**
   - Click en "Authentication" en el menú lateral
   - Click en "Settings" o "Email" según la versión

3. **Desactiva "Enable email confirmations"**
   - Busca la sección "Email Auth"
   - Desactiva el switch "Enable email confirmations"
   - **O** cambia "Confirm email" a OFF

4. **Guarda los cambios**
   - Click en "Save"

### Opción 2: Configuración Alternativa

Si no encuentras la opción exacta, busca:

**Authentication → Providers → Email**
- Desactiva "Confirm email"
- O activa "Auto Confirm"

**Authentication → Settings**
- Busca "Email confirmations"
- Cambia a "Disabled"

---

## 🧪 Probar el Registro

Después de desactivar la confirmación de email:

1. **Recarga la página** del sitio (F5)
2. **Intenta crear una cuenta** con:
   - Nombre: `Usuario Test`
   - Email: `test@gmail.com` (o cualquier email)
   - Contraseña: `123456`

3. **Debería funcionar inmediatamente** sin necesidad de confirmar email

---

## 📋 Verificar en la Base de Datos

Si todo funciona correctamente, verás:

### En Authentication → Users
- El usuario creado aparecerá con `email_confirmed_at` con fecha automática

### En Table Editor → user_profiles
```sql
SELECT * FROM public.user_profiles;
```
- Deberías ver el nuevo usuario con `role = 'user'`

---

## 🔧 Si Aún Tienes Problemas

### Verificar que el trigger funciona:

```sql
-- Ver si el trigger existe
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Ver si la función existe
SELECT proname FROM pg_proc WHERE proname = 'handle_new_user';
```

### Crear usuario manualmente (temporal):

```sql
-- Opción 1: Crear desde Authentication UI
-- Ve a Authentication → Users → Add user
-- Auto Confirm User: ✅ ACTIVADO

-- Opción 2: Insertar perfil manualmente
INSERT INTO public.user_profiles (id, email, full_name, role)
VALUES (
  'UUID_DEL_USUARIO', -- Copiar de auth.users
  'test@gmail.com',
  'Usuario Test',
  'user'
);
```

---

## 📝 Notas Importantes

1. **Desarrollo vs Producción**
   - Para desarrollo: Desactiva confirmación de email
   - Para producción: Actívala de nuevo para seguridad

2. **Usuarios Existentes**
   - Si creaste usuarios antes de desactivar la confirmación
   - Necesitarás confirmarlos manualmente o eliminarlos y recrearlos

3. **Security Warning**
   - Sin confirmación de email, cualquiera puede registrarse
   - Para producción, considera usar:
     - Rate limiting
     - CAPTCHA
     - Confirmación de email activada

---

## 🎯 Resultado Esperado

Después de aplicar esta configuración:

✅ Los usuarios pueden registrarse con cualquier email válido  
✅ No necesitan confirmar el email  
✅ Se crean automáticamente en `user_profiles` con role='user'  
✅ Pueden hacer login inmediatamente  
✅ El sistema funciona completamente  

---

## 🆘 Si Nada Funciona

Contacta al soporte de Supabase o:

1. Crea un nuevo proyecto de Supabase
2. Copia las nuevas API keys
3. Vuelve a ejecutar los scripts SQL
4. Actualiza `.env.local` con las nuevas keys
