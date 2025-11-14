// Declaraciones de tipos globales para funciones window

declare global {
  interface Window {
    updateAdminButtons: () => void
    openEditProductModal: (productId: number) => void
    activateProduct: (productId: number) => Promise<void>
    userRole: string | null
    goToHomePage: (page: number) => void
    setupDragAndDrop: () => void
    updateProductOrder: (productId: number, newOrder: number) => Promise<boolean>
  }
}

export {}
