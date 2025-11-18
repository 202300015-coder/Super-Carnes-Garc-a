# 🔐 Sistema de Acceso - Super Carnes García

## 👥 Tipos de Usuario

### 1. 👤 VISITANTE (Por defecto)

**¿Cómo accede?**
- Simplemente abre la página web
- **NO necesita registrarse**
- **NO necesita iniciar sesión**

**¿Qué puede hacer?**
- ✅ Ver todos los productos activos
- ✅ Ver ofertas
- ✅ Buscar productos por nombre
- ✅ Filtrar por categorías (Carnes, Productos, Ofertas)
- ✅ Filtrar por subcategorías (Premium, Res, Cerdo, etc.)
- ✅ Navegar entre páginas
- ✅ Cambiar tema oscuro/claro

**¿Qué NO puede hacer?**
- ❌ Ver productos inactivos
- ❌ Añadir productos
- ❌ Editar productos
- ❌ Eliminar productos
- ❌ Cambiar orden de productos (drag & drop)
- ❌ Ver botones de administración

---

### 2. 👨‍💼 ADMINISTRADOR (Único)

**¿Cómo accede?**

#### Método 1: Doble Click en el Logo (RECOMENDADO)
1. Hacer **doble click rápido** en el logo "Super Carnes García"
2. Se abre modal de login
3. Ingresar credenciales de admin:
   - **Email:** `admin@supercarnes.com`
   - **Contraseña:** (tu contraseña)

#### Método 2: URL Directa
1. Ir a: `localhost:5173/#auth` (o tu dominio en producción)
2. Ingresar credenciales

**¿Qué puede hacer?**
- ✅ **Todo lo que puede un visitante** +
- ✅ Ver productos inactivos (semi-transparentes)
- ✅ Añadir nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Activar/Desactivar productos
- ✅ Reordenar productos (drag & drop)
- ✅ Subir imágenes
- ✅ Cambiar subcategorías
- ✅ Gestionar descuentos

---

## 🎯 Flujo de Usuario

### Para Visitantes
```
1. Abrir navegador
2. Ir a: localhost:5173 (o tu dominio)
3. Ya está dentro ✅
4. Explorar productos libremente
```

### Para Admin
```
1. Abrir sitio web (como visitante)
2. Doble click rápido en "Super Carnes García"
3. Aparece modal de login
4. Ingresar email y contraseña
5. Click en "Iniciar Sesión"
6. Ahora ves botones admin ✅
```

---

## 🔒 Seguridad

### Visitantes
- No tienen acceso a base de datos
- Solo pueden LEER productos activos
- No pueden modificar nada
- Sin registro = sin datos personales almacenados

### Admin
- **Solo 1 cuenta de administrador**
- Requiere email y contraseña
- Sesión guardada en localStorage
- Puede cerrar sesión en cualquier momento
- Al cerrar sesión, vuelve a modo visitante

---

## 🎨 Diferencias Visuales

### Como Visitante:
```
┌─────────────────────────────┐
│ Super Carnes García  [🌙][☰] │
├─────────────────────────────┤
│ [Producto 1]  [Producto 2]   │
│                              │
│ No hay botones de edición    │
└─────────────────────────────┘
```

### Como Admin:
```
┌─────────────────────────────┐
│ Super Carnes García  [🌙][admin@...][☰] │
├─────────────────────────────┤
│ [+ Añadir]                   │
│                              │
│ [Producto 1] [✏️ Editar] [🗑️] │
│ [Producto 2] [✏️ Editar] [🗑️] │
│                              │
│ [👁️ Activar/Desactivar]      │
│ [🖱️ Arrastrar para ordenar]  │
└─────────────────────────────┘
```

---

## 💡 Acceso Secreto del Admin

**¿Por qué doble click?**
- Los visitantes no ven botón de login (UI más limpia)
- El admin sabe cómo acceder (doble click en logo)
- Es discreto y no confunde a visitantes
- Alternativa: presionar `Ctrl + Shift + A` (próxima implementación)

**Configuración del doble click:**
```typescript
// En main.ts
logo.addEventListener('click', (e) => {
  clickCount++
  if (clickCount === 2) {
    // Abrir modal de login
  }
})
```

---

## 🚀 Ventajas de Este Sistema

### Para Visitantes:
✅ Acceso instantáneo sin fricciones
✅ No necesitan crear cuenta
✅ No se les pide información personal
✅ Experiencia más rápida y simple
✅ Menos pasos para ver productos

### Para el Negocio:
✅ Menos soporte técnico (no hay cuentas de usuario)
✅ Sin gestión de contraseñas olvidadas
✅ Sin base de datos de usuarios
✅ Más conversiones (menos barreras)
✅ Admin tiene control total

---

## 🔧 Implementación Técnica

### Cambios Realizados:

1. **Eliminado sistema de registro de usuarios**
   - ❌ No hay botón "Registrarse"
   - ❌ No hay formulario de registro
   - ❌ No hay validación de email para usuarios

2. **Eliminado login obligatorio**
   - ✅ La app se carga directamente como visitante
   - ✅ No redirige a página de autenticación
   - ✅ Solo admin necesita login

3. **Acceso secreto para admin**
   - ✅ Doble click en logo abre modal de login
   - ✅ Logo tiene ID: `adminSecretAccess`
   - ✅ Timer de 500ms entre clicks

4. **Filtros de subcategorías removidos de footer**
   - ✅ Solo aparecen arriba de cada página
   - ✅ UI más limpia y organizada

---

## 📝 Credenciales de Admin

**Email:** `admin@supercarnes.com`
**Contraseña:** (configurada en Supabase)

**Para cambiar la contraseña:**
```sql
-- En Supabase SQL Editor
UPDATE auth.users
SET encrypted_password = crypt('NUEVA_CONTRASEÑA', gen_salt('bf'))
WHERE email = 'admin@supercarnes.com';
```

---

## 🐛 Solución de Problemas

### "No veo los botones de admin después de login"
1. Verificar que ingresaste las credenciales correctas
2. Abrir consola del navegador (F12)
3. Buscar mensaje: `✅ Admin autenticado`
4. Si dice `👤 Visitante`, el login falló
5. Intentar cerrar sesión y volver a entrar

### "El doble click no abre el modal"
1. Verificar que estás haciendo click en "Super Carnes García"
2. Los clicks deben ser rápidos (menos de 500ms entre ellos)
3. Si no funciona, ir manualmente a: `/#auth`

### "Los productos no se cargan"
1. Verificar conexión a internet
2. Verificar que Supabase está activo
3. Abrir consola y buscar errores
4. Verificar que `supabaseClient.ts` tiene las credenciales correctas

---

## 🎓 Resumen

### ANTES (Sistema complejo):
```
Visitante → Debe registrarse → Crear cuenta → Confirmar email → Ver productos
Admin → Debe registrarse → Login → Ver panel admin
```

### AHORA (Sistema simple):
```
Visitante → Ver productos ✅
Admin → Doble click en logo → Login → Panel admin ✅
```

---

**Fecha de implementación:** 18 de noviembre de 2025
**Versión:** 2.0.0 (Sistema simplificado)
