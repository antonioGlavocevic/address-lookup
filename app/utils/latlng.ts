export function formatLatLng({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): string {
  const formattedLat =
    lat < 0 ? `${Math.abs(lat).toFixed(3)}°S` : `${lat.toFixed(3)}°N`;
  const formattedLng =
    lng < 0 ? `${Math.abs(lng).toFixed(3)}°W` : `${lng.toFixed(3)}°E`;

  return `${formattedLat}, ${formattedLng}`;
}
