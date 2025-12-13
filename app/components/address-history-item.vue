<script lang="ts" setup>
import type { Address } from '~~/generated/prisma/client';

const { address } = defineProps<{
  address: Pick<Address, 'id' | 'displayName'>
}>()

const emit = defineEmits<{
  onDeleteItem: [id: number]
}>()

function handleDeleteClicked() {
  emit('onDeleteItem', address.id)
}
</script>

<template>
  <div>
    <p>{{ address.displayName }}</p>
    <button @click="handleDeleteClicked">Delete</button>
  </div>
</template>
