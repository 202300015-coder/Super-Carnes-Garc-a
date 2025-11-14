// Declaraciones de tipos globales para funciones window

declare global {
  interface Window {
    updateAdminButtons: () => void
    openEditProductModal: (productId: number) => Promise<void>
    activateProduct: (productId: number) => Promise<void>
    userRole: string | null
  }
}

export {}
