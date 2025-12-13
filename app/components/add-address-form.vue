<script lang="ts" setup>
async function handleSubmit() {
  try {
    const lat = -34.02467918567293;
    const lon = 150.8178556932498;
    const result = await $fetch('/api/address', {
      method: 'POST',
      body: { lat, lon }
    })
    console.log('Successfully added address:', result)
  } catch (error) {
    console.error('Error adding address:', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <button type="submit">Add Address</button>
  </form>
</template>