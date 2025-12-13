<script lang="ts" setup>
import type { Address } from '~~/generated/prisma/client';
import { formatDistance } from 'date-fns';

const { address } = defineProps<{ address: Address }>()

const formattedAddress = computed(() => {
  return {
    ...address,
    lat: address.lat < 0 ? `${address.lat.toFixed(3)}°S` : `${address.lat.toFixed(3)}°N`,
    lng: address.lng < 0 ? `${address.lng.toFixed(3)}°W` : `${address.lng.toFixed(3)}°E`,
    createdAt: formatDistance(new Date(), new Date(address.createdAt))
  };
})

const emit = defineEmits<{
  onDeleteItem: [id: number]
}>()

function handleDeleteClicked() {
  emit('onDeleteItem', address.id)
}
</script>

<template>
  <div class="border shadow rounded-xl p-4">
    <p class="mb-2 font-medium leading-relaxed">{{ formattedAddress.displayName }}</p>
    <div class="flex gap-1 items-start justify-between">
      <div>
        <p class="text-sm text-muted-foreground">{{ formattedAddress.lat }}, {{ formattedAddress.lng }}</p>
        <p class="text-xs text-muted-foreground">Created {{ formattedAddress.createdAt }}</p>
      </div>
      <button
        class="p-2 text-sm bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer rounded"
        @click="handleDeleteClicked">Delete</button>
    </div>
  </div>
</template>
