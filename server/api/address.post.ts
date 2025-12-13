import z from "zod";
import { db } from "~~/prisma/db";

const bodySchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export default defineEventHandler(async (event) => {
  const parsedBody = await readValidatedBody(event, bodySchema.safeParse);
  if (!parsedBody.success) {
    return sendError(
      event,
      createError({ statusCode: 422, statusMessage: "Invalid request body" })
    );
  }
  const resp = await $fetch(
    geocodingRequestUrl,
    buildGeocodingRequestOptions(parsedBody.data.lat, parsedBody.data.lon)
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
  const address = await db.address.create({
    data: {
      displayName: parseResp.data.display_name || "Unknown address",
      lat: parsedBody.data.lat,
      lon: parsedBody.data.lon,
    },
  });
  return address;
});
