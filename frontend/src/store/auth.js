import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null // Restore user from localStorage
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
            localStorage.setItem('user', JSON.stringify(user)) // Save user to localStorage
        },
        clearUser() {
            this.user = null
            localStorage.removeItem('user')
        },
        logout() {
            this.clearToken()
            this.clearUser()
        }
    }
})