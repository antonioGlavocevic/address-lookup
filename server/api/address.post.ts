import z from "zod";
import { db } from "~~/prisma/db";

const bodySchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export default defineEventHandler(async (event) => {
  // Get payload
  const parsedBody = await readValidatedBody(event, bodySchema.safeParse);
  if (!parsedBody.success) {
    return sendError(
      event,
      createError({ statusCode: 422, statusMessage: "Invalid request body" })
    );
  }
  const { lat, lng } = parsedBody.data;

  // Geocode lat/lng to address
  const resp = await $fetch(
    geocodingRequestUrl,
    buildGeocodingRequestOptions(lat, lng)
  );
  const parseResp = geocodingResponseSchema.safeParse(resp);
  if (!parseResp.success) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Invalid response from geocoding service",
      })
    );
  }

  // Store address in DB
  const address = await db.address.create({
    data: {
      displayName: parseResp.data.display_name || "Unknown address",
      lat,
      lng,
    },
  });

  return address;
});
