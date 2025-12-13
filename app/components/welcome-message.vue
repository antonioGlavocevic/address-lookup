<script setup lang="ts">
const { data, error, status } = await useFetch('/api/hello', {lazy: true})
</script>

<template>
  <div v-if="status === 'pending'">Loading...</div>
  <div v-else>
    <p v-if="error">{{ error.message }}</p>
    <p v-else-if="data">{{  data.message }}</p>
  </div>
</template>
