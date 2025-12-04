/**
 * ============================================
 * SERVICIO DE NOTIFICACIONES PUSH
 * ============================================
 * 
 * Este servicio maneja las notificaciones push del navegador
 * para Super Carnes García.
 * 
 * Características:
 * - Solicita permiso al usuario
 * - Envía notificaciones locales
 * - Compatible con Service Workers
 * - Ejemplos de uso para admin
 */

export interface NotificationConfig {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  data?: any
}

class NotificationService {
  private static instance: NotificationService
  private permission: NotificationPermission = 'default'
  
  private constructor() {
    if ('Notification' in window) {
      this.permission = Notification.permission
    }
  }
  
  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }
  
  /**
   * Verifica si las notificaciones están soportadas
   */
  public isSupported(): boolean {
    return 'Notification' in window
  }
  
  /**
   * Obtiene el permiso actual
   */
  public getPermission(): NotificationPermission {
    return this.permission
  }
  
  /**
   * Solicita permiso para notificaciones
   */
  public async requestPermission(): Promise<boolean> {
    if (!this.isSupported()) {
      console.warn('⚠️ Notificaciones no soportadas en este navegador')
      return false
    }
    
    if (this.permission === 'granted') {
      return true
    }
    
    try {
      const permission = await Notification.requestPermission()
      this.permission = permission
      
      if (permission === 'granted') {
        console.log('✅ Permiso de notificaciones concedido')
        
        // Enviar notificación de bienvenida
        this.send({
          title: '¡Gracias por suscribirte!',
          body: 'Ahora recibirás notificaciones sobre ofertas y nuevos productos.',
          tag: 'welcome'
        })
        
        return true
      } else {
        console.log('⚠️ Permiso de notificaciones denegado')
        return false
      }
    } catch (error) {
      console.error('❌ Error solicitando permiso:', error)
      return false
    }
  }
  
  /**
   * Mostrar toast HTML (respaldo para Windows que bloquea notificaciones del sistema)
   */
  private showToast(title: string, body: string, emoji: string = '🔔'): void {
    let container = document.getElementById('toast-container')
    if (!container) {
      container = document.createElement('div')
      container.id = 'toast-container'
      container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:10px;'
      document.body.appendChild(container)
    }
    
    const toast = document.createElement('div')
    toast.style.cssText = `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      min-width: 300px;
      max-width: 400px;
      animation: slideIn 0.3s ease;
    `
    
    toast.innerHTML = `
      <div style="display:flex;align-items:start;gap:12px;">
        <div style="font-size:24px;">${emoji}</div>
        <div style="flex:1;">
          <div style="font-weight:bold;font-size:16px;margin-bottom:4px;">${title}</div>
          <div style="font-size:14px;opacity:0.95;">${body}</div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" style="background:rgba(255,255,255,0.2);border:none;color:white;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:16px;">×</button>
      </div>
    `
    
    if (!document.getElementById('toast-animations')) {
      const style = document.createElement('style')
      style.id = 'toast-animations'
      style.textContent = '@keyframes slideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}'
      document.head.appendChild(style)
    }
    
    container.appendChild(toast)
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse'
      setTimeout(() => toast.remove(), 300)
    }, 5000)
  }

  /**
   * Envía una notificación (siempre usa toast HTML para máxima compatibilidad)
   */
  public send(config: NotificationConfig): Notification | null {
    if (!this.isSupported()) {
      console.warn('⚠️ Notificaciones no soportadas')
      return null
    }
    
    if (this.permission !== 'granted') {
      console.warn('⚠️ Permiso de notificaciones no concedido')
      return null
    }
    
    // SIEMPRE usar toast HTML (más confiable que las notificaciones del sistema)
    const emoji = config.title.split(' ')[0] || '🔔'
    this.showToast(config.title, config.body, emoji)
    
    // Intentar también notificación del sistema (opcional)
    try {
      const notification = new Notification(config.title, {
        body: config.body,
        icon: config.icon,
        badge: config.badge,
        tag: config.tag || 'general',
        data: config.data,
        requireInteraction: false
      })
      
      setTimeout(() => notification.close(), 5000)
      return notification
    } catch (error) {
      console.warn('⚠️ Notificación del sistema falló, pero toast HTML sí funcionó')
      return null
    }
  }
  
  /**
   * EJEMPLOS DE NOTIFICACIONES PRE-CONFIGURADAS
   */
  
  // Notificación de nueva oferta
  public sendNewOfferNotification(productName: string, discount: number) {
    return this.send({
      title: '🔥 ¡Nueva Oferta!',
      body: `${productName} ahora con ${discount}% de descuento`,
      tag: 'new-offer',
      data: { type: 'offer', discount }
    })
  }
  
  // Notificación de producto nuevo
  public sendNewProductNotification(productName: string) {
    return this.send({
      title: '✨ Nuevo Producto',
      body: `${productName} ya está disponible`,
      tag: 'new-product',
      data: { type: 'new-product' }
    })
  }
  
  // Notificación de carne fresca
  public sendFreshMeatNotification() {
    return this.send({
      title: '🥩 Carne Recién Surtida',
      body: '¡Acabamos de recibir carne fresca! Visita nuestra tienda.',
      tag: 'fresh-meat',
      data: { type: 'fresh-stock' }
    })
  }
  
  // Notificación de promoción flash
  public sendFlashPromoNotification(duration: string) {
    return this.send({
      title: '⚡ Promoción Flash',
      body: `Ofertas especiales por las próximas ${duration}. ¡No te las pierdas!`,
      tag: 'flash-promo',
      data: { type: 'flash-promo' }
    })
  }
  
  // Notificación personalizada
  public sendCustomNotification(title: string, message: string) {
    return this.send({
      title,
      body: message,
      tag: 'custom'
    })
  }
}

// Exportar instancia única
export const notificationService = NotificationService.getInstance()

// Exponer globalmente para testing desde consola
;(window as any).notificationService = notificationService

// ============================================
// EJEMPLOS DE USO (para el admin)
// ============================================

/*
// En la consola del navegador, puedes probar:

// 1. Verificar soporte
notificationService.isSupported()

// 2. Solicitar permiso
await notificationService.requestPermission()

// 3. Enviar notificación de nueva oferta
notificationService.sendNewOfferNotification('Picaña Premium', 30)

// 4. Enviar notificación de producto nuevo
notificationService.sendNewProductNotification('Chorizo Artesanal')

// 5. Enviar notificación de carne fresca
notificationService.sendFreshMeatNotification()

// 6. Enviar promoción flash
notificationService.sendFlashPromoNotification('2 horas')

// 7. Enviar notificación personalizada
notificationService.sendCustomNotification(
  '🎉 Aniversario',
  '¡Celebramos 10 años con descuentos del 50%!'
)
*/
