<script setup>
import { ref, onMounted } from 'vue'
import '/Users/master/Desktop/Te4/projekt1/frontend/src/components/css/warehouse.css'

const Product_ID = ref('')
const Product_Name = ref('')
const Price = ref('')
const Stock = ref('')
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

async function add_product() {
    try {
        const res = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Product_ID: Product_ID.value,
                Product_Name: Product_Name.value,
                Price: Number(Price.value),
                Stock: Number(Stock.value)
            })
        })
        const data = await res.json()
        if (res.ok) {
            alert('Produkt sparad!')
            Product_ID.value = ''
            Product_Name.value = ''
            Price.value = ''
            Stock.value = ''
            fetchProducts()
        } else {
            alert(data.message || 'Fel vid sparande av produkt.')
        }
    } catch (error) {
        console.error(error)
        alert('Error adding product.')
    }
}

async function deleteProduct(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE'
        })
        if (res.ok) {
            products.value = products.value.filter(p => p.id !== id)
        } else {
            const data = await res.json()
            alert(data.message || 'Error deleting product.')
        }
    } catch (error) {
        console.error(error)
        alert('Error deleting product.')
    }
}

onMounted(() => {
    fetchProducts()
})
</script>

<template>
  <div class="main">
    <div class="product_config">
      <input v-model="Product_ID" placeholder="Product ID" aria-label="Product_ID">
      <input v-model="Product_Name" placeholder="Product Name" aria-label="Product Name">
      <input v-model="Price" placeholder="Price" aria-label="Price">
      <input v-model="Stock" placeholder="Stock" aria-label="Stock">
      <button @click="add_product">Add Product</button>
    </div>
    <p>ID ⎯ Product ⎯ Price ⎯ Stock</p>
    <div class="Stock">
      <div class="productrow" v-for="product in products" :key="product.id">
        <p>#{{ product.Product_ID }} - {{ product.Product_Name }} - {{ product.Price }}Kr - Stock: {{ product.Stock }}</p>
        <button class="deltebutton" @click="deleteProduct(product.id)">Delete</button>
      </div>
    </div>
    
    <router-link class="signout_button" to="/login">Sign Out</router-link>
  </div>
</template>
