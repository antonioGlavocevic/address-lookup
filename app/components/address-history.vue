<script lang="ts" setup>
const { data, error, status } = await useFetch('/api/address', { lazy: true })

async function handleDeleteItem(id: number) {
  try {
    await $fetch('/api/address', {
      method: 'DELETE',
      body: { id }
    })
  } catch (err) {
    console.error('Error deleting address:', err)
  }
}
</script>

<template>
  <div v-if="status === 'pending'">
    <p>Loading...</p>
  </div>
  <div v-else>
    <p v-if="error">{{ error.message }}</p>
    <div v-else-if="data && data.length > 0">
      <AddressHistoryItem v-for="address in data" :key="address.id" :address="address"
        @on-delete-item="handleDeleteItem" />
    </div>
    <p v-else>No addresses found.</p>
  </div>
</template>
