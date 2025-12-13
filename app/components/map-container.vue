<script lang="ts" setup>
import leaflet from 'leaflet';

let map: leaflet.Map | null = null;
let marker: leaflet.Marker | null = null;
let pendingRequest = false;

function removeMarker() {
  if (marker && map) {
    map.removeLayer(marker);
  }
  marker = null;
}

function addMarkerAtPosition(pos: { lat: number; lng: number }) {
  if (map) {
    marker = leaflet.marker(pos).addTo(map);
  }
}

async function handleClick(e: leaflet.LeafletMouseEvent) {
  if (pendingRequest) return;
  pendingRequest = true;
  const { lat, lng } = e.latlng;
  removeMarker();
  addMarkerAtPosition({ lat, lng });
  try {
    const result = await $fetch('/api/address', {
      method: 'POST',
      body: { lat, lng }
    })
    console.log('Successfully added address:', result)
  } catch (error) {
    removeMarker();
    console.error('Error adding address:', error)
  }
  pendingRequest = false;
};

onMounted(() => {
  map = leaflet.map('map').setView(defaultPosition, defaultZoom);
  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom,
  }).addTo(map);

  map.on("click", handleClick);
});

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
