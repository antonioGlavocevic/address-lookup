<script lang="ts" setup>
import { useAddressStore } from '~/stores/address'

const addressStore = useAddressStore()

async function handleDeleteItem(id: number) {
  try {
    const result = await $fetch('/api/address', {
      method: 'DELETE',
      body: { id }
    })
    addressStore.removeAddress(id)
    console.log('Successfully deleted address:', result)
  } catch (err) {
    console.error('Error deleting address:', err)
  }
}
</script>

<template>
  <div class="w-96 max-h-full bg-white flex flex-col">
    <h2 class="p-4 pt-6 text-xl font-bold border-b-4">Address History</h2>
    <div class="p-4 flex flex-col gap-4 grow overflow-scroll">
      <p v-if="addressStore.addresses.length === 0">No addresses found.</p>
      <AddressHistoryItem v-else v-for="address in addressStore.addresses" :key="address.id" :address="address"
        @on-delete-item="handleDeleteItem" />
    </div>
  </div>
</template>
