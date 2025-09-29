<script setup>
import { ref } from 'vue'

import '/Users/master/Desktop/Te4/projekt1/frontend/src/components/css/warehouse.css'
</script>

<template>
  <div  class="main">
    <div class="product_config">
      <input v-model="Product_ID" placeholder="Product ID" aria-label="Product_ID">
      <input v-model="Product_Name" placeholder="Product Name" aria-label="Product Name">
      <input v-model="Price" placeholder="Price" aria-label="Price">
      <input v-model="Stock" placeholder="Stock" aria-label="Stock">
      <button @click="add_product">Add Product</button>
    </div>
  </div>
</template>
