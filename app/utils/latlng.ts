export function formatLatLng({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): string {
  const formattedLat =
    lat < 0 ? `${Math.abs(lat).toFixed(4)}°S` : `${lat.toFixed(4)}°N`;
  const formattedLng =
    lng < 0 ? `${Math.abs(lng).toFixed(4)}°W` : `${lng.toFixed(4)}°E`;

  return `${formattedLat}, ${formattedLng}`;
}
