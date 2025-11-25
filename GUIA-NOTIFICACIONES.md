# 📱 Guía Rápida: Enviar Notificaciones Push

## 🎯 Para Administradores

### Abrir la Consola del Navegador

1. **Chrome/Edge:** Presiona `F12` o `Ctrl + Shift + I`
2. **Firefox:** Presiona `F12` o `Ctrl + Shift + K`
3. Haz clic en la pestaña "Consola" (Console)

---

## 🚀 Comandos Rápidos

### 1️⃣ Nueva Oferta
Cuando pongas un producto en oferta:

```javascript
notificationService.sendNewOfferNotification('Picaña Premium', 30)
```

**Ejemplo:**
- Producto: Picaña Premium
- Descuento: 30%
- Notificación: "🔥 ¡Nueva Oferta! Picaña Premium ahora con 30% de descuento"

---

### 2️⃣ Nuevo Producto
Cuando agregues un producto nuevo:

```javascript
notificationService.sendNewProductNotification('Chorizo Artesanal Argentino')
```

**Ejemplo:**
- Producto: Chorizo Artesanal Argentino
- Notificación: "✨ Nuevo Producto - Chorizo Artesanal Argentino ya está disponible"

---

### 3️⃣ Carne Recién Surtida
Cuando llegue mercancía fresca:

```javascript
notificationService.sendFreshMeatNotification()
```

**Notificación:** "🥩 Carne Recién Surtida - ¡Acabamos de recibir carne fresca! Visita nuestra tienda."

---

### 4️⃣ Promoción Flash
Para promociones de tiempo limitado:

```javascript
notificationService.sendFlashPromoNotification('2 horas')
```

**Ejemplo:**
- Duración: 2 horas
- Notificación: "⚡ Promoción Flash - Ofertas especiales por las próximas 2 horas. ¡No te las pierdas!"

Otros ejemplos:
```javascript
notificationService.sendFlashPromoNotification('24 horas')
notificationService.sendFlashPromoNotification('este fin de semana')
```

---

### 5️⃣ Notificación Personalizada
Para mensajes especiales:

```javascript
notificationService.sendCustomNotification(
  '🎉 ¡Aniversario!',
  'Celebramos 10 años con descuentos del 50% en todos nuestros productos'
)
```

**Otros ejemplos:**

```javascript
// Día de las madres
notificationService.sendCustomNotification(
  '💝 Día de las Madres',
  'Cortes especiales y descuentos para celebrar a mamá'
)

// Navidad
notificationService.sendCustomNotification(
  '🎄 Especial de Navidad',
  'Pierna de cerdo y pavo fresco para tu cena navideña'
)

// Fin de semana
notificationService.sendCustomNotification(
  '🌮 Fin de Semana',
  '¡Carne para carne asada con 20% de descuento!'
)
```

---

## 💡 Ejemplos Prácticos del Día a Día

### Lunes por la mañana (mercancía fresca)
```javascript
notificationService.sendFreshMeatNotification()
```

### Miércoles (día de ofertas)
```javascript
notificationService.sendNewOfferNotification('Arrachera', 25)
notificationService.sendNewOfferNotification('Costillas BBQ', 30)
```

### Viernes (promoción de fin de semana)
```javascript
notificationService.sendFlashPromoNotification('este fin de semana')
```

### Evento especial
```javascript
notificationService.sendCustomNotification(
  '🎊 Super Venta',
  '3 días de descuentos increíbles. ¡Visítanos!'
)
```

---

## ✅ Verificar que Funciona

### Paso 1: Verificar soporte
```javascript
notificationService.isSupported()
```
**Debe retornar:** `true`

### Paso 2: Verificar permiso
```javascript
notificationService.getPermission()
```
**Debe retornar:** `"granted"` (si el usuario aceptó)

### Paso 3: Enviar prueba
```javascript
notificationService.sendCustomNotification(
  'Prueba',
  'Si ves esto, las notificaciones funcionan correctamente ✅'
)
```

---

## 🔧 Solución de Problemas

### "No veo las notificaciones"

1. **Verificar permisos del navegador:**
   - Chrome: Configuración > Privacidad y seguridad > Configuración de sitios > Notificaciones
   - Asegúrate de que tu sitio esté en "Permitidos"

2. **Solicitar permiso nuevamente:**
   ```javascript
   await notificationService.requestPermission()
   ```

3. **Verificar que estás en HTTPS o localhost**
   - Las notificaciones solo funcionan en sitios seguros

### "El usuario no recibe notificaciones"

- El usuario debe haber aceptado los permisos
- Algunos usuarios bloquean notificaciones por defecto
- Verifica en la consola si hay errores

---

## 📊 Panel de Notificaciones (Futuro)

**Próximamente:** Panel de administración para enviar notificaciones sin usar la consola.

Incluirá:
- ✅ Selector de tipo de notificación
- ✅ Formulario para personalizar mensaje
- ✅ Vista previa antes de enviar
- ✅ Historial de notificaciones enviadas
- ✅ Estadísticas de entrega

---

## 💬 Tips y Mejores Prácticas

### ✅ **Hazlo:**
- Envía notificaciones relevantes y útiles
- Usa emojis para llamar la atención
- Sé breve y claro en el mensaje
- Envía ofertas en horarios estratégicos

### ❌ **Evita:**
- Enviar demasiadas notificaciones (máximo 2-3 al día)
- Notificaciones genéricas sin valor
- Mensajes muy largos
- Notificaciones muy tarde en la noche

---

## 🎁 Plantillas Listas para Usar

Copia y pega según la ocasión:

```javascript
// === OFERTAS DIARIAS ===
notificationService.sendNewOfferNotification('T-Bone Premium', 35)
notificationService.sendNewOfferNotification('Pechuga de Pollo', 20)
notificationService.sendNewOfferNotification('Lomo de Cerdo', 25)

// === EVENTOS ESPECIALES ===
// Día de la Carne Asada
notificationService.sendCustomNotification(
  '🔥 Día de la Carne Asada',
  'Arrachera, Costillas y Chorizo con descuento especial'
)

// Black Friday
notificationService.sendCustomNotification(
  '⚫ Black Friday',
  'Hasta 50% de descuento en productos seleccionados'
)

// Año Nuevo
notificationService.sendCustomNotification(
  '🎊 Feliz Año Nuevo',
  'Recibe el 2026 con nuestros mejores cortes premium'
)

// === STOCK LIMITADO ===
notificationService.sendCustomNotification(
  '⚠️ Últimas Unidades',
  'Picaña Premium en oferta. ¡Quedan pocas!'
)

// === AGRADECIMIENTO ===
notificationService.sendCustomNotification(
  '❤️ Gracias',
  'Gracias por tu preferencia. Disfruta 15% extra en tu próxima compra'
)
```

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas o preguntas:
1. Revisa la consola del navegador por errores
2. Verifica la documentación completa en `AUTH-SISTEMA-MEJORADO.md`
3. Contacta al desarrollador

---

**¡Listo para enviar notificaciones!** 🚀
