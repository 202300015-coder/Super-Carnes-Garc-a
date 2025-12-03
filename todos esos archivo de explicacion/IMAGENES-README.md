# 📸 Gestión de Imágenes en Super Carnes García

## 🔴 Problema Actual

Las imágenes se suben a **Supabase Storage** (en la nube), no a tu carpeta local. Esto significa que:

- ✅ Las imágenes están disponibles desde cualquier lugar
- ✅ No necesitas copiar archivos manualmente
- ❌ Necesitas configurar permisos en Supabase Storage

## 🔧 Solución Recomendada: Configurar Supabase Storage

### Paso 1: Verificar que el bucket exista

1. Ve a tu panel de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Storage** en el menú lateral
4. Verifica que exista un bucket llamado `productos-imagenes`
5. Si no existe, créalo:
   - Click en "New bucket"
   - Nombre: `productos-imagenes`
   - **Public bucket**: ✅ ACTIVAR (importante!)

### Paso 2: Configurar políticas de acceso público

Ejecuta este SQL en el **SQL Editor** de Supabase:

```sql
-- Permitir subir imágenes a usuarios autenticados
CREATE POLICY "Admins pueden subir imágenes"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'productos-imagenes' AND
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- Permitir a todos ver las imágenes (lectura pública)
CREATE POLICY "Las imágenes son públicas"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'productos-imagenes');

-- Permitir a admins actualizar imágenes
CREATE POLICY "Admins pueden actualizar imágenes"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'productos-imagenes' AND
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- Permitir a admins eliminar imágenes
CREATE POLICY "Admins pueden eliminar imágenes"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'productos-imagenes' AND
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);
```

### Paso 3: Verificar la configuración

```sql
-- Ver si el bucket existe y es público
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets 
WHERE name = 'productos-imagenes';

-- Ver todas las políticas del sistema relacionadas con storage
-- (Las políticas de storage se muestran en la interfaz de Supabase, no en pg_policies)
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
```

**Nota:** Las políticas de Storage se crean correctamente aunque no aparezcan en `pg_policies`. Puedes verificarlas en:
- Supabase Dashboard → Storage → Bucket `productos-imagenes` → Policies

## 📁 Alternativa: Usar Imágenes Locales (NO recomendado)

Si prefieres usar imágenes locales (aunque NO es la mejor práctica):

### Opción A: Copiar manualmente

1. Coloca tus imágenes en: `public/images/productos/`
2. En el formulario, en lugar de subir archivo, escribe la ruta: `/images/productos/nombre-imagen.jpg`
3. Las imágenes estarán disponibles solo en tu máquina local

### Opción B: Base64 (para imágenes pequeñas)

- Las imágenes se guardan como texto en la BD
- ❌ NO recomendado: hace la BD muy pesada
- ❌ Rendimiento muy bajo
- ✅ Solo usar para imágenes muy pequeñas (iconos, etc.)

## 🎯 Recomendación Final

**Usa Supabase Storage** configurando correctamente los permisos. Es:
- ✅ Más profesional
- ✅ Escalable
- ✅ No consume espacio en tu servidor
- ✅ Imágenes disponibles desde cualquier dispositivo
- ✅ CDN integrado (carga rápida)

## 🐛 Troubleshooting

### Error: "Error subiendo imagen"

**Causa:** Bucket no es público o políticas mal configuradas  
**Solución:** Ejecuta los SQL del Paso 2

### Error: "No tienes permisos para actualizar"

**Causa:** RLS bloqueando la actualización  
**Solución:** Ejecuta `verificar-permisos-productos.sql`

### Las imágenes no se muestran

**Causa 1:** URL incorrecta  
**Solución:** Verifica en la consola del navegador la URL generada

**Causa 2:** Bucket no es público  
**Solución:** En Supabase Storage → Click en el bucket → Settings → Marcar "Public bucket"

**Causa 3:** CORS bloqueado  
**Solución:** Normalmente Supabase maneja esto automáticamente, pero si persiste, verifica la configuración de CORS en Storage Settings

## 📊 Estructura Actual

```
Supabase Storage (productos-imagenes/)
├── carnes/
│   ├── 1699999999-abc123.jpg
│   ├── 1699999999-def456.jpg
│   └── ...
├── productos/
│   ├── 1699999999-ghi789.jpg
│   └── ...
└── Premium/
    └── ...
```

Las URLs generadas son del tipo:
```
https://oiqfkymlohsgaatrvzic.supabase.co/storage/v1/object/public/productos-imagenes/carnes/1699999999-abc123.jpg
```

## ✅ Checklist de Configuración

- [ ] Bucket `productos-imagenes` creado
- [ ] Bucket marcado como **público**
- [ ] Políticas de Storage creadas (SQL ejecutado)
- [ ] Políticas de tabla `productos` configuradas
- [ ] RLS configurado correctamente o deshabilitado temporalmente
- [ ] Probado subir una imagen de prueba
- [ ] La imagen se muestra en la tarjeta de producto

---

**Fecha:** 11 de noviembre de 2025  
**Estado:** Configuración pendiente en Supabase
