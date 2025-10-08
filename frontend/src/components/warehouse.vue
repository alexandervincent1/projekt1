<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useCartStore } from '../store/cart'
import '/Users/master/Desktop/Te4/projekt1/frontend/src/components/css/warehouse.css'
import { useAuthStore } from '../store/auth'
const auth = useAuthStore()

const products = ref([])
const cart = useCartStore()

const cartGrouped = computed(() => cart.cart)
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

function removeFromCart(item) {
  cart.removeOneFromCart(item.id)
  products.value = products.value.map(p =>
    p.id === item.id ? { ...p, Stock: p.Stock + 1 } : p
  )
}

async function addproduct(id) {
  try {
    const product = products.value.find(p => p.id === id)
    if (!product || product.Stock <= 0) return

    const res = await fetch(`http://localhost:3000/api/products/add`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({ id })
    })
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to add product')
    }
    await res.json()
    const { count, ...prodNoCount } = product
    cart.addToCart(prodNoCount)

    products.value = products.value.map(p =>
      p.id === id ? { ...p, Stock: p.Stock - 1 } : p
    )
  } catch (error) {
    console.error(error)
    alert(error.message || 'Error adding product. See console for details.')
  }
}


const isOpen = ref(false)
const items = computed(() =>
  cartGrouped.value.map(
    item => `${item.count} x ${item.Product_Name} (${item.Price * item.count} kr)`
  ),

)
const totalPrice = computed(() =>
  cartGrouped.value.reduce((sum, item) => sum + item.count * item.Price, 0)
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}
const showThankYou = ref(false)


function checkout() {
  cart.clearCart()
  showThankYou.value = true
  setTimeout(() => {
    showThankYou.value = false
  }, 5000)
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
    <router-link class="Switch_page" to="/warehouseadmin" v-if="auth.user?.role === 'admin'">
      Switch Page
    </router-link>
    <router-link class="signout_button" to="/login">Sign Out</router-link>


    <div class="shopping-cart">
      <button @click="toggleDropdown" class="cart-button">
        <img class="shoppingcart1" src="/Users/master/Desktop/Te4/projekt1/frontend/images/shoppingcart.png"
          alt="Shopping Cart" />
      </button>

      <div v-if="isOpen" class="cart-dropdown">
        <li v-for="item in cartGrouped" :key="item.id">
          {{ item.count }} x {{ item.Product_Name }} ({{ item.Price * item.count }} kr)
          <button @click="removeFromCart(item)" class="deltebutton">-</button>
        </li>
        <div v-if="showThankYou">Tack för ditt köp!</div>
        <div v-else-if="cart.cart.length === 0">Cart is empty</div>
        <div v-else>
          Total: {{ totalPrice }} kr
          <button @click="checkout" class="checkout-button">Checkout</button>
        </div>
      </div>
      <p class="whologgedin">
        Logged in as: {{ auth.user?.username || 'Unknown' }}
        <span v-if="auth.user?.role === 'admin'">[Admin]</span>
      </p>
      <p class="whatcompany">
        Company: {{ auth.user?.userCompany || '—' }}
      </p>
    </div>
  </div>
</template>
