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
   * Envía una notificación
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
    
    try {
      const notification = new Notification(config.title, {
        body: config.body,
        icon: config.icon || '/images/logo.png',
        badge: config.badge || '/images/badge.png',
        tag: config.tag || 'general',
        data: config.data,
        requireInteraction: false
      })
      
      // Auto-cerrar después de 5 segundos
      setTimeout(() => {
        notification.close()
      }, 5000)
      
      return notification
    } catch (error) {
      console.error('❌ Error enviando notificación:', error)
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
