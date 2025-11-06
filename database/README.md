# 🗄️ CONFIGURACIÓN DE LA BASE DE DATOS - SUPER CARNES GARCÍA

## 📋 PASOS A SEGUIR (en orden)

### 1️⃣ Crear la Tabla de Productos
1. Abre Supabase Dashboard: https://supabase.com/dashboard
2. Selecciona tu proyecto: **202300015-coder's Project**
3. Ve a **SQL Editor** (icono </> en el menú lateral)
4. Click en **"New query"**
5. Copia TODO el contenido de `database/setup.sql`
6. Pégalo en el editor SQL
7. Click en **"Run"** (botón verde abajo a la derecha)
8. Verifica el resultado: deberías ver "Query executed successfully" y un conteo de productos

### 2️⃣ Crear el Bucket de Storage
1. En el Dashboard, ve a **Storage** (icono 🗃️ en el menú lateral)
2. Click en **"New bucket"**
3. Configura:
   - **Name:** `productos-imagenes`
   - **Public bucket:** ❌ NO (desactivado)
   - **File size limit:** `5 MB`
   - **Allowed MIME types:** `image/jpeg,image/jpg,image/png,image/webp`
4. Click en **"Create bucket"**

### 3️⃣ Configurar Políticas de Storage
1. Regresa a **SQL Editor**
2. Click en **"New query"**
3. Copia TODO el contenido de `database/storage-setup.sql`
4. Pégalo y click en **"Run"**

### 4️⃣ Verificar que Todo Funciona
1. Ve a **Table Editor** (icono tabla en el menú lateral)
2. Selecciona la tabla **productos**
3. Deberías ver 10 productos de prueba listados
4. Ve a **Storage** → **productos-imagenes** (debería estar vacío por ahora)

---

## ✅ CHECKLIST DE VERIFICACIÓN

- [ ] Tabla `productos` creada con 10 registros de prueba
- [ ] Índices creados (idx_productos_categoria, idx_productos_activo, etc.)
- [ ] RLS habilitado en la tabla productos
- [ ] 4 políticas de seguridad activas en productos
- [ ] Bucket `productos-imagenes` creado
- [ ] 4 políticas de storage configuradas

---

## 🔧 SIGUIENTE PASO

Una vez completados estos pasos, ejecuta:

```bash
npm run dev
```

Y abre http://localhost:5173/Super-Carnes-Garc-a/ para ver tu sitio.

Los productos ahora se cargarán desde Supabase en lugar de los mocks.

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "relation productos does not exist"
- Asegúrate de haber ejecutado `database/setup.sql` correctamente

### Error: "permission denied for table productos"
- Verifica que las políticas RLS estén activas
- Ve a Authentication → Policies → productos

### Las imágenes no se suben
- Verifica que el bucket `productos-imagenes` existe
- Ejecuta `database/storage-setup.sql` para crear las políticas
