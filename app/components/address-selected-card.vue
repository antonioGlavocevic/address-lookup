<script lang="ts" setup>
import { MapPin } from 'lucide-vue-next'
import { formatLatLng } from '~/utils/latlng';

const addressStore = useAddressStore();

const address = ref<Address | null>(addressStore.selectedAddress);

// Watch for changes in selected address to update isSelected state
watch(
  () => addressStore.selectedAddress,
  (newAddress) => {
    address.value = newAddress;
  }
)
</script>

<template>
  <div
    class="absolute top-3 left-15 w-96 min-h-40 bg-slate-50 border border-slate-500 shadow rounded-xl p-4 z-20 flex flex-col">
    <div v-if="!address" class="grow flex flex-col items-center justify-center font-medium leading-relaxed text-center">
      <MapPin class="size-12" />
      <p>Click on the map to get started</p>
    </div>
    <div v-else class="grow flex flex-col justify-between">
      <p class="mb-2 font-medium leading-relaxed">{{ address.displayName }}</p>
      <p class="">{{ formatLatLng(address) }}</p>
    </div>
  </div>
</template>