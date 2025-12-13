<script lang="ts" setup>
import { useAddressStore } from '@/stores/address'

const addressStore = useAddressStore()
const { data } = await useFetch('/api/address')

watch(
  data,
  (addresses) => {
    if (addresses) {
      addressStore.setAddresses(addresses)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="w-full h-svh flex justify-end">
    <ClientOnly>
      <MapContainer />
    </ClientOnly>
    <AddressHistory />
  </div>
</template>
