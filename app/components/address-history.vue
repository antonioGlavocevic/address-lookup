<script lang="ts" setup>
const { data, error, status } = await useFetch('/api/address', { lazy: true })

const addresses = computed(() => data.value?.map(addr => ({
  ...addr,
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
  <div class="w-96 max-h-full bg-white flex flex-col">
    <h2 class="p-4 pt-6 text-xl font-bold border-b-4">Address History</h2>
    <div class="p-4 grid gap-4 grow overflow-scroll">
      <p v-if="status === 'pending'">Loading...</p>
      <p v-else-if="error">{{ error.message }}</p>
      <AddressHistoryItem v-else-if="addresses.length > 0" v-for="address in addresses" :key="address.id"
        :address="address" @on-delete-item="handleDeleteItem" />
      <p v-else>No addresses found.</p>
    </div>
  </div>
</template>
