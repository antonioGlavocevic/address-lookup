import z from "zod";

// Map Display Defaults
const defaultPosition = { lat: -33.877, lng: 151.212 }; // Dept of Ed, Sydney
const defaultZoom = 17;
const maxZoom = 19;

// Nominatim Geocoding Service Schemas and Helpers
const nominatimResponseSchema = z.object({
  display_name: z.string().nullish(),
});
const nominatimRequestUrl = "https://nominatim.openstreetmap.org/reverse";
function buildNominatimRequestOptions(lat: number, lng: number) {
  return {
    method: "GET" as const,
    query: { format: "jsonv2", lat, lon: lng },
    headers: { "User-Agent": "address-lookup-poc" },
  };
}

export {
  defaultPosition,
  defaultZoom,
  maxZoom,
  nominatimRequestUrl as geocodingRequestUrl,
  buildNominatimRequestOptions as buildGeocodingRequestOptions,
  nominatimResponseSchema as geocodingResponseSchema,
};
