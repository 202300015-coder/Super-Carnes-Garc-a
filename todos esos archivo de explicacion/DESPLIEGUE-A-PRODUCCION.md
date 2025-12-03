# 🚀 Guía de Despliegue a Producción

## 📋 Tabla de Contenidos
1. [Base de Datos Supabase](#base-de-datos-supabase)
2. [Configuración de Seguridad](#configuración-de-seguridad)
3. [Despliegue en GitHub Pages](#despliegue-en-github-pages)
4. [Variables de Entorno](#variables-de-entorno)
5. [Checklist Pre-Despliegue](#checklist-pre-despliegue)
6. [Monitoreo Post-Despliegue](#monitoreo-post-despliegue)

---

## 🗄️ Base de Datos Supabase

### ✅ Tu Base de Datos está BIEN
**No necesitas hacer nada especial con Supabase**, ya está en producción:
- ✅ Supabase es un servicio en la nube
- ✅ Tu base de datos ya está en internet
- ✅ Puede ser accedida desde cualquier lugar
- ✅ El plan gratuito incluye 500MB de base de datos

### ⚠️ IMPORTANTE: Protege tus Credenciales

#### 🔴 NUNCA subas esto a GitHub público:
```env
# ❌ NO SUBIR ESTAS CLAVES
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_clave_anon_muy_larga
```

#### ✅ Qué SÍ está bien subir:
- Tu código TypeScript/JavaScript
- Archivos de configuración (package.json, tsconfig.json, etc.)
- Archivos HTML/CSS
- Scripts SQL (si no contienen datos sensibles)

### 🔒 Cómo Proteger tus Claves

**Opción 1: Variables de Entorno (Recomendado para Vercel/Netlify)**
```typescript
// supabaseClient.ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

**Opción 2: GitHub Pages (Tu caso actual)**
- Las claves ANON de Supabase están diseñadas para ser públicas
- Van protegidas por Row Level Security (RLS)
- **PERO** asegúrate de tener RLS activado en TODAS las tablas

---

## 🔐 Configuración de Seguridad

### 1. Row Level Security (RLS)

#### ✅ Verificar que RLS esté activado:
```sql
-- Ejecutar en SQL Editor de Supabase
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

Resultado esperado: **rowsecurity = true** en todas las tablas.

#### 🔧 Si RLS está desactivado, activarlo:
```sql
-- Para cada tabla
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE producto_subcategorias ENABLE ROW LEVEL SECURITY;
```

### 2. Políticas de Seguridad Recomendadas

#### Para tabla `productos`:
```sql
-- Lectura pública (visitantes pueden ver productos activos)
CREATE POLICY "Productos activos son visibles públicamente"
ON productos FOR SELECT
USING (activo = true);

-- Admin puede ver todos
CREATE POLICY "Admin puede ver todos los productos"
ON productos FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);

-- Solo admin puede insertar/actualizar/eliminar
CREATE POLICY "Solo admin puede modificar productos"
ON productos FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);
```

#### Para tabla `user_profiles`:
```sql
-- Usuarios solo pueden leer su propio perfil
CREATE POLICY "Usuarios pueden ver su perfil"
ON user_profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Solo admin puede modificar roles
CREATE POLICY "Solo admin puede modificar perfiles"
ON user_profiles FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);
```

### 3. Configuración de Storage (Imágenes)

```sql
-- Lectura pública de imágenes
CREATE POLICY "Imágenes públicas"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Solo admin puede subir imágenes
CREATE POLICY "Solo admin puede subir imágenes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);
```

---

## 🌐 Despliegue en GitHub Pages

### Configuración Actual (Ya está funcionando)

Tu proyecto ya está configurado para GitHub Pages con:
- ✅ Base path: `/Super-Carnes-Garc-a/`
- ✅ Archivo `vite.config.ts` configurado
- ✅ GitHub Actions workflow

### Comandos de Despliegue

```bash
# 1. Compilar para producción
npm run build

# 2. Hacer commit de los cambios
git add .
git commit -m "Actualización de producción"

# 3. Subir a GitHub
git push origin main

# 4. GitHub Actions desplegará automáticamente
```

### URL de Producción
```
https://202300015-coder.github.io/Super-Carnes-Garc-a/
```

---

## 🔑 Variables de Entorno

### Archivo `.env.local` (NO SUBIR A GIT)
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...tu_clave_muy_larga
```

### Archivo `.gitignore` (Verificar que incluya)
```
node_modules
dist
.env
.env.local
.env.production
```

### ⚠️ Situación Actual
Tu archivo `supabaseClient.ts` probablemente tiene las claves hardcodeadas:
```typescript
const supabaseUrl = 'https://...'  // ← Hardcoded
const supabaseAnonKey = 'eyJhbGc...'  // ← Hardcoded
```

**Esto es aceptable SOLO porque:**
1. Es la clave ANON (pública)
2. Tienes RLS activado
3. No es la clave SERVICE (privada)

---

## ✅ Checklist Pre-Despliegue

### Seguridad de Base de Datos
- [ ] RLS activado en todas las tablas
- [ ] Políticas de seguridad configuradas
- [ ] Clave SERVICE_ROLE no está en el código
- [ ] Solo usuarios admin pueden modificar productos
- [ ] Visitantes solo ven productos activos

### Configuración del Proyecto
- [ ] `npm run build` funciona sin errores
- [ ] `.gitignore` incluye archivos sensibles
- [ ] URL base correcta en `vite.config.ts`
- [ ] No hay console.logs innecesarios
- [ ] Imágenes optimizadas (< 500KB cada una)

### Funcionalidad
- [ ] Login/Registro funciona
- [ ] Visitantes pueden ver productos
- [ ] Admin puede agregar/editar productos
- [ ] Búsqueda funciona correctamente
- [ ] Paginación funciona
- [ ] Filtros por categoría funcionan
- [ ] Modo oscuro funciona
- [ ] Responsive en móvil

### Performance
- [ ] Imágenes en formato WebP o comprimidas
- [ ] Sin consultas innecesarias a la BD
- [ ] Lazy loading de imágenes
- [ ] CSS/JS minificados (automático con Vite)

---

## 📊 Monitoreo Post-Despliegue

### Dashboard de Supabase
Revisa regularmente:
1. **Database → Table Editor**: Verifica datos
2. **Authentication → Users**: Monitorea usuarios
3. **Storage**: Revisa uso de espacio
4. **Logs**: Busca errores

### Límites del Plan Gratuito
- ✅ 500 MB de base de datos
- ✅ 1 GB de almacenamiento de archivos
- ✅ 50,000 usuarios activos mensuales
- ✅ 2 GB de transferencia

### Señales de Alerta 🚨
- Usuarios no autorizados modificando datos
- Aumento drástico en uso de BD
- Errores 403 (problemas de RLS)
- Errores 401 (problemas de autenticación)

---

## 🆘 Solución de Problemas Comunes

### "No puedo ver productos en producción"
```sql
-- Verificar que productos estén activos
SELECT id, nombre, activo FROM productos;

-- Activar productos
UPDATE productos SET activo = true WHERE activo = false;
```

### "Error 403 al intentar modificar productos"
- Verifica que tu usuario tenga rol 'admin'
```sql
SELECT * FROM user_profiles WHERE id = 'tu-user-id';
UPDATE user_profiles SET role = 'admin' WHERE id = 'tu-user-id';
```

### "Las imágenes no cargan"
- Verifica la URL del bucket
- Asegúrate que el bucket sea público
- Revisa las políticas de Storage

---

## 📱 Consideraciones Adicionales

### SEO y Meta Tags
Agrega a tu `index.html`:
```html
<meta name="description" content="Super Carnes García - Los mejores cortes de carne">
<meta property="og:title" content="Super Carnes García">
<meta property="og:description" content="Cortes premium de carne">
<meta property="og:image" content="URL_de_tu_logo">
```

### Performance
```javascript
// Lazy loading de imágenes
<img loading="lazy" src="..." alt="...">
```

### Analytics (Opcional)
Considera agregar Google Analytics para monitorear visitas.

---

## 🎯 Resumen Ejecutivo

### ✅ LO QUE ESTÁ BIEN
1. Tu base de datos Supabase ya está en producción
2. GitHub Pages deployará tu código automáticamente
3. El plan gratuito es suficiente para empezar

### ⚠️ LO QUE DEBES VERIFICAR
1. **RLS activado** en todas las tablas
2. **Políticas de seguridad** configuradas
3. **No subir claves privadas** a GitHub

### 🚀 PASOS PARA DESPLEGAR
1. Verifica RLS en Supabase
2. `npm run build`
3. `git add . && git commit -m "Deploy" && git push`
4. Espera 2-5 minutos
5. Visita: `https://202300015-coder.github.io/Super-Carnes-Garc-a/`

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Supabase Dashboard
2. Inspecciona la consola del navegador (F12)
3. Verifica el estado del deployment en GitHub Actions

**¡Tu proyecto está listo para producción!** 🎉
