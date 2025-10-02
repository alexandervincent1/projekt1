<script setup>
import '/Users/master/Desktop/Te4/projekt1/frontend/src/assets/css/main.css'
import { useRouter } from 'vue-router'
import { useAuthStore } from './store/auth'
import { onMounted, watch } from 'vue'
const router = useRouter()
const auth = useAuthStore()

watch(
  () => [router.currentRoute.value.fullPath, auth.token, auth.user],
  () => {
    const { meta } = router.currentRoute.value
    if (meta.requiresAuth && !auth.token) {
      router.push('/login')
    } else if (meta.requiresAdmin && (!auth.user || auth.user.role !== 'admin')) {
      router.push('/warehouse')
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="always_on_top">
    <h1>Warehouse</h1>
  </div>
 
  <router-view/>
</template>
