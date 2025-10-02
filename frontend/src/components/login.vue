<template>
    <div class="header">

        <h1>Login</h1>
    </div>
    <div class="first_box">
        <input class="username_login" placeholder="Username" v-model="username">
        <input class="password_login" placeholder="Password" v-model="password" type="password">
        <button @click="login">Login</button>
        <router-link to="/signup">Sign Up</router-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import '/Users/master/Desktop/Te4/projekt1/frontend/src/components/css/login.css'
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const router = useRouter()

async function login() {
    try {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username.value, password: password.value }),
        });
        const data = await res.json();
        if (res.ok && data.token) {
            auth.setToken(data.token)
            auth.setUser(data.user)
            if (data.user.role === 'admin') {
                router.push('/warehouseadmin');
            } else {
                router.push('/warehouse');
            }
        } else {
            alert(data.message || "Fel vid inloggning.");
        }
    } catch (error) {
        console.error("Fel vid inloggning:", error);
    }
}
</script>