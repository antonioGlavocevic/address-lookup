<script lang="ts" setup>
import { ref } from 'vue'

const address = ref('')
const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)

async function handleSubmit() {
  try {
    const result = await $fetch('/api/address', {
      method: 'POST',
      body: {
        displayName: address.value,
        lat: latitude.value,
        long: longitude.value
      }
    })
    console.log('Added address:', result)
  } catch (error) {
    console.error('Error adding address:', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="address">Enter Address:</label>
      <input id="address" v-model="address" type="text" required>
      <label for="latitude">Enter Latitude:</label>
      <input id="latitude" v-model="latitude" type="number" required>
      <label for="longitude">Enter Longitude:</label>
      <input id="longitude" v-model="longitude" type="number" required>
    </div>
    <button type="submit">Add Address</button>
  </form>
</template>