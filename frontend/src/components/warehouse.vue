<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useCartStore } from '../store/cart'
import '/Users/master/Desktop/Te4/projekt1/frontend/src/components/css/warehouse.css'
import { useAuthStore } from '../store/auth'
const auth = useAuthStore()

const products = ref([])
const cart = useCartStore()

const cartGrouped = computed(() => {
  const map = {}
  cart.cart.forEach(item => {
    if (!map[item.id]) {
      map[item.id] = { ...item, count: 1 }
    } else {
      map[item.id].count++
    }
  })
  return Object.values(map)
})
async function fetchProducts() {
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.message || 'Unauthorized')
    }
    const data = await res.json()
    const arr = Array.isArray(data) ? data : [data]
    products.value = arr.map(p => ({
      id: p._id?.$oid || p._id,
      Product_ID: p.Product_ID,
      Product_Name: p.Product_Name,
      Price: p.Price,
      Stock: p.Stock
    }))
  } catch (error) {
    console.error(error)
    alert(error.message || 'Error fetching products. See console for details.')
  }
}

onMounted(() => {
  fetchProducts()
})

async function addproduct(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/products/add`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}` // <-- Lägg till denna rad!
            },
            body: JSON.stringify({ id })
        })
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}))
            throw new Error(errorData.message || 'Failed to add product')
        }
        const data = await res.json()

        // Uppdatera lagersaldo i products-listan
        products.value = products.value.map(p =>
            p.id === id ? { ...p, Stock: p.Stock - 1 } : p
        )

        // Hämta produkten UTAN count och lägg till i Pinia-cart
        const product = products.value.find(p => p.id === id)
        if (product && product.Stock >= 0) {
            const { count, ...prodNoCount } = product
            cart.addToCart(prodNoCount)
        }
    } catch (error) {
        console.error(error)
        alert(error.message || 'Error adding product. See console for details.')
    }
}


// dropdown menu
const isOpen = ref(false)
const items = computed(() =>
  cartGrouped.value.map(
    item => `${item.count} x ${item.Product_Name} (${item.Price * item.count} kr)`
  )
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}




</script>

<template>
  <div class="main">
    <div class="Stock">
      <div class="productrow" v-for="product in products" :key="product.id">
        <p>{{ product.Product_ID }} - {{ product.Product_Name }} - {{ product.Price }} kr - Stock: {{ product.Stock }}
        </p>
        <button class="addbutton" @click="addproduct(product.id)" :disabled="product.Stock === 0"><img
            src="/Users/master/Desktop/Te4/projekt1/frontend/images/shoppingcart.png" alt=""></button>
      </div>
    </div>
    <router-link
      class="Switch_page"
      to="/warehouseadmin"
      v-if="auth.user?.role === 'admin'">
      Switch Page
    </router-link>
    <router-link class="signout_button" to="/login">Sign Out</router-link>


    <div class="shopping-cart">
      <button @click="toggleDropdown" class="cart-button">
        <img class="shoppingcart1" src="/Users/master/Desktop/Te4/projekt1/frontend/images/shoppingcart.png"
          alt="Shopping Cart" />
      </button>

      <div v-if="isOpen" class="cart-dropdown">
        <li v-for="item in cart.cart" :key="item.id">
    {{ item.count }} x {{ item.Product_Name }} ({{ item.Price * item.count }} kr)
  </li>
      </div>
    </div>
    <p class="whologgedin">
  Logged in as: {{ auth.user?.username || 'Unknown' }}
  <span v-if="auth.user?.role === 'admin'">[Admin]</span>
</p>
  </div>
</template>
