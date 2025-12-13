<script lang="ts" setup>
import leaflet from 'leaflet';

const addressStore = useAddressStore()

let map: leaflet.Map | null = null;
let marker: leaflet.Marker | null = null;
let pendingRequest = false;

function removeMarker(map: leaflet.Map) {
  if (marker) {
    map.removeLayer(marker);
  }
  marker = null;
}

function addMarkerAtPosition(map: leaflet.Map, pos: { lat: number; lng: number }) {
  marker = leaflet.marker(pos).addTo(map);
}

async function handleClick(e: leaflet.LeafletMouseEvent) {
  // Prevent multiple requests at the same time
  if (pendingRequest) return;
  pendingRequest = true;
  const { lat, lng } = e.latlng;
  try {
    const result = await $fetch('/api/address', {
      method: 'POST',
      body: { lat, lng }
    });
    addressStore.addAddress(result);
    addressStore.setSelectedAddress(result);
    console.log('Successfully added address:', result);
  } catch (error) {
    console.error('Error adding address:', error);
  }
  pendingRequest = false;
};

// Setup map and add click listener
onMounted(() => {
  const selectedAddress = addressStore.selectedAddress;

  map = leaflet.map('map').setView(selectedAddress ?? defaultPosition, defaultZoom);
  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom,
  }).addTo(map);

  // Add marker for selected address on load if already selected
  if (selectedAddress) {
    addMarkerAtPosition(map, selectedAddress);
  }

  map.on("click", handleClick);
});

// Watch for changes in selected address to update marker
watch(
  () => addressStore.selectedAddress,
  (newAddress, oldAddress) => {
    if (!map) return;
    if (newAddress?.id === oldAddress?.id) return;
    removeMarker(map);
    if (newAddress === null) return;
    addMarkerAtPosition(map, newAddress);
    map.flyTo(newAddress, defaultZoom, {
      animate: true,
      duration: 1,
    })
  }
)

// Clean up
onUnmounted(() => {
  if (!map) return;

  map.off("click", handleClick);
  map.remove();
  map = null;
});
</script>

<template>
  <div id="map" class="min-w-75 h-full grow" />
</template>
