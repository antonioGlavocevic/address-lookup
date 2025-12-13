<script lang="ts" setup>
import type { Address } from '~/stores/address';

const { address } = defineProps<{ address: Address }>()

const emit = defineEmits<{
  onDeleteItem: [id: number]
}>()

function handleDeleteClicked() {
  emit('onDeleteItem', address.id)
}
</script>

<template>
  <div class="border shadow rounded-xl p-4">
    <p class="mb-2 font-medium leading-relaxed">{{ address.displayName }}</p>
    <div class="flex gap-1 items-start justify-between">
      <div>
        <p class="text-sm text-muted-foreground">{{ address.lat }}, {{ address.lng }}</p>
        <p class="text-xs text-muted-foreground">Created {{ address.createdAt }}</p>
      </div>
      <button
        class="p-2 text-sm bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer rounded"
        @click="handleDeleteClicked">Delete</button>
    </div>
  </div>
</template>
