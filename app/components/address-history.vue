<script lang="ts" setup>
const { data, error, status } = await useFetch('/api/address', { lazy: true })

const addresses = computed(() => data.value?.map(addr => ({
  id: addr.id,
  displayName: addr.displayName,
  lat: addr.lat,
  lng: addr.lng,
  createdAt: new Date(addr.createdAt)
})) ?? [])

async function handleDeleteItem(id: number) {
  try {
    const result = await $fetch('/api/address', {
      method: 'DELETE',
      body: { id }
    })
    console.log('Successfully deleted address:', result)
  } catch (err) {
    console.error('Error deleting address:', err)
  }
}
</script>

<template>
  <div>
    <h2>Address History</h2>
    <div>
      <p v-if="status === 'pending'">Loading...</p>
      <p v-else-if="error">{{ error.message }}</p>
      <AddressHistoryItem v-else-if="addresses.length > 0" v-for="address in addresses" :key="address.id"
        :address="address" @on-delete-item="handleDeleteItem" />
      <p v-else>No addresses found.</p>
    </div>
  </div>
</template>
