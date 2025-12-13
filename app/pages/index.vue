<template>
  <div id="root">
    <ClientOnly>
      <MapContainer />
    </ClientOnly>
    <AddressHistory />
  </div>
</template>

<style scoped>
#root {
  display: relative;
  height: 100%;
  width: 100%;
}
</style>