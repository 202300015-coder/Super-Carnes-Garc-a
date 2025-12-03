# REPORTE DE ESTANCIAS - SUPER CARNES GARCÍA

---

## INFORMACIÓN GENERAL

| Campo | Detalle |
|-------|---------|
| **PROYECTO:** | Desarrollo del Sitio Web Super Carnes García |
| **GRUPO:** | ITI-23 |
| **PERIODO:** | Del 14 de Noviembre al 20 de Noviembre de 2025 |
| **TIPO:** | Estancias 2 - Semana 2 |
| **HORAS LABORADAS EN EL PERIODO:** | 40 horas |

---

## 2.- INTRODUCCIÓN

Durante la segunda semana se continuó con el desarrollo del proyecto web, enfocándose en la integración de la base de datos con el frontend. Se implementaron funcionalidades de gestión de productos desde la interfaz administrativa, permitiendo crear, editar y eliminar productos dinámicamente. Se desarrolló la distinción de roles entre administrador y usuario, sistemas de búsqueda y paginación para mejorar la navegación.

---

## 3.- DESCRIPCIÓN DE ACTIVIDADES

|   | Desarrollo de actividades | Horas |
|---|---------------------------|-------|
| 1 | Distinción entre Admin y Usuario | 8 |
| 2 | Modales de gestión (crear, editar) | 8 |
| 3 | Desarrollo del sistema de búsqueda | 8 |
| 4 | Implementación de paginación funcional | 8 |
| 5 | Configuración de la base de datos inicial | 8 |

**TOTAL:** 40 horas

---

## 4.- RESULTADO DE LAS ACTIVIDADES

|   | Resultado |
|---|-----------|
| 1 | Se diseñó correctamente la estructura inicial del sitio con roles diferenciados. |
| 2 | Se desarrolló y probó el módulo de gestión de productos con validaciones. |
| 3 | Se creó el sistema de búsqueda predictiva y funcionó sin errores. |
| 4 | Se realizó la implementación de paginación exitosamente. |
| 5 | Se configuró la base de datos con Supabase de forma adecuada. |

---
---

## INFORMACIÓN GENERAL

| Campo | Detalle |
|-------|---------|
| **PROYECTO:** | Desarrollo del Sitio Web Super Carnes García |
| **GRUPO:** | ITI-23 |
| **PERIODO:** | Del 21 de Noviembre al 27 de Noviembre de 2025 |
| **TIPO:** | Estancias 2 - Semana 3 |
| **HORAS LABORADAS EN EL PERIODO:** | 40 horas |

---

## 2.- INTRODUCCIÓN

En la tercera semana se implementó un sistema de autenticación robusto y profesional, incorporando validaciones en tiempo real, límite de intentos de login, recuperación de contraseña y notificaciones push. Se mejoró significativamente la experiencia de usuario en los modales de login y registro, agregando campo de nombre de usuario, mensajes de error claros y un diseño minimalista con iconos SVG.

---

## 3.- DESCRIPCIÓN DE ACTIVIDADES

|   | Desarrollo de actividades | Horas |
|---|---------------------------|-------|
| 1 | Rediseño completo de modales de autenticación (login, registro, recuperar contraseña) con UI moderna | 8 |
| 2 | Implementación de campo "nombre de usuario" y sistema de validación en tiempo real para todos los campos | 8 |
| 3 | Desarrollo de sistema de seguridad con límite de intentos (5 intentos / 3 minutos de bloqueo) y función "Recordarme" | 8 |
| 4 | Integración completa con Supabase Auth: registro, login, logout, recuperación de contraseña con mapeo de errores | 8 |
| 5 | Sistema completo de notificaciones push con API para diferentes tipos de alertas y documentación técnica | 8 |

**TOTAL:** 40 horas

---

## 4.- RESULTADO DE LAS ACTIVIDADES

|   | Resultado |
|---|-----------|
| 1 | Modales rediseñados con UI moderna, iconos SVG minimalistas, soporte modo oscuro y transiciones suaves |
| 2 | Validaciones en tiempo real funcionando: email RFC 5322, contraseña con requisitos, username alfanumérico |
| 3 | Sistema de seguridad implementado con bloqueo temporal y función "Recordarme" usando localStorage |
| 4 | Autenticación completa integrada con Supabase, manejo de sesiones y mensajes de error en español |
| 5 | Sistema de notificaciones push con 5 tipos predefinidos, API personalizable y documentación completa |

---

## 📸 GUÍA DE SCREENSHOTS PARA EVIDENCIAS

### **SEMANA 2: Gestión de Productos**

#### Screenshot 1: Distinción entre Admin y Usuario (Código)
- **Archivo:** `src/components/auth/setupAuth.ts`
- **Líneas:** 1-50
- **Qué mostrar:** Sistema de roles y verificación de permisos
- **Descripción:** Código que muestra cómo se diferencian los roles de administrador y usuario

#### Screenshot 2: Modales de Gestión (Código)
- **Archivo:** `src/components/ui/AddProductModal.ts`
- **Líneas:** 1-80
- **Qué mostrar:** Estructura del modal para crear productos
- **Descripción:** Modal completo con formulario de creación de productos

#### Screenshot 3: Sistema de Búsqueda (Código)
- **Archivo:** `src/pages/searchProducts.ts`
- **Líneas:** 1-80
- **Qué mostrar:** Función de búsqueda con filtrado
- **Descripción:** Lógica de búsqueda predictiva en tiempo real

#### Screenshot 4: Sistema de Paginación (Código)
- **Archivo:** `src/pages/pagination.ts`
- **Líneas:** 8-80
- **Qué mostrar:** Función `setupPagination()` completa
- **Descripción:** Lógica de paginación mostrando 16 productos por página

#### Screenshot 5: Configuración de Base de Datos (Código)
- **Archivo:** `src/lib/supabaseClient.ts`
- **Líneas:** 1-30
- **Qué mostrar:** Configuración y cliente de Supabase
- **Descripción:** Conexión con la base de datos y configuración inicial

#### Screenshot 6: Vista Admin - Panel de Productos
- **Navegador:** Abrir `localhost:5175/Super-Carnes-Garc-a/` como admin
- **Sección:** Ir a "Nuestras Carnes"
- **Qué mostrar:** Vista de administrador con botones de editar/eliminar
- **Descripción:** Interfaz mostrando permisos de administrador

#### Screenshot 7: Vista Usuario - Productos
- **Navegador:** Abrir `localhost:5175/Super-Carnes-Garc-a/` sin login
- **Sección:** Ir a "Nuestras Carnes"
- **Qué mostrar:** Vista de usuario sin botones de administración
- **Descripción:** Interfaz mostrando vista limitada de usuario normal

#### Screenshot 8: Modal de Crear Producto
- **Navegador:** Como admin, click en "Agregar Producto"
- **Qué mostrar:** Modal abierto con formulario de creación
- **Descripción:** Interfaz del modal de gestión funcionando

#### Screenshot 9: Sistema de Búsqueda en Acción
- **Navegador:** En sección Carnes, escribir en barra de búsqueda
- **Qué mostrar:** Resultados filtrados dinámicamente
- **Descripción:** Búsqueda predictiva funcionando en tiempo real

#### Screenshot 10: Paginación Funcionando
- **Navegador:** En sección Carnes
- **Qué mostrar:** Botones de paginación (página 1, 2, siguiente) y productos organizados
- **Descripción:** Sistema de paginación mostrando 16 productos por página

---

### **SEMANA 3: Sistema de Autenticación**

#### Screenshot 9: Modal de Login mejorado
- **Archivo:** `src/components/ui/LoginModal.ts`
- **Líneas:** 25-123
- **Qué mostrar:** Formulario de login completo con validaciones
- **Descripción:** Estructura del modal de inicio de sesión

#### Screenshot 10: Modal de Registro con campo username
- **Archivo:** `src/components/ui/LoginModal.ts`
- **Líneas:** 125-219
- **Qué mostrar:** Formulario de registro con campo de nombre de usuario
- **Descripción:** Modal de crear cuenta con validaciones

#### Screenshot 11: Funciones de validación
- **Archivo:** `src/components/auth/authHelpers.ts`
- **Líneas:** 8-60
- **Qué mostrar:** Funciones `validateEmail()`, `validatePassword()`, `validateUsername()`
- **Descripción:** Sistema de validaciones en tiempo real

#### Screenshot 12: Sistema de límite de intentos
- **Archivo:** `src/components/auth/authHelpers.ts`
- **Líneas:** 123-185
- **Qué mostrar:** Funciones `isLoginLocked()`, `incrementLoginAttempts()`
- **Descripción:** Seguridad con bloqueo temporal

#### Screenshot 13: Sistema de notificaciones
- **Archivo:** `src/lib/notificationService.ts`
- **Líneas:** 1-100
- **Qué mostrar:** Clase `NotificationService` completa
- **Descripción:** API de notificaciones push

#### Screenshot 14: Setup de autenticación
- **Archivo:** `src/components/auth/setupAuth.ts`
- **Líneas:** 140-230
- **Qué mostrar:** Manejador del submit de login con validaciones
- **Descripción:** Lógica completa de inicio de sesión

#### Screenshot 15: Vista del navegador - Modal de Login
- **Navegador:** Abrir aplicación y hacer clic en botón de usuario
- **Qué mostrar:** Modal de "Iniciar Sesión" con campos y diseño mejorado
- **Descripción:** Interfaz de usuario del login

#### Screenshot 16: Vista del navegador - Modal de Registro
- **Navegador:** Click en "Regístrate" dentro del modal
- **Qué mostrar:** Modal de "Crear Cuenta" con campo de nombre de usuario
- **Descripción:** Interfaz del registro con nuevo campo

#### Screenshot 17: Vista del navegador - Validación de errores
- **Navegador:** Intentar login con datos incorrectos
- **Qué mostrar:** Mensajes de error bajo los campos (email inválido, contraseña corta, etc.)
- **Descripción:** Validaciones visuales funcionando

#### Screenshot 18: Vista del navegador - Sistema de notificaciones
- **Navegador:** Abrir DevTools (F12) y ejecutar en consola: `notificationService.sendCustomNotification('Prueba', 'Funciona')`
- **Qué mostrar:** Notificación push apareciendo en el navegador
- **Descripción:** Sistema de notificaciones operativo

---

## 📋 INSTRUCCIONES PARA TOMAR SCREENSHOTS

### Para el código (VS Code):
1. Abre el archivo indicado
2. Selecciona las líneas mencionadas
3. Presiona `Ctrl + K` luego `Ctrl + C` para tomar screenshot del código
4. O usa la extensión "Polacode" para capturas más profesionales
5. Nombra la imagen: `semana2_screenshot1.png`, `semana2_screenshot2.png`, etc.

### Para el navegador:
1. Inicia el servidor: `npm run dev`
2. Abre `http://localhost:5175/Super-Carnes-Garc-a/`
3. Navega a la sección indicada
4. Presiona `Win + Shift + S` (Windows) o usa herramienta de captura
5. Captura solo la ventana del navegador
6. Nombra la imagen: `semana2_navegador1.png`, etc.

### Para la consola (notificaciones):
1. Abre DevTools (F12)
2. Ve a la pestaña Console
3. Ejecuta: `notificationService.sendCustomNotification('Prueba', 'Funciona')`
4. Captura la consola y la notificación que aparece
5. Nombra: `semana3_notificacion.png`

---

## 📌 ARCHIVOS IMPORTANTES PARA EVIDENCIAS

**Semana 2:**
- `src/pages/loadProducts.ts` - Carga de productos
- `src/pages/pagination.ts` - Paginación
- `src/pages/searchProducts.ts` - Búsqueda
- `src/main.ts` (líneas 258-370) - Drag & drop
- `src/components/ui/EditProductModal.ts` - Modal edición

**Semana 3:**
- `src/components/ui/LoginModal.ts` - Modales de auth
- `src/components/auth/authHelpers.ts` - Validaciones
- `src/components/auth/setupAuth.ts` - Lógica de auth
- `src/lib/notificationService.ts` - Notificaciones
- `AUTH-SISTEMA-MEJORADO.md` - Documentación
- `GUIA-NOTIFICACIONES.md` - Guía admin

---

**Elaborado por:** [Tu nombre]  
**Fecha de elaboración:** 28 de Noviembre de 2025  
**Empresa:** Super Carnes García  
**Proyecto:** Desarrollo de Sitio Web E-commerce
