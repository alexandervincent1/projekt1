import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null
    }),
    actions: {
        setToken(token) {
            this.token = token
            localStorage.setItem('token', token)
        },
        clearToken() {
            this.token = null
            localStorage.removeItem('token')
        },
        setUser(user) {
            this.user = user
        },
        clearUser() {
            this.user = null
        },
        logout() {
            this.clearToken()
            this.clearUser()
        }
    }
})