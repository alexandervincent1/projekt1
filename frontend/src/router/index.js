import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Login from '../components/login.vue'
import Signup from '../components/signup.vue'
import Warehouse from '../components/warehouse.vue'
import warehouseadmin from '../components/warehouseadmin.vue'

const routes = [
   
  { path: '/login', component: Login },
  { path: '/', component: Signup },
  { path: '/signup', component: Signup },
  { path: '/warehouse', component: Warehouse },
  { path: '/warehouseadmin', component: warehouseadmin },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
