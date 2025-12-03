# 🔐 Sistema de Autenticación Mejorado - Super Carnes García

## 📋 Índice
1. [Características Nuevas](#características-nuevas)
2. [Validaciones en Tiempo Real](#validaciones-en-tiempo-real)
3. [Sistema de Seguridad](#sistema-de-seguridad)
4. [Notificaciones Push](#notificaciones-push)
5. [Ejemplos de Uso](#ejemplos-de-uso)

---

## ✨ Características Nuevas

### 1. **Campo de Nombre de Usuario en Registro**
- Nuevo campo obligatorio al registrarse
- Validación de longitud (3-20 caracteres)
- Solo acepta letras, números y guiones bajos

### 2. **Validación Visual Mejorada**
Cada campo muestra mensajes de error específicos:
- ✅ "El correo no es válido"
- ✅ "La contraseña es demasiado corta"
- ✅ "Este campo es obligatorio"
- ✅ "Las contraseñas no coinciden"
- ✅ "Falta confirmar la contraseña"

### 3. **Diseño de Íconos Minimalista**
- Reemplazo de emojis por iconos SVG profesionales
- Íconos de ojo para mostrar/ocultar contraseña
- Diseño adaptado a modo oscuro

### 4. **Mensajes de Error Claros**
Sistema completo de mensajes amigables:
- "Correo o contraseña incorrectos"
- "Tu cuenta no está verificada"
- "Demasiados intentos. Intenta más tarde"
- "El usuario no existe"
- "El correo ya está registrado"

### 5. **Límite de Intentos de Login**
Sistema de seguridad:
- 5 intentos fallidos → bloqueo de 3 minutos
- Contador de intentos restantes
- Mensaje claro de tiempo de espera

### 6. **Modal de Recuperación de Contraseña**
- Modal independiente para recuperar contraseña
- Validación de email
- Mensaje de confirmación seguro
- Pre-llenado del email si existe

### 7. **Sistema "Recordarme"**
- Checkbox funcional en el login
- Almacenamiento en localStorage
- Mantiene la sesión iniciada

### 8. **Notificaciones Push Automáticas**
Sistema completo de notificaciones:
- Solicitud de permiso al registrarse/iniciar sesión
- Notificación de bienvenida
- Notificaciones predefinidas para ofertas
- API para notificaciones personalizadas

---

## 🔍 Validaciones en Tiempo Real

### Campos validados automáticamente:

**Login:**
- Email (formato válido)
- Contraseña (mínimo 6 caracteres)

**Registro:**
- Nombre de usuario (3-20 caracteres, alfanumérico)
- Email (formato válido)
- Contraseña (mínimo 6 caracteres)
- Confirmar contraseña (coincidencia)

**Recuperación:**
- Email (formato válido)

Las validaciones se ejecutan al salir del campo (evento `blur`)

---

## 🛡️ Sistema de Seguridad

### Límite de Intentos de Login

```typescript
// Configuración actual
MAX_ATTEMPTS = 5
LOCKOUT_DURATION = 3 minutos
```

**Funcionamiento:**
1. Usuario falla login → contador +1
2. Al llegar a 5 intentos → bloqueo de 3 minutos
3. Durante el bloqueo, no se permite intentar login
4. Login exitoso → reseteo automático del contador

**Almacenamiento:**
- Se guarda en localStorage como `loginAttempts`
- Incluye: número de intentos y timestamp de desbloqueo

### Recordarme

```typescript
// Almacenamiento en localStorage
rememberMe: boolean
```

**Funcionalidad:**
- Checkbox en formulario de login
- Al marcar, guarda preferencia en localStorage
- Mantiene sesión activa entre recargas
- Se respeta hasta que el usuario cierre sesión manualmente

---

## 📢 Notificaciones Push

### Características

✅ Solicitud automática de permiso al registrarse
✅ Notificación de bienvenida
✅ Funciones predefinidas para diferentes tipos
✅ Compatible con Service Workers
✅ Auto-cierre después de 5 segundos

### API de Notificaciones

Importar el servicio:
```typescript
import { notificationService } from './lib/notificationService'
```

### Métodos Disponibles

#### 1. Verificar soporte
```typescript
notificationService.isSupported()
// Retorna: boolean
```

#### 2. Solicitar permiso
```typescript
await notificationService.requestPermission()
// Retorna: Promise<boolean>
```

#### 3. Enviar notificación personalizada
```typescript
notificationService.send({
  title: '¡Título!',
  body: 'Mensaje de la notificación',
  tag: 'mi-tag',
  icon: '/images/custom-icon.png'
})
```

### Notificaciones Predefinidas

#### Nueva Oferta
```typescript
notificationService.sendNewOfferNotification('Picaña Premium', 30)
// Muestra: "🔥 ¡Nueva Oferta! Picaña Premium ahora con 30% de descuento"
```

#### Nuevo Producto
```typescript
notificationService.sendNewProductNotification('Chorizo Artesanal')
// Muestra: "✨ Nuevo Producto - Chorizo Artesanal ya está disponible"
```

#### Carne Fresca
```typescript
notificationService.sendFreshMeatNotification()
// Muestra: "🥩 Carne Recién Surtida - ¡Acabamos de recibir carne fresca!"
```

#### Promoción Flash
```typescript
notificationService.sendFlashPromoNotification('2 horas')
// Muestra: "⚡ Promoción Flash - Ofertas especiales por las próximas 2 horas"
```

#### Notificación Personalizada
```typescript
notificationService.sendCustomNotification(
  '🎉 Aniversario',
  '¡Celebramos 10 años con descuentos del 50%!'
)
```

---

## 💡 Ejemplos de Uso

### Uso desde la Consola del Navegador

```javascript
// 1. Verificar si las notificaciones están soportadas
notificationService.isSupported()

// 2. Solicitar permiso (si aún no se ha hecho)
await notificationService.requestPermission()

// 3. Enviar notificación de prueba
notificationService.sendCustomNotification(
  'Prueba',
  'Esta es una notificación de prueba'
)

// 4. Notificar nueva oferta
notificationService.sendNewOfferNotification('Arrachera Premium', 40)

// 5. Notificar carne fresca
notificationService.sendFreshMeatNotification()
```

### Integración con el Sistema de Productos

Cuando un admin agrega un producto con descuento:

```typescript
// En setupAddProductModal.ts o similar
if (descuento > 0) {
  notificationService.sendNewOfferNotification(nombre, descuento)
}
```

### Integración con Actualizaciones de Stock

```typescript
// Cuando llega mercancía nueva
function onNewStockArrival() {
  notificationService.sendFreshMeatNotification()
}
```

---

## 🔧 Archivos Modificados/Creados

### Nuevos Archivos
1. `src/components/auth/authHelpers.ts` - Funciones de validación y helpers
2. `src/lib/notificationService.ts` - Servicio de notificaciones

### Archivos Modificados
1. `src/components/ui/LoginModal.ts` - Modal mejorado con todos los campos
2. `src/components/auth/setupAuth.ts` - Lógica completa de autenticación

---

## 🎯 Próximos Pasos Recomendados

### 1. Guardar Nombre de Usuario
Actualmente el nombre de usuario se valida pero no se guarda. Para guardarlo:

```typescript
// En setupAuth.ts, al registrar
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      username: username  // Agregar metadata
    }
  }
})
```

### 2. Implementar Service Worker
Para notificaciones en segundo plano:

```javascript
// public/service-worker.js
self.addEventListener('push', function(event) {
  const data = event.data.json()
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/images/logo.png'
  })
})
```

### 3. Firebase Cloud Messaging (Opcional)
Para notificaciones push reales desde el servidor:

1. Crear proyecto en Firebase Console
2. Instalar Firebase SDK
3. Obtener token de FCM
4. Guardar token en base de datos
5. Enviar notificaciones desde el backend

---

## 📱 Compatibilidad

**Navegadores soportados:**
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & iOS 16.4+)
- ❌ Internet Explorer (no soportado)

**Notas:**
- Las notificaciones push requieren HTTPS (excepto en localhost)
- iOS requiere añadir el sitio a la pantalla de inicio para notificaciones
- Algunos navegadores pueden bloquear notificaciones por defecto

---

## 🐛 Solución de Problemas

### "No puedo ver las notificaciones"
1. Verificar permisos del navegador en Configuración
2. Asegurarse de estar en HTTPS
3. Revisar la consola por errores

### "El límite de intentos no funciona"
1. Verificar que localStorage esté habilitado
2. Limpiar localStorage: `localStorage.clear()`
3. Intentar en modo incógnito

### "Las validaciones no aparecen"
1. Verificar que los IDs de los elementos coincidan
2. Revisar la consola por errores de JavaScript
3. Limpiar caché del navegador

---

## 📞 Contacto

Para soporte o preguntas:
- 📧 Email: admin@supercarnesgarcia.com
- 💬 GitHub Issues

---

**Última actualización:** 24 de noviembre de 2025
