<script lang="ts" setup>
import { MapPin } from 'lucide-vue-next'
import { useAddressStore } from '~/stores/address'

const addressStore = useAddressStore()

async function handleDeleteItem(id: number) {
  try {
    const result = await $fetch('/api/address', {
      method: 'DELETE',
      body: { id }
    })
    addressStore.removeAddress(id)
    if (addressStore.selectedAddress?.id === id) {
      const firstAddress = addressStore.addresses[0]
      addressStore.setSelectedAddress(firstAddress ?? null)
    }
    console.log('Successfully deleted address:', result)
  } catch (err) {
    console.error('Error deleting address:', err)
  }
}
</script>

<template>
  <div class="w-96 max-h-full bg-slate-50 flex flex-col border-l-2 border-slate-800">
    <div class="p-4 pt-6 flex gap-2 items-center border-b-4 border-slate-800">
      <MapPin class="size-6" />
      <h2 class="text-xl font-bold">Address History</h2>
    </div>
    <div class="p-4 bg-slate-200 grow">
      <AddressEmptyState v-if="addressStore.addresses.length === 0" />
      <TransitionGroup v-else class="flex flex-col gap-4 grow overflow-scroll" name="history-list" tag="div">
        <AddressHistoryItem v-for="address in addressStore.addresses" :key="address.id" :address="address"
          @on-delete-item="handleDeleteItem" />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.history-list-enter-active,
.history-list-leave-active {
  transition: all 0.5s ease;
}

.history-list-enter-from,
.history-list-leave-to {
  opacity: 0;
  transform: translateX(400px);
}
</style>