<script setup>
import { ref, onMounted } from 'vue'
import '/Users/master/Desktop/Te4/projekt1/frontend/src/components/css/warehouse.css'

const products = ref([])

async function fetchProducts() {
    try {
        const res = await fetch('http://localhost:3000/api/products')
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
        alert('Error fetching products. See console for details.')
    }
}

onMounted(() => {
    fetchProducts()
})
</script>

<template>
  <div class="main">
    <div class="Stock">
      <div class="productrow" v-for="product in products" :key="product.id">
        <p>{{ product.Product_ID }} - {{ product.Product_Name }} - ${{ product.Price }} - Stock: {{ product.Stock }}</p>
        <button class="addbutton" @click="addproduct(product.id)"><img src="/Users/master/Desktop/Te4/projekt1/frontend/images/shoppingcart.png" alt=""></button>
      </div>
    </div>
    <router-link class="signout_button" to="/login">Sign Out</router-link>
  </div>
</template>
