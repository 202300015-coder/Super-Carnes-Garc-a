# 🔧 Configuración de Supabase para Recuperación de Contraseña

## 📋 Lista de Verificación Rápida

- [ ] Configurar Site URL
- [ ] Agregar Redirect URLs
- [ ] Verificar plantilla de email (opcional)
- [ ] Probar el flujo completo

---

## 🚀 Pasos de Configuración

### 1️⃣ Acceder al Dashboard de Supabase

1. Ve a https://supabase.com
2. Inicia sesión
3. Selecciona tu proyecto **Super Carnes García**

---

### 2️⃣ Configurar URLs (CRÍTICO)

#### Navegación:
```
Authentication → URL Configuration
```

#### Site URL

**Para desarrollo local:**
```
http://localhost:5173
```

**Para producción (GitHub Pages):**
```
https://202300015-coder.github.io
```

⚠️ **Importante:** Cambia esto cuando despliegues a producción

---

#### Redirect URLs

Haz click en **"Add URL"** y agrega las siguientes URLs **UNA POR UNA**:

**Desarrollo:**
```
http://localhost:5173/Super-Carnes-Garc-a/#reset-password
http://localhost:3000/#reset-password
http://localhost:5173/#reset-password
```

**Producción:**
```
https://202300015-coder.github.io/Super-Carnes-Garc-a/#reset-password
```

#### Vista de ejemplo:
```
┌──────────────────────────────────────────────────────────────────┐
│ Site URL                                                         │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ http://localhost:5173                                      │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                [Save changes]    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ Redirect URLs                                     [Add URL]      │
│                                                                   │
│ ✓ http://localhost:5173/Super-Carnes-Garc-a/#reset-password    │
│ ✓ https://202300015-coder.github.io/Super-Carnes-Garc-a/#...   │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

### 3️⃣ Guardar Cambios

1. Click en **"Save changes"** (botón verde)
2. Espera la confirmación
3. Los cambios son instantáneos

---

### 4️⃣ Verificar Plantilla de Email (Opcional)

#### Navegación:
```
Authentication → Email Templates → Reset Password
```

#### Plantilla por defecto:
```html
<h2>Reset Password</h2>
<p>Follow this link to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
```

**¿Necesitas personalizarlo?**
- Puedes cambiar el texto
- Agregar tu logo
- Cambiar los colores
- Agregar información adicional

#### Ejemplo personalizado:
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #dc2626;">🔐 Recuperación de Contraseña</h2>
  <p>Hola,</p>
  <p>Recibimos una solicitud para restablecer tu contraseña en Super Carnes García.</p>
  <p style="margin: 30px 0;">
    <a href="{{ .ConfirmationURL }}" 
       style="background: #dc2626; 
              color: white; 
              padding: 12px 24px; 
              text-decoration: none; 
              border-radius: 6px;
              display: inline-block;">
      Restablecer Contraseña
    </a>
  </p>
  <p style="color: #666; font-size: 14px;">
    Si no solicitaste este cambio, ignora este email.
  </p>
  <p style="color: #666; font-size: 14px;">
    Este enlace expira en 24 horas.
  </p>
</div>
```

---

## 🧪 Probar la Configuración

### Paso 1: Verificar el Servidor
```bash
npm run dev
```

Debe mostrar:
```
VITE v4.5.14  ready in 420 ms
➜  Local:   http://localhost:5173/Super-Carnes-Garc-a/
```

### Paso 2: Abrir la Aplicación

Navega a:
```
http://localhost:5173/Super-Carnes-Garc-a/
```

### Paso 3: Solicitar Recuperación

1. Click en **"Iniciar Sesión"** (botón superior derecho)
2. Click en **"¿Olvidaste tu contraseña?"**
3. Ingresa un email registrado
4. Click en **"Enviar enlace"**

✅ Debe mostrar:
```
✓ Si este correo existe, te enviamos un enlace para 
  restablecer tu contraseña.
```

### Paso 4: Revisar Email

1. Abre tu cliente de email
2. Busca el email de Supabase
   - **Remitente:** `noreply@mail.app.supabase.io`
   - **Asunto:** "Reset Password"
3. Haz click en el enlace

### Paso 5: Verificar Redirección

✅ La URL debe ser:
```
http://localhost:5173/Super-Carnes-Garc-a/#reset-password
```

Y **NO**:
```
❌ http://localhost:5173/Super-Carnes-Garc-a/reset-password.html
❌ Error 404
```

### Paso 6: Cambiar Contraseña

1. El modal debe aparecer automáticamente
2. Ingresa nueva contraseña (mínimo 6 caracteres)
3. Confirma la contraseña
4. Click en **"Cambiar Contraseña"**

✅ Debe mostrar:
```
✓ ¡Contraseña actualizada exitosamente!
```

Y recargarse automáticamente.

---

## 🐛 Solución de Problemas

### ❌ Error: "Invalid Redirect URL"

**Causa:** La URL no está en la lista de Redirect URLs

**Solución:**
1. Ve a Supabase Dashboard
2. Authentication → URL Configuration
3. Verifica que la URL exacta esté agregada
4. Asegúrate de incluir el hash `#reset-password`

---

### ❌ Email no llega

**Causas posibles:**
- Email no existe en la BD
- Email en spam
- Rate limit de Supabase

**Solución:**
1. Verifica que el email exista:
   - Dashboard → Authentication → Users
2. Revisa la carpeta de spam
3. Espera 1-2 minutos y reintenta

---

### ❌ Modal no aparece automáticamente

**Causa:** JavaScript no detecta el hash

**Solución:**
1. Abre la consola (F12)
2. Busca: `🔑 Detectado enlace de recuperación de contraseña`
3. Si no aparece, verifica que la URL tenga `#reset-password`
4. Prueba manualmente:
   ```
   http://localhost:5173/Super-Carnes-Garc-a/#reset-password
   ```

---

### ❌ Error al actualizar contraseña

**Mensaje:** "Session not found"

**Causa:** Token expirado o inválido

**Solución:**
1. El enlace expira en 24 horas
2. Solicita un nuevo enlace
3. Úsalo inmediatamente

---

## 📊 Configuración Avanzada

### Rate Limiting

**Navegación:**
```
Authentication → Rate Limits
```

**Recomendado:**
```
Password Recovery: 3 requests per hour
```

Esto previene spam y ataques de fuerza bruta.

---

### Tiempo de Expiración

**Navegación:**
```
Authentication → Settings → Email Auth
```

**Configuración:**
```
Password Recovery Expiry: 86400 (24 horas)
```

**Opciones:**
- `3600` = 1 hora
- `7200` = 2 horas
- `86400` = 24 horas (recomendado)

---

### Email Provider (Opcional)

Por defecto, Supabase usa su propio servicio de email.

**Para usar tu propio servicio (ej: SendGrid, Mailgun):**

1. Ve a: Authentication → Settings → Email Provider
2. Selecciona "Custom SMTP"
3. Configura:
   ```
   Host: smtp.tuservicio.com
   Port: 587
   Username: tu-usuario
   Password: tu-contraseña
   ```

---

## 🔒 Seguridad

### ✅ Buenas Prácticas Implementadas

- ✅ Token de un solo uso
- ✅ Expiración de 24 horas
- ✅ HTTPS en producción
- ✅ No expone si el email existe
- ✅ Rate limiting

### 🛡️ Recomendaciones Adicionales

1. **Habilita 2FA en Supabase Dashboard**
   - Settings → Access Control → Two-Factor Auth

2. **Monitorea intentos sospechosos**
   - Authentication → Audit Logs

3. **Configura alertas**
   - Settings → Integrations → Webhooks

---

## 📝 Checklist Final

Antes de desplegar a producción:

- [ ] Site URL configurada para producción
- [ ] Redirect URLs incluyen la URL de producción
- [ ] Plantilla de email personalizada (opcional)
- [ ] Rate limiting configurado
- [ ] Probado en desarrollo
- [ ] Probado en producción
- [ ] Email de recuperación recibido
- [ ] Modal aparece correctamente
- [ ] Contraseña se actualiza exitosamente

---

## 🚀 Desplegar a Producción

### 1. Actualizar Site URL

```
https://202300015-coder.github.io
```

### 2. Verificar Redirect URLs

```
https://202300015-coder.github.io/Super-Carnes-Garc-a/#reset-password
```

### 3. Hacer Deploy

```bash
git add .
git commit -m "Implementar recuperación de contraseña"
git push origin main
```

### 4. Esperar el Build (~2-3 minutos)

Ve a: https://github.com/202300015-coder/Super-Carnes-Garc-a/actions

### 5. Probar en Producción

1. Abre: https://202300015-coder.github.io/Super-Carnes-Garc-a/
2. Solicita recuperación de contraseña
3. Verifica que el email llegue
4. Confirma que la redirección funcione

---

## 📞 Contacto

Si tienes problemas que no se resuelven con esta guía:

1. Revisa los logs de Supabase
2. Verifica la consola del navegador
3. Prueba en modo incógnito
4. Revisa la documentación oficial: https://supabase.com/docs

---

**✅ ¡Configuración Completa!**

Ahora tu sistema de recuperación de contraseña está listo para producción.

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0.0
