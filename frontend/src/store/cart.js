import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),
  actions: {
    addToCart(product) {
      const found = this.cart.find(p => p.id === product.id)
      if (found) {
        found.count++
      } else {
        this.cart.push({ ...product, count: 1 })
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(p => p.id !== id)
    },
    clearCart() {
      this.cart = []
    }
  }
})