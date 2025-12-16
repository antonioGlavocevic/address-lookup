<script lang="ts" setup>
import { useAddressStore } from '@/stores/address';

const addressStore = useAddressStore();
const { data } = await useFetch('/api/address');

watch(
  data,
  (addresses) => {
    if (addresses) {
      addressStore.setAddresses(addresses);
      const firstAddress = addressStore.addresses[0];
      if (firstAddress) {
        addressStore.setSelectedAddress(firstAddress);
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="relative w-full h-svh flex justify-end text-sky-900">
    <AddressSelectedCard />
    <ClientOnly>
      <MapContainer />
    </ClientOnly>
    <AddressHistory />
  </div>
</template>
