<script lang="ts" setup>
import type { Address } from '~/stores/address';
import { formatLatLng } from '~/utils/latlng';

const { address } = defineProps<{ address: Address }>();
const addressStore = useAddressStore();

const isSelected = ref(addressStore.selectedAddress?.id === address.id);

const emit = defineEmits<{
  onDeleteItem: [id: number]
}>();

function handleDeleteClicked() {
  emit('onDeleteItem', address.id);
}

function handleCardClick() {
  addressStore.setSelectedAddress(address);
}

// Watch for changes in selected address to update isSelected state
watch(
  () => addressStore.selectedAddress,
  (newAddress) => {
    isSelected.value = newAddress?.id === address.id;
  }
)
</script>

<template>
  <div class="border shadow rounded-xl p-4 hover:bg-neutral-300 hover:cursor-pointer"
    :class="{ 'bg-neutral-200': isSelected }" @click="handleCardClick">
    <p class="mb-2 font-medium leading-relaxed">{{ address.displayName }}</p>
    <div class="flex gap-1 items-start justify-between">
      <div>
        <p class="text-sm text-muted-foreground">{{ formatLatLng(address) }}</p>
        <p class="text-xs text-muted-foreground">Created {{ address.createdAt }}</p>
      </div>
      <button
        class="p-2 text-sm bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer rounded z-10"
        @click="handleDeleteClicked">Delete</button>
    </div>
  </div>
</template>
