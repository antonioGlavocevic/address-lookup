<script setup lang="ts">
const { data, error, status } = await useFetch('/api/address', {lazy: true})
</script>

<template>
  <div v-if="status === 'pending'">
    <p>Loading...</p>
  </div>
  <div v-else>
    <p v-if="error">{{ error.message }}</p>
    <div v-else-if="data && data.length > 0">
      <p v-for="address in data" :key="address.id">{{ address.displayName }}</p>
    </div>
    <p v-else>No addresses found.</p>
  </div>
</template>
