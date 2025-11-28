# 📐 ESTRUCTURA DE MODALES - MAPA COMPLETO

## 📍 Ubicación del archivo
**Archivo:** `src/components/ui/LoginModal.ts`

---

## 🗺️ MAPA DE LA ESTRUCTURA

```
LoginModal.ts
│
├── 🔵 MODAL PRINCIPAL (Login/Registro) ─────────── Líneas 3-225
│   │
│   ├── 📦 Contenedor del Modal ─────────────────── Línea 4
│   │   └── id="loginModal"
│   │
│   ├── 🎯 Header del Modal ─────────────────────── Líneas 7-18
│   │   ├── Título dinámico (id="loginModalTitle")
│   │   └── Botón cerrar (id="closeLoginModal")
│   │
│   ├── 🚨 Contenedor de Alertas ───────────────── Línea 21
│   │   └── id="authAlert"
│   │
│   ├── 📄 FORMULARIO DE LOGIN ─────────────────── Líneas 25-123
│   │   │   id="loginForm"
│   │   │
│   │   ├── 📧 Campo Email ──────────────────── Líneas 26-40
│   │   │   ├── Input: id="email"
│   │   │   └── Error: id="emailError"
│   │   │
│   │   ├── 🔒 Campo Contraseña ────────────── Líneas 42-73
│   │   │   ├── Input: id="password"
│   │   │   ├── Botón mostrar/ocultar: id="togglePassword"
│   │   │   ├── Icono mostrar: id="passwordIconShow"
│   │   │   ├── Icono ocultar: id="passwordIconHide"
│   │   │   └── Error: id="passwordError"
│   │   │
│   │   ├── ☑️ Opciones adicionales ──────── Líneas 75-93
│   │   │   ├── Checkbox: id="rememberMe"
│   │   │   └── Botón: id="forgotPassword"
│   │   │
│   │   ├── ✅ Botón Submit ─────────────── Líneas 95-106
│   │   │   ├── Botón: id="loginSubmit"
│   │   │   ├── Texto: id="loginBtnText"
│   │   │   └── Spinner: id="loginSpinner"
│   │   │
│   │   └── 🔄 Switch a Registro ─────── Líneas 108-123
│   │       └── Botón: id="switchToRegister"
│   │
│   ├── 📝 FORMULARIO DE REGISTRO ──────────── Líneas 125-219
│   │   │   id="registerForm"
│   │   │   class="hidden" (oculto por defecto)
│   │   │
│   │   ├── 👤 Campo Username ────────────── Líneas 126-137
│   │   │   ├── Input: id="registerUsername"
│   │   │   └── Error: id="usernameError"
│   │   │
│   │   ├── 📧 Campo Email ──────────────── Líneas 139-150
│   │   │   ├── Input: id="registerEmail"
│   │   │   └── Error: id="registerEmailError"
│   │   │
│   │   ├── 🔒 Campo Contraseña ────────── Líneas 152-176
│   │   │   ├── Input: id="registerPassword"
│   │   │   ├── Botón: id="toggleRegisterPassword"
│   │   │   ├── Icono mostrar: id="registerPasswordIconShow"
│   │   │   ├── Icono ocultar: id="registerPasswordIconHide"
│   │   │   └── Error: id="registerPasswordError"
│   │   │
│   │   ├── 🔒 Confirmar Contraseña ────── Líneas 178-202
│   │   │   ├── Input: id="confirmPassword"
│   │   │   ├── Botón: id="toggleConfirmPassword"
│   │   │   ├── Icono mostrar: id="confirmPasswordIconShow"
│   │   │   ├── Icono ocultar: id="confirmPasswordIconHide"
│   │   │   └── Error: id="confirmPasswordError"
│   │   │
│   │   ├── ✅ Botón Submit ─────────────── Líneas 204-213
│   │   │   ├── Botón: id="registerSubmit"
│   │   │   ├── Texto: id="registerBtnText"
│   │   │   └── Spinner: id="registerSpinner"
│   │   │
│   │   └── 🔄 Switch a Login ─────────── Líneas 215-219
│   │       └── Botón: id="switchToLogin"
│   │
│   └── [FIN MODAL PRINCIPAL] ──────────────── Línea 225
│
└── 🟢 MODAL RECUPERAR CONTRASEÑA ───────────── Líneas 227-282
    │
    ├── 📦 Contenedor del Modal ─────────────── Línea 228
    │   └── id="forgotPasswordModal"
    │
    ├── 🎯 Header ────────────────────────────── Líneas 230-241
    │   ├── Título "Recuperar Contraseña"
    │   └── Botón cerrar: id="closeForgotPasswordModal"
    │
    ├── 🚨 Contenedor de Alertas ────────────── Línea 243
    │   └── id="forgotPasswordAlert"
    │
    ├── 📄 Formulario ────────────────────────── Líneas 245-274
    │   │   id="forgotPasswordForm"
    │   │
    │   ├── 📧 Campo Email ───────────────── Líneas 250-262
    │   │   ├── Input: id="forgotEmail"
    │   │   └── Error: id="forgotEmailError"
    │   │
    │   └── ✅ Botón Submit ──────────────── Líneas 264-273
    │       ├── Botón: id="forgotPasswordSubmit"
    │       ├── Texto: id="forgotBtnText"
    │       └── Spinner: id="forgotSpinner"
    │
    └── [FIN MODAL RECUPERACIÓN] ────────────── Línea 282
```

---

## 🔍 DETALLES POR SECCIÓN

### 🔵 MODAL DE INICIAR SESIÓN

**Inicio:** Línea 25  
**Fin:** Línea 123  
**ID del formulario:** `loginForm`

#### Campos:
1. **Email** (líneas 26-40)
   - ID input: `email`
   - ID error: `emailError`
   
2. **Contraseña** (líneas 42-73)
   - ID input: `password`
   - ID toggle: `togglePassword`
   - ID error: `passwordError`

3. **Recordarme** (líneas 75-93)
   - ID checkbox: `rememberMe`
   
4. **¿Olvidaste tu contraseña?** (líneas 85-93)
   - ID botón: `forgotPassword`

5. **Botón Iniciar Sesión** (líneas 95-106)
   - ID botón: `loginSubmit`
   - ID texto: `loginBtnText`
   - ID spinner: `loginSpinner`

6. **Cambiar a Registro** (líneas 108-123)
   - ID botón: `switchToRegister`

---

### 📝 MODAL DE CREAR CUENTA (REGISTRO)

**Inicio:** Línea 125  
**Fin:** Línea 219  
**ID del formulario:** `registerForm`  
**Estado inicial:** `hidden` (oculto)

#### Campos:
1. **Nombre de usuario** (líneas 126-137)
   - ID input: `registerUsername`
   - ID error: `usernameError`
   
2. **Email** (líneas 139-150)
   - ID input: `registerEmail`
   - ID error: `registerEmailError`
   
3. **Contraseña** (líneas 152-176)
   - ID input: `registerPassword`
   - ID toggle: `toggleRegisterPassword`
   - ID error: `registerPasswordError`
   
4. **Confirmar Contraseña** (líneas 178-202)
   - ID input: `confirmPassword`
   - ID toggle: `toggleConfirmPassword`
   - ID error: `confirmPasswordError`

5. **Botón Crear Cuenta** (líneas 204-213)
   - ID botón: `registerSubmit`
   - ID texto: `registerBtnText`
   - ID spinner: `registerSpinner`

6. **Cambiar a Login** (líneas 215-219)
   - ID botón: `switchToLogin`

---

### 🟢 MODAL DE RECUPERAR CONTRASEÑA

**Inicio:** Línea 227  
**Fin:** Línea 282  
**ID del modal:** `forgotPasswordModal`  
**Estado inicial:** `hidden` (oculto)

#### Campos:
1. **Email** (líneas 250-262)
   - ID input: `forgotEmail`
   - ID error: `forgotEmailError`

2. **Botón Enviar** (líneas 264-273)
   - ID botón: `forgotPasswordSubmit`
   - ID texto: `forgotBtnText`
   - ID spinner: `forgotSpinner`

---

## 🎨 CLASES DE ESTILO PRINCIPALES

### Inputs
```html
class="w-full px-4 py-2.5 rounded-lg border border-gray-300 
       dark:border-gray-600 focus:border-primary-500 
       focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 
       dark:text-white transition-all"
```

### Mensajes de Error
```html
class="mt-1.5 text-sm text-red-600 dark:text-red-400 hidden"
```

### Botones Principales
```html
class="w-full flex justify-center items-center py-3 px-4 
       border border-transparent rounded-lg shadow-sm text-sm 
       font-semibold text-white bg-primary-600 hover:bg-primary-700 
       focus:outline-none focus:ring-2 focus:ring-offset-2 
       focus:ring-primary-500 transition-all disabled:opacity-50 
       disabled:cursor-not-allowed"
```

### Alertas
```html
class="hidden mx-6 mt-4"
```

---

## 🔄 FLUJO DE NAVEGACIÓN

```
┌─────────────────┐
│  INICIAR SESIÓN │ ◄───────┐
└────────┬────────┘          │
         │                   │
         │ Click "Regístrate"│
         ▼                   │
┌─────────────────┐          │
│ CREAR CUENTA    │          │
└────────┬────────┘          │
         │                   │
         │ Click "Inicia     │
         │ sesión"           │
         └───────────────────┘

┌─────────────────┐
│  INICIAR SESIÓN │
└────────┬────────┘
         │
         │ Click "¿Olvidaste
         │ tu contraseña?"
         ▼
┌─────────────────┐
│  RECUPERAR      │
│  CONTRASEÑA     │
└─────────────────┘
```

---

## 📌 ELEMENTOS IMPORTANTES

### IDs para JavaScript
Todos estos elementos tienen event listeners en `setupAuth.ts`:

**Botones de acción:**
- `loginSubmit` - Enviar login
- `registerSubmit` - Enviar registro
- `forgotPasswordSubmit` - Enviar recuperación
- `closeLoginModal` - Cerrar modal principal
- `closeForgotPasswordModal` - Cerrar modal recuperación
- `switchToRegister` - Cambiar a registro
- `switchToLogin` - Cambiar a login
- `forgotPassword` - Abrir modal recuperación

**Inputs:**
- `email` - Email de login
- `password` - Contraseña de login
- `registerUsername` - Nombre de usuario
- `registerEmail` - Email de registro
- `registerPassword` - Contraseña de registro
- `confirmPassword` - Confirmar contraseña
- `forgotEmail` - Email de recuperación
- `rememberMe` - Checkbox recordarme

**Toggles de visibilidad:**
- `togglePassword`
- `toggleRegisterPassword`
- `toggleConfirmPassword`

**Contenedores de errores:**
- `emailError`
- `passwordError`
- `usernameError`
- `registerEmailError`
- `registerPasswordError`
- `confirmPasswordError`
- `forgotEmailError`

**Contenedores de alertas:**
- `authAlert`
- `forgotPasswordAlert`

---

## 🎯 PARA MODIFICAR EL DISEÑO

### Cambiar colores
Busca las clases con `primary-` y reemplázalas:
- `bg-primary-600` → Color de fondo del botón
- `text-primary-600` → Color del texto
- `border-primary-500` → Color del borde
- `focus:ring-primary-500` → Color del focus

### Cambiar tamaños
- `px-4 py-2.5` → Padding de inputs
- `py-3 px-4` → Padding de botones
- `text-sm` → Tamaño de fuente
- `max-w-md` → Ancho máximo del modal
- `rounded-lg` → Bordes redondeados

### Cambiar espaciado
- `space-y-4` → Espacio entre elementos del formulario
- `mt-1.5` → Margen superior de errores
- `mb-1` → Margen inferior de labels
- `p-6` → Padding del contenedor

---

## 📱 RESPONSIVE

El modal es responsive automáticamente con:
- `w-full` → Ancho completo en móvil
- `max-w-md` → Máximo 28rem (448px) en desktop
- `p-4` → Padding del contenedor exterior
- Todos los inputs tienen `w-full` para adaptarse

---

**Archivo fuente:** `src/components/ui/LoginModal.ts`  
**Total de líneas:** 282  
**Última actualización:** 24 de noviembre de 2025
