<script lang="ts" setup>
import { Trash2 } from 'lucide-vue-next';
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
  <div
    class="bg-white border border-sky-950 shadow rounded-xl p-4 transition has-[p:first-child:hover]:-translate-y-0.5 has-[p:first-child:hover]:border-sky-500"
    :class="{ 'border-y-4': isSelected, 'shadow-lg': isSelected }">
    <p class="mb-2 font-medium leading-relaxed hover:underline hover:cursor-pointer" @click="handleCardClick">{{
      address.displayName }}</p>
    <div class="flex gap-1 items-center justify-between">
      <div>
        <p class="">{{ formatLatLng(address) }}</p>
        <p class="text-xs">Created {{ address.createdAt }}</p>
      </div>
      <button
        class="p-2 text-sm bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer rounded"
        @click="handleDeleteClicked">
        <Trash2 class="size-5" />
      </button>
    </div>
  </div>
</template>
