<script lang="ts" setup>
import type { Address } from '~~/generated/prisma/client';

const { address } = defineProps<{ address: Address }>()

const emit = defineEmits<{
  onDeleteItem: [id: number]
}>()

function handleDeleteClicked() {
  emit('onDeleteItem', address.id)
}
</script>

<template>
  <div>
    <div>
      <p>{{ address.displayName }}</p>
      <p>({{ address.lat }}, {{ address.lng }})</p>
      <p>Created at: {{ new Date(address.createdAt).toLocaleString() }}</p>
    </div>
    <button @click="handleDeleteClicked">Delete</button>
  </div>
</template>
