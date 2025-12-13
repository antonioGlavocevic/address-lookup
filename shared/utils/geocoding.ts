import z from "zod";

// Nominatim Geocoding Service Schemas and Helpers
const nominatimResponseSchema = z.object({
  display_name: z.string().nullish(),
});
const nominatimRequestUrl = "https://nominatim.openstreetmap.org/reverse";
function buildNominatimRequestOptions(lat: number, lon: number) {
  return {
    method: "GET" as const,
    query: { format: "jsonv2", lat, lon },
    headers: { "User-Agent": "address-lookup-poc" },
  };
}

export {
  nominatimRequestUrl as geocodingRequestUrl,
  buildNominatimRequestOptions as buildGeocodingRequestOptions,
  nominatimResponseSchema as geocodingResponseSchema,
};
